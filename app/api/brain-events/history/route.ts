/**
 * Brain Event History Endpoint
 *
 * Queries persisted brain events from the Prisma Postgres store with time
 * window and event-type filters. This is the historical-read counterpart to
 * the in-memory `EventBuffer` reads in the parent route — the buffer holds
 * the last 1000 live events, this endpoint serves the full archive.
 *
 * Used by the Wintermute dashboard for "scrub through Molly's past" views and
 * by the substrate-cortex training pipeline (mmajoris/molly#367) for bulk
 * (text, brain_state) pair extraction.
 *
 * Query parameters:
 *   - from:    ISO-8601 timestamp (inclusive lower bound on received_at)
 *   - to:      ISO-8601 timestamp (exclusive upper bound on received_at)
 *   - type:    Event type filter (e.g. "neurochemistry_state"); may be passed
 *              multiple times to OR-filter several types
 *   - limit:   Max rows to return (default 100, hard cap 5000)
 *   - cursor:  Opaque cursor for pagination (the id of the last row from the
 *              previous page)
 *   - order:   "asc" or "desc" by received_at (default "desc")
 *
 * Authentication: same Bearer token as the parent POST/GET endpoints.
 */

import { NextRequest, NextResponse } from "next/server";
import { getEventStoreClient } from "@/lib/event-store";

export const runtime = "nodejs";

const BRAIN_API_KEY = process.env.BRAIN_API_KEY;
const HARD_LIMIT_CAP = 5000;
const DEFAULT_LIMIT = 100;

function validateApiKey(request: NextRequest): boolean {
  if (!BRAIN_API_KEY) {
    console.error("[brain-events/history] BRAIN_API_KEY not set — rejecting all requests");
    return false;
  }
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return false;
  return token === BRAIN_API_KEY;
}

function parseDate(value: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) return null;
  return parsed;
}

export async function GET(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const from = parseDate(searchParams.get("from"));
  const to = parseDate(searchParams.get("to"));
  const types = searchParams.getAll("type").filter(Boolean);
  const orderRaw = (searchParams.get("order") ?? "desc").toLowerCase();
  const order: "asc" | "desc" = orderRaw === "asc" ? "asc" : "desc";

  const requestedLimit = parseInt(searchParams.get("limit") ?? `${DEFAULT_LIMIT}`, 10);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(1, requestedLimit), HARD_LIMIT_CAP)
    : DEFAULT_LIMIT;

  const cursorRaw = searchParams.get("cursor");
  let cursor: bigint | null = null;
  if (cursorRaw) {
    try {
      cursor = BigInt(cursorRaw);
    } catch {
      return NextResponse.json({ error: "Invalid cursor" }, { status: 400 });
    }
  }

  const where: Record<string, unknown> = {};
  if (from || to) {
    const range: Record<string, Date> = {};
    if (from) range.gte = from;
    if (to) range.lt = to;
    where.receivedAt = range;
  }
  if (types.length > 0) {
    where.eventType = { in: types };
  }
  if (cursor !== null) {
    where.id = order === "desc" ? { lt: cursor } : { gt: cursor };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prisma = getEventStoreClient() as any;
    const rows = await prisma.brainEvent.findMany({
      where,
      orderBy: [{ receivedAt: order }, { id: order }],
      take: limit,
      select: {
        id: true,
        envelopeId: true,
        eventType: true,
        receivedAt: true,
        eventTimestamp: true,
        payload: true,
      },
    });

    const lastRow = rows[rows.length - 1] as { id: bigint } | undefined;
    const nextCursor = rows.length === limit && lastRow ? lastRow.id.toString() : null;

    // Convert BigInt id to string for JSON serialization
    const serialized = rows.map((row: { id: bigint } & Record<string, unknown>) => ({
      ...row,
      id: row.id.toString(),
    }));

    return NextResponse.json({
      events: serialized,
      count: serialized.length,
      next_cursor: nextCursor,
      filter: {
        from: from?.toISOString() ?? null,
        to: to?.toISOString() ?? null,
        types: types.length > 0 ? types : null,
        order,
        limit,
      },
    });
  } catch (err) {
    console.error("[brain-events/history] query failed:", err);
    return NextResponse.json(
      { error: "Query failed", detail: (err as Error).message },
      { status: 500 }
    );
  }
}
