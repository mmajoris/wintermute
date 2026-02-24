import { create } from "zustand";
import type {
  BrainEvent,
  BrainEventEnvelope,
  EmotionalStateEvent,
  SystemVitalsEvent,
  ThoughtLoopTickEvent,
} from "./brain-events";
import {
  getRegionForCollection,
  getRegionForWorker,
  getRegionForQueue,
  getPathwaysForEvent,
} from "./collection-mapping";
import type { HippocampalCascadeEvent, ThalamicGateEvent, LLMCallEvent } from "./brain-events";

export interface RegionActivity {
  regionId: string;
  intensity: number;
  lastActivity: number;
  activeOperations: Set<string>;
}

export interface ActiveWorker {
  worker: string;
  jobId: string;
  startedAt: number;
  regionId: string | null;
}

export interface QueueStatus {
  queue: string;
  pending: number;
  active: number;
  completed: number;
  failed: number;
}

export interface PathwayActivation {
  pathway: string;
  startedAt: number;
  intensity: number;
}

export interface SpreadingNode {
  regionId: string;
  delay: number;
  intensity: number;
}

export interface SpreadingActivation {
  id: string;
  startedAt: number;
  nodes: SpreadingNode[];
}

export interface CognitiveProcess {
  name: string;
  status: "active" | "completed";
  tier?: string;
  startedAt: number;
}

export interface LiveStore {
  connected: boolean;
  connectionError: string | null;
  eventsPerSecond: number;

  recentEvents: BrainEventEnvelope[];
  maxRecentEvents: number;

  regionActivity: Map<string, RegionActivity>;
  activeWorkers: Map<string, ActiveWorker>;
  queueStatus: Map<string, QueueStatus>;

  emotionalState: EmotionalStateEvent | null;
  systemVitals: SystemVitalsEvent | null;
  lastThoughtTick: ThoughtLoopTickEvent | null;
  thoughtLoopPulse: number;

  pathwayActivations: PathwayActivation[];
  spreadingActivations: SpreadingActivation[];
  activeProcesses: CognitiveProcess[];
  dopamineLevel: number;
  lastLLMCall: LLMCallEvent | null;
  lastThalamicGate: ThalamicGateEvent | null;
  lastCascade: HippocampalCascadeEvent | null;

  selectedRegionId: string | null;
  hoveredRegionId: string | null;

  setConnected: (connected: boolean, error?: string | null) => void;
  setEventsPerSecond: (rate: number) => void;
  processEvent: (envelope: BrainEventEnvelope) => void;
  processHistory: (envelopes: BrainEventEnvelope[]) => void;
  selectRegion: (id: string | null) => void;
  hoverRegion: (id: string | null) => void;
  decayActivity: () => void;
  triggerThoughtPulse: () => void;
  triggerPathway: (pathway: string, intensity?: number) => void;
  triggerSpreadingActivation: (sourceRegion: string, connectedRegions: string[]) => void;
  startBaselineActivity: () => void;
  stopBaselineActivity: () => void;
}

let baselineInterval: ReturnType<typeof setInterval> | null = null;

const ACTIVITY_DECAY_RATE = 0.92;
const MIN_ACTIVITY_THRESHOLD = 0.05;
const MAX_RECENT_EVENTS = 200;

export const useLiveStore = create<LiveStore>((set, get) => ({
  connected: false,
  connectionError: null,
  eventsPerSecond: 0,

  recentEvents: [],
  maxRecentEvents: MAX_RECENT_EVENTS,

  regionActivity: new Map(),
  activeWorkers: new Map(),
  queueStatus: new Map(),

  emotionalState: null,
  systemVitals: null,
  lastThoughtTick: null,
  thoughtLoopPulse: 0,

  pathwayActivations: [],
  spreadingActivations: [],
  activeProcesses: [],
  dopamineLevel: 0.5,
  lastLLMCall: null,
  lastThalamicGate: null,
  lastCascade: null,

  selectedRegionId: null,
  hoveredRegionId: null,

  setConnected: (connected, error = null) =>
    set({ connected, connectionError: error }),

  setEventsPerSecond: (rate) => set({ eventsPerSecond: rate }),

  processEvent: (envelope) => {
    const state = get();
    const event = envelope.event;
    const now = Date.now();

    const newRecentEvents = [...state.recentEvents, envelope].slice(
      -state.maxRecentEvents
    );

    const updates: Partial<LiveStore> = { recentEvents: newRecentEvents };
    const newRegionActivity = new Map(state.regionActivity);
    const newActiveWorkers = new Map(state.activeWorkers);
    const newQueueStatus = new Map(state.queueStatus);

    // Fire neurotransmitter pathways based on event type (multi-pathway, biologically accurate)
    const pathways = getPathwaysForEvent(event.type, event as unknown as Record<string, unknown>);
    for (const spec of pathways) {
      get().triggerPathway(spec.pathway, spec.intensity);
    }

    switch (event.type) {
      case "thought_loop_tick":
        updates.lastThoughtTick = event;
        updates.thoughtLoopPulse = 1;
        activateRegion(newRegionActivity, "thalamus", now, "thought_tick");
        if (event.impulse) {
          activateRegion(newRegionActivity, "left-hemisphere", now, "impulse");
          activateRegion(newRegionActivity, "right-hemisphere", now, "impulse");
        }
        break;

      case "collection_activity": {
        const regionId = getRegionForCollection(event.collection);
        if (regionId) {
          activateRegion(newRegionActivity, regionId, now, event.collection);
        }
        break;
      }

      case "worker_activity": {
        const regionId = getRegionForWorker(event.worker);
        if (event.status === "started") {
          newActiveWorkers.set(event.job_id, {
            worker: event.worker,
            jobId: event.job_id,
            startedAt: now,
            regionId,
          });
          if (regionId) {
            activateRegion(newRegionActivity, regionId, now, event.worker);
          }
        } else {
          newActiveWorkers.delete(event.job_id);
        }
        updates.activeWorkers = newActiveWorkers;
        break;
      }

      case "queue_metrics": {
        newQueueStatus.set(event.queue, {
          queue: event.queue,
          pending: event.pending,
          active: event.active,
          completed: event.completed,
          failed: event.failed,
        });
        updates.queueStatus = newQueueStatus;

        const regionId = getRegionForQueue(event.queue);
        if (regionId && event.active > 0) {
          activateRegion(newRegionActivity, regionId, now, event.queue);
        }
        break;
      }

      case "emotional_state":
        updates.emotionalState = event;
        activateRegion(newRegionActivity, "amygdala", now, "emotion");
        activateRegion(newRegionActivity, "raphe-nuclei", now, "serotonin_source");
        break;

      case "system_vitals":
        updates.systemVitals = event;
        activateRegion(newRegionActivity, "medulla", now, "heartbeat");
        activateRegion(newRegionActivity, "locus-coeruleus", now, "autonomic_tone");
        activateRegion(newRegionActivity, "raphe-nuclei", now, "autonomic_tone");
        break;

      case "soul_cycle": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "soul_cycle");
        activateRegion(newRegionActivity, "right-hemisphere", now, "soul_cycle");
        activateRegion(newRegionActivity, "basal-forebrain", now, "cholinergic_modulation");
        break;
      }

      case "action_dispatch": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "action_dispatch");
        activateRegion(newRegionActivity, "caudate-nucleus", now, "action_selection");
        break;
      }

      case "memory_event": {
        activateRegion(newRegionActivity, "hippocampus", now, "memory");
        activateRegion(newRegionActivity, "basal-forebrain", now, "cholinergic_memory");
        if (event.operation === "retrieve") {
          get().triggerSpreadingActivation("hippocampus", [
            "entorhinal-cortex", "dentate-gyrus", "subiculum",
            "left-hemisphere", "amygdala",
          ]);
        }
        break;
      }

      case "reward_signal": {
        activateRegion(newRegionActivity, "nucleus-accumbens", now, "reward");
        activateRegion(newRegionActivity, "substantia-nigra", now, "reward");
        const dopamine = 0.5 + (event.actual_reward || 0);
        updates.dopamineLevel = Math.max(0, Math.min(1, dopamine));
        break;
      }

      case "error_correction": {
        activateRegion(newRegionActivity, "cerebellum", now, "error_correction");
        activateRegion(newRegionActivity, "globus-pallidus", now, "gabaergic_output");
        break;
      }

      case "thalamic_gate": {
        activateRegion(newRegionActivity, "thalamus", now, "thalamic_gate");
        updates.lastThalamicGate = event as ThalamicGateEvent;
        const gateEvent = event as ThalamicGateEvent;
        if (gateEvent.gate_open || gateEvent.passed) {
          activateRegion(newRegionActivity, "left-hemisphere", now, "gate_passed");
          activateRegion(newRegionActivity, "locus-coeruleus", now, "arousal_burst");
        }
        break;
      }

      case "hippocampal_cascade": {
        const cascade = event as HippocampalCascadeEvent;
        updates.lastCascade = cascade;
        activateRegion(newRegionActivity, "hippocampus", now, "cascade");
        activateRegion(newRegionActivity, "basal-forebrain", now, "cholinergic_cascade");
        get().triggerSpreadingActivation("hippocampus", [
          "entorhinal-cortex", "dentate-gyrus", "subiculum",
          "left-hemisphere", "amygdala", "thalamus",
        ]);
        break;
      }

      case "llm_call": {
        updates.lastLLMCall = event as LLMCallEvent;
        const proc: CognitiveProcess = {
          name: `LLM ${(event as LLMCallEvent).tier}`,
          status: (event as LLMCallEvent).status === "started" ? "active" : "completed",
          tier: (event as LLMCallEvent).tier,
          startedAt: now,
        };
        const procs = state.activeProcesses.filter(p => p.name !== proc.name);
        if (proc.status === "active") procs.push(proc);
        updates.activeProcesses = procs;
        activateRegion(newRegionActivity, "left-hemisphere", now, "cortical_processing");
        break;
      }
    }

    updates.regionActivity = newRegionActivity;
    set(updates);
  },

  processHistory: (envelopes) => {
    for (const envelope of envelopes) {
      get().processEvent(envelope);
    }
  },

  selectRegion: (id) => set({ selectedRegionId: id }),
  hoverRegion: (id) => set({ hoveredRegionId: id }),

  decayActivity: () => {
    const state = get();
    const newRegionActivity = new Map<string, RegionActivity>();
    const now = Date.now();

    for (const [regionId, activity] of state.regionActivity) {
      const timeSinceActivity = now - activity.lastActivity;
      const decayFactor = Math.pow(ACTIVITY_DECAY_RATE, timeSinceActivity / 100);
      const newIntensity = activity.intensity * decayFactor;

      if (newIntensity > MIN_ACTIVITY_THRESHOLD) {
        newRegionActivity.set(regionId, {
          ...activity,
          intensity: newIntensity,
        });
      }
    }

    const newPulse = state.thoughtLoopPulse * 0.95;

    // Decay pathway activations
    const newPathways = state.pathwayActivations
      .map(p => ({ ...p, intensity: p.intensity * 0.96 }))
      .filter(p => p.intensity > 0.05);

    // Clean up expired spreading activations (3s lifetime)
    const newSpreading = state.spreadingActivations
      .filter(s => now - s.startedAt < 3000);

    // Clean up completed processes (5s after completion)
    const newProcesses = state.activeProcesses
      .filter(p => p.status === "active" || now - p.startedAt < 5000);

    set({
      regionActivity: newRegionActivity,
      thoughtLoopPulse: newPulse < 0.01 ? 0 : newPulse,
      pathwayActivations: newPathways,
      spreadingActivations: newSpreading,
      activeProcesses: newProcesses,
    });
  },

  triggerThoughtPulse: () => set({ thoughtLoopPulse: 1 }),

  triggerPathway: (pathway, intensity = 1) => {
    const state = get();
    const existing = state.pathwayActivations.filter(
      p => Date.now() - p.startedAt < 3000
    );
    existing.push({ pathway, startedAt: Date.now(), intensity });
    set({ pathwayActivations: existing });
  },

  triggerSpreadingActivation: (sourceRegion, connectedRegions) => {
    const state = get();
    const id = `spread_${Date.now()}`;
    const nodes: SpreadingNode[] = [
      { regionId: sourceRegion, delay: 0, intensity: 1 },
      ...connectedRegions.map((r, i) => ({
        regionId: r,
        delay: (i + 1) * 200,
        intensity: 0.7 - i * 0.1,
      })),
    ];
    const active = state.spreadingActivations.filter(
      s => Date.now() - s.startedAt < 3000
    );
    active.push({ id, startedAt: Date.now(), nodes });
    set({ spreadingActivations: active });
  },

  startBaselineActivity: () => {
    if (baselineInterval) return;
    baselineInterval = setInterval(() => {
      // The brain is NEVER quiet. All major neurotransmitter systems
      // maintain tonic (baseline) firing rates at all times.
      get().triggerPathway("glutamate", 0.1);
      get().triggerPathway("gaba", 0.1);
      get().triggerPathway("serotonin", 0.05);
      get().triggerPathway("norepinephrine", 0.05);
    }, 2000);
  },

  stopBaselineActivity: () => {
    if (baselineInterval) {
      clearInterval(baselineInterval);
      baselineInterval = null;
    }
  },
}));

function activateRegion(
  activityMap: Map<string, RegionActivity>,
  regionId: string,
  now: number,
  operation: string
): void {
  const existing = activityMap.get(regionId);
  const newIntensity = existing
    ? Math.min(existing.intensity + 0.3, 1)
    : 0.5;

  const activeOperations = existing?.activeOperations ?? new Set();
  activeOperations.add(operation);

  activityMap.set(regionId, {
    regionId,
    intensity: newIntensity,
    lastActivity: now,
    activeOperations,
  });
}

export function getFilteredEvents(
  events: BrainEventEnvelope[],
  regionId: string | null,
  types?: BrainEvent["type"][]
): BrainEventEnvelope[] {
  return events.filter((envelope) => {
    if (types && !types.includes(envelope.event.type)) {
      return false;
    }

    if (!regionId) return true;

    const event = envelope.event;
    switch (event.type) {
      case "collection_activity":
        return getRegionForCollection(event.collection) === regionId;
      case "worker_activity":
        return getRegionForWorker(event.worker) === regionId;
      case "queue_metrics":
        return getRegionForQueue(event.queue) === regionId;
      default:
        return true;
    }
  });
}
