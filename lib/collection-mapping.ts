/**
 * Collection to Brain Region Mapping
 * 
 * Maps Qdrant collection names (from Molly's brain architecture) to
 * brain region IDs (from the 3D visualization).
 * 
 * Based on the 60-collection architecture in MOLLY-ARCHITECTURE.md
 */

export const COLLECTION_TO_REGION: Record<string, string> = {
  // Cerebrum — Higher Cognition
  system_root: "left-hemisphere",
  cognitive_modules: "left-hemisphere",
  action_dispatch: "left-hemisphere",
  language_output: "left-hemisphere",
  language_comprehension: "left-hemisphere",
  sensory_encoders: "right-hemisphere",
  temporal_processing: "left-hemisphere",
  visual_processing: "right-hemisphere",
  narrative_engine: "left-hemisphere",
  attention_router: "thalamus",
  working_memory: "left-hemisphere",

  // Cerebellum — Error Correction
  error_correction: "cerebellum",
  movement_planning: "cerebellum",
  execution_monitor: "cerebellum",
  balance_system: "cerebellum",
  correction_output: "cerebellum",
  inhibitory_gate: "cerebellum",

  // Brainstem — Survival & Autonomic
  background_processes: "midbrain",
  reflex_engine: "midbrain",
  dopamine_regulation: "substantia-nigra",
  motivation_signals: "substantia-nigra",
  relay_processors: "pons",
  alertness_state: "pons",
  mood_regulation: "pons",
  vital_controllers: "medulla",
  cardiac_oscillator: "medulla",
  respiratory_oscillator: "medulla",
  pressure_regulation: "medulla",
  visceral_input: "medulla",

  // Limbic System — Memory & Emotion
  memory_embeddings: "hippocampus",
  memory_consolidation: "hippocampus",
  pattern_completion: "hippocampus",
  pattern_separation: "dentate-gyrus",
  state_modulators: "amygdala",
  action_selector: "caudate-nucleus",
  reward_signals: "nucleus-accumbens",
  signal_router: "thalamus",
  homeostasis_controller: "hypothalamus",
  circadian_clock: "hypothalamus",
  conflict_monitor: "caudate-nucleus",
  hemisphere_bridge: "corpus-callosum",
  body_state_monitor: "hypothalamus",

  // Autonomic Nervous System
  autonomic_engine: "medulla",
  activation_signals: "midbrain",
  restoration_signals: "pons",
  global_state_modifier: "cn-x", // Vagus nerve
  gut_processor: "cn-x",
  oscillation_generator: "medulla",

  // Pathways
  input_pipelines: "thalamus",
  output_pipelines: "left-hemisphere",
  fast_response_loops: "midbrain",
  integration_buses: "corpus-callosum",

  // Cellular / Microscopic
  processing_units: "left-hemisphere",
  excitatory_nodes: "left-hemisphere",
  inhibitory_nodes: "globus-pallidus",
  support_infrastructure: "ventricles",
  connection_interfaces: "corpus-callosum",
  signal_molecules: "hypothalamus",
  reward_signal: "nucleus-accumbens",
  mood_baseline: "pons",
};

export const REGION_TO_COLLECTIONS: Record<string, string[]> = {};
for (const [collection, region] of Object.entries(COLLECTION_TO_REGION)) {
  if (!REGION_TO_COLLECTIONS[region]) {
    REGION_TO_COLLECTIONS[region] = [];
  }
  REGION_TO_COLLECTIONS[region].push(collection);
}

export const WORKER_TO_REGION: Record<string, string> = {
  "input-classifier": "thalamus",
  "pattern-separator": "dentate-gyrus",
  "emotional-tagger": "amygdala",
  "memory-writer": "hippocampus",
  "memory-retriever": "hippocampus",
  "action-gate": "caudate-nucleus",
  "reward-predictor": "nucleus-accumbens",
  "error-corrector": "cerebellum",
  "sensory-integrator": "corpus-callosum",
  "action-dispatcher": "left-hemisphere",
  "executive-controller": "left-hemisphere",
  "narrative-engine": "left-hemisphere",
};

export const QUEUE_TO_REGION: Record<string, string> = {
  "input-raw": "thalamus",
  "classify-result": "thalamus",
  "memory-write": "hippocampus",
  "memory-retrieve": "hippocampus",
  "action-evaluate": "caudate-nucleus",
  "action-execute": "left-hemisphere",
  "reward-compute": "nucleus-accumbens",
  "reflection": "left-hemisphere",
  "thought": "left-hemisphere",
};

export function getRegionForCollection(collection: string): string | null {
  return COLLECTION_TO_REGION[collection] ?? null;
}

export function getRegionForWorker(worker: string): string | null {
  return WORKER_TO_REGION[worker] ?? null;
}

export function getRegionForQueue(queue: string): string | null {
  return QUEUE_TO_REGION[queue] ?? null;
}

export function getCollectionsForRegion(region: string): string[] {
  return REGION_TO_COLLECTIONS[region] ?? [];
}

// Neurotransmitter pathway definitions
// Sources use specific nuclei, not generic region names:
//   Serotonin: raphe nuclei (pons/medulla), NOT generic "pons"
//   Norepinephrine: locus coeruleus (dorsal pons), NOT generic "pons"
//   Acetylcholine: nucleus basalis / basal forebrain (cortical projections)
//   Dopamine: substantia nigra (nigrostriatal) + VTA (mesolimbic/mesocortical)
export interface NeurotransmitterPathway {
  source: string;
  targets: string[];
  color: string;
}

export const NEUROTRANSMITTER_PATHWAYS: Record<string, NeurotransmitterPathway> = {
  dopamine: {
    source: "substantia-nigra",
    targets: ["nucleus-accumbens", "caudate-nucleus", "putamen", "left-hemisphere"],
    color: "#ff8833",
  },
  serotonin: {
    source: "raphe-nuclei",
    targets: ["amygdala", "hippocampus", "left-hemisphere", "right-hemisphere", "hypothalamus"],
    color: "#33ddaa",
  },
  norepinephrine: {
    source: "locus-coeruleus",
    targets: ["thalamus", "amygdala", "hippocampus", "left-hemisphere", "cerebellum"],
    color: "#ff5544",
  },
  acetylcholine: {
    source: "basal-forebrain",
    targets: ["hippocampus", "left-hemisphere", "right-hemisphere", "thalamus"],
    color: "#ffcc33",
  },
  gaba: {
    source: "globus-pallidus",
    targets: ["thalamus", "substantia-nigra", "subthalamic-nucleus"],
    color: "#6644cc",
  },
  glutamate: {
    source: "thalamus",
    targets: ["left-hemisphere", "right-hemisphere", "hippocampus", "amygdala"],
    color: "#44aaff",
  },
};

export interface PathwayActivationSpec {
  pathway: string;
  intensity: number;
}

// Multi-pathway firing per event — biological processes always involve
// multiple neurotransmitter systems simultaneously
export function getPathwaysForEvent(
  eventType: string,
  eventData?: Record<string, unknown>
): PathwayActivationSpec[] {
  switch (eventType) {
    case "reward_signal":
      return [
        { pathway: "dopamine", intensity: 1.0 },
        { pathway: "glutamate", intensity: 0.5 },
      ];
    case "emotional_state":
      return [
        { pathway: "serotonin", intensity: 0.8 },
        { pathway: "norepinephrine", intensity: 0.6 },
        { pathway: "dopamine", intensity: 0.4 },
      ];
    case "thought_loop_tick":
      if (eventData && (eventData as { impulse?: boolean }).impulse) {
        return [
          { pathway: "glutamate", intensity: 0.8 },
          { pathway: "norepinephrine", intensity: 0.6 },
        ];
      }
      // Idle thalamocortical oscillation
      return [
        { pathway: "glutamate", intensity: 0.2 },
        { pathway: "gaba", intensity: 0.3 },
      ];
    case "memory_event": {
      const op = eventData && (eventData as { operation?: string }).operation;
      if (op === "retrieve") {
        return [
          { pathway: "acetylcholine", intensity: 0.8 },
          { pathway: "glutamate", intensity: 0.6 },
        ];
      }
      if (op === "write") {
        return [
          { pathway: "acetylcholine", intensity: 0.7 },
          { pathway: "glutamate", intensity: 0.5 },
        ];
      }
      if (op === "consolidate") {
        // Acetylcholine is SUPPRESSED during consolidation (NREM-like)
        return [
          { pathway: "acetylcholine", intensity: 0.3 },
          { pathway: "glutamate", intensity: 0.6 },
        ];
      }
      if (op === "decay") {
        return [{ pathway: "gaba", intensity: 0.5 }];
      }
      return [{ pathway: "acetylcholine", intensity: 0.5 }];
    }
    case "thalamic_gate": {
      const open = eventData && (eventData as { gate_open?: boolean }).gate_open;
      if (open) {
        return [
          { pathway: "glutamate", intensity: 0.8 },
          { pathway: "norepinephrine", intensity: 0.5 },
        ];
      }
      // Gate closed = thalamic reticular nucleus inhibition
      return [{ pathway: "gaba", intensity: 0.6 }];
    }
    case "hippocampal_cascade":
      return [
        { pathway: "acetylcholine", intensity: 0.9 },
        { pathway: "glutamate", intensity: 0.7 },
      ];
    case "error_correction":
      // Purkinje cells are GABAergic, climbing fibers are glutamatergic
      return [
        { pathway: "gaba", intensity: 0.7 },
        { pathway: "glutamate", intensity: 0.5 },
      ];
    case "system_vitals":
      // Autonomic brainstem rhythm: locus coeruleus + raphe tonic firing
      return [
        { pathway: "norepinephrine", intensity: 0.3 },
        { pathway: "serotonin", intensity: 0.2 },
      ];
    case "soul_cycle":
      // DMN is glutamatergic with cholinergic attentional modulation
      return [
        { pathway: "glutamate", intensity: 0.6 },
        { pathway: "acetylcholine", intensity: 0.4 },
      ];
    case "action_dispatch":
      // Executive output with motivational dopamine signal
      return [
        { pathway: "glutamate", intensity: 0.7 },
        { pathway: "dopamine", intensity: 0.4 },
      ];
    case "llm_call":
      // Cortical processing burst
      return [{ pathway: "glutamate", intensity: 0.8 }];
    case "collection_activity": {
      const colOp = eventData && (eventData as { operation?: string }).operation;
      if (colOp === "write") {
        return [
          { pathway: "glutamate", intensity: 0.4 },
          { pathway: "acetylcholine", intensity: 0.3 },
        ];
      }
      if (colOp === "read") {
        return [{ pathway: "acetylcholine", intensity: 0.4 }];
      }
      return [];
    }
    default:
      return [];
  }
}

// Legacy single-pathway function — kept for backward compatibility
export function getPathwayForEvent(eventType: string): string | null {
  const pathways = getPathwaysForEvent(eventType);
  return pathways.length > 0 ? pathways[0].pathway : null;
}

// Region centers in 3D space (approximate, for drawing pathways between regions)
export const REGION_CENTERS: Record<string, [number, number, number]> = {
  "left-hemisphere": [-3, 10, 0],
  "right-hemisphere": [3, 10, 0],
  "cerebellum": [0, 3, -4],
  "midbrain": [0, 6, -1],
  "pons": [0, 4, -2],
  "medulla": [0, 2, -2],
  "hippocampus": [-2.5, 6, 1],
  "amygdala": [-3, 5.5, 2],
  "hypothalamus": [0, 6, 1],
  "thalamus": [0, 8, 0],
  "corpus-callosum": [0, 10, 0],
  "ventricles": [0, 8, 0],
  "caudate-nucleus": [-1.5, 9, 1],
  "putamen": [-2.5, 8, 1.5],
  "globus-pallidus": [-2, 7.5, 1],
  "nucleus-accumbens": [-1, 5, 2],
  "substantia-nigra": [0, 5, -1.5],
  "subthalamic-nucleus": [-1, 6, 0.5],
  "pituitary": [0, 5, 2],
  "auditory-cortex": [-5, 7, 2],
  "entorhinal-cortex": [-3, 4, 3],
  "dentate-gyrus": [-2, 5.5, 1.5],
  "subiculum": [-2, 5, 1],
  "olfactory-bulb": [0, 5, 5],
  // Specific nuclei for neurotransmitter pathway sources
  "raphe-nuclei": [0, 3.5, -2],
  "locus-coeruleus": [0, 4.5, -2.5],
  "basal-forebrain": [-1, 6.5, 2.5],
};
