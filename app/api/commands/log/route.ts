import { NextRequest, NextResponse } from "next/server";
import {
  appendCommandLog,
  getCommandLog,
  setCommandMeta,
  getCommandMeta,
  type CommandType,
} from "@/lib/kv";

/**
 * POST — called by VM scripts to stream output lines and signal completion.
 *
 * Body variants:
 *   { lines: string[] }                         — append output lines
 *   { done: true, exit_code: number }            — script finished
 *   { lines: string[], done: true, exit_code: 0 } — both at once
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lines, done, exit_code, command } = body as {
    lines?: string[];
    done?: boolean;
    exit_code?: number;
    command?: string;
  };

  if (lines && Array.isArray(lines) && lines.length > 0) {
    await appendCommandLog(lines);
  }

  if (done) {
    const meta = await getCommandMeta();
    await setCommandMeta({
      command: (command as CommandType) ?? meta?.command ?? "wake",
      status: exit_code === 0 ? "done" : "failed",
      exit_code: exit_code ?? 1,
    });
  }

  return NextResponse.json({ ok: true });
}

/**
 * GET — polled by the UI to fetch new log lines.
 *
 * Query: ?since=N  (line index to start from, default 0)
 * Returns: { lines: string[], meta: CommandLogMeta | null }
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const since = parseInt(searchParams.get("since") ?? "0", 10);

  const [lines, meta] = await Promise.all([
    getCommandLog(since),
    getCommandMeta(),
  ]);

  return NextResponse.json({ lines, meta });
}
