/**
 * Smoke test for the brain event store.
 * Run with: npx tsx scripts/smoke-test-store.ts
 *
 * Writes two test envelopes via recordEvent, verifies idempotency, reads them
 * back via the store client, and cleans them up. The test passes if no errors
 * are thrown and the read-back rows match what was written.
 */

import { recordEvent, getStoreStatus, getEventStoreClient } from "../lib/event-store";

async function main(): Promise<void> {
  const ts = new Date().toISOString();
  const env1 = {
    id: `evt_smoke_${Date.now()}_1`,
    event: {
      type: "thought_loop_tick" as const,
      timestamp: ts,
      impulse: false,
      mood: 0.5,
      energy: 0.7,
      unresolved_thought: null,
    },
    received_at: ts,
  };
  const env2 = {
    id: `evt_smoke_${Date.now()}_2`,
    event: {
      type: "system_status" as const,
      timestamp: ts,
      status: "awake" as const,
    },
    received_at: ts,
  };

  console.log("Initial status:", JSON.stringify(getStoreStatus()));

  await recordEvent(env1);
  console.log("After 1 record:", JSON.stringify(getStoreStatus()));

  await recordEvent(env2);
  console.log("After 2 records:", JSON.stringify(getStoreStatus()));

  // Idempotency check
  await recordEvent(env1);
  console.log("After idempotent re-write:", JSON.stringify(getStoreStatus()));

  // Read them back through the same client
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prisma = getEventStoreClient() as any;
  const rows = await prisma.brainEvent.findMany({
    where: { envelopeId: { in: [env1.id, env2.id] } },
    orderBy: { id: "asc" },
  });

  console.log(
    "Read back:",
    JSON.stringify(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rows.map((r: any) => ({
        id: r.id.toString(),
        envelopeId: r.envelopeId,
        eventType: r.eventType,
        receivedAt: r.receivedAt,
        payloadEventType: r.payload?.event?.type,
      })),
      null,
      2,
    ),
  );

  if (rows.length !== 2) {
    throw new Error(`Expected 2 rows, got ${rows.length}`);
  }

  // Clean up
  const deleted = await prisma.brainEvent.deleteMany({
    where: { envelopeId: { in: [env1.id, env2.id] } },
  });
  console.log("Deleted:", deleted.count);

  await prisma.$disconnect();
  console.log("Smoke test PASSED");
}

main().catch((err) => {
  console.error("Smoke test FAILED:", err);
  process.exit(1);
});
