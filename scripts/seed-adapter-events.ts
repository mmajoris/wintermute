/**
 * Seed adapter telemetry events for development.
 *
 * Generates a synthetic but realistic stream of substrate-cortex training
 * telemetry events (per_turn_learning, plasticity_gate_fire,
 * adapter_state_snapshot, sleep_consolidation) and POSTs them to a running
 * wintermute deployment via the /api/brain-events endpoint. The Adapter
 * Evolution panel then has data to render against, which is the only way to
 * develop the panel before mmajoris/molly#361 and #370 are live.
 *
 * Usage:
 *   WINTERMUTE_URL=http://localhost:3000 BRAIN_API_KEY=<key> \
 *     npx tsx scripts/seed-adapter-events.ts --turns 80 --snapshots 6 --sleep-cycles 2
 *
 * Or against a deployed instance:
 *   WINTERMUTE_URL=https://your-host BRAIN_API_KEY=<key> \
 *     npx tsx scripts/seed-adapter-events.ts
 *
 * Defaults: 60 turns, 5 snapshots, 1 sleep cycle.
 */

import type {
  BrainEvent,
  PerTurnLearningEvent,
  PlasticityGateFireEvent,
  AdapterStateSnapshotEvent,
  SleepConsolidationEvent,
} from "../lib/brain-events";

const WINTERMUTE_URL = process.env.WINTERMUTE_URL ?? "http://localhost:3000";
const BRAIN_API_KEY = process.env.BRAIN_API_KEY;

if (!BRAIN_API_KEY) {
  console.error("BRAIN_API_KEY env var is required");
  process.exit(1);
}

interface Args {
  turns: number;
  snapshots: number;
  sleepCycles: number;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { turns: 60, snapshots: 5, sleepCycles: 1 };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--turns" && argv[i + 1]) args.turns = parseInt(argv[++i], 10);
    if (arg === "--snapshots" && argv[i + 1]) args.snapshots = parseInt(argv[++i], 10);
    if (arg === "--sleep-cycles" && argv[i + 1]) args.sleepCycles = parseInt(argv[++i], 10);
  }
  return args;
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function gateDecision(eligibility: number, novelty: number): "fire" | "suppress" | "habituate" {
  if (eligibility < 0.15) return "suppress";
  if (novelty < 0.1) return "habituate";
  return "fire";
}

async function postEvent(event: BrainEvent): Promise<void> {
  const res = await fetch(`${WINTERMUTE_URL}/api/brain-events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BRAIN_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST failed: ${res.status} ${text}`);
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  console.log(`Seeding ${args.turns} turns, ${args.snapshots} snapshots, ${args.sleepCycles} sleep cycles → ${WINTERMUTE_URL}`);

  // Walk a synthetic timeline backward from now, ~30s between turns
  const now = Date.now();
  const turnIntervalMs = 30_000;
  const totalSpanMs = args.turns * turnIntervalMs;

  // Build a slowly growing adapter norm trajectory: starts near 0, grows
  // through the timeline with sleep consolidation pulling drift back slightly.
  let totalNorm = 0.5;
  let driftSinceCheckpoint = 0;
  let totalTurns = 1000; // start the counter so it looks lived-in
  let totalThoughts = 250;

  // Sleep cycle indices, evenly distributed across the timeline
  const sleepIndices = new Set<number>();
  if (args.sleepCycles > 0) {
    const step = Math.floor(args.turns / (args.sleepCycles + 1));
    for (let i = 1; i <= args.sleepCycles; i++) {
      sleepIndices.add(i * step);
    }
  }

  // Snapshot indices, evenly distributed
  const snapshotIndices = new Set<number>();
  const snapStep = Math.max(1, Math.floor(args.turns / args.snapshots));
  for (let i = 0; i < args.snapshots; i++) {
    snapshotIndices.add(Math.min(args.turns - 1, i * snapStep));
  }
  snapshotIndices.add(args.turns - 1); // always snapshot at the end

  let posted = 0;
  let errors = 0;

  for (let i = 0; i < args.turns; i++) {
    const ageMs = totalSpanMs - i * turnIntervalMs;
    const ts = new Date(now - ageMs).toISOString();
    const turnId = `turn_seed_${now}_${i}`;
    const isInternal = Math.random() < 0.4;

    // Brain state samples — varied around realistic values
    const dopamine = rand(0.3, 0.7);
    const cortisol = rand(0.15, 0.55);
    const ach = rand(0.35, 0.75);
    const ne = (() => {
      const r = Math.random();
      if (r < 0.6) return "phasic_ready";
      if (r < 0.85) return "low_tonic";
      return "high_tonic";
    })();

    // Plasticity gate components
    const attention_selection = rand(0.2, 0.95);
    const encoding_mode_ach = ach;
    const novelty_or_value = rand(0, 1);
    const synaptic_resource = Math.max(0.05, 1 - (i % 7) * 0.1); // depletes a bit each turn, refreshes
    const composed = attention_selection * encoding_mode_ach * novelty_or_value * synaptic_resource;
    const decision = gateDecision(composed, novelty_or_value);

    // Per-turn learning
    let gradient_norm = 0;
    let adapter_delta_norm = 0;
    let lr_applied = 0;
    if (decision === "fire") {
      gradient_norm = rand(0.05, 1.2);
      lr_applied = composed * 1e-4;
      adapter_delta_norm = gradient_norm * lr_applied * rand(0.8, 1.2);
    } else if (decision === "habituate") {
      gradient_norm = rand(0.01, 0.1);
      lr_applied = composed * 1e-5;
      adapter_delta_norm = gradient_norm * lr_applied;
    }

    totalNorm += adapter_delta_norm;
    driftSinceCheckpoint += adapter_delta_norm;
    if (isInternal) totalThoughts++;
    else totalTurns++;

    // Emit gate event
    const gateEvent: PlasticityGateFireEvent = {
      type: "plasticity_gate_fire",
      timestamp: ts,
      turn_id: turnId,
      attention_selection,
      encoding_mode_ach,
      novelty_or_value,
      synaptic_resource,
      composed_eligibility: composed,
      decision,
    };

    // Emit per-turn learning event
    const turnEvent: PerTurnLearningEvent = {
      type: "per_turn_learning",
      timestamp: ts,
      turn_id: turnId,
      was_internal_thought: isInternal,
      loss_value: rand(2.0, 8.5),
      gradient_norm,
      adapter_delta_norm,
      learning_rate_applied: lr_applied,
      plasticity_eligibility: composed,
      brain_state_snapshot: {
        dopamine_tonic: dopamine,
        cortisol,
        acetylcholine: ach,
        norepinephrine_mode: ne,
      },
    };

    try {
      await postEvent(gateEvent);
      await postEvent(turnEvent);
      posted += 2;
    } catch (err) {
      errors++;
      console.warn(`turn ${i} POST failed:`, (err as Error).message);
    }

    // Snapshot at this turn?
    if (snapshotIndices.has(i)) {
      const snap: AdapterStateSnapshotEvent = {
        type: "adapter_state_snapshot",
        timestamp: ts,
        checkpoint_path: `adapters/seed/checkpoint-${i}.safetensors`,
        total_norm: totalNorm,
        per_layer_norms: {
          "0": totalNorm * 0.18,
          "12": totalNorm * 0.22,
          "24": totalNorm * 0.27,
          "48": totalNorm * 0.18,
          "78": totalNorm * 0.15,
        },
        since_last_checkpoint_delta_norm: driftSinceCheckpoint,
        total_turns_since_deployment: totalTurns,
        total_internal_thoughts_since_deployment: totalThoughts,
        trigger: sleepIndices.has(i) ? "sleep_consolidation" : "scheduled",
      };
      try {
        await postEvent(snap);
        posted++;
        driftSinceCheckpoint = 0;
      } catch (err) {
        errors++;
        console.warn(`snapshot ${i} POST failed:`, (err as Error).message);
      }
    }

    // Sleep cycle at this turn?
    if (sleepIndices.has(i)) {
      const preNorm = totalNorm;
      // Sleep pulls back ~3% of accumulated drift (homeostasis)
      const postNorm = totalNorm * 0.97;
      totalNorm = postNorm;

      const startEvent: SleepConsolidationEvent = {
        type: "sleep_consolidation",
        timestamp: ts,
        phase: "start",
        replay_pairs_sampled: 0,
        drift_cap_applied: false,
        pre_norm: preNorm,
        post_norm: preNorm,
        rollback_target: `adapters/seed/checkpoint-${i}.safetensors`,
      };
      const endEvent: SleepConsolidationEvent = {
        type: "sleep_consolidation",
        timestamp: new Date(now - ageMs + 60_000).toISOString(),
        phase: "end",
        replay_pairs_sampled: 75,
        drift_cap_applied: true,
        pre_norm: preNorm,
        post_norm: postNorm,
        rollback_target: `adapters/seed/checkpoint-${i}.safetensors`,
        duration_ms: 60_000,
      };
      try {
        await postEvent(startEvent);
        await postEvent(endEvent);
        posted += 2;
      } catch (err) {
        errors++;
        console.warn(`sleep ${i} POST failed:`, (err as Error).message);
      }
    }
  }

  console.log(`Done. Posted ${posted} events, ${errors} errors.`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
