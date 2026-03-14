import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

const STATUS_FILE = join("/tmp", "molly-vm-status.json");

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

  const status = {
    molly_active: molly_active ?? "unknown",
    docker: docker ?? "",
    timestamp,
  };

  try {
    await mkdir("/tmp", { recursive: true });
    await writeFile(STATUS_FILE, JSON.stringify(status));
  } catch { /* /tmp write failure is non-fatal */ }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  try {
    const data = await readFile(STATUS_FILE, "utf-8");
    return NextResponse.json({ status: JSON.parse(data) });
  } catch {
    return NextResponse.json({ status: null });
  }
}
