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
