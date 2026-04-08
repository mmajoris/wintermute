import { create } from "zustand";
import type {
  BrainEvent,
  BrainEventEnvelope,
  BudgetStatusEvent,
  EmotionalStateEvent,
  HippocampalCascadeEvent,
  LLMCallEvent,
  NeurochemistryStateEvent,
  SystemVitalsEvent,
  SystemStatusEvent,
  ThalamicGateEvent,
  ThoughtLoopTickEvent,
  AffectCircuitsEvent,
  DopamineStateEvent,
  HpaAxisStateEvent,
  EndorphinDynamicsEvent,
  CircadianStateEvent,
  CorticalModulationStateEvent,
  OscillationStateEvent,
  HomeostasisStateEvent,
  DriveStatesEvent,
  MoodSnapshotEvent,
  ConsolidationStatsEvent,
  PhenomenalBindingEvent,
  NetworkSwitchEvent,
  SalienceEvaluationEvent,
  AccStateEvent,
  PfcRegulationEvent,
  MetacognitionEvent,
  ExpressionInhibitionEvent,
  CognitiveFlexibilityEvent,
  BasalGangliaStrategyEvent,
  ValueComparisonEvent,
  MoralReasoningEvent,
  TheoryOfMindEvent,
  CognitiveEmpathyEvent,
  SelfPresentationEvent,
  SocialLearningEvent,
  CerebellarPredictionEvent,
  SenseOfAgencyEvent,
  ActionMonitoringEvent,
  TimePerceptionEvent,
  VigilanceEvent,
  CognitiveFatigueEvent,
  AutonomicBalanceEvent,
  BnstStateEvent,
  MetamemoryEvent,
  SourceMonitoringEvent,
  DentateGyrusNeurogenesisEvent,
  DirectedForgettingEvent,
  StatisticalLearningBrainEvent,
  ProspectiveMemoryEvent,
  GoalPlanEvent,
  ToolExecutionEvent,
  TelegramMessageEvent,
  InteroceptionSignalEvent,
} from "./brain-events";
import {
  getRegionForCollection,
  getRegionForWorker,
  getRegionForQueue,
  getPathwaysForEvent,
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
  status: "active" | "completed" | "failed";
  tier?: string;
  startedAt: number;
}

export interface LiveStore {
  connected: boolean;
  connectionError: string | null;
  eventsPerSecond: number;
  totalEventCount: number;

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
  budgetStatus: BudgetStatusEvent | null;
  neurochemistryState: NeurochemistryStateEvent | null;
  lastLLMCall: LLMCallEvent | null;
  lastThalamicGate: ThalamicGateEvent | null;
  lastCascade: HippocampalCascadeEvent | null;

  affectCircuits: AffectCircuitsEvent | null;
  dopamineState: DopamineStateEvent | null;
  hpaAxisState: HpaAxisStateEvent | null;
  endorphinDynamics: EndorphinDynamicsEvent | null;
  circadianState: CircadianStateEvent | null;
  corticalModulation: CorticalModulationStateEvent | null;
  oscillationState: OscillationStateEvent | null;
  homeostasisState: HomeostasisStateEvent | null;
  driveStates: DriveStatesEvent | null;
  moodSnapshot: MoodSnapshotEvent | null;
  consolidationStats: ConsolidationStatsEvent | null;
  moodHistory: Array<{ timestamp: string; valence: number; arousal: number; dominance: number }>;

  // New subsystem state
  phenomenalBinding: PhenomenalBindingEvent | null;
  networkSwitch: NetworkSwitchEvent | null;
  salienceEvaluation: SalienceEvaluationEvent | null;
  accState: AccStateEvent | null;
  pfcRegulation: PfcRegulationEvent | null;
  metacognitionState: MetacognitionEvent | null;
  expressionInhibition: ExpressionInhibitionEvent | null;
  cognitiveFlexibility: CognitiveFlexibilityEvent | null;
  basalGangliaStrategy: BasalGangliaStrategyEvent | null;
  valueComparison: ValueComparisonEvent | null;
  moralReasoning: MoralReasoningEvent | null;
  theoryOfMind: TheoryOfMindEvent | null;
  cognitiveEmpathy: CognitiveEmpathyEvent | null;
  selfPresentation: SelfPresentationEvent | null;
  socialLearning: SocialLearningEvent | null;
  cerebellarPrediction: CerebellarPredictionEvent | null;
  senseOfAgency: SenseOfAgencyEvent | null;
  actionMonitoring: ActionMonitoringEvent | null;
  timePerception: TimePerceptionEvent | null;
  vigilanceState: VigilanceEvent | null;
  cognitiveFatigue: CognitiveFatigueEvent | null;
  autonomicBalance: AutonomicBalanceEvent | null;
  bnstState: BnstStateEvent | null;
  metamemoryState: MetamemoryEvent | null;

  lastEventAt: number;
  mollyAwake: boolean;

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
  totalEventCount: 0,

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
  budgetStatus: null,
  neurochemistryState: null,
  lastLLMCall: null,
  lastThalamicGate: null,
  lastCascade: null,

  affectCircuits: null,
  dopamineState: null,
  hpaAxisState: null,
  endorphinDynamics: null,
  circadianState: null,
  corticalModulation: null,
  oscillationState: null,
  homeostasisState: null,
  driveStates: null,
  moodSnapshot: null,
  consolidationStats: null,
  moodHistory: [],

  phenomenalBinding: null,
  networkSwitch: null,
  salienceEvaluation: null,
  accState: null,
  pfcRegulation: null,
  metacognitionState: null,
  expressionInhibition: null,
  cognitiveFlexibility: null,
  basalGangliaStrategy: null,
  valueComparison: null,
  moralReasoning: null,
  theoryOfMind: null,
  cognitiveEmpathy: null,
  selfPresentation: null,
  socialLearning: null,
  cerebellarPrediction: null,
  senseOfAgency: null,
  actionMonitoring: null,
  timePerception: null,
  vigilanceState: null,
  cognitiveFatigue: null,
  autonomicBalance: null,
  bnstState: null,
  metamemoryState: null,

  lastEventAt: 0,
  mollyAwake: false,

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

    const updates: Partial<LiveStore> = {
      recentEvents: newRecentEvents,
      totalEventCount: state.totalEventCount + 1,
      lastEventAt: now,
      mollyAwake: true,
    };
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

      case "emotional_state": {
        updates.emotionalState = event;
        const SOURCE_STRUCTURE_TO_REGION: Record<string, string> = {
          amygdala: "amygdala",
          anterior_insula: "insular-cortex-L",
          hypothalamus: "hypothalamus",
          anterior_cingulate: "anterior-cingulate-L",
        };
        const emotionRegion = (event.source_structure && SOURCE_STRUCTURE_TO_REGION[event.source_structure]) || "amygdala";
        activateRegion(newRegionActivity, emotionRegion, now, "emotion");
        activateRegion(newRegionActivity, "raphe-nuclei", now, "serotonin_source");
        break;
      }

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
        if (gateEvent.gate_open) {
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
        const llm = event as LLMCallEvent;
        updates.lastLLMCall = llm;
        const procStatus: CognitiveProcess["status"] =
          llm.status === "started" ? "active" : llm.status === "failed" ? "failed" : "completed";
        const proc: CognitiveProcess = {
          name: `LLM ${llm.tier}`,
          status: procStatus,
          tier: llm.tier,
          startedAt: now,
        };
        const procs = state.activeProcesses.filter(p => p.name !== proc.name);
        if (proc.status === "active") procs.push(proc);
        updates.activeProcesses = procs;
        activateRegion(newRegionActivity, "left-hemisphere", now, "cortical_processing");
        if (llm.status === "failed") {
          activateRegion(newRegionActivity, "cerebellum", now, "llm_error");
          activateRegion(newRegionActivity, "anterior-cingulate-L", now, "conflict_detection");
        }
        break;
      }

      case "budget_status": {
        updates.budgetStatus = event as BudgetStatusEvent;
        activateRegion(newRegionActivity, "hypothalamus", now, "resource_monitoring");
        break;
      }

      case "neurochemistry_state": {
        const neuro = event as NeurochemistryStateEvent;
        updates.neurochemistryState = neuro;
        const NEURO_SOURCE_TO_REGION: Record<string, string> = {
          paraventricular_nucleus: "hypothalamus",
          hpa_axis: "hypothalamus",
          periaqueductal_gray: "midbrain",
          basal_forebrain: "basal-forebrain",
          dorsal_raphe_median_raphe: "raphe-nuclei",
          locus_coeruleus: "locus-coeruleus",
          multi_system: "hypothalamus",
          distributed_neuromodulatory_systems: "hypothalamus",
        };
        const sourceRegion = NEURO_SOURCE_TO_REGION[neuro.source_region] ?? "hypothalamus";
        activateRegion(newRegionActivity, sourceRegion, now, "neurochemistry");
        if (neuro.cortisol > 0.7) {
          activateRegion(newRegionActivity, "amygdala", now, "stress_response");
        }
        if (neuro.norepinephrine_mode === "high_tonic") {
          activateRegion(newRegionActivity, "locus-coeruleus", now, "high_arousal");
        }
        break;
      }

      case "affect_circuits": {
        updates.affectCircuits = event as AffectCircuitsEvent;
        activateRegion(newRegionActivity, "amygdala", now, "affect_circuits");
        activateRegion(newRegionActivity, "hypothalamus", now, "affect_circuits");
        const ac = event as AffectCircuitsEvent;
        if (ac.fear > 0.5) activateRegion(newRegionActivity, "midbrain", now, "fear_pag");
        if (ac.seeking > 0.5) activateRegion(newRegionActivity, "nucleus-accumbens", now, "seeking_drive");
        break;
      }

      case "dopamine_state": {
        const da = event as DopamineStateEvent;
        updates.dopamineState = da;
        updates.dopamineLevel = Math.max(0, Math.min(1, da.tonic + da.phasic * 0.5));
        activateRegion(newRegionActivity, "nucleus-accumbens", now, "dopamine");
        activateRegion(newRegionActivity, "substantia-nigra", now, "vta_firing");
        break;
      }

      case "hpa_axis_state": {
        updates.hpaAxisState = event as HpaAxisStateEvent;
        activateRegion(newRegionActivity, "hypothalamus", now, "hpa_crh");
        const hpa = event as HpaAxisStateEvent;
        if (hpa.cortisol > 0.7) activateRegion(newRegionActivity, "amygdala", now, "hpa_stress");
        break;
      }

      case "endorphin_dynamics": {
        updates.endorphinDynamics = event as EndorphinDynamicsEvent;
        activateRegion(newRegionActivity, "midbrain", now, "pag_endorphin");
        break;
      }

      case "circadian_state": {
        updates.circadianState = event as CircadianStateEvent;
        activateRegion(newRegionActivity, "hypothalamus", now, "scn_oscillator");
        break;
      }

      case "cortical_modulation_state": {
        updates.corticalModulation = event as CorticalModulationStateEvent;
        activateRegion(newRegionActivity, "left-hemisphere", now, "cortical_mod");
        activateRegion(newRegionActivity, "right-hemisphere", now, "cortical_mod");
        break;
      }

      case "oscillation_state": {
        updates.oscillationState = event as OscillationStateEvent;
        activateRegion(newRegionActivity, "thalamus", now, "oscillation_drive");
        activateRegion(newRegionActivity, "left-hemisphere", now, "cortical_osc");
        activateRegion(newRegionActivity, "right-hemisphere", now, "cortical_osc");
        break;
      }

      case "homeostasis_state": {
        updates.homeostasisState = event as HomeostasisStateEvent;
        activateRegion(newRegionActivity, "hypothalamus", now, "homeostasis");
        break;
      }

      case "drive_states": {
        updates.driveStates = event as DriveStatesEvent;
        const ds = event as DriveStatesEvent;
        if (ds.seeking_drive > 0.6) activateRegion(newRegionActivity, "nucleus-accumbens", now, "seeking");
        if (ds.social_drive > 0.6) activateRegion(newRegionActivity, "amygdala", now, "social_drive");
        break;
      }

      case "mood_snapshot": {
        const ms = event as MoodSnapshotEvent;
        updates.moodSnapshot = ms;
        const history = [...state.moodHistory, { timestamp: ms.timestamp, valence: ms.valence, arousal: ms.arousal, dominance: ms.dominance }];
        updates.moodHistory = history.slice(-60);
        break;
      }

      case "consolidation_stats": {
        updates.consolidationStats = event as ConsolidationStatsEvent;
        activateRegion(newRegionActivity, "hippocampus", now, "consolidation");
        break;
      }

      case "system_status": {
        const ss = event as SystemStatusEvent;
        updates.mollyAwake = ss.status === "awake";
        break;
      }

      // ── Cerebellar / Prediction ─────────────────────────────────────

      case "cerebellar_prediction": {
        const cp = event as CerebellarPredictionEvent;
        updates.cerebellarPrediction = cp;
        activateRegion(newRegionActivity, "cerebellum", now, "cerebellar_prediction");
        if (cp.phase === "learning") {
          activateRegion(newRegionActivity, "anterior-cingulate-L", now, "cerebellar_learning");
        }
        break;
      }

      case "action_monitoring": {
        const am = event as ActionMonitoringEvent;
        updates.actionMonitoring = am;
        activateRegion(newRegionActivity, "cerebellum", now, "action_monitoring");
        activateRegion(newRegionActivity, "anterior-cingulate-L", now, "action_monitoring");
        if (am.triggered_interoception) {
          activateRegion(newRegionActivity, "insular-cortex-L", now, "interoception_trigger");
        }
        break;
      }

      case "sense_of_agency": {
        const sa = event as SenseOfAgencyEvent;
        updates.senseOfAgency = sa;
        activateRegion(newRegionActivity, "cerebellum", now, "agency_comparator");
        activateRegion(newRegionActivity, "insular-cortex-L", now, "agency_awareness");
        if (sa.attribution === "externally_caused") {
          activateRegion(newRegionActivity, "anterior-cingulate-L", now, "agency_conflict");
        }
        break;
      }

      case "time_perception": {
        updates.timePerception = event as TimePerceptionEvent;
        activateRegion(newRegionActivity, "cerebellum", now, "interval_timing");
        activateRegion(newRegionActivity, "locus-coeruleus", now, "ne_time_dilation");
        break;
      }

      // ── Executive Control ───────────────────────────────────────────

      case "metacognition": {
        const mc = event as MetacognitionEvent;
        updates.metacognitionState = mc;
        activateRegion(newRegionActivity, "left-hemisphere", now, "metacognition");
        if (mc.conflict_load > 0.5) {
          activateRegion(newRegionActivity, "anterior-cingulate-L", now, "metacognitive_conflict");
        }
        break;
      }

      case "acc_state": {
        const acc = event as AccStateEvent;
        updates.accState = acc;
        activateRegion(newRegionActivity, "anterior-cingulate-L", now, "acc_control");
        if (acc.distress_level > 0.6) {
          activateRegion(newRegionActivity, "amygdala", now, "acc_distress");
        }
        break;
      }

      case "pfc_regulation": {
        updates.pfcRegulation = event as PfcRegulationEvent;
        activateRegion(newRegionActivity, "left-hemisphere", now, "pfc_regulation");
        activateRegion(newRegionActivity, "amygdala", now, "vmpfc_amygdala_coupling");
        break;
      }

      case "expression_inhibition": {
        updates.expressionInhibition = event as ExpressionInhibitionEvent;
        activateRegion(newRegionActivity, "caudate-nucleus", now, "expression_gate");
        activateRegion(newRegionActivity, "left-hemisphere", now, "ifg_stop_signal");
        break;
      }

      case "cognitive_flexibility": {
        updates.cognitiveFlexibility = event as CognitiveFlexibilityEvent;
        activateRegion(newRegionActivity, "left-hemisphere", now, "task_switching");
        activateRegion(newRegionActivity, "thalamus", now, "thalamic_reconfiguration");
        break;
      }

      case "cognitive_fatigue": {
        const cf = event as CognitiveFatigueEvent;
        updates.cognitiveFatigue = cf;
        activateRegion(newRegionActivity, "left-hemisphere", now, "fatigue_pfc");
        if (cf.state === "recovering") {
          activateRegion(newRegionActivity, "anterior-cingulate-L", now, "fatigue_recovery");
        }
        break;
      }

      // ── Decision & Strategy ─────────────────────────────────────────

      case "basal_ganglia_strategy": {
        const bg = event as BasalGangliaStrategyEvent;
        updates.basalGangliaStrategy = bg;
        activateRegion(newRegionActivity, "caudate-nucleus", now, "bg_strategy");
        activateRegion(newRegionActivity, "globus-pallidus", now, "bg_output");
        if (bg.prediction_error !== undefined) {
          activateRegion(newRegionActivity, "substantia-nigra", now, "bg_da_signal");
        }
        break;
      }

      case "value_comparison": {
        updates.valueComparison = event as ValueComparisonEvent;
        activateRegion(newRegionActivity, "nucleus-accumbens", now, "value_evaluation");
        activateRegion(newRegionActivity, "left-hemisphere", now, "ofc_value");
        break;
      }

      case "moral_reasoning": {
        const mr = event as MoralReasoningEvent;
        updates.moralReasoning = mr;
        activateRegion(newRegionActivity, "left-hemisphere", now, "moral_deliberation");
        activateRegion(newRegionActivity, "amygdala", now, "moral_emotion");
        if (mr.moral_conflict > 0.5) {
          activateRegion(newRegionActivity, "anterior-cingulate-L", now, "moral_conflict");
        }
        break;
      }

      // ── Social / Mentalizing ────────────────────────────────────────

      case "theory_of_mind": {
        updates.theoryOfMind = event as TheoryOfMindEvent;
        activateRegion(newRegionActivity, "right-hemisphere", now, "tpj_mentalizing");
        activateRegion(newRegionActivity, "left-hemisphere", now, "mpfc_mentalizing");
        break;
      }

      case "self_presentation": {
        updates.selfPresentation = event as SelfPresentationEvent;
        activateRegion(newRegionActivity, "left-hemisphere", now, "self_model");
        activateRegion(newRegionActivity, "amygdala", now, "social_evaluation");
        break;
      }

      case "cognitive_empathy": {
        updates.cognitiveEmpathy = event as CognitiveEmpathyEvent;
        activateRegion(newRegionActivity, "amygdala", now, "empathic_resonance");
        activateRegion(newRegionActivity, "insular-cortex-L", now, "empathic_simulation");
        break;
      }

      case "social_learning": {
        updates.socialLearning = event as SocialLearningEvent;
        activateRegion(newRegionActivity, "caudate-nucleus", now, "observational_learning");
        activateRegion(newRegionActivity, "hippocampus", now, "strategy_integration");
        break;
      }

      // ── Salience / Global Workspace ─────────────────────────────────

      case "salience_evaluation": {
        const se = event as SalienceEvaluationEvent;
        updates.salienceEvaluation = se;
        activateRegion(newRegionActivity, "insular-cortex-L", now, "salience_eval");
        activateRegion(newRegionActivity, "anterior-cingulate-L", now, "salience_eval");
        if (se.ne_modulation > 0.5) {
          activateRegion(newRegionActivity, "locus-coeruleus", now, "salience_ne_burst");
        }
        break;
      }

      case "network_switch": {
        updates.networkSwitch = event as NetworkSwitchEvent;
        activateRegion(newRegionActivity, "insular-cortex-L", now, "network_switch");
        activateRegion(newRegionActivity, "anterior-cingulate-L", now, "network_switch");
        break;
      }

      case "phenomenal_binding": {
        const pb = event as PhenomenalBindingEvent;
        updates.phenomenalBinding = pb;
        activateRegion(newRegionActivity, "thalamus", now, "gw_binding");
        if (pb.content_admitted) {
          activateRegion(newRegionActivity, "left-hemisphere", now, "gw_broadcast");
          activateRegion(newRegionActivity, "right-hemisphere", now, "gw_broadcast");
        }
        if (pb.binding_rule === "nrem_delta_spindle_ripple") {
          activateRegion(newRegionActivity, "hippocampus", now, "sleep_replay_binding");
        }
        break;
      }

      case "vigilance": {
        updates.vigilanceState = event as VigilanceEvent;
        activateRegion(newRegionActivity, "locus-coeruleus", now, "vigilance");
        activateRegion(newRegionActivity, "thalamus", now, "sustained_attention");
        break;
      }

      // ── Body / Stress ───────────────────────────────────────────────

      case "bnst_state": {
        updates.bnstState = event as BnstStateEvent;
        activateRegion(newRegionActivity, "amygdala", now, "bnst_anxiety");
        activateRegion(newRegionActivity, "hypothalamus", now, "bnst_crh");
        break;
      }

      case "autonomic_balance": {
        const ab = event as AutonomicBalanceEvent;
        updates.autonomicBalance = ab;
        activateRegion(newRegionActivity, "medulla", now, "autonomic_balance");
        activateRegion(newRegionActivity, "cn-x", now, "vagal_tone");
        if (ab.allostatic_load > 0.6) {
          activateRegion(newRegionActivity, "hypothalamus", now, "allostatic_stress");
        }
        break;
      }

      // ── Memory / Hippocampal ────────────────────────────────────────

      case "dentate_gyrus_neurogenesis": {
        activateRegion(newRegionActivity, "dentate-gyrus", now, "neurogenesis");
        activateRegion(newRegionActivity, "hippocampus", now, "neurogenesis");
        break;
      }

      case "directed_forgetting": {
        activateRegion(newRegionActivity, "hippocampus", now, "directed_forgetting");
        activateRegion(newRegionActivity, "left-hemisphere", now, "pfc_suppression");
        break;
      }

      case "metamemory": {
        updates.metamemoryState = event as MetamemoryEvent;
        activateRegion(newRegionActivity, "left-hemisphere", now, "metamemory");
        activateRegion(newRegionActivity, "hippocampus", now, "metamemory_trace");
        break;
      }

      case "source_monitoring": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "source_monitoring");
        activateRegion(newRegionActivity, "hippocampus", now, "source_trace");
        break;
      }

      case "statistical_learning": {
        activateRegion(newRegionActivity, "hippocampus", now, "statistical_learning");
        activateRegion(newRegionActivity, "caudate-nucleus", now, "probabilistic_learning");
        break;
      }

      case "prospective_memory": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "intention_maintenance");
        activateRegion(newRegionActivity, "hippocampus", now, "prospective_cue");
        break;
      }

      case "goal_plan": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "planning");
        activateRegion(newRegionActivity, "caudate-nucleus", now, "action_sequencing");
        break;
      }

      // ── Action / IO ─────────────────────────────────────────────────

      case "tool_execution": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "tool_use");
        activateRegion(newRegionActivity, "caudate-nucleus", now, "tool_execution");
        break;
      }

      case "telegram_message": {
        activateRegion(newRegionActivity, "left-hemisphere", now, "language_io");
        activateRegion(newRegionActivity, "thalamus", now, "sensory_relay");
        break;
      }

      case "interoception_signal": {
        activateRegion(newRegionActivity, "insular-cortex-L", now, "interoception");
        activateRegion(newRegionActivity, "medulla", now, "visceral_afferent");
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
    // No-op: sparks only fire from real events
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
