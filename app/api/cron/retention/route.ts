/**
 * Brain Event Retention Cron
 *
 * Vercel Cron handler that applies the per-event-type retention policy to the
 * brain_events table. Triggered daily via vercel.json cron schedule.
 *
 * Default policy:
 *   - Training-relevant event types are kept FOREVER (they are the source of
 *     the substrate-cortex training corpus and the autobiography of Molly's
 *     lived experience).
 *   - Operational event types are kept for OPERATIONAL_RETENTION_DAYS (default
 *     60 days). They are useful for short-term debugging and dashboards but
 *     not for long-term identity training.
 *
 * Override the retention window via the BRAIN_EVENTS_OPERATIONAL_RETENTION_DAYS
 * env var.
 *
 * Authentication: requires the Vercel Cron header `Authorization: Bearer
 * $CRON_SECRET` to prevent ad-hoc invocation. Vercel injects this header
 * automatically when invoking via cron schedule; manual invocation requires
 * the same header.
 */

import { NextRequest, NextResponse } from "next/server";
import { getEventStoreClient } from "@/lib/event-store";

export const runtime = "nodejs";

const CRON_SECRET = process.env.CRON_SECRET;

const DEFAULT_OPERATIONAL_RETENTION_DAYS = 60;
const OPERATIONAL_RETENTION_DAYS = Number(
  process.env.BRAIN_EVENTS_OPERATIONAL_RETENTION_DAYS ?? DEFAULT_OPERATIONAL_RETENTION_DAYS,
);

// Event types that get pruned after the retention window. These are
// high-frequency, low-information-value-for-training events. Keep this list
// in sync with the substrate-cortex plan's training-relevance taxonomy.
const OPERATIONAL_EVENT_TYPES: readonly string[] = [
  "queue_metrics",
  "collection_activity",
  "worker_activity",
  "system_status",
];

function validateCronAuth(request: NextRequest): boolean {
  if (!CRON_SECRET) {
    console.error("[cron/retention] CRON_SECRET not set — rejecting all requests");
    return false;
  }
  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;
  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer") return false;
  return token === CRON_SECRET;
}

export async function GET(request: NextRequest) {
  if (!validateCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - OPERATIONAL_RETENTION_DAYS * 24 * 60 * 60 * 1000);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prisma = getEventStoreClient() as any;

    const result = await prisma.brainEvent.deleteMany({
      where: {
        eventType: { in: OPERATIONAL_EVENT_TYPES },
        receivedAt: { lt: cutoff },
      },
    });

    console.log(
      `[cron/retention] pruned ${result.count} operational events older than ${cutoff.toISOString()}`,
    );

    return NextResponse.json({
      pruned: result.count,
      cutoff: cutoff.toISOString(),
      retention_days: OPERATIONAL_RETENTION_DAYS,
      operational_event_types: OPERATIONAL_EVENT_TYPES,
    });
  } catch (err) {
    console.error("[cron/retention] prune failed:", err);
    return NextResponse.json(
      { error: "Prune failed", detail: (err as Error).message },
      { status: 500 }
    );
  }
}
