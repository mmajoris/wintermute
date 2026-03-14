import { NextRequest, NextResponse } from "next/server";
import { setVMStatus, getVMStatus, type VMStatus } from "@/lib/kv";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { molly_active, docker, timestamp } = body as {
    molly_active?: string;
    docker?: string;
    timestamp?: string;
  };
  if (!timestamp) {
    return NextResponse.json({ error: "Missing timestamp" }, { status: 400 });
  }

  const status: VMStatus = {
    molly_active: molly_active ?? "unknown",
    docker: docker ?? "",
    timestamp,
  };

  await setVMStatus(status);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const status = await getVMStatus();
  return NextResponse.json({ status });
}
