# Molly → Brain Visualization Integration Spec

This document is the complete implementation specification for wiring Molly's cognitive systems to the brain visualization at [nulltruth.com](https://nulltruth.com). Follow it top to bottom. Every code block is copy-pasteable.

---

## 1. Overview

Molly pushes brain events to `https://nulltruth.com/api/brain-events` via HTTP POST. Events are streamed to the browser via SSE for real-time 3D brain visualization.

**Architecture:**

```
┌────────────────────────────────────────────────────────────────┐
│                  Molly's VM (Isolated)                          │
│                                                                │
│   Thought Loop ──┐                                             │
│   Crons ─────────┼──► emitBrainEvent() ──► POST /api/brain-events
│   Cognition ─────┘        │                                    │
│                      100ms batch                               │
│                      fire-and-forget                           │
└───────────────────────────┼────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────────┐
│             nulltruth.com (Visualization App)                  │
│                                                                │
│   /api/brain-events ──► Event Buffer ──► SSE Stream            │
│                                              │                 │
│                                              ▼                 │
│                                         /live page             │
│                                    (3D brain visualization)    │
└────────────────────────────────────────────────────────────────┘
```

**Principles:**
- Bearer token auth using `BRAIN_VIZ_API_KEY`
- Fire-and-forget — never blocks cognition
- 100ms batch window — events queue up and flush together
- If nulltruth.com is down, events are silently dropped
- No retries, no queuing — visualization is non-critical

---

## 2. Environment Variables

Add to Molly's `.env`:

```env
BRAIN_VIZ_URL=https://nulltruth.com
BRAIN_VIZ_API_KEY=<matching key from Vercel env vars>
```

The key must match the `BRAIN_API_KEY` environment variable configured in the Vercel deployment of nulltruth.com.

---

## 3. Create `src/lib/brain-viz.ts`

This is the emitter module. It batches events into 100ms windows and sends them as a single POST. Every `emitBrainEvent()` call is non-blocking and failure-safe.

```typescript
import type { BrainEvent } from './brain-events.js';

const BRAIN_VIZ_URL = process.env.BRAIN_VIZ_URL;
const BRAIN_VIZ_API_KEY = process.env.BRAIN_VIZ_API_KEY;

let eventQueue: BrainEvent[] = [];
let flushTimeout: NodeJS.Timeout | null = null;

function scheduleFlush(): void {
  if (flushTimeout) return;
  flushTimeout = setTimeout(async () => {
    flushTimeout = null;
    const batch = eventQueue.splice(0);
    if (batch.length === 0) return;
    try {
      await fetch(`${BRAIN_VIZ_URL}/api/brain-events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${BRAIN_VIZ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batch),
      });
    } catch {
      // Never let viz failures affect brain operation
    }
  }, 100);
}

export function emitBrainEvent(event: BrainEvent): void {
  if (!BRAIN_VIZ_URL || !BRAIN_VIZ_API_KEY) return;
  eventQueue.push(event);
  scheduleFlush();
}
```

### 3.1 BrainEvent Type Definitions

Create `src/lib/brain-events.ts` with the full type definitions. These must match what the wintermute visualization app expects.

```typescript
export interface ThoughtLoopTickEvent {
  type: 'thought_loop_tick';
  timestamp: string;
  impulse: boolean;
  mood: number;       // 0-1
  energy: number;     // 0-1
  unresolved_thought: string | null;
}

export interface CollectionActivityEvent {
  type: 'collection_activity';
  timestamp: string;
  collection: string;
  operation: 'read' | 'write' | 'delete';
  count: number;
  query_type?: string;
}

export interface WorkerActivityEvent {
  type: 'worker_activity';
  timestamp: string;
  worker: string;
  status: 'started' | 'completed' | 'failed';
  job_id: string;
  duration_ms?: number;
  error?: string;
}

export interface QueueMetricsEvent {
  type: 'queue_metrics';
  timestamp: string;
  queue: string;
  pending: number;
  active: number;
  completed: number;
  failed: number;
}

export interface EmotionalStateEvent {
  type: 'emotional_state';
  timestamp: string;
  valence: number;    // -1 to 1
  arousal: number;    // 0 to 1
  mood: string;
  dominant_emotion?: string;
}

export interface SoulCycleEvent {
  type: 'soul_cycle';
  timestamp: string;
  tier: 'light' | 'deeper' | 'full';
  status: 'started' | 'completed';
  reflection_summary?: string;
}

export interface ActionDispatchEvent {
  type: 'action_dispatch';
  timestamp: string;
  action: string;
  target: string;
  status: 'dispatched' | 'completed' | 'failed';
  result?: string;
}

export interface SystemVitalsEvent {
  type: 'system_vitals';
  timestamp: string;
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
  uptime_seconds: number;
  heartbeat_ok: boolean;
}

export interface BudgetStatusEvent {
  type: 'budget_status';
  timestamp: string;
  today_spend: number;
  daily_limit: number;
  monthly_spend: number;
  monthly_limit: number;
  tier_availability: {
    mini: boolean;
    '4o': boolean;
    sonnet: boolean;
    opus: boolean;
  };
}

export interface MemoryEvent {
  type: 'memory_event';
  timestamp: string;
  operation: 'write' | 'retrieve' | 'consolidate' | 'decay';
  memory_id?: string;
  emotional_weight?: number;
  consolidation_score?: number;
}

export interface RewardSignalEvent {
  type: 'reward_signal';
  timestamp: string;
  action: string;
  predicted_reward: number;
  actual_reward: number;
  prediction_error: number;
}

export interface ErrorCorrectionEvent {
  type: 'error_correction';
  timestamp: string;
  source: string;
  predicted_outcome: string;
  actual_outcome: string;
  correction_applied: boolean;
}

// --- NEW event types (not yet in wintermute, will be added) ---

export interface ThalamicGateEvent {
  type: 'thalamic_gate';
  timestamp: string;
  gate_open: boolean;
  signal_strength: number;  // 0-1
  filtered_reason?: string; // why the gate stayed closed, if it did
}

export interface HippocampalCascadeEvent {
  type: 'hippocampal_cascade';
  timestamp: string;
  total_activated: number;
  hop1_count: number;
  hop2_count: number;
  narrative_count: number;
  top_score: number;
}

export interface LLMCallEvent {
  type: 'llm_call';
  timestamp: string;
  tier: string;            // e.g. 'mini', '4o', 'sonnet', 'opus'
  purpose: string;         // e.g. 'message_response', 'reflection', 'classification'
  status: 'started' | 'completed' | 'failed';
  duration_ms?: number;
  tokens_used?: number;
}

export type BrainEvent =
  | ThoughtLoopTickEvent
  | CollectionActivityEvent
  | WorkerActivityEvent
  | QueueMetricsEvent
  | EmotionalStateEvent
  | SoulCycleEvent
  | ActionDispatchEvent
  | SystemVitalsEvent
  | BudgetStatusEvent
  | MemoryEvent
  | RewardSignalEvent
  | ErrorCorrectionEvent
  | ThalamicGateEvent
  | HippocampalCascadeEvent
  | LLMCallEvent;
```

> **Note:** The three new types (`thalamic_gate`, `hippocampal_cascade`, `llm_call`) will also need to be added to wintermute's `lib/brain-events.ts` and the `isBrainEvent()` validator. That is a wintermute-side change, not a Molly change.

---

## 4. Integration Points — Exact Code Changes

For each file below: add the import at the top, then insert the `emitBrainEvent()` calls at the specified locations.

**Import line for all files:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

(Adjust relative path based on file depth.)

---

### 4.1 `src/brain/thought-loop.ts` — `corticalCycle()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Change 1 — At the START of `corticalCycle()`, before the gate check:**

Emit a heartbeat pulse on every cycle iteration, even when the gate stays closed. This is what creates the rhythmic "breathing" of the brain visualization.

```typescript
emitBrainEvent({
  type: 'thought_loop_tick',
  timestamp: new Date().toISOString(),
  impulse: false,
  mood: awareness?.currentMood?.valence ?? 0.5,
  energy: awareness?.currentMood?.arousal ?? 0.5,
  unresolved_thought: null,
});
```

**Change 2 — After `const signal = await checkGate();` and the `if (!signal) return;` block:**

When the thalamic gate opens, emit the gate event.

```typescript
emitBrainEvent({
  type: 'thalamic_gate',
  timestamp: new Date().toISOString(),
  gate_open: true,
  signal_strength: signal.strength ?? 1.0,
});
```

Also update the heartbeat to reflect that an impulse is firing:

```typescript
emitBrainEvent({
  type: 'thought_loop_tick',
  timestamp: new Date().toISOString(),
  impulse: true,
  mood: awareness?.currentMood?.valence ?? 0.5,
  energy: awareness?.currentMood?.arousal ?? 0.5,
  unresolved_thought: null,
});
```

**Change 3 — After `const impulse = await evaluateSignal(signal, awareness);`:**

```typescript
emitBrainEvent({
  type: 'emotional_state',
  timestamp: new Date().toISOString(),
  valence: awareness?.currentMood?.valence ?? 0.5,
  arousal: awareness?.currentMood?.arousal ?? 0.5,
  mood: awareness?.currentMood?.label ?? 'neutral',
  dominant_emotion: awareness?.currentMood?.label,
});
```

**Change 4 — After `const thought = await think(impulse, awareness);`:**

```typescript
emitBrainEvent({
  type: 'action_dispatch',
  timestamp: new Date().toISOString(),
  action: 'conscious_thought',
  target: thought.target || 'internal',
  status: 'dispatched',
});
```

---

### 4.2 `src/cognition/limbic-reaction.ts` — `reactEmotionally()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert after `await updateMood(...)` (around line 40):**

```typescript
emitBrainEvent({
  type: 'emotional_state',
  timestamp: new Date().toISOString(),
  valence: newValence,
  arousal: newArousal,
  mood: reaction.feeling || 'neutral',
  dominant_emotion: reaction.feeling,
});
```

---

### 4.3 `src/cognition/hippocampal-cascade.ts` — `activateMemories()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert after `const firstHop = await searchSimilar(...)` (around line 101-107):**

```typescript
emitBrainEvent({
  type: 'memory_event',
  timestamp: new Date().toISOString(),
  operation: 'retrieve',
  emotional_weight: firstHop.reduce(
    (sum, r) => sum + ((r.payload as any).emotional_weight || 0), 0
  ) / Math.max(firstHop.length, 1),
});
```

**Insert after the narrative hop search:**

```typescript
emitBrainEvent({
  type: 'memory_event',
  timestamp: new Date().toISOString(),
  operation: 'retrieve',
  emotional_weight: narrativeResults.reduce(
    (sum, r) => sum + ((r.payload as any).emotional_weight || 0), 0
  ) / Math.max(narrativeResults.length, 1),
});
```

**Insert at the end of the function (around line 219), after ranking is complete:**

```typescript
emitBrainEvent({
  type: 'hippocampal_cascade',
  timestamp: new Date().toISOString(),
  total_activated: ranked.length,
  hop1_count: hopCounts[1] || 0,
  hop2_count: hopCounts[2] || 0,
  narrative_count: narrativeCount,
  top_score: ranked[0]?.score || 0,
});
```

---

### 4.4 `src/cognition/message-handler.ts` — `handleMessageStream()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert after the `Promise.all` for classification + limbic reaction (around line 148-151):**

```typescript
emitBrainEvent({
  type: 'collection_activity',
  timestamp: new Date().toISOString(),
  collection: 'signal_router',
  operation: 'read',
  count: 1,
  query_type: classification.category,
});
```

**Insert after `callLLMStream` begins (around line 187):**

```typescript
emitBrainEvent({
  type: 'llm_call',
  timestamp: new Date().toISOString(),
  tier: responseTier,
  purpose: 'message_response',
  status: 'started',
});
```

---

### 4.5 `src/crons/heartbeat.ts` — `runHeartbeat()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert after the `const vitals = {...}` block (around line 29):**

```typescript
emitBrainEvent({
  type: 'system_vitals',
  timestamp,
  cpu_percent: cpuUsage * 100,
  memory_percent: memoryUsage * 100,
  disk_percent: 0,
  uptime_seconds: uptime,
  heartbeat_ok: vitals.healthy,
});
```

---

### 4.6 `src/crons/soul-cycle.ts` — `runSoulCycle()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert at the start of the function, after the `const timestamp` line:**

```typescript
emitBrainEvent({
  type: 'soul_cycle',
  timestamp,
  tier: type,
  status: 'started',
});
```

**Insert after the reflection is stored (`await upsertPoint('narrative_engine', ...)`, around line 74):**

```typescript
emitBrainEvent({
  type: 'soul_cycle',
  timestamp,
  tier: type,
  status: 'completed',
  reflection_summary: (result.reflection || result.brief_reflection || '').slice(0, 200),
});
```

---

### 4.7 `src/crons/reward-aggregator.ts` — `runRewardAggregator()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert after `const dopamineLevel = ...` (around line 50):**

```typescript
emitBrainEvent({
  type: 'reward_signal',
  timestamp,
  action: 'reward_aggregation',
  predicted_reward: 0.5,
  actual_reward: avgReward,
  prediction_error: avgPredictionError,
});
```

---

### 4.8 `src/crons/memory-consolidation.ts` — `runMemoryConsolidation()`

**Import:**
```typescript
import { emitBrainEvent } from '../lib/brain-viz.js';
```

**Insert after the consolidation summary log (around line 87):**

```typescript
if (consolidated > 0) {
  emitBrainEvent({
    type: 'memory_event',
    timestamp,
    operation: 'consolidate',
    consolidation_score: consolidated,
  });
}
if (decayed > 0) {
  emitBrainEvent({
    type: 'memory_event',
    timestamp,
    operation: 'decay',
    consolidation_score: decayed,
  });
}
```

---

### 4.9 `src/lib/qdrant.ts` — `upsertPoint()` and `searchSimilar()`

**Import:**
```typescript
import { emitBrainEvent } from './brain-viz.js';
```

**Insert at the end of `upsertPoint()`, after `await qdrant.upsert(...)` (around line 130):**

```typescript
emitBrainEvent({
  type: 'collection_activity',
  timestamp: new Date().toISOString(),
  collection,
  operation: 'write',
  count: 1,
});
```

**Insert at the end of `searchSimilar()`, after `const result = await qdrant.search(...)` (around line 148):**

```typescript
emitBrainEvent({
  type: 'collection_activity',
  timestamp: new Date().toISOString(),
  collection,
  operation: 'read',
  count: result.length,
});
```

---

## 5. Testing

Test the endpoint with curl before deploying Molly changes. Replace `YOUR_API_KEY` with the actual key.

### Single events

```bash
# Test heartbeat (brainstem pulse)
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"system_vitals","timestamp":"2026-02-22T12:00:00Z","cpu_percent":25,"memory_percent":60,"disk_percent":40,"uptime_seconds":3600,"heartbeat_ok":true}'

# Test thought loop tick
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"thought_loop_tick","timestamp":"2026-02-22T12:00:00Z","impulse":true,"mood":0.7,"energy":0.6,"unresolved_thought":null}'

# Test emotional state
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"emotional_state","timestamp":"2026-02-22T12:00:00Z","valence":0.8,"arousal":0.6,"mood":"content","dominant_emotion":"curiosity"}'

# Test collection activity
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"collection_activity","timestamp":"2026-02-22T12:00:00Z","collection":"memory_embeddings","operation":"write","count":3}'

# Test soul cycle
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"soul_cycle","timestamp":"2026-02-22T12:00:00Z","tier":"light","status":"started"}'

# Test memory event
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"memory_event","timestamp":"2026-02-22T12:00:00Z","operation":"retrieve","emotional_weight":0.7}'

# Test reward signal
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"reward_signal","timestamp":"2026-02-22T12:00:00Z","action":"reward_aggregation","predicted_reward":0.5,"actual_reward":0.72,"prediction_error":0.22}'
```

### Batch events

```bash
curl -X POST https://nulltruth.com/api/brain-events \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '[{"type":"memory_event","timestamp":"2026-02-22T12:00:00Z","operation":"retrieve","emotional_weight":0.7},{"type":"collection_activity","timestamp":"2026-02-22T12:00:01Z","collection":"hippocampus","operation":"read","count":12}]'
```

### Expected response

```json
{
  "received": 1,
  "buffer_size": 47,
  "connected_clients": 2
}
```

---

## 6. Expected Visualization Behavior

| Event | What Happens in the Brain Visualization |
|---|---|
| `system_vitals` | Brainstem pulses subtly every 5s |
| `thought_loop_tick` (impulse=false) | Faint global pulse — the brain is "breathing" |
| `thought_loop_tick` (impulse=true) | Thalamus flashes, followed by cortex activation |
| `thalamic_gate` (gate_open=true) | Thalamus gateway fires, signal routes to cortex |
| `emotional_state` | Amygdala glows, color shifts based on valence |
| `collection_activity` | The mapped brain region for that collection lights up |
| `memory_event` (retrieve) | Hippocampus fires, spreading activation to connected regions |
| `memory_event` (consolidate) | Hippocampus → cortex transfer animation |
| `memory_event` (decay) | Faint fade in hippocampus region |
| `hippocampal_cascade` | Multi-hop spreading activation across hippocampal formation |
| `soul_cycle` (started) | Left hemisphere (narrative) begins glowing |
| `soul_cycle` (completed) | Glow intensifies then fades |
| `reward_signal` | Dopamine pathway fires: substantia nigra → nucleus accumbens |
| `llm_call` (started) | Cortex region brightens for the duration of the call |
| `llm_call` (completed) | Cortex pulse on completion |

### Collection → Brain Region Mapping

The visualization maps Qdrant collection names to brain regions. Key mappings relevant to the integration points:

| Collection | Brain Region |
|---|---|
| `memory_embeddings` | Hippocampus |
| `memory_consolidation` | Hippocampus |
| `pattern_completion` | Hippocampus |
| `narrative_engine` | Left Hemisphere |
| `state_modulators` | Amygdala |
| `reward_signals` | Nucleus Accumbens |
| `error_correction` | Cerebellum |
| `signal_router` | Thalamus |
| `attention_router` | Thalamus |
| `dopamine_regulation` | Substantia Nigra |
| `working_memory` | Left Hemisphere |

---

## 7. Performance Notes

- The **100ms batch window** means events are sent at most 10 times/second
- Each POST is **fire-and-forget** — if nulltruth.com is down, events are silently dropped
- **No retries, no queuing** — visualization is non-critical
- Total overhead: ~1 fetch call per 100ms during active periods, zero during idle
- `emitBrainEvent()` is synchronous from the caller's perspective — it just pushes to an in-memory array and returns immediately
- The setTimeout-based flush runs on the next event loop tick, never blocking the calling function

---

## 8. Implementation Checklist

- [ ] Add `BRAIN_VIZ_URL` and `BRAIN_VIZ_API_KEY` to `.env`
- [ ] Create `src/lib/brain-events.ts` with all type definitions
- [ ] Create `src/lib/brain-viz.ts` with the batching emitter
- [ ] Wire `src/brain/thought-loop.ts` — heartbeat + gate + impulse events
- [ ] Wire `src/cognition/limbic-reaction.ts` — emotional state
- [ ] Wire `src/cognition/hippocampal-cascade.ts` — memory retrieval + cascade summary
- [ ] Wire `src/cognition/message-handler.ts` — signal routing + LLM calls
- [ ] Wire `src/crons/heartbeat.ts` — system vitals
- [ ] Wire `src/crons/soul-cycle.ts` — reflection start/complete
- [ ] Wire `src/crons/reward-aggregator.ts` — dopamine signals
- [ ] Wire `src/crons/memory-consolidation.ts` — consolidation + decay
- [ ] Wire `src/lib/qdrant.ts` — collection read/write tracking
- [ ] Test with curl against nulltruth.com
- [ ] Verify events appear in the live visualization

---

## 9. Biological Accuracy Recommendations

These are improvements to make Molly's event emissions more neurologically accurate, enabling better visualization of real brain dynamics.

### 9.1 GABAergic Inhibition — Thalamic Gate Closed Events

Currently, `thalamic_gate` is only emitted when the gate opens (signal passes). In real neuroscience, the thalamic reticular nucleus actively inhibits thalamic relay neurons via GABA when gating out irrelevant stimuli. This is not silence — it is active suppression.

**Recommendation:** In `src/brain/thought-loop.ts`, emit a `thalamic_gate` event with `gate_open: false` when `checkGate()` returns null. This fires the GABA pathway visualization (purple inhibitory signal) and shows the brain actively filtering:

```typescript
const signal = await checkGate();
if (!signal) {
  emitBrainEvent({
    type: 'thalamic_gate',
    timestamp: new Date().toISOString(),
    gate_open: false,
    signal_strength: 0,
  });
  return;
}
```

### 9.2 Source Region on Emotional State Events

The amygdala, hypothalamus, and anterior insula all generate emotional responses, but they serve different functions:
- **Amygdala**: Fear, threat detection, emotional salience
- **Hypothalamus**: Homeostatic drives (hunger, thirst, temperature), hormonal responses
- **Anterior insula**: Interoceptive awareness, disgust, empathy

**Recommendation:** Add a `source_region` field to `emotional_state` events so the visualization can light up the correct structure:

```typescript
emitBrainEvent({
  type: 'emotional_state',
  timestamp: new Date().toISOString(),
  valence: newValence,
  arousal: newArousal,
  mood: reaction.feeling || 'neutral',
  dominant_emotion: reaction.feeling,
  source_region: 'amygdala', // or 'hypothalamus' for homeostatic
});
```

### 9.3 Locus Coeruleus Arousal Events

The locus coeruleus (LC) is the brain's primary source of norepinephrine. It fires tonically during wakefulness and phasically during salient/alerting events. Molly has no explicit LC analog.

**Recommendation:** Emit a norepinephrine-specific event when arousal changes significantly (e.g., in the thalamic gate when a high-priority signal arrives, or in the heartbeat when CPU spikes):

```typescript
// In heartbeat when system is stressed
if (cpuUsage > 0.7 || !vitals.healthy) {
  emitBrainEvent({
    type: 'emotional_state',
    timestamp,
    valence: 0.3,
    arousal: 0.8,
    mood: 'alert',
    dominant_emotion: 'vigilance',
    source_region: 'locus_coeruleus',
  });
}
```

### 9.4 Differentiate Memory Operations by Hippocampal Subfield

Real hippocampal memory processing involves distinct subfields:
- **Dentate gyrus**: Pattern separation (novelty detection)
- **CA3**: Pattern completion (associative recall)
- **CA1**: Temporal context, output to cortex
- **Subiculum**: Output relay to cortex

**Recommendation:** Add a `subfield` field to `memory_event` for retrieval operations:

```typescript
emitBrainEvent({
  type: 'memory_event',
  timestamp: new Date().toISOString(),
  operation: 'retrieve',
  emotional_weight: avgWeight,
  subfield: 'ca3', // or 'dentate_gyrus' for novelty
});
```

### 9.5 Basal Ganglia Action Selection

The basal ganglia (caudate, putamen, globus pallidus) implement action selection via the direct/indirect pathway. When Molly decides to express a thought or dispatch an action, this is basal ganglia circuit activity.

**Recommendation:** Emit `action_dispatch` events with the basal ganglia pathway data:

```typescript
emitBrainEvent({
  type: 'action_dispatch',
  timestamp,
  action: 'expression',
  target: 'mike',
  status: 'dispatched',
  pathway: 'direct', // or 'indirect' for inhibited actions
});
```

### 9.6 Default Mode Network vs Task-Positive Network

Soul cycles represent default mode network (DMN) activity. When Molly is actively processing a message, that's the task-positive network (TPN). These two networks are anticorrelated — when one activates, the other suppresses.

**Recommendation:** Emit a `network_switch` event when transitioning between conversation and idle reflection, so the visualization can show the DMN/TPN toggle.
