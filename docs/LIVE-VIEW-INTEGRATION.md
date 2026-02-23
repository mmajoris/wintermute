# Live View Integration Guide

This document describes how to integrate Molly's brain with the Live View visualization.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Molly's VM (Isolated)                         │
│                                                                  │
│   Thought Loop ──┐                                               │
│   Workers ───────┼──► emitBrainEvent() ──► POST /api/brain-events│
│   Crons ─────────┘                              │                │
└─────────────────────────────────────────────────│────────────────┘
                                                  │
                                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Visualization App (Public)                       │
│                                                                  │
│   /api/brain-events ──► Event Buffer ──► SSE Stream              │
│                                              │                   │
│                                              ▼                   │
│                                         /live page               │
│                                    (3D brain visualization)      │
└─────────────────────────────────────────────────────────────────┘
```

**Key principle:** Molly pushes events out. The visualization app never reaches into Molly's VM.

## Setup

### 1. Generate API Key

```bash
# Generate a secure key
openssl rand -hex 32
```

### 2. Configure Visualization App

Create `.env.local` in the wintermute directory:

```env
BRAIN_API_KEY=your-generated-key-here
```

### 3. Configure Molly's Environment

Add to Molly's `.env`:

```env
BRAIN_VIZ_URL=https://your-visualization-app.vercel.app
BRAIN_VIZ_API_KEY=your-generated-key-here
```

## Molly-Side Integration

### Helper Function

Add this to Molly's codebase at `src/lib/brain-viz.ts`:

```typescript
import type { BrainEvent } from "./brain-events";

const BRAIN_VIZ_URL = process.env.BRAIN_VIZ_URL;
const BRAIN_VIZ_API_KEY = process.env.BRAIN_VIZ_API_KEY;

export async function emitBrainEvent(event: BrainEvent): Promise<void> {
  if (!BRAIN_VIZ_URL || !BRAIN_VIZ_API_KEY) {
    return; // Silently skip if not configured
  }

  try {
    await fetch(`${BRAIN_VIZ_URL}/api/brain-events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BRAIN_VIZ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
  } catch (error) {
    // Don't let visualization failures affect brain operation
    console.warn("[brain-viz] Failed to emit event:", error);
  }
}

export async function emitBrainEvents(events: BrainEvent[]): Promise<void> {
  if (!BRAIN_VIZ_URL || !BRAIN_VIZ_API_KEY || events.length === 0) {
    return;
  }

  try {
    await fetch(`${BRAIN_VIZ_URL}/api/brain-events`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BRAIN_VIZ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
    });
  } catch (error) {
    console.warn("[brain-viz] Failed to emit events:", error);
  }
}
```

### Event Types

Copy the event types from `lib/brain-events.ts` to Molly's codebase, or import them if sharing code.

## Integration Points

### Thought Loop

```typescript
// In thought-loop.ts
import { emitBrainEvent } from "./brain-viz";

async function thoughtLoop() {
  while (alive) {
    const awareness = await gatherAwareness();
    const impulse = await checkForImpulse(awareness);

    // Emit thought tick
    await emitBrainEvent({
      type: "thought_loop_tick",
      timestamp: new Date().toISOString(),
      impulse: !!impulse,
      mood: awareness.mood,
      energy: awareness.energy,
      unresolved_thought: awareness.unresolvedThought,
    });

    if (impulse) {
      const thought = await think(impulse);
      // ... rest of loop
    }

    await sleep(5_000);
  }
}
```

### Workers

```typescript
// In any worker
import { emitBrainEvent } from "../lib/brain-viz";

worker.process(async (job) => {
  const startTime = Date.now();

  await emitBrainEvent({
    type: "worker_activity",
    timestamp: new Date().toISOString(),
    worker: "memory-writer",
    status: "started",
    job_id: job.id,
  });

  try {
    // ... do work ...

    await emitBrainEvent({
      type: "worker_activity",
      timestamp: new Date().toISOString(),
      worker: "memory-writer",
      status: "completed",
      job_id: job.id,
      duration_ms: Date.now() - startTime,
    });
  } catch (error) {
    await emitBrainEvent({
      type: "worker_activity",
      timestamp: new Date().toISOString(),
      worker: "memory-writer",
      status: "failed",
      job_id: job.id,
      duration_ms: Date.now() - startTime,
      error: error.message,
    });
    throw error;
  }
});
```

### Qdrant Operations

```typescript
// Wrap Qdrant client
import { emitBrainEvent } from "./brain-viz";

export async function writeToCollection(
  collection: string,
  points: Point[]
): Promise<void> {
  await qdrant.upsert(collection, { points });

  await emitBrainEvent({
    type: "collection_activity",
    timestamp: new Date().toISOString(),
    collection,
    operation: "write",
    count: points.length,
  });
}

export async function searchCollection(
  collection: string,
  vector: number[],
  limit: number
): Promise<SearchResult[]> {
  const results = await qdrant.search(collection, { vector, limit });

  await emitBrainEvent({
    type: "collection_activity",
    timestamp: new Date().toISOString(),
    collection,
    operation: "read",
    count: results.length,
    query_type: "search",
  });

  return results;
}
```

### Emotional State

```typescript
// In emotional-baseline.ts cron
import { emitBrainEvent } from "../lib/brain-viz";

async function updateEmotionalBaseline() {
  const state = await computeEmotionalState();

  await emitBrainEvent({
    type: "emotional_state",
    timestamp: new Date().toISOString(),
    valence: state.valence,
    arousal: state.arousal,
    mood: state.moodLabel,
    dominant_emotion: state.dominantEmotion,
  });
}
```

### Soul Cycles

```typescript
// In soul-light.ts, soul-deeper.ts, soul-full.ts
import { emitBrainEvent } from "../lib/brain-viz";

async function soulCycle(tier: "light" | "deeper" | "full") {
  await emitBrainEvent({
    type: "soul_cycle",
    timestamp: new Date().toISOString(),
    tier,
    status: "started",
  });

  const reflection = await runReflection(tier);

  await emitBrainEvent({
    type: "soul_cycle",
    timestamp: new Date().toISOString(),
    tier,
    status: "completed",
    reflection_summary: reflection.summary,
  });
}
```

### System Vitals

```typescript
// In heartbeat.ts cron
import { emitBrainEvent } from "../lib/brain-viz";
import os from "os";

async function heartbeat() {
  const cpuUsage = os.loadavg()[0] / os.cpus().length * 100;
  const memUsage = (1 - os.freemem() / os.totalmem()) * 100;

  await emitBrainEvent({
    type: "system_vitals",
    timestamp: new Date().toISOString(),
    cpu_percent: cpuUsage,
    memory_percent: memUsage,
    disk_percent: await getDiskUsage(),
    uptime_seconds: process.uptime(),
    heartbeat_ok: true,
  });
}
```

## Event Types Reference

| Event Type | When to Emit | Key Fields |
|------------|--------------|------------|
| `thought_loop_tick` | Every thought loop iteration (5s) | `impulse`, `mood`, `energy` |
| `collection_activity` | On Qdrant read/write | `collection`, `operation`, `count` |
| `worker_activity` | Worker start/complete/fail | `worker`, `status`, `duration_ms` |
| `queue_metrics` | Periodically from queue-metrics cron | `queue`, `pending`, `active` |
| `emotional_state` | On emotional baseline update | `valence`, `arousal`, `mood` |
| `soul_cycle` | Soul cycle start/complete | `tier`, `status` |
| `action_dispatch` | On action execution | `action`, `target`, `status` |
| `system_vitals` | From heartbeat cron | `cpu_percent`, `memory_percent` |
| `budget_status` | From budget-alert cron | `today_spend`, `daily_limit` |
| `memory_event` | On memory operations | `operation`, `emotional_weight` |
| `reward_signal` | From reward predictor | `prediction_error` |
| `error_correction` | From error corrector | `source`, `correction_applied` |

## Collection to Region Mapping

The visualization maps Qdrant collections to brain regions. See `lib/collection-mapping.ts` for the full mapping. Key mappings:

| Collection | Brain Region |
|------------|--------------|
| `memory_embeddings` | Hippocampus |
| `narrative_engine` | Left Hemisphere |
| `state_modulators` | Amygdala |
| `reward_signals` | Nucleus Accumbens |
| `error_correction` | Cerebellum |
| `signal_router` | Thalamus |
| `dopamine_regulation` | Substantia Nigra |

## Testing

### Manual Event Injection

```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/brain-events \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "thought_loop_tick",
    "timestamp": "2026-02-22T12:00:00Z",
    "impulse": true,
    "mood": 0.7,
    "energy": 0.8,
    "unresolved_thought": null
  }'
```

### Batch Events

```bash
curl -X POST http://localhost:3000/api/brain-events \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '[
    {"type": "collection_activity", "timestamp": "2026-02-22T12:00:00Z", "collection": "memory_embeddings", "operation": "write", "count": 5},
    {"type": "worker_activity", "timestamp": "2026-02-22T12:00:01Z", "worker": "memory-writer", "status": "completed", "job_id": "job_123", "duration_ms": 150}
  ]'
```

## Performance Considerations

1. **Batch events when possible** - Use `emitBrainEvents()` for multiple events
2. **Fire and forget** - Don't await visualization calls in critical paths
3. **Graceful degradation** - Visualization failures should never affect brain operation
4. **Rate limiting** - The API accepts high-frequency events, but consider batching if sending >100/s

## Troubleshooting

### Events not appearing in Live View

1. Check the API key matches in both environments
2. Verify the visualization app URL is correct
3. Check browser console for SSE connection errors
4. Test the API endpoint directly with curl

### High latency

1. Batch events instead of sending individually
2. Check network connectivity between Molly's VM and the visualization app
3. Consider reducing event frequency for non-critical events

### Connection drops

The SSE client automatically reconnects after 3 seconds. If connections are unstable:
1. Check for network issues
2. Verify the server isn't being rate-limited
3. Check server logs for errors
