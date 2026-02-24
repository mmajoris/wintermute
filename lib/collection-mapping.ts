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

// Neurotransmitter pathway definitions (biologically accurate)
export interface NeurotransmitterPathway {
  source: string;
  targets: string[];
  color: string; // hex color for visualization
}

export const NEUROTRANSMITTER_PATHWAYS: Record<string, NeurotransmitterPathway> = {
  dopamine: {
    source: "substantia-nigra",
    targets: ["nucleus-accumbens", "caudate-nucleus", "putamen", "left-hemisphere"],
    color: "#ff8833",
  },
  serotonin: {
    source: "pons",
    targets: ["amygdala", "hippocampus", "left-hemisphere", "right-hemisphere", "hypothalamus"],
    color: "#33ddaa",
  },
  norepinephrine: {
    source: "pons",
    targets: ["thalamus", "amygdala", "hippocampus", "left-hemisphere", "cerebellum"],
    color: "#ff5544",
  },
  acetylcholine: {
    source: "pons",
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

// Which neurotransmitter pathway fires for which event type
export function getPathwayForEvent(eventType: string): string | null {
  switch (eventType) {
    case "reward_signal": return "dopamine";
    case "emotional_state": return "serotonin";
    case "thought_loop_tick": return "glutamate";
    case "memory_event": return "acetylcholine";
    case "thalamic_gate": return "glutamate";
    case "hippocampal_cascade": return "acetylcholine";
    case "error_correction": return "norepinephrine";
    default: return null;
  }
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
};
