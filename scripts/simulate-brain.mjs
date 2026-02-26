#!/usr/bin/env node

/**
 * Brain Activity Simulator
 *
 * Sends realistic brain events to the local (or remote) visualization server
 * to test visuals without needing the actual Molly brain running.
 *
 * Usage:
 *   node scripts/simulate-brain.mjs                     # default: localhost:3000
 *   node scripts/simulate-brain.mjs --url https://nulltruth.com
 *   node scripts/simulate-brain.mjs --mode burst         # intense activity burst
 *   node scripts/simulate-brain.mjs --mode idle          # quiet baseline hum
 *   node scripts/simulate-brain.mjs --mode full          # everything firing
 */

import { readFileSync } from "fs";
import { resolve } from "path";

const args = process.argv.slice(2);
function getArg(name, fallback) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
}

let API_KEY;
try {
  const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  const match = envFile.match(/^BRAIN_API_KEY=(.+)$/m);
  if (match) API_KEY = match[1].trim();
} catch { /* ignore */ }

const BASE_URL = getArg("url", "http://localhost:3000");
const MODE = getArg("mode", "full");
const ENDPOINT = `${BASE_URL}/api/brain-events`;

const COLLECTIONS = [
  "memory_embeddings", "memory_consolidation", "pattern_completion",
  "pattern_separation", "state_modulators", "action_selector",
  "reward_signals", "signal_router", "attention_router",
  "narrative_engine", "working_memory", "language_output",
  "error_correction", "dopamine_regulation", "motivation_signals",
  "homeostasis_controller", "circadian_clock",
];

const WORKERS = [
  "input-classifier", "pattern-separator", "emotional-tagger",
  "memory-writer", "memory-retriever", "action-gate",
  "reward-predictor", "error-corrector", "sensory-integrator",
  "action-dispatcher", "executive-controller", "narrative-engine",
];

const QUEUES = [
  "input-raw", "classify-result", "memory-write", "memory-retrieve",
  "action-evaluate", "action-execute", "reward-compute", "reflection", "thought",
];

const MOODS = ["calm", "curious", "focused", "contemplative", "energetic", "wistful"];
const EMOTIONS = ["interest", "surprise", "satisfaction", "determination", "nostalgia", "amusement"];
const LLM_TIERS = ["mini", "4o", "sonnet", "opus", "o1"];
const LLM_MODELS = ["gpt-4o-mini", "gpt-4o", "claude-sonnet-4-20250514", "claude-opus-4-20250514", "o1"];
const ACTIONS = ["send_message", "search_web", "write_memory", "reflect", "update_mood", "schedule_task"];
const TARGETS = ["discord", "internal", "memory_store", "soul_journal", "task_queue"];

const ts = () => new Date().toISOString();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => min + Math.random() * (max - min);
const randInt = (min, max) => Math.floor(rand(min, max));

function thoughtLoopTick(impulse = false) {
  return {
    type: "thought_loop_tick",
    timestamp: ts(),
    impulse,
    mood: rand(0.3, 0.9),
    energy: rand(0.2, 1.0),
    unresolved_thought: impulse ? "Processing new input signal" : null,
  };
}

function collectionActivity(op = "read") {
  return {
    type: "collection_activity",
    timestamp: ts(),
    collection: pick(COLLECTIONS),
    operation: op,
    count: randInt(1, 50),
    query_type: op === "read" ? pick(["semantic_search", "exact_match", "scroll"]) : undefined,
  };
}

function workerActivity(status = "completed") {
  return {
    type: "worker_activity",
    timestamp: ts(),
    worker: pick(WORKERS),
    status,
    job_id: `job_${Date.now()}_${randInt(1000, 9999)}`,
    duration_ms: status === "completed" ? randInt(50, 3000) : undefined,
  };
}

function queueMetrics() {
  return {
    type: "queue_metrics",
    timestamp: ts(),
    queue: pick(QUEUES),
    pending: randInt(0, 15),
    active: randInt(0, 5),
    completed: randInt(100, 5000),
    failed: randInt(0, 10),
  };
}

function emotionalState() {
  return {
    type: "emotional_state",
    timestamp: ts(),
    valence: rand(-0.3, 0.8),
    arousal: rand(0.1, 0.9),
    mood: pick(MOODS),
    dominant_emotion: pick(EMOTIONS),
  };
}

function soulCycle() {
  return {
    type: "soul_cycle",
    timestamp: ts(),
    tier: pick(["light", "deeper", "full"]),
    status: pick(["started", "completed"]),
    reflection_summary: "Reflecting on recent interactions and updating self-model",
  };
}

function actionDispatch() {
  return {
    type: "action_dispatch",
    timestamp: ts(),
    action: pick(ACTIONS),
    target: pick(TARGETS),
    status: pick(["dispatched", "completed"]),
  };
}

function systemVitals() {
  return {
    type: "system_vitals",
    timestamp: ts(),
    cpu_percent: rand(5, 60),
    memory_percent: rand(30, 75),
    disk_percent: rand(20, 50),
    uptime_seconds: randInt(86400, 864000),
    heartbeat_ok: true,
  };
}

function memoryEvent(op) {
  return {
    type: "memory_event",
    timestamp: ts(),
    operation: op || pick(["write", "retrieve", "consolidate", "decay"]),
    memory_id: `mem_${Date.now()}`,
    emotional_weight: rand(0, 1),
    consolidation_score: rand(0.5, 1),
  };
}

function rewardSignal() {
  const predicted = rand(0, 1);
  const actual = rand(0, 1);
  return {
    type: "reward_signal",
    timestamp: ts(),
    action: pick(ACTIONS),
    predicted_reward: predicted,
    actual_reward: actual,
    prediction_error: actual - predicted,
  };
}

function errorCorrection() {
  return {
    type: "error_correction",
    timestamp: ts(),
    source: pick(["action_outcome", "prediction_mismatch", "social_feedback"]),
    predicted_outcome: "Expected positive response",
    actual_outcome: "Received neutral response",
    correction_applied: Math.random() > 0.3,
  };
}

function thalamicGate(open = true) {
  return {
    type: "thalamic_gate",
    timestamp: ts(),
    signal_type: pick(["sensory", "cognitive", "emotional"]),
    signal_source: pick(["discord_input", "internal_thought", "memory_recall"]),
    gate_open: open,
    passed: open,
    signal_strength: rand(0.3, 1.0),
    content: open ? "Signal passed thalamic filter" : undefined,
    filtered_reason: open ? undefined : "Below arousal threshold",
  };
}

function hippocampalCascade() {
  const hop1 = randInt(3, 15);
  const hop2 = randInt(1, 8);
  return {
    type: "hippocampal_cascade",
    timestamp: ts(),
    total_activated: hop1 + hop2 + randInt(0, 3),
    hop1_count: hop1,
    hop2_count: hop2,
    narrative_count: randInt(0, 3),
    top_score: rand(0.7, 0.99),
  };
}

function llmCall(status = "started") {
  const tierIdx = randInt(0, LLM_TIERS.length);
  return {
    type: "llm_call",
    timestamp: ts(),
    tier: LLM_TIERS[tierIdx],
    purpose: pick(["thought_generation", "memory_query", "response_draft", "self_reflection", "action_planning"]),
    status,
    duration_ms: status === "completed" ? randInt(200, 8000) : undefined,
    model: LLM_MODELS[tierIdx],
  };
}

async function sendEvents(events) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (API_KEY) headers["Authorization"] = `Bearer ${API_KEY}`;

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(events),
    });
    const data = await res.json();
    const types = events.map(e => e.type);
    const unique = [...new Set(types)];
    console.log(
      `[${new Date().toLocaleTimeString()}] Sent ${events.length} events (${unique.join(", ")}) → ${res.status} | buffer: ${data.buffer_size} | clients: ${data.connected_clients}`
    );
  } catch (err) {
    console.error(`[ERROR] ${err.message}`);
  }
}

// ── Simulation Patterns ──────────────────────────────────────────────

async function idleLoop() {
  console.log("🧠 Idle mode — quiet baseline hum\n");
  while (true) {
    await sendEvents([
      thoughtLoopTick(false),
      systemVitals(),
    ]);
    await sleep(2000);

    if (Math.random() > 0.6) {
      await sendEvents([collectionActivity("read")]);
    }
    await sleep(randInt(1000, 3000));
  }
}

async function burstLoop() {
  console.log("⚡ Burst mode — intense neural activity\n");
  while (true) {
    // Rapid fire: thalamic gate opens, cascade, LLM calls, actions
    await sendEvents([
      thalamicGate(true),
      thoughtLoopTick(true),
    ]);
    await sleep(200);

    await sendEvents([
      hippocampalCascade(),
      memoryEvent("retrieve"),
      collectionActivity("read"),
      collectionActivity("read"),
    ]);
    await sleep(300);

    await sendEvents([
      llmCall("started"),
      workerActivity("started"),
      emotionalState(),
    ]);
    await sleep(500);

    await sendEvents([
      llmCall("completed"),
      workerActivity("completed"),
      rewardSignal(),
      collectionActivity("write"),
    ]);
    await sleep(400);

    await sendEvents([
      actionDispatch(),
      memoryEvent("write"),
      errorCorrection(),
    ]);
    await sleep(600);

    // Brief pause between bursts
    await sendEvents([
      thoughtLoopTick(false),
      systemVitals(),
    ]);
    await sleep(randInt(800, 2000));
  }
}

async function fullLoop() {
  console.log("🌐 Full simulation — mixed realistic activity\n");

  let cycle = 0;
  while (true) {
    cycle++;

    // Every cycle: thought loop tick + vitals (baseline rhythm)
    await sendEvents([
      thoughtLoopTick(cycle % 4 === 0),
      systemVitals(),
    ]);
    await sleep(800);

    // Frequent: collection reads, worker activity
    await sendEvents([
      collectionActivity("read"),
      collectionActivity(Math.random() > 0.7 ? "write" : "read"),
      workerActivity(pick(["started", "completed"])),
    ]);
    await sleep(600);

    // Thalamic gating + memory retrieval
    if (cycle % 3 === 0) {
      const gateOpen = Math.random() > 0.3;
      await sendEvents([thalamicGate(gateOpen)]);
      await sleep(300);

      if (gateOpen) {
        await sendEvents([
          hippocampalCascade(),
          memoryEvent("retrieve"),
        ]);
        await sleep(400);
      }
    }

    // LLM calls
    if (cycle % 2 === 0) {
      await sendEvents([llmCall("started")]);
      await sleep(randInt(300, 1200));
      await sendEvents([llmCall("completed")]);
      await sleep(200);
    }

    // Emotional state shifts
    if (cycle % 5 === 0) {
      await sendEvents([emotionalState()]);
      await sleep(300);
    }

    // Reward / error correction
    if (cycle % 4 === 0) {
      await sendEvents([
        rewardSignal(),
        errorCorrection(),
      ]);
      await sleep(400);
    }

    // Actions
    if (cycle % 6 === 0) {
      await sendEvents([actionDispatch()]);
      await sleep(300);
    }

    // Soul cycle (rare)
    if (cycle % 20 === 0) {
      await sendEvents([soulCycle()]);
      await sleep(500);
    }

    // Memory writes
    if (cycle % 3 === 0) {
      await sendEvents([memoryEvent("write")]);
      await sleep(200);
    }

    // Memory consolidation (rare)
    if (cycle % 15 === 0) {
      await sendEvents([memoryEvent("consolidate")]);
      await sleep(400);
    }

    // Queue metrics
    if (cycle % 7 === 0) {
      await sendEvents([queueMetrics()]);
    }

    await sleep(randInt(400, 1200));
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ─────────────────────────────────────────────────────────────

console.log(`\n  Brain Activity Simulator`);
console.log(`  Target:  ${ENDPOINT}`);
console.log(`  API Key: ${API_KEY ? API_KEY.slice(0, 8) + "..." : "NOT SET (requests may fail)"}`);
console.log(`  Mode:    ${MODE}\n`);

const modes = { idle: idleLoop, burst: burstLoop, full: fullLoop };
const runner = modes[MODE];
if (!runner) {
  console.error(`Unknown mode "${MODE}". Use: idle, burst, full`);
  process.exit(1);
}

runner().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
