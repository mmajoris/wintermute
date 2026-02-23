import type { BiologicalNode } from "@/lib/types";

export const cerebellum: BiologicalNode = {
  id: "cerebellum",
  name: "Cerebellum",
  level: "system",
  category: "cerebellum",
  description:
    "The cerebellum coordinates movement, fine motor control, balance, timing, and error correction. It does NOT initiate movement — it refines it.",
  functions: [
    "Coordination",
    "Fine motor control",
    "Balance",
    "Timing",
    "Error correction of movement",
  ],
  children: [
    // ───────────────────────── CEREBROCEREBELLUM (LATERAL ZONE) ─────────────────────────
    {
      id: "cerebrocerebellum",
      name: "Cerebrocerebellum (Lateral Zone)",
      level: "region",
      category: "cerebellum",
      description:
        "The lateral cerebellar zone involved in cognitive functions and motor planning, receiving input from cerebral association areas via the pontine nuclei.",
      functions: [
        "Cognitive functions",
        "Motor planning",
      ],
      children: [
        {
          id: "lateral-hemispheres",
          name: "Lateral Hemispheres",
          level: "subregion",
          category: "cerebellum",
          description:
            "The most lateral cerebellar regions that support motor planning and cognitive processing, projecting to the dentate nucleus.",
          functions: [
            "Motor planning",
            "Cognitive processing",
          ],
          children: [],
          position3D: [0.12, -0.38, -0.32],
          color: "#7c3aed",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-lateral-hemispheres",
            collection: "movement_planning",
            role: "Plan Encoding Substrate",
            description: "Encodes motor plans and cognitive sequences for cerebellar refinement.",
            fields: [
              { name: "plan_vector", type: "vector<f32>", description: "Encoded motor plan representation" },
              { name: "sequence_index", type: "u32", description: "Current step in planned movement sequence" },
              { name: "cognitive_load", type: "f32", description: "Working memory load during planning" },
            ],
            activationState: 0.55,
            linkedModules: ["schema-movement-planning", "schema-correction-output"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "dentate-nucleus", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Motor plan output" },
            { targetId: "cerebrocerebellum", type: "structural", strength: 0.9, signalType: "electrical", label: "Regional integration" },
          ],
        },
      ],
      position3D: [0.08, -0.38, -0.33],
      scale3D: [0.2, 0.15, 0.2],
      color: "#7c3aed",
      signalType: "electrical",
      schemaMapping: {
        id: "schema-movement-planning",
        collection: "movement_planning",
        role: "Motor Plan Optimizer",
        description:
          "Optimizes and refines motor plans from cortical association areas before execution.",
        fields: [
          { name: "motor_plan_vector", type: "vector<f32>", description: "Planned movement trajectory embedding" },
          { name: "optimization_score", type: "f32", description: "Confidence in optimized plan" },
          { name: "temporal_window_ms", type: "u64", description: "Planning horizon in milliseconds" },
          { name: "context_tag", type: "string", description: "Motor context identifier" },
        ],
        activationState: 0.55,
        linkedModules: ["schema-error-correction", "schema-correction-output"],
        category: "cerebellum",
      },
      connections: [
        { targetId: "primary-motor-cortex", type: "excitatory", strength: 0.5, signalType: "electrical", label: "Receives cortical motor plans" },
        { targetId: "dentate-nucleus", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Output to dentate" },
      ],
    },

    // ───────────────────────── SPINOCEREBELLUM (MEDIAL ZONE) ─────────────────────────
    {
      id: "spinocerebellum",
      name: "Spinocerebellum (Medial Zone)",
      level: "region",
      category: "cerebellum",
      description:
        "The medial cerebellar zone that receives spinal and cortical input to coordinate body and limb movement execution in real time.",
      functions: [
        "Body and limb movement execution",
      ],
      children: [
        {
          id: "vermis",
          name: "Vermis",
          level: "subregion",
          category: "cerebellum",
          description:
            "The midline cerebellar structure that controls posture, locomotion, and eye movements, projecting to the fastigial nucleus.",
          functions: [
            "Posture control",
            "Locomotion",
            "Eye movements",
          ],
          children: [],
          position3D: [0.0, -0.42, -0.33],
          color: "#9333ea",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-vermis",
            collection: "execution_monitor",
            role: "Postural-Locomotor Processor",
            description: "Monitors and adjusts posture, gait, and eye movement execution.",
            fields: [
              { name: "posture_vector", type: "vector<f32>", description: "Current postural state encoding" },
              { name: "gait_phase", type: "u8", description: "Current phase of locomotor cycle" },
              { name: "eye_position_error", type: "f32", description: "Deviation of eye position from target" },
            ],
            activationState: 0.6,
            linkedModules: ["schema-execution-monitor", "schema-balance-system"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "fastigial-nucleus", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Output to fastigial" },
            { targetId: "spinocerebellum", type: "structural", strength: 0.9, signalType: "electrical", label: "Regional integration" },
          ],
        },
        {
          id: "intermediate-zone",
          name: "Intermediate Zone",
          level: "subregion",
          category: "cerebellum",
          description:
            "The paravermal region that fine-tunes limb movement execution, receiving proprioceptive feedback and projecting to the interposed nuclei.",
          functions: [
            "Limb movement fine-tuning",
          ],
          children: [],
          position3D: [0.05, -0.4, -0.34],
          color: "#9333ea",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-intermediate-zone",
            collection: "execution_monitor",
            role: "Limb Adjustment Processor",
            description: "Fine-tunes limb movement trajectories based on proprioceptive feedback.",
            fields: [
              { name: "limb_state", type: "vector<f32>", description: "Current limb position and velocity" },
              { name: "adjustment_vector", type: "vector<f32>", description: "Computed limb trajectory correction" },
              { name: "proprioceptive_weight", type: "f32", description: "Weight of proprioceptive feedback in computation" },
            ],
            activationState: 0.55,
            linkedModules: ["schema-execution-monitor", "schema-correction-output"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "interposed-nuclei", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Output to interposed" },
            { targetId: "spinocerebellum", type: "structural", strength: 0.9, signalType: "electrical", label: "Regional integration" },
          ],
        },
      ],
      position3D: [0.02, -0.4, -0.34],
      scale3D: [0.22, 0.18, 0.22],
      color: "#9333ea",
      signalType: "electrical",
      schemaMapping: {
        id: "schema-execution-monitor",
        collection: "execution_monitor",
        role: "Real-Time Movement Adjuster",
        description:
          "Monitors ongoing movement execution and generates real-time adjustment signals based on proprioceptive and efference copy input.",
        fields: [
          { name: "efference_copy", type: "vector<f32>", description: "Copy of commanded motor output for comparison" },
          { name: "proprioceptive_feedback", type: "vector<f32>", description: "Actual limb state from sensory feedback" },
          { name: "execution_error", type: "f32", description: "Magnitude of deviation from intended trajectory" },
          { name: "adjustment_signal", type: "vector<f32>", description: "Computed real-time correction vector" },
        ],
        activationState: 0.6,
        linkedModules: ["schema-error-correction", "schema-correction-output"],
        category: "cerebellum",
      },
      connections: [
        { targetId: "primary-motor-cortex", type: "excitatory", strength: 0.5, signalType: "electrical", label: "Receives motor commands" },
        { targetId: "interposed-nuclei", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Output to interposed" },
      ],
    },

    // ───────────────────────── VESTIBULOCEREBELLUM (FLOCULONODULAR LOBE) ─────────────────────────
    {
      id: "vestibulocerebellum",
      name: "Vestibulocerebellum (Flocculonodular Lobe)",
      level: "region",
      category: "cerebellum",
      description:
        "The phylogenetically oldest cerebellar region that processes vestibular input for balance control and vestibulo-ocular reflex stabilization.",
      functions: [
        "Balance",
        "Vestibular reflexes",
      ],
      children: [
        {
          id: "flocculus",
          name: "Flocculus",
          level: "subregion",
          category: "cerebellum",
          description:
            "A lobule that stabilizes eye movements during head motion through the vestibulo-ocular reflex and smooth pursuit.",
          functions: [
            "Eye movement stabilization",
          ],
          children: [],
          position3D: [0.06, -0.36, -0.38],
          color: "#a855f7",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-flocculus",
            collection: "balance_system",
            role: "Oculomotor Stabilizer",
            description: "Computes eye movement corrections for vestibular and smooth pursuit stabilization.",
            fields: [
              { name: "head_velocity", type: "vector<f32>", description: "Angular head velocity from vestibular input" },
              { name: "retinal_slip", type: "f32", description: "Retinal image motion during head movement" },
              { name: "vor_gain", type: "f32", description: "VOR gain adjustment for current conditions" },
            ],
            activationState: 0.5,
            linkedModules: ["schema-balance-system", "schema-inhibitory-gate"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "vestibular-nuclei", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Vestibular input" },
            { targetId: "vestibulocerebellum", type: "structural", strength: 0.9, signalType: "electrical", label: "Regional integration" },
          ],
        },
        {
          id: "nodulus",
          name: "Nodulus",
          level: "subregion",
          category: "cerebellum",
          description:
            "The midline nodule that processes head position and orientation for spatial awareness and balance.",
          functions: [
            "Head position sensing",
          ],
          children: [],
          position3D: [0.0, -0.36, -0.39],
          color: "#a855f7",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-nodulus",
            collection: "balance_system",
            role: "Head Position Integrator",
            description: "Integrates vestibular and proprioceptive input for head orientation awareness.",
            fields: [
              { name: "head_orientation", type: "vector<f32>", description: "3D head orientation quaternion" },
              { name: "linear_acceleration", type: "vector<f32>", description: "Linear acceleration from otoliths" },
              { name: "gravity_vector", type: "vector<f32>", description: "Estimated gravity direction" },
            ],
            activationState: 0.55,
            linkedModules: ["schema-balance-system", "schema-correction-output"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "vestibular-nuclei", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Vestibular input" },
            { targetId: "vestibulocerebellum", type: "structural", strength: 0.9, signalType: "electrical", label: "Regional integration" },
          ],
        },
      ],
      position3D: [0.03, -0.36, -0.37],
      scale3D: [0.18, 0.12, 0.15],
      color: "#a855f7",
      signalType: "electrical",
      schemaMapping: {
        id: "schema-balance-system",
        collection: "balance_system",
        role: "Equilibrium Processor",
        description:
          "Processes vestibular and proprioceptive input to maintain postural balance and stabilize gaze.",
        fields: [
          { name: "vestibular_input", type: "vector<f32>", description: "Raw vestibular canal and otolith signals" },
          { name: "balance_error", type: "f32", description: "Deviation from stable equilibrium" },
          { name: "compensation_vector", type: "vector<f32>", description: "Postural correction command" },
          { name: "gain_modulation", type: "f32", description: "Context-dependent reflex gain" },
        ],
        activationState: 0.55,
        linkedModules: ["schema-error-correction", "schema-correction-output"],
        category: "cerebellum",
      },
      connections: [
        { targetId: "brainstem", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Vestibular nuclei relay" },
        { targetId: "fastigial-nucleus", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Balance output to fastigial" },
      ],
    },

    // ───────────────────────── DEEP CEREBELLAR NUCLEI ─────────────────────────
    {
      id: "deep-cerebellar-nuclei",
      name: "Deep Cerebellar Nuclei",
      level: "region",
      category: "cerebellum",
      description:
        "The output nuclei of the cerebellum that receive Purkinje cell inhibition and relay cerebellar computations to the brainstem, thalamus, and cortex.",
      functions: [
        "Cerebellar output relay",
        "Motor correction dispatch",
      ],
      children: [
        {
          id: "dentate-nucleus",
          name: "Dentate Nucleus",
          level: "subregion",
          category: "cerebellum",
          description:
            "The largest deep cerebellar nucleus, receiving input from the lateral cerebellar cortex and outputting motor planning signals to the thalamus and cortex.",
          functions: [
            "Motor planning output",
          ],
          children: [],
          position3D: [0.08, -0.4, -0.36],
          color: "#6d28d9",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-dentate-nucleus",
            collection: "correction_output",
            role: "Motor Plan Output Relay",
            description: "Relays disinhibited cerebellar motor planning signals to thalamus and cortex.",
            fields: [
              { name: "output_vector", type: "vector<f32>", description: "Corrected motor plan signal" },
              { name: "disinhibition_level", type: "f32", description: "Degree of Purkinje inhibition release" },
              { name: "target_region", type: "string", description: "Thalamic or cortical target identifier" },
            ],
            activationState: 0.55,
            linkedModules: ["schema-correction-output", "schema-movement-planning"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "thalamus", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Thalamocortical relay" },
            { targetId: "red-nucleus", type: "excitatory", strength: 0.5, signalType: "electrical", label: "Rubrospinal input" },
          ],
        },
        {
          id: "interposed-nuclei",
          name: "Interposed Nuclei",
          level: "subregion",
          category: "cerebellum",
          description:
            "Comprising the emboliform and globose nuclei, they receive from the intermediate zone and adjust limb movement via the red nucleus and thalamus.",
          functions: [
            "Limb movement adjustment",
          ],
          children: [],
          position3D: [0.04, -0.42, -0.35],
          color: "#6d28d9",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-interposed-nuclei",
            collection: "correction_output",
            role: "Limb Correction Relay",
            description: "Relays limb adjustment signals to red nucleus and thalamus.",
            fields: [
              { name: "limb_correction", type: "vector<f32>", description: "Computed limb trajectory correction" },
              { name: "output_strength", type: "f32", description: "Magnitude of correction signal" },
              { name: "limb_id", type: "u8", description: "Target limb identifier" },
            ],
            activationState: 0.55,
            linkedModules: ["schema-correction-output", "schema-execution-monitor"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "red-nucleus", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Rubrospinal relay" },
            { targetId: "thalamus", type: "excitatory", strength: 0.5, signalType: "electrical", label: "Thalamocortical relay" },
          ],
        },
        {
          id: "fastigial-nucleus",
          name: "Fastigial Nucleus",
          level: "subregion",
          category: "cerebellum",
          description:
            "The most medial deep nucleus, receiving from the vermis and vestibulocerebellum, and outputting balance and eye movement commands to vestibular and reticular nuclei.",
          functions: [
            "Balance output",
            "Eye movement output",
          ],
          children: [],
          position3D: [0.0, -0.42, -0.36],
          color: "#6d28d9",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-fastigial-nucleus",
            collection: "correction_output",
            role: "Balance-Eye Output Relay",
            description: "Relays postural and oculomotor correction signals to brainstem nuclei.",
            fields: [
              { name: "postural_correction", type: "vector<f32>", description: "Postural adjustment command" },
              { name: "eye_correction", type: "vector<f32>", description: "Eye movement correction vector" },
              { name: "vestibular_target", type: "string", description: "Target vestibular nucleus identifier" },
            ],
            activationState: 0.55,
            linkedModules: ["schema-correction-output", "schema-balance-system"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "vestibular-nuclei", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Vestibulospinal output" },
            { targetId: "reticular-formation", type: "excitatory", strength: 0.5, signalType: "electrical", label: "Reticulospinal output" },
          ],
        },
      ],
      position3D: [0.04, -0.41, -0.36],
      scale3D: [0.2, 0.2, 0.18],
      color: "#6d28d9",
      signalType: "electrical",
      schemaMapping: {
        id: "schema-correction-output",
        collection: "correction_output",
        role: "Adjusted Signal Dispatcher",
        description:
          "Receives disinhibited signals from Purkinje layer and dispatches corrected motor commands to downstream targets.",
        fields: [
          { name: "output_vector", type: "vector<f32>", description: "Corrected motor output embedding" },
          { name: "target_channel", type: "string", description: "Downstream target identifier" },
          { name: "timestamp", type: "u64", description: "Time of output dispatch" },
        ],
        activationState: 0.55,
        linkedModules: ["schema-error-correction", "schema-inhibitory-gate"],
        category: "cerebellum",
      },
      connections: [
        { targetId: "thalamus", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Thalamocortical pathway" },
        { targetId: "red-nucleus", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Rubrospinal pathway" },
        { targetId: "brainstem", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Brainstem relay" },
      ],
    },

    // ───────────────────────── CEREBELLAR CORTEX LAYERS ─────────────────────────
    {
      id: "cerebellar-cortex-layers",
      name: "Cerebellar Cortex Layers",
      level: "region",
      category: "cerebellum",
      description:
        "The three-layered cortical sheet that processes mossy and climbing fiber input to generate precise inhibitory output via Purkinje cells.",
      functions: [
        "Cerebellar cortical processing",
        "Inhibitory output computation",
      ],
      children: [
        {
          id: "purkinje-cell-layer",
          name: "Purkinje Cell Layer",
          level: "subregion",
          category: "cerebellum",
          description:
            "The single layer of Purkinje cells that form the primary output of the cerebellar cortex, providing GABAergic inhibition to the deep nuclei.",
          functions: [
            "Primary output neurons",
            "Inhibitory output to deep nuclei",
          ],
          children: [],
          position3D: [0.03, -0.4, -0.37],
          color: "#7c3aed",
          signalType: "chemical",
          schemaMapping: {
            id: "schema-inhibitory-gate",
            collection: "inhibitory_gate",
            role: "Precision Inhibition Filter",
            description:
              "Filters and gates deep nuclear output through precisely timed GABAergic inhibition, enabling error-corrected signal passthrough.",
            fields: [
              { name: "inhibition_level", type: "f32", description: "Current Purkinje inhibitory output strength" },
              { name: "timing_window_ms", type: "f32", description: "Temporal window of inhibition" },
              { name: "learning_modulation", type: "f32", description: "Modulation from climbing fiber error input" },
            ],
            activationState: 0.6,
            linkedModules: ["schema-error-correction", "schema-correction-output"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "dentate-nucleus", type: "inhibitory", strength: 0.8, signalType: "chemical", label: "GABAergic inhibition" },
            { targetId: "interposed-nuclei", type: "inhibitory", strength: 0.8, signalType: "chemical", label: "GABAergic inhibition" },
            { targetId: "fastigial-nucleus", type: "inhibitory", strength: 0.8, signalType: "chemical", label: "GABAergic inhibition" },
          ],
        },
        {
          id: "granule-cell-layer",
          name: "Granule Cell Layer",
          level: "subregion",
          category: "cerebellum",
          description:
            "The innermost layer containing the most numerous neurons in the brain; receives mossy fiber input and projects parallel fibers to the molecular layer.",
          functions: [
            "Mossy fiber input processing",
            "Parallel fiber output",
          ],
          children: [],
          position3D: [0.02, -0.41, -0.38],
          color: "#9333ea",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-granule-layer",
            collection: "inhibitory_gate",
            role: "Input Expansion Processor",
            description: "Expands sparse mossy fiber input into dense parallel fiber representations for Purkinje processing.",
            fields: [
              { name: "mossy_input_rate", type: "f32", description: "Incoming mossy fiber activity rate" },
              { name: "parallel_fiber_activity", type: "vector<f32>", description: "Encoded parallel fiber output pattern" },
              { name: "expansion_factor", type: "u32", description: "Granule cell expansion ratio" },
            ],
            activationState: 0.5,
            linkedModules: ["schema-inhibitory-gate", "schema-execution-monitor"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "purkinje-cell-layer", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Parallel fiber input" },
            { targetId: "molecular-layer", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Parallel fiber output" },
          ],
        },
        {
          id: "molecular-layer",
          name: "Molecular Layer",
          level: "subregion",
          category: "cerebellum",
          description:
            "The outermost layer containing parallel fibers, Purkinje dendritic trees, and stellate/basket interneurons for lateral inhibition and signal integration.",
          functions: [
            "Parallel fiber processing",
            "Dendritic integration",
          ],
          children: [],
          position3D: [0.02, -0.39, -0.36],
          color: "#a855f7",
          signalType: "electrical",
          schemaMapping: {
            id: "schema-molecular-layer",
            collection: "inhibitory_gate",
            role: "Parallel Fiber Integrator",
            description: "Integrates parallel fiber and climbing fiber input onto Purkinje dendrites for precise timing.",
            fields: [
              { name: "parallel_fiber_input", type: "vector<f32>", description: "Aggregate parallel fiber activity" },
              { name: "climbing_fiber_input", type: "f32", description: "Climbing fiber error signal magnitude" },
              { name: "integration_threshold", type: "f32", description: "Purkinje activation threshold" },
            ],
            activationState: 0.5,
            linkedModules: ["schema-inhibitory-gate", "schema-error-correction"],
            category: "cerebellum",
          },
          connections: [
            { targetId: "purkinje-cell-layer", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Dendritic input" },
            { targetId: "inferior-olivary-nucleus", type: "excitatory", strength: 0.5, signalType: "electrical", label: "Receives climbing fibers" },
          ],
        },
      ],
      position3D: [0.02, -0.4, -0.37],
      scale3D: [0.25, 0.2, 0.25],
      color: "#7c3aed",
      signalType: "electrical",
      schemaMapping: {
        id: "schema-cerebellar-cortex",
        collection: "inhibitory_gate",
        role: "Cortical Processing Hub",
        description:
          "Three-layered cortical sheet that transforms mossy and climbing fiber input into Purkinje inhibitory output.",
        fields: [
          { name: "mossy_load", type: "f32", description: "Aggregate mossy fiber input level" },
          { name: "climbing_fiber_rate", type: "f32", description: "Climbing fiber complex spike rate" },
          { name: "purkinje_output", type: "f32", description: "Aggregate Purkinje inhibitory output" },
        ],
        activationState: 0.55,
        linkedModules: ["schema-inhibitory-gate", "schema-correction-output", "schema-error-correction"],
        category: "cerebellum",
      },
      connections: [
        { targetId: "purkinje-cell-layer", type: "structural", strength: 0.9, signalType: "electrical", label: "Contains Purkinje output" },
        { targetId: "deep-cerebellar-nuclei", type: "inhibitory", strength: 0.7, signalType: "chemical", label: "Purkinje to nuclei" },
      ],
    },
  ],
  position3D: [0, -0.4, -0.35],
  scale3D: [0.35, 0.3, 0.35],
  color: "#8b5cf6",
  signalType: "electrical",
  schemaMapping: {
    id: "schema-error-correction",
    collection: "error_correction",
    role: "Prediction Error Calculator",
    description:
      "Compares predicted vs actual outcomes and generates correction signals",
    fields: [
      { name: "predicted_state", type: "vector<f32>", description: "Expected outcome embedding" },
      { name: "actual_state", type: "vector<f32>", description: "Observed outcome embedding" },
      { name: "error_magnitude", type: "f32", description: "Magnitude of prediction error" },
      { name: "correction_vector", type: "vector<f32>", description: "Computed adjustment signal" },
      { name: "timestamp", type: "u64", description: "Time of error computation" },
    ],
    activationState: 0.5,
    linkedModules: ["schema-movement-planning", "schema-execution-monitor", "schema-balance-system"],
    category: "cerebellum",
  },
  connections: [
    { targetId: "brainstem", type: "excitatory", strength: 0.7, signalType: "electrical", label: "Cerebellar-brainstem relay" },
    { targetId: "primary-motor-cortex", type: "excitatory", strength: 0.6, signalType: "electrical", label: "Thalamocortical motor loop" },
    { targetId: "pons", type: "excitatory", strength: 0.65, signalType: "electrical", label: "Pontocerebellar input" },
  ],
};
