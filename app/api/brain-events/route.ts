import { NextRequest, NextResponse } from "next/server";
import { isBrainEvent, type BrainEvent } from "@/lib/brain-events";
import { getGlobalEventBuffer } from "@/lib/event-buffer";
import { getWSClientManager } from "@/lib/ws-clients";
import { broadcastToSSEClients, getSSEClientCount } from "@/lib/sse-clients";

const BRAIN_API_KEY = process.env.BRAIN_API_KEY;

function validateApiKey(request: NextRequest): boolean {
  if (!BRAIN_API_KEY) {
    console.warn("[brain-events] BRAIN_API_KEY not set, allowing all requests");
    return true;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return false;

  return token === BRAIN_API_KEY;
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const events = Array.isArray(body) ? body : [body];
  const buffer = getGlobalEventBuffer();
  const wsManager = getWSClientManager();
  const envelopes = [];

  for (const event of events) {
    if (!isBrainEvent(event)) {
      console.warn("[brain-events] Invalid event:", event);
      continue;
    }

    const envelope = buffer.push(event as BrainEvent);
    envelopes.push(envelope);
    wsManager.broadcast(envelope);
    broadcastToSSEClients(envelope);
  }

  return NextResponse.json({
    received: envelopes.length,
    buffer_size: buffer.size,
    connected_clients: wsManager.clientCount + getSSEClientCount(),
  });
}

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const buffer = getGlobalEventBuffer();
  const wsManager = getWSClientManager();
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const count = parseInt(searchParams.get("count") ?? "100", 10);
  const since = searchParams.get("since");

  let events;
  if (since) {
    events = buffer.getSince(since);
  } else if (type) {
    events = buffer.getByType(type as BrainEvent["type"], count);
  } else {
    events = buffer.getRecent(count);
  }

  return NextResponse.json({
    events,
    buffer_size: buffer.size,
    events_per_second: buffer.eventsPerSecond,
    connected_clients: wsManager.clientCount,
  });
}
