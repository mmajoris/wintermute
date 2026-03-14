import { NextRequest, NextResponse } from "next/server";
import { getGlobalCommandQueue, type CommandType } from "@/lib/command-queue";

const VALID_COMMANDS: CommandType[] = ["sleep", "wake"];

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { command, params } = body as { command?: string; params?: Record<string, string> };

  if (!command || !VALID_COMMANDS.includes(command as CommandType)) {
    return NextResponse.json(
      { error: `Invalid command. Valid: ${VALID_COMMANDS.join(", ")}` },
      { status: 400 }
    );
  }

  const queue = getGlobalCommandQueue();
  const entry = queue.enqueue(command as CommandType, params);

  return NextResponse.json({ queued: entry });
}

export async function GET() {
  const queue = getGlobalCommandQueue();
  const pending = queue.getPending();
  return NextResponse.json({ commands: pending });
}
