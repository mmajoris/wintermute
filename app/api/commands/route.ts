import { NextRequest, NextResponse } from "next/server";
import { enqueueCommand, drainCommands, type CommandType } from "@/lib/kv";

const VALID_COMMANDS: CommandType[] = ["sleep", "wake"];

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { command, params } = body as {
    command?: string;
    params?: Record<string, string>;
  };

  if (!command || !VALID_COMMANDS.includes(command as CommandType)) {
    return NextResponse.json(
      { error: `Invalid command. Valid: ${VALID_COMMANDS.join(", ")}` },
      { status: 400 },
    );
  }

  const entry = await enqueueCommand(command as CommandType, params);

  return NextResponse.json({ queued: entry });
}

export async function GET() {
  const pending = await drainCommands();
  return NextResponse.json({ commands: pending });
}
