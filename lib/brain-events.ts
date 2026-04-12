/**
 * Brain Event Types
 *
 * These types define the events that Molly's brain pushes to the visualization app.
 * Each event type corresponds to a different aspect of brain activity.
 *
 * Keep in sync with: molly/src/lib/brain-events.ts
 */

// ── Inlined enum types from Molly ────────────────────────────────────────

export type NorepinephrineMode = "low_tonic" | "phasic_ready" | "high_tonic";
export type OscillationMode = "waking" | "nrem" | "rem";
export type AutonomicDominance = "sympathetic" | "parasympathetic";
export type SleepPressureMode = "wake_accumulation" | "sleep_dissipation";
export type SleepReplayState = "wake" | "nrem";
export type VigilanceStateKind = "engaged" | "recovering";
export type CognitiveFatigueStateKind = "engaged" | "recovering";

// ── Event Interfaces ─────────────────────────────────────────────────────

export interface ThoughtLoopTickEvent {
  type: "thought_loop_tick";
  timestamp: string;
  impulse: boolean;
  mood: number;
  energy: number;
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
  valence: number;
  arousal: number;
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

export interface ActionMonitoringEvent {
  type: "action_monitoring";
  timestamp: string;
  prediction_id: string;
  action_types: string[];
  outcome: "match" | "mismatch";
  predicted_action_outcomes: number[];
  actual_action_outcomes: number[];
  prediction_error: number;
  expected_prediction_error: number;
  mismatch_magnitude: number;
  confirmation_signal: number;
  surprise_signal: number;
  triggered_interoception: boolean;
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
  circadian_theta?: number;
  circadian_ct_hours?: number;
  homeostatic_sleep_pressure?: number;
  combined_sleep_propensity?: number;
  sleep_pressure_mode?: SleepPressureMode;
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
  sleep_state?: SleepReplayState;
  spindle_ripple_coupling?: number;
  replay_gain?: number;
  emotional_priority_gain?: number;
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
  filtered_reason?: string;
  attentional_salience?: number;
  suppression_tone?: number;
  focus_intensity?: number;
  attended_target?: string;
  broke_through_suppression?: boolean;
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

export interface DentateGyrusNeurogenesisEvent {
  type: "dentate_gyrus_neurogenesis";
  timestamp: string;
  phase: "encoding" | "retrieval" | "consolidation";
  neurogenesis_rate: number;
  enrichment_drive: number;
  restorative_support: number;
  stress_suppression: number;
  trace_count?: number;
  mean_pattern_separation_bias?: number;
}

export interface DirectedForgettingEvent {
  type: "directed_forgetting";
  timestamp: string;
  cue: string;
  source: string;
  targeted_memory_count: number;
  mean_suppression_tone: number;
  top_suppression_tone: number;
  gaba_level: number;
  recent_average_novelty: number;
  vmpfc_amygdala_coupling: number;
}

export interface SourceMonitoringEvent {
  type: "source_monitoring";
  timestamp: string;
  action: string;
  supported: boolean;
  confidence: number;
  supporting_trace_count: number;
  best_match_id: string | null;
}

export interface MetamemoryEvent {
  type: "metamemory";
  timestamp: string;
  kind: "feeling_of_knowing" | "judgment_of_learning" | "tip_of_the_tongue" | "semantic_confidence";
  feeling: "confident" | "should_verify" | "tip_of_the_tongue";
  confidence: number;
  fluency: number;
  activated_trace_count: number;
  source_quality: number;
  encoding_strength: number;
  context_richness: number;
  statement: string;
}

export interface MetacognitionEvent {
  type: "metacognition";
  timestamp: string;
  clarity: number;
  processing_depth: number;
  cortical_support: number;
  conflict_load: number;
  sustained_conflict: number;
  recent_error_rate: number;
  arousal_level: number;
  feeling: "clear" | "uncertain" | "reasoning_alarm";
}

export interface TheoryOfMindEvent {
  type: "theory_of_mind";
  timestamp: string;
  person: string;
  phase: "knowledge_updated" | "belief_updated" | "intention_updated" | "knowledge_gap_detected";
  model_confidence: number;
  knowledge_count: number;
  belief_count: number;
  intention_count: number;
  statement: string;
  confidence: number;
}

export interface SelfPresentationEvent {
  type: "self_presentation";
  timestamp: string;
  person: string;
  trait: string;
  feedback_valence: "affirming" | "critical";
  confidence: number;
  favorability: number;
  model_confidence: number;
}

export interface CognitiveEmpathyEvent {
  type: "cognitive_empathy";
  timestamp: string;
  person: string;
  dominant_circuit: "seeking" | "rage" | "fear" | "lust" | "care" | "panic_grief" | "play";
  confidence: number;
  model_confidence: number;
  mentalized_context_confidence: number;
  simulated_valence: number;
  simulated_arousal: number;
  simulated_dominance: number;
  situation: string;
}

export interface SocialLearningEvent {
  type: "social_learning";
  timestamp: string;
  phase: "observation" | "integration";
  person: string;
  strategy_label: string;
  inferred_intention: string;
  context_domain: string;
  confidence: number;
  learned_from_person: string;
  tool_patterns: string[];
}

export interface SenseOfAgencyEvent {
  type: "sense_of_agency";
  timestamp: string;
  action_summary: string;
  action_types: string[];
  attribution: "self_caused" | "externally_caused";
  agency_level: number;
  externalization_level: number;
  comparator_match: number;
  source_monitoring_confidence: number;
  cerebellar_confidence: number;
  prediction_error: number;
  mismatch_magnitude: number;
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

export interface ToolExecutionEvent {
  type: "tool_execution";
  timestamp: string;
  tool_name: string;
  arguments: Record<string, unknown>;
  success: boolean;
  duration_ms: number;
  error?: string;
}

export interface NeurochemistryStateEvent {
  type: "neurochemistry_state";
  timestamp: string;
  oxytocin: number;
  crh?: number;
  acth?: number;
  cortisol: number;
  npy?: number;
  endorphin: number;
  acetylcholine?: number;
  serotonin?: number;
  orexin?: number;
  histamine?: number;
  melatonin?: number;
  endocannabinoids?: number;
  vasopressin?: number;
  norepinephrine_tonic?: number;
  norepinephrine_phasic?: number;
  norepinephrine_mode?: NorepinephrineMode;
  dopamine_tonic?: number;
  dopamine_phasic?: number;
  arousal?: number;
  wake_maintenance_drive?: number;
  source_region:
    | "paraventricular_nucleus"
    | "hpa_axis"
    | "periaqueductal_gray"
    | "basal_forebrain"
    | "dorsal_raphe_median_raphe"
    | "locus_coeruleus"
    | "lateral_hypothalamus"
    | "tuberomammillary_nucleus"
    | "pineal_gland"
    | "distributed_retrograde_synapses"
    | "multi_system"
    | "distributed_neuromodulatory_systems";
}

export interface PfcRegulationEvent {
  type: "pfc_regulation";
  timestamp: string;
  regulation_capacity: number;
  vmpfc_amygdala_coupling: number;
  itc_strength: number;
  depletion_level: number;
  target_circuits: Record<string, number>;
  suppression_magnitude: number;
  fear_extinction_learning_signal: number;
  strategy: "reappraisal";
  cortisol_at_regulation: number;
  arousal_at_regulation: number;
  vagal_tone_at_regulation: number;
  outcome: "applied" | "insufficient_capacity" | "proportionate";
}

export interface BnstStateEvent {
  type: "bnst_state";
  timestamp: string;
  source: string;
  sustained_anxiety: number;
  previous_sustained_anxiety: number;
  diffuse_threat_input: number;
  crh_drive: number;
  anxiolytic_buffer: number;
  relief_applied: number;
  outcome: "elevated" | "damped" | "stable";
}

export interface AccStateEvent {
  type: "acc_state";
  timestamp: string;
  evc_score: number;
  conflict_level: number;
  error_signal: number;
  effort_accumulated: number;
  distress_level: number;
  subdivision: "dACC" | "sgACC" | "pgACC";
  payoff: number;
  control_cost: number;
  outcome: "increase_control" | "maintain" | "disengage" | "distress_alarm";
}

export interface SalienceEvaluationEvent {
  type: "salience_evaluation";
  timestamp: string;
  salience_score: number;
  dimensions: {
    emotional_valence: number;
    personal_relevance: number;
    novelty: number;
    prediction_error: number;
    temporal_urgency: number;
  };
  ne_modulation: number;
  threshold: number;
  outcome: "pass" | "filter";
  source: "soul_cycle" | "thought_loop" | "external";
  content_summary: string;
}

export interface TimePerceptionEvent {
  type: "time_perception";
  timestamp: string;
  context: "social_gap" | "conversation" | "generic_interval";
  wall_clock_duration_ms: number;
  subjective_duration_ms: number;
  accumulator_duration_ms: number;
  subjective_rate: number;
  interoceptive_moment_rate_hz: number;
  cerebellar_interval_estimate_ms: number | null;
  cerebellar_calibration_weight: number;
  norepinephrine_dilation: number;
  dopamine_compression: number;
  cortisol_distortion: number;
  temporal_salience: number;
  feeling: string;
}

export interface VigilanceEvent {
  type: "vigilance";
  timestamp: string;
  vigilance_capacity: number;
  vigilance_depletion: number;
  time_on_task_hours: number;
  attention_demand: number;
  attention_breadth_multiplier: number;
  processing_speed_multiplier: number;
  error_rate: number;
  state: VigilanceStateKind;
}

export interface CognitiveFatigueEvent {
  type: "cognitive_fatigue";
  timestamp: string;
  cognitive_capacity: number;
  fatigue_load: number;
  accumulated_effort_hours: number;
  effort_demand: number;
  processing_depth_multiplier: number;
  response_quality_penalty: number;
  state: CognitiveFatigueStateKind;
}

export interface AutonomicBalanceEvent {
  type: "autonomic_balance";
  timestamp: string;
  sympathetic_tone: number;
  parasympathetic_tone: number;
  vagal_tone: number;
  autonomic_balance: number;
  allostatic_load: number;
  chronic_stress_load: number;
  social_engagement_safety: number;
  restorative_state: number;
  regulation_capacity_multiplier: number;
  dominant_branch: AutonomicDominance;
}

export interface NetworkSwitchEvent {
  type: "network_switch";
  timestamp: string;
  from_network: "DMN" | "CEN";
  to_network: "DMN" | "CEN";
  trigger: "salience" | "task_demand" | "timeout";
  salience_score: number;
  evc_score: number;
  anti_correlation_strength: number;
}

export interface ExpressionInhibitionEvent {
  type: "expression_inhibition";
  timestamp: string;
  go_strength: number;
  stop_strength: number;
  outcome: "expressed" | "inhibited";
  proactive_level: number;
  emotional_load: number;
  spillover_magnitude: number;
  race_duration: string;
}

export interface InteroceptionSignalEvent {
  type: "interoception_signal";
  timestamp: string;
  signal_description: string;
  source_module: string;
  priority: number;
  signal_source: string;
}

export interface TelegramMessageEvent {
  type: "telegram_message";
  timestamp: string;
  direction: "sent" | "received";
  chat_id: string;
  message_length: number;
  is_unsolicited: boolean;
  origin: string;
}

export interface BasalGangliaStrategyEvent {
  type: "basal_ganglia_strategy";
  timestamp: string;
  phase: "selection" | "labeling" | "reinforcement" | "tick";
  activity_type: string;
  context_domain: string;
  strategy_label: string | null;
  channel_id: string | null;
  learning_origin: "performed_experience" | "observed_other" | null;
  learned_from_person: string | null;
  selection_strength: number;
  context_similarity: number;
  go_drive: number;
  no_go_drive: number;
  gpi_tonic_inhibition: number;
  control_locus?: "ventral_striatum" | "dorsal_striatum" | null;
  ventral_control_strength?: number;
  dorsal_control_strength?: number;
  reinforcement_consistency?: number;
  dorsal_habit_strength?: number;
  cortical_deliberation_demand?: number;
  prediction_error?: number;
}

export interface ValueComparisonEvent {
  type: "value_comparison";
  timestamp: string;
  option_count: number;
  winning_option_id: string;
  winning_option_label: string;
  winning_value: number;
  runner_up_option_id: string | null;
  runner_up_option_label: string | null;
  runner_up_value: number | null;
  value_difference: number;
  decision_confidence: number;
  deliberation_difficulty: number;
}

export interface MoralReasoningEvent {
  type: "moral_reasoning";
  timestamp: string;
  option_count: number;
  selected_option_id: string;
  selected_option_label: string;
  pfc_capacity: number;
  dominant_route: "emotional" | "deliberative" | "balanced";
  emotional_signal: number;
  deliberative_signal: number;
  integrated_signal: number;
  value_alignment: number;
  empathic_cost: number;
  theory_of_mind_alignment: number;
  moral_conflict: number;
  acc_conflict_level: number;
}

export interface CognitiveFlexibilityEvent {
  type: "cognitive_flexibility";
  timestamp: string;
  phase: "switch_initiated" | "switch_completed" | "released_to_idle";
  from_task_set: string;
  to_task_set: string;
  delay_ms: number;
  task_dissimilarity: number;
  practice_strength: number;
  previous_task_inhibition_tone: number;
  thalamic_reconfiguration_penalty: number;
}

export interface CerebellarPredictionEvent {
  type: "cerebellar_prediction";
  timestamp: string;
  phase: "prediction" | "learning" | "tick";
  prediction_id: string;
  domain: string | null;
  active_granule_fraction: number;
  aggregate_confidence: number;
  mean_absolute_error?: number;
  tick_hz: number;
}

export interface StatisticalLearningBrainEvent {
  type: "statistical_learning";
  timestamp: string;
  phase: "learning" | "consolidation" | "bias_refresh";
  stream: "message_metadata" | "affect_state" | "neurochemical_state" | "tool_use" | "multi_stream" | "sleep";
  transition_updates: number;
  cooccurrence_updates: number;
  top_bias_strength: number;
  temporal_pattern_count: number;
  sleep_state?: "wake" | "nrem";
}

export interface ProspectiveMemoryEvent {
  type: "prospective_memory";
  timestamp: string;
  phase: "registered" | "triggered" | "completed" | "missed" | "linked_to_goal";
  intention_id: string;
  trigger_type: "time_based" | "event_based";
  goal_id?: string;
  target_timestamp?: string;
  target_subjective_duration_ms?: number;
  cue?: string;
  matched_context?: string;
  subjective_duration_ms?: number;
}

export interface GoalPlanEvent {
  type: "goal_plan";
  timestamp: string;
  phase: "decomposed" | "step_completed" | "step_failed" | "replanned" | "escalated" | "completed";
  goal_id: string;
  plan_id: string;
  current_step_id: string | null;
  current_step: string | null;
  total_steps: number;
  completed_steps: number;
  pending_steps: number;
  completed_step_id?: string;
  failed_step_id?: string;
  failure_signal?: string;
}

export interface PhenomenalBindingEvent {
  type: "phenomenal_binding";
  timestamp: string;
  workspace_mode: "idle" | "conversation" | "reflection" | "sleep";
  workspace_source: string;
  binding_rule: "gamma_coherence" | "nrem_delta_spindle_ripple" | "ungated";
  inclusion_strength: number;
  global_coherence: number;
  dominant_oscillation_mode: "waking" | "nrem" | "rem" | "offline";
  content_admitted: boolean;
  relevant_populations: string[];
  bound_populations: string[];
  suppressed_populations: string[];
}

// ── Affect Circuits (Panksepp 7) — flat phasic/tonic fields ─────────────

export interface AffectCircuitLevel {
  phasic: number;
  tonic: number;
}

export interface AffectCircuitsEvent {
  type: "affect_circuits";
  timestamp: string;
  seeking: number;
  rage: number;
  fear: number;
  lust: number;
  care: number;
  panic_grief: number;
  play: number;
  seeking_tonic: number;
  rage_tonic: number;
  fear_tonic: number;
  lust_tonic: number;
  care_tonic: number;
  panic_grief_tonic: number;
  play_tonic: number;
  valence: number;
  arousal: number;
  dominance: number;
}

/** Helper: convert flat Molly format to { phasic, tonic } pairs for UI components */
export function getAffectCircuitLevel(
  event: AffectCircuitsEvent,
  circuit: "seeking" | "rage" | "fear" | "lust" | "care" | "panic_grief" | "play",
): AffectCircuitLevel {
  return {
    phasic: event[circuit],
    tonic: event[`${circuit}_tonic` as keyof AffectCircuitsEvent] as number,
  };
}

// ── Dopamine State (VTA / NAc) ───────────────────────────────────────────

export interface DopamineStateEvent {
  type: "dopamine_state";
  timestamp: string;
  tonic: number;
  phasic: number;
  baseline: number;
  learning_signal: number;
  last_prediction_error: number;
  last_average_reward: number;
  sample_size: number;
}

// ── HPA Axis State ───────────────────────────────────────────────────────

export interface HpaAxisStateEvent {
  type: "hpa_axis_state";
  timestamp: string;
  crh: number;
  acth: number;
  cortisol: number;
  npy: number;
  mr_occupancy: number;
  gr_occupancy: number;
  circadian_multiplier: number;
  circadian_baseline: number;
  slow_feedback: number;
  fast_feedback: number;
  chronic_exposure: number;
  gr_sensitivity: number;
  total_suppression: number;
  effective_acth_drive: number;
  crh_npy_anxiety_index: number;
}

// ── Endorphin Dynamics (PAG) ─────────────────────────────────────────────

export interface EndorphinDynamicsEvent {
  type: "endorphin_dynamics";
  timestamp: string;
  endorphin: number;
  effort: number;
  refractory_active: boolean;
}

// ── Circadian State (SCN oscillator) ─────────────────────────────────────

export interface CircadianStateEvent {
  type: "circadian_state";
  timestamp: string;
  theta: number;
  circadian_time_hours: number;
  phase: string;
  alertness: number;
  circadian_sleep_propensity: number;
  homeostatic_sleep_pressure: number;
  combined_sleep_propensity: number;
  sleep_onset_ready: boolean;
  sleep_pressure_mode: SleepPressureMode;
}

// ── Cortical Modulation State ────────────────────────────────────────────

export interface CorticalModulationStateEvent {
  type: "cortical_modulation_state";
  timestamp: string;
  processing_speed: number;
  error_rate: number;
  prefrontal_contribution: number;
  regulation_capacity: number;
  emotional_bias: number;
  processing_depth: number;
  metacognitive_clarity: number | null;
  max_tokens: number;
  temperature: number;
}

// ── Oscillation State (EEG equivalent, 22 populations) ──────────────────

export interface OscillationPopulationSnapshot {
  id: string;
  amplitude: number;
  estimated_frequency_hz: number;
  excitatory: number;
  inhibitory: number;
  bound: boolean;
  coherence: number;
}

export interface OscillationStateEvent {
  type: "oscillation_state";
  timestamp: string;
  populations: OscillationPopulationSnapshot[];
  global_coherence: number;
  mode: OscillationMode;
  gamma_cycle: number;
}

// ── Homeostasis State ────────────────────────────────────────────────────

export type AllostaticMode = "homeostatic" | "allostatic" | "allostatic_overload";

export interface HomeostasisStateEvent {
  type: "homeostasis_state";
  timestamp: string;
  mode: string;
  cpu_usage: number;
  memory_usage: number;
  error_rate: number;
  worker_concurrency: number;
  thought_loop_delay: number;
}

// ── Drive States ─────────────────────────────────────────────────────────

export interface DriveStatesEvent {
  type: "drive_states";
  timestamp: string;
  social_drive: number;
  seeking_drive: number;
  novelty_hunger: number;
}

// ── Mood Snapshot ────────────────────────────────────────────────────────

export interface MoodSnapshotEvent {
  type: "mood_snapshot";
  timestamp: string;
  valence: number;
  arousal: number;
  dominance: number;
}

// ── Consolidation Stats ──────────────────────────────────────────────────

export interface ConsolidationStatsEvent {
  type: "consolidation_stats";
  timestamp: string;
  consolidated: number;
  decayed: number;
  forgotten: number;
  replay_boosted: number;
  total_replay_gain: number;
  semanticized: number;
  neurogenesis_rate: number;
}

// ── System Status (wake/sleep) ───────────────────────────────────────────

export interface SystemStatusEvent {
  type: "system_status";
  timestamp: string;
  status: "awake" | "sleeping";
  reason?: string;
}

// ── Substrate-cortex training telemetry ──────────────────────────────────
//
// These four event types are emitted by the per-turn online learning loop
// (mmajoris/molly#361) and the substrate-cortex telemetry layer
// (mmajoris/molly#370). They make Molly's training trajectory observable in
// real time as the substrate-modulated backward passes accumulate adapter
// state from her lived experience.
//
// They are defined here ahead of the molly-side emission code so the
// wintermute dashboard, history queries, and adapter visualization panel can
// be built and tested against mock/sample data. When mmajoris/molly#370
// lands, the molly-side mirror in src/lib/brain-events.ts must match these
// definitions exactly.

export interface PerTurnLearningEvent {
  type: "per_turn_learning";
  timestamp: string;
  turn_id: string;
  was_internal_thought: boolean;
  loss_value: number;
  gradient_norm: number;
  adapter_delta_norm: number;
  learning_rate_applied: number;
  plasticity_eligibility: number;
  brain_state_snapshot: {
    dopamine_tonic?: number;
    serotonin?: number;
    norepinephrine_mode?: NorepinephrineMode;
    cortisol?: number;
    acetylcholine?: number;
    [key: string]: number | string | boolean | undefined;
  };
}

export interface PlasticityGateFireEvent {
  type: "plasticity_gate_fire";
  timestamp: string;
  turn_id: string;
  attention_selection: number;
  encoding_mode_ach: number;
  novelty_or_value: number;
  synaptic_resource: number;
  composed_eligibility: number;
  decision: "fire" | "suppress" | "habituate";
}

export interface AdapterStateSnapshotEvent {
  type: "adapter_state_snapshot";
  timestamp: string;
  checkpoint_path: string;
  total_norm: number;
  per_layer_norms: Record<string, number>;
  since_last_checkpoint_delta_norm: number;
  total_turns_since_deployment: number;
  total_internal_thoughts_since_deployment: number;
  trigger: "scheduled" | "sleep_consolidation" | "manual" | "shutdown";
}

export interface SleepConsolidationEvent {
  type: "sleep_consolidation";
  timestamp: string;
  phase: "start" | "end";
  replay_pairs_sampled: number;
  drift_cap_applied: boolean;
  pre_norm: number;
  post_norm: number;
  rollback_target: string;
  duration_ms?: number;
}

// ── Union & Helpers ──────────────────────────────────────────────────────

export type BrainEvent =
  | ThoughtLoopTickEvent
  | CollectionActivityEvent
  | WorkerActivityEvent
  | QueueMetricsEvent
  | EmotionalStateEvent
  | SoulCycleEvent
  | ActionDispatchEvent
  | ActionMonitoringEvent
  | SystemVitalsEvent
  | BudgetStatusEvent
  | MemoryEvent
  | RewardSignalEvent
  | ErrorCorrectionEvent
  | ThalamicGateEvent
  | HippocampalCascadeEvent
  | DentateGyrusNeurogenesisEvent
  | DirectedForgettingEvent
  | SourceMonitoringEvent
  | MetamemoryEvent
  | MetacognitionEvent
  | TheoryOfMindEvent
  | SelfPresentationEvent
  | CognitiveEmpathyEvent
  | SocialLearningEvent
  | SenseOfAgencyEvent
  | LLMCallEvent
  | ToolExecutionEvent
  | NeurochemistryStateEvent
  | PfcRegulationEvent
  | BnstStateEvent
  | AccStateEvent
  | SalienceEvaluationEvent
  | TimePerceptionEvent
  | VigilanceEvent
  | CognitiveFatigueEvent
  | AutonomicBalanceEvent
  | NetworkSwitchEvent
  | ExpressionInhibitionEvent
  | InteroceptionSignalEvent
  | TelegramMessageEvent
  | BasalGangliaStrategyEvent
  | ValueComparisonEvent
  | MoralReasoningEvent
  | CognitiveFlexibilityEvent
  | CerebellarPredictionEvent
  | StatisticalLearningBrainEvent
  | ProspectiveMemoryEvent
  | GoalPlanEvent
  | PhenomenalBindingEvent
  | AffectCircuitsEvent
  | DopamineStateEvent
  | HpaAxisStateEvent
  | EndorphinDynamicsEvent
  | CircadianStateEvent
  | CorticalModulationStateEvent
  | OscillationStateEvent
  | HomeostasisStateEvent
  | DriveStatesEvent
  | MoodSnapshotEvent
  | ConsolidationStatsEvent
  | SystemStatusEvent
  | PerTurnLearningEvent
  | PlasticityGateFireEvent
  | AdapterStateSnapshotEvent
  | SleepConsolidationEvent;

export interface BrainEventEnvelope {
  id: string;
  event: BrainEvent;
  received_at: string;
}

const VALID_EVENT_TYPES: ReadonlySet<string> = new Set([
  "thought_loop_tick",
  "collection_activity",
  "worker_activity",
  "queue_metrics",
  "emotional_state",
  "soul_cycle",
  "action_dispatch",
  "action_monitoring",
  "system_vitals",
  "budget_status",
  "memory_event",
  "reward_signal",
  "error_correction",
  "thalamic_gate",
  "hippocampal_cascade",
  "dentate_gyrus_neurogenesis",
  "directed_forgetting",
  "source_monitoring",
  "metamemory",
  "metacognition",
  "theory_of_mind",
  "self_presentation",
  "cognitive_empathy",
  "social_learning",
  "sense_of_agency",
  "llm_call",
  "tool_execution",
  "neurochemistry_state",
  "pfc_regulation",
  "bnst_state",
  "acc_state",
  "salience_evaluation",
  "time_perception",
  "vigilance",
  "cognitive_fatigue",
  "autonomic_balance",
  "network_switch",
  "expression_inhibition",
  "interoception_signal",
  "telegram_message",
  "basal_ganglia_strategy",
  "value_comparison",
  "moral_reasoning",
  "cognitive_flexibility",
  "cerebellar_prediction",
  "statistical_learning",
  "prospective_memory",
  "goal_plan",
  "phenomenal_binding",
  "affect_circuits",
  "dopamine_state",
  "hpa_axis_state",
  "endorphin_dynamics",
  "circadian_state",
  "cortical_modulation_state",
  "oscillation_state",
  "homeostasis_state",
  "drive_states",
  "mood_snapshot",
  "consolidation_stats",
  "system_status",
  "per_turn_learning",
  "plasticity_gate_fire",
  "adapter_state_snapshot",
  "sleep_consolidation",
]);

export function isBrainEvent(obj: unknown): obj is BrainEvent {
  if (!obj || typeof obj !== "object") return false;
  const event = obj as { type?: string };
  return typeof event.type === "string" && VALID_EVENT_TYPES.has(event.type);
}
