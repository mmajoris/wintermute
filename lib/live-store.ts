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
} from "./collection-mapping";

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
}

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

    switch (event.type) {
      case "thought_loop_tick":
        updates.lastThoughtTick = event;
        updates.thoughtLoopPulse = 1;
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
        break;

      case "system_vitals":
        updates.systemVitals = event;
        break;

      case "soul_cycle": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "soul_cycle");
        break;
      }

      case "action_dispatch": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "action_dispatch");
        break;
      }

      case "memory_event": {
        activateRegion(newRegionActivity, "hippocampus", now, "memory");
        break;
      }

      case "reward_signal": {
        activateRegion(newRegionActivity, "nucleus-accumbens", now, "reward");
        break;
      }

      case "error_correction": {
        activateRegion(newRegionActivity, "cerebellum", now, "error_correction");
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

    set({
      regionActivity: newRegionActivity,
      thoughtLoopPulse: newPulse < 0.01 ? 0 : newPulse,
    });
  },

  triggerThoughtPulse: () => set({ thoughtLoopPulse: 1 }),
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
