import type { BiologicalNode } from "@/lib/types";
import { cerebrum } from "./cerebrum";
import { cerebellum } from "./cerebellum";
import { brainstem } from "./brainstem";
import { limbicSystem } from "./limbic";
import { autonomicSystem } from "./autonomic";
import { cranialNerves } from "./cranial-nerves";
import { neuralPathways } from "./pathways";
import { microscopicStructures } from "./microscopic";

export const anatomyRoot: BiologicalNode = {
  id: "human-nervous-system",
  name: "Human Nervous System",
  level: "macro",
  category: "cerebrum",
  description:
    "The complete human nervous system — a distributed, redundant, network-based parallel-processing system containing approximately 86 billion neurons forming 100 trillion synaptic connections across hundreds of named anatomical regions.",
  functions: [
    "Conscious thought and abstract reasoning",
    "Voluntary and involuntary movement control",
    "Sensory perception and integration",
    "Autonomic regulation of vital functions",
    "Memory encoding, storage, and retrieval",
    "Emotional processing and social cognition",
    "Language production and comprehension",
    "Homeostatic regulation of internal state",
  ],
  children: [
    cerebrum,
    cerebellum,
    brainstem,
    limbicSystem,
    autonomicSystem,
    cranialNerves,
    neuralPathways,
    microscopicStructures,
  ],
  position3D: [0, 0, 0],
  color: "#6366f1",
  schemaMapping: {
    id: "schema-root",
    collection: "system_root",
    role: "Master Orchestrator",
    description:
      "Root-level system coordinating all cognitive, autonomic, and sensory subsystems",
    fields: [
      {
        name: "global_state",
        type: "vector<f32>",
        description: "Aggregate system state embedding",
      },
      {
        name: "consciousness_level",
        type: "f32",
        description: "Wakefulness/awareness metric (0=coma, 1=fully alert)",
      },
      {
        name: "active_subsystems",
        type: "string[]",
        description: "Currently active module identifiers",
      },
      {
        name: "timestamp",
        type: "u64",
        description: "System time reference",
      },
    ],
    activationState: 1.0,
    linkedModules: [
      "schema-cognitive-modules",
      "schema-error-correction",
      "schema-background-processes",
      "schema-memory-embeddings",
      "schema-autonomic-engine",
      "schema-signal-router",
    ],
    category: "cerebrum",
  },
  connections: [],
  signalType: "electrical",
};

export {
  cerebrum,
  cerebellum,
  brainstem,
  limbicSystem,
  autonomicSystem,
  cranialNerves,
  neuralPathways,
  microscopicStructures,
};
