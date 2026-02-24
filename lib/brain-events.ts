/**
 * Brain Event Types
 * 
 * These types define the events that Molly's brain pushes to the visualization app.
 * Each event type corresponds to a different aspect of brain activity.
 */

export interface ThoughtLoopTickEvent {
  type: "thought_loop_tick";
  timestamp: string;
  impulse: boolean;
  mood: number; // 0-1
  energy: number; // 0-1
  unresolved_thought: string | null;
}

export interface CollectionActivityEvent {
  type: "collection_activity";
  timestamp: string;
  collection: string;
  operation: "read" | "write" | "delete";
  count: number;
  query_type?: string;
}

export interface WorkerActivityEvent {
  type: "worker_activity";
  timestamp: string;
  worker: string;
  status: "started" | "completed" | "failed";
  job_id: string;
  duration_ms?: number;
  error?: string;
}

export interface QueueMetricsEvent {
  type: "queue_metrics";
  timestamp: string;
  queue: string;
  pending: number;
  active: number;
  completed: number;
  failed: number;
}

export interface EmotionalStateEvent {
  type: "emotional_state";
  timestamp: string;
  valence: number; // -1 to 1 (negative to positive)
  arousal: number; // 0 to 1 (calm to excited)
  mood: string;
  dominant_emotion?: string;
}

export interface SoulCycleEvent {
  type: "soul_cycle";
  timestamp: string;
  tier: "light" | "deeper" | "full";
  status: "started" | "completed";
  reflection_summary?: string;
}

export interface ActionDispatchEvent {
  type: "action_dispatch";
  timestamp: string;
  action: string;
  target: string;
  status: "dispatched" | "completed" | "failed";
  result?: string;
}

export interface SystemVitalsEvent {
  type: "system_vitals";
  timestamp: string;
  cpu_percent: number;
  memory_percent: number;
  disk_percent: number;
  uptime_seconds: number;
  heartbeat_ok: boolean;
}

export interface BudgetStatusEvent {
  type: "budget_status";
  timestamp: string;
  today_spend: number;
  daily_limit: number;
  monthly_spend: number;
  monthly_limit: number;
  tier_availability: {
    mini: boolean;
    "4o": boolean;
    sonnet: boolean;
    opus: boolean;
  };
}

export interface MemoryEvent {
  type: "memory_event";
  timestamp: string;
  operation: "write" | "retrieve" | "consolidate" | "decay";
  memory_id?: string;
  emotional_weight?: number;
  consolidation_score?: number;
}

export interface RewardSignalEvent {
  type: "reward_signal";
  timestamp: string;
  action: string;
  predicted_reward: number;
  actual_reward: number;
  prediction_error: number;
}

export interface ErrorCorrectionEvent {
  type: "error_correction";
  timestamp: string;
  source: string;
  predicted_outcome: string;
  actual_outcome: string;
  correction_applied: boolean;
}

export interface ThalamicGateEvent {
  type: "thalamic_gate";
  timestamp: string;
  signal_type?: string;
  signal_source?: string;
  gate_open?: boolean;
  passed?: boolean;
  signal_strength?: number;
  content?: string;
  filtered_reason?: string;
}

export interface HippocampalCascadeEvent {
  type: "hippocampal_cascade";
  timestamp: string;
  total_activated: number;
  hop1_count: number;
  hop2_count: number;
  narrative_count: number;
  top_score: number;
}

export interface LLMCallEvent {
  type: "llm_call";
  timestamp: string;
  tier: string;
  purpose: string;
  status: "started" | "completed";
  duration_ms?: number;
  model?: string;
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

export interface BrainEventEnvelope {
  id: string;
  event: BrainEvent;
  received_at: string;
}

export function isBrainEvent(obj: unknown): obj is BrainEvent {
  if (!obj || typeof obj !== "object") return false;
  const event = obj as { type?: string };
  return typeof event.type === "string" && [
    "thought_loop_tick",
    "collection_activity",
    "worker_activity",
    "queue_metrics",
    "emotional_state",
    "soul_cycle",
    "action_dispatch",
    "system_vitals",
    "budget_status",
    "memory_event",
    "reward_signal",
    "error_correction",
    "thalamic_gate",
    "hippocampal_cascade",
    "llm_call",
  ].includes(event.type);
}
