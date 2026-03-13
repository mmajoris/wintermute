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
  source_structure?: "amygdala" | "anterior_insula" | "hypothalamus" | "anterior_cingulate";
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
  source_region?: string;
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
  gate_open: boolean;
  signal_strength: number;
  signal_type?: string;
  signal_source?: string;
  /** @deprecated Use gate_open — kept for simulator backward compat */
  passed?: boolean;
  content?: string;
  filtered_reason?: string;
  norepinephrine_tonic?: number;
  norepinephrine_phasic?: number;
  norepinephrine_mode?: NorepinephrineMode;
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
  status: "started" | "completed" | "failed";
  duration_ms?: number;
  tokens_used?: number;
  model?: string;
}

export type NorepinephrineMode = "low_tonic" | "phasic_ready" | "high_tonic";

export interface NeurochemistryStateEvent {
  type: "neurochemistry_state";
  timestamp: string;
  oxytocin: number;
  cortisol: number;
  endorphin: number;
  acetylcholine?: number;
  serotonin?: number;
  norepinephrine_tonic?: number;
  norepinephrine_phasic?: number;
  norepinephrine_mode?: NorepinephrineMode;
  source_region:
    | "paraventricular_nucleus"
    | "hpa_axis"
    | "periaqueductal_gray"
    | "basal_forebrain"
    | "dorsal_raphe_median_raphe"
    | "locus_coeruleus"
    | "multi_system"
    | "distributed_neuromodulatory_systems";
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
  | LLMCallEvent
  | NeurochemistryStateEvent;

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
    "neurochemistry_state",
  ].includes(event.type);
}
