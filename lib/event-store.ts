/**
 * Brain Event Store
 *
 * Persistent store for brain events backed by Prisma Postgres + Accelerate.
 * Replaces the in-memory-only EventBuffer pattern with a durable store that
 * survives Vercel function cold starts, process restarts, and the circular
 * buffer's 1000-event cap.
 *
 * Why it exists:
 *   The substrate-cortex training pipeline (mmajoris/molly#356) needs clean
 *   (text, brain_state) pairs accumulated from Molly's actual lived
 *   experience. Without persistent storage, every event Wintermute receives
 *   is discarded after the in-memory buffer rotates or the function instance
 *   dies. This module is the persistence half of mmajoris/molly#360.
 *
 * Design:
 *   - Single PrismaClient singleton extended with the Accelerate connection
 *     pooler. Survives Next.js dev hot-reload via globalThis.
 *   - recordEvent() does an upsert keyed on envelopeId for idempotency. If
 *     the same event is delivered twice (network retry, restart while a write
 *     is in flight), the second call is a no-op.
 *   - Errors are caught, counted, and logged but never thrown. The live event
 *     pipeline never breaks because of a database problem.
 *   - Status is exposed via getStoreStatus() for the route handler to surface
 *     in response payloads, so observability lives next to the code that
 *     generated the writes.
 *
 * Configuration:
 *   - DATABASE_URL must be set to the Prisma Postgres / Accelerate connection
 *     string. Set in Vercel env vars for Production, Preview, Development;
 *     set in .env locally for `prisma` CLI commands and local dev.
 *   - WINTERMUTE_RECORDING=false disables persistence entirely (the event
 *     pipeline still runs, just without the database write).
 *
 * Runtime:
 *   - Requires Node.js runtime (not Edge). API routes that wire this module
 *     must NOT opt into the edge runtime.
 */

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { BrainEventEnvelope } from "./brain-events";

const RECORDING_ENABLED = process.env.WINTERMUTE_RECORDING !== "false";

export interface EventStoreStatus {
  enabled: boolean;
  writtenCount?: number;
  errorCount?: number;
  lastWriteAt?: string | null;
  lastError?: string | null;
}

type AcceleratedPrismaClient = ReturnType<
  PrismaClient["$extends"] extends (extension: infer E) => infer R ? () => R : never
>;

type GlobalWithStore = typeof globalThis & {
  __wintermutePrismaClient?: AcceleratedPrismaClient;
  __wintermuteStoreState?: {
    writtenCount: number;
    errorCount: number;
    lastWriteAt: Date | null;
    lastError: Error | null;
  };
};

const globalRef = globalThis as GlobalWithStore;

function getStoreState() {
  if (!globalRef.__wintermuteStoreState) {
    globalRef.__wintermuteStoreState = {
      writtenCount: 0,
      errorCount: 0,
      lastWriteAt: null,
      lastError: null,
    };
  }
  return globalRef.__wintermuteStoreState;
}

function getPrismaClient(): AcceleratedPrismaClient {
  if (!globalRef.__wintermutePrismaClient) {
    const base = new PrismaClient({
      log: ["error", "warn"],
    });
    // The Accelerate extension changes the client's type signature; cast through
    // unknown so we can store it on the global ref without dragging the inferred
    // type across module boundaries.
    globalRef.__wintermutePrismaClient = base.$extends(withAccelerate()) as unknown as AcceleratedPrismaClient;
  }
  return globalRef.__wintermutePrismaClient;
}

function parseEventTimestamp(envelope: BrainEventEnvelope): Date {
  // Most event payloads include a `timestamp` field. Fall back to received_at
  // if a particular event type does not.
  const eventWithTimestamp = envelope.event as { timestamp?: string };
  const candidate = eventWithTimestamp?.timestamp ?? envelope.received_at;
  const parsed = new Date(candidate);
  if (isNaN(parsed.getTime())) {
    return new Date(envelope.received_at);
  }
  return parsed;
}

/**
 * Persist a single brain event envelope.
 *
 * Fire-and-forget from the caller's perspective: the call returns a Promise
 * but the route handler does not need to await it. Errors are caught and
 * recorded internally; the live event pipeline is never blocked or thrown
 * out of by a database problem.
 */
export async function recordEvent(envelope: BrainEventEnvelope): Promise<void> {
  if (!RECORDING_ENABLED) return;

  const state = getStoreState();
  const prisma = getPrismaClient();

  try {
    const eventTimestamp = parseEventTimestamp(envelope);
    const receivedAt = new Date(envelope.received_at);

    // Upsert keyed on envelopeId so retries are idempotent. The unique
    // constraint on envelope_id makes this safe.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any).brainEvent.upsert({
      where: { envelopeId: envelope.id },
      create: {
        envelopeId: envelope.id,
        eventType: envelope.event.type,
        receivedAt,
        eventTimestamp,
        // Cast to any because Prisma's Json input type is structural and
        // brain envelope payloads are heterogeneous unions.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        payload: envelope as any,
      },
      update: {
        // No-op on conflict; the existing row is the source of truth.
      },
    });

    state.writtenCount += 1;
    state.lastWriteAt = new Date();
  } catch (err) {
    state.errorCount += 1;
    state.lastError = err as Error;
    console.error("[event-store] write failed:", err);
  }
}

/**
 * Synchronous variant the route handler can call without awaiting.
 * The actual database call still happens asynchronously, but errors are
 * caught at the Promise level so the caller can fire-and-forget.
 */
export function recordEventFireAndForget(envelope: BrainEventEnvelope): void {
  if (!RECORDING_ENABLED) return;
  void recordEvent(envelope).catch((err) => {
    console.error("[event-store] unhandled rejection:", err);
  });
}

export function getStoreStatus(): EventStoreStatus {
  if (!RECORDING_ENABLED) {
    return { enabled: false };
  }
  const state = getStoreState();
  return {
    enabled: true,
    writtenCount: state.writtenCount,
    errorCount: state.errorCount,
    lastWriteAt: state.lastWriteAt?.toISOString() ?? null,
    lastError: state.lastError?.message ?? null,
  };
}

/**
 * Direct read access for the history query endpoint and the substrate-cortex
 * training pipeline. Returns the underlying accelerated Prisma client.
 */
export function getEventStoreClient(): AcceleratedPrismaClient {
  return getPrismaClient();
}
