import { NextRequest, NextResponse } from "next/server";

export interface VMStatus {
  molly_active: string;
  docker: string;
  timestamp: string;
}

let latestStatus: VMStatus | null = null;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { molly_active, docker, timestamp } = body as Partial<VMStatus>;
  if (!timestamp) {
    return NextResponse.json({ error: "Missing timestamp" }, { status: 400 });
  }

  latestStatus = {
    molly_active: molly_active ?? "unknown",
    docker: docker ?? "",
    timestamp,
  };

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ status: latestStatus });
}
