(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/data/anatomy/cerebrum.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cerebrum",
    ()=>cerebrum
]);
const cerebrum = {
    id: "cerebrum",
    name: "Cerebrum",
    level: "system",
    category: "cerebrum",
    description: "The largest part of the brain, responsible for higher-order functions including thought, action, sensation, and language. Divided into four lobes and interconnected by large-scale functional networks.",
    functions: [
        "Higher-order cognition",
        "Voluntary movement",
        "Sensory perception",
        "Language",
        "Consciousness",
        "Memory formation and retrieval"
    ],
    position3D: [
        0,
        0.3,
        0
    ],
    scale3D: [
        1.4,
        1.0,
        1.2
    ],
    color: "#818cf8",
    signalType: "electrical",
    connections: [
        {
            targetId: "brainstem",
            type: "excitatory",
            strength: 0.9,
            signalType: "electrical",
            label: "Corticopontine / corticospinal tracts"
        },
        {
            targetId: "cerebellum",
            type: "excitatory",
            strength: 0.7,
            signalType: "electrical",
            label: "Corticopontocerebellar pathway"
        },
        {
            targetId: "thalamus",
            type: "excitatory",
            strength: 0.95,
            signalType: "electrical",
            label: "Thalamocortical loop"
        }
    ],
    schemaMapping: {
        id: "schema-cerebrum",
        collection: "cognitive_modules",
        role: "Master Cortical Processor",
        description: "Top-level orchestrator for all cortical computation, routing sensory input to executive output through layered processing hierarchies.",
        fields: [
            {
                name: "cortical_state",
                type: "enum",
                description: "Current global activation mode (awake, drowsy, sleep, flow)"
            },
            {
                name: "dominant_frequency",
                type: "float",
                description: "Dominant EEG band frequency in Hz (delta through gamma)"
            },
            {
                name: "hemispheric_balance",
                type: "float",
                description: "Lateralization index from -1 (left) to 1 (right)"
            },
            {
                name: "active_lobe",
                type: "string",
                description: "Currently most-activated lobe identifier"
            },
            {
                name: "integration_score",
                type: "float",
                description: "Cross-lobe binding coherence from 0 to 1"
            }
        ],
        activationState: 0.85,
        linkedModules: [
            "cognitive_modules",
            "action_dispatch",
            "sensory_encoders",
            "temporal_processing",
            "visual_processing"
        ],
        category: "cerebrum"
    },
    children: [
        // ───────────────────────────────────────────────
        // FRONTAL LOBE
        // ───────────────────────────────────────────────
        {
            id: "frontal-lobe",
            name: "Frontal Lobe",
            level: "region",
            category: "cerebrum",
            description: "The anterior-most lobe of the cerebrum, governing executive function, decision making, planning, personality expression, voluntary motor control, and speech production.",
            functions: [
                "Executive function",
                "Decision making",
                "Planning",
                "Personality expression",
                "Voluntary motor control",
                "Speech production"
            ],
            position3D: [
                0,
                0.4,
                0.3
            ],
            scale3D: [
                0.9,
                0.6,
                0.6
            ],
            color: "#6366f1",
            signalType: "electrical",
            connections: [
                {
                    targetId: "parietal-lobe",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "Frontoparietal fibers"
                },
                {
                    targetId: "temporal-lobe",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Uncinate fasciculus"
                },
                {
                    targetId: "default-mode-network",
                    type: "modulatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Medial prefrontal contribution"
                }
            ],
            schemaMapping: {
                id: "schema-frontal-lobe",
                collection: "cognitive_modules",
                role: "Executive Controller",
                description: "Central executive hub managing goal-directed behavior, working memory buffers, inhibitory control, and action planning pipelines.",
                fields: [
                    {
                        name: "goal_stack",
                        type: "array<string>",
                        description: "Ordered list of active goal representations"
                    },
                    {
                        name: "inhibition_level",
                        type: "float",
                        description: "Current impulse suppression strength (0–1)"
                    },
                    {
                        name: "plan_depth",
                        type: "int",
                        description: "Number of future steps currently held in prospective memory"
                    },
                    {
                        name: "task_switching_cost",
                        type: "float",
                        description: "Latency penalty for switching between active tasks in ms"
                    },
                    {
                        name: "dopamine_tone",
                        type: "float",
                        description: "Tonic dopamine level modulating motivation and reward prediction"
                    }
                ],
                activationState: 0.8,
                linkedModules: [
                    "action_dispatch",
                    "language_output",
                    "working_memory",
                    "attention_router"
                ],
                category: "cerebrum"
            },
            children: [
                {
                    id: "primary-motor-cortex",
                    name: "Primary Motor Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann area 4 occupying the precentral gyrus. Sends descending signals through the corticospinal tract to activate skeletal muscles in a somatotopic arrangement (motor homunculus).",
                    functions: [
                        "Sends motor signals to spinal cord",
                        "Activates skeletal muscles",
                        "Fine motor control",
                        "Somatotopic movement encoding"
                    ],
                    position3D: [
                        0,
                        0.45,
                        0.15
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "premotor-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Premotor → M1 motor commands"
                        },
                        {
                            targetId: "primary-somatosensory-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Sensorimotor feedback loop"
                        },
                        {
                            targetId: "supplementary-motor-area",
                            type: "excitatory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "SMA → M1 sequence initiation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-primary-motor-cortex",
                        collection: "action_dispatch",
                        role: "Action Dispatcher",
                        description: "Translates high-level motor plans into precise muscle activation patterns dispatched via corticospinal pathways.",
                        fields: [
                            {
                                name: "target_muscle_group",
                                type: "string",
                                description: "Identifier of the somatotopic muscle zone being activated"
                            },
                            {
                                name: "force_vector",
                                type: "vec3",
                                description: "Intended force direction and magnitude for the movement"
                            },
                            {
                                name: "firing_rate",
                                type: "float",
                                description: "Average neuronal firing rate in Hz driving motor output"
                            },
                            {
                                name: "laterality",
                                type: "enum",
                                description: "Contralateral side being controlled (left | right)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "action_dispatch",
                            "sensory_encoders"
                        ],
                        category: "cerebrum"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                0.45,
                                0.15
                            ],
                            radius: 0.02
                        },
                        {
                            position: [
                                0,
                                0.1,
                                0.0
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0,
                                -0.3,
                                -0.1
                            ],
                            radius: 0.01
                        }
                    ]
                },
                {
                    id: "prefrontal-cortex",
                    name: "Prefrontal Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "The anterior portion of the frontal lobe responsible for planning complex cognitive behavior, moderating social conduct, and orchestrating working memory. Considered the seat of executive control.",
                    functions: [
                        "Planning",
                        "Working memory maintenance",
                        "Executive control",
                        "Abstract reasoning",
                        "Personality modulation"
                    ],
                    position3D: [
                        0,
                        0.45,
                        0.45
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "dorsolateral-prefrontal-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "DLPFC subregion integration"
                        },
                        {
                            targetId: "orbitofrontal-cortex",
                            type: "modulatory",
                            strength: 0.75,
                            signalType: "chemical",
                            label: "Reward-executive coupling"
                        },
                        {
                            targetId: "anterior-cingulate-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Conflict monitoring feedback"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-prefrontal-cortex",
                        collection: "cognitive_modules",
                        role: "Executive Controller",
                        description: "Core executive processing unit managing working memory buffers, task set maintenance, and top-down attentional biasing.",
                        fields: [
                            {
                                name: "working_memory_slots",
                                type: "int",
                                description: "Number of active items held in working memory (typically 4±1)"
                            },
                            {
                                name: "cognitive_load",
                                type: "float",
                                description: "Current demand on executive resources from 0 to 1"
                            },
                            {
                                name: "set_shifting_state",
                                type: "enum",
                                description: "Current task set (maintain | shift | inhibit)"
                            },
                            {
                                name: "prospective_plan",
                                type: "array<string>",
                                description: "Sequential plan steps queued for execution"
                            },
                            {
                                name: "metacognitive_confidence",
                                type: "float",
                                description: "Self-assessed accuracy of current decision from 0 to 1"
                            }
                        ],
                        activationState: 0.85,
                        linkedModules: [
                            "working_memory",
                            "attention_router",
                            "narrative_engine"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "brocas-area",
                    name: "Broca's Area",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located in the left inferior frontal gyrus (Brodmann areas 44 and 45). Critical for speech production, language output, and syntactic processing. Damage produces non-fluent (expressive) aphasia.",
                    functions: [
                        "Speech production",
                        "Language output",
                        "Syntactic processing",
                        "Verbal working memory"
                    ],
                    position3D: [
                        -0.3,
                        0.3,
                        0.3
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "wernickes-area",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Arcuate fasciculus"
                        },
                        {
                            targetId: "primary-motor-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Motor speech commands to face/tongue area"
                        },
                        {
                            targetId: "prefrontal-cortex",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Executive language planning"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-brocas-area",
                        collection: "language_output",
                        role: "Language Production Engine",
                        description: "Generates structured language output by sequencing phonemes, morphemes, and syntactic frames into fluent speech or written text.",
                        fields: [
                            {
                                name: "utterance_buffer",
                                type: "string",
                                description: "Current speech segment being assembled for output"
                            },
                            {
                                name: "syntax_tree",
                                type: "object",
                                description: "Active syntactic parse tree guiding word ordering"
                            },
                            {
                                name: "phoneme_queue",
                                type: "array<string>",
                                description: "Ordered phoneme sequence awaiting motor articulation"
                            },
                            {
                                name: "fluency_score",
                                type: "float",
                                description: "Real-time fluency measure from 0 (halting) to 1 (fluid)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "language_output",
                            "language_comprehension",
                            "action_dispatch"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "premotor-cortex",
                    name: "Premotor Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann area 6, anterior to the primary motor cortex. Plans and prepares voluntary movements, integrates sensory information for movement guidance, and contains mirror neurons involved in action observation.",
                    functions: [
                        "Movement planning",
                        "Sensory-guided movement",
                        "Action observation (mirror neurons)",
                        "Postural preparation"
                    ],
                    position3D: [
                        0,
                        0.48,
                        0.22
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-motor-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Motor plan relay to M1"
                        },
                        {
                            targetId: "posterior-parietal-cortex",
                            type: "excitatory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "Visuomotor integration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-premotor-cortex",
                        collection: "action_dispatch",
                        role: "Movement Planner",
                        description: "Prepares motor programs by integrating spatial and sensory cues before forwarding finalized plans to the primary motor cortex.",
                        fields: [
                            {
                                name: "planned_trajectory",
                                type: "array<vec3>",
                                description: "Sequence of waypoints defining intended movement path"
                            },
                            {
                                name: "sensory_context",
                                type: "object",
                                description: "Current visual and proprioceptive context guiding planning"
                            },
                            {
                                name: "readiness_potential",
                                type: "float",
                                description: "Pre-movement neural buildup level (0–1)"
                            },
                            {
                                name: "mirror_activation",
                                type: "float",
                                description: "Activation during observed actions (mirror neuron response)"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "action_dispatch",
                            "sensory_encoders"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "supplementary-motor-area",
                    name: "Supplementary Motor Area",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located on the medial surface of the frontal lobe, anterior to the primary motor cortex. Specializes in planning and coordinating complex movement sequences, especially internally generated (self-initiated) actions.",
                    functions: [
                        "Complex movement sequencing",
                        "Bimanual coordination",
                        "Internally generated movement initiation",
                        "Motor sequence learning"
                    ],
                    position3D: [
                        0,
                        0.52,
                        0.1
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-motor-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Sequence initiation to M1"
                        },
                        {
                            targetId: "premotor-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Sequence-plan coordination"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-supplementary-motor-area",
                        collection: "action_dispatch",
                        role: "Sequence Coordinator",
                        description: "Buffers and sequences complex multi-step motor programs, particularly for self-initiated and bimanual actions.",
                        fields: [
                            {
                                name: "sequence_buffer",
                                type: "array<string>",
                                description: "Ordered queue of motor sub-actions in the current sequence"
                            },
                            {
                                name: "step_index",
                                type: "int",
                                description: "Current position in the motor sequence"
                            },
                            {
                                name: "initiation_threshold",
                                type: "float",
                                description: "Internal signal threshold required to begin the sequence"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "action_dispatch"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "frontal-eye-fields",
                    name: "Frontal Eye Fields",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located in the dorsal premotor cortex near the precentral sulcus (Brodmann area 8). Controls voluntary saccadic eye movements and visual attention shifts. Works with superior colliculus for gaze direction.",
                    functions: [
                        "Voluntary saccadic eye movements",
                        "Visual attention shifts",
                        "Gaze direction coordination",
                        "Visual search guidance"
                    ],
                    position3D: [
                        0,
                        0.5,
                        0.28
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-visual-cortex",
                            type: "modulatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Top-down visual attention"
                        },
                        {
                            targetId: "posterior-parietal-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Spatial attention coordination"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-frontal-eye-fields",
                        collection: "attention_router",
                        role: "Gaze Controller",
                        description: "Directs voluntary saccades and covert attention shifts to selected spatial locations based on task demands.",
                        fields: [
                            {
                                name: "saccade_target",
                                type: "vec2",
                                description: "Target screen/world coordinates for next saccade"
                            },
                            {
                                name: "fixation_duration",
                                type: "float",
                                description: "Time in ms the current fixation has been held"
                            },
                            {
                                name: "attention_priority_map",
                                type: "matrix",
                                description: "Spatial priority map weighting visual field locations"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "attention_router",
                            "visual_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "dorsolateral-prefrontal-cortex",
                    name: "Dorsolateral Prefrontal Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "The upper lateral surface of the prefrontal cortex (Brodmann areas 9 and 46). Critical hub for abstract reasoning, cognitive flexibility, working memory manipulation, and rule-based decision making.",
                    functions: [
                        "Abstract reasoning",
                        "Cognitive flexibility",
                        "Working memory manipulation",
                        "Rule-based decision making",
                        "Set shifting"
                    ],
                    position3D: [
                        0.15,
                        0.5,
                        0.4
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "prefrontal-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Executive integration"
                        },
                        {
                            targetId: "anterior-cingulate-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Cognitive control loop"
                        },
                        {
                            targetId: "posterior-parietal-cortex",
                            type: "excitatory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "Frontoparietal attention network"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-dlpfc",
                        collection: "working_memory",
                        role: "Reasoning Engine",
                        description: "Performs abstract rule manipulation and maintains/updates working memory representations under executive control.",
                        fields: [
                            {
                                name: "active_rule_set",
                                type: "array<string>",
                                description: "Currently applied abstract rules guiding behavior"
                            },
                            {
                                name: "flexibility_index",
                                type: "float",
                                description: "Ease of switching between rule sets (0 rigid – 1 flexible)"
                            },
                            {
                                name: "wm_contents",
                                type: "array<object>",
                                description: "Items currently held in working memory with decay timers"
                            },
                            {
                                name: "interference_level",
                                type: "float",
                                description: "Degree of proactive interference from previous trials"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "working_memory",
                            "cognitive_modules",
                            "attention_router"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "orbitofrontal-cortex",
                    name: "Orbitofrontal Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located above the orbits of the eyes on the ventral surface of the frontal lobe (Brodmann areas 10, 11, 47). Integrates sensory information with reward value to guide decision making and social behavior.",
                    functions: [
                        "Reward processing",
                        "Decision valuation",
                        "Social behavior regulation",
                        "Outcome expectation",
                        "Emotion-based learning"
                    ],
                    position3D: [
                        0,
                        0.25,
                        0.45
                    ],
                    color: "#6366f1",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "prefrontal-cortex",
                            type: "modulatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "Value signal to executive"
                        },
                        {
                            targetId: "anterior-cingulate-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Outcome monitoring"
                        },
                        {
                            targetId: "temporal-pole",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Social-emotional context"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-orbitofrontal-cortex",
                        collection: "cognitive_modules",
                        role: "Reward Valuator",
                        description: "Computes expected reward values and updates choice preferences based on outcome history and sensory-hedonic signals.",
                        fields: [
                            {
                                name: "expected_value",
                                type: "float",
                                description: "Predicted reward magnitude for the current option"
                            },
                            {
                                name: "prediction_error",
                                type: "float",
                                description: "Difference between expected and received reward"
                            },
                            {
                                name: "choice_history",
                                type: "array<object>",
                                description: "Recent choice-outcome pairs for value updating"
                            },
                            {
                                name: "social_valence",
                                type: "float",
                                description: "Positive/negative social context weighting (-1 to 1)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "cognitive_modules",
                            "narrative_engine"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "anterior-cingulate-cortex",
                    name: "Anterior Cingulate Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "A collar-shaped region surrounding the frontal part of the corpus callosum (Brodmann areas 24, 32, 33). Central to error detection, conflict monitoring, emotional regulation, and autonomic function modulation.",
                    functions: [
                        "Error detection",
                        "Conflict monitoring",
                        "Emotional regulation",
                        "Pain processing",
                        "Autonomic modulation"
                    ],
                    position3D: [
                        0,
                        0.35,
                        0.2
                    ],
                    color: "#6366f1",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "dorsolateral-prefrontal-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Conflict signal to DLPFC"
                        },
                        {
                            targetId: "orbitofrontal-cortex",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Error-value integration"
                        },
                        {
                            targetId: "salience-network",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Core salience hub"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-anterior-cingulate",
                        collection: "attention_router",
                        role: "Conflict Monitor",
                        description: "Detects response conflicts and prediction errors, signaling the need for increased cognitive control to prefrontal regions.",
                        fields: [
                            {
                                name: "conflict_signal",
                                type: "float",
                                description: "Magnitude of detected response conflict (0 = no conflict, 1 = maximal)"
                            },
                            {
                                name: "error_rate",
                                type: "float",
                                description: "Running average of recent error frequency"
                            },
                            {
                                name: "autonomic_drive",
                                type: "float",
                                description: "Strength of sympathetic modulation output"
                            },
                            {
                                name: "emotional_arousal",
                                type: "float",
                                description: "Current emotional arousal level impacting monitoring"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "attention_router",
                            "cognitive_modules",
                            "working_memory"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                }
            ]
        },
        // ───────────────────────────────────────────────
        // PARIETAL LOBE
        // ───────────────────────────────────────────────
        {
            id: "parietal-lobe",
            name: "Parietal Lobe",
            level: "region",
            category: "cerebrum",
            description: "Located posterior to the frontal lobe and superior to the temporal lobe. Integrates sensory information from multiple modalities including touch, pressure, pain, temperature, and proprioception, and constructs spatial awareness.",
            functions: [
                "Touch processing",
                "Pressure and pain sensation",
                "Temperature perception",
                "Spatial awareness",
                "Sensory integration",
                "Mathematical reasoning"
            ],
            position3D: [
                0,
                0.4,
                -0.1
            ],
            scale3D: [
                0.8,
                0.5,
                0.5
            ],
            color: "#8b5cf6",
            signalType: "electrical",
            connections: [
                {
                    targetId: "frontal-lobe",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "Frontoparietal fibers"
                },
                {
                    targetId: "occipital-lobe",
                    type: "excitatory",
                    strength: 0.75,
                    signalType: "electrical",
                    label: "Dorsal visual stream"
                },
                {
                    targetId: "temporal-lobe",
                    type: "excitatory",
                    strength: 0.65,
                    signalType: "electrical",
                    label: "Parietotemporal junction"
                }
            ],
            schemaMapping: {
                id: "schema-parietal-lobe",
                collection: "sensory_encoders",
                role: "Input Encoder",
                description: "Primary hub for encoding, integrating, and spatially mapping somatosensory and proprioceptive input streams into unified body-world representations.",
                fields: [
                    {
                        name: "body_map",
                        type: "object",
                        description: "Somatotopic representation of current tactile and proprioceptive state"
                    },
                    {
                        name: "spatial_frame",
                        type: "enum",
                        description: "Active reference frame (egocentric | allocentric | object-centered)"
                    },
                    {
                        name: "attention_spotlight",
                        type: "vec3",
                        description: "Current focus of spatial attention in 3D coordinates"
                    },
                    {
                        name: "integration_latency",
                        type: "float",
                        description: "Cross-modal binding delay in milliseconds"
                    },
                    {
                        name: "pain_gate",
                        type: "float",
                        description: "Gate-control modulation level filtering nociceptive signals"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "sensory_encoders",
                    "action_dispatch",
                    "visual_processing"
                ],
                category: "cerebrum"
            },
            children: [
                {
                    id: "primary-somatosensory-cortex",
                    name: "Primary Somatosensory Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann areas 1, 2, and 3 on the postcentral gyrus. Receives and processes tactile, proprioceptive, and nociceptive signals from the body in a somatotopic layout (sensory homunculus).",
                    functions: [
                        "Body sensation processing",
                        "Tactile discrimination",
                        "Proprioceptive awareness",
                        "Pain localization"
                    ],
                    position3D: [
                        0,
                        0.45,
                        -0.05
                    ],
                    color: "#8b5cf6",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-motor-cortex",
                            type: "excitatory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "Sensorimotor feedback"
                        },
                        {
                            targetId: "somatosensory-association-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Higher-order somatosensory relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-primary-somatosensory",
                        collection: "sensory_encoders",
                        role: "Tactile Receptor Array",
                        description: "Decodes raw somatosensory afferent signals into spatially mapped touch, pressure, temperature, and pain representations.",
                        fields: [
                            {
                                name: "receptive_field",
                                type: "object",
                                description: "Active body region and its spatial resolution"
                            },
                            {
                                name: "stimulus_intensity",
                                type: "float",
                                description: "Magnitude of current tactile stimulus (0–1 normalized)"
                            },
                            {
                                name: "modality",
                                type: "enum",
                                description: "Sensory sub-modality (touch | pressure | temperature | pain | proprioception)"
                            },
                            {
                                name: "adaptation_rate",
                                type: "float",
                                description: "Speed of receptor adaptation to sustained stimulus"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "sensory_encoders",
                            "action_dispatch"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "posterior-parietal-cortex",
                    name: "Posterior Parietal Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann areas 5 and 7 on the superior parietal surface. Integrates visual and somatosensory information for spatial attention, reaching movements, and constructing an internal model of peripersonal space.",
                    functions: [
                        "Spatial attention",
                        "Visually guided reaching",
                        "Peripersonal space modeling",
                        "Sensorimotor transformation"
                    ],
                    position3D: [
                        0,
                        0.42,
                        -0.15
                    ],
                    color: "#8b5cf6",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "premotor-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Reach planning signals"
                        },
                        {
                            targetId: "frontal-eye-fields",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Spatial attention coordination"
                        },
                        {
                            targetId: "superior-parietal-lobule",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Visuospatial integration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-posterior-parietal",
                        collection: "sensory_encoders",
                        role: "Spatial Integrator",
                        description: "Fuses visual and somatosensory streams to construct egocentric spatial maps used for reaching, grasping, and spatial reasoning.",
                        fields: [
                            {
                                name: "reach_vector",
                                type: "vec3",
                                description: "Computed direction and distance for the next reaching movement"
                            },
                            {
                                name: "spatial_map",
                                type: "matrix",
                                description: "Egocentric map of nearby objects and body position"
                            },
                            {
                                name: "attention_focus",
                                type: "vec3",
                                description: "Current locus of visuospatial attention"
                            },
                            {
                                name: "coordinate_transform",
                                type: "enum",
                                description: "Active transform (retinal → head-centered → body-centered)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "sensory_encoders",
                            "action_dispatch",
                            "visual_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "superior-parietal-lobule",
                    name: "Superior Parietal Lobule",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann areas 5 and 7 on the upper parietal surface. Specializes in visuospatial processing, mental rotation, spatial working memory, and the dorsal 'where' stream of visual processing.",
                    functions: [
                        "Visuospatial processing",
                        "Mental rotation",
                        "Spatial working memory",
                        "Dorsal stream relay"
                    ],
                    position3D: [
                        0,
                        0.5,
                        -0.12
                    ],
                    color: "#8b5cf6",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "posterior-parietal-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Visuospatial relay"
                        },
                        {
                            targetId: "precuneus",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Self-spatial integration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-superior-parietal-lobule",
                        collection: "sensory_encoders",
                        role: "Visuospatial Processor",
                        description: "Encodes spatial relationships and performs mental transformations of visual-spatial data for navigation and object manipulation.",
                        fields: [
                            {
                                name: "rotation_angle",
                                type: "float",
                                description: "Current mental rotation angle in degrees"
                            },
                            {
                                name: "spatial_buffer",
                                type: "array<vec3>",
                                description: "Points held in spatial working memory"
                            },
                            {
                                name: "depth_estimate",
                                type: "float",
                                description: "Estimated distance to attended object"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "sensory_encoders",
                            "visual_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "inferior-parietal-lobule",
                    name: "Inferior Parietal Lobule",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann areas 39 (angular gyrus) and 40 (supramarginal gyrus). A multimodal association area critical for language processing, mathematical reasoning, body image, and understanding spatial relationships.",
                    functions: [
                        "Language processing",
                        "Mathematical reasoning",
                        "Body image",
                        "Tool use comprehension",
                        "Semantic integration"
                    ],
                    position3D: [
                        -0.2,
                        0.35,
                        -0.15
                    ],
                    color: "#8b5cf6",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "wernickes-area",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Semantic-language binding"
                        },
                        {
                            targetId: "primary-somatosensory-cortex",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Body schema input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-inferior-parietal-lobule",
                        collection: "sensory_encoders",
                        role: "Multimodal Associator",
                        description: "Binds language, mathematical, and body-image representations by integrating across visual, auditory, and somatosensory domains.",
                        fields: [
                            {
                                name: "semantic_vector",
                                type: "vec128",
                                description: "High-dimensional semantic embedding of current concept"
                            },
                            {
                                name: "numerical_magnitude",
                                type: "float",
                                description: "Analog number line position for active quantity"
                            },
                            {
                                name: "body_schema_state",
                                type: "object",
                                description: "Current body-part ownership and spatial configuration"
                            },
                            {
                                name: "tool_affordance",
                                type: "string",
                                description: "Recognized affordance of currently attended tool/object"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "sensory_encoders",
                            "language_comprehension",
                            "working_memory"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "precuneus",
                    name: "Precuneus",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located on the medial surface of the parietal lobe (Brodmann area 7). One of the most metabolically active brain regions at rest. Central to self-awareness, episodic memory retrieval, and first-person perspective taking.",
                    functions: [
                        "Self-awareness",
                        "Episodic memory retrieval",
                        "First-person perspective",
                        "Mental imagery",
                        "Visuospatial imagery"
                    ],
                    position3D: [
                        0,
                        0.4,
                        -0.2
                    ],
                    color: "#8b5cf6",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "default-mode-network",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Core DMN node"
                        },
                        {
                            targetId: "posterior-parietal-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Spatial self-model"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-precuneus",
                        collection: "narrative_engine",
                        role: "Self-Model Hub",
                        description: "Maintains first-person perspective and autobiographical context, supporting episodic recall and self-referential thought.",
                        fields: [
                            {
                                name: "self_state",
                                type: "object",
                                description: "Current self-model including body-ownership and agency"
                            },
                            {
                                name: "episodic_trace",
                                type: "string",
                                description: "Active episodic memory fragment being replayed"
                            },
                            {
                                name: "perspective",
                                type: "enum",
                                description: "Current viewpoint (first-person | third-person | observer)"
                            },
                            {
                                name: "imagery_vividness",
                                type: "float",
                                description: "Strength of current mental image (0 dim – 1 vivid)"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "narrative_engine",
                            "sensory_encoders"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "somatosensory-association-cortex",
                    name: "Somatosensory Association Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann areas 5 and 7 posterior to S1. Performs higher-order processing of somatosensory input, integrating simple touch signals into complex perceptions such as object shape, texture recognition, and weight estimation.",
                    functions: [
                        "Complex touch interpretation",
                        "Stereognosis (object recognition by touch)",
                        "Texture discrimination",
                        "Weight estimation"
                    ],
                    position3D: [
                        0.1,
                        0.42,
                        -0.08
                    ],
                    color: "#8b5cf6",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-somatosensory-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Primary somatosensory input"
                        },
                        {
                            targetId: "inferior-parietal-lobule",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Object concept integration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-somatosensory-association",
                        collection: "sensory_encoders",
                        role: "Haptic Interpreter",
                        description: "Transforms raw somatosensory signals into high-level percepts of shape, texture, and material properties for object identification.",
                        fields: [
                            {
                                name: "object_shape",
                                type: "object",
                                description: "Reconstructed 3D shape from haptic exploration"
                            },
                            {
                                name: "texture_profile",
                                type: "array<float>",
                                description: "Frequency-domain texture signature"
                            },
                            {
                                name: "estimated_weight",
                                type: "float",
                                description: "Predicted mass of held object in grams"
                            },
                            {
                                name: "confidence",
                                type: "float",
                                description: "Recognition confidence score (0–1)"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "sensory_encoders"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                }
            ]
        },
        // ───────────────────────────────────────────────
        // TEMPORAL LOBE
        // ───────────────────────────────────────────────
        {
            id: "temporal-lobe",
            name: "Temporal Lobe",
            level: "region",
            category: "cerebrum",
            description: "Located beneath the lateral fissure on both hemispheres. Processes auditory information, language comprehension, memory encoding, and emotional tagging of experiences through connections with the limbic system.",
            functions: [
                "Hearing",
                "Language comprehension",
                "Memory encoding",
                "Emotional tagging",
                "Object recognition",
                "Social cognition"
            ],
            position3D: [
                0.5,
                -0.1,
                0.1
            ],
            scale3D: [
                0.5,
                0.45,
                0.55
            ],
            color: "#a855f7",
            signalType: "electrical",
            connections: [
                {
                    targetId: "frontal-lobe",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Uncinate fasciculus"
                },
                {
                    targetId: "parietal-lobe",
                    type: "excitatory",
                    strength: 0.65,
                    signalType: "electrical",
                    label: "Parietotemporal junction"
                },
                {
                    targetId: "occipital-lobe",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "Ventral visual stream"
                }
            ],
            schemaMapping: {
                id: "schema-temporal-lobe",
                collection: "temporal_processing",
                role: "Temporal Integration",
                description: "Integrates auditory streams, semantic memory, and object-recognition signals into coherent temporal representations bound with emotional and contextual metadata.",
                fields: [
                    {
                        name: "auditory_stream",
                        type: "array<float>",
                        description: "Current spectrotemporal representation of incoming sound"
                    },
                    {
                        name: "semantic_context",
                        type: "object",
                        description: "Active semantic frame for language and object meaning"
                    },
                    {
                        name: "memory_binding",
                        type: "float",
                        description: "Strength of hippocampal binding for current experience (0–1)"
                    },
                    {
                        name: "emotional_tag",
                        type: "object",
                        description: "Valence and arousal values attached to current percept"
                    },
                    {
                        name: "recognition_state",
                        type: "enum",
                        description: "Object recognition phase (detecting | matching | identified)"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "temporal_processing",
                    "language_comprehension",
                    "visual_processing"
                ],
                category: "cerebrum"
            },
            children: [
                {
                    id: "primary-auditory-cortex",
                    name: "Primary Auditory Cortex",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann areas 41 and 42 located on the superior temporal gyrus within Heschl's gyrus. Performs initial cortical processing of sound, encoding frequency, intensity, and timing of auditory stimuli tonotopically.",
                    functions: [
                        "Sound processing",
                        "Frequency discrimination",
                        "Intensity encoding",
                        "Temporal auditory patterning"
                    ],
                    position3D: [
                        0.45,
                        0.0,
                        0.05
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "superior-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Auditory association relay"
                        },
                        {
                            targetId: "wernickes-area",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Speech sound decoding"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-primary-auditory",
                        collection: "temporal_processing",
                        role: "Audio Decoder",
                        description: "Decodes raw auditory input into tonotopic frequency-intensity maps for downstream linguistic and environmental sound processing.",
                        fields: [
                            {
                                name: "frequency_band",
                                type: "float",
                                description: "Center frequency of the most active tonotopic column in Hz"
                            },
                            {
                                name: "amplitude_envelope",
                                type: "array<float>",
                                description: "Time-varying amplitude contour of incoming sound"
                            },
                            {
                                name: "onset_detection",
                                type: "boolean",
                                description: "Whether a new sound onset has been detected"
                            },
                            {
                                name: "binaural_cue",
                                type: "object",
                                description: "Interaural time and level differences for sound localization"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "temporal_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "wernickes-area",
                    name: "Wernicke's Area",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located in the posterior superior temporal gyrus (Brodmann area 22). Essential for language comprehension — decoding speech sounds into meaning. Damage causes fluent (receptive) aphasia with impaired understanding.",
                    functions: [
                        "Language comprehension",
                        "Speech sound decoding",
                        "Semantic access from spoken language",
                        "Auditory word recognition"
                    ],
                    position3D: [
                        0.5,
                        -0.05,
                        -0.05
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "brocas-area",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Arcuate fasciculus"
                        },
                        {
                            targetId: "inferior-parietal-lobule",
                            type: "excitatory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "Semantic integration"
                        },
                        {
                            targetId: "middle-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Lexical-semantic relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-wernickes-area",
                        collection: "language_comprehension",
                        role: "Language Decoder",
                        description: "Transforms acoustic speech representations into semantic content by matching phonological patterns to lexical entries.",
                        fields: [
                            {
                                name: "phoneme_stream",
                                type: "array<string>",
                                description: "Incoming phoneme sequence being parsed"
                            },
                            {
                                name: "lexical_candidates",
                                type: "array<object>",
                                description: "Active word candidates with match probabilities"
                            },
                            {
                                name: "semantic_output",
                                type: "object",
                                description: "Decoded meaning representation of current utterance"
                            },
                            {
                                name: "comprehension_confidence",
                                type: "float",
                                description: "Confidence in current interpretation (0–1)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "language_comprehension",
                            "language_output",
                            "temporal_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "superior-temporal-gyrus",
                    name: "Superior Temporal Gyrus",
                    level: "subregion",
                    category: "cerebrum",
                    description: "The gyrus occupying the superior part of the temporal lobe (Brodmann areas 22, 41, 42). Beyond primary auditory processing, it handles complex auditory processing including speech perception, music, and environmental sounds.",
                    functions: [
                        "Auditory association processing",
                        "Speech perception",
                        "Music processing",
                        "Environmental sound recognition"
                    ],
                    position3D: [
                        0.48,
                        0.05,
                        0.08
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-auditory-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Auditory feature input"
                        },
                        {
                            targetId: "wernickes-area",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Speech stream relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-superior-temporal-gyrus",
                        collection: "temporal_processing",
                        role: "Auditory Scene Analyzer",
                        description: "Segregates and classifies complex auditory scenes into distinct streams (speech, music, ambient) for parallel downstream processing.",
                        fields: [
                            {
                                name: "auditory_objects",
                                type: "array<object>",
                                description: "List of segregated auditory streams with identity labels"
                            },
                            {
                                name: "speech_envelope",
                                type: "array<float>",
                                description: "Amplitude modulation pattern matching speech rhythm"
                            },
                            {
                                name: "spectral_complexity",
                                type: "float",
                                description: "Harmonic richness of current auditory input"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "temporal_processing",
                            "language_comprehension"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "middle-temporal-gyrus",
                    name: "Middle Temporal Gyrus",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann area 21 on the lateral temporal surface. A key hub for semantic memory storage and retrieval — accessing stored knowledge about word meanings, object properties, and conceptual relationships.",
                    functions: [
                        "Semantic memory storage",
                        "Conceptual knowledge retrieval",
                        "Word meaning access",
                        "Category-level representations"
                    ],
                    position3D: [
                        0.52,
                        -0.1,
                        0.05
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "wernickes-area",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Lexical-semantic input"
                        },
                        {
                            targetId: "inferior-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Visual-semantic binding"
                        },
                        {
                            targetId: "temporal-pole",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Abstract concept relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-middle-temporal-gyrus",
                        collection: "temporal_processing",
                        role: "Semantic Memory Store",
                        description: "Stores and retrieves long-term semantic knowledge including word meanings, category structure, and encyclopedic facts.",
                        fields: [
                            {
                                name: "concept_vector",
                                type: "vec128",
                                description: "Distributed semantic embedding of the active concept"
                            },
                            {
                                name: "category_label",
                                type: "string",
                                description: "Taxonomic category of the retrieved concept"
                            },
                            {
                                name: "associative_spread",
                                type: "array<string>",
                                description: "Related concepts activated through semantic priming"
                            },
                            {
                                name: "retrieval_strength",
                                type: "float",
                                description: "Activation strength of the recalled memory trace (0–1)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "temporal_processing",
                            "language_comprehension",
                            "narrative_engine"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "inferior-temporal-gyrus",
                    name: "Inferior Temporal Gyrus",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann area 20 on the bottom of the temporal lobe. The endpoint of the ventral visual 'what' stream, specializing in complex visual object recognition including shapes, faces, and written words.",
                    functions: [
                        "Visual object recognition",
                        "Shape processing",
                        "Visual categorization",
                        "Reading (visual word form)"
                    ],
                    position3D: [
                        0.5,
                        -0.2,
                        0.1
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "fusiform-face-area",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Face-specific processing"
                        },
                        {
                            targetId: "visual-association-areas",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Ventral stream input"
                        },
                        {
                            targetId: "middle-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Object-semantic linking"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-inferior-temporal-gyrus",
                        collection: "visual_processing",
                        role: "Object Recognizer",
                        description: "Performs invariant visual object recognition by matching complex feature combinations against stored object templates.",
                        fields: [
                            {
                                name: "object_identity",
                                type: "string",
                                description: "Recognized object label or 'unknown'"
                            },
                            {
                                name: "feature_vector",
                                type: "vec256",
                                description: "High-dimensional visual feature descriptor"
                            },
                            {
                                name: "viewpoint_invariance",
                                type: "float",
                                description: "Degree of recognition stability across viewpoints (0–1)"
                            },
                            {
                                name: "match_confidence",
                                type: "float",
                                description: "Confidence of the current object-template match"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "visual_processing",
                            "temporal_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "fusiform-face-area",
                    name: "Fusiform Face Area",
                    level: "subregion",
                    category: "cerebrum",
                    description: "A region on the fusiform gyrus (lateral occipitotemporal cortex) that shows selective activation for face stimuli. Critical for face detection, recognition, and identity processing — damage causes prosopagnosia.",
                    functions: [
                        "Face recognition",
                        "Face detection",
                        "Identity processing",
                        "Facial expression analysis"
                    ],
                    position3D: [
                        0.4,
                        -0.2,
                        -0.05
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "inferior-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Visual object context"
                        },
                        {
                            targetId: "temporal-pole",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Person identity-emotion link"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-fusiform-face-area",
                        collection: "visual_processing",
                        role: "Face Classifier",
                        description: "Specialized pattern matcher for holistic face processing, encoding identity, expression, and gaze direction from facial geometry.",
                        fields: [
                            {
                                name: "face_embedding",
                                type: "vec128",
                                description: "Identity-specific face encoding vector"
                            },
                            {
                                name: "expression_label",
                                type: "enum",
                                description: "Detected facial expression (happy | sad | angry | neutral | surprised | fearful)"
                            },
                            {
                                name: "gaze_direction",
                                type: "vec2",
                                description: "Estimated gaze direction of the observed face"
                            },
                            {
                                name: "familiarity_score",
                                type: "float",
                                description: "How familiar the detected face is (0 novel – 1 well-known)"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "visual_processing",
                            "temporal_processing",
                            "narrative_engine"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "temporal-pole",
                    name: "Temporal Pole",
                    level: "subregion",
                    category: "cerebrum",
                    description: "The most anterior tip of the temporal lobe (Brodmann area 38). Integrates complex perceptual inputs with emotional and social meaning — a convergence zone for social cognition, emotional processing, and personal semantic memory.",
                    functions: [
                        "Social cognition",
                        "Emotional processing",
                        "Person-specific semantic knowledge",
                        "Theory of mind support",
                        "Emotional valence assignment"
                    ],
                    position3D: [
                        0.5,
                        -0.05,
                        0.25
                    ],
                    color: "#a855f7",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "orbitofrontal-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Social-reward integration"
                        },
                        {
                            targetId: "fusiform-face-area",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Identity-emotion binding"
                        },
                        {
                            targetId: "middle-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Social semantic access"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-temporal-pole",
                        collection: "temporal_processing",
                        role: "Social-Emotional Integrator",
                        description: "Binds perceptual identity, emotional valence, and biographical knowledge into unified social representations of individuals and situations.",
                        fields: [
                            {
                                name: "person_model",
                                type: "object",
                                description: "Active mental model of the person being perceived or recalled"
                            },
                            {
                                name: "emotional_valence",
                                type: "float",
                                description: "Current emotional coloring of the social percept (-1 to 1)"
                            },
                            {
                                name: "social_schema",
                                type: "string",
                                description: "Active social script or frame guiding interaction expectations"
                            },
                            {
                                name: "theory_of_mind_state",
                                type: "object",
                                description: "Inferred mental state of the other agent (beliefs, desires, intentions)"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "temporal_processing",
                            "narrative_engine",
                            "cognitive_modules"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                }
            ]
        },
        // ───────────────────────────────────────────────
        // OCCIPITAL LOBE
        // ───────────────────────────────────────────────
        {
            id: "occipital-lobe",
            name: "Occipital Lobe",
            level: "region",
            category: "cerebrum",
            description: "The most posterior lobe of the cerebrum, almost entirely devoted to visual processing. Contains the primary visual cortex and multiple specialized visual areas organized into hierarchical processing streams.",
            functions: [
                "Vision processing",
                "Color perception",
                "Motion detection",
                "Depth perception",
                "Visual feature extraction"
            ],
            position3D: [
                0,
                0.2,
                -0.4
            ],
            scale3D: [
                0.6,
                0.45,
                0.4
            ],
            color: "#d946ef",
            signalType: "electrical",
            connections: [
                {
                    targetId: "parietal-lobe",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "Dorsal stream (where/how)"
                },
                {
                    targetId: "temporal-lobe",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "Ventral stream (what)"
                }
            ],
            schemaMapping: {
                id: "schema-occipital-lobe",
                collection: "visual_processing",
                role: "Visual Feature Extractor",
                description: "Primary visual processing pipeline extracting edges, colors, motion, and depth from retinal input and distributing features to dorsal and ventral processing streams.",
                fields: [
                    {
                        name: "retinotopic_map",
                        type: "matrix",
                        description: "Spatially organized map of visual field activation"
                    },
                    {
                        name: "dominant_orientation",
                        type: "float",
                        description: "Most prevalent edge orientation in current visual scene (0–180°)"
                    },
                    {
                        name: "color_histogram",
                        type: "array<float>",
                        description: "Distribution of color values across the visual field"
                    },
                    {
                        name: "motion_vector_field",
                        type: "matrix",
                        description: "Optical flow map describing motion direction and speed"
                    },
                    {
                        name: "depth_map",
                        type: "matrix",
                        description: "Estimated depth at each point in the visual field"
                    }
                ],
                activationState: 0.8,
                linkedModules: [
                    "visual_processing",
                    "sensory_encoders"
                ],
                category: "cerebrum"
            },
            children: [
                {
                    id: "primary-visual-cortex",
                    name: "Primary Visual Cortex (V1)",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann area 17, also called the striate cortex. The first cortical area to receive visual input from the lateral geniculate nucleus. Performs initial feature extraction — edge orientation, spatial frequency, and binocular disparity — in a precise retinotopic map.",
                    functions: [
                        "Raw visual input processing",
                        "Edge detection",
                        "Orientation selectivity",
                        "Binocular disparity computation"
                    ],
                    position3D: [
                        0,
                        0.15,
                        -0.45
                    ],
                    color: "#d946ef",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "secondary-visual-cortex",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "V1 → V2 feedforward"
                        },
                        {
                            targetId: "frontal-eye-fields",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Top-down attentional modulation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-v1",
                        collection: "visual_processing",
                        role: "Primary Visual Encoder",
                        description: "Encodes raw retinal input into oriented edge maps and spatial frequency channels with precise retinotopic organization.",
                        fields: [
                            {
                                name: "edge_map",
                                type: "matrix",
                                description: "Retinotopic map of detected edge orientations and strengths"
                            },
                            {
                                name: "spatial_frequency",
                                type: "float",
                                description: "Dominant spatial frequency in current receptive field (cycles/degree)"
                            },
                            {
                                name: "ocular_dominance",
                                type: "enum",
                                description: "Eye providing primary input (left | right | binocular)"
                            },
                            {
                                name: "contrast_sensitivity",
                                type: "float",
                                description: "Minimum contrast detectable at current adaptation level"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [
                            "visual_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "secondary-visual-cortex",
                    name: "Secondary Visual Cortex (V2)",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Brodmann area 18, surrounding V1. Receives strong feedforward input from V1 and performs more complex feature extraction including illusory contours, texture boundaries, figure-ground segregation, and stereoscopic depth.",
                    functions: [
                        "Visual feature extraction",
                        "Illusory contour detection",
                        "Texture boundary processing",
                        "Figure-ground segregation"
                    ],
                    position3D: [
                        0,
                        0.18,
                        -0.42
                    ],
                    color: "#d946ef",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-visual-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "V2 → V1 feedback"
                        },
                        {
                            targetId: "visual-association-areas",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "V2 → V3/V4/V5 feedforward"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-v2",
                        collection: "visual_processing",
                        role: "Feature Compositor",
                        description: "Combines V1 edge signals into higher-order features including texture boundaries, illusory contours, and stereoscopic depth cues.",
                        fields: [
                            {
                                name: "contour_map",
                                type: "matrix",
                                description: "Map of real and illusory contour completions"
                            },
                            {
                                name: "texture_segmentation",
                                type: "matrix",
                                description: "Regions segmented by texture boundary differences"
                            },
                            {
                                name: "stereo_depth",
                                type: "matrix",
                                description: "Disparity-based depth map from binocular input"
                            },
                            {
                                name: "figure_ground",
                                type: "matrix",
                                description: "Binary mask of figure vs. background assignment"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "visual_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "visual-association-areas",
                    name: "Visual Association Areas (V3/V4/V5)",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Higher-order visual areas: V3 processes dynamic form and global motion patterns, V4 specializes in color constancy and shape recognition, and V5 (MT) encodes visual motion direction and speed. Together they build rich visual representations.",
                    functions: [
                        "Color constancy (V4)",
                        "Motion perception (V5/MT)",
                        "Dynamic form processing (V3)",
                        "Depth from motion",
                        "Shape-from-shading"
                    ],
                    position3D: [
                        0.1,
                        0.22,
                        -0.38
                    ],
                    color: "#d946ef",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "secondary-visual-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "V2 feedforward input"
                        },
                        {
                            targetId: "inferior-temporal-gyrus",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Ventral stream to object recognition"
                        },
                        {
                            targetId: "posterior-parietal-cortex",
                            type: "excitatory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "Dorsal stream to spatial processing"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-visual-association",
                        collection: "visual_processing",
                        role: "Visual Property Extractor",
                        description: "Specialized parallel processors extracting color, motion, and dynamic form into separate channels that feed object recognition and spatial action streams.",
                        fields: [
                            {
                                name: "color_channels",
                                type: "array<object>",
                                description: "Per-region color constancy values (hue, saturation, luminance)"
                            },
                            {
                                name: "motion_vectors",
                                type: "matrix",
                                description: "Per-pixel motion direction and velocity from V5/MT"
                            },
                            {
                                name: "form_descriptors",
                                type: "array<object>",
                                description: "Shape-from-motion and shape-from-shading contours from V3"
                            },
                            {
                                name: "stream_routing",
                                type: "enum",
                                description: "Dominant output pathway (dorsal | ventral | both)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "visual_processing",
                            "sensory_encoders"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "cuneus",
                    name: "Cuneus",
                    level: "subregion",
                    category: "cerebrum",
                    description: "A wedge-shaped gyrus on the medial surface of the occipital lobe between the calcarine sulcus and the parieto-occipital sulcus (Brodmann area 17/18). Receives visual input from the superior visual field (contralateral lower retina) and contributes to basic visual processing.",
                    functions: [
                        "Visual processing (superior visual field)",
                        "Basic visual feature encoding",
                        "Visual attention modulation"
                    ],
                    position3D: [
                        0,
                        0.25,
                        -0.42
                    ],
                    color: "#d946ef",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-visual-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Retinotopic visual relay"
                        },
                        {
                            targetId: "lingual-gyrus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Upper-lower visual field integration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-cuneus",
                        collection: "visual_processing",
                        role: "Superior Field Processor",
                        description: "Processes visual information from the contralateral superior visual field, contributing to the early stages of the visual processing hierarchy.",
                        fields: [
                            {
                                name: "visual_field_quadrant",
                                type: "enum",
                                description: "Represented quadrant (upper-left | upper-right)"
                            },
                            {
                                name: "luminance_map",
                                type: "matrix",
                                description: "Luminance distribution across the processed visual field region"
                            },
                            {
                                name: "attention_weight",
                                type: "float",
                                description: "Top-down attentional gain applied to this region (0–1)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "visual_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                },
                {
                    id: "lingual-gyrus",
                    name: "Lingual Gyrus",
                    level: "subregion",
                    category: "cerebrum",
                    description: "Located on the medial surface of the occipital lobe below the calcarine sulcus (Brodmann areas 17, 18, 19). Involved in visual memory encoding, word recognition (visual word form area nearby), and color processing in the lower visual field.",
                    functions: [
                        "Visual word recognition",
                        "Visual memory encoding",
                        "Color processing",
                        "Dream imagery"
                    ],
                    position3D: [
                        0,
                        0.1,
                        -0.4
                    ],
                    color: "#d946ef",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-visual-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Retinotopic input (lower visual field)"
                        },
                        {
                            targetId: "fusiform-face-area",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "electrical",
                            label: "Visual word form → fusiform relay"
                        },
                        {
                            targetId: "cuneus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Upper-lower field integration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-lingual-gyrus",
                        collection: "visual_processing",
                        role: "Visual Memory Encoder",
                        description: "Encodes visual experiences into memory traces and supports visual word recognition by linking orthographic patterns to lexical stores.",
                        fields: [
                            {
                                name: "word_form",
                                type: "string",
                                description: "Currently recognized visual word string"
                            },
                            {
                                name: "visual_memory_trace",
                                type: "vec128",
                                description: "Encoded visual memory snapshot for long-term storage"
                            },
                            {
                                name: "color_percept",
                                type: "object",
                                description: "Perceived color at the attended location (hue, saturation, brightness)"
                            },
                            {
                                name: "encoding_strength",
                                type: "float",
                                description: "Strength of current visual-to-memory encoding (0–1)"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "visual_processing",
                            "temporal_processing"
                        ],
                        category: "cerebrum"
                    },
                    children: []
                }
            ]
        },
        // ───────────────────────────────────────────────
        // DEFAULT MODE NETWORK
        // ───────────────────────────────────────────────
        {
            id: "default-mode-network",
            name: "Default Mode Network",
            level: "circuit",
            category: "cerebrum",
            description: "A large-scale brain network active during rest and internally directed cognition. Encompasses medial prefrontal cortex, posterior cingulate/precuneus, and lateral parietal regions. Supports internal monologue, self-referential thinking, autobiographical memory, future simulation, and mind wandering.",
            functions: [
                "Internal monologue",
                "Self-referential thinking",
                "Mind wandering",
                "Autobiographical memory",
                "Future scenario simulation",
                "Theory of mind"
            ],
            position3D: [
                0,
                0.35,
                -0.05
            ],
            scale3D: [
                0.7,
                0.5,
                0.7
            ],
            color: "#3b82f6",
            signalType: "electrical",
            connections: [
                {
                    targetId: "salience-network",
                    type: "inhibitory",
                    strength: 0.75,
                    signalType: "electrical",
                    label: "Anti-correlated with salience network"
                },
                {
                    targetId: "central-executive-network",
                    type: "inhibitory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Anti-correlated with executive network"
                },
                {
                    targetId: "precuneus",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Posterior DMN hub"
                },
                {
                    targetId: "prefrontal-cortex",
                    type: "modulatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Medial PFC component"
                }
            ],
            schemaMapping: {
                id: "schema-default-mode-network",
                collection: "narrative_engine",
                role: "Self-Model / Internal Narrator",
                description: "Generates and maintains the ongoing internal narrative, self-model, and autobiographical continuity that forms the substrate of conscious self-experience.",
                fields: [
                    {
                        name: "narrative_stream",
                        type: "string",
                        description: "Current inner monologue or thought stream content"
                    },
                    {
                        name: "self_model_state",
                        type: "object",
                        description: "Active self-concept including identity, goals, and emotional baseline"
                    },
                    {
                        name: "temporal_projection",
                        type: "enum",
                        description: "Mental time travel direction (past_recall | present | future_simulation)"
                    },
                    {
                        name: "mind_wandering_index",
                        type: "float",
                        description: "Degree of stimulus-independent thought (0 focused – 1 free-wandering)"
                    },
                    {
                        name: "social_simulation",
                        type: "object",
                        description: "Active theory-of-mind model for imagined social interaction"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "narrative_engine",
                    "cognitive_modules",
                    "temporal_processing"
                ],
                category: "cerebrum"
            },
            children: []
        },
        // ───────────────────────────────────────────────
        // SALIENCE NETWORK
        // ───────────────────────────────────────────────
        {
            id: "salience-network",
            name: "Salience Network",
            level: "circuit",
            category: "cerebrum",
            description: "Anchored by the anterior insula and anterior cingulate cortex. Detects and filters salient stimuli, mediating the dynamic switching between the default mode network (internal focus) and central executive network (external focus).",
            functions: [
                "Switching between internal and external attention",
                "Salience detection",
                "Autonomic-emotional integration",
                "Interoceptive awareness",
                "Network toggling"
            ],
            position3D: [
                0.25,
                0.2,
                0.15
            ],
            scale3D: [
                0.5,
                0.4,
                0.5
            ],
            color: "#3b82f6",
            signalType: "electrical",
            connections: [
                {
                    targetId: "default-mode-network",
                    type: "inhibitory",
                    strength: 0.75,
                    signalType: "electrical",
                    label: "DMN suppression on salient input"
                },
                {
                    targetId: "central-executive-network",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "CEN activation on salient input"
                },
                {
                    targetId: "anterior-cingulate-cortex",
                    type: "excitatory",
                    strength: 0.85,
                    signalType: "electrical",
                    label: "ACC — core salience node"
                }
            ],
            schemaMapping: {
                id: "schema-salience-network",
                collection: "attention_router",
                role: "Priority Switcher",
                description: "Monitors all sensory and interoceptive channels for salient events and dynamically routes processing resources by toggling between default-mode and executive networks.",
                fields: [
                    {
                        name: "salience_map",
                        type: "matrix",
                        description: "Weighted priority map across all input channels"
                    },
                    {
                        name: "switch_state",
                        type: "enum",
                        description: "Current network mode (internal_DMN | external_CEN | transitioning)"
                    },
                    {
                        name: "interoceptive_signal",
                        type: "float",
                        description: "Strength of body-state signal driving attention reallocation"
                    },
                    {
                        name: "surprise_index",
                        type: "float",
                        description: "Bayesian surprise magnitude triggering reorientation"
                    },
                    {
                        name: "autonomic_coupling",
                        type: "float",
                        description: "Degree of sympathetic/parasympathetic co-activation"
                    }
                ],
                activationState: 0.65,
                linkedModules: [
                    "attention_router",
                    "narrative_engine",
                    "working_memory"
                ],
                category: "cerebrum"
            },
            children: []
        },
        // ───────────────────────────────────────────────
        // CENTRAL EXECUTIVE NETWORK
        // ───────────────────────────────────────────────
        {
            id: "central-executive-network",
            name: "Central Executive Network",
            level: "circuit",
            category: "cerebrum",
            description: "A frontoparietal network centered on the dorsolateral prefrontal cortex and posterior parietal cortex. Engaged during tasks requiring sustained attention, working memory manipulation, rule-based reasoning, and goal-directed problem solving.",
            functions: [
                "Working memory",
                "Problem solving",
                "Sustained attention",
                "Rule-based reasoning",
                "Goal-directed behavior",
                "Cognitive control"
            ],
            position3D: [
                0.15,
                0.45,
                0.1
            ],
            scale3D: [
                0.6,
                0.4,
                0.6
            ],
            color: "#3b82f6",
            signalType: "electrical",
            connections: [
                {
                    targetId: "default-mode-network",
                    type: "inhibitory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "DMN suppression during task focus"
                },
                {
                    targetId: "salience-network",
                    type: "excitatory",
                    strength: 0.75,
                    signalType: "electrical",
                    label: "Salience-triggered engagement"
                },
                {
                    targetId: "dorsolateral-prefrontal-cortex",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "DLPFC — core executive node"
                },
                {
                    targetId: "posterior-parietal-cortex",
                    type: "excitatory",
                    strength: 0.85,
                    signalType: "electrical",
                    label: "PPC — spatial working memory node"
                }
            ],
            schemaMapping: {
                id: "schema-central-executive-network",
                collection: "working_memory",
                role: "Active Buffer Manager",
                description: "Manages active working memory buffers, coordinates multi-step reasoning chains, and maintains goal representations during effortful cognitive tasks.",
                fields: [
                    {
                        name: "buffer_contents",
                        type: "array<object>",
                        description: "Items currently maintained in the central executive buffer"
                    },
                    {
                        name: "reasoning_chain",
                        type: "array<string>",
                        description: "Step-by-step reasoning trace for the active problem"
                    },
                    {
                        name: "goal_representation",
                        type: "object",
                        description: "Active goal with subgoals, constraints, and progress markers"
                    },
                    {
                        name: "cognitive_effort",
                        type: "float",
                        description: "Current mental effort expenditure (0 idle – 1 maximum)"
                    },
                    {
                        name: "task_completion",
                        type: "float",
                        description: "Estimated progress toward the current goal (0–1)"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "working_memory",
                    "cognitive_modules",
                    "attention_router"
                ],
                category: "cerebrum"
            },
            children: []
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/cerebellum.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cerebellum",
    ()=>cerebellum
]);
const cerebellum = {
    id: "cerebellum",
    name: "Cerebellum",
    level: "system",
    category: "cerebellum",
    description: "The cerebellum coordinates movement, fine motor control, balance, timing, and error correction. It does NOT initiate movement — it refines it.",
    functions: [
        "Coordination",
        "Fine motor control",
        "Balance",
        "Timing",
        "Error correction of movement"
    ],
    children: [
        // ───────────────────────── CEREBROCEREBELLUM (LATERAL ZONE) ─────────────────────────
        {
            id: "cerebrocerebellum",
            name: "Cerebrocerebellum (Lateral Zone)",
            level: "region",
            category: "cerebellum",
            description: "The lateral cerebellar zone involved in cognitive functions and motor planning, receiving input from cerebral association areas via the pontine nuclei.",
            functions: [
                "Cognitive functions",
                "Motor planning"
            ],
            children: [
                {
                    id: "lateral-hemispheres",
                    name: "Lateral Hemispheres",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The most lateral cerebellar regions that support motor planning and cognitive processing, projecting to the dentate nucleus.",
                    functions: [
                        "Motor planning",
                        "Cognitive processing"
                    ],
                    children: [],
                    position3D: [
                        0.12,
                        -0.38,
                        -0.32
                    ],
                    color: "#7c3aed",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-lateral-hemispheres",
                        collection: "movement_planning",
                        role: "Plan Encoding Substrate",
                        description: "Encodes motor plans and cognitive sequences for cerebellar refinement.",
                        fields: [
                            {
                                name: "plan_vector",
                                type: "vector<f32>",
                                description: "Encoded motor plan representation"
                            },
                            {
                                name: "sequence_index",
                                type: "u32",
                                description: "Current step in planned movement sequence"
                            },
                            {
                                name: "cognitive_load",
                                type: "f32",
                                description: "Working memory load during planning"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "schema-movement-planning",
                            "schema-correction-output"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "dentate-nucleus",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Motor plan output"
                        },
                        {
                            targetId: "cerebrocerebellum",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Regional integration"
                        }
                    ]
                }
            ],
            position3D: [
                0.08,
                -0.38,
                -0.33
            ],
            scale3D: [
                0.2,
                0.15,
                0.2
            ],
            color: "#7c3aed",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-movement-planning",
                collection: "movement_planning",
                role: "Motor Plan Optimizer",
                description: "Optimizes and refines motor plans from cortical association areas before execution.",
                fields: [
                    {
                        name: "motor_plan_vector",
                        type: "vector<f32>",
                        description: "Planned movement trajectory embedding"
                    },
                    {
                        name: "optimization_score",
                        type: "f32",
                        description: "Confidence in optimized plan"
                    },
                    {
                        name: "temporal_window_ms",
                        type: "u64",
                        description: "Planning horizon in milliseconds"
                    },
                    {
                        name: "context_tag",
                        type: "string",
                        description: "Motor context identifier"
                    }
                ],
                activationState: 0.55,
                linkedModules: [
                    "schema-error-correction",
                    "schema-correction-output"
                ],
                category: "cerebellum"
            },
            connections: [
                {
                    targetId: "primary-motor-cortex",
                    type: "excitatory",
                    strength: 0.5,
                    signalType: "electrical",
                    label: "Receives cortical motor plans"
                },
                {
                    targetId: "dentate-nucleus",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Output to dentate"
                }
            ]
        },
        // ───────────────────────── SPINOCEREBELLUM (MEDIAL ZONE) ─────────────────────────
        {
            id: "spinocerebellum",
            name: "Spinocerebellum (Medial Zone)",
            level: "region",
            category: "cerebellum",
            description: "The medial cerebellar zone that receives spinal and cortical input to coordinate body and limb movement execution in real time.",
            functions: [
                "Body and limb movement execution"
            ],
            children: [
                {
                    id: "vermis",
                    name: "Vermis",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The midline cerebellar structure that controls posture, locomotion, and eye movements, projecting to the fastigial nucleus.",
                    functions: [
                        "Posture control",
                        "Locomotion",
                        "Eye movements"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.42,
                        -0.33
                    ],
                    color: "#9333ea",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-vermis",
                        collection: "execution_monitor",
                        role: "Postural-Locomotor Processor",
                        description: "Monitors and adjusts posture, gait, and eye movement execution.",
                        fields: [
                            {
                                name: "posture_vector",
                                type: "vector<f32>",
                                description: "Current postural state encoding"
                            },
                            {
                                name: "gait_phase",
                                type: "u8",
                                description: "Current phase of locomotor cycle"
                            },
                            {
                                name: "eye_position_error",
                                type: "f32",
                                description: "Deviation of eye position from target"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "schema-execution-monitor",
                            "schema-balance-system"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "fastigial-nucleus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Output to fastigial"
                        },
                        {
                            targetId: "spinocerebellum",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Regional integration"
                        }
                    ]
                },
                {
                    id: "intermediate-zone",
                    name: "Intermediate Zone",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The paravermal region that fine-tunes limb movement execution, receiving proprioceptive feedback and projecting to the interposed nuclei.",
                    functions: [
                        "Limb movement fine-tuning"
                    ],
                    children: [],
                    position3D: [
                        0.05,
                        -0.4,
                        -0.34
                    ],
                    color: "#9333ea",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-intermediate-zone",
                        collection: "execution_monitor",
                        role: "Limb Adjustment Processor",
                        description: "Fine-tunes limb movement trajectories based on proprioceptive feedback.",
                        fields: [
                            {
                                name: "limb_state",
                                type: "vector<f32>",
                                description: "Current limb position and velocity"
                            },
                            {
                                name: "adjustment_vector",
                                type: "vector<f32>",
                                description: "Computed limb trajectory correction"
                            },
                            {
                                name: "proprioceptive_weight",
                                type: "f32",
                                description: "Weight of proprioceptive feedback in computation"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "schema-execution-monitor",
                            "schema-correction-output"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "interposed-nuclei",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Output to interposed"
                        },
                        {
                            targetId: "spinocerebellum",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Regional integration"
                        }
                    ]
                }
            ],
            position3D: [
                0.02,
                -0.4,
                -0.34
            ],
            scale3D: [
                0.22,
                0.18,
                0.22
            ],
            color: "#9333ea",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-execution-monitor",
                collection: "execution_monitor",
                role: "Real-Time Movement Adjuster",
                description: "Monitors ongoing movement execution and generates real-time adjustment signals based on proprioceptive and efference copy input.",
                fields: [
                    {
                        name: "efference_copy",
                        type: "vector<f32>",
                        description: "Copy of commanded motor output for comparison"
                    },
                    {
                        name: "proprioceptive_feedback",
                        type: "vector<f32>",
                        description: "Actual limb state from sensory feedback"
                    },
                    {
                        name: "execution_error",
                        type: "f32",
                        description: "Magnitude of deviation from intended trajectory"
                    },
                    {
                        name: "adjustment_signal",
                        type: "vector<f32>",
                        description: "Computed real-time correction vector"
                    }
                ],
                activationState: 0.6,
                linkedModules: [
                    "schema-error-correction",
                    "schema-correction-output"
                ],
                category: "cerebellum"
            },
            connections: [
                {
                    targetId: "primary-motor-cortex",
                    type: "excitatory",
                    strength: 0.5,
                    signalType: "electrical",
                    label: "Receives motor commands"
                },
                {
                    targetId: "interposed-nuclei",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Output to interposed"
                }
            ]
        },
        // ───────────────────────── VESTIBULOCEREBELLUM (FLOCULONODULAR LOBE) ─────────────────────────
        {
            id: "vestibulocerebellum",
            name: "Vestibulocerebellum (Flocculonodular Lobe)",
            level: "region",
            category: "cerebellum",
            description: "The phylogenetically oldest cerebellar region that processes vestibular input for balance control and vestibulo-ocular reflex stabilization.",
            functions: [
                "Balance",
                "Vestibular reflexes"
            ],
            children: [
                {
                    id: "flocculus",
                    name: "Flocculus",
                    level: "subregion",
                    category: "cerebellum",
                    description: "A lobule that stabilizes eye movements during head motion through the vestibulo-ocular reflex and smooth pursuit.",
                    functions: [
                        "Eye movement stabilization"
                    ],
                    children: [],
                    position3D: [
                        0.06,
                        -0.36,
                        -0.38
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-flocculus",
                        collection: "balance_system",
                        role: "Oculomotor Stabilizer",
                        description: "Computes eye movement corrections for vestibular and smooth pursuit stabilization.",
                        fields: [
                            {
                                name: "head_velocity",
                                type: "vector<f32>",
                                description: "Angular head velocity from vestibular input"
                            },
                            {
                                name: "retinal_slip",
                                type: "f32",
                                description: "Retinal image motion during head movement"
                            },
                            {
                                name: "vor_gain",
                                type: "f32",
                                description: "VOR gain adjustment for current conditions"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "schema-balance-system",
                            "schema-inhibitory-gate"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "vestibular-nuclei",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Vestibular input"
                        },
                        {
                            targetId: "vestibulocerebellum",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Regional integration"
                        }
                    ]
                },
                {
                    id: "nodulus",
                    name: "Nodulus",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The midline nodule that processes head position and orientation for spatial awareness and balance.",
                    functions: [
                        "Head position sensing"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.36,
                        -0.39
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-nodulus",
                        collection: "balance_system",
                        role: "Head Position Integrator",
                        description: "Integrates vestibular and proprioceptive input for head orientation awareness.",
                        fields: [
                            {
                                name: "head_orientation",
                                type: "vector<f32>",
                                description: "3D head orientation quaternion"
                            },
                            {
                                name: "linear_acceleration",
                                type: "vector<f32>",
                                description: "Linear acceleration from otoliths"
                            },
                            {
                                name: "gravity_vector",
                                type: "vector<f32>",
                                description: "Estimated gravity direction"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "schema-balance-system",
                            "schema-correction-output"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "vestibular-nuclei",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Vestibular input"
                        },
                        {
                            targetId: "vestibulocerebellum",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Regional integration"
                        }
                    ]
                }
            ],
            position3D: [
                0.03,
                -0.36,
                -0.37
            ],
            scale3D: [
                0.18,
                0.12,
                0.15
            ],
            color: "#a855f7",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-balance-system",
                collection: "balance_system",
                role: "Equilibrium Processor",
                description: "Processes vestibular and proprioceptive input to maintain postural balance and stabilize gaze.",
                fields: [
                    {
                        name: "vestibular_input",
                        type: "vector<f32>",
                        description: "Raw vestibular canal and otolith signals"
                    },
                    {
                        name: "balance_error",
                        type: "f32",
                        description: "Deviation from stable equilibrium"
                    },
                    {
                        name: "compensation_vector",
                        type: "vector<f32>",
                        description: "Postural correction command"
                    },
                    {
                        name: "gain_modulation",
                        type: "f32",
                        description: "Context-dependent reflex gain"
                    }
                ],
                activationState: 0.55,
                linkedModules: [
                    "schema-error-correction",
                    "schema-correction-output"
                ],
                category: "cerebellum"
            },
            connections: [
                {
                    targetId: "brainstem",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Vestibular nuclei relay"
                },
                {
                    targetId: "fastigial-nucleus",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Balance output to fastigial"
                }
            ]
        },
        // ───────────────────────── DEEP CEREBELLAR NUCLEI ─────────────────────────
        {
            id: "deep-cerebellar-nuclei",
            name: "Deep Cerebellar Nuclei",
            level: "region",
            category: "cerebellum",
            description: "The output nuclei of the cerebellum that receive Purkinje cell inhibition and relay cerebellar computations to the brainstem, thalamus, and cortex.",
            functions: [
                "Cerebellar output relay",
                "Motor correction dispatch"
            ],
            children: [
                {
                    id: "dentate-nucleus",
                    name: "Dentate Nucleus",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The largest deep cerebellar nucleus, receiving input from the lateral cerebellar cortex and outputting motor planning signals to the thalamus and cortex.",
                    functions: [
                        "Motor planning output"
                    ],
                    children: [],
                    position3D: [
                        0.08,
                        -0.4,
                        -0.36
                    ],
                    color: "#6d28d9",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-dentate-nucleus",
                        collection: "correction_output",
                        role: "Motor Plan Output Relay",
                        description: "Relays disinhibited cerebellar motor planning signals to thalamus and cortex.",
                        fields: [
                            {
                                name: "output_vector",
                                type: "vector<f32>",
                                description: "Corrected motor plan signal"
                            },
                            {
                                name: "disinhibition_level",
                                type: "f32",
                                description: "Degree of Purkinje inhibition release"
                            },
                            {
                                name: "target_region",
                                type: "string",
                                description: "Thalamic or cortical target identifier"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "schema-correction-output",
                            "schema-movement-planning"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "thalamus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Thalamocortical relay"
                        },
                        {
                            targetId: "red-nucleus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Rubrospinal input"
                        }
                    ]
                },
                {
                    id: "interposed-nuclei",
                    name: "Interposed Nuclei",
                    level: "subregion",
                    category: "cerebellum",
                    description: "Comprising the emboliform and globose nuclei, they receive from the intermediate zone and adjust limb movement via the red nucleus and thalamus.",
                    functions: [
                        "Limb movement adjustment"
                    ],
                    children: [],
                    position3D: [
                        0.04,
                        -0.42,
                        -0.35
                    ],
                    color: "#6d28d9",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-interposed-nuclei",
                        collection: "correction_output",
                        role: "Limb Correction Relay",
                        description: "Relays limb adjustment signals to red nucleus and thalamus.",
                        fields: [
                            {
                                name: "limb_correction",
                                type: "vector<f32>",
                                description: "Computed limb trajectory correction"
                            },
                            {
                                name: "output_strength",
                                type: "f32",
                                description: "Magnitude of correction signal"
                            },
                            {
                                name: "limb_id",
                                type: "u8",
                                description: "Target limb identifier"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "schema-correction-output",
                            "schema-execution-monitor"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "red-nucleus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Rubrospinal relay"
                        },
                        {
                            targetId: "thalamus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Thalamocortical relay"
                        }
                    ]
                },
                {
                    id: "fastigial-nucleus",
                    name: "Fastigial Nucleus",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The most medial deep nucleus, receiving from the vermis and vestibulocerebellum, and outputting balance and eye movement commands to vestibular and reticular nuclei.",
                    functions: [
                        "Balance output",
                        "Eye movement output"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.42,
                        -0.36
                    ],
                    color: "#6d28d9",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-fastigial-nucleus",
                        collection: "correction_output",
                        role: "Balance-Eye Output Relay",
                        description: "Relays postural and oculomotor correction signals to brainstem nuclei.",
                        fields: [
                            {
                                name: "postural_correction",
                                type: "vector<f32>",
                                description: "Postural adjustment command"
                            },
                            {
                                name: "eye_correction",
                                type: "vector<f32>",
                                description: "Eye movement correction vector"
                            },
                            {
                                name: "vestibular_target",
                                type: "string",
                                description: "Target vestibular nucleus identifier"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "schema-correction-output",
                            "schema-balance-system"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "vestibular-nuclei",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Vestibulospinal output"
                        },
                        {
                            targetId: "reticular-formation",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Reticulospinal output"
                        }
                    ]
                }
            ],
            position3D: [
                0.04,
                -0.41,
                -0.36
            ],
            scale3D: [
                0.2,
                0.2,
                0.18
            ],
            color: "#6d28d9",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-correction-output",
                collection: "correction_output",
                role: "Adjusted Signal Dispatcher",
                description: "Receives disinhibited signals from Purkinje layer and dispatches corrected motor commands to downstream targets.",
                fields: [
                    {
                        name: "output_vector",
                        type: "vector<f32>",
                        description: "Corrected motor output embedding"
                    },
                    {
                        name: "target_channel",
                        type: "string",
                        description: "Downstream target identifier"
                    },
                    {
                        name: "timestamp",
                        type: "u64",
                        description: "Time of output dispatch"
                    }
                ],
                activationState: 0.55,
                linkedModules: [
                    "schema-error-correction",
                    "schema-inhibitory-gate"
                ],
                category: "cerebellum"
            },
            connections: [
                {
                    targetId: "thalamus",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Thalamocortical pathway"
                },
                {
                    targetId: "red-nucleus",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Rubrospinal pathway"
                },
                {
                    targetId: "brainstem",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Brainstem relay"
                }
            ]
        },
        // ───────────────────────── CEREBELLAR CORTEX LAYERS ─────────────────────────
        {
            id: "cerebellar-cortex-layers",
            name: "Cerebellar Cortex Layers",
            level: "region",
            category: "cerebellum",
            description: "The three-layered cortical sheet that processes mossy and climbing fiber input to generate precise inhibitory output via Purkinje cells.",
            functions: [
                "Cerebellar cortical processing",
                "Inhibitory output computation"
            ],
            children: [
                {
                    id: "purkinje-cell-layer",
                    name: "Purkinje Cell Layer",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The single layer of Purkinje cells that form the primary output of the cerebellar cortex, providing GABAergic inhibition to the deep nuclei.",
                    functions: [
                        "Primary output neurons",
                        "Inhibitory output to deep nuclei"
                    ],
                    children: [],
                    position3D: [
                        0.03,
                        -0.4,
                        -0.37
                    ],
                    color: "#7c3aed",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-inhibitory-gate",
                        collection: "inhibitory_gate",
                        role: "Precision Inhibition Filter",
                        description: "Filters and gates deep nuclear output through precisely timed GABAergic inhibition, enabling error-corrected signal passthrough.",
                        fields: [
                            {
                                name: "inhibition_level",
                                type: "f32",
                                description: "Current Purkinje inhibitory output strength"
                            },
                            {
                                name: "timing_window_ms",
                                type: "f32",
                                description: "Temporal window of inhibition"
                            },
                            {
                                name: "learning_modulation",
                                type: "f32",
                                description: "Modulation from climbing fiber error input"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "schema-error-correction",
                            "schema-correction-output"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "dentate-nucleus",
                            type: "inhibitory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "GABAergic inhibition"
                        },
                        {
                            targetId: "interposed-nuclei",
                            type: "inhibitory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "GABAergic inhibition"
                        },
                        {
                            targetId: "fastigial-nucleus",
                            type: "inhibitory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "GABAergic inhibition"
                        }
                    ]
                },
                {
                    id: "granule-cell-layer",
                    name: "Granule Cell Layer",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The innermost layer containing the most numerous neurons in the brain; receives mossy fiber input and projects parallel fibers to the molecular layer.",
                    functions: [
                        "Mossy fiber input processing",
                        "Parallel fiber output"
                    ],
                    children: [],
                    position3D: [
                        0.02,
                        -0.41,
                        -0.38
                    ],
                    color: "#9333ea",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-granule-layer",
                        collection: "inhibitory_gate",
                        role: "Input Expansion Processor",
                        description: "Expands sparse mossy fiber input into dense parallel fiber representations for Purkinje processing.",
                        fields: [
                            {
                                name: "mossy_input_rate",
                                type: "f32",
                                description: "Incoming mossy fiber activity rate"
                            },
                            {
                                name: "parallel_fiber_activity",
                                type: "vector<f32>",
                                description: "Encoded parallel fiber output pattern"
                            },
                            {
                                name: "expansion_factor",
                                type: "u32",
                                description: "Granule cell expansion ratio"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "schema-inhibitory-gate",
                            "schema-execution-monitor"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "purkinje-cell-layer",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Parallel fiber input"
                        },
                        {
                            targetId: "molecular-layer",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Parallel fiber output"
                        }
                    ]
                },
                {
                    id: "molecular-layer",
                    name: "Molecular Layer",
                    level: "subregion",
                    category: "cerebellum",
                    description: "The outermost layer containing parallel fibers, Purkinje dendritic trees, and stellate/basket interneurons for lateral inhibition and signal integration.",
                    functions: [
                        "Parallel fiber processing",
                        "Dendritic integration"
                    ],
                    children: [],
                    position3D: [
                        0.02,
                        -0.39,
                        -0.36
                    ],
                    color: "#a855f7",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-molecular-layer",
                        collection: "inhibitory_gate",
                        role: "Parallel Fiber Integrator",
                        description: "Integrates parallel fiber and climbing fiber input onto Purkinje dendrites for precise timing.",
                        fields: [
                            {
                                name: "parallel_fiber_input",
                                type: "vector<f32>",
                                description: "Aggregate parallel fiber activity"
                            },
                            {
                                name: "climbing_fiber_input",
                                type: "f32",
                                description: "Climbing fiber error signal magnitude"
                            },
                            {
                                name: "integration_threshold",
                                type: "f32",
                                description: "Purkinje activation threshold"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "schema-inhibitory-gate",
                            "schema-error-correction"
                        ],
                        category: "cerebellum"
                    },
                    connections: [
                        {
                            targetId: "purkinje-cell-layer",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Dendritic input"
                        },
                        {
                            targetId: "inferior-olivary-nucleus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Receives climbing fibers"
                        }
                    ]
                }
            ],
            position3D: [
                0.02,
                -0.4,
                -0.37
            ],
            scale3D: [
                0.25,
                0.2,
                0.25
            ],
            color: "#7c3aed",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-cerebellar-cortex",
                collection: "inhibitory_gate",
                role: "Cortical Processing Hub",
                description: "Three-layered cortical sheet that transforms mossy and climbing fiber input into Purkinje inhibitory output.",
                fields: [
                    {
                        name: "mossy_load",
                        type: "f32",
                        description: "Aggregate mossy fiber input level"
                    },
                    {
                        name: "climbing_fiber_rate",
                        type: "f32",
                        description: "Climbing fiber complex spike rate"
                    },
                    {
                        name: "purkinje_output",
                        type: "f32",
                        description: "Aggregate Purkinje inhibitory output"
                    }
                ],
                activationState: 0.55,
                linkedModules: [
                    "schema-inhibitory-gate",
                    "schema-correction-output",
                    "schema-error-correction"
                ],
                category: "cerebellum"
            },
            connections: [
                {
                    targetId: "purkinje-cell-layer",
                    type: "structural",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Contains Purkinje output"
                },
                {
                    targetId: "deep-cerebellar-nuclei",
                    type: "inhibitory",
                    strength: 0.7,
                    signalType: "chemical",
                    label: "Purkinje to nuclei"
                }
            ]
        }
    ],
    position3D: [
        0,
        -0.4,
        -0.35
    ],
    scale3D: [
        0.35,
        0.3,
        0.35
    ],
    color: "#8b5cf6",
    signalType: "electrical",
    schemaMapping: {
        id: "schema-error-correction",
        collection: "error_correction",
        role: "Prediction Error Calculator",
        description: "Compares predicted vs actual outcomes and generates correction signals",
        fields: [
            {
                name: "predicted_state",
                type: "vector<f32>",
                description: "Expected outcome embedding"
            },
            {
                name: "actual_state",
                type: "vector<f32>",
                description: "Observed outcome embedding"
            },
            {
                name: "error_magnitude",
                type: "f32",
                description: "Magnitude of prediction error"
            },
            {
                name: "correction_vector",
                type: "vector<f32>",
                description: "Computed adjustment signal"
            },
            {
                name: "timestamp",
                type: "u64",
                description: "Time of error computation"
            }
        ],
        activationState: 0.5,
        linkedModules: [
            "schema-movement-planning",
            "schema-execution-monitor",
            "schema-balance-system"
        ],
        category: "cerebellum"
    },
    connections: [
        {
            targetId: "brainstem",
            type: "excitatory",
            strength: 0.7,
            signalType: "electrical",
            label: "Cerebellar-brainstem relay"
        },
        {
            targetId: "primary-motor-cortex",
            type: "excitatory",
            strength: 0.6,
            signalType: "electrical",
            label: "Thalamocortical motor loop"
        },
        {
            targetId: "pons",
            type: "excitatory",
            strength: 0.65,
            signalType: "electrical",
            label: "Pontocerebellar input"
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/brainstem.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "brainstem",
    ()=>brainstem
]);
const brainstem = {
    id: "brainstem",
    name: "Brainstem",
    level: "system",
    category: "brainstem",
    description: "The brainstem connects the cerebrum and cerebellum to the spinal cord, housing nuclei that govern vital autonomic functions, cranial nerve relay, arousal, and motor/sensory pathway transmission.",
    functions: [
        "Relays motor and sensory signals between brain and body",
        "Regulates cardiac, respiratory, and vasomotor functions",
        "Controls sleep-wake arousal cycles",
        "Mediates cranial nerve reflexes",
        "Coordinates eye movements and auditory/visual reflexes"
    ],
    children: [
        // ───────────────────────── MIDBRAIN ─────────────────────────
        {
            id: "midbrain",
            name: "Midbrain (Mesencephalon)",
            level: "region",
            category: "brainstem",
            description: "The uppermost segment of the brainstem, responsible for visual and auditory reflex arcs, motor coordination, and dopaminergic modulation of reward and movement.",
            functions: [
                "Processes visual and auditory reflexes",
                "Produces dopamine for movement and reward circuits",
                "Coordinates motor signals via the red nucleus and cerebral peduncles",
                "Modulates pain perception and defensive behaviors"
            ],
            children: [
                {
                    id: "superior-colliculus",
                    name: "Superior Colliculus",
                    level: "subregion",
                    category: "brainstem",
                    description: "A layered structure in the dorsal midbrain that integrates visual, auditory, and somatosensory inputs to direct saccadic eye movements and orient the head toward stimuli.",
                    functions: [
                        "Directs saccadic eye movements toward visual targets",
                        "Coordinates eye-head orientation reflexes",
                        "Integrates multisensory spatial maps",
                        "Mediates visual grasp reflex in response to sudden stimuli"
                    ],
                    children: [],
                    position3D: [
                        0.08,
                        0.35,
                        -0.06
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-superior-colliculus",
                        collection: "reflex_engine",
                        role: "Saccade Command Generator",
                        description: "Transforms sensory salience into rapid gaze-shift commands.",
                        fields: [
                            {
                                name: "target_vector",
                                type: "float[2]",
                                description: "Horizontal and vertical gaze displacement angles"
                            },
                            {
                                name: "salience_score",
                                type: "float",
                                description: "Weighted importance of detected stimulus"
                            },
                            {
                                name: "latency_ms",
                                type: "uint16",
                                description: "Time from stimulus onset to saccade initiation"
                            },
                            {
                                name: "modality_source",
                                type: "enum",
                                description: "Sensory channel that triggered the reflex (visual, auditory, somatosensory)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "inferior-colliculus",
                            "frontal-eye-fields"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "inferior-colliculus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Audio-visual integration"
                        },
                        {
                            targetId: "cerebral-peduncles",
                            type: "excitatory",
                            strength: 0.4,
                            signalType: "electrical",
                            label: "Motor relay for gaze"
                        }
                    ]
                },
                {
                    id: "inferior-colliculus",
                    name: "Inferior Colliculus",
                    level: "subregion",
                    category: "brainstem",
                    description: "The principal auditory relay nucleus of the midbrain, integrating ascending auditory streams before projecting to the medial geniculate body of the thalamus.",
                    functions: [
                        "Relays and integrates ascending auditory information",
                        "Encodes sound localization cues",
                        "Mediates auditory startle reflex pathway",
                        "Processes temporal patterns of sound for speech perception"
                    ],
                    children: [],
                    position3D: [
                        -0.08,
                        0.32,
                        -0.06
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-inferior-colliculus",
                        collection: "reflex_engine",
                        role: "Auditory Relay Station",
                        description: "Aggregates tonotopic auditory streams and routes them to the thalamus for cortical processing.",
                        fields: [
                            {
                                name: "frequency_band",
                                type: "float[2]",
                                description: "Low and high bounds of the tonotopic channel in Hz"
                            },
                            {
                                name: "interaural_diff",
                                type: "float",
                                description: "Interaural time or level difference for localization"
                            },
                            {
                                name: "amplitude_envelope",
                                type: "float[]",
                                description: "Temporal amplitude contour of the incoming sound"
                            },
                            {
                                name: "startle_flag",
                                type: "boolean",
                                description: "Whether the stimulus exceeds the startle threshold"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "superior-colliculus",
                            "medial-geniculate"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "superior-colliculus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Audio-visual orientation"
                        }
                    ]
                },
                {
                    id: "substantia-nigra",
                    name: "Substantia Nigra",
                    level: "subregion",
                    category: "brainstem",
                    description: "A darkly pigmented midbrain nucleus whose pars compacta produces dopamine essential for voluntary movement initiation, while the pars reticulata provides GABAergic output to the thalamus.",
                    functions: [
                        "Produces dopamine for the nigrostriatal pathway",
                        "Facilitates initiation and smooth execution of voluntary movement",
                        "Modulates basal ganglia output via GABAergic projections",
                        "Degenerates in Parkinson's disease leading to motor deficits"
                    ],
                    children: [],
                    position3D: [
                        0.06,
                        0.28,
                        0.04
                    ],
                    color: "#ec4899",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-substantia-nigra",
                        collection: "dopamine_regulation",
                        role: "Reward Signal Generator",
                        description: "Generates tonic and phasic dopamine signals that gate movement initiation and encode reward prediction errors.",
                        fields: [
                            {
                                name: "dopamine_tonic",
                                type: "float",
                                description: "Baseline tonic dopamine concentration in the striatum"
                            },
                            {
                                name: "dopamine_phasic",
                                type: "float",
                                description: "Burst or dip magnitude in response to reward prediction error"
                            },
                            {
                                name: "gaba_output",
                                type: "float",
                                description: "Inhibitory output level from pars reticulata to thalamus"
                            },
                            {
                                name: "neuromelanin_density",
                                type: "float",
                                description: "Proxy for dopaminergic neuron health and count"
                            },
                            {
                                name: "movement_gate",
                                type: "boolean",
                                description: "Whether sufficient dopamine is present to permit movement initiation"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "ventral-tegmental-area",
                            "striatum",
                            "thalamus"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "ventral-tegmental-area",
                            type: "modulatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "Dopaminergic cross-talk"
                        },
                        {
                            targetId: "red-nucleus",
                            type: "excitatory",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Motor coordination input"
                        }
                    ]
                },
                {
                    id: "red-nucleus",
                    name: "Red Nucleus",
                    level: "subregion",
                    category: "brainstem",
                    description: "A paired midbrain nucleus involved in motor coordination, giving rise to the rubrospinal tract that influences limb flexor muscle tone and cerebellar-cortical relay.",
                    functions: [
                        "Coordinates limb motor control via the rubrospinal tract",
                        "Relays cerebellar output toward the thalamus and motor cortex",
                        "Modulates flexor muscle tone",
                        "Supplements corticospinal motor commands"
                    ],
                    children: [],
                    position3D: [
                        -0.04,
                        0.3,
                        0.02
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-red-nucleus",
                        collection: "reflex_engine",
                        role: "Motor Coordination Relay",
                        description: "Integrates cerebellar error corrections with descending motor commands for limb control.",
                        fields: [
                            {
                                name: "rubrospinal_drive",
                                type: "float",
                                description: "Excitatory drive sent down the rubrospinal tract"
                            },
                            {
                                name: "cerebellar_error",
                                type: "float",
                                description: "Error correction signal received from the cerebellum"
                            },
                            {
                                name: "flexor_bias",
                                type: "float",
                                description: "Degree of flexor versus extensor tone modulation"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "cerebellum",
                            "motor-cortex",
                            "substantia-nigra"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "substantia-nigra",
                            type: "excitatory",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Motor feedback"
                        },
                        {
                            targetId: "inferior-olivary-nucleus",
                            type: "excitatory",
                            strength: 0.4,
                            signalType: "electrical",
                            label: "Olivo-cerebellar relay"
                        }
                    ]
                },
                {
                    id: "ventral-tegmental-area",
                    name: "Ventral Tegmental Area",
                    level: "subregion",
                    category: "brainstem",
                    description: "A dopaminergic nucleus in the ventral midbrain that projects to the prefrontal cortex and nucleus accumbens, forming the mesolimbic and mesocortical reward pathways.",
                    functions: [
                        "Produces dopamine for the mesolimbic reward pathway",
                        "Encodes reward prediction errors that drive learning",
                        "Modulates motivation, pleasure, and goal-directed behavior",
                        "Projects to prefrontal cortex supporting working memory"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        0.26,
                        0.04
                    ],
                    color: "#ec4899",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-vta",
                        collection: "motivation_signals",
                        role: "Drive State Modulator",
                        description: "Broadcasts dopaminergic motivation and reward-prediction signals to limbic and cortical targets.",
                        fields: [
                            {
                                name: "reward_prediction_error",
                                type: "float",
                                description: "Signed difference between expected and received reward"
                            },
                            {
                                name: "motivation_level",
                                type: "float",
                                description: "Tonic dopamine proxy for current motivational drive"
                            },
                            {
                                name: "target_region",
                                type: "enum",
                                description: "Primary projection target (accumbens, prefrontal, amygdala)"
                            },
                            {
                                name: "burst_frequency",
                                type: "float",
                                description: "Phasic firing rate during reward-related events in Hz"
                            },
                            {
                                name: "salience_tag",
                                type: "boolean",
                                description: "Whether the current stimulus is tagged as motivationally salient"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "substantia-nigra",
                            "nucleus-accumbens",
                            "prefrontal-cortex"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "substantia-nigra",
                            type: "modulatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "Dopaminergic cross-talk"
                        },
                        {
                            targetId: "locus-coeruleus",
                            type: "modulatory",
                            strength: 0.3,
                            signalType: "chemical",
                            label: "Arousal-reward interaction"
                        }
                    ]
                },
                {
                    id: "periaqueductal-gray",
                    name: "Periaqueductal Gray",
                    level: "subregion",
                    category: "brainstem",
                    description: "A column of gray matter surrounding the cerebral aqueduct that orchestrates endogenous analgesia via opioid release and coordinates defensive behaviors such as fight, flight, and freezing.",
                    functions: [
                        "Activates descending pain inhibition via endogenous opioids",
                        "Coordinates defensive behaviors (fight, flight, freeze)",
                        "Modulates vocalization and emotional expression",
                        "Regulates autonomic responses to threat"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        0.33,
                        -0.04
                    ],
                    color: "#f9a8d4",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-pag",
                        collection: "reflex_engine",
                        role: "Pain-Defense Coordinator",
                        description: "Integrates threat assessment with endogenous analgesia and stereotyped defensive motor programs.",
                        fields: [
                            {
                                name: "opioid_release",
                                type: "float",
                                description: "Endogenous opioid concentration modulating pain threshold"
                            },
                            {
                                name: "threat_level",
                                type: "float",
                                description: "Assessed threat intensity driving behavioral mode selection"
                            },
                            {
                                name: "defense_mode",
                                type: "enum",
                                description: "Active behavioral program (fight, flight, freeze, tonic immobility)"
                            },
                            {
                                name: "autonomic_drive",
                                type: "float",
                                description: "Sympathetic activation level paired with the defense response"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "amygdala",
                            "hypothalamus",
                            "raphe-nuclei"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "raphe-nuclei",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "chemical",
                            label: "Serotonergic pain modulation"
                        },
                        {
                            targetId: "ventral-tegmental-area",
                            type: "modulatory",
                            strength: 0.3,
                            signalType: "chemical",
                            label: "Aversion signaling"
                        }
                    ]
                },
                {
                    id: "cerebral-peduncles",
                    name: "Cerebral Peduncles",
                    level: "subregion",
                    category: "brainstem",
                    description: "Massive fiber bundles on the ventral midbrain surface carrying descending corticospinal, corticobulbar, and corticopontine motor tracts from the cerebral cortex.",
                    functions: [
                        "Transmit corticospinal motor commands to the spinal cord",
                        "Carry corticobulbar fibers to cranial nerve motor nuclei",
                        "Route corticopontine fibers toward the cerebellum via pontine nuclei",
                        "Serve as the primary descending motor highway through the midbrain"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        0.3,
                        0.08
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-cerebral-peduncles",
                        collection: "reflex_engine",
                        role: "Descending Motor Highway",
                        description: "Bundles corticofugal fiber tracts transmitting voluntary motor commands through the midbrain.",
                        fields: [
                            {
                                name: "corticospinal_load",
                                type: "float",
                                description: "Aggregate firing rate of corticospinal tract fibers"
                            },
                            {
                                name: "corticobulbar_load",
                                type: "float",
                                description: "Aggregate firing rate of corticobulbar tract fibers"
                            },
                            {
                                name: "corticopontine_load",
                                type: "float",
                                description: "Signal volume routed to pontine nuclei for cerebellar relay"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "motor-cortex",
                            "pontine-nuclei",
                            "pyramidal-decussation"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "pontine-nuclei",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Corticopontine projection"
                        },
                        {
                            targetId: "pyramidal-decussation",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Descending motor tract"
                        }
                    ]
                }
            ],
            position3D: [
                0,
                0.3,
                0
            ],
            scale3D: [
                0.3,
                0.25,
                0.25
            ],
            color: "#ec4899",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-midbrain",
                collection: "reflex_engine",
                role: "Automatic Response Router",
                description: "Routes sensory stimuli to rapid reflex arcs while modulating dopaminergic tone for movement and reward.",
                fields: [
                    {
                        name: "reflex_priority",
                        type: "uint8",
                        description: "Priority queue rank of the currently active reflex arc"
                    },
                    {
                        name: "dopamine_tone",
                        type: "float",
                        description: "Aggregate dopaminergic output level from midbrain nuclei"
                    },
                    {
                        name: "sensory_salience",
                        type: "float",
                        description: "Composite salience score across visual and auditory channels"
                    },
                    {
                        name: "motor_readiness",
                        type: "float",
                        description: "Pre-motor activation level gating descending commands"
                    }
                ],
                activationState: 0.6,
                linkedModules: [
                    "pons",
                    "thalamus",
                    "basal-ganglia"
                ],
                category: "brainstem"
            },
            connections: [
                {
                    targetId: "pons",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Descending relay to pons"
                },
                {
                    targetId: "medulla-oblongata",
                    type: "excitatory",
                    strength: 0.5,
                    signalType: "electrical",
                    label: "Descending relay to medulla"
                }
            ]
        },
        // ───────────────────────── PONS ─────────────────────────
        {
            id: "pons",
            name: "Pons",
            level: "region",
            category: "brainstem",
            description: "The middle segment of the brainstem serving as a major relay bridge between the cerebral cortex and cerebellum, while housing nuclei for breathing modulation, arousal, and cranial nerve function.",
            functions: [
                "Relays cortical motor information to the cerebellum via pontine nuclei",
                "Fine-tunes breathing rhythm through pneumotaxic and apneustic centers",
                "Modulates arousal and attention via the locus coeruleus",
                "Controls facial expression, jaw movement, and eye abduction via cranial nerve nuclei"
            ],
            children: [
                {
                    id: "pontine-nuclei",
                    name: "Pontine Nuclei",
                    level: "subregion",
                    category: "brainstem",
                    description: "Scattered cell clusters in the ventral pons that receive corticopontine projections and relay them as mossy fibers to the contralateral cerebellar cortex.",
                    functions: [
                        "Relay cortical motor plans to the cerebellum",
                        "Transform cortical signals into mossy fiber input for cerebellar processing",
                        "Support motor learning and error correction loops",
                        "Bridge voluntary planning with cerebellar timing calibration"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        0.02,
                        0.06
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-pontine-nuclei",
                        collection: "relay_processors",
                        role: "Cortex-Cerebellum Bridge",
                        description: "Translates cortical motor intentions into cerebellar-compatible mossy fiber signals for timing calibration.",
                        fields: [
                            {
                                name: "cortical_input_rate",
                                type: "float",
                                description: "Aggregate firing rate of incoming corticopontine fibers"
                            },
                            {
                                name: "mossy_fiber_output",
                                type: "float",
                                description: "Transformed output rate sent to cerebellar granule cells"
                            },
                            {
                                name: "laterality",
                                type: "enum",
                                description: "Contralateral target hemisphere in the cerebellum"
                            },
                            {
                                name: "motor_context",
                                type: "string",
                                description: "Encoded motor plan context being relayed"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "cerebellum",
                            "cerebral-peduncles",
                            "motor-cortex"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "cerebral-peduncles",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Receives corticopontine fibers"
                        }
                    ]
                },
                {
                    id: "pneumotaxic-center",
                    name: "Pneumotaxic Center",
                    level: "subregion",
                    category: "brainstem",
                    description: "A group of neurons in the upper pons that cyclically inhibits the apneustic center and dorsal respiratory group to fine-tune breathing rate and tidal volume.",
                    functions: [
                        "Limits inspiration duration to regulate breathing rate",
                        "Fine-tunes tidal volume by modulating inspiratory cutoff",
                        "Coordinates with the apneustic center for smooth respiratory rhythm",
                        "Adjusts breathing pattern during speech and swallowing"
                    ],
                    children: [],
                    position3D: [
                        0.04,
                        0.06,
                        -0.02
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-pneumotaxic",
                        collection: "relay_processors",
                        role: "Breathing Rhythm Fine-Tuner",
                        description: "Modulates inspiratory cutoff timing to regulate respiratory rate and depth.",
                        fields: [
                            {
                                name: "inhibition_strength",
                                type: "float",
                                description: "Inhibitory drive sent to the apneustic center"
                            },
                            {
                                name: "target_rate_bpm",
                                type: "float",
                                description: "Desired respiratory rate in breaths per minute"
                            },
                            {
                                name: "tidal_volume_mod",
                                type: "float",
                                description: "Scaling factor applied to tidal volume"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "apneustic-center",
                            "dorsal-respiratory-group",
                            "respiratory-center"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "apneustic-center",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Limits inspiration duration"
                        },
                        {
                            targetId: "respiratory-center",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Rhythm coordination"
                        }
                    ]
                },
                {
                    id: "apneustic-center",
                    name: "Apneustic Center",
                    level: "subregion",
                    category: "brainstem",
                    description: "A pontine region that sends tonic excitatory signals to the inspiratory neurons of the medulla, prolonging inspiration until inhibited by the pneumotaxic center.",
                    functions: [
                        "Provides tonic excitation to inspiratory neurons",
                        "Prolongs inspiration duration when uninhibited",
                        "Works in opposition to the pneumotaxic center for rhythm balance",
                        "Ensures deep inspiration during high oxygen demand"
                    ],
                    children: [],
                    position3D: [
                        -0.04,
                        0.04,
                        -0.02
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-apneustic",
                        collection: "relay_processors",
                        role: "Inspiration Duration Controller",
                        description: "Sustains inspiratory neuron firing to ensure adequate lung inflation before pneumotaxic cutoff.",
                        fields: [
                            {
                                name: "excitatory_drive",
                                type: "float",
                                description: "Tonic excitatory output to medullary inspiratory neurons"
                            },
                            {
                                name: "inspiration_duration_ms",
                                type: "uint32",
                                description: "Current inspiration phase duration in milliseconds"
                            },
                            {
                                name: "pneumotaxic_inhibition",
                                type: "float",
                                description: "Incoming inhibitory strength from the pneumotaxic center"
                            }
                        ],
                        activationState: 0.45,
                        linkedModules: [
                            "pneumotaxic-center",
                            "dorsal-respiratory-group"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "dorsal-respiratory-group",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Prolongs inspiration"
                        },
                        {
                            targetId: "pneumotaxic-center",
                            type: "excitatory",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Feedback to fine-tuner"
                        }
                    ]
                },
                {
                    id: "locus-coeruleus",
                    name: "Locus Coeruleus",
                    level: "subregion",
                    category: "brainstem",
                    description: "A small, densely packed noradrenergic nucleus in the dorsal pons that serves as the brain's primary source of norepinephrine, modulating alertness, attention, and stress responses.",
                    functions: [
                        "Produces norepinephrine for widespread cortical arousal",
                        "Modulates attention and vigilance state",
                        "Amplifies sensory processing during alertness",
                        "Mediates stress-induced arousal and anxiety responses"
                    ],
                    children: [],
                    position3D: [
                        0.02,
                        0.04,
                        -0.05
                    ],
                    color: "#ec4899",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-locus-coeruleus",
                        collection: "alertness_state",
                        role: "System Wakefulness Controller",
                        description: "Broadcasts noradrenergic signals to modulate global cortical arousal, attentional gain, and stress reactivity.",
                        fields: [
                            {
                                name: "norepinephrine_level",
                                type: "float",
                                description: "Current norepinephrine output concentration"
                            },
                            {
                                name: "arousal_state",
                                type: "enum",
                                description: "Global arousal level (sleep, drowsy, alert, hypervigilant)"
                            },
                            {
                                name: "attention_gain",
                                type: "float",
                                description: "Multiplicative gain applied to sensory cortical responses"
                            },
                            {
                                name: "stress_reactivity",
                                type: "float",
                                description: "Sensitivity to stress-related CRF input from the amygdala"
                            },
                            {
                                name: "tonic_mode",
                                type: "boolean",
                                description: "Whether firing is in tonic (exploratory) versus phasic (focused) mode"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "raphe-nuclei",
                            "ventral-tegmental-area",
                            "prefrontal-cortex",
                            "amygdala"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "raphe-nuclei",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "chemical",
                            label: "NE-serotonin interaction"
                        },
                        {
                            targetId: "ventral-tegmental-area",
                            type: "modulatory",
                            strength: 0.3,
                            signalType: "chemical",
                            label: "Arousal-reward coupling"
                        }
                    ]
                },
                {
                    id: "raphe-nuclei",
                    name: "Raphe Nuclei",
                    level: "subregion",
                    category: "brainstem",
                    description: "A cluster of serotonergic nuclei along the midline of the brainstem whose widespread projections regulate mood, sleep-wake transitions, appetite, and pain sensitivity.",
                    functions: [
                        "Produces serotonin for mood and emotional regulation",
                        "Modulates sleep-wake transitions and circadian rhythmicity",
                        "Regulates appetite and feeding behavior",
                        "Contributes to descending pain inhibition pathways"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        0.0,
                        -0.03
                    ],
                    color: "#ec4899",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-raphe-nuclei",
                        collection: "mood_regulation",
                        role: "Baseline State Modulator",
                        description: "Sets serotonergic baseline tone that modulates mood, sleep propensity, appetite, and pain thresholds across the neuraxis.",
                        fields: [
                            {
                                name: "serotonin_tone",
                                type: "float",
                                description: "Baseline serotonin output level"
                            },
                            {
                                name: "mood_valence",
                                type: "float",
                                description: "Signed mood state from negative to positive"
                            },
                            {
                                name: "sleep_propensity",
                                type: "float",
                                description: "Drive toward sleep onset based on serotonergic state"
                            },
                            {
                                name: "pain_threshold_mod",
                                type: "float",
                                description: "Modulation of descending pain inhibition strength"
                            },
                            {
                                name: "appetite_signal",
                                type: "float",
                                description: "Serotonergic influence on satiety circuits"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "locus-coeruleus",
                            "periaqueductal-gray",
                            "hypothalamus"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "locus-coeruleus",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "chemical",
                            label: "Serotonin-NE balance"
                        },
                        {
                            targetId: "periaqueductal-gray",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "chemical",
                            label: "Pain modulation input"
                        }
                    ]
                },
                {
                    id: "trigeminal-motor-nucleus",
                    name: "Trigeminal Motor Nucleus",
                    level: "subregion",
                    category: "brainstem",
                    description: "The motor nucleus of cranial nerve V located in the mid-pons, containing motor neurons that innervate the muscles of mastication for jaw opening, closing, and lateral movement.",
                    functions: [
                        "Innervates muscles of mastication for chewing",
                        "Controls jaw opening and closing movements",
                        "Mediates jaw-jerk reflex",
                        "Coordinates bite force during feeding"
                    ],
                    children: [],
                    position3D: [
                        0.06,
                        0.02,
                        0.0
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-trigeminal-motor",
                        collection: "relay_processors",
                        role: "Jaw Motor Controller",
                        description: "Drives masticatory muscle contractions for chewing, biting, and jaw reflex arcs.",
                        fields: [
                            {
                                name: "bite_force",
                                type: "float",
                                description: "Commanded bite force in newtons"
                            },
                            {
                                name: "jaw_angle",
                                type: "float",
                                description: "Current jaw opening angle in degrees"
                            },
                            {
                                name: "chewing_rhythm",
                                type: "float",
                                description: "Rhythmic chewing cycle frequency in Hz"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "facial-motor-nucleus",
                            "nucleus-ambiguus"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "facial-motor-nucleus",
                            type: "excitatory",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Jaw-face coordination"
                        },
                        {
                            targetId: "nucleus-ambiguus",
                            type: "excitatory",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Chewing-swallowing sequence"
                        }
                    ]
                },
                {
                    id: "facial-motor-nucleus",
                    name: "Facial Motor Nucleus",
                    level: "subregion",
                    category: "brainstem",
                    description: "The motor nucleus of cranial nerve VII in the caudal pons, innervating the muscles of facial expression and mediating the corneal blink reflex.",
                    functions: [
                        "Innervates muscles of facial expression",
                        "Mediates the corneal (blink) reflex",
                        "Controls orbicularis oculi for eye closure",
                        "Enables nonverbal emotional communication through facial movement"
                    ],
                    children: [],
                    position3D: [
                        -0.06,
                        -0.02,
                        0.02
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-facial-motor",
                        collection: "relay_processors",
                        role: "Facial Expression Driver",
                        description: "Translates emotional and voluntary motor commands into facial muscle activation patterns.",
                        fields: [
                            {
                                name: "expression_vector",
                                type: "float[6]",
                                description: "Activation levels for major facial action units"
                            },
                            {
                                name: "blink_reflex",
                                type: "boolean",
                                description: "Whether the corneal blink reflex is active"
                            },
                            {
                                name: "laterality",
                                type: "enum",
                                description: "Upper vs lower face innervation pattern (bilateral vs contralateral)"
                            }
                        ],
                        activationState: 0.45,
                        linkedModules: [
                            "trigeminal-motor-nucleus",
                            "nucleus-ambiguus"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "trigeminal-motor-nucleus",
                            type: "excitatory",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Face-jaw coordination"
                        }
                    ]
                },
                {
                    id: "abducens-nucleus",
                    name: "Abducens Nucleus",
                    level: "subregion",
                    category: "brainstem",
                    description: "The motor nucleus of cranial nerve VI at the pontomedullary junction, controlling the lateral rectus muscle to abduct the eye and coordinating conjugate horizontal gaze via the MLF.",
                    functions: [
                        "Innervates the lateral rectus for eye abduction",
                        "Coordinates conjugate horizontal gaze through the medial longitudinal fasciculus",
                        "Participates in the vestibulo-ocular reflex",
                        "Integrates signals for smooth pursuit eye movements"
                    ],
                    children: [],
                    position3D: [
                        0.04,
                        -0.04,
                        -0.02
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-abducens",
                        collection: "relay_processors",
                        role: "Horizontal Gaze Controller",
                        description: "Commands lateral rectus contraction and coordinates conjugate gaze via internuclear projections.",
                        fields: [
                            {
                                name: "abduction_drive",
                                type: "float",
                                description: "Motor neuron firing rate driving lateral rectus contraction"
                            },
                            {
                                name: "conjugate_signal",
                                type: "float",
                                description: "Internuclear signal sent via MLF for contralateral medial rectus"
                            },
                            {
                                name: "vor_input",
                                type: "float",
                                description: "Vestibulo-ocular reflex drive from vestibular nuclei"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "superior-colliculus",
                            "vestibular-nuclei"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "superior-colliculus",
                            type: "excitatory",
                            strength: 0.4,
                            signalType: "electrical",
                            label: "Saccade command input"
                        }
                    ]
                }
            ],
            position3D: [
                0,
                0,
                0
            ],
            scale3D: [
                0.35,
                0.2,
                0.3
            ],
            color: "#ec4899",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-pons",
                collection: "relay_processors",
                role: "Cross-System Signal Bridge",
                description: "Bridges cortical motor output to the cerebellum, houses respiratory modulators, and maintains arousal through aminergic nuclei.",
                fields: [
                    {
                        name: "cortical_relay_load",
                        type: "float",
                        description: "Throughput of corticopontine relay traffic"
                    },
                    {
                        name: "respiratory_modulation",
                        type: "float",
                        description: "Net modulatory effect on breathing rhythm"
                    },
                    {
                        name: "arousal_tone",
                        type: "float",
                        description: "Combined noradrenergic and serotonergic arousal signal"
                    },
                    {
                        name: "cranial_nerve_activity",
                        type: "float",
                        description: "Aggregate cranial nerve motor output"
                    }
                ],
                activationState: 0.55,
                linkedModules: [
                    "midbrain",
                    "medulla-oblongata",
                    "cerebellum"
                ],
                category: "brainstem"
            },
            connections: [
                {
                    targetId: "midbrain",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Ascending relay"
                },
                {
                    targetId: "medulla-oblongata",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Descending relay"
                }
            ]
        },
        // ───────────────────────── MEDULLA OBLONGATA ─────────────────────────
        {
            id: "medulla-oblongata",
            name: "Medulla Oblongata",
            level: "region",
            category: "brainstem",
            description: "The most caudal brainstem segment containing vital autonomic control centers for cardiovascular, respiratory, and digestive function, as well as sensory relay nuclei and the pyramidal decussation.",
            functions: [
                "Regulates heart rate, blood pressure, and vascular tone",
                "Generates and modulates breathing rhythm",
                "Processes visceral sensory information from internal organs",
                "Coordinates swallowing, vomiting, and vocalization reflexes",
                "Contains the pyramidal decussation where motor tracts cross"
            ],
            children: [
                {
                    id: "cardiac-control-center",
                    name: "Cardiac Control Center",
                    level: "subregion",
                    category: "autonomic",
                    description: "A medullary network that integrates baroreceptor and chemoreceptor input to modulate heart rate through balanced sympathetic and parasympathetic outflow to the sinoatrial node.",
                    functions: [
                        "Increases heart rate via sympathetic cardioacceleratory signals",
                        "Decreases heart rate via vagal parasympathetic cardioinhibitory signals",
                        "Integrates baroreceptor feedback for beat-to-beat regulation",
                        "Responds to chemoreceptor input during hypoxia or hypercapnia"
                    ],
                    children: [],
                    position3D: [
                        0.04,
                        -0.26,
                        0.04
                    ],
                    color: "#db2777",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-cardiac-center",
                        collection: "cardiac_oscillator",
                        role: "Heartbeat Rhythm Controller",
                        description: "Balances sympathetic acceleration and vagal deceleration to maintain target heart rate in response to metabolic demand.",
                        fields: [
                            {
                                name: "heart_rate_bpm",
                                type: "uint16",
                                description: "Current target heart rate in beats per minute"
                            },
                            {
                                name: "sympathetic_drive",
                                type: "float",
                                description: "Cardioacceleratory sympathetic output intensity"
                            },
                            {
                                name: "vagal_tone",
                                type: "float",
                                description: "Cardioinhibitory parasympathetic (vagal) output intensity"
                            },
                            {
                                name: "baroreceptor_input",
                                type: "float",
                                description: "Arterial baroreceptor pressure signal"
                            },
                            {
                                name: "hrv_index",
                                type: "float",
                                description: "Heart rate variability index reflecting autonomic balance"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [
                            "vasomotor-center",
                            "nucleus-tractus-solitarius",
                            "dorsal-motor-vagus"
                        ],
                        category: "autonomic"
                    },
                    connections: [
                        {
                            targetId: "vasomotor-center",
                            type: "modulatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Cardiac-vascular coordination"
                        },
                        {
                            targetId: "nucleus-tractus-solitarius",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Baroreceptor relay"
                        },
                        {
                            targetId: "dorsal-motor-vagus",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Vagal cardiac outflow"
                        }
                    ]
                },
                {
                    id: "vasomotor-center",
                    name: "Vasomotor Center",
                    level: "subregion",
                    category: "autonomic",
                    description: "A medullary region that controls vascular smooth muscle tone by adjusting sympathetic vasoconstrictor outflow, thereby regulating systemic blood pressure.",
                    functions: [
                        "Regulates arterial blood pressure via sympathetic vasoconstriction",
                        "Adjusts peripheral vascular resistance in response to baroreceptor input",
                        "Coordinates with the cardiac center for integrated hemodynamic control",
                        "Mediates vasovagal responses during extreme pressure changes"
                    ],
                    children: [],
                    position3D: [
                        -0.04,
                        -0.28,
                        0.04
                    ],
                    color: "#db2777",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-vasomotor",
                        collection: "pressure_regulation",
                        role: "Hemodynamic Regulator",
                        description: "Adjusts systemic vascular resistance through sympathetic vasoconstrictor outflow to maintain blood pressure homeostasis.",
                        fields: [
                            {
                                name: "mean_arterial_pressure",
                                type: "float",
                                description: "Target mean arterial pressure in mmHg"
                            },
                            {
                                name: "vasoconstrictor_tone",
                                type: "float",
                                description: "Sympathetic vasoconstrictor output intensity"
                            },
                            {
                                name: "peripheral_resistance",
                                type: "float",
                                description: "Calculated total peripheral resistance"
                            },
                            {
                                name: "baroreceptor_error",
                                type: "float",
                                description: "Deviation of sensed pressure from set-point"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "cardiac-control-center",
                            "nucleus-tractus-solitarius"
                        ],
                        category: "autonomic"
                    },
                    connections: [
                        {
                            targetId: "cardiac-control-center",
                            type: "modulatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Vascular-cardiac coordination"
                        },
                        {
                            targetId: "nucleus-tractus-solitarius",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Pressure feedback"
                        }
                    ]
                },
                {
                    id: "respiratory-center",
                    name: "Respiratory Center",
                    level: "subregion",
                    category: "autonomic",
                    description: "The primary rhythm-generating network of the medulla that produces the basic pattern of inspiration and expiration through the pre-Bötzinger complex and related circuits.",
                    functions: [
                        "Generates the fundamental respiratory rhythm",
                        "Contains the pre-Bötzinger complex for inspiratory pacemaking",
                        "Integrates chemosensory feedback for CO₂ and O₂ homeostasis",
                        "Coordinates with pontine centers for smooth breathing transitions"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.3,
                        -0.02
                    ],
                    color: "#db2777",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-respiratory-center",
                        collection: "respiratory_oscillator",
                        role: "Breathing Pattern Generator",
                        description: "Houses the pre-Bötzinger pacemaker complex that generates rhythmic inspiratory bursts and coordinates expiratory timing.",
                        fields: [
                            {
                                name: "respiratory_rate",
                                type: "float",
                                description: "Current breathing rate in cycles per minute"
                            },
                            {
                                name: "inspiratory_drive",
                                type: "float",
                                description: "Pacemaker output intensity for inspiratory phase"
                            },
                            {
                                name: "pco2_level",
                                type: "float",
                                description: "Arterial CO₂ partial pressure sensed by central chemoreceptors"
                            },
                            {
                                name: "phase",
                                type: "enum",
                                description: "Current respiratory phase (inspiration, post-inspiration, expiration)"
                            },
                            {
                                name: "tidal_volume",
                                type: "float",
                                description: "Current tidal volume in liters"
                            }
                        ],
                        activationState: 0.85,
                        linkedModules: [
                            "dorsal-respiratory-group",
                            "ventral-respiratory-group",
                            "pneumotaxic-center"
                        ],
                        category: "autonomic"
                    },
                    connections: [
                        {
                            targetId: "dorsal-respiratory-group",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Inspiratory rhythm drive"
                        },
                        {
                            targetId: "ventral-respiratory-group",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Expiratory/forced breathing"
                        },
                        {
                            targetId: "pneumotaxic-center",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Pontine rhythm modulation"
                        }
                    ]
                },
                {
                    id: "dorsal-respiratory-group",
                    name: "Dorsal Respiratory Group",
                    level: "subregion",
                    category: "autonomic",
                    description: "A column of inspiratory neurons in the dorsal medulla (within and near the NTS) that drives diaphragmatic contraction during quiet breathing.",
                    functions: [
                        "Generates phrenic nerve signals for diaphragm contraction",
                        "Drives quiet tidal inspiration",
                        "Receives afferent input from pulmonary stretch receptors",
                        "Modulates inspiratory depth via vagal feedback"
                    ],
                    children: [],
                    position3D: [
                        0.02,
                        -0.32,
                        -0.04
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-drg",
                        collection: "respiratory_oscillator",
                        role: "Inspiratory Signal Driver",
                        description: "Fires phrenic motor neurons to produce diaphragmatic contraction during the inspiratory phase of quiet breathing.",
                        fields: [
                            {
                                name: "phrenic_output",
                                type: "float",
                                description: "Motor drive to the phrenic nerve for diaphragm contraction"
                            },
                            {
                                name: "stretch_receptor_input",
                                type: "float",
                                description: "Pulmonary stretch receptor (Hering-Breuer) feedback"
                            },
                            {
                                name: "inspiratory_duration_ms",
                                type: "uint32",
                                description: "Current inspiratory phase duration in milliseconds"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "respiratory-center",
                            "apneustic-center",
                            "ventral-respiratory-group"
                        ],
                        category: "autonomic"
                    },
                    connections: [
                        {
                            targetId: "respiratory-center",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Rhythm feedback"
                        },
                        {
                            targetId: "ventral-respiratory-group",
                            type: "excitatory",
                            strength: 0.4,
                            signalType: "electrical",
                            label: "Inspiratory-expiratory handoff"
                        }
                    ]
                },
                {
                    id: "ventral-respiratory-group",
                    name: "Ventral Respiratory Group",
                    level: "subregion",
                    category: "autonomic",
                    description: "A ventral medullary column containing both inspiratory and expiratory neurons that become active during forced breathing, exercise, and high ventilatory demand.",
                    functions: [
                        "Drives forced expiration via abdominal and internal intercostal muscles",
                        "Augments inspiration during exercise and high ventilatory demand",
                        "Contains the pre-Bötzinger complex (rhythm generator overlap)",
                        "Activates accessory respiratory muscles during respiratory distress"
                    ],
                    children: [],
                    position3D: [
                        -0.02,
                        -0.32,
                        0.02
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-vrg",
                        collection: "respiratory_oscillator",
                        role: "Forced Breathing Driver",
                        description: "Recruits expiratory and accessory inspiratory muscles during exercise, speech, and respiratory distress.",
                        fields: [
                            {
                                name: "expiratory_drive",
                                type: "float",
                                description: "Motor output to expiratory muscles (abdominals, internal intercostals)"
                            },
                            {
                                name: "accessory_inspiratory",
                                type: "float",
                                description: "Supplementary inspiratory drive for accessory muscles"
                            },
                            {
                                name: "demand_level",
                                type: "enum",
                                description: "Current ventilatory demand category (rest, moderate, intense, distress)"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "respiratory-center",
                            "dorsal-respiratory-group"
                        ],
                        category: "autonomic"
                    },
                    connections: [
                        {
                            targetId: "dorsal-respiratory-group",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Inspiratory augmentation"
                        },
                        {
                            targetId: "respiratory-center",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Rhythm coordination"
                        }
                    ]
                },
                {
                    id: "chemoreceptor-trigger-zone",
                    name: "Chemoreceptor Trigger Zone",
                    level: "subregion",
                    category: "brainstem",
                    description: "An area on the floor of the fourth ventricle (area postrema) outside the blood-brain barrier that detects blood-borne toxins and emetic agents, triggering the vomiting reflex.",
                    functions: [
                        "Detects circulating toxins and emetic substances in the blood",
                        "Triggers the vomiting reflex via the nucleus tractus solitarius",
                        "Acts as a protective mechanism against ingested poisons",
                        "Mediates chemotherapy-induced and motion-induced nausea"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.35,
                        -0.06
                    ],
                    color: "#f9a8d4",
                    signalType: "chemical",
                    schemaMapping: {
                        id: "schema-ctz",
                        collection: "vital_controllers",
                        role: "Toxin Detection Sentinel",
                        description: "Samples blood-borne chemicals outside the blood-brain barrier and triggers emetic protective reflexes when toxins are detected.",
                        fields: [
                            {
                                name: "toxin_concentration",
                                type: "float",
                                description: "Detected blood-borne toxin or emetic agent level"
                            },
                            {
                                name: "emetic_threshold",
                                type: "float",
                                description: "Threshold above which vomiting reflex is triggered"
                            },
                            {
                                name: "nausea_signal",
                                type: "float",
                                description: "Graded nausea signal sent to the NTS and vomiting center"
                            },
                            {
                                name: "dopamine_receptor_activity",
                                type: "float",
                                description: "D2 receptor activation by circulating dopamine agonists"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "nucleus-tractus-solitarius"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "nucleus-tractus-solitarius",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "Emetic relay"
                        }
                    ]
                },
                {
                    id: "nucleus-tractus-solitarius",
                    name: "Nucleus Tractus Solitarius",
                    level: "subregion",
                    category: "brainstem",
                    description: "The primary visceral sensory relay nucleus of the medulla, receiving taste information and afferents from the heart, lungs, and gastrointestinal tract via cranial nerves VII, IX, and X.",
                    functions: [
                        "Relays taste sensation from the tongue to the thalamus",
                        "Integrates cardiac baroreceptor and chemoreceptor afferents",
                        "Processes pulmonary stretch receptor information",
                        "Receives gastrointestinal vagal afferents for satiety and nausea"
                    ],
                    children: [],
                    position3D: [
                        0.02,
                        -0.3,
                        -0.05
                    ],
                    color: "#ec4899",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-nts",
                        collection: "visceral_input",
                        role: "Internal Organ Status Monitor",
                        description: "Aggregates visceral afferent signals from the heart, lungs, gut, and taste buds to inform autonomic reflex arcs and homeostatic circuits.",
                        fields: [
                            {
                                name: "baroreceptor_signal",
                                type: "float",
                                description: "Carotid/aortic baroreceptor pressure reading"
                            },
                            {
                                name: "chemoreceptor_signal",
                                type: "float",
                                description: "Peripheral chemoreceptor O₂/CO₂ reading"
                            },
                            {
                                name: "taste_input",
                                type: "float[5]",
                                description: "Gustatory signals across five taste modalities"
                            },
                            {
                                name: "gi_vagal_afferent",
                                type: "float",
                                description: "Gastrointestinal distension and nutrient signals"
                            },
                            {
                                name: "pulmonary_stretch",
                                type: "float",
                                description: "Lung inflation feedback from pulmonary stretch receptors"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "cardiac-control-center",
                            "vasomotor-center",
                            "dorsal-motor-vagus",
                            "chemoreceptor-trigger-zone"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "cardiac-control-center",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Baroreceptor reflex relay"
                        },
                        {
                            targetId: "vasomotor-center",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Pressure regulation input"
                        },
                        {
                            targetId: "dorsal-motor-vagus",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Vagal reflex arc"
                        }
                    ]
                },
                {
                    id: "dorsal-motor-vagus",
                    name: "Dorsal Motor Nucleus of Vagus",
                    level: "subregion",
                    category: "autonomic",
                    description: "A parasympathetic motor nucleus in the dorsal medulla that provides vagal efferent outflow to thoracic and abdominal viscera, controlling secretion, motility, and bronchial tone.",
                    functions: [
                        "Drives parasympathetic outflow to thoracic and abdominal organs",
                        "Stimulates gastric acid secretion and gut motility",
                        "Controls bronchial smooth muscle tone",
                        "Modulates pancreatic exocrine secretion"
                    ],
                    children: [],
                    position3D: [
                        0.02,
                        -0.28,
                        -0.06
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-dorsal-motor-vagus",
                        collection: "vital_controllers",
                        role: "Parasympathetic Visceral Driver",
                        description: "Sends preganglionic parasympathetic signals to the heart, lungs, and gastrointestinal tract for rest-and-digest functions.",
                        fields: [
                            {
                                name: "vagal_efferent_tone",
                                type: "float",
                                description: "Overall parasympathetic outflow intensity"
                            },
                            {
                                name: "gi_motility_drive",
                                type: "float",
                                description: "Excitatory drive to gastrointestinal smooth muscle"
                            },
                            {
                                name: "bronchial_tone",
                                type: "float",
                                description: "Parasympathetic bronchoconstrictor output"
                            },
                            {
                                name: "secretory_drive",
                                type: "float",
                                description: "Drive for glandular secretion (gastric, pancreatic)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "nucleus-tractus-solitarius",
                            "nucleus-ambiguus",
                            "cardiac-control-center"
                        ],
                        category: "autonomic"
                    },
                    connections: [
                        {
                            targetId: "nucleus-tractus-solitarius",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Visceral reflex feedback"
                        },
                        {
                            targetId: "nucleus-ambiguus",
                            type: "excitatory",
                            strength: 0.4,
                            signalType: "electrical",
                            label: "Vagal motor coordination"
                        }
                    ]
                },
                {
                    id: "nucleus-ambiguus",
                    name: "Nucleus Ambiguus",
                    level: "subregion",
                    category: "brainstem",
                    description: "A column of motor neurons in the ventrolateral medulla innervating the pharynx, larynx, and upper esophagus for swallowing and vocalization, plus cardiac vagal preganglionic neurons.",
                    functions: [
                        "Controls pharyngeal muscles for swallowing",
                        "Innervates laryngeal muscles for vocalization and airway protection",
                        "Provides fast-acting cardiac vagal neurons for heart rate control",
                        "Coordinates sequential swallowing reflex with respiratory pause"
                    ],
                    children: [],
                    position3D: [
                        -0.04,
                        -0.3,
                        0.02
                    ],
                    color: "#f472b6",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-nucleus-ambiguus",
                        collection: "vital_controllers",
                        role: "Swallow-Voice-Cardiac Motor Hub",
                        description: "Drives pharyngeal, laryngeal, and cardiac vagal motor programs for swallowing, speech, and rapid heart rate regulation.",
                        fields: [
                            {
                                name: "swallow_sequence",
                                type: "uint8",
                                description: "Current phase of the swallowing motor program"
                            },
                            {
                                name: "laryngeal_tension",
                                type: "float",
                                description: "Vocal fold tension for pitch control during phonation"
                            },
                            {
                                name: "cardiac_vagal_output",
                                type: "float",
                                description: "Fast-acting parasympathetic outflow to the sinoatrial node"
                            },
                            {
                                name: "airway_protective",
                                type: "boolean",
                                description: "Whether the laryngeal adductor reflex is active"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "dorsal-motor-vagus",
                            "nucleus-tractus-solitarius",
                            "trigeminal-motor-nucleus"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "dorsal-motor-vagus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Vagal coordination"
                        },
                        {
                            targetId: "cardiac-control-center",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Rapid vagal cardiac control"
                        }
                    ]
                },
                {
                    id: "inferior-olivary-nucleus",
                    name: "Inferior Olivary Nucleus",
                    level: "subregion",
                    category: "brainstem",
                    description: "A large, corrugated nucleus in the ventral medulla that sends climbing fiber projections to the cerebellar cortex, carrying error signals critical for motor learning and timing.",
                    functions: [
                        "Sends climbing fiber signals to cerebellar Purkinje cells",
                        "Encodes motor error signals for supervised learning in the cerebellum",
                        "Contributes to timing calibration of rhythmic movements",
                        "Receives input from the red nucleus, spinal cord, and cerebral cortex"
                    ],
                    children: [],
                    position3D: [
                        0.04,
                        -0.34,
                        0.04
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-inferior-olive",
                        collection: "vital_controllers",
                        role: "Cerebellar Error Signal Relay",
                        description: "Computes and transmits climbing fiber error signals to the cerebellum for motor learning and timing calibration.",
                        fields: [
                            {
                                name: "error_magnitude",
                                type: "float",
                                description: "Motor error signal magnitude sent via climbing fibers"
                            },
                            {
                                name: "climbing_fiber_rate",
                                type: "float",
                                description: "Climbing fiber complex spike frequency in Hz"
                            },
                            {
                                name: "timing_offset_ms",
                                type: "int16",
                                description: "Temporal error in movement timing relative to target"
                            },
                            {
                                name: "source_pathway",
                                type: "enum",
                                description: "Input source: red nucleus, spinal cord, or cortex"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "red-nucleus",
                            "cerebellum"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "red-nucleus",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "Rubro-olivary input"
                        }
                    ]
                },
                {
                    id: "gracile-cuneate-nuclei",
                    name: "Gracile and Cuneate Nuclei",
                    level: "subregion",
                    category: "brainstem",
                    description: "Paired nuclei in the dorsal medulla where the dorsal column–medial lemniscus pathway synapses; the gracile nucleus relays fine touch from the lower body, and the cuneate from the upper body.",
                    functions: [
                        "Relay fine touch and proprioception from the lower body (gracile)",
                        "Relay fine touch and proprioception from the upper body (cuneate)",
                        "Project via the medial lemniscus to the ventral posterolateral thalamus",
                        "Enable two-point discrimination and conscious proprioception"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.36,
                        -0.06
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-gracile-cuneate",
                        collection: "vital_controllers",
                        role: "Fine Touch Relay Station",
                        description: "Second-order neurons in the dorsal column pathway that relay discriminative touch and proprioception to the thalamus.",
                        fields: [
                            {
                                name: "tactile_resolution",
                                type: "float",
                                description: "Two-point discrimination threshold in millimeters"
                            },
                            {
                                name: "body_region",
                                type: "enum",
                                description: "Somatotopic origin (lower body via gracile, upper via cuneate)"
                            },
                            {
                                name: "proprioceptive_signal",
                                type: "float",
                                description: "Joint position and limb movement sense signal"
                            },
                            {
                                name: "lemniscal_output",
                                type: "float",
                                description: "Projection intensity via the medial lemniscus to thalamus"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "thalamus",
                            "somatosensory-cortex"
                        ],
                        category: "brainstem"
                    },
                    connections: [
                        {
                            targetId: "pyramidal-decussation",
                            type: "structural",
                            strength: 0.3,
                            signalType: "electrical",
                            label: "Adjacent medullary landmark"
                        }
                    ]
                },
                {
                    id: "pyramidal-decussation",
                    name: "Pyramidal Decussation",
                    level: "subregion",
                    category: "pathway",
                    description: "The point at the caudal medulla where approximately 90% of corticospinal (pyramidal) tract fibers cross the midline, establishing contralateral motor control of the body.",
                    functions: [
                        "Crosses ~90% of corticospinal fibers to the contralateral side",
                        "Establishes contralateral motor control of voluntary movement",
                        "Creates the lateral corticospinal tract in the spinal cord",
                        "Remaining uncrossed fibers form the anterior corticospinal tract"
                    ],
                    children: [],
                    position3D: [
                        0.0,
                        -0.38,
                        0.0
                    ],
                    color: "#f9a8d4",
                    signalType: "electrical",
                    schemaMapping: {
                        id: "schema-pyramidal-decussation",
                        collection: "vital_controllers",
                        role: "Motor Pathway Crossing Point",
                        description: "The anatomical site where descending corticospinal fibers decussate, establishing the contralateral organization of voluntary motor control.",
                        fields: [
                            {
                                name: "crossing_fraction",
                                type: "float",
                                description: "Proportion of fibers that cross (~0.9)"
                            },
                            {
                                name: "fiber_count",
                                type: "uint32",
                                description: "Estimated number of corticospinal axons passing through"
                            },
                            {
                                name: "conduction_velocity",
                                type: "float",
                                description: "Average axonal conduction speed in m/s"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "cerebral-peduncles",
                            "spinal-cord"
                        ],
                        category: "pathway"
                    },
                    connections: [
                        {
                            targetId: "cerebral-peduncles",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Descending motor fibers from midbrain"
                        }
                    ]
                }
            ],
            position3D: [
                0,
                -0.3,
                0
            ],
            scale3D: [
                0.3,
                0.3,
                0.25
            ],
            color: "#ec4899",
            signalType: "electrical",
            schemaMapping: {
                id: "schema-medulla",
                collection: "vital_controllers",
                role: "Life-Critical Process Manager",
                description: "Hosts the non-negotiable autonomic oscillators and reflex centers that sustain cardiac, respiratory, and vasomotor function.",
                fields: [
                    {
                        name: "cardiac_status",
                        type: "float",
                        description: "Aggregate cardiac regulation output"
                    },
                    {
                        name: "respiratory_status",
                        type: "float",
                        description: "Aggregate respiratory rhythm output"
                    },
                    {
                        name: "vascular_status",
                        type: "float",
                        description: "Aggregate vasomotor regulation output"
                    },
                    {
                        name: "reflex_integrity",
                        type: "float",
                        description: "Composite health metric of protective reflexes (gag, cough, swallow)"
                    },
                    {
                        name: "consciousness_support",
                        type: "boolean",
                        description: "Whether medullary reticular formation supports wakefulness"
                    }
                ],
                activationState: 0.85,
                linkedModules: [
                    "pons",
                    "spinal-cord"
                ],
                category: "brainstem"
            },
            connections: [
                {
                    targetId: "pons",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Ascending relay to pons"
                },
                {
                    targetId: "midbrain",
                    type: "excitatory",
                    strength: 0.4,
                    signalType: "electrical",
                    label: "Ascending reticular activation"
                }
            ]
        }
    ],
    position3D: [
        0,
        -0.5,
        -0.1
    ],
    scale3D: [
        0.4,
        0.8,
        0.35
    ],
    color: "#ec4899",
    signalType: "electrical",
    schemaMapping: {
        id: "schema-brainstem",
        collection: "background_processes",
        role: "Always-On Daemon Services",
        description: "The brainstem's schema represents the always-running background services that keep the organism alive — vital sign regulation, arousal state, and reflex routing.",
        fields: [
            {
                name: "vital_signs_ok",
                type: "boolean",
                description: "Composite flag indicating all vital autonomic systems are within range"
            },
            {
                name: "arousal_level",
                type: "float",
                description: "Global arousal state from deep sleep to hypervigilance"
            },
            {
                name: "reflex_queue_depth",
                type: "uint8",
                description: "Number of pending reflex arcs awaiting execution"
            },
            {
                name: "cranial_nerve_status",
                type: "uint16",
                description: "Bitmask of active cranial nerve nuclei"
            },
            {
                name: "uptime_hours",
                type: "float",
                description: "Continuous operation time since last sleep cycle"
            }
        ],
        activationState: 0.9,
        linkedModules: [
            "spinal-cord",
            "thalamus",
            "hypothalamus",
            "cerebellum"
        ],
        category: "brainstem"
    },
    connections: [
        {
            targetId: "spinal-cord",
            type: "structural",
            strength: 0.9,
            signalType: "electrical",
            label: "Brainstem-spinal junction"
        },
        {
            targetId: "thalamus",
            type: "excitatory",
            strength: 0.7,
            signalType: "electrical",
            label: "Ascending reticular activation to thalamus"
        },
        {
            targetId: "cerebellum",
            type: "excitatory",
            strength: 0.6,
            signalType: "electrical",
            label: "Pontocerebellar relay"
        },
        {
            targetId: "hypothalamus",
            type: "modulatory",
            strength: 0.5,
            signalType: "chemical",
            label: "Autonomic-neuroendocrine coordination"
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/limbic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "limbicSystem",
    ()=>limbicSystem
]);
const limbicSystem = {
    id: "limbic-system",
    name: "Limbic System",
    level: "system",
    category: "limbic",
    description: "Deep brain network governing emotion, memory, motivation, and homeostasis. Mediates the interface between raw sensory experience and higher cognition.",
    functions: [
        "emotion processing",
        "memory formation and retrieval",
        "motivation and reward",
        "homeostatic regulation",
        "fight-or-flight coordination"
    ],
    position3D: [
        0,
        0,
        0
    ],
    scale3D: [
        1.0,
        0.8,
        0.9
    ],
    color: "#f97316",
    signalType: "chemical",
    connections: [
        {
            targetId: "cerebral-cortex",
            type: "excitatory",
            strength: 0.9,
            signalType: "electrical",
            label: "cortical integration"
        },
        {
            targetId: "brainstem",
            type: "modulatory",
            strength: 0.7,
            signalType: "chemical",
            label: "autonomic drive"
        },
        {
            targetId: "cerebellum",
            type: "modulatory",
            strength: 0.4,
            signalType: "electrical",
            label: "emotional-motor coordination"
        }
    ],
    schemaMapping: {
        id: "schema-limbic-system",
        collection: "limbic_core",
        role: "Emotional-Mnemonic Processing Hub",
        description: "Central orchestrator for affect-tagged memory encoding, reward computation, and homeostatic state management.",
        fields: [
            {
                name: "emotional_valence",
                type: "float32",
                description: "Current emotional polarity from -1 (aversive) to +1 (appetitive)"
            },
            {
                name: "arousal_level",
                type: "float32",
                description: "Autonomic activation intensity from 0 (calm) to 1 (maximal)"
            },
            {
                name: "memory_encoding_rate",
                type: "float32",
                description: "Throughput of new memory consolidation events per cycle"
            },
            {
                name: "homeostatic_deviation",
                type: "vec4",
                description: "Deviation vector for temperature, hunger, thirst, fatigue"
            },
            {
                name: "reward_prediction_error",
                type: "float32",
                description: "Delta between expected and received reward signal"
            }
        ],
        activationState: 0.7,
        linkedModules: [
            "cerebral-cortex",
            "brainstem",
            "endocrine-system"
        ],
        category: "limbic"
    },
    children: [
        // ── 1. Hippocampus ──────────────────────────────────────────────
        {
            id: "hippocampus",
            name: "Hippocampus",
            level: "region",
            category: "limbic",
            description: "Seahorse-shaped structure essential for converting short-term experiences into long-term declarative memories and constructing spatial maps of the environment.",
            functions: [
                "memory formation",
                "spatial mapping",
                "contextual encoding",
                "memory consolidation"
            ],
            position3D: [
                -0.4,
                -0.2,
                -0.1
            ],
            scale3D: [
                0.25,
                0.12,
                0.15
            ],
            color: "#fb923c",
            signalType: "electrical",
            connections: [
                {
                    targetId: "amygdala",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "emotional memory tagging"
                },
                {
                    targetId: "thalamus",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "memory relay"
                },
                {
                    targetId: "fornix",
                    type: "structural",
                    strength: 1.0,
                    signalType: "electrical",
                    label: "output fiber bundle"
                },
                {
                    targetId: "cingulate-cortex",
                    type: "excitatory",
                    strength: 0.5,
                    signalType: "electrical",
                    label: "memory-emotion bridge"
                }
            ],
            schemaMapping: {
                id: "schema-hippocampus",
                collection: "memory_embeddings",
                role: "Vector Index Writer / Retrieval Engine",
                description: "Encodes episodic experiences as high-dimensional vectors and supports similarity-based retrieval for memory recall.",
                fields: [
                    {
                        name: "embedding_vector",
                        type: "vec1024",
                        description: "High-dimensional representation of an episodic memory"
                    },
                    {
                        name: "temporal_context",
                        type: "timestamp",
                        description: "Temporal tag for when the memory was formed"
                    },
                    {
                        name: "spatial_context",
                        type: "vec3",
                        description: "Spatial coordinates associated with the memory"
                    },
                    {
                        name: "consolidation_score",
                        type: "float32",
                        description: "Degree of transfer from short-term to long-term store"
                    },
                    {
                        name: "retrieval_count",
                        type: "uint32",
                        description: "Number of times this memory has been successfully retrieved"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "amygdala",
                    "entorhinal-cortex",
                    "fornix"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "ca1-region",
                    name: "CA1 Region",
                    level: "subregion",
                    category: "limbic",
                    description: "Primary output layer of the hippocampus responsible for memory consolidation and temporal ordering of events.",
                    functions: [
                        "memory consolidation output",
                        "temporal sequence encoding"
                    ],
                    position3D: [
                        -0.42,
                        -0.18,
                        -0.08
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "ca3-region",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Schaffer collaterals"
                        },
                        {
                            targetId: "subiculum",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "consolidation output"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-ca1",
                        collection: "memory_consolidation",
                        role: "Long-Term Memory Writer",
                        description: "Transforms labile short-term traces into stable long-term memory representations.",
                        fields: [
                            {
                                name: "trace_stability",
                                type: "float32",
                                description: "Stability index of the memory trace (0 = labile, 1 = consolidated)"
                            },
                            {
                                name: "replay_count",
                                type: "uint32",
                                description: "Number of sharp-wave ripple replay events for this trace"
                            },
                            {
                                name: "output_projection",
                                type: "vec128",
                                description: "Compressed representation sent to downstream targets"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "ca3-region",
                            "subiculum"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "ca3-region",
                    name: "CA3 Region",
                    level: "subregion",
                    category: "limbic",
                    description: "Recurrent autoassociative network capable of pattern completion—reconstructing full memories from partial cues.",
                    functions: [
                        "pattern completion",
                        "autoassociative memory"
                    ],
                    position3D: [
                        -0.44,
                        -0.2,
                        -0.1
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "ca1-region",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Schaffer collaterals"
                        },
                        {
                            targetId: "dentate-gyrus",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "mossy fiber input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-ca3",
                        collection: "pattern_completion",
                        role: "Associative Memory Retriever",
                        description: "Completes degraded input patterns by activating stored attractor states in a recurrent network.",
                        fields: [
                            {
                                name: "input_fragment",
                                type: "vec512",
                                description: "Partial cue used to initiate pattern completion"
                            },
                            {
                                name: "completion_confidence",
                                type: "float32",
                                description: "Confidence that retrieved pattern matches the original"
                            },
                            {
                                name: "attractor_state",
                                type: "vec1024",
                                description: "Settled attractor representing the completed memory"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "ca1-region",
                            "dentate-gyrus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "dentate-gyrus",
                    name: "Dentate Gyrus",
                    level: "subregion",
                    category: "limbic",
                    description: "Gateway into the hippocampus that orthogonalizes similar inputs to create distinct memory representations. One of few brain regions with adult neurogenesis.",
                    functions: [
                        "pattern separation",
                        "neurogenesis"
                    ],
                    position3D: [
                        -0.46,
                        -0.22,
                        -0.12
                    ],
                    color: "#fed7aa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "ca3-region",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "mossy fibers"
                        },
                        {
                            targetId: "entorhinal-cortex",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "perforant path input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-dentate-gyrus",
                        collection: "pattern_separation",
                        role: "Input Discriminator",
                        description: "Separates overlapping input patterns into distinct sparse codes to prevent memory interference.",
                        fields: [
                            {
                                name: "input_overlap",
                                type: "float32",
                                description: "Similarity ratio of incoming patterns (0 = unique, 1 = identical)"
                            },
                            {
                                name: "separation_index",
                                type: "float32",
                                description: "Degree of orthogonalization achieved"
                            },
                            {
                                name: "neurogenesis_rate",
                                type: "float32",
                                description: "Rate of new granule cell integration"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "ca3-region",
                            "entorhinal-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "subiculum",
                    name: "Subiculum",
                    level: "subregion",
                    category: "limbic",
                    description: "Primary output hub of the hippocampal formation, relaying consolidated memories to cortical and subcortical targets.",
                    functions: [
                        "output relay to other brain areas",
                        "spatial processing"
                    ],
                    position3D: [
                        -0.38,
                        -0.19,
                        -0.07
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "ca1-region",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "hippocampal output"
                        },
                        {
                            targetId: "mammillary-bodies",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "via fornix"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-subiculum",
                        collection: "memory_relay",
                        role: "Hippocampal Output Router",
                        description: "Distributes consolidated memory signals to thalamic, hypothalamic, and cortical destinations.",
                        fields: [
                            {
                                name: "target_address",
                                type: "string",
                                description: "Destination module for relayed memory signal"
                            },
                            {
                                name: "signal_strength",
                                type: "float32",
                                description: "Amplitude of the outgoing memory trace"
                            },
                            {
                                name: "spatial_heading",
                                type: "vec3",
                                description: "Head-direction signal for spatial output"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "ca1-region",
                            "mammillary-bodies",
                            "thalamus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "entorhinal-cortex",
                    name: "Entorhinal Cortex",
                    level: "subregion",
                    category: "limbic",
                    description: "Major gateway between the neocortex and hippocampus. Contains grid cells that generate a spatial coordinate system for navigation.",
                    functions: [
                        "grid cells",
                        "spatial navigation",
                        "memory gateway"
                    ],
                    position3D: [
                        -0.43,
                        -0.24,
                        -0.14
                    ],
                    color: "#fed7aa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "dentate-gyrus",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "perforant path"
                        },
                        {
                            targetId: "ca1-region",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "direct entorhinal-CA1 path"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-entorhinal-cortex",
                        collection: "spatial_grid",
                        role: "Spatial Coordinate Encoder",
                        description: "Generates hexagonal grid-cell representations that provide a metric coordinate system for memory and navigation.",
                        fields: [
                            {
                                name: "grid_phase",
                                type: "vec3",
                                description: "Phase offsets of the grid-cell firing pattern"
                            },
                            {
                                name: "grid_scale",
                                type: "float32",
                                description: "Spatial wavelength of the grid pattern"
                            },
                            {
                                name: "cortical_input",
                                type: "vec256",
                                description: "Multi-modal sensory summary from neocortex"
                            },
                            {
                                name: "boundary_signal",
                                type: "float32",
                                description: "Border-cell activation indicating environmental boundaries"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "dentate-gyrus",
                            "ca1-region",
                            "hippocampus"
                        ],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 2. Amygdala ─────────────────────────────────────────────────
        {
            id: "amygdala",
            name: "Amygdala",
            level: "region",
            category: "limbic",
            description: "Almond-shaped nuclei that rapidly evaluate stimuli for threat and emotional significance, modulating memory consolidation and autonomic responses.",
            functions: [
                "fear processing",
                "threat detection",
                "emotional intensity modulation"
            ],
            position3D: [
                -0.35,
                -0.3,
                0.15
            ],
            scale3D: [
                0.15,
                0.12,
                0.12
            ],
            color: "#ea580c",
            signalType: "chemical",
            connections: [
                {
                    targetId: "hippocampus",
                    type: "modulatory",
                    strength: 0.8,
                    signalType: "chemical",
                    label: "emotional memory tagging"
                },
                {
                    targetId: "hypothalamus",
                    type: "excitatory",
                    strength: 0.85,
                    signalType: "chemical",
                    label: "fear-autonomic cascade"
                },
                {
                    targetId: "thalamus",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "sensory shortcut (low road)"
                },
                {
                    targetId: "stria-terminalis",
                    type: "structural",
                    strength: 1.0,
                    signalType: "chemical",
                    label: "anxiety pathway"
                }
            ],
            schemaMapping: {
                id: "schema-amygdala",
                collection: "state_modulators",
                role: "Emotional Priority Modulator",
                description: "Assigns emotional salience scores to incoming stimuli and gates downstream processing based on threat level.",
                fields: [
                    {
                        name: "threat_level",
                        type: "float32",
                        description: "Computed threat probability from 0 (safe) to 1 (critical)"
                    },
                    {
                        name: "salience_score",
                        type: "float32",
                        description: "Emotional significance weighting for attention allocation"
                    },
                    {
                        name: "fear_conditioned_stimuli",
                        type: "vec128[]",
                        description: "Array of stimulus embeddings associated with learned fear"
                    },
                    {
                        name: "extinction_progress",
                        type: "float32",
                        description: "Degree of fear extinction for the most recent conditioned stimulus"
                    }
                ],
                activationState: 0.6,
                linkedModules: [
                    "hippocampus",
                    "hypothalamus",
                    "thalamus"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "basolateral-complex",
                    name: "Basolateral Complex",
                    level: "subregion",
                    category: "limbic",
                    description: "Receives multi-modal sensory input and learns stimulus-outcome associations that drive fear conditioning.",
                    functions: [
                        "sensory input integration",
                        "fear learning"
                    ],
                    position3D: [
                        -0.36,
                        -0.31,
                        0.14
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "central-nucleus",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "fear signal relay"
                        },
                        {
                            targetId: "hippocampus",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "contextual fear input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-basolateral",
                        collection: "fear_learning",
                        role: "Stimulus-Outcome Associator",
                        description: "Binds sensory representations to valence outcomes through Hebbian-like plasticity.",
                        fields: [
                            {
                                name: "sensory_input",
                                type: "vec256",
                                description: "Multi-modal sensory representation of the stimulus"
                            },
                            {
                                name: "outcome_valence",
                                type: "float32",
                                description: "Associated outcome value (-1 aversive to +1 appetitive)"
                            },
                            {
                                name: "association_strength",
                                type: "float32",
                                description: "Learned coupling strength between stimulus and outcome"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "central-nucleus",
                            "hippocampus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "central-nucleus",
                    name: "Central Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Primary output of the amygdala that triggers autonomic fear responses including freezing, startle, and hormonal cascades.",
                    functions: [
                        "fear response output",
                        "autonomic activation"
                    ],
                    position3D: [
                        -0.34,
                        -0.29,
                        0.16
                    ],
                    color: "#c2410c",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "hypothalamus",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "autonomic fear output"
                        },
                        {
                            targetId: "brainstem",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "startle/freezing"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-central-nucleus",
                        collection: "fear_output",
                        role: "Autonomic Fear Dispatcher",
                        description: "Converts threat assessments into coordinated autonomic and behavioral fear responses.",
                        fields: [
                            {
                                name: "freeze_signal",
                                type: "float32",
                                description: "Freezing behavior activation level"
                            },
                            {
                                name: "startle_magnitude",
                                type: "float32",
                                description: "Startle reflex potentiation factor"
                            },
                            {
                                name: "cortisol_trigger",
                                type: "boolean",
                                description: "Whether HPA axis stress cascade is initiated"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "hypothalamus",
                            "basolateral-complex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "medial-nucleus",
                    name: "Medial Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Processes social and reproductive signals including pheromone-driven behaviors.",
                    functions: [
                        "social behavior",
                        "pheromone processing"
                    ],
                    position3D: [
                        -0.33,
                        -0.31,
                        0.17
                    ],
                    color: "#f97316",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "hypothalamus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "reproductive/social drive"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-medial-nucleus",
                        collection: "social_signals",
                        role: "Social Cue Processor",
                        description: "Decodes chemosensory and social signals to modulate affiliative and reproductive behavior.",
                        fields: [
                            {
                                name: "pheromone_signature",
                                type: "vec64",
                                description: "Chemical signature vector from vomeronasal input"
                            },
                            {
                                name: "social_valence",
                                type: "float32",
                                description: "Positive or negative social signal strength"
                            },
                            {
                                name: "reproductive_drive",
                                type: "float32",
                                description: "Reproductive motivation signal intensity"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "hypothalamus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "cortical-nucleus",
                    name: "Cortical Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Receives direct olfactory input and assigns emotional valence to odors.",
                    functions: [
                        "olfactory processing"
                    ],
                    position3D: [
                        -0.36,
                        -0.32,
                        0.13
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "basolateral-complex",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "olfactory-emotional link"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-cortical-nucleus",
                        collection: "olfactory_valence",
                        role: "Olfactory Emotion Tagger",
                        description: "Tags olfactory stimuli with emotional significance for approach/avoidance decisions.",
                        fields: [
                            {
                                name: "odor_embedding",
                                type: "vec128",
                                description: "Olfactory stimulus representation"
                            },
                            {
                                name: "hedonic_value",
                                type: "float32",
                                description: "Pleasantness rating of the odor (-1 to +1)"
                            },
                            {
                                name: "familiarity_index",
                                type: "float32",
                                description: "Recognition score for the odor"
                            }
                        ],
                        activationState: 0.35,
                        linkedModules: [
                            "basolateral-complex"
                        ],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 3. Basal Ganglia ────────────────────────────────────────────
        {
            id: "basal-ganglia",
            name: "Basal Ganglia",
            level: "region",
            category: "limbic",
            description: "Collection of subcortical nuclei that select and gate voluntary actions, encode habits, and compute reward predictions essential for reinforcement learning.",
            functions: [
                "movement initiation",
                "habit formation",
                "procedural learning",
                "action selection"
            ],
            position3D: [
                0,
                0.1,
                0.1
            ],
            scale3D: [
                0.35,
                0.25,
                0.25
            ],
            color: "#ea580c",
            signalType: "electrical",
            connections: [
                {
                    targetId: "thalamus",
                    type: "inhibitory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "thalamic gating (direct/indirect)"
                },
                {
                    targetId: "cerebral-cortex",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "cortex-basal ganglia loop"
                }
            ],
            schemaMapping: {
                id: "schema-basal-ganglia",
                collection: "action_selector",
                role: "Action Gating System",
                description: "Implements winner-take-all selection among competing motor programs via opponent direct/indirect pathways.",
                fields: [
                    {
                        name: "action_candidates",
                        type: "vec64[]",
                        description: "Set of competing action representations"
                    },
                    {
                        name: "selected_action",
                        type: "vec64",
                        description: "The winning action after competitive selection"
                    },
                    {
                        name: "dopamine_level",
                        type: "float32",
                        description: "Tonic dopamine modulating action threshold"
                    },
                    {
                        name: "habit_strength",
                        type: "float32",
                        description: "Degree of automaticity (0 = goal-directed, 1 = habitual)"
                    }
                ],
                activationState: 0.65,
                linkedModules: [
                    "thalamus",
                    "cerebral-cortex",
                    "nucleus-accumbens"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "caudate-nucleus",
                    name: "Caudate Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "C-shaped nucleus involved in goal-directed behavior, cognitive flexibility, and learning from feedback.",
                    functions: [
                        "goal-directed behavior",
                        "learning"
                    ],
                    position3D: [
                        0.02,
                        0.12,
                        0.08
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "globus-pallidus-internal",
                            type: "inhibitory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "direct pathway"
                        },
                        {
                            targetId: "globus-pallidus-external",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "indirect pathway"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-caudate",
                        collection: "goal_directed_actions",
                        role: "Goal-Action Mapper",
                        description: "Associates goal states with action sequences and updates mappings based on outcome feedback.",
                        fields: [
                            {
                                name: "goal_representation",
                                type: "vec128",
                                description: "Encoded goal state driving action selection"
                            },
                            {
                                name: "action_sequence",
                                type: "vec128[]",
                                description: "Ordered sequence of motor primitives"
                            },
                            {
                                name: "outcome_history",
                                type: "float32[]",
                                description: "Recent reward outcomes for this goal-action pair"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "globus-pallidus-internal",
                            "globus-pallidus-external"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "putamen",
                    name: "Putamen",
                    level: "subregion",
                    category: "limbic",
                    description: "Largest component of the dorsal striatum, primarily responsible for motor execution and the formation of automatic habitual behaviors.",
                    functions: [
                        "motor execution",
                        "habitual behavior"
                    ],
                    position3D: [
                        -0.02,
                        0.08,
                        0.12
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "globus-pallidus-internal",
                            type: "inhibitory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "direct pathway"
                        },
                        {
                            targetId: "globus-pallidus-external",
                            type: "inhibitory",
                            strength: 0.75,
                            signalType: "electrical",
                            label: "indirect pathway"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-putamen",
                        collection: "motor_habits",
                        role: "Habitual Motor Controller",
                        description: "Stores and executes well-learned motor programs as automatic stimulus-response habits.",
                        fields: [
                            {
                                name: "motor_program",
                                type: "vec256",
                                description: "Encoded habitual motor sequence"
                            },
                            {
                                name: "stimulus_trigger",
                                type: "vec128",
                                description: "Sensory cue that activates the habitual response"
                            },
                            {
                                name: "automaticity",
                                type: "float32",
                                description: "Degree of habit crystallization (0 = novel, 1 = fully automatic)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "globus-pallidus-internal",
                            "globus-pallidus-external"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "globus-pallidus-external",
                    name: "Globus Pallidus External",
                    level: "subregion",
                    category: "limbic",
                    description: "Key node of the indirect pathway that suppresses unwanted movements by inhibiting the subthalamic nucleus.",
                    functions: [
                        "indirect pathway",
                        "movement suppression"
                    ],
                    position3D: [
                        0.04,
                        0.1,
                        0.06
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "subthalamic-nucleus",
                            type: "inhibitory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "indirect pathway relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-gpe",
                        collection: "movement_suppression",
                        role: "Inhibitory Brake Relay",
                        description: "Tonically inhibits the subthalamic nucleus, releasing it only when movement suppression is needed.",
                        fields: [
                            {
                                name: "inhibition_tonic_rate",
                                type: "float32",
                                description: "Baseline tonic inhibitory firing rate"
                            },
                            {
                                name: "disinhibition_signal",
                                type: "float32",
                                description: "Striatal input that pauses tonic inhibition"
                            },
                            {
                                name: "target_suppression",
                                type: "float32",
                                description: "Net suppression effect on downstream target"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "subthalamic-nucleus",
                            "caudate-nucleus",
                            "putamen"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "globus-pallidus-internal",
                    name: "Globus Pallidus Internal",
                    level: "subregion",
                    category: "limbic",
                    description: "Major output nucleus of the basal ganglia. Tonically inhibits thalamus and releases it when the direct pathway activates to permit movement.",
                    functions: [
                        "direct pathway output",
                        "movement gating"
                    ],
                    position3D: [
                        0.03,
                        0.11,
                        0.08
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "thalamus",
                            type: "inhibitory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "thalamic gating output"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-gpi",
                        collection: "movement_gate",
                        role: "Thalamic Release Gate",
                        description: "Acts as the final gate controlling whether selected motor plans reach the thalamus and cortex.",
                        fields: [
                            {
                                name: "gate_state",
                                type: "float32",
                                description: "Current gate opening (0 = closed/inhibiting, 1 = fully open)"
                            },
                            {
                                name: "direct_pathway_input",
                                type: "float32",
                                description: "Inhibitory input from striatum via direct pathway"
                            },
                            {
                                name: "indirect_pathway_input",
                                type: "float32",
                                description: "Excitatory input from subthalamic nucleus"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "thalamus",
                            "caudate-nucleus",
                            "putamen"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "subthalamic-nucleus",
                    name: "Subthalamic Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Small excitatory nucleus that provides a global 'brake' on movement, critical for impulse control and preventing premature actions.",
                    functions: [
                        "movement brake",
                        "impulse control"
                    ],
                    position3D: [
                        0.02,
                        0.06,
                        0.1
                    ],
                    color: "#c2410c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "globus-pallidus-internal",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "hyperdirect/indirect brake"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-stn",
                        collection: "impulse_brake",
                        role: "Global No-Go Signal",
                        description: "Broadcasts a diffuse excitatory signal that raises the threshold for all action candidates, implementing a 'wait' signal.",
                        fields: [
                            {
                                name: "brake_intensity",
                                type: "float32",
                                description: "Global inhibition strength applied to all actions"
                            },
                            {
                                name: "conflict_level",
                                type: "float32",
                                description: "Detected competition among action candidates"
                            },
                            {
                                name: "urgency_override",
                                type: "float32",
                                description: "Signal that can override the brake in high-urgency situations"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "globus-pallidus-internal",
                            "globus-pallidus-external"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "nucleus-accumbens",
                    name: "Nucleus Accumbens",
                    level: "subregion",
                    category: "limbic",
                    description: "Ventral striatum hub that integrates dopaminergic reward signals with limbic input to compute motivational drive and reward predictions.",
                    functions: [
                        "reward processing",
                        "motivation"
                    ],
                    position3D: [
                        -0.02,
                        0.04,
                        0.15
                    ],
                    color: "#c2410c",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "hypothalamus",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "motivational drive"
                        },
                        {
                            targetId: "amygdala",
                            type: "modulatory",
                            strength: 0.5,
                            signalType: "chemical",
                            label: "reward-emotion link"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-nucleus-accumbens",
                        collection: "reward_signals",
                        role: "Reward Prediction Engine",
                        description: "Computes reward prediction errors and motivational value signals that drive reinforcement learning.",
                        fields: [
                            {
                                name: "expected_reward",
                                type: "float32",
                                description: "Predicted reward value for the current state-action"
                            },
                            {
                                name: "received_reward",
                                type: "float32",
                                description: "Actual reward signal received"
                            },
                            {
                                name: "prediction_error",
                                type: "float32",
                                description: "Difference between received and expected reward (RPE)"
                            },
                            {
                                name: "dopamine_burst",
                                type: "float32",
                                description: "Phasic dopamine signal magnitude"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "hypothalamus",
                            "amygdala",
                            "basal-ganglia"
                        ],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 4. Thalamus ─────────────────────────────────────────────────
        {
            id: "thalamus",
            name: "Thalamus",
            level: "region",
            category: "limbic",
            description: "Central relay station that routes nearly all sensory information (except olfaction) to the cortex and gates information flow based on attentional state.",
            functions: [
                "sensory relay",
                "attention gating",
                "consciousness modulation"
            ],
            position3D: [
                0,
                0.15,
                -0.05
            ],
            scale3D: [
                0.3,
                0.2,
                0.25
            ],
            color: "#fb923c",
            signalType: "electrical",
            connections: [
                {
                    targetId: "cerebral-cortex",
                    type: "excitatory",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "thalamocortical relay"
                },
                {
                    targetId: "basal-ganglia",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "motor feedback loop"
                },
                {
                    targetId: "hippocampus",
                    type: "excitatory",
                    strength: 0.5,
                    signalType: "electrical",
                    label: "memory relay"
                }
            ],
            schemaMapping: {
                id: "schema-thalamus",
                collection: "signal_router",
                role: "Central Relay Hub",
                description: "Routes and filters sensory, motor, and limbic signals to appropriate cortical targets based on relevance and attention.",
                fields: [
                    {
                        name: "input_channel",
                        type: "string",
                        description: "Source modality of the incoming signal"
                    },
                    {
                        name: "routing_target",
                        type: "string",
                        description: "Cortical destination for the relayed signal"
                    },
                    {
                        name: "gating_weight",
                        type: "float32",
                        description: "Attention-modulated pass-through weight (0 = blocked, 1 = full relay)"
                    },
                    {
                        name: "signal_fidelity",
                        type: "float32",
                        description: "Signal-to-noise ratio of the relayed information"
                    }
                ],
                activationState: 0.8,
                linkedModules: [
                    "cerebral-cortex",
                    "basal-ganglia",
                    "hippocampus"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "lgn",
                    name: "Lateral Geniculate Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Primary relay for visual information from the retina to the primary visual cortex (V1).",
                    functions: [
                        "visual relay"
                    ],
                    position3D: [
                        0.05,
                        0.13,
                        -0.07
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cerebral-cortex",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "visual cortex relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-lgn",
                        collection: "visual_relay",
                        role: "Visual Signal Router",
                        description: "Relays retinotopic visual information with attentional modulation to primary visual cortex.",
                        fields: [
                            {
                                name: "retinotopic_map",
                                type: "vec2",
                                description: "Spatial position in the visual field"
                            },
                            {
                                name: "magno_channel",
                                type: "float32",
                                description: "Motion/depth (magnocellular) channel strength"
                            },
                            {
                                name: "parvo_channel",
                                type: "float32",
                                description: "Color/detail (parvocellular) channel strength"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "cerebral-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "mgn",
                    name: "Medial Geniculate Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Relay station for auditory information from the inferior colliculus to the auditory cortex.",
                    functions: [
                        "auditory relay"
                    ],
                    position3D: [
                        -0.05,
                        0.13,
                        -0.06
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cerebral-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "auditory cortex relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-mgn",
                        collection: "auditory_relay",
                        role: "Auditory Signal Router",
                        description: "Relays tonotopically organized auditory signals to the primary auditory cortex.",
                        fields: [
                            {
                                name: "frequency_band",
                                type: "float32",
                                description: "Center frequency of the tonotopic channel"
                            },
                            {
                                name: "temporal_pattern",
                                type: "vec64",
                                description: "Temporal envelope of the auditory signal"
                            },
                            {
                                name: "spatial_cue",
                                type: "vec3",
                                description: "Interaural difference cues for sound localization"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "cerebral-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "vpl-nucleus",
                    name: "Ventral Posterolateral Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Relays somatosensory information from the body (touch, proprioception, pain) to the somatosensory cortex.",
                    functions: [
                        "body somatosensory relay"
                    ],
                    position3D: [
                        0.03,
                        0.16,
                        -0.03
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cerebral-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "somatosensory cortex relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-vpl",
                        collection: "somatosensory_relay",
                        role: "Body Sensation Router",
                        description: "Routes touch, proprioceptive, and pain signals from the body to cortical somatosensory areas.",
                        fields: [
                            {
                                name: "body_region",
                                type: "string",
                                description: "Somatotopic region of origin"
                            },
                            {
                                name: "modality",
                                type: "string",
                                description: "Sensation type: touch, pressure, temperature, pain, proprioception"
                            },
                            {
                                name: "intensity",
                                type: "float32",
                                description: "Signal intensity normalized to receptor range"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "cerebral-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "va-nucleus",
                    name: "Ventral Anterior Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Receives basal ganglia output and relays motor planning information to the premotor and supplementary motor cortex.",
                    functions: [
                        "motor planning relay"
                    ],
                    position3D: [
                        -0.03,
                        0.17,
                        -0.02
                    ],
                    color: "#fdba74",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "basal-ganglia",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "basal ganglia motor loop"
                        },
                        {
                            targetId: "cerebral-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "premotor cortex relay"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-va",
                        collection: "motor_planning_relay",
                        role: "Motor Plan Router",
                        description: "Relays basal ganglia gated motor plans to cortical premotor areas for execution preparation.",
                        fields: [
                            {
                                name: "motor_plan",
                                type: "vec128",
                                description: "Encoded motor plan from basal ganglia"
                            },
                            {
                                name: "go_signal_strength",
                                type: "float32",
                                description: "Disinhibition level from GPi"
                            },
                            {
                                name: "cortical_target",
                                type: "string",
                                description: "Specific premotor region receiving the plan"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "basal-ganglia",
                            "cerebral-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "pulvinar",
                    name: "Pulvinar",
                    level: "subregion",
                    category: "limbic",
                    description: "Largest thalamic nucleus in humans, critical for visual attention, salience detection, and coordinating cortical visual areas.",
                    functions: [
                        "visual attention"
                    ],
                    position3D: [
                        0.02,
                        0.14,
                        -0.08
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cerebral-cortex",
                            type: "modulatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "attentional modulation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-pulvinar",
                        collection: "visual_attention",
                        role: "Attentional Spotlight Controller",
                        description: "Coordinates visual attention by synchronizing cortical visual areas and suppressing distractors.",
                        fields: [
                            {
                                name: "attention_focus",
                                type: "vec2",
                                description: "Current spatial focus coordinates in visual field"
                            },
                            {
                                name: "salience_map",
                                type: "vec64",
                                description: "Compressed salience map of the visual scene"
                            },
                            {
                                name: "suppression_mask",
                                type: "vec64",
                                description: "Distractor suppression weights"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "cerebral-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "reticular-nucleus",
                    name: "Reticular Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Thin shell surrounding the thalamus that gates information flow through thalamic relay nuclei, acting as an attentional filter.",
                    functions: [
                        "thalamic gating",
                        "attention filtering"
                    ],
                    position3D: [
                        0,
                        0.18,
                        -0.04
                    ],
                    color: "#ea580c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "lgn",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "visual gate"
                        },
                        {
                            targetId: "mgn",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "auditory gate"
                        },
                        {
                            targetId: "vpl-nucleus",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "somatosensory gate"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-reticular-nucleus",
                        collection: "thalamic_gate",
                        role: "Selective Attention Filter",
                        description: "Selectively inhibits thalamic relay nuclei to filter information based on attentional priorities.",
                        fields: [
                            {
                                name: "gate_pattern",
                                type: "vec16",
                                description: "Per-nucleus gating weights across thalamic relays"
                            },
                            {
                                name: "cortical_feedback",
                                type: "vec64",
                                description: "Top-down attentional bias from prefrontal cortex"
                            },
                            {
                                name: "inhibition_strength",
                                type: "float32",
                                description: "Global inhibitory tone level"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "lgn",
                            "mgn",
                            "vpl-nucleus",
                            "pulvinar"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "mediodorsal-nucleus",
                    name: "Mediodorsal Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Reciprocally connected with the prefrontal cortex, relaying information critical for executive function, working memory, and planning.",
                    functions: [
                        "prefrontal cortex relay",
                        "executive function support"
                    ],
                    position3D: [
                        0,
                        0.16,
                        -0.06
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cerebral-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "prefrontal relay"
                        },
                        {
                            targetId: "amygdala",
                            type: "excitatory",
                            strength: 0.5,
                            signalType: "electrical",
                            label: "emotional context"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-mediodorsal",
                        collection: "executive_relay",
                        role: "Prefrontal Integration Hub",
                        description: "Integrates limbic, sensory, and motor information for relay to prefrontal cortex executive circuits.",
                        fields: [
                            {
                                name: "working_memory_buffer",
                                type: "vec256",
                                description: "Information currently held for prefrontal processing"
                            },
                            {
                                name: "limbic_context",
                                type: "vec64",
                                description: "Emotional/motivational context from amygdala and basal ganglia"
                            },
                            {
                                name: "executive_priority",
                                type: "float32",
                                description: "Priority weighting for prefrontal attention allocation"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "cerebral-cortex",
                            "amygdala"
                        ],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 5. Hypothalamus ─────────────────────────────────────────────
        {
            id: "hypothalamus",
            name: "Hypothalamus",
            level: "region",
            category: "limbic",
            description: "Master regulator of homeostasis controlling body temperature, hunger, thirst, circadian rhythms, and hormonal cascades via the pituitary gland.",
            functions: [
                "body temperature regulation",
                "hunger regulation",
                "thirst regulation",
                "hormone control",
                "circadian rhythm management"
            ],
            position3D: [
                0,
                -0.15,
                0.2
            ],
            scale3D: [
                0.2,
                0.15,
                0.15
            ],
            color: "#ea580c",
            signalType: "hormonal",
            connections: [
                {
                    targetId: "amygdala",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "chemical",
                    label: "stress/fear axis"
                },
                {
                    targetId: "hippocampus",
                    type: "modulatory",
                    strength: 0.4,
                    signalType: "hormonal",
                    label: "cortisol-memory modulation"
                },
                {
                    targetId: "brainstem",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "chemical",
                    label: "autonomic control"
                }
            ],
            schemaMapping: {
                id: "schema-hypothalamus",
                collection: "homeostasis_controller",
                role: "State Regulator",
                description: "Maintains homeostatic setpoints by integrating internal state sensors and driving corrective hormonal and autonomic outputs.",
                fields: [
                    {
                        name: "temperature_setpoint",
                        type: "float32",
                        description: "Target core body temperature in Celsius"
                    },
                    {
                        name: "energy_balance",
                        type: "float32",
                        description: "Net energy state (negative = deficit, positive = surplus)"
                    },
                    {
                        name: "hydration_level",
                        type: "float32",
                        description: "Blood osmolality proxy (0 = dehydrated, 1 = optimal)"
                    },
                    {
                        name: "hormonal_output",
                        type: "vec16",
                        description: "Release rates for hypothalamic hormones"
                    },
                    {
                        name: "circadian_phase",
                        type: "float32",
                        description: "Current phase in the 24-hour circadian cycle (0–2π)"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "amygdala",
                    "brainstem",
                    "pituitary-gland"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "suprachiasmatic-nucleus",
                    name: "Suprachiasmatic Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Master circadian clock that synchronizes all body rhythms to the light-dark cycle via retinal input.",
                    functions: [
                        "circadian rhythm master clock"
                    ],
                    position3D: [
                        0,
                        -0.13,
                        0.22
                    ],
                    color: "#f97316",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "preoptic-area",
                            type: "modulatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "sleep-wake drive"
                        },
                        {
                            targetId: "paraventricular-nucleus",
                            type: "modulatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "diurnal cortisol rhythm"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-scn",
                        collection: "circadian_clock",
                        role: "System Timer",
                        description: "Generates ~24-hour oscillatory signals that synchronize peripheral clocks throughout the body.",
                        fields: [
                            {
                                name: "clock_phase",
                                type: "float32",
                                description: "Current circadian phase (0–2π radians)"
                            },
                            {
                                name: "light_input",
                                type: "float32",
                                description: "Retinohypothalamic light intensity signal"
                            },
                            {
                                name: "period_length",
                                type: "float32",
                                description: "Intrinsic oscillation period in hours"
                            },
                            {
                                name: "entrainment_strength",
                                type: "float32",
                                description: "Coupling strength to the external light-dark cycle"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [
                            "preoptic-area",
                            "paraventricular-nucleus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "paraventricular-nucleus",
                    name: "Paraventricular Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Integrates stress signals and releases oxytocin and vasopressin, also driving the HPA axis cortisol cascade.",
                    functions: [
                        "stress response",
                        "oxytocin release",
                        "vasopressin release"
                    ],
                    position3D: [
                        0,
                        -0.14,
                        0.19
                    ],
                    color: "#c2410c",
                    signalType: "hormonal",
                    connections: [
                        {
                            targetId: "amygdala",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "stress feedback"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-pvn",
                        collection: "stress_response",
                        role: "HPA Axis Controller",
                        description: "Initiates the hypothalamic-pituitary-adrenal stress cascade and releases social-bonding neuropeptides.",
                        fields: [
                            {
                                name: "crh_release_rate",
                                type: "float32",
                                description: "Corticotropin-releasing hormone output level"
                            },
                            {
                                name: "oxytocin_level",
                                type: "float32",
                                description: "Oxytocin secretion rate for bonding/trust"
                            },
                            {
                                name: "vasopressin_level",
                                type: "float32",
                                description: "Vasopressin secretion rate for water retention and social behavior"
                            },
                            {
                                name: "stress_integral",
                                type: "float32",
                                description: "Cumulative stress load over recent time window"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "amygdala",
                            "suprachiasmatic-nucleus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "lateral-hypothalamus",
                    name: "Lateral Hypothalamus",
                    level: "subregion",
                    category: "limbic",
                    description: "Hunger and arousal center that produces orexin/hypocretin to promote wakefulness and feeding behavior.",
                    functions: [
                        "hunger drive",
                        "arousal"
                    ],
                    position3D: [
                        0.04,
                        -0.15,
                        0.21
                    ],
                    color: "#f97316",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "nucleus-accumbens",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "reward-hunger link"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-lateral-hypo",
                        collection: "hunger_arousal",
                        role: "Hunger-Arousal Driver",
                        description: "Generates hunger and wakefulness signals via orexin neurons to maintain energetic and arousal homeostasis.",
                        fields: [
                            {
                                name: "orexin_level",
                                type: "float32",
                                description: "Orexin/hypocretin output promoting wakefulness"
                            },
                            {
                                name: "hunger_signal",
                                type: "float32",
                                description: "Drive signal for food-seeking behavior"
                            },
                            {
                                name: "ghrelin_sensitivity",
                                type: "float32",
                                description: "Responsiveness to peripheral hunger hormone ghrelin"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "nucleus-accumbens",
                            "arcuate-nucleus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "ventromedial-hypothalamus",
                    name: "Ventromedial Hypothalamus",
                    level: "subregion",
                    category: "limbic",
                    description: "Satiety center that signals fullness and also mediates defensive/aggressive behavior in threatening contexts.",
                    functions: [
                        "satiety signaling",
                        "defensive behavior"
                    ],
                    position3D: [
                        -0.02,
                        -0.16,
                        0.19
                    ],
                    color: "#fb923c",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "lateral-hypothalamus",
                            type: "inhibitory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "satiety-hunger balance"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-vmh",
                        collection: "satiety_defense",
                        role: "Satiety and Defense Controller",
                        description: "Signals energy sufficiency to suppress feeding and coordinates defensive rage behavior under threat.",
                        fields: [
                            {
                                name: "satiety_level",
                                type: "float32",
                                description: "Fullness signal from metabolic state"
                            },
                            {
                                name: "leptin_sensitivity",
                                type: "float32",
                                description: "Responsiveness to adipose-derived leptin"
                            },
                            {
                                name: "defensive_activation",
                                type: "float32",
                                description: "Defensive/aggressive behavior activation level"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "lateral-hypothalamus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "arcuate-nucleus",
                    name: "Arcuate Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Appetite regulation center that senses blood-borne metabolic signals and controls growth hormone release.",
                    functions: [
                        "appetite regulation",
                        "growth hormone control"
                    ],
                    position3D: [
                        0,
                        -0.17,
                        0.2
                    ],
                    color: "#fb923c",
                    signalType: "hormonal",
                    connections: [
                        {
                            targetId: "lateral-hypothalamus",
                            type: "modulatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "orexigenic drive"
                        },
                        {
                            targetId: "ventromedial-hypothalamus",
                            type: "modulatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "anorexigenic signal"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-arcuate",
                        collection: "appetite_regulation",
                        role: "Metabolic Sensor Hub",
                        description: "Integrates peripheral metabolic signals (insulin, leptin, ghrelin) to balance orexigenic and anorexigenic drives.",
                        fields: [
                            {
                                name: "npy_agrp_output",
                                type: "float32",
                                description: "Orexigenic (hunger-promoting) neuropeptide output"
                            },
                            {
                                name: "pomc_output",
                                type: "float32",
                                description: "Anorexigenic (satiety-promoting) neuropeptide output"
                            },
                            {
                                name: "insulin_level",
                                type: "float32",
                                description: "Sensed circulating insulin concentration"
                            },
                            {
                                name: "growth_hormone_pulse",
                                type: "float32",
                                description: "Growth hormone releasing hormone output"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "lateral-hypothalamus",
                            "ventromedial-hypothalamus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "preoptic-area",
                    name: "Preoptic Area",
                    level: "subregion",
                    category: "limbic",
                    description: "Regulates body temperature through vasodilation/vasoconstriction and promotes sleep onset via GABAergic inhibition of arousal centers.",
                    functions: [
                        "thermoregulation",
                        "sleep onset"
                    ],
                    position3D: [
                        0.02,
                        -0.12,
                        0.22
                    ],
                    color: "#f97316",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "suprachiasmatic-nucleus",
                            type: "modulatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "sleep-circadian coupling"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-preoptic",
                        collection: "thermoregulation",
                        role: "Temperature and Sleep Controller",
                        description: "Compares core body temperature to setpoint and initiates compensatory responses; also gates sleep onset.",
                        fields: [
                            {
                                name: "core_temperature",
                                type: "float32",
                                description: "Sensed core body temperature"
                            },
                            {
                                name: "temp_error",
                                type: "float32",
                                description: "Deviation from temperature setpoint"
                            },
                            {
                                name: "sleep_pressure",
                                type: "float32",
                                description: "Accumulated adenosine-driven sleep need"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "suprachiasmatic-nucleus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "supraoptic-nucleus",
                    name: "Supraoptic Nucleus",
                    level: "subregion",
                    category: "limbic",
                    description: "Produces vasopressin (ADH) for water balance regulation, projecting to the posterior pituitary for systemic release.",
                    functions: [
                        "water balance",
                        "ADH release"
                    ],
                    position3D: [
                        0.03,
                        -0.13,
                        0.18
                    ],
                    color: "#fb923c",
                    signalType: "hormonal",
                    connections: [],
                    schemaMapping: {
                        id: "schema-supraoptic",
                        collection: "water_balance",
                        role: "Osmoregulation Controller",
                        description: "Senses blood osmolality and releases vasopressin to regulate kidney water reabsorption.",
                        fields: [
                            {
                                name: "osmolality",
                                type: "float32",
                                description: "Sensed blood osmolality in mOsm/kg"
                            },
                            {
                                name: "adh_release_rate",
                                type: "float32",
                                description: "Vasopressin release rate to posterior pituitary"
                            },
                            {
                                name: "blood_volume",
                                type: "float32",
                                description: "Baroreceptor-sensed blood volume signal"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "mammillary-bodies",
                    name: "Mammillary Bodies",
                    level: "subregion",
                    category: "limbic",
                    description: "Paired nuclei that relay hippocampal memory signals to the anterior thalamus, forming part of the Papez circuit for memory consolidation.",
                    functions: [
                        "memory consolidation relay"
                    ],
                    position3D: [
                        0,
                        -0.18,
                        0.17
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "hippocampus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Papez circuit"
                        },
                        {
                            targetId: "thalamus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "mammillothalamic tract"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-mammillary",
                        collection: "memory_relay",
                        role: "Memory Consolidation Relay",
                        description: "Relays hippocampal memory traces to the anterior thalamic nuclei as part of the Papez memory circuit.",
                        fields: [
                            {
                                name: "memory_trace",
                                type: "vec256",
                                description: "Hippocampal memory representation being relayed"
                            },
                            {
                                name: "trace_strength",
                                type: "float32",
                                description: "Signal strength of the memory trace"
                            },
                            {
                                name: "head_direction",
                                type: "float32",
                                description: "Head-direction signal component for spatial memory"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "hippocampus",
                            "thalamus"
                        ],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 6. Cingulate Cortex ─────────────────────────────────────────
        {
            id: "cingulate-cortex",
            name: "Cingulate Cortex",
            level: "region",
            category: "limbic",
            description: "Cortical band arching over the corpus callosum that bridges emotional processing with cognitive control, monitoring for errors and conflicts.",
            functions: [
                "emotion-cognition integration",
                "error detection",
                "conflict monitoring"
            ],
            position3D: [
                0,
                0.3,
                0
            ],
            scale3D: [
                0.3,
                0.08,
                0.35
            ],
            color: "#fb923c",
            signalType: "electrical",
            connections: [
                {
                    targetId: "cerebral-cortex",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "prefrontal engagement"
                },
                {
                    targetId: "amygdala",
                    type: "modulatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "emotion regulation"
                },
                {
                    targetId: "hippocampus",
                    type: "excitatory",
                    strength: 0.5,
                    signalType: "electrical",
                    label: "memory-guided behavior"
                }
            ],
            schemaMapping: {
                id: "schema-cingulate",
                collection: "conflict_monitor",
                role: "Error Detection System",
                description: "Detects conflicts between competing responses and signals the need for increased cognitive control.",
                fields: [
                    {
                        name: "conflict_signal",
                        type: "float32",
                        description: "Degree of detected response conflict"
                    },
                    {
                        name: "error_signal",
                        type: "float32",
                        description: "Error-related negativity when outcome mismatches expectation"
                    },
                    {
                        name: "control_demand",
                        type: "float32",
                        description: "Computed demand for increased cognitive control"
                    },
                    {
                        name: "pain_affect",
                        type: "float32",
                        description: "Affective component of pain perception"
                    }
                ],
                activationState: 0.65,
                linkedModules: [
                    "cerebral-cortex",
                    "amygdala",
                    "hippocampus"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "anterior-cingulate",
                    name: "Anterior Cingulate",
                    level: "subregion",
                    category: "limbic",
                    description: "Monitors for errors and response conflicts, signals when increased cognitive effort is needed, and processes the affective dimension of pain.",
                    functions: [
                        "error detection",
                        "conflict monitoring",
                        "pain perception"
                    ],
                    position3D: [
                        0,
                        0.32,
                        0.08
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cerebral-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "prefrontal control signal"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-acc",
                        collection: "error_detection",
                        role: "Conflict and Error Monitor",
                        description: "Detects mismatches between intended and actual outcomes and triggers adaptive control adjustments.",
                        fields: [
                            {
                                name: "error_rate",
                                type: "float32",
                                description: "Rate of detected prediction errors"
                            },
                            {
                                name: "conflict_level",
                                type: "float32",
                                description: "Intensity of response conflict"
                            },
                            {
                                name: "effort_allocation",
                                type: "float32",
                                description: "Demanded cognitive effort increase"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "cerebral-cortex"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "posterior-cingulate",
                    name: "Posterior Cingulate",
                    level: "subregion",
                    category: "limbic",
                    description: "Core hub of the default mode network, active during self-referential thought, autobiographical memory, and future planning.",
                    functions: [
                        "self-referential processing",
                        "memory retrieval"
                    ],
                    position3D: [
                        0,
                        0.28,
                        -0.08
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "hippocampus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "autobiographical retrieval"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-pcc",
                        collection: "self_reference",
                        role: "Self-Model Processor",
                        description: "Maintains the narrative self-model by integrating autobiographical memories with present context.",
                        fields: [
                            {
                                name: "self_relevance",
                                type: "float32",
                                description: "Degree of self-relevance of current processing"
                            },
                            {
                                name: "temporal_orientation",
                                type: "float32",
                                description: "Past (-1) to future (+1) orientation of thought"
                            },
                            {
                                name: "dmn_activation",
                                type: "float32",
                                description: "Default mode network engagement level"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "hippocampus"
                        ],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "midcingulate",
                    name: "Midcingulate",
                    level: "subregion",
                    category: "limbic",
                    description: "Integrates motor planning with decision-making under uncertainty, active when choosing between risky or effortful options.",
                    functions: [
                        "motor planning under uncertainty"
                    ],
                    position3D: [
                        0,
                        0.3,
                        0
                    ],
                    color: "#fb923c",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "basal-ganglia",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "effort-based decision"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-midcingulate",
                        collection: "effort_decision",
                        role: "Effort-Value Comparator",
                        description: "Weighs the expected effort cost against expected reward to guide action selection under uncertainty.",
                        fields: [
                            {
                                name: "effort_cost",
                                type: "float32",
                                description: "Estimated effort required for the action"
                            },
                            {
                                name: "expected_value",
                                type: "float32",
                                description: "Predicted reward for the action"
                            },
                            {
                                name: "uncertainty",
                                type: "float32",
                                description: "Decision uncertainty level"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "basal-ganglia",
                            "anterior-cingulate"
                        ],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 7. Corpus Callosum ──────────────────────────────────────────
        {
            id: "corpus-callosum",
            name: "Corpus Callosum",
            level: "region",
            category: "limbic",
            description: "Largest white-matter structure in the brain, connecting the left and right hemispheres with ~200 million axonal fibers for interhemispheric communication.",
            functions: [
                "interhemispheric communication",
                "bilateral coordination"
            ],
            position3D: [
                0,
                0.25,
                0
            ],
            scale3D: [
                0.15,
                0.04,
                0.4
            ],
            color: "#fdba74",
            signalType: "electrical",
            connections: [
                {
                    targetId: "cerebral-cortex",
                    type: "structural",
                    strength: 1.0,
                    signalType: "electrical",
                    label: "hemispheric bridge"
                }
            ],
            schemaMapping: {
                id: "schema-corpus-callosum",
                collection: "hemisphere_bridge",
                role: "Cross-System Bus",
                description: "Provides the primary communication bus between left and right hemisphere processing modules.",
                fields: [
                    {
                        name: "bandwidth",
                        type: "float32",
                        description: "Current cross-hemispheric transfer capacity"
                    },
                    {
                        name: "latency",
                        type: "float32",
                        description: "Interhemispheric transfer delay in milliseconds"
                    },
                    {
                        name: "left_to_right",
                        type: "vec512",
                        description: "Left hemisphere signals being transferred to right"
                    },
                    {
                        name: "right_to_left",
                        type: "vec512",
                        description: "Right hemisphere signals being transferred to left"
                    }
                ],
                activationState: 0.85,
                linkedModules: [
                    "cerebral-cortex"
                ],
                category: "limbic"
            },
            children: [
                {
                    id: "cc-genu",
                    name: "Genu",
                    level: "subregion",
                    category: "limbic",
                    description: "Anterior bend of the corpus callosum carrying fibers connecting the left and right prefrontal and frontal cortices.",
                    functions: [
                        "frontal lobe interhemispheric connection"
                    ],
                    position3D: [
                        0,
                        0.26,
                        0.15
                    ],
                    color: "#fed7aa",
                    signalType: "electrical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-cc-genu",
                        collection: "frontal_bridge",
                        role: "Frontal Lobe Cross-Connect",
                        description: "Transmits prefrontal and frontal lobe signals between hemispheres for bilateral executive coordination.",
                        fields: [
                            {
                                name: "frontal_sync",
                                type: "float32",
                                description: "Synchronization index between left and right frontal lobes"
                            },
                            {
                                name: "fiber_integrity",
                                type: "float32",
                                description: "White-matter integrity score (fractional anisotropy)"
                            },
                            {
                                name: "transfer_volume",
                                type: "float32",
                                description: "Data throughput through this segment"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "cc-body",
                    name: "Body",
                    level: "subregion",
                    category: "limbic",
                    description: "Central portion of the corpus callosum carrying fibers connecting parietal and temporal cortices between hemispheres.",
                    functions: [
                        "parietal/temporal interhemispheric connection"
                    ],
                    position3D: [
                        0,
                        0.25,
                        0
                    ],
                    color: "#fed7aa",
                    signalType: "electrical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-cc-body",
                        collection: "parietal_temporal_bridge",
                        role: "Parietal-Temporal Cross-Connect",
                        description: "Carries sensory and association fibers between hemispheres for unified perceptual experience.",
                        fields: [
                            {
                                name: "sensory_sync",
                                type: "float32",
                                description: "Cross-hemispheric sensory integration index"
                            },
                            {
                                name: "fiber_integrity",
                                type: "float32",
                                description: "White-matter integrity score"
                            },
                            {
                                name: "transfer_volume",
                                type: "float32",
                                description: "Data throughput through this segment"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [],
                        category: "limbic"
                    },
                    children: []
                },
                {
                    id: "cc-splenium",
                    name: "Splenium",
                    level: "subregion",
                    category: "limbic",
                    description: "Posterior end of the corpus callosum carrying fibers connecting occipital and posterior temporal cortices for bilateral visual processing.",
                    functions: [
                        "occipital/temporal interhemispheric connection"
                    ],
                    position3D: [
                        0,
                        0.24,
                        -0.15
                    ],
                    color: "#fed7aa",
                    signalType: "electrical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-cc-splenium",
                        collection: "occipital_bridge",
                        role: "Visual Cross-Connect",
                        description: "Unifies visual field representations across hemispheres for coherent bilateral vision.",
                        fields: [
                            {
                                name: "visual_sync",
                                type: "float32",
                                description: "Cross-hemispheric visual field integration index"
                            },
                            {
                                name: "fiber_integrity",
                                type: "float32",
                                description: "White-matter integrity score"
                            },
                            {
                                name: "transfer_volume",
                                type: "float32",
                                description: "Data throughput through this segment"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [],
                        category: "limbic"
                    },
                    children: []
                }
            ]
        },
        // ── 8. Fornix ───────────────────────────────────────────────────
        {
            id: "fornix",
            name: "Fornix",
            level: "region",
            category: "pathway",
            description: "Major white-matter tract that carries output from the hippocampus to the mammillary bodies and septal nuclei, forming the backbone of the Papez memory circuit.",
            functions: [
                "memory circuit pathway"
            ],
            position3D: [
                0,
                0.05,
                -0.02
            ],
            scale3D: [
                0.08,
                0.04,
                0.3
            ],
            color: "#fdba74",
            signalType: "electrical",
            connections: [
                {
                    targetId: "hippocampus",
                    type: "structural",
                    strength: 1.0,
                    signalType: "electrical",
                    label: "hippocampal origin"
                },
                {
                    targetId: "mammillary-bodies",
                    type: "structural",
                    strength: 1.0,
                    signalType: "electrical",
                    label: "mammillary body termination"
                }
            ],
            schemaMapping: {
                id: "schema-fornix",
                collection: "memory_pathway",
                role: "Hippocampal Output Fiber Bundle",
                description: "Structural pathway transmitting hippocampal memory signals to subcortical memory circuit nodes.",
                fields: [
                    {
                        name: "fiber_count",
                        type: "uint32",
                        description: "Estimated number of axonal fibers"
                    },
                    {
                        name: "conduction_velocity",
                        type: "float32",
                        description: "Average signal propagation speed in m/s"
                    },
                    {
                        name: "integrity_score",
                        type: "float32",
                        description: "Fractional anisotropy measure of tract health"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "hippocampus",
                    "mammillary-bodies"
                ],
                category: "pathway"
            },
            children: []
        },
        // ── 9. Stria Terminalis ─────────────────────────────────────────
        {
            id: "stria-terminalis",
            name: "Stria Terminalis",
            level: "region",
            category: "pathway",
            description: "Fiber bundle connecting the amygdala to the hypothalamus and septal nuclei, mediating sustained anxiety responses and slow-onset stress behaviors.",
            functions: [
                "anxiety pathway",
                "stress signaling"
            ],
            position3D: [
                -0.15,
                -0.1,
                0.1
            ],
            scale3D: [
                0.06,
                0.04,
                0.25
            ],
            color: "#fdba74",
            signalType: "chemical",
            connections: [
                {
                    targetId: "amygdala",
                    type: "structural",
                    strength: 1.0,
                    signalType: "chemical",
                    label: "amygdala origin"
                },
                {
                    targetId: "hypothalamus",
                    type: "structural",
                    strength: 1.0,
                    signalType: "chemical",
                    label: "hypothalamic termination"
                }
            ],
            schemaMapping: {
                id: "schema-stria-terminalis",
                collection: "anxiety_pathway",
                role: "Sustained Threat Relay",
                description: "Carries slow, sustained anxiety signals from the amygdala to hypothalamic stress effectors.",
                fields: [
                    {
                        name: "anxiety_level",
                        type: "float32",
                        description: "Sustained anxiety signal intensity"
                    },
                    {
                        name: "threat_ambiguity",
                        type: "float32",
                        description: "Degree of threat uncertainty triggering sustained response"
                    },
                    {
                        name: "crh_modulation",
                        type: "float32",
                        description: "Modulation of hypothalamic CRH release"
                    }
                ],
                activationState: 0.45,
                linkedModules: [
                    "amygdala",
                    "hypothalamus"
                ],
                category: "pathway"
            },
            children: []
        },
        // ── 10. Insula ──────────────────────────────────────────────────
        {
            id: "insula",
            name: "Insula",
            level: "region",
            category: "limbic",
            description: "Cortical region buried within the lateral sulcus that integrates interoceptive signals from the body, generating conscious awareness of internal states, disgust, empathy, and embodied self-awareness.",
            functions: [
                "interoception",
                "disgust processing",
                "empathy",
                "body awareness"
            ],
            position3D: [
                0.3,
                0,
                0.1
            ],
            scale3D: [
                0.08,
                0.2,
                0.2
            ],
            color: "#ea580c",
            signalType: "electrical",
            connections: [
                {
                    targetId: "amygdala",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "visceral-emotional link"
                },
                {
                    targetId: "anterior-cingulate",
                    type: "excitatory",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "salience network"
                },
                {
                    targetId: "hypothalamus",
                    type: "modulatory",
                    strength: 0.5,
                    signalType: "chemical",
                    label: "body state feedback"
                }
            ],
            schemaMapping: {
                id: "schema-insula",
                collection: "body_state_monitor",
                role: "Interoceptive Encoder",
                description: "Encodes visceral and somatic signals into conscious body-state representations for homeostatic awareness.",
                fields: [
                    {
                        name: "heartbeat_signal",
                        type: "float32",
                        description: "Cardiac interoceptive signal strength"
                    },
                    {
                        name: "gut_state",
                        type: "float32",
                        description: "Visceral state signal from enteric nervous system"
                    },
                    {
                        name: "pain_intensity",
                        type: "float32",
                        description: "Current pain signal intensity"
                    },
                    {
                        name: "disgust_level",
                        type: "float32",
                        description: "Disgust response activation"
                    },
                    {
                        name: "empathy_resonance",
                        type: "float32",
                        description: "Empathic mirroring of another's body state"
                    }
                ],
                activationState: 0.6,
                linkedModules: [
                    "amygdala",
                    "anterior-cingulate",
                    "hypothalamus"
                ],
                category: "limbic"
            },
            children: []
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/autonomic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autonomicSystem",
    ()=>autonomicSystem
]);
const autonomicSystem = {
    id: "autonomic-nervous-system",
    name: "Autonomic Nervous System",
    level: "system",
    category: "autonomic",
    description: "The involuntary control system regulating visceral functions including heart rate, digestion, respiratory rate, pupillary response, urination, and sexual arousal. Operates below conscious awareness to maintain homeostasis.",
    functions: [
        "Regulate heart rate and blood pressure",
        "Control digestion and metabolism",
        "Manage fight-or-flight response",
        "Maintain rest-and-digest state",
        "Regulate pupil dilation and constriction",
        "Control bronchial smooth muscle",
        "Modulate glandular secretions"
    ],
    position3D: [
        0,
        0,
        0.5
    ],
    scale3D: [
        1.2,
        1.2,
        1.2
    ],
    color: "#22c55e",
    signalType: "chemical",
    connections: [
        {
            targetId: "brainstem",
            type: "structural",
            strength: 0.95,
            signalType: "electrical",
            label: "Central autonomic control"
        },
        {
            targetId: "hypothalamus",
            type: "modulatory",
            strength: 0.9,
            signalType: "chemical",
            label: "Hypothalamic regulation"
        },
        {
            targetId: "spinal-cord",
            type: "structural",
            strength: 0.85,
            signalType: "electrical",
            label: "Preganglionic outflow"
        }
    ],
    schemaMapping: {
        id: "schema-autonomic-engine",
        collection: "autonomic_engine",
        role: "Background Process Manager",
        description: "Manages all involuntary background processes that maintain system homeostasis without requiring conscious executive input.",
        fields: [
            {
                name: "target_organ",
                type: "string",
                description: "Organ or tissue being regulated"
            },
            {
                name: "activation_level",
                type: "float",
                description: "Current autonomic drive (0-1)"
            },
            {
                name: "balance_ratio",
                type: "float",
                description: "Sympathetic/parasympathetic balance"
            },
            {
                name: "homeostatic_setpoint",
                type: "float",
                description: "Target equilibrium value"
            }
        ],
        activationState: 1.0,
        linkedModules: [
            "brainstem_controller",
            "hypothalamic_regulator",
            "spinal_relay"
        ],
        category: "autonomic"
    },
    children: [
        {
            id: "sympathetic-division",
            name: "Sympathetic Division",
            level: "region",
            category: "autonomic",
            description: "The fight-or-flight arm of the autonomic nervous system. Originates from thoracolumbar spinal cord (T1-L2), prepares the body for intense physical activity by increasing heart rate, dilating pupils, inhibiting digestion, and mobilizing energy stores.",
            functions: [
                "Trigger fight-or-flight response",
                "Increase heart rate and contractility",
                "Dilate bronchi for increased airflow",
                "Redirect blood flow to skeletal muscles",
                "Stimulate adrenaline release",
                "Inhibit digestive activity",
                "Dilate pupils for enhanced vision"
            ],
            position3D: [
                0.3,
                0,
                0.5
            ],
            color: "#ef4444",
            signalType: "chemical",
            connections: [
                {
                    targetId: "parasympathetic-division",
                    type: "inhibitory",
                    strength: 0.8,
                    signalType: "chemical",
                    label: "Reciprocal inhibition"
                },
                {
                    targetId: "adrenal-medulla-connection",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "chemical",
                    label: "Adrenal activation"
                }
            ],
            schemaMapping: {
                id: "schema-activation-signals",
                collection: "activation_signals",
                role: "Emergency Response System",
                description: "High-priority activation pathway that overrides normal operations to mobilize all resources for threat response.",
                fields: [
                    {
                        name: "threat_level",
                        type: "float",
                        description: "Detected threat magnitude (0-1)"
                    },
                    {
                        name: "response_intensity",
                        type: "float",
                        description: "Sympathetic output level"
                    },
                    {
                        name: "target_systems",
                        type: "string[]",
                        description: "Systems being activated"
                    },
                    {
                        name: "norepinephrine_level",
                        type: "float",
                        description: "Postganglionic NE release"
                    }
                ],
                activationState: 0.3,
                linkedModules: [
                    "cardiac_accelerator",
                    "bronchodilator",
                    "vasomotor_center"
                ],
                category: "autonomic"
            },
            children: [
                {
                    id: "sympathetic-chain-ganglia",
                    name: "Sympathetic Chain Ganglia",
                    level: "subregion",
                    category: "autonomic",
                    description: "Paravertebral chain of ganglia running alongside the spinal column from cervical to sacral levels. Preganglionic neurons synapse here before postganglionic fibers innervate target organs.",
                    functions: [
                        "Relay preganglionic sympathetic signals",
                        "Distribute sympathetic innervation to multiple segments",
                        "Provide bilateral sympathetic outflow",
                        "Enable divergent activation of multiple targets"
                    ],
                    position3D: [
                        0.25,
                        0.1,
                        0.5
                    ],
                    color: "#ef4444",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "spinal-cord",
                            type: "structural",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Preganglionic input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-sympathetic-chain",
                        collection: "activation_signals",
                        role: "Signal Distribution Hub",
                        description: "Relay station that fans out emergency signals across multiple body segments.",
                        fields: [
                            {
                                name: "segment_level",
                                type: "string",
                                description: "Spinal level (T1-L2)"
                            },
                            {
                                name: "ganglion_activity",
                                type: "float",
                                description: "Synaptic throughput"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "spinal_preganglionic",
                            "postganglionic_fibers"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.05,
                                0.4,
                                0.5
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.1,
                                0.2,
                                0.5
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.15,
                                0.0,
                                0.5
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.2,
                                -0.2,
                                0.5
                            ],
                            radius: 0.01
                        }
                    ]
                },
                {
                    id: "cardiac-sympathetic-nerves",
                    name: "Cardiac Sympathetic Nerves",
                    level: "subregion",
                    category: "autonomic",
                    description: "Postganglionic sympathetic fibers from the stellate ganglion and upper thoracic ganglia that innervate the heart. Increase heart rate (chronotropy), contractility (inotropy), and conduction velocity (dromotropy).",
                    functions: [
                        "Increase heart rate via SA node stimulation",
                        "Enhance myocardial contractility",
                        "Accelerate AV conduction velocity",
                        "Promote coronary vasodilation during exercise"
                    ],
                    position3D: [
                        0.2,
                        0.05,
                        0.4
                    ],
                    color: "#ef4444",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "sa-node",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "Norepinephrine -> beta-1 receptors"
                        },
                        {
                            targetId: "av-node",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "chemical",
                            label: "Conduction acceleration"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-cardiac-sympathetic",
                        collection: "activation_signals",
                        role: "Cardiac Accelerator",
                        description: "Direct excitatory line to heart pacemaker and myocardium for rate and force increase.",
                        fields: [
                            {
                                name: "heart_rate_delta",
                                type: "float",
                                description: "Change in heart rate (bpm)"
                            },
                            {
                                name: "contractility_delta",
                                type: "float",
                                description: "Change in contractile force"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "sa_node_controller",
                            "myocardial_contractility"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.15,
                                0.2,
                                0.5
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.12,
                                0.1,
                                0.45
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.08,
                                0.05,
                                0.4
                            ],
                            radius: 0.012
                        }
                    ]
                },
                {
                    id: "splanchnic-nerves",
                    name: "Splanchnic Nerves",
                    level: "subregion",
                    category: "autonomic",
                    description: "Greater, lesser, and least splanchnic nerves carrying preganglionic sympathetic fibers to abdominal organs. Cause vasoconstriction of gut vasculature and inhibit digestive processes during sympathetic activation.",
                    functions: [
                        "Constrict gut blood vessels during stress",
                        "Inhibit GI motility and secretion",
                        "Redirect blood flow from splanchnic bed to muscles",
                        "Relay visceral pain afferents"
                    ],
                    position3D: [
                        0.25,
                        -0.05,
                        0.45
                    ],
                    color: "#ef4444",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "enteric-nervous-system",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "GI inhibition during stress"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-splanchnic",
                        collection: "activation_signals",
                        role: "Gut Vasoconstrictor",
                        description: "Diverts blood flow from digestive organs to priority systems during stress activation.",
                        fields: [
                            {
                                name: "vasoconstriction_level",
                                type: "float",
                                description: "Degree of gut vessel constriction"
                            },
                            {
                                name: "gi_inhibition",
                                type: "float",
                                description: "Suppression of digestive activity"
                            }
                        ],
                        activationState: 0.2,
                        linkedModules: [
                            "gut_vasculature",
                            "mesenteric_plexus"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.15,
                                0.1,
                                0.5
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.2,
                                0.0,
                                0.48
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.25,
                                -0.1,
                                0.45
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                0.2,
                                -0.2,
                                0.4
                            ],
                            radius: 0.01
                        }
                    ]
                },
                {
                    id: "adrenal-medulla-connection",
                    name: "Adrenal Medulla Connection",
                    level: "subregion",
                    category: "autonomic",
                    description: "Direct preganglionic sympathetic innervation of the adrenal medulla (modified ganglion). Triggers release of epinephrine (80%) and norepinephrine (20%) into the bloodstream for systemic fight-or-flight amplification.",
                    functions: [
                        "Trigger systemic adrenaline release",
                        "Amplify sympathetic response via bloodstream",
                        "Mobilize glucose from liver glycogen",
                        "Sustain prolonged fight-or-flight state"
                    ],
                    position3D: [
                        0.3,
                        -0.1,
                        0.45
                    ],
                    color: "#ef4444",
                    signalType: "hormonal",
                    connections: [
                        {
                            targetId: "sympathetic-division",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "chemical",
                            label: "Preganglionic ACh to chromaffin cells"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-adrenal-medulla",
                        collection: "activation_signals",
                        role: "Adrenaline Release Trigger",
                        description: "Converts localized neural signal to system-wide hormonal broadcast for sustained emergency response.",
                        fields: [
                            {
                                name: "epinephrine_level",
                                type: "float",
                                description: "Circulating adrenaline concentration"
                            },
                            {
                                name: "norepinephrine_level",
                                type: "float",
                                description: "Circulating noradrenaline concentration"
                            },
                            {
                                name: "release_duration",
                                type: "float",
                                description: "Duration of hormonal surge (seconds)"
                            }
                        ],
                        activationState: 0.15,
                        linkedModules: [
                            "adrenal_gland",
                            "hepatic_glycogenolysis",
                            "systemic_vasculature"
                        ],
                        category: "endocrine"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.2,
                                0.0,
                                0.5
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.25,
                                -0.05,
                                0.48
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.3,
                                -0.15,
                                0.45
                            ],
                            radius: 0.015
                        }
                    ]
                },
                {
                    id: "pupil-dilator-pathway",
                    name: "Pupil Dilator Pathway",
                    level: "circuit",
                    category: "autonomic",
                    description: "Sympathetic pathway from hypothalamus through ciliospinal center (C8-T2), superior cervical ganglion, and long ciliary nerves to the dilator pupillae muscle. Dilates pupils during sympathetic arousal.",
                    functions: [
                        "Dilate pupils in low light or arousal",
                        "Increase visual field sensitivity",
                        "Contract dilator pupillae muscle via alpha-1 receptors"
                    ],
                    position3D: [
                        0.15,
                        0.25,
                        0.35
                    ],
                    color: "#ef4444",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "oculomotor-parasympathetic",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "Antagonizes pupil constriction"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-pupil-dilator",
                        collection: "activation_signals",
                        role: "Visual Aperture Opener",
                        description: "Widens the optical aperture to maximize light intake during threat detection.",
                        fields: [
                            {
                                name: "dilation_level",
                                type: "float",
                                description: "Pupil diameter (mm)"
                            },
                            {
                                name: "light_sensitivity",
                                type: "float",
                                description: "Retinal exposure factor"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "superior_cervical_ganglion",
                            "dilator_pupillae"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.0,
                                0.3,
                                0.4
                            ],
                            radius: 0.005
                        },
                        {
                            position: [
                                0.05,
                                0.28,
                                0.38
                            ],
                            radius: 0.006
                        },
                        {
                            position: [
                                0.1,
                                0.26,
                                0.36
                            ],
                            radius: 0.006
                        },
                        {
                            position: [
                                0.15,
                                0.25,
                                0.35
                            ],
                            radius: 0.005
                        }
                    ]
                },
                {
                    id: "bronchodilation-pathway",
                    name: "Bronchodilation Pathway",
                    level: "circuit",
                    category: "autonomic",
                    description: "Sympathetic pathway mediating bronchial smooth muscle relaxation via beta-2 adrenergic receptors. Primarily driven by circulating epinephrine from adrenal medulla rather than direct sympathetic innervation.",
                    functions: [
                        "Relax bronchial smooth muscle",
                        "Increase airway diameter for enhanced airflow",
                        "Facilitate increased oxygen intake during exertion"
                    ],
                    position3D: [
                        0.2,
                        0.1,
                        0.4
                    ],
                    color: "#ef4444",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "adrenal-medulla-connection",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "hormonal",
                            label: "Circulating epinephrine on beta-2 receptors"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-bronchodilation",
                        collection: "activation_signals",
                        role: "Airway Expander",
                        description: "Opens respiratory passages to maximize gas exchange during high-demand states.",
                        fields: [
                            {
                                name: "bronchial_diameter",
                                type: "float",
                                description: "Airway caliber (mm)"
                            },
                            {
                                name: "airflow_rate",
                                type: "float",
                                description: "Liters per minute capacity"
                            }
                        ],
                        activationState: 0.25,
                        linkedModules: [
                            "bronchial_smooth_muscle",
                            "adrenal_epinephrine"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.25,
                                0.0,
                                0.45
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.22,
                                0.05,
                                0.42
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.18,
                                0.1,
                                0.4
                            ],
                            radius: 0.012
                        }
                    ]
                }
            ]
        },
        {
            id: "parasympathetic-division",
            name: "Parasympathetic Division",
            level: "region",
            category: "autonomic",
            description: "The rest-and-digest arm of the autonomic nervous system. Originates from cranial nerves (III, VII, IX, X) and sacral spinal cord (S2-S4). Conserves energy, promotes digestion, slows heart rate, and supports restorative functions.",
            functions: [
                "Slow heart rate to resting levels",
                "Stimulate digestive secretions and motility",
                "Constrict pupils for near vision",
                "Promote urination and defecation",
                "Stimulate salivation and lacrimation",
                "Constrict bronchi at rest",
                "Support sexual arousal"
            ],
            position3D: [
                -0.3,
                0,
                0.5
            ],
            color: "#3b82f6",
            signalType: "chemical",
            connections: [
                {
                    targetId: "sympathetic-division",
                    type: "inhibitory",
                    strength: 0.8,
                    signalType: "chemical",
                    label: "Reciprocal inhibition"
                },
                {
                    targetId: "enteric-nervous-system",
                    type: "excitatory",
                    strength: 0.75,
                    signalType: "chemical",
                    label: "GI stimulation"
                }
            ],
            schemaMapping: {
                id: "schema-restoration-signals",
                collection: "restoration_signals",
                role: "Recovery/Conservation System",
                description: "Energy conservation and tissue repair pathway that activates during safe, low-threat states to restore system resources.",
                fields: [
                    {
                        name: "recovery_mode",
                        type: "boolean",
                        description: "Whether rest-and-digest is dominant"
                    },
                    {
                        name: "vagal_tone",
                        type: "float",
                        description: "Baseline parasympathetic drive (0-1)"
                    },
                    {
                        name: "digestive_activity",
                        type: "float",
                        description: "GI processing level"
                    },
                    {
                        name: "acetylcholine_level",
                        type: "float",
                        description: "Postganglionic ACh release"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "vagal_complex",
                    "sacral_outflow",
                    "cranial_parasympathetics"
                ],
                category: "autonomic"
            },
            children: [
                {
                    id: "vagus-nerve",
                    name: "Vagus Nerve (CN X)",
                    level: "subregion",
                    category: "autonomic",
                    description: "The longest cranial nerve, providing parasympathetic innervation to heart, lungs, and most of the GI tract. The major parasympathetic pathway carrying ~75% of all parasympathetic fibers. Also carries sensory and motor fibers.",
                    functions: [
                        "Slow heart rate via cardiac branches",
                        "Constrict bronchi via pulmonary branches",
                        "Stimulate gastric acid and motility",
                        "Regulate liver and gallbladder function",
                        "Mediate anti-inflammatory reflex",
                        "Carry visceral sensory information to brainstem"
                    ],
                    position3D: [
                        -0.15,
                        0.1,
                        0.35
                    ],
                    color: "#3b82f6",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "sa-node",
                            type: "inhibitory",
                            strength: 0.85,
                            signalType: "chemical",
                            label: "ACh -> M2 receptors slowing SA node"
                        },
                        {
                            targetId: "enteric-nervous-system",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "GI motility stimulation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-global-state-modifier",
                        collection: "global_state_modifier",
                        role: "System-Wide Modulator",
                        description: "A single long-range communication bus that touches nearly every major subsystem, modulating global system state toward conservation and recovery.",
                        fields: [
                            {
                                name: "vagal_tone_index",
                                type: "float",
                                description: "Heart rate variability proxy (0-1)"
                            },
                            {
                                name: "afferent_load",
                                type: "float",
                                description: "Sensory information volume from organs"
                            },
                            {
                                name: "efferent_output",
                                type: "float",
                                description: "Motor command output to organs"
                            },
                            {
                                name: "inflammatory_suppression",
                                type: "float",
                                description: "Anti-inflammatory reflex strength"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "nucleus_tractus_solitarius",
                            "dorsal_motor_nucleus",
                            "nucleus_ambiguus"
                        ],
                        category: "autonomic"
                    },
                    children: [
                        {
                            id: "vagus-cardiac-branch",
                            name: "Cardiac Branch of Vagus",
                            level: "circuit",
                            category: "autonomic",
                            description: "Parasympathetic fibers from the vagus that innervate the SA and AV nodes. Release acetylcholine to slow heart rate and reduce conduction velocity.",
                            functions: [
                                "Reduce heart rate via SA node inhibition",
                                "Slow AV conduction to lengthen diastolic filling",
                                "Maintain resting cardiac vagal tone"
                            ],
                            position3D: [
                                -0.1,
                                0.05,
                                0.35
                            ],
                            color: "#3b82f6",
                            signalType: "chemical",
                            connections: [
                                {
                                    targetId: "sa-node",
                                    type: "inhibitory",
                                    strength: 0.9,
                                    signalType: "chemical",
                                    label: "ACh slows pacemaker firing"
                                },
                                {
                                    targetId: "cardiac-sympathetic-nerves",
                                    type: "inhibitory",
                                    strength: 0.7,
                                    signalType: "chemical",
                                    label: "Opposes sympathetic cardiac drive"
                                }
                            ],
                            schemaMapping: {
                                id: "schema-vagus-cardiac",
                                collection: "global_state_modifier",
                                role: "Heart Rate Governor",
                                description: "Braking mechanism on cardiac pacemaker, dominant at rest to maintain low energy expenditure.",
                                fields: [
                                    {
                                        name: "heart_rate_suppression",
                                        type: "float",
                                        description: "Beats per minute reduction"
                                    },
                                    {
                                        name: "ach_release_rate",
                                        type: "float",
                                        description: "Acetylcholine output at SA/AV"
                                    }
                                ],
                                activationState: 0.8,
                                linkedModules: [
                                    "sa_node_controller",
                                    "av_node_delay"
                                ],
                                category: "autonomic"
                            },
                            children: [],
                            pathway: [
                                {
                                    position: [
                                        -0.05,
                                        0.2,
                                        0.35
                                    ],
                                    radius: 0.006
                                },
                                {
                                    position: [
                                        -0.08,
                                        0.12,
                                        0.35
                                    ],
                                    radius: 0.008
                                },
                                {
                                    position: [
                                        -0.1,
                                        0.05,
                                        0.35
                                    ],
                                    radius: 0.008
                                }
                            ]
                        },
                        {
                            id: "vagus-pulmonary-branch",
                            name: "Pulmonary Branch of Vagus",
                            level: "circuit",
                            category: "autonomic",
                            description: "Vagal fibers to the bronchial tree and pulmonary vasculature. Cause bronchoconstriction and increased mucus secretion at rest.",
                            functions: [
                                "Constrict bronchial smooth muscle at rest",
                                "Increase bronchial mucus secretion",
                                "Regulate pulmonary vascular tone"
                            ],
                            position3D: [
                                -0.12,
                                0.08,
                                0.38
                            ],
                            color: "#3b82f6",
                            signalType: "chemical",
                            connections: [
                                {
                                    targetId: "bronchodilation-pathway",
                                    type: "inhibitory",
                                    strength: 0.65,
                                    signalType: "chemical",
                                    label: "Opposes sympathetic bronchodilation"
                                }
                            ],
                            schemaMapping: {
                                id: "schema-vagus-pulmonary",
                                collection: "global_state_modifier",
                                role: "Airway Constrictor",
                                description: "Maintains resting airway tone and secretion to protect and maintain respiratory passages.",
                                fields: [
                                    {
                                        name: "bronchial_tone",
                                        type: "float",
                                        description: "Resting constriction level"
                                    },
                                    {
                                        name: "mucus_secretion",
                                        type: "float",
                                        description: "Mucus production rate"
                                    }
                                ],
                                activationState: 0.6,
                                linkedModules: [
                                    "bronchial_smooth_muscle",
                                    "submucosal_glands"
                                ],
                                category: "autonomic"
                            },
                            children: [],
                            pathway: [
                                {
                                    position: [
                                        -0.05,
                                        0.2,
                                        0.36
                                    ],
                                    radius: 0.005
                                },
                                {
                                    position: [
                                        -0.08,
                                        0.14,
                                        0.37
                                    ],
                                    radius: 0.006
                                },
                                {
                                    position: [
                                        -0.12,
                                        0.08,
                                        0.38
                                    ],
                                    radius: 0.007
                                }
                            ]
                        },
                        {
                            id: "vagus-gastric-branch",
                            name: "Gastric Branch of Vagus",
                            level: "circuit",
                            category: "autonomic",
                            description: "Vagal fibers to the stomach stimulating gastric acid secretion, pepsinogen release, and gastric motility for digestion.",
                            functions: [
                                "Stimulate gastric acid (HCl) secretion",
                                "Promote pepsinogen release from chief cells",
                                "Increase gastric smooth muscle motility",
                                "Relax pyloric sphincter for gastric emptying"
                            ],
                            position3D: [
                                -0.15,
                                -0.05,
                                0.4
                            ],
                            color: "#3b82f6",
                            signalType: "chemical",
                            connections: [
                                {
                                    targetId: "myenteric-plexus",
                                    type: "excitatory",
                                    strength: 0.8,
                                    signalType: "chemical",
                                    label: "Stimulates enteric motility circuits"
                                }
                            ],
                            schemaMapping: {
                                id: "schema-vagus-gastric",
                                collection: "global_state_modifier",
                                role: "Digestive Activator",
                                description: "Initiates and sustains gastric digestive processes during rest-and-digest state.",
                                fields: [
                                    {
                                        name: "acid_secretion_rate",
                                        type: "float",
                                        description: "HCl production rate"
                                    },
                                    {
                                        name: "motility_level",
                                        type: "float",
                                        description: "Gastric churning intensity"
                                    }
                                ],
                                activationState: 0.65,
                                linkedModules: [
                                    "parietal_cells",
                                    "chief_cells",
                                    "gastric_smooth_muscle"
                                ],
                                category: "autonomic"
                            },
                            children: [],
                            pathway: [
                                {
                                    position: [
                                        -0.05,
                                        0.15,
                                        0.35
                                    ],
                                    radius: 0.005
                                },
                                {
                                    position: [
                                        -0.1,
                                        0.05,
                                        0.37
                                    ],
                                    radius: 0.007
                                },
                                {
                                    position: [
                                        -0.15,
                                        -0.05,
                                        0.4
                                    ],
                                    radius: 0.008
                                }
                            ]
                        },
                        {
                            id: "vagus-hepatic-branch",
                            name: "Hepatic Branch of Vagus",
                            level: "circuit",
                            category: "autonomic",
                            description: "Vagal fibers innervating the liver and gallbladder. Regulate bile release, hepatic glucose metabolism, and gallbladder contraction.",
                            functions: [
                                "Stimulate bile secretion from liver",
                                "Contract gallbladder for bile release",
                                "Modulate hepatic glucose storage and release",
                                "Sense hepatic metabolic state via afferents"
                            ],
                            position3D: [
                                -0.18,
                                -0.08,
                                0.42
                            ],
                            color: "#3b82f6",
                            signalType: "chemical",
                            connections: [
                                {
                                    targetId: "vagus-gastric-branch",
                                    type: "modulatory",
                                    strength: 0.5,
                                    signalType: "chemical",
                                    label: "Coordinates bile with gastric emptying"
                                }
                            ],
                            schemaMapping: {
                                id: "schema-vagus-hepatic",
                                collection: "global_state_modifier",
                                role: "Hepatobiliary Controller",
                                description: "Manages liver and gallbladder output in coordination with digestive demands.",
                                fields: [
                                    {
                                        name: "bile_flow_rate",
                                        type: "float",
                                        description: "Bile secretion volume"
                                    },
                                    {
                                        name: "glycogen_balance",
                                        type: "float",
                                        description: "Storage vs release state"
                                    }
                                ],
                                activationState: 0.55,
                                linkedModules: [
                                    "hepatocytes",
                                    "gallbladder_smooth_muscle"
                                ],
                                category: "autonomic"
                            },
                            children: [],
                            pathway: [
                                {
                                    position: [
                                        -0.08,
                                        0.1,
                                        0.36
                                    ],
                                    radius: 0.005
                                },
                                {
                                    position: [
                                        -0.12,
                                        0.02,
                                        0.38
                                    ],
                                    radius: 0.006
                                },
                                {
                                    position: [
                                        -0.18,
                                        -0.08,
                                        0.42
                                    ],
                                    radius: 0.007
                                }
                            ]
                        },
                        {
                            id: "vagus-celiac-branch",
                            name: "Celiac Branch of Vagus",
                            level: "circuit",
                            category: "autonomic",
                            description: "Vagal fibers reaching the celiac plexus to innervate the small intestine and proximal colon. Stimulates gut motility and enzyme secretion for nutrient absorption.",
                            functions: [
                                "Stimulate small intestine motility",
                                "Promote pancreatic enzyme secretion",
                                "Enhance nutrient absorption activity",
                                "Coordinate peristalsis via enteric neurons"
                            ],
                            position3D: [
                                -0.2,
                                -0.12,
                                0.42
                            ],
                            color: "#3b82f6",
                            signalType: "chemical",
                            connections: [
                                {
                                    targetId: "myenteric-plexus",
                                    type: "excitatory",
                                    strength: 0.75,
                                    signalType: "chemical",
                                    label: "Intestinal motility drive"
                                },
                                {
                                    targetId: "submucosal-plexus",
                                    type: "excitatory",
                                    strength: 0.7,
                                    signalType: "chemical",
                                    label: "Secretory stimulation"
                                }
                            ],
                            schemaMapping: {
                                id: "schema-vagus-celiac",
                                collection: "global_state_modifier",
                                role: "Intestinal Coordinator",
                                description: "Drives gut motility and secretion in the small intestine and proximal colon for nutrient processing.",
                                fields: [
                                    {
                                        name: "peristalsis_rate",
                                        type: "float",
                                        description: "Contractions per minute"
                                    },
                                    {
                                        name: "secretion_volume",
                                        type: "float",
                                        description: "Enzyme/fluid output"
                                    }
                                ],
                                activationState: 0.6,
                                linkedModules: [
                                    "celiac_ganglion",
                                    "intestinal_smooth_muscle",
                                    "pancreatic_acinar"
                                ],
                                category: "autonomic"
                            },
                            children: [],
                            pathway: [
                                {
                                    position: [
                                        -0.08,
                                        0.08,
                                        0.36
                                    ],
                                    radius: 0.005
                                },
                                {
                                    position: [
                                        -0.14,
                                        -0.02,
                                        0.39
                                    ],
                                    radius: 0.006
                                },
                                {
                                    position: [
                                        -0.2,
                                        -0.12,
                                        0.42
                                    ],
                                    radius: 0.007
                                }
                            ]
                        }
                    ],
                    pathway: [
                        {
                            position: [
                                0.0,
                                0.3,
                                0.3
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.05,
                                0.2,
                                0.32
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.1,
                                0.1,
                                0.34
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.15,
                                0.0,
                                0.36
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.2,
                                -0.15,
                                0.4
                            ],
                            radius: 0.01
                        }
                    ]
                },
                {
                    id: "oculomotor-parasympathetic",
                    name: "Oculomotor Parasympathetic",
                    level: "circuit",
                    category: "autonomic",
                    description: "Parasympathetic fibers traveling with CN III from the Edinger-Westphal nucleus to the ciliary ganglion, then to the sphincter pupillae and ciliary muscles. Controls pupil constriction (miosis) and lens accommodation.",
                    functions: [
                        "Constrict pupil for bright light adaptation",
                        "Accommodate lens for near vision",
                        "Mediate pupillary light reflex"
                    ],
                    position3D: [
                        -0.1,
                        0.25,
                        0.3
                    ],
                    color: "#3b82f6",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "pupil-dilator-pathway",
                            type: "inhibitory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "Antagonizes sympathetic dilation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-oculomotor-parasym",
                        collection: "restoration_signals",
                        role: "Visual Aperture Closer",
                        description: "Narrows the optical aperture for focused near vision and bright-light protection.",
                        fields: [
                            {
                                name: "pupil_constriction",
                                type: "float",
                                description: "Sphincter pupillae tone"
                            },
                            {
                                name: "lens_accommodation",
                                type: "float",
                                description: "Ciliary muscle curvature adjustment"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "edinger_westphal_nucleus",
                            "ciliary_ganglion"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.0,
                                0.25,
                                0.28
                            ],
                            radius: 0.004
                        },
                        {
                            position: [
                                -0.04,
                                0.25,
                                0.29
                            ],
                            radius: 0.005
                        },
                        {
                            position: [
                                -0.08,
                                0.25,
                                0.3
                            ],
                            radius: 0.005
                        }
                    ]
                },
                {
                    id: "sacral-parasympathetic",
                    name: "Sacral Parasympathetic",
                    level: "subregion",
                    category: "autonomic",
                    description: "Parasympathetic outflow from sacral spinal cord segments S2-S4 via pelvic splanchnic nerves. Innervates bladder, distal colon, rectum, and reproductive organs.",
                    functions: [
                        "Contract bladder detrusor for urination",
                        "Stimulate distal colon and rectal motility",
                        "Mediate erectile function",
                        "Promote vaginal lubrication",
                        "Relax internal urethral sphincter"
                    ],
                    position3D: [
                        -0.2,
                        -0.3,
                        0.5
                    ],
                    color: "#3b82f6",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "spinal-cord",
                            type: "structural",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "S2-S4 preganglionic outflow"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-sacral-parasym",
                        collection: "restoration_signals",
                        role: "Pelvic Organ Controller",
                        description: "Manages elimination and reproductive organ functions via sacral parasympathetic outflow.",
                        fields: [
                            {
                                name: "bladder_pressure",
                                type: "float",
                                description: "Detrusor contraction level"
                            },
                            {
                                name: "rectal_motility",
                                type: "float",
                                description: "Distal colon peristalsis"
                            },
                            {
                                name: "reproductive_state",
                                type: "float",
                                description: "Sexual arousal/function level"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "pelvic_ganglion",
                            "bladder_detrusor",
                            "distal_colon"
                        ],
                        category: "autonomic"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.0,
                                -0.2,
                                0.5
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                -0.1,
                                -0.25,
                                0.5
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.2,
                                -0.3,
                                0.5
                            ],
                            radius: 0.01
                        }
                    ]
                }
            ]
        },
        {
            id: "enteric-nervous-system",
            name: "Enteric Nervous System",
            level: "region",
            category: "autonomic",
            description: "The 'second brain' — an extensive mesh of 200-600 million neurons embedded in the gut wall, capable of autonomous function independent of CNS input. Contains sensory neurons, interneurons, and motor neurons organized into two major plexuses.",
            functions: [
                "Autonomously regulate gut motility",
                "Control gastrointestinal secretions",
                "Manage local blood flow in GI tract",
                "Process local sensory information",
                "Coordinate peristaltic reflex",
                "Produce ~95% of body's serotonin"
            ],
            position3D: [
                0,
                -0.2,
                0.5
            ],
            color: "#22c55e",
            signalType: "chemical",
            connections: [
                {
                    targetId: "vagus-nerve",
                    type: "modulatory",
                    strength: 0.7,
                    signalType: "chemical",
                    label: "Vagal modulation of enteric activity"
                },
                {
                    targetId: "sympathetic-division",
                    type: "modulatory",
                    strength: 0.5,
                    signalType: "chemical",
                    label: "Sympathetic inhibition of GI"
                }
            ],
            schemaMapping: {
                id: "schema-gut-processor",
                collection: "gut_processor",
                role: "Distributed Sub-Controller",
                description: "Self-contained processing network with its own sensory, integrative, and motor neurons — functions autonomously but accepts modulatory input from central systems.",
                fields: [
                    {
                        name: "neuron_count",
                        type: "int",
                        description: "Approx 200-600 million neurons"
                    },
                    {
                        name: "serotonin_production",
                        type: "float",
                        description: "~95% of body serotonin output"
                    },
                    {
                        name: "autonomous_mode",
                        type: "boolean",
                        description: "Operating independently of CNS"
                    },
                    {
                        name: "motility_pattern",
                        type: "string",
                        description: "Current peristaltic program"
                    }
                ],
                activationState: 0.8,
                linkedModules: [
                    "vagal_input",
                    "sympathetic_input",
                    "gut_microbiome"
                ],
                category: "autonomic"
            },
            children: [
                {
                    id: "myenteric-plexus",
                    name: "Myenteric Plexus (Auerbach's)",
                    level: "subregion",
                    category: "autonomic",
                    description: "Plexus located between the longitudinal and circular muscle layers of the gut wall. Primarily controls GI motility — peristalsis, segmentation, and migrating motor complex.",
                    functions: [
                        "Coordinate peristaltic contractions",
                        "Generate migrating motor complex (interdigestive)",
                        "Control segmentation movements for mixing",
                        "Regulate gut transit time"
                    ],
                    position3D: [
                        0.05,
                        -0.22,
                        0.5
                    ],
                    color: "#22c55e",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "submucosal-plexus",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "Coordinates motility with secretion"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-myenteric-plexus",
                        collection: "gut_processor",
                        role: "Motility Controller",
                        description: "Orchestrates rhythmic contractions of gut smooth muscle for propulsion and mixing of contents.",
                        fields: [
                            {
                                name: "contraction_frequency",
                                type: "float",
                                description: "Cycles per minute"
                            },
                            {
                                name: "contraction_amplitude",
                                type: "float",
                                description: "Force of peristaltic wave"
                            },
                            {
                                name: "propagation_velocity",
                                type: "float",
                                description: "Speed of peristaltic wave (cm/s)"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "circular_muscle",
                            "longitudinal_muscle",
                            "interstitial_cells_of_cajal"
                        ],
                        category: "autonomic"
                    },
                    children: []
                },
                {
                    id: "submucosal-plexus",
                    name: "Submucosal Plexus (Meissner's)",
                    level: "subregion",
                    category: "autonomic",
                    description: "Plexus located in the submucosal layer of the gut wall. Primarily controls GI secretion, absorption, and local blood flow. Detects luminal contents and adjusts secretory response.",
                    functions: [
                        "Regulate intestinal secretions (enzymes, mucus, fluid)",
                        "Control local blood flow to mucosa",
                        "Sense luminal chemical composition",
                        "Coordinate absorption processes"
                    ],
                    position3D: [
                        -0.05,
                        -0.22,
                        0.5
                    ],
                    color: "#22c55e",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "myenteric-plexus",
                            type: "excitatory",
                            strength: 0.65,
                            signalType: "chemical",
                            label: "Feeds sensory info to motility circuits"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-submucosal-plexus",
                        collection: "gut_processor",
                        role: "Secretion Controller",
                        description: "Regulates fluid, enzyme, and mucus output in response to luminal content detection.",
                        fields: [
                            {
                                name: "secretion_rate",
                                type: "float",
                                description: "mL/hour of digestive fluids"
                            },
                            {
                                name: "mucosal_blood_flow",
                                type: "float",
                                description: "Local perfusion rate"
                            },
                            {
                                name: "luminal_ph",
                                type: "float",
                                description: "Detected pH of gut contents"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "goblet_cells",
                            "enterocytes",
                            "mucosal_vasculature"
                        ],
                        category: "autonomic"
                    },
                    children: []
                }
            ]
        },
        {
            id: "hearts-intrinsic-system",
            name: "Heart's Intrinsic Conduction System",
            level: "region",
            category: "autonomic",
            description: "The heart's own electrical conduction system, capable of generating and propagating rhythmic impulses independent of external neural input. Ensures coordinated atrial and ventricular contraction for effective blood pumping.",
            functions: [
                "Generate intrinsic heart rhythm",
                "Coordinate atrial contraction",
                "Delay signal for ventricular filling",
                "Propagate rapid ventricular depolarization",
                "Maintain cardiac output even if denervated"
            ],
            position3D: [
                0,
                0.05,
                0.35
            ],
            color: "#f97316",
            signalType: "electrical",
            connections: [
                {
                    targetId: "vagus-cardiac-branch",
                    type: "modulatory",
                    strength: 0.85,
                    signalType: "chemical",
                    label: "Parasympathetic slowing"
                },
                {
                    targetId: "cardiac-sympathetic-nerves",
                    type: "modulatory",
                    strength: 0.85,
                    signalType: "chemical",
                    label: "Sympathetic acceleration"
                }
            ],
            schemaMapping: {
                id: "schema-cardiac-conduction",
                collection: "oscillation_generator",
                role: "Cardiac Rhythm Engine",
                description: "Self-sustaining oscillatory system that generates the heartbeat, modulated by autonomic inputs.",
                fields: [
                    {
                        name: "intrinsic_rate",
                        type: "float",
                        description: "Unmodulated firing rate (~100 bpm)"
                    },
                    {
                        name: "effective_rate",
                        type: "float",
                        description: "Final heart rate after autonomic modulation"
                    },
                    {
                        name: "conduction_integrity",
                        type: "float",
                        description: "Signal propagation health (0-1)"
                    }
                ],
                activationState: 1.0,
                linkedModules: [
                    "vagal_cardiac_input",
                    "sympathetic_cardiac_input"
                ],
                category: "autonomic"
            },
            children: [
                {
                    id: "sa-node",
                    name: "SA Node (Sinoatrial Node)",
                    level: "circuit",
                    category: "autonomic",
                    description: "The primary pacemaker of the heart, located in the right atrium. Spontaneously depolarizes at ~60-100 bpm, setting the intrinsic heart rate. Fastest automaticity wins — the SA node normally dominates.",
                    functions: [
                        "Generate primary heart rhythm (~60-100 bpm)",
                        "Initiate each cardiac cycle",
                        "Respond to autonomic modulation of rate",
                        "Set the dominant pacemaker frequency"
                    ],
                    position3D: [
                        0.05,
                        0.08,
                        0.33
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "av-node",
                            type: "excitatory",
                            strength: 1.0,
                            signalType: "electrical",
                            label: "Depolarization wave to AV node"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-sa-node",
                        collection: "oscillation_generator",
                        role: "Primary Clock Generator",
                        description: "The master oscillator that sets the fundamental rhythm for the entire cardiac system.",
                        fields: [
                            {
                                name: "firing_rate",
                                type: "float",
                                description: "Spontaneous depolarization rate (bpm)"
                            },
                            {
                                name: "threshold_voltage",
                                type: "float",
                                description: "Depolarization threshold (mV)"
                            },
                            {
                                name: "autonomic_modulation",
                                type: "float",
                                description: "Net autonomic influence (-1 to +1)"
                            }
                        ],
                        activationState: 1.0,
                        linkedModules: [
                            "atrial_myocardium",
                            "av_node"
                        ],
                        category: "autonomic"
                    },
                    children: []
                },
                {
                    id: "av-node",
                    name: "AV Node (Atrioventricular Node)",
                    level: "circuit",
                    category: "autonomic",
                    description: "Located at the junction of atria and ventricles. Introduces a ~120ms delay to allow complete atrial contraction before ventricular activation. Serves as backup pacemaker at ~40-60 bpm if SA node fails.",
                    functions: [
                        "Delay conduction for atrial emptying (~120ms)",
                        "Filter excessively rapid atrial impulses",
                        "Serve as backup pacemaker (40-60 bpm)",
                        "Gate signal transmission to ventricles"
                    ],
                    position3D: [
                        0.0,
                        0.04,
                        0.34
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "bundle-of-his",
                            type: "excitatory",
                            strength: 1.0,
                            signalType: "electrical",
                            label: "Delayed signal to His bundle"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-av-node",
                        collection: "oscillation_generator",
                        role: "Signal Delay Gate",
                        description: "Introduces critical timing delay between atrial and ventricular activation for optimal pumping efficiency.",
                        fields: [
                            {
                                name: "conduction_delay",
                                type: "float",
                                description: "Delay duration (ms, ~120)"
                            },
                            {
                                name: "backup_rate",
                                type: "float",
                                description: "Intrinsic firing if SA fails (bpm)"
                            },
                            {
                                name: "filtering_threshold",
                                type: "float",
                                description: "Max atrial rate passed through"
                            }
                        ],
                        activationState: 0.95,
                        linkedModules: [
                            "sa_node",
                            "bundle_of_his"
                        ],
                        category: "autonomic"
                    },
                    children: []
                },
                {
                    id: "bundle-of-his",
                    name: "Bundle of His",
                    level: "circuit",
                    category: "autonomic",
                    description: "The only electrical conduit between atria and ventricles, penetrating the fibrous skeleton of the heart. Splits into left and right bundle branches to deliver depolarization to respective ventricles.",
                    functions: [
                        "Conduct signal from AV node to ventricles",
                        "Split into left and right bundle branches",
                        "Bridge the electrically insulating cardiac skeleton",
                        "Serve as tertiary pacemaker (~25-40 bpm) if needed"
                    ],
                    position3D: [
                        0.0,
                        0.01,
                        0.34
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "purkinje-fibers",
                            type: "excitatory",
                            strength: 1.0,
                            signalType: "electrical",
                            label: "Rapid conduction to Purkinje network"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-bundle-his",
                        collection: "oscillation_generator",
                        role: "Ventricular Conduction Bridge",
                        description: "The sole electrical bridge between atrial and ventricular chambers, enabling coordinated pump action.",
                        fields: [
                            {
                                name: "conduction_velocity",
                                type: "float",
                                description: "Signal speed (m/s)"
                            },
                            {
                                name: "branch_integrity",
                                type: "boolean",
                                description: "Left and right branches intact"
                            }
                        ],
                        activationState: 0.95,
                        linkedModules: [
                            "av_node",
                            "purkinje_network"
                        ],
                        category: "autonomic"
                    },
                    children: []
                },
                {
                    id: "purkinje-fibers",
                    name: "Purkinje Fibers",
                    level: "circuit",
                    category: "autonomic",
                    description: "Specialized fast-conducting fibers (2-4 m/s) that distribute depolarization throughout the ventricular myocardium. Ensure near-simultaneous contraction of the entire ventricular wall for efficient ejection.",
                    functions: [
                        "Rapidly distribute depolarization across ventricles",
                        "Ensure synchronized ventricular contraction",
                        "Conduct at 2-4 m/s (fastest in the heart)",
                        "Enable efficient blood ejection from ventricles"
                    ],
                    position3D: [
                        0.0,
                        -0.03,
                        0.34
                    ],
                    color: "#f97316",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "bundle-of-his",
                            type: "structural",
                            strength: 1.0,
                            signalType: "electrical",
                            label: "Receives from bundle branches"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-purkinje",
                        collection: "oscillation_generator",
                        role: "Rapid Ventricular Activator",
                        description: "High-speed distribution network ensuring all ventricular muscle fibers contract in near-unison.",
                        fields: [
                            {
                                name: "conduction_velocity",
                                type: "float",
                                description: "2-4 m/s propagation speed"
                            },
                            {
                                name: "coverage_percent",
                                type: "float",
                                description: "Ventricular wall coverage"
                            },
                            {
                                name: "synchronization_index",
                                type: "float",
                                description: "Contraction uniformity (0-1)"
                            }
                        ],
                        activationState: 0.95,
                        linkedModules: [
                            "ventricular_myocardium",
                            "bundle_branches"
                        ],
                        category: "autonomic"
                    },
                    children: []
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/cranial-nerves.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cranialNerves",
    ()=>cranialNerves
]);
const cranialNerves = {
    id: "cranial-nerves",
    name: "Cranial Nerves",
    level: "system",
    category: "peripheral",
    description: "Twelve pairs of nerves emanating directly from the brain and brainstem, providing sensory, motor, and autonomic innervation to structures primarily in the head and neck. CN X (Vagus) extends into thorax and abdomen.",
    functions: [
        "Transmit sensory information from head and neck",
        "Control muscles of face, eyes, tongue, and pharynx",
        "Carry parasympathetic autonomic fibers",
        "Enable special senses: smell, vision, hearing, taste, balance",
        "Regulate visceral organ function via vagus"
    ],
    position3D: [
        0,
        -0.2,
        0.2
    ],
    scale3D: [
        1.0,
        1.0,
        1.0
    ],
    color: "#eab308",
    signalType: "electrical",
    connections: [
        {
            targetId: "brainstem",
            type: "structural",
            strength: 1.0,
            signalType: "electrical",
            label: "All cranial nerves attach to brainstem (except CN I & II)"
        },
        {
            targetId: "cerebral-cortex",
            type: "excitatory",
            strength: 0.8,
            signalType: "electrical",
            label: "Sensory relay to cortex via thalamus"
        }
    ],
    schemaMapping: {
        id: "schema-cranial-nerves",
        collection: "cranial_io_channels",
        role: "Head/Neck I/O Bus",
        description: "The primary input/output channels for the brain, providing direct sensory streams and motor command pathways for the head, neck, and major visceral organs.",
        fields: [
            {
                name: "nerve_number",
                type: "int",
                description: "Cranial nerve number (I-XII)"
            },
            {
                name: "modality",
                type: "string[]",
                description: "Functional modalities (sensory/motor/autonomic)"
            },
            {
                name: "laterality",
                type: "string",
                description: "Bilateral or unilateral distribution"
            }
        ],
        activationState: 0.85,
        linkedModules: [
            "brainstem_nuclei",
            "thalamic_relay",
            "cortical_targets"
        ],
        category: "peripheral"
    },
    children: [
        {
            id: "cn-i-olfactory",
            name: "CN I — Olfactory Nerve",
            level: "region",
            category: "peripheral",
            description: "Pure sensory nerve for smell. Unique among senses: projects directly to olfactory cortex and amygdala, bypassing the thalamus entirely. Olfactory receptor neurons regenerate throughout life.",
            functions: [
                "Detect airborne chemical odorants",
                "Transmit smell signals directly to olfactory cortex",
                "Project to amygdala for emotional odor processing",
                "Bypass thalamic relay (unique among senses)"
            ],
            position3D: [
                0,
                -0.05,
                0.15
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "olfactory-bulb",
                    type: "excitatory",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Olfactory receptor neurons to bulb"
                },
                {
                    targetId: "amygdala",
                    type: "excitatory",
                    strength: 0.7,
                    signalType: "electrical",
                    label: "Direct emotional scent processing"
                }
            ],
            schemaMapping: {
                id: "schema-olfactory-input",
                collection: "olfactory_input",
                role: "Direct Chemical Sensor",
                description: "Chemical detection channel that uniquely bypasses the thalamic gateway, feeding raw data to memory and emotion circuits.",
                fields: [
                    {
                        name: "odorant_profile",
                        type: "string[]",
                        description: "Detected chemical molecules"
                    },
                    {
                        name: "concentration",
                        type: "float",
                        description: "Odorant concentration in mucosa"
                    },
                    {
                        name: "receptor_type",
                        type: "string",
                        description: "Activated olfactory receptor class"
                    }
                ],
                activationState: 0.5,
                linkedModules: [
                    "olfactory_bulb",
                    "piriform_cortex",
                    "amygdala"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0,
                        -0.02,
                        0.1
                    ],
                    radius: 0.008
                },
                {
                    position: [
                        0,
                        -0.03,
                        0.12
                    ],
                    radius: 0.01
                },
                {
                    position: [
                        0,
                        -0.05,
                        0.15
                    ],
                    radius: 0.012
                }
            ]
        },
        {
            id: "cn-ii-optic",
            name: "CN II — Optic Nerve",
            level: "region",
            category: "peripheral",
            description: "Sensory nerve for vision carrying retinal ganglion cell axons from retina to lateral geniculate nucleus (LGN) of the thalamus. Technically a CNS tract (myelinated by oligodendrocytes). Partial decussation at optic chiasm.",
            functions: [
                "Carry visual information from retina to brain",
                "Partial decussation at optic chiasm for binocular vision",
                "Project to LGN of thalamus for conscious vision",
                "Send branches to superior colliculus for reflexes",
                "Input to pretectal nuclei for pupillary reflex"
            ],
            position3D: [
                0,
                -0.06,
                0.14
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "lgn-thalamus",
                    type: "excitatory",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Retinogeniculate projection"
                },
                {
                    targetId: "superior-colliculus",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Visual reflexes and saccades"
                }
            ],
            schemaMapping: {
                id: "schema-visual-input",
                collection: "visual_input",
                role: "Raw Visual Stream",
                description: "High-bandwidth visual data channel carrying preprocessed retinal output to thalamic and subcortical visual centers.",
                fields: [
                    {
                        name: "fiber_count",
                        type: "int",
                        description: "~1.2 million retinal ganglion axons"
                    },
                    {
                        name: "visual_field",
                        type: "string",
                        description: "Contralateral hemifield representation"
                    },
                    {
                        name: "acuity_map",
                        type: "float[]",
                        description: "Foveal vs peripheral resolution gradient"
                    }
                ],
                activationState: 0.9,
                linkedModules: [
                    "retina",
                    "optic_chiasm",
                    "lgn",
                    "primary_visual_cortex"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0,
                        -0.03,
                        0.08
                    ],
                    radius: 0.02
                },
                {
                    position: [
                        0,
                        -0.04,
                        0.1
                    ],
                    radius: 0.025
                },
                {
                    position: [
                        0,
                        -0.05,
                        0.13
                    ],
                    radius: 0.02
                },
                {
                    position: [
                        0,
                        -0.06,
                        0.16
                    ],
                    radius: 0.015
                },
                {
                    position: [
                        0,
                        -0.08,
                        0.2
                    ],
                    radius: 0.012
                }
            ]
        },
        {
            id: "cn-iii-oculomotor",
            name: "CN III — Oculomotor Nerve",
            level: "region",
            category: "peripheral",
            description: "Mixed motor and parasympathetic nerve controlling most extraocular muscles (superior/inferior/medial rectus, inferior oblique), lid elevation (levator palpebrae), and pupil constriction/lens accommodation via Edinger-Westphal nucleus.",
            functions: [
                "Move eye superiorly, inferiorly, and medially",
                "Elevate upper eyelid",
                "Constrict pupil (parasympathetic)",
                "Accommodate lens for near vision",
                "Converge eyes for binocular near vision"
            ],
            position3D: [
                0.02,
                -0.1,
                0.18
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "oculomotor-nucleus",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Motor nucleus in midbrain"
                },
                {
                    targetId: "edinger-westphal-nucleus",
                    type: "structural",
                    strength: 0.85,
                    signalType: "electrical",
                    label: "Parasympathetic nucleus"
                }
            ],
            schemaMapping: {
                id: "schema-oculomotor-channel",
                collection: "eye_motor_output",
                role: "Primary Eye Controller",
                description: "Main motor command channel for eye positioning, lid control, and pupillary/accommodation reflexes.",
                fields: [
                    {
                        name: "eye_position",
                        type: "float[]",
                        description: "Gaze vector [x, y, z]"
                    },
                    {
                        name: "lid_aperture",
                        type: "float",
                        description: "Upper lid elevation (mm)"
                    },
                    {
                        name: "pupil_diameter",
                        type: "float",
                        description: "Pupil size (mm)"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "midbrain_tectum",
                    "extraocular_muscles",
                    "ciliary_ganglion"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0,
                        -0.1,
                        0.22
                    ],
                    radius: 0.006
                },
                {
                    position: [
                        0.01,
                        -0.1,
                        0.2
                    ],
                    radius: 0.008
                },
                {
                    position: [
                        0.03,
                        -0.08,
                        0.16
                    ],
                    radius: 0.008
                },
                {
                    position: [
                        0.05,
                        -0.05,
                        0.12
                    ],
                    radius: 0.006
                }
            ]
        },
        {
            id: "cn-iv-trochlear",
            name: "CN IV — Trochlear Nerve",
            level: "region",
            category: "peripheral",
            description: "Pure motor nerve innervating the superior oblique muscle. The only cranial nerve that exits from the dorsal brainstem and fully decussates. Longest intracranial course of any cranial nerve.",
            functions: [
                "Depress and intort the eye (looking down and inward)",
                "Enable reading and descending stairs gaze",
                "Compensate for head tilt via vestibulo-ocular coordination"
            ],
            position3D: [
                0.03,
                -0.11,
                0.19
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "trochlear-nucleus",
                    type: "structural",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Motor nucleus in dorsal midbrain"
                }
            ],
            schemaMapping: {
                id: "schema-trochlear-channel",
                collection: "eye_motor_output",
                role: "Superior Oblique Controller",
                description: "Dedicated motor line for downward-inward eye rotation, critical for reading and stair descent.",
                fields: [
                    {
                        name: "intorsion_angle",
                        type: "float",
                        description: "Degree of inward rotation"
                    },
                    {
                        name: "depression_angle",
                        type: "float",
                        description: "Degree of downward gaze"
                    }
                ],
                activationState: 0.5,
                linkedModules: [
                    "trochlear_nucleus",
                    "superior_oblique_muscle"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0,
                        -0.12,
                        0.24
                    ],
                    radius: 0.004
                },
                {
                    position: [
                        0.01,
                        -0.11,
                        0.22
                    ],
                    radius: 0.005
                },
                {
                    position: [
                        0.03,
                        -0.1,
                        0.18
                    ],
                    radius: 0.005
                },
                {
                    position: [
                        0.05,
                        -0.07,
                        0.13
                    ],
                    radius: 0.004
                }
            ]
        },
        {
            id: "cn-v-trigeminal",
            name: "CN V — Trigeminal Nerve",
            level: "region",
            category: "peripheral",
            description: "The largest cranial nerve. Three divisions: V1 (ophthalmic — forehead, upper face sensation), V2 (maxillary — midface, upper teeth), V3 (mandibular — lower face, jaw muscles, lower teeth). Major sensory nerve of the face plus motor to muscles of mastication.",
            functions: [
                "Detect touch, pain, temperature across entire face",
                "V1: Sensation from forehead, cornea, upper eyelid",
                "V2: Sensation from cheek, upper lip, upper teeth, palate",
                "V3: Sensation from lower face, tongue; motor to jaw muscles",
                "Mediate corneal reflex (afferent limb)",
                "Power muscles of mastication (masseter, temporalis, pterygoids)"
            ],
            position3D: [
                0.08,
                -0.12,
                0.2
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "trigeminal-nucleus",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Sensory and motor nuclei in pons"
                },
                {
                    targetId: "somatosensory-cortex",
                    type: "excitatory",
                    strength: 0.85,
                    signalType: "electrical",
                    label: "Face representation in S1"
                }
            ],
            schemaMapping: {
                id: "schema-trigeminal-channel",
                collection: "facial_somatosensory",
                role: "Face Sensation Hub",
                description: "Primary tactile, thermal, and nociceptive input from the entire face, plus motor output for chewing.",
                fields: [
                    {
                        name: "division",
                        type: "string",
                        description: "V1 (ophthalmic), V2 (maxillary), or V3 (mandibular)"
                    },
                    {
                        name: "modality",
                        type: "string[]",
                        description: "Touch, pain, temperature, proprioception"
                    },
                    {
                        name: "jaw_force",
                        type: "float",
                        description: "Masseter contraction force (motor V3)"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "trigeminal_ganglion",
                    "chief_sensory_nucleus",
                    "mesencephalic_nucleus",
                    "motor_nucleus_v"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.02,
                        -0.13,
                        0.24
                    ],
                    radius: 0.015
                },
                {
                    position: [
                        0.05,
                        -0.12,
                        0.22
                    ],
                    radius: 0.018
                },
                {
                    position: [
                        0.1,
                        -0.1,
                        0.18
                    ],
                    radius: 0.015
                },
                {
                    position: [
                        0.15,
                        -0.06,
                        0.12
                    ],
                    radius: 0.01
                }
            ]
        },
        {
            id: "cn-vi-abducens",
            name: "CN VI — Abducens Nerve",
            level: "region",
            category: "peripheral",
            description: "Pure motor nerve innervating the lateral rectus muscle for eye abduction (outward gaze). Long intracranial course makes it vulnerable to raised intracranial pressure (false localizing sign).",
            functions: [
                "Abduct the eye (lateral gaze)",
                "Coordinate with CN III medial rectus for horizontal conjugate gaze"
            ],
            position3D: [
                0.04,
                -0.13,
                0.2
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "abducens-nucleus",
                    type: "structural",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Motor nucleus in pons"
                }
            ],
            schemaMapping: {
                id: "schema-abducens-channel",
                collection: "eye_motor_output",
                role: "Lateral Gaze Controller",
                description: "Dedicated motor line for outward eye rotation, coordinating with CN III for horizontal gaze.",
                fields: [
                    {
                        name: "abduction_angle",
                        type: "float",
                        description: "Lateral deviation from midline (degrees)"
                    },
                    {
                        name: "conjugate_signal",
                        type: "float",
                        description: "Coordination with contralateral CN III"
                    }
                ],
                activationState: 0.5,
                linkedModules: [
                    "abducens_nucleus",
                    "lateral_rectus_muscle",
                    "medial_longitudinal_fasciculus"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0,
                        -0.14,
                        0.24
                    ],
                    radius: 0.004
                },
                {
                    position: [
                        0.02,
                        -0.13,
                        0.22
                    ],
                    radius: 0.005
                },
                {
                    position: [
                        0.04,
                        -0.11,
                        0.18
                    ],
                    radius: 0.005
                },
                {
                    position: [
                        0.06,
                        -0.07,
                        0.13
                    ],
                    radius: 0.004
                }
            ]
        },
        {
            id: "cn-vii-facial",
            name: "CN VII — Facial Nerve",
            level: "region",
            category: "peripheral",
            description: "Mixed nerve with motor, sensory, and parasympathetic components. Motor to muscles of facial expression. Sensory for taste from anterior 2/3 of tongue. Parasympathetic to submandibular, sublingual, and lacrimal glands.",
            functions: [
                "Control all muscles of facial expression",
                "Convey taste from anterior 2/3 of tongue",
                "Stimulate salivation (submandibular, sublingual glands)",
                "Stimulate lacrimation (lacrimal gland)",
                "Dampen loud sounds via stapedius muscle"
            ],
            position3D: [
                0.1,
                -0.14,
                0.22
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "facial-motor-nucleus",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Motor nucleus in pons"
                },
                {
                    targetId: "gustatory-cortex",
                    type: "excitatory",
                    strength: 0.6,
                    signalType: "electrical",
                    label: "Taste relay to cortex"
                }
            ],
            schemaMapping: {
                id: "schema-facial-channel",
                collection: "facial_motor_output",
                role: "Expression Controller",
                description: "Primary output for emotional display, social signaling, and facial muscle coordination plus taste input and gland control.",
                fields: [
                    {
                        name: "expression_vector",
                        type: "float[]",
                        description: "Activation of ~42 facial muscle groups"
                    },
                    {
                        name: "taste_signal",
                        type: "string[]",
                        description: "Sweet, salty, sour, bitter from anterior tongue"
                    },
                    {
                        name: "salivation_rate",
                        type: "float",
                        description: "Submandibular/sublingual output"
                    },
                    {
                        name: "lacrimation_rate",
                        type: "float",
                        description: "Tear production rate"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "facial_nucleus",
                    "superior_salivatory_nucleus",
                    "nucleus_tractus_solitarius"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.02,
                        -0.15,
                        0.24
                    ],
                    radius: 0.008
                },
                {
                    position: [
                        0.06,
                        -0.14,
                        0.22
                    ],
                    radius: 0.01
                },
                {
                    position: [
                        0.1,
                        -0.12,
                        0.18
                    ],
                    radius: 0.01
                },
                {
                    position: [
                        0.14,
                        -0.08,
                        0.14
                    ],
                    radius: 0.008
                },
                {
                    position: [
                        0.16,
                        -0.04,
                        0.1
                    ],
                    radius: 0.006
                }
            ]
        },
        {
            id: "cn-viii-vestibulocochlear",
            name: "CN VIII — Vestibulocochlear Nerve",
            level: "region",
            category: "peripheral",
            description: "Pure sensory nerve with two divisions: cochlear (hearing) and vestibular (balance/spatial orientation). Cochlear division carries tonotopically organized auditory information. Vestibular division detects head rotation and linear acceleration.",
            functions: [
                "Transmit auditory information from cochlea",
                "Detect angular acceleration (semicircular canals)",
                "Detect linear acceleration and gravity (otolith organs)",
                "Enable vestibulo-ocular reflex for gaze stabilization",
                "Provide spatial orientation data"
            ],
            position3D: [
                0.09,
                -0.15,
                0.23
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "cochlear-nuclei",
                    type: "excitatory",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Auditory afferents to cochlear nuclei"
                },
                {
                    targetId: "vestibular-nuclei",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Balance afferents to vestibular nuclei"
                }
            ],
            schemaMapping: {
                id: "schema-vestibulocochlear-channel",
                collection: "auditory_vestibular_input",
                role: "Sound and Balance Sensor",
                description: "Dual-modality sensory channel carrying frequency-encoded sound data and 3-axis rotational/linear acceleration data.",
                fields: [
                    {
                        name: "frequency_spectrum",
                        type: "float[]",
                        description: "Tonotopic cochlear activation"
                    },
                    {
                        name: "angular_velocity",
                        type: "float[]",
                        description: "3-axis rotational rate [x, y, z]"
                    },
                    {
                        name: "linear_acceleration",
                        type: "float[]",
                        description: "Otolith linear acceleration [x, y, z]"
                    },
                    {
                        name: "head_position",
                        type: "float[]",
                        description: "Estimated head orientation"
                    }
                ],
                activationState: 0.85,
                linkedModules: [
                    "cochlea",
                    "semicircular_canals",
                    "otolith_organs",
                    "auditory_cortex",
                    "cerebellum"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.06,
                        -0.16,
                        0.26
                    ],
                    radius: 0.008
                },
                {
                    position: [
                        0.08,
                        -0.15,
                        0.24
                    ],
                    radius: 0.01
                },
                {
                    position: [
                        0.1,
                        -0.14,
                        0.22
                    ],
                    radius: 0.01
                }
            ]
        },
        {
            id: "cn-ix-glossopharyngeal",
            name: "CN IX — Glossopharyngeal Nerve",
            level: "region",
            category: "peripheral",
            description: "Mixed nerve carrying taste from posterior 1/3 of tongue, sensation from pharynx and middle ear, motor to stylopharyngeus (swallowing), parasympathetic to parotid gland, and visceral afferents from carotid body (O2/CO2) and carotid sinus (blood pressure).",
            functions: [
                "Taste from posterior 1/3 of tongue",
                "Sensation from pharynx, tonsils, middle ear",
                "Motor to stylopharyngeus for swallowing",
                "Parasympathetic to parotid gland (salivation)",
                "Monitor blood O2/CO2 via carotid body",
                "Monitor blood pressure via carotid sinus",
                "Mediate gag reflex (afferent limb)"
            ],
            position3D: [
                0.07,
                -0.16,
                0.24
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "nucleus-tractus-solitarius",
                    type: "excitatory",
                    strength: 0.85,
                    signalType: "electrical",
                    label: "Taste and visceral afferents"
                },
                {
                    targetId: "nucleus-ambiguus",
                    type: "structural",
                    strength: 0.8,
                    signalType: "electrical",
                    label: "Motor to stylopharyngeus"
                }
            ],
            schemaMapping: {
                id: "schema-glossopharyngeal-channel",
                collection: "pharyngeal_chemosensor",
                role: "Throat Sensor and Chemoreceptor",
                description: "Multimodal channel providing taste, pharyngeal sensation, swallowing motor output, and critical blood gas/pressure monitoring.",
                fields: [
                    {
                        name: "taste_posterior",
                        type: "string[]",
                        description: "Taste modalities from posterior tongue"
                    },
                    {
                        name: "pharyngeal_sensation",
                        type: "float",
                        description: "Touch/pain from pharynx"
                    },
                    {
                        name: "carotid_body_po2",
                        type: "float",
                        description: "Arterial oxygen partial pressure"
                    },
                    {
                        name: "carotid_sinus_bp",
                        type: "float",
                        description: "Arterial blood pressure (mmHg)"
                    }
                ],
                activationState: 0.6,
                linkedModules: [
                    "inferior_salivatory_nucleus",
                    "nucleus_tractus_solitarius",
                    "carotid_body"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.02,
                        -0.17,
                        0.26
                    ],
                    radius: 0.006
                },
                {
                    position: [
                        0.04,
                        -0.16,
                        0.24
                    ],
                    radius: 0.007
                },
                {
                    position: [
                        0.07,
                        -0.15,
                        0.22
                    ],
                    radius: 0.007
                },
                {
                    position: [
                        0.1,
                        -0.12,
                        0.18
                    ],
                    radius: 0.006
                }
            ]
        },
        {
            id: "cn-x-vagus",
            name: "CN X — Vagus Nerve",
            level: "region",
            category: "peripheral",
            description: "The longest cranial nerve with the widest distribution. Provides parasympathetic innervation to heart, lungs, and nearly all of the GI tract. Motor to pharynx and larynx (vocalization, swallowing). Carries visceral sensory information from thoracic and abdominal organs.",
            functions: [
                "Parasympathetic to heart (slow rate)",
                "Parasympathetic to lungs (bronchoconstriction)",
                "Parasympathetic to GI tract (stimulate digestion)",
                "Motor to pharynx and larynx (speech, swallowing)",
                "Carry visceral sensation from thorax/abdomen",
                "Mediate anti-inflammatory cholinergic reflex",
                "Mediate cough and gag reflexes"
            ],
            position3D: [
                0.05,
                -0.17,
                0.25
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "dorsal-motor-nucleus",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Parasympathetic motor nucleus"
                },
                {
                    targetId: "nucleus-ambiguus",
                    type: "structural",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Pharyngeal/laryngeal motor"
                },
                {
                    targetId: "nucleus-tractus-solitarius",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Visceral afferent relay"
                },
                {
                    targetId: "autonomic-nervous-system",
                    type: "modulatory",
                    strength: 0.85,
                    signalType: "chemical",
                    label: "Major parasympathetic trunk"
                }
            ],
            schemaMapping: {
                id: "schema-vagal-bus",
                collection: "vagal_bus",
                role: "Bidirectional Organ Controller",
                description: "The most extensive cranial nerve serving as a bidirectional communication bus between brainstem and thoracoabdominal organs, modulating heart, lungs, and gut.",
                fields: [
                    {
                        name: "cardiac_efferent",
                        type: "float",
                        description: "Parasympathetic drive to heart"
                    },
                    {
                        name: "pulmonary_efferent",
                        type: "float",
                        description: "Bronchomotor output"
                    },
                    {
                        name: "gi_efferent",
                        type: "float",
                        description: "Digestive stimulation output"
                    },
                    {
                        name: "visceral_afferent",
                        type: "float",
                        description: "Organ status feedback volume"
                    },
                    {
                        name: "laryngeal_motor",
                        type: "float",
                        description: "Vocal fold control"
                    }
                ],
                activationState: 0.8,
                linkedModules: [
                    "dorsal_motor_nucleus",
                    "nucleus_ambiguus",
                    "nts",
                    "heart",
                    "lungs",
                    "gi_tract"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.02,
                        -0.16,
                        0.26
                    ],
                    radius: 0.01
                },
                {
                    position: [
                        0.04,
                        -0.18,
                        0.28
                    ],
                    radius: 0.012
                },
                {
                    position: [
                        0.03,
                        -0.22,
                        0.32
                    ],
                    radius: 0.012
                },
                {
                    position: [
                        0.02,
                        -0.28,
                        0.38
                    ],
                    radius: 0.01
                },
                {
                    position: [
                        0.0,
                        -0.35,
                        0.45
                    ],
                    radius: 0.008
                }
            ]
        },
        {
            id: "cn-xi-accessory",
            name: "CN XI — Accessory Nerve",
            level: "region",
            category: "peripheral",
            description: "Pure motor nerve with a unique spinal root origin (C1-C5/C6). Innervates sternocleidomastoid (head turning) and trapezius (shoulder elevation/scapular stabilization). Ascends through foramen magnum before exiting jugular foramen.",
            functions: [
                "Rotate head contralaterally (sternocleidomastoid)",
                "Elevate shoulders (trapezius)",
                "Stabilize scapula for arm movement",
                "Coordinate head and shoulder positioning"
            ],
            position3D: [
                0.06,
                -0.18,
                0.26
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "spinal-accessory-nucleus",
                    type: "structural",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Spinal root from C1-C5 anterior horn"
                }
            ],
            schemaMapping: {
                id: "schema-accessory-channel",
                collection: "head_neck_motor",
                role: "Head Rotation and Shoulder Controller",
                description: "Motor output for head turning and shoulder elevation, coordinating postural positioning of the upper body.",
                fields: [
                    {
                        name: "scm_activation",
                        type: "float",
                        description: "Sternocleidomastoid contraction (0-1)"
                    },
                    {
                        name: "trapezius_activation",
                        type: "float",
                        description: "Trapezius contraction (0-1)"
                    },
                    {
                        name: "head_rotation_angle",
                        type: "float",
                        description: "Degrees of head rotation"
                    }
                ],
                activationState: 0.4,
                linkedModules: [
                    "spinal_accessory_nucleus",
                    "sternocleidomastoid",
                    "trapezius"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.01,
                        -0.2,
                        0.3
                    ],
                    radius: 0.006
                },
                {
                    position: [
                        0.03,
                        -0.19,
                        0.28
                    ],
                    radius: 0.007
                },
                {
                    position: [
                        0.06,
                        -0.17,
                        0.24
                    ],
                    radius: 0.007
                },
                {
                    position: [
                        0.1,
                        -0.14,
                        0.2
                    ],
                    radius: 0.006
                }
            ]
        },
        {
            id: "cn-xii-hypoglossal",
            name: "CN XII — Hypoglossal Nerve",
            level: "region",
            category: "peripheral",
            description: "Pure motor nerve innervating all intrinsic and most extrinsic tongue muscles (except palatoglossus, which is CN X). Essential for speech articulation, chewing, and swallowing. Nucleus is in the medulla.",
            functions: [
                "Control all intrinsic tongue muscles (shape changes)",
                "Control extrinsic tongue muscles (protrusion, retraction, elevation)",
                "Enable speech articulation",
                "Facilitate food manipulation during chewing",
                "Assist in swallowing (tongue propulsion)"
            ],
            position3D: [
                0.04,
                -0.19,
                0.26
            ],
            color: "#eab308",
            signalType: "electrical",
            connections: [
                {
                    targetId: "hypoglossal-nucleus",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Motor nucleus in medulla"
                },
                {
                    targetId: "motor-cortex-tongue",
                    type: "excitatory",
                    strength: 0.85,
                    signalType: "electrical",
                    label: "Corticobulbar input for speech"
                }
            ],
            schemaMapping: {
                id: "schema-hypoglossal-channel",
                collection: "tongue_motor_output",
                role: "Tongue Motor Controller",
                description: "Fine motor output for the tongue enabling precise movements required for speech, chewing, and swallowing.",
                fields: [
                    {
                        name: "protrusion_force",
                        type: "float",
                        description: "Genioglossus contraction"
                    },
                    {
                        name: "lateral_deviation",
                        type: "float",
                        description: "Tongue lateral positioning"
                    },
                    {
                        name: "shape_vector",
                        type: "float[]",
                        description: "Intrinsic muscle activation pattern"
                    }
                ],
                activationState: 0.6,
                linkedModules: [
                    "hypoglossal_nucleus",
                    "genioglossus",
                    "styloglossus",
                    "hyoglossus"
                ],
                category: "peripheral"
            },
            children: [],
            pathway: [
                {
                    position: [
                        0.01,
                        -0.2,
                        0.28
                    ],
                    radius: 0.005
                },
                {
                    position: [
                        0.02,
                        -0.19,
                        0.26
                    ],
                    radius: 0.006
                },
                {
                    position: [
                        0.04,
                        -0.17,
                        0.22
                    ],
                    radius: 0.006
                },
                {
                    position: [
                        0.06,
                        -0.12,
                        0.16
                    ],
                    radius: 0.005
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/pathways.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "neuralPathways",
    ()=>neuralPathways
]);
const neuralPathways = {
    id: "neural-pathways",
    name: "Neural Pathways",
    level: "system",
    category: "pathway",
    description: "Major white matter tracts and fiber bundles connecting brain regions. Includes ascending sensory pathways, descending motor pathways, reflex arcs, and association fibers linking cortical areas.",
    functions: [
        "Carry sensory information from periphery to cortex",
        "Transmit motor commands from cortex to spinal cord and brainstem",
        "Enable rapid reflex responses bypassing cortex",
        "Connect cortical regions for higher-order integration",
        "Support language, attention, and emotional processing circuits"
    ],
    position3D: [
        0,
        0,
        0
    ],
    scale3D: [
        1.5,
        1.5,
        1.5
    ],
    color: "#06b6d4",
    signalType: "electrical",
    connections: [
        {
            targetId: "cerebral-cortex",
            type: "structural",
            strength: 0.95,
            signalType: "electrical",
            label: "Cortical origin/termination of major tracts"
        },
        {
            targetId: "spinal-cord",
            type: "structural",
            strength: 0.9,
            signalType: "electrical",
            label: "Spinal relay points"
        },
        {
            targetId: "brainstem",
            type: "structural",
            strength: 0.9,
            signalType: "electrical",
            label: "Brainstem nuclei relay"
        }
    ],
    schemaMapping: {
        id: "schema-neural-pathways",
        collection: "neural_pathways",
        role: "System Wiring Diagram",
        description: "The complete set of long-range communication channels linking processing centers, defining how information flows through the nervous system.",
        fields: [
            {
                name: "pathway_type",
                type: "string",
                description: "ascending, descending, reflex, or association"
            },
            {
                name: "fiber_count",
                type: "int",
                description: "Estimated number of axons in tract"
            },
            {
                name: "conduction_velocity",
                type: "float",
                description: "Signal propagation speed (m/s)"
            },
            {
                name: "myelination",
                type: "boolean",
                description: "Whether fibers are myelinated"
            }
        ],
        activationState: 0.8,
        linkedModules: [
            "cortex",
            "thalamus",
            "brainstem",
            "spinal_cord"
        ],
        category: "pathway"
    },
    children: [
        {
            id: "sensory-ascending-pathways",
            name: "Sensory (Ascending) Pathways",
            level: "region",
            category: "pathway",
            description: "Afferent pathways carrying sensory information from peripheral receptors upward through the spinal cord and brainstem to thalamus and cortex for conscious perception.",
            functions: [
                "Relay somatosensory data from body to cortex",
                "Carry visual, auditory, and vestibular information",
                "Enable conscious perception of touch, pain, temperature",
                "Maintain somatotopic organization throughout"
            ],
            position3D: [
                -0.2,
                0,
                0
            ],
            color: "#06b6d4",
            signalType: "electrical",
            connections: [
                {
                    targetId: "thalamus",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Thalamic relay to cortex"
                }
            ],
            schemaMapping: {
                id: "schema-input-pipelines",
                collection: "input_pipelines",
                role: "Afferent Data Streams",
                description: "All ascending information channels carrying sensory data from peripheral detectors to central processing cortex.",
                fields: [
                    {
                        name: "modality",
                        type: "string",
                        description: "Sensory modality (touch, pain, vision, etc.)"
                    },
                    {
                        name: "receptive_field",
                        type: "string",
                        description: "Body region covered"
                    },
                    {
                        name: "relay_stations",
                        type: "string[]",
                        description: "Nuclei along the pathway"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "peripheral_receptors",
                    "spinal_cord",
                    "thalamus",
                    "sensory_cortex"
                ],
                category: "pathway"
            },
            children: [
                {
                    id: "dcml-pathway",
                    name: "Dorsal Column–Medial Lemniscal Pathway",
                    level: "subregion",
                    category: "pathway",
                    description: "Carries fine touch, vibration, proprioception, and two-point discrimination. Ascends ipsilaterally in dorsal columns (fasciculus gracilis/cuneatus), synapses in medulla, decussates, then ascends via medial lemniscus to VPL thalamus and S1 cortex.",
                    functions: [
                        "Transmit fine/discriminative touch",
                        "Carry proprioceptive information from joints/muscles",
                        "Detect vibration sense",
                        "Enable two-point discrimination",
                        "Maintain precise somatotopy"
                    ],
                    position3D: [
                        -0.25,
                        0.1,
                        -0.05
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "vpl-thalamus",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Medial lemniscus to VPL"
                        },
                        {
                            targetId: "somatosensory-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "VPL to S1"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-dcml",
                        collection: "input_pipelines",
                        role: "Fine Touch Stream",
                        description: "High-fidelity tactile and proprioceptive data channel preserving spatial resolution for precise body awareness.",
                        fields: [
                            {
                                name: "touch_intensity",
                                type: "float",
                                description: "Mechanoreceptor activation (0-1)"
                            },
                            {
                                name: "joint_angle",
                                type: "float[]",
                                description: "Proprioceptive joint position data"
                            },
                            {
                                name: "vibration_frequency",
                                type: "float",
                                description: "Detected vibration (Hz)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "dorsal_root_ganglion",
                            "dorsal_columns",
                            "gracile_cuneate_nuclei",
                            "vpl_thalamus"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                -0.4,
                                -0.05
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0,
                                -0.2,
                                -0.05
                            ],
                            radius: 0.018
                        },
                        {
                            position: [
                                0,
                                -0.1,
                                -0.03
                            ],
                            radius: 0.018
                        },
                        {
                            position: [
                                0.02,
                                0,
                                0
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.05,
                                0.05,
                                0.05
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.1,
                                0.1,
                                0.1
                            ],
                            radius: 0.01
                        }
                    ]
                },
                {
                    id: "spinothalamic-tract",
                    name: "Spinothalamic Tract",
                    level: "subregion",
                    category: "pathway",
                    description: "Carries pain, temperature, and crude touch. First-order neurons synapse in dorsal horn, second-order neurons decussate immediately via anterior white commissure and ascend contralaterally to VPL thalamus. Two subdivisions: lateral (pain/temp) and anterior (crude touch/pressure).",
                    functions: [
                        "Transmit pain and temperature sensation",
                        "Carry crude touch and pressure information",
                        "Enable protective withdrawal responses",
                        "Alert consciousness to noxious stimuli"
                    ],
                    position3D: [
                        -0.28,
                        0.05,
                        -0.05
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "vpl-thalamus",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Pain/temp relay to thalamus"
                        },
                        {
                            targetId: "periaqueductal-gray",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "electrical",
                            label: "Pain modulation input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-spinothalamic",
                        collection: "input_pipelines",
                        role: "Pain and Temperature Stream",
                        description: "Alert-priority sensory channel for nociceptive and thermal data, triggering protective responses.",
                        fields: [
                            {
                                name: "pain_intensity",
                                type: "float",
                                description: "Nociceptor activation (0-10 scale)"
                            },
                            {
                                name: "temperature",
                                type: "float",
                                description: "Detected temperature (°C)"
                            },
                            {
                                name: "laterality",
                                type: "string",
                                description: "Contralateral body region"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "dorsal_horn",
                            "anterior_white_commissure",
                            "vpl_thalamus",
                            "insular_cortex"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                -0.4,
                                -0.03
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.02,
                                -0.25,
                                -0.03
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.03,
                                -0.1,
                                -0.02
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.02,
                                0,
                                0
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.05,
                                0.05,
                                0.05
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.1,
                                0.1,
                                0.1
                            ],
                            radius: 0.008
                        }
                    ]
                },
                {
                    id: "visual-pathway",
                    name: "Visual Pathway",
                    level: "subregion",
                    category: "pathway",
                    description: "Retina → optic nerve → optic chiasm (partial decussation) → optic tract → lateral geniculate nucleus (LGN) of thalamus → optic radiations → primary visual cortex (V1) in occipital lobe.",
                    functions: [
                        "Carry visual information from retina to cortex",
                        "Partial decussation for binocular processing",
                        "Relay through LGN with magno/parvocellular streams",
                        "Project to V1 for conscious visual perception",
                        "Branch to superior colliculus for visual reflexes"
                    ],
                    position3D: [
                        -0.2,
                        0.15,
                        0.1
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "lgn-thalamus",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Retinogeniculate projection"
                        },
                        {
                            targetId: "primary-visual-cortex",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Geniculostriate projection"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-visual-pathway",
                        collection: "input_pipelines",
                        role: "Visual Processing Pipeline",
                        description: "High-bandwidth visual data stream from retina through thalamic relay to occipital cortex for image reconstruction.",
                        fields: [
                            {
                                name: "visual_field_quadrant",
                                type: "string",
                                description: "Upper/lower x nasal/temporal"
                            },
                            {
                                name: "channel_type",
                                type: "string",
                                description: "Magnocellular (motion) or parvocellular (detail)"
                            },
                            {
                                name: "retinotopic_map",
                                type: "float[]",
                                description: "Spatial position in visual field"
                            }
                        ],
                        activationState: 0.85,
                        linkedModules: [
                            "retina",
                            "optic_chiasm",
                            "lgn",
                            "optic_radiations",
                            "v1"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                -0.05,
                                0.08
                            ],
                            radius: 0.02
                        },
                        {
                            position: [
                                0,
                                -0.06,
                                0.12
                            ],
                            radius: 0.018
                        },
                        {
                            position: [
                                0,
                                -0.08,
                                0.16
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.05,
                                -0.05,
                                0.18
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.12,
                                0,
                                0.2
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.2,
                                0.1,
                                0.15
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                0,
                                0.2,
                                -0.1
                            ],
                            radius: 0.01
                        }
                    ]
                },
                {
                    id: "auditory-pathway",
                    name: "Auditory Pathway",
                    level: "subregion",
                    category: "pathway",
                    description: "Cochlea → cochlear nerve → cochlear nucleus → superior olivary complex (bilateral) → lateral lemniscus → inferior colliculus (IC) → medial geniculate nucleus (MGN) of thalamus → primary auditory cortex (A1) in temporal lobe.",
                    functions: [
                        "Carry tonotopically organized auditory information",
                        "Enable binaural sound localization at superior olive",
                        "Process temporal patterns at inferior colliculus",
                        "Relay to MGN for cortical auditory perception"
                    ],
                    position3D: [
                        -0.22,
                        0.12,
                        0.05
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "mgn-thalamus",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "IC to MGN relay"
                        },
                        {
                            targetId: "primary-auditory-cortex",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "MGN to A1"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-auditory-pathway",
                        collection: "input_pipelines",
                        role: "Auditory Processing Pipeline",
                        description: "Frequency-encoded sound data pipeline with bilateral processing for spatial localization and temporal pattern extraction.",
                        fields: [
                            {
                                name: "frequency_band",
                                type: "float[]",
                                description: "Tonotopic frequency range (Hz)"
                            },
                            {
                                name: "interaural_time_diff",
                                type: "float",
                                description: "ITD for horizontal localization (μs)"
                            },
                            {
                                name: "interaural_level_diff",
                                type: "float",
                                description: "ILD for frequency-dependent localization (dB)"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "cochlear_nucleus",
                            "superior_olivary_complex",
                            "inferior_colliculus",
                            "mgn",
                            "a1"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.08,
                                -0.15,
                                0.22
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.05,
                                -0.13,
                                0.2
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.02,
                                -0.1,
                                0.18
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                0,
                                -0.06,
                                0.15
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.05,
                                -0.02,
                                0.1
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.15,
                                0.05,
                                0.05
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.22,
                                0.12,
                                0.05
                            ],
                            radius: 0.008
                        }
                    ]
                },
                {
                    id: "vestibular-pathway",
                    name: "Vestibular Pathway",
                    level: "subregion",
                    category: "pathway",
                    description: "Semicircular canals and otolith organs → vestibular nerve → vestibular nuclei in brainstem → projections to cerebellum (flocculonodular lobe), oculomotor nuclei (VOR), spinal cord (balance), and cortex (spatial orientation).",
                    functions: [
                        "Sense head rotation (semicircular canals)",
                        "Sense linear acceleration and gravity (otoliths)",
                        "Drive vestibulo-ocular reflex for gaze stabilization",
                        "Maintain balance via vestibulospinal projections",
                        "Provide spatial orientation data to cerebellum and cortex"
                    ],
                    position3D: [
                        -0.18,
                        0.08,
                        0.08
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "vestibular-nuclei",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Primary vestibular afferents"
                        },
                        {
                            targetId: "cerebellum",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Vestibulocerebellar input"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-vestibular-pathway",
                        collection: "input_pipelines",
                        role: "Balance and Spatial Orientation Stream",
                        description: "Inertial measurement channel providing rotational and linear acceleration data for balance and gaze control.",
                        fields: [
                            {
                                name: "canal_activation",
                                type: "float[]",
                                description: "3-axis angular velocity from canals"
                            },
                            {
                                name: "otolith_activation",
                                type: "float[]",
                                description: "Linear acceleration + gravity vector"
                            },
                            {
                                name: "vor_gain",
                                type: "float",
                                description: "Vestibulo-ocular reflex gain"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "semicircular_canals",
                            "otolith_organs",
                            "vestibular_nuclei",
                            "flocculonodular_lobe"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.08,
                                -0.15,
                                0.22
                            ],
                            radius: 0.006
                        },
                        {
                            position: [
                                0.04,
                                -0.12,
                                0.2
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0,
                                -0.08,
                                0.16
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.05,
                                -0.04,
                                0.12
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.1,
                                0,
                                0.08
                            ],
                            radius: 0.008
                        }
                    ]
                }
            ]
        },
        {
            id: "motor-descending-pathways",
            name: "Motor (Descending) Pathways",
            level: "region",
            category: "pathway",
            description: "Efferent pathways carrying motor commands from cortex and brainstem downward to spinal cord motor neurons and brainstem nuclei for execution of voluntary and postural movements.",
            functions: [
                "Execute voluntary movements via corticospinal tract",
                "Control face and head via corticobulbar tract",
                "Maintain posture and muscle tone",
                "Coordinate locomotion patterns",
                "Adjust balance via vestibulospinal output"
            ],
            position3D: [
                0.2,
                0,
                0
            ],
            color: "#06b6d4",
            signalType: "electrical",
            connections: [
                {
                    targetId: "motor-cortex",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Origin of descending commands"
                },
                {
                    targetId: "spinal-cord",
                    type: "excitatory",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Terminal motor output"
                }
            ],
            schemaMapping: {
                id: "schema-output-pipelines",
                collection: "output_pipelines",
                role: "Efferent Command Streams",
                description: "All descending command channels carrying motor instructions from central processors to peripheral effectors.",
                fields: [
                    {
                        name: "target_muscle_group",
                        type: "string",
                        description: "Effector being commanded"
                    },
                    {
                        name: "command_intensity",
                        type: "float",
                        description: "Motor unit recruitment level"
                    },
                    {
                        name: "laterality",
                        type: "string",
                        description: "Ipsilateral or contralateral"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "motor_cortex",
                    "premotor_cortex",
                    "brainstem_motor",
                    "spinal_motor_neurons"
                ],
                category: "pathway"
            },
            children: [
                {
                    id: "corticospinal-tract",
                    name: "Corticospinal Tract",
                    level: "subregion",
                    category: "pathway",
                    description: "The primary pathway for voluntary movement. Originates in motor cortex (area 4), descends through internal capsule and cerebral peduncle, decussates at pyramidal decussation in medulla (90% cross), and terminates on spinal cord motor neurons.",
                    functions: [
                        "Execute voluntary fine motor movements",
                        "Enable skilled hand and finger movements",
                        "Provide direct cortical control over spinal motor neurons",
                        "Cross at pyramidal decussation (contralateral control)"
                    ],
                    position3D: [
                        0.22,
                        0.1,
                        -0.05
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "primary-motor-cortex",
                            type: "structural",
                            strength: 1.0,
                            signalType: "electrical",
                            label: "Origin from Betz cells in layer V"
                        },
                        {
                            targetId: "spinal-motor-neurons",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Corticomotoneuronal synapses"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-corticospinal",
                        collection: "output_pipelines",
                        role: "Voluntary Movement Channel",
                        description: "The primary executive motor pathway providing conscious, fine-grained control of skeletal muscles, especially distal limbs.",
                        fields: [
                            {
                                name: "motor_unit_recruitment",
                                type: "float",
                                description: "Fraction of motor units activated"
                            },
                            {
                                name: "force_output",
                                type: "float",
                                description: "Commanded force (N)"
                            },
                            {
                                name: "decussation_side",
                                type: "string",
                                description: "Contralateral (90%) or ipsilateral (10%)"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "primary_motor_cortex",
                            "internal_capsule",
                            "cerebral_peduncle",
                            "pyramidal_decussation"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.1,
                                0.15,
                                0.1
                            ],
                            radius: 0.02
                        },
                        {
                            position: [
                                0.08,
                                0.1,
                                0.08
                            ],
                            radius: 0.025
                        },
                        {
                            position: [
                                0.05,
                                0.05,
                                0.05
                            ],
                            radius: 0.025
                        },
                        {
                            position: [
                                0.03,
                                -0.05,
                                0
                            ],
                            radius: 0.02
                        },
                        {
                            position: [
                                0,
                                -0.1,
                                -0.05
                            ],
                            radius: 0.018
                        },
                        {
                            position: [
                                -0.02,
                                -0.2,
                                -0.05
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                -0.02,
                                -0.35,
                                -0.05
                            ],
                            radius: 0.012
                        }
                    ]
                },
                {
                    id: "corticobulbar-tract",
                    name: "Corticobulbar Tract",
                    level: "subregion",
                    category: "pathway",
                    description: "Descending motor pathway from cortex to brainstem motor nuclei (cranial nerves V, VII, IX, X, XI, XII). Controls muscles of face, head, jaw, pharynx, and larynx. Most nuclei receive bilateral input; lower face CN VII is contralateral only.",
                    functions: [
                        "Control muscles of facial expression (CN VII)",
                        "Command jaw muscles (CN V motor)",
                        "Control pharynx and larynx for speech and swallowing (CN IX, X)",
                        "Manage tongue movements (CN XII)"
                    ],
                    position3D: [
                        0.2,
                        0.08,
                        0
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "facial-motor-nucleus",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Lower face - contralateral only"
                        },
                        {
                            targetId: "hypoglossal-nucleus",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Tongue motor control"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-corticobulbar",
                        collection: "output_pipelines",
                        role: "Face/Head Motor Channel",
                        description: "Cortical motor commands to brainstem cranial nerve nuclei for face, jaw, throat, and tongue control.",
                        fields: [
                            {
                                name: "target_nucleus",
                                type: "string",
                                description: "Brainstem motor nucleus targeted"
                            },
                            {
                                name: "bilateral_input",
                                type: "boolean",
                                description: "Whether nucleus gets bilateral cortical input"
                            },
                            {
                                name: "activation_level",
                                type: "float",
                                description: "Command signal intensity"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "motor_cortex_face_area",
                            "cn_v_motor",
                            "cn_vii",
                            "cn_ix_x",
                            "cn_xii"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.1,
                                0.15,
                                0.1
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.08,
                                0.1,
                                0.08
                            ],
                            radius: 0.018
                        },
                        {
                            position: [
                                0.05,
                                0.05,
                                0.05
                            ],
                            radius: 0.018
                        },
                        {
                            position: [
                                0.03,
                                -0.05,
                                0.02
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.02,
                                -0.12,
                                0.05
                            ],
                            radius: 0.012
                        }
                    ]
                },
                {
                    id: "rubrospinal-tract",
                    name: "Rubrospinal Tract",
                    level: "subregion",
                    category: "pathway",
                    description: "Originates from the red nucleus in the midbrain, decussates in the ventral tegmental decussation, descends to spinal cord. Facilitates limb flexor muscles. In humans, largely supplemented by corticospinal tract but still active for upper limb flexion.",
                    functions: [
                        "Facilitate limb flexor motor neurons",
                        "Supplement corticospinal tract for upper limb",
                        "Support flexor posturing in absence of cortical input"
                    ],
                    position3D: [
                        0.18,
                        0.05,
                        0.02
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "red-nucleus",
                            type: "structural",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Origin from magnocellular red nucleus"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-rubrospinal",
                        collection: "output_pipelines",
                        role: "Flexor Facilitation Channel",
                        description: "Supplementary motor pathway favoring limb flexion, active in upper limb movements.",
                        fields: [
                            {
                                name: "flexor_bias",
                                type: "float",
                                description: "Degree of flexor facilitation"
                            },
                            {
                                name: "target_segments",
                                type: "string",
                                description: "Cervical > lumbar distribution"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "red_nucleus",
                            "spinal_flexor_motor_neurons"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                -0.05,
                                0.1
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                -0.02,
                                -0.08,
                                0.06
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.02,
                                -0.15,
                                0.02
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.02,
                                -0.25,
                                0
                            ],
                            radius: 0.008
                        }
                    ]
                },
                {
                    id: "reticulospinal-tract",
                    name: "Reticulospinal Tract",
                    level: "subregion",
                    category: "pathway",
                    description: "Two components: pontine (medial) reticulospinal facilitates extensors for posture, and medullary (lateral) reticulospinal inhibits extensors. Together regulate posture, locomotion, and automatic movements.",
                    functions: [
                        "Regulate postural muscle tone",
                        "Coordinate locomotion patterns",
                        "Mediate automatic/stereotyped movements",
                        "Balance extensor and flexor tone for standing"
                    ],
                    position3D: [
                        0.16,
                        0.02,
                        0.02
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "reticular-formation",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Pontine and medullary reticular nuclei"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-reticulospinal",
                        collection: "output_pipelines",
                        role: "Posture and Locomotion Controller",
                        description: "Automatic motor channel managing baseline postural tone and rhythmic locomotor patterns.",
                        fields: [
                            {
                                name: "postural_tone",
                                type: "float",
                                description: "Extensor/flexor balance for upright posture"
                            },
                            {
                                name: "locomotor_rhythm",
                                type: "float",
                                description: "CPG drive for walking pattern"
                            },
                            {
                                name: "component",
                                type: "string",
                                description: "Pontine (facilitatory) or medullary (inhibitory)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "pontine_reticular_formation",
                            "medullary_reticular_formation",
                            "spinal_cpg"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                -0.08,
                                0.08
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                0,
                                -0.15,
                                0.04
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0,
                                -0.25,
                                0
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0,
                                -0.35,
                                -0.02
                            ],
                            radius: 0.012
                        }
                    ]
                },
                {
                    id: "vestibulospinal-tract",
                    name: "Vestibulospinal Tract",
                    level: "subregion",
                    category: "pathway",
                    description: "Descends from lateral and medial vestibular nuclei to spinal cord. Lateral tract facilitates ipsilateral extensors for antigravity posture. Medial tract controls head and neck position via upper cervical segments.",
                    functions: [
                        "Maintain upright posture against gravity",
                        "Activate extensor muscles during balance corrections",
                        "Coordinate head position with body posture",
                        "Mediate vestibular righting reflexes"
                    ],
                    position3D: [
                        0.14,
                        0,
                        0.04
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "vestibular-nuclei",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Lateral and medial vestibular nuclei"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-vestibulospinal",
                        collection: "output_pipelines",
                        role: "Balance Adjustment Channel",
                        description: "Antigravity motor output that automatically adjusts extensor muscle tone to maintain upright posture.",
                        fields: [
                            {
                                name: "extensor_facilitation",
                                type: "float",
                                description: "Antigravity muscle drive"
                            },
                            {
                                name: "head_neck_correction",
                                type: "float[]",
                                description: "Cervical postural adjustment [x, y, z]"
                            },
                            {
                                name: "tract_component",
                                type: "string",
                                description: "Lateral (posture) or medial (head/neck)"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "lateral_vestibular_nucleus",
                            "medial_vestibular_nucleus",
                            "spinal_extensors"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.03,
                                -0.08,
                                0.1
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.02,
                                -0.15,
                                0.06
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.02,
                                -0.25,
                                0.02
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0.02,
                                -0.35,
                                0
                            ],
                            radius: 0.008
                        }
                    ]
                }
            ]
        },
        {
            id: "reflex-arcs",
            name: "Reflex Arcs",
            level: "region",
            category: "pathway",
            description: "Rapid, stereotyped neural circuits that bypass higher cortical processing, enabling near-instantaneous motor responses to specific sensory stimuli. Operate at the spinal cord level for speed.",
            functions: [
                "Enable rapid protective responses to harmful stimuli",
                "Maintain muscle length and tone automatically",
                "Preserve balance during sudden perturbations",
                "Operate independently of conscious awareness"
            ],
            position3D: [
                0,
                -0.15,
                0
            ],
            color: "#06b6d4",
            signalType: "electrical",
            connections: [
                {
                    targetId: "spinal-cord",
                    type: "structural",
                    strength: 0.95,
                    signalType: "electrical",
                    label: "Spinal segmental circuits"
                }
            ],
            schemaMapping: {
                id: "schema-fast-response-loops",
                collection: "fast_response_loops",
                role: "Zero-Latency Response Circuits",
                description: "Hardware-level response circuits that execute protective and postural responses with minimal processing delay, bypassing the central executive.",
                fields: [
                    {
                        name: "reflex_latency",
                        type: "float",
                        description: "Time from stimulus to response (ms)"
                    },
                    {
                        name: "synapse_count",
                        type: "int",
                        description: "Number of synapses in arc (1-3)"
                    },
                    {
                        name: "modifiable",
                        type: "boolean",
                        description: "Whether reflex can be modulated by higher centers"
                    }
                ],
                activationState: 0.5,
                linkedModules: [
                    "sensory_afferents",
                    "spinal_interneurons",
                    "motor_efferents"
                ],
                category: "pathway"
            },
            children: [
                {
                    id: "stretch-reflex",
                    name: "Monosynaptic Stretch Reflex",
                    level: "circuit",
                    category: "pathway",
                    description: "The simplest reflex arc: muscle spindle Ia afferent → direct synapse on alpha motor neuron → same muscle contraction. Only one synapse (monosynaptic). Classic example: patellar (knee-jerk) reflex. Latency ~25-30ms.",
                    functions: [
                        "Resist unexpected muscle stretch",
                        "Maintain muscle length at set point",
                        "Provide immediate postural correction",
                        "Produce knee-jerk response (patellar tendon tap)"
                    ],
                    position3D: [
                        -0.05,
                        -0.18,
                        0
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "muscle-spindle",
                            type: "excitatory",
                            strength: 1.0,
                            signalType: "electrical",
                            label: "Ia afferent from spindle"
                        },
                        {
                            targetId: "alpha-motor-neuron",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Direct monosynaptic excitation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-stretch-reflex",
                        collection: "fast_response_loops",
                        role: "Length Servo",
                        description: "Single-synapse feedback loop that automatically corrects deviations from set muscle length.",
                        fields: [
                            {
                                name: "stretch_magnitude",
                                type: "float",
                                description: "Spindle Ia firing rate increase"
                            },
                            {
                                name: "contraction_force",
                                type: "float",
                                description: "Reflex contraction output"
                            },
                            {
                                name: "latency_ms",
                                type: "float",
                                description: "~25-30ms response time"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "muscle_spindle_ia",
                            "alpha_motor_neuron",
                            "homonymous_muscle"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.05,
                                -0.35,
                                0
                            ],
                            radius: 0.005
                        },
                        {
                            position: [
                                0.03,
                                -0.25,
                                0
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0,
                                -0.18,
                                0
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.03,
                                -0.25,
                                0
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                -0.05,
                                -0.35,
                                0
                            ],
                            radius: 0.005
                        }
                    ]
                },
                {
                    id: "withdrawal-reflex",
                    name: "Withdrawal Reflex",
                    level: "circuit",
                    category: "pathway",
                    description: "Polysynaptic reflex arc: nociceptor → dorsal horn interneurons → flexor motor neurons. Rapidly withdraws limb from painful stimulus. Multiple interneurons allow graduated response and ipsilateral flexor activation with contralateral extensor activation.",
                    functions: [
                        "Rapidly withdraw limb from noxious stimulus",
                        "Activate flexors while inhibiting extensors (reciprocal inhibition)",
                        "Graduate response proportional to stimulus intensity",
                        "Protect tissues from further damage"
                    ],
                    position3D: [
                        0,
                        -0.2,
                        0
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "nociceptors",
                            type: "excitatory",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "A-delta and C fiber input"
                        },
                        {
                            targetId: "flexor-motor-neurons",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Ipsilateral flexor activation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-withdrawal-reflex",
                        collection: "fast_response_loops",
                        role: "Damage Avoidance Circuit",
                        description: "Multi-synapse protective loop that withdraws a limb from injury sources before conscious pain is perceived.",
                        fields: [
                            {
                                name: "pain_intensity",
                                type: "float",
                                description: "Nociceptor activation level"
                            },
                            {
                                name: "withdrawal_speed",
                                type: "float",
                                description: "Limb retraction velocity"
                            },
                            {
                                name: "response_latency",
                                type: "float",
                                description: "~50-80ms polysynaptic delay"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "nociceptors",
                            "dorsal_horn_interneurons",
                            "flexor_motor_pool"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0.05,
                                -0.35,
                                0
                            ],
                            radius: 0.005
                        },
                        {
                            position: [
                                0.03,
                                -0.28,
                                0
                            ],
                            radius: 0.007
                        },
                        {
                            position: [
                                0,
                                -0.22,
                                0
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0,
                                -0.2,
                                0
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.03,
                                -0.28,
                                0
                            ],
                            radius: 0.007
                        },
                        {
                            position: [
                                -0.05,
                                -0.35,
                                0
                            ],
                            radius: 0.005
                        }
                    ]
                },
                {
                    id: "crossed-extensor-reflex",
                    name: "Crossed Extensor Reflex",
                    level: "circuit",
                    category: "pathway",
                    description: "Companion to the withdrawal reflex: when one limb withdraws (flexes), commissural interneurons activate extensors in the contralateral limb to support body weight and maintain balance.",
                    functions: [
                        "Extend contralateral limb during ipsilateral withdrawal",
                        "Maintain balance when one limb is withdrawn",
                        "Prevent falling during protective withdrawal",
                        "Coordinate bilateral limb response to unilateral pain"
                    ],
                    position3D: [
                        0.05,
                        -0.2,
                        0
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "withdrawal-reflex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Triggered by ipsilateral withdrawal"
                        },
                        {
                            targetId: "contralateral-extensors",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Contralateral extensor activation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-crossed-extensor",
                        collection: "fast_response_loops",
                        role: "Balance Compensation Circuit",
                        description: "Bilateral coordination loop ensuring postural stability by extending the opposite limb during a withdrawal event.",
                        fields: [
                            {
                                name: "extensor_activation",
                                type: "float",
                                description: "Contralateral extensor force"
                            },
                            {
                                name: "balance_correction",
                                type: "float",
                                description: "Center-of-mass stabilization"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "commissural_interneurons",
                            "contralateral_extensor_pool"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                -0.2,
                                0
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0.02,
                                -0.22,
                                0
                            ],
                            radius: 0.009
                        },
                        {
                            position: [
                                0.05,
                                -0.22,
                                0
                            ],
                            radius: 0.009
                        },
                        {
                            position: [
                                0.08,
                                -0.28,
                                0
                            ],
                            radius: 0.007
                        },
                        {
                            position: [
                                0.1,
                                -0.35,
                                0
                            ],
                            radius: 0.005
                        }
                    ]
                }
            ]
        },
        {
            id: "association-pathways",
            name: "Association Pathways",
            level: "region",
            category: "pathway",
            description: "Long association fiber bundles connecting different cortical regions within the same hemisphere. Enable cross-modal integration, language, attention, and complex cognitive functions.",
            functions: [
                "Connect language areas for speech processing",
                "Link frontal and temporal lobes for decision-making",
                "Enable attentional networks across parietal and frontal cortex",
                "Support emotional-cognitive integration via limbic connections"
            ],
            position3D: [
                0,
                0.15,
                0
            ],
            color: "#06b6d4",
            signalType: "electrical",
            connections: [
                {
                    targetId: "cerebral-cortex",
                    type: "structural",
                    strength: 0.9,
                    signalType: "electrical",
                    label: "Intracortical fiber connections"
                }
            ],
            schemaMapping: {
                id: "schema-integration-buses",
                collection: "integration_buses",
                role: "Cross-Module Communication Channels",
                description: "Long-range fiber highways connecting distant cortical modules, enabling integrated processing across specialized brain regions.",
                fields: [
                    {
                        name: "connected_regions",
                        type: "string[]",
                        description: "Origin and termination cortical areas"
                    },
                    {
                        name: "fiber_density",
                        type: "float",
                        description: "Axon count in bundle"
                    },
                    {
                        name: "bidirectional",
                        type: "boolean",
                        description: "Whether fibers run in both directions"
                    }
                ],
                activationState: 0.7,
                linkedModules: [
                    "frontal_cortex",
                    "temporal_cortex",
                    "parietal_cortex",
                    "limbic_cortex"
                ],
                category: "pathway"
            },
            children: [
                {
                    id: "arcuate-fasciculus",
                    name: "Arcuate Fasciculus",
                    level: "subregion",
                    category: "pathway",
                    description: "Major association bundle connecting Broca's area (inferior frontal gyrus, speech production) with Wernicke's area (posterior superior temporal gyrus, speech comprehension). Forms the core of the language circuit. Damage causes conduction aphasia.",
                    functions: [
                        "Connect speech production and comprehension centers",
                        "Enable repetition of heard speech",
                        "Support phonological working memory",
                        "Form the dorsal language stream"
                    ],
                    position3D: [
                        -0.05,
                        0.15,
                        0.05
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "brocas-area",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Frontal language production"
                        },
                        {
                            targetId: "wernickes-area",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Temporal language comprehension"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-arcuate",
                        collection: "integration_buses",
                        role: "Language Circuit Link",
                        description: "Critical bidirectional link between speech production and comprehension modules, enabling language processing loop.",
                        fields: [
                            {
                                name: "phonological_throughput",
                                type: "float",
                                description: "Speech sound processing bandwidth"
                            },
                            {
                                name: "repetition_fidelity",
                                type: "float",
                                description: "Accuracy of speech repetition"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "brocas_area",
                            "wernickes_area",
                            "supramarginal_gyrus"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                -0.15,
                                0.05,
                                0.1
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.12,
                                0.1,
                                0.12
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.08,
                                0.15,
                                0.1
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.05,
                                0.15,
                                0.05
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.1,
                                0.1,
                                0.0
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.18,
                                0.05,
                                -0.02
                            ],
                            radius: 0.008
                        }
                    ]
                },
                {
                    id: "uncinate-fasciculus",
                    name: "Uncinate Fasciculus",
                    level: "subregion",
                    category: "pathway",
                    description: "Hooks around the Sylvian fissure connecting orbitofrontal cortex and anterior temporal lobe (including amygdala). Involved in emotional regulation, social behavior, and episodic memory retrieval. One of the last tracts to mature (into 30s).",
                    functions: [
                        "Connect frontal executive areas with temporal memory/emotion",
                        "Support emotional regulation and valuation",
                        "Enable retrieval of emotionally tagged memories",
                        "Mediate social behavior and empathy processing"
                    ],
                    position3D: [
                        0,
                        0.12,
                        0.08
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "orbitofrontal-cortex",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Frontal emotional regulation"
                        },
                        {
                            targetId: "anterior-temporal-lobe",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Temporal memory/emotion"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-uncinate",
                        collection: "integration_buses",
                        role: "Frontal-Temporal Emotional Bridge",
                        description: "Connects executive decision-making with emotional memory, enabling emotion-informed behavior and social cognition.",
                        fields: [
                            {
                                name: "emotional_valence_transfer",
                                type: "float",
                                description: "Emotion signal throughput"
                            },
                            {
                                name: "memory_retrieval_cue",
                                type: "float",
                                description: "Associative memory activation"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "orbitofrontal_cortex",
                            "anterior_temporal_lobe",
                            "amygdala"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                -0.1,
                                0.1,
                                0.12
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                -0.08,
                                0.12,
                                0.1
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.04,
                                0.12,
                                0.08
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0,
                                0.1,
                                0.06
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                -0.06,
                                0.05,
                                0.04
                            ],
                            radius: 0.008
                        }
                    ]
                },
                {
                    id: "cingulum-bundle",
                    name: "Cingulum Bundle",
                    level: "subregion",
                    category: "pathway",
                    description: "C-shaped association bundle running within the cingulate gyrus, connecting frontal lobe to parahippocampal gyrus and entorhinal cortex. Core pathway of the limbic system linking emotion, memory, and executive function.",
                    functions: [
                        "Connect limbic structures along the medial surface",
                        "Support emotional processing and pain affect",
                        "Enable spatial memory via hippocampal connections",
                        "Mediate attention-to-emotion interface"
                    ],
                    position3D: [
                        0,
                        0.18,
                        0
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "cingulate-cortex",
                            type: "structural",
                            strength: 0.9,
                            signalType: "electrical",
                            label: "Cingulate gyrus longitudinal fibers"
                        },
                        {
                            targetId: "hippocampus",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Hippocampal/parahippocampal connection"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-cingulum",
                        collection: "integration_buses",
                        role: "Limbic Circuit Highway",
                        description: "Central limbic pathway connecting emotion, memory, and executive regions along the brain's medial surface.",
                        fields: [
                            {
                                name: "limbic_throughput",
                                type: "float",
                                description: "Emotional signal bandwidth"
                            },
                            {
                                name: "memory_emotion_binding",
                                type: "float",
                                description: "Episodic-emotional association strength"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "anterior_cingulate",
                            "posterior_cingulate",
                            "parahippocampal_gyrus",
                            "entorhinal_cortex"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                0,
                                0.12,
                                0.1
                            ],
                            radius: 0.008
                        },
                        {
                            position: [
                                0,
                                0.16,
                                0.08
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0,
                                0.18,
                                0.04
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0,
                                0.18,
                                0
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0,
                                0.16,
                                -0.04
                            ],
                            radius: 0.01
                        },
                        {
                            position: [
                                0,
                                0.1,
                                -0.08
                            ],
                            radius: 0.008
                        }
                    ]
                },
                {
                    id: "superior-longitudinal-fasciculus",
                    name: "Superior Longitudinal Fasciculus",
                    level: "subregion",
                    category: "pathway",
                    description: "Large association bundle with three components (SLF I, II, III) connecting frontal and parietal cortex. Critical for spatial attention, visuospatial integration, and goal-directed behavior. Damage to right SLF causes hemispatial neglect.",
                    functions: [
                        "Connect frontal and parietal cortex for attention",
                        "Enable visuospatial processing and awareness",
                        "Support working memory maintenance",
                        "Mediate goal-directed sensorimotor integration"
                    ],
                    position3D: [
                        0.05,
                        0.18,
                        0.03
                    ],
                    color: "#06b6d4",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "prefrontal-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Frontal attentional control"
                        },
                        {
                            targetId: "parietal-cortex",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Parietal spatial processing"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-slf",
                        collection: "integration_buses",
                        role: "Frontal-Parietal Attention Link",
                        description: "Major highway connecting executive frontal regions with spatial parietal areas, forming the dorsal attention network backbone.",
                        fields: [
                            {
                                name: "attention_allocation",
                                type: "float",
                                description: "Spatial attention signal strength"
                            },
                            {
                                name: "visuospatial_binding",
                                type: "float",
                                description: "Vision-action integration level"
                            },
                            {
                                name: "component",
                                type: "string",
                                description: "SLF I (dorsal), II (middle), or III (ventral)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "dlpfc",
                            "fef",
                            "intraparietal_sulcus",
                            "supramarginal_gyrus"
                        ],
                        category: "pathway"
                    },
                    children: [],
                    pathway: [
                        {
                            position: [
                                -0.1,
                                0.12,
                                0.1
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                -0.06,
                                0.16,
                                0.08
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0,
                                0.18,
                                0.06
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.06,
                                0.18,
                                0.04
                            ],
                            radius: 0.015
                        },
                        {
                            position: [
                                0.12,
                                0.14,
                                0.02
                            ],
                            radius: 0.012
                        },
                        {
                            position: [
                                0.15,
                                0.1,
                                0
                            ],
                            radius: 0.01
                        }
                    ]
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/microscopic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "microscopicStructures",
    ()=>microscopicStructures
]);
const microscopicStructures = {
    id: "cellular-components",
    name: "Cellular Components",
    level: "cellular",
    category: "cellular",
    description: "The microscopic building blocks of the nervous system: individual neuron types, supporting glial cells, synapse structures, and neurotransmitter molecules. These elements form the fundamental computational and communication units of all neural circuits.",
    functions: [
        "Process and transmit electrical signals (neurons)",
        "Provide metabolic and structural support (glia)",
        "Enable inter-neuronal communication (synapses)",
        "Carry chemical messages between cells (neurotransmitters)",
        "Form the substrate for all neural computation"
    ],
    position3D: [
        0,
        0,
        0
    ],
    scale3D: [
        0.5,
        0.5,
        0.5
    ],
    color: "#a78bfa",
    signalType: "electrical",
    connections: [
        {
            targetId: "neural-pathways",
            type: "structural",
            strength: 1.0,
            signalType: "electrical",
            label: "Neurons form all pathway tracts"
        },
        {
            targetId: "cerebral-cortex",
            type: "structural",
            strength: 0.95,
            signalType: "electrical",
            label: "Cortical cytoarchitecture"
        }
    ],
    schemaMapping: {
        id: "schema-cellular-components",
        collection: "cellular_components",
        role: "Fundamental Building Blocks",
        description: "The atomic-level elements from which all neural computation, communication, and maintenance emerges. Every higher-level structure is composed of these units.",
        fields: [
            {
                name: "cell_type",
                type: "string",
                description: "Neuron, glia, synapse, or neurotransmitter"
            },
            {
                name: "population_estimate",
                type: "int",
                description: "Estimated count in nervous system"
            },
            {
                name: "primary_function",
                type: "string",
                description: "Core computational or support role"
            }
        ],
        activationState: 1.0,
        linkedModules: [
            "all_brain_regions",
            "spinal_cord",
            "peripheral_nerves"
        ],
        category: "cellular"
    },
    children: [
        {
            id: "neuron-types",
            name: "Neuron Types",
            level: "cellular",
            category: "cellular",
            description: "The ~86 billion neurons in the human brain come in many specialized forms. Each type is optimized for a particular computational role: long-range excitation, local inhibition, pattern recognition, spatial mapping, and sensorimotor transduction.",
            functions: [
                "Generate and propagate action potentials",
                "Perform excitatory and inhibitory computation",
                "Encode spatial, temporal, and feature information",
                "Form the processing nodes of all neural circuits"
            ],
            position3D: [
                -0.15,
                0.1,
                0
            ],
            color: "#a78bfa",
            signalType: "electrical",
            connections: [
                {
                    targetId: "synapse-types",
                    type: "structural",
                    strength: 0.95,
                    signalType: "chemical",
                    label: "Pre- and post-synaptic elements"
                },
                {
                    targetId: "glial-cells",
                    type: "modulatory",
                    strength: 0.7,
                    signalType: "chemical",
                    label: "Glia-neuron metabolic support"
                }
            ],
            schemaMapping: {
                id: "schema-processing-units",
                collection: "processing_units",
                role: "Compute Nodes",
                description: "The individual processing elements of the neural network. Each type implements a specialized transfer function optimized for its circuit role.",
                fields: [
                    {
                        name: "neuron_class",
                        type: "string",
                        description: "Morphological/functional classification"
                    },
                    {
                        name: "neurotransmitter",
                        type: "string",
                        description: "Primary neurotransmitter released"
                    },
                    {
                        name: "firing_pattern",
                        type: "string",
                        description: "Regular, bursting, fast-spiking, etc."
                    },
                    {
                        name: "axon_length",
                        type: "string",
                        description: "Local (mm) or projection (cm)"
                    }
                ],
                activationState: 0.8,
                linkedModules: [
                    "synaptic_machinery",
                    "glial_support",
                    "ion_channels"
                ],
                category: "cellular"
            },
            children: [
                {
                    id: "pyramidal-neurons",
                    name: "Pyramidal Neurons",
                    level: "cellular",
                    category: "cellular",
                    description: "The most abundant excitatory neuron in the cerebral cortex (~70-80% of cortical neurons). Pyramid-shaped soma with apical dendrite extending toward cortical surface and basal dendrites. Use glutamate. Primary output neurons of cortex projecting to distant targets.",
                    functions: [
                        "Primary excitatory output of cerebral cortex",
                        "Project to distant cortical and subcortical targets",
                        "Integrate thousands of synaptic inputs on dendritic tree",
                        "Generate burst and regular firing patterns",
                        "Form the basis of cortical columnar organization"
                    ],
                    position3D: [
                        -0.2,
                        0.15,
                        0.02
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "interneurons",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "Excite local interneurons"
                        },
                        {
                            targetId: "pyramidal-neurons",
                            type: "excitatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "Recurrent excitation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-excitatory-nodes",
                        collection: "excitatory_nodes",
                        role: "Signal Amplifiers",
                        description: "Primary excitatory compute units that amplify and relay signals across cortical and subcortical networks.",
                        fields: [
                            {
                                name: "layer_location",
                                type: "string",
                                description: "Cortical layer (II/III, V, VI)"
                            },
                            {
                                name: "projection_target",
                                type: "string",
                                description: "Corticocortical, corticospinal, etc."
                            },
                            {
                                name: "dendritic_branches",
                                type: "int",
                                description: "Number of dendritic branch points"
                            },
                            {
                                name: "synapse_count",
                                type: "int",
                                description: "~10,000-30,000 synaptic inputs"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "cortical_columns",
                            "corticospinal_tract",
                            "callosal_fibers"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "interneurons",
                    name: "Interneurons",
                    level: "cellular",
                    category: "cellular",
                    description: "Local inhibitory neurons (~20-30% of cortical neurons) using GABA. Many subtypes: basket cells (perisomatic inhibition), chandelier cells (axon initial segment), Martinotti cells (layer I feedback), VIP cells (disinhibition). Critical for gain control, timing, and oscillations.",
                    functions: [
                        "Provide local inhibition for circuit control",
                        "Set timing windows for neural computation",
                        "Generate gamma oscillations (basket cells)",
                        "Control output gain of pyramidal neurons",
                        "Enable disinhibitory circuits (VIP -> SOM -> Pyr)"
                    ],
                    position3D: [
                        -0.18,
                        0.13,
                        -0.02
                    ],
                    color: "#c084fc",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "pyramidal-neurons",
                            type: "inhibitory",
                            strength: 0.85,
                            signalType: "chemical",
                            label: "GABAergic inhibition of pyramidals"
                        },
                        {
                            targetId: "interneurons",
                            type: "inhibitory",
                            strength: 0.5,
                            signalType: "chemical",
                            label: "Mutual inhibition between interneurons"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-inhibitory-nodes",
                        collection: "inhibitory_nodes",
                        role: "Signal Suppressors",
                        description: "Local inhibitory elements that sculpt neural activity by suppressing, timing, and gating excitatory signals.",
                        fields: [
                            {
                                name: "subtype",
                                type: "string",
                                description: "Basket, chandelier, Martinotti, VIP, etc."
                            },
                            {
                                name: "inhibition_target",
                                type: "string",
                                description: "Soma, dendrite, axon initial segment"
                            },
                            {
                                name: "calcium_binding",
                                type: "string",
                                description: "Parvalbumin, somatostatin, or VIP"
                            },
                            {
                                name: "firing_rate",
                                type: "float",
                                description: "Fast-spiking up to 300+ Hz"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "pyramidal_neurons",
                            "thalamocortical_afferents",
                            "other_interneurons"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "purkinje-cells",
                    name: "Purkinje Cells",
                    level: "cellular",
                    category: "cellular",
                    description: "The sole output neurons of the cerebellar cortex. Massive planar dendritic tree receiving ~200,000 parallel fiber inputs and one climbing fiber. GABAergic (inhibitory) output to deep cerebellar nuclei. Critical for motor learning and coordination.",
                    functions: [
                        "Integrate massive parallel fiber input",
                        "Provide sole output of cerebellar cortex (inhibitory)",
                        "Undergo synaptic plasticity for motor learning (LTD)",
                        "Fire complex spikes (climbing fiber) and simple spikes"
                    ],
                    position3D: [
                        -0.22,
                        0.12,
                        0.04
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "deep-cerebellar-nuclei",
                            type: "inhibitory",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "GABAergic output to DCN"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-purkinje",
                        collection: "processing_units",
                        role: "Cerebellar Integration Node",
                        description: "Massive parallel integrator in the cerebellum, funneling 200K+ inputs into a single inhibitory output for motor coordination.",
                        fields: [
                            {
                                name: "parallel_fiber_inputs",
                                type: "int",
                                description: "~200,000 synapses"
                            },
                            {
                                name: "climbing_fiber_input",
                                type: "int",
                                description: "Exactly 1 climbing fiber"
                            },
                            {
                                name: "simple_spike_rate",
                                type: "float",
                                description: "Tonic firing rate (Hz)"
                            },
                            {
                                name: "complex_spike_rate",
                                type: "float",
                                description: "Error signal rate (~1 Hz)"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "parallel_fibers",
                            "climbing_fiber",
                            "deep_cerebellar_nuclei"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "motor-neurons",
                    name: "Motor Neurons",
                    level: "cellular",
                    category: "cellular",
                    description: "Lower motor neurons in the spinal cord ventral horn (alpha motor neurons) and brainstem motor nuclei. Final common pathway: every voluntary movement requires their activation. Release acetylcholine at the neuromuscular junction.",
                    functions: [
                        "Innervate skeletal muscle fibers at neuromuscular junction",
                        "Convert neural signals to muscle contraction",
                        "Serve as the final common pathway for all voluntary movement",
                        "Release acetylcholine to trigger muscle action potential"
                    ],
                    position3D: [
                        -0.15,
                        0.08,
                        0.04
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "skeletal-muscle",
                            type: "excitatory",
                            strength: 1.0,
                            signalType: "chemical",
                            label: "ACh at neuromuscular junction"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-motor-neurons",
                        collection: "processing_units",
                        role: "Effector Interface Node",
                        description: "The terminal output node converting neural computation into physical force via muscle fiber activation.",
                        fields: [
                            {
                                name: "motor_unit_size",
                                type: "int",
                                description: "Number of muscle fibers innervated"
                            },
                            {
                                name: "recruitment_threshold",
                                type: "float",
                                description: "Activation threshold (mV)"
                            },
                            {
                                name: "firing_rate",
                                type: "float",
                                description: "Rate coding for force modulation (Hz)"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "corticospinal_input",
                            "spinal_interneurons",
                            "muscle_fibers"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "sensory-neurons",
                    name: "Sensory Neurons",
                    level: "cellular",
                    category: "cellular",
                    description: "Pseudounipolar neurons in dorsal root ganglia (DRG) and cranial nerve ganglia. Peripheral process detects stimuli (touch, pain, temperature, proprioception), central process enters CNS. Many subtypes based on receptor type and fiber diameter.",
                    functions: [
                        "Detect mechanical, thermal, chemical, and noxious stimuli",
                        "Transduce physical stimuli into electrical signals",
                        "Transmit sensory data from periphery to CNS",
                        "Maintain receptor specificity and labeled-line coding"
                    ],
                    position3D: [
                        -0.12,
                        0.06,
                        0.02
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "spinal-cord-dorsal-horn",
                            type: "excitatory",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "Central terminal in dorsal horn"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-sensory-neurons",
                        collection: "processing_units",
                        role: "Peripheral Detector Node",
                        description: "Input transducers converting physical world stimuli into the neural code for central processing.",
                        fields: [
                            {
                                name: "receptor_type",
                                type: "string",
                                description: "Mechanoreceptor, nociceptor, thermoreceptor, etc."
                            },
                            {
                                name: "fiber_class",
                                type: "string",
                                description: "Aα, Aβ, Aδ, or C fiber"
                            },
                            {
                                name: "conduction_velocity",
                                type: "float",
                                description: "Signal speed based on myelination (m/s)"
                            },
                            {
                                name: "receptive_field",
                                type: "string",
                                description: "Spatial extent of detection area"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "peripheral_receptors",
                            "dorsal_root_ganglion",
                            "dorsal_horn"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "mirror-neurons",
                    name: "Mirror Neurons",
                    level: "cellular",
                    category: "cellular",
                    description: "Neurons that fire both when performing an action and when observing another perform the same action. Found in premotor cortex (F5), inferior parietal lobule, and STS. Hypothesized role in imitation, empathy, language evolution, and social cognition.",
                    functions: [
                        "Fire during both action execution and observation",
                        "Support imitation learning",
                        "Contribute to understanding others' intentions",
                        "Potentially underlie empathy mechanisms"
                    ],
                    position3D: [
                        -0.1,
                        0.16,
                        0.06
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "premotor-cortex",
                            type: "structural",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Located in premotor area F5"
                        },
                        {
                            targetId: "inferior-parietal-lobule",
                            type: "excitatory",
                            strength: 0.7,
                            signalType: "electrical",
                            label: "Parietal mirror system"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-mirror-neurons",
                        collection: "processing_units",
                        role: "Action-Observation Bridge",
                        description: "Dual-mode neurons bridging self-action and observed-action representations, enabling imitation and social understanding.",
                        fields: [
                            {
                                name: "action_selectivity",
                                type: "string",
                                description: "Preferred action type (grasp, reach, etc.)"
                            },
                            {
                                name: "execution_response",
                                type: "float",
                                description: "Firing rate during action"
                            },
                            {
                                name: "observation_response",
                                type: "float",
                                description: "Firing rate during observation"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "premotor_cortex",
                            "inferior_parietal",
                            "superior_temporal_sulcus"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "place-cells",
                    name: "Place Cells",
                    level: "cellular",
                    category: "cellular",
                    description: "Hippocampal pyramidal neurons that fire when the animal occupies a specific location in the environment (the cell's 'place field'). Discovered by John O'Keefe (Nobel 2014). Collectively form a cognitive map of space.",
                    functions: [
                        "Encode specific spatial locations (place fields)",
                        "Form cognitive map of environment",
                        "Support spatial memory and navigation",
                        "Replay during sleep for memory consolidation"
                    ],
                    position3D: [
                        -0.08,
                        0.14,
                        0.04
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "grid-cells",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "electrical",
                            label: "Grid-to-place cell spatial input"
                        },
                        {
                            targetId: "hippocampus-ca1",
                            type: "structural",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Located in hippocampal CA1/CA3"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-place-cells",
                        collection: "processing_units",
                        role: "Spatial Position Encoder",
                        description: "Location-selective neurons forming a distributed map of navigable space in hippocampal circuits.",
                        fields: [
                            {
                                name: "place_field_center",
                                type: "float[]",
                                description: "Preferred spatial location [x, y]"
                            },
                            {
                                name: "field_size",
                                type: "float",
                                description: "Place field diameter (cm)"
                            },
                            {
                                name: "peak_firing_rate",
                                type: "float",
                                description: "Rate at field center (Hz)"
                            },
                            {
                                name: "theta_phase",
                                type: "float",
                                description: "Phase of theta rhythm at peak"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "hippocampal_ca1",
                            "hippocampal_ca3",
                            "entorhinal_cortex"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "grid-cells",
                    name: "Grid Cells",
                    level: "cellular",
                    category: "cellular",
                    description: "Entorhinal cortex neurons that fire in a regular hexagonal grid pattern across the environment. Discovered by May-Britt and Edvard Moser (Nobel 2014). Provide a metric coordinate system for spatial navigation and path integration.",
                    functions: [
                        "Generate hexagonal spatial firing pattern",
                        "Provide metric distance information",
                        "Enable path integration (dead reckoning)",
                        "Feed spatial framework to hippocampal place cells"
                    ],
                    position3D: [
                        -0.06,
                        0.12,
                        0.02
                    ],
                    color: "#a78bfa",
                    signalType: "electrical",
                    connections: [
                        {
                            targetId: "place-cells",
                            type: "excitatory",
                            strength: 0.85,
                            signalType: "electrical",
                            label: "Spatial input to place cells"
                        },
                        {
                            targetId: "entorhinal-cortex",
                            type: "structural",
                            strength: 0.95,
                            signalType: "electrical",
                            label: "Located in medial entorhinal cortex"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-grid-cells",
                        collection: "processing_units",
                        role: "Spatial Metric Generator",
                        description: "Hexagonal coordinate system neurons providing the metric scaffold for spatial navigation and memory.",
                        fields: [
                            {
                                name: "grid_spacing",
                                type: "float",
                                description: "Distance between grid nodes (cm)"
                            },
                            {
                                name: "grid_orientation",
                                type: "float",
                                description: "Rotation angle of grid (degrees)"
                            },
                            {
                                name: "grid_phase",
                                type: "float[]",
                                description: "2D offset of grid [x, y]"
                            },
                            {
                                name: "module_scale",
                                type: "float",
                                description: "Dorsoventral scale ratio"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "medial_entorhinal_cortex",
                            "hippocampal_place_cells",
                            "head_direction_cells"
                        ],
                        category: "cellular"
                    },
                    children: []
                }
            ]
        },
        {
            id: "glial-cells",
            name: "Glial Cells",
            level: "cellular",
            category: "cellular",
            description: "Non-neuronal cells that outnumber neurons ~1:1 in the brain. Provide metabolic support, insulation, immune defense, and structural scaffolding. Far from passive — actively participate in synaptic transmission (tripartite synapse), circuit formation, and neural repair.",
            functions: [
                "Provide metabolic support to neurons (astrocytes)",
                "Insulate axons with myelin for fast conduction",
                "Defend against pathogens and prune synapses (microglia)",
                "Produce cerebrospinal fluid (ependymal cells)",
                "Actively modulate synaptic transmission"
            ],
            position3D: [
                0.15,
                0.1,
                0
            ],
            color: "#7dd3fc",
            signalType: "chemical",
            connections: [
                {
                    targetId: "neuron-types",
                    type: "modulatory",
                    strength: 0.8,
                    signalType: "chemical",
                    label: "Metabolic support and synaptic modulation"
                }
            ],
            schemaMapping: {
                id: "schema-support-infrastructure",
                collection: "support_infrastructure",
                role: "System Maintenance",
                description: "The non-compute support network that maintains, insulates, defends, and metabolically fuels the neural processing units.",
                fields: [
                    {
                        name: "glial_type",
                        type: "string",
                        description: "Astrocyte, oligodendrocyte, microglia, etc."
                    },
                    {
                        name: "support_function",
                        type: "string",
                        description: "Primary maintenance role"
                    },
                    {
                        name: "territory_size",
                        type: "float",
                        description: "Domain coverage area (μm²)"
                    }
                ],
                activationState: 0.9,
                linkedModules: [
                    "all_neural_circuits",
                    "blood_brain_barrier",
                    "csf_system"
                ],
                category: "cellular"
            },
            children: [
                {
                    id: "astrocytes",
                    name: "Astrocytes",
                    level: "cellular",
                    category: "cellular",
                    description: "Star-shaped glial cells forming the tripartite synapse. End-feet on blood vessels form blood-brain barrier. Regulate extracellular K+ and glutamate, provide lactate fuel to neurons, propagate calcium waves, and release gliotransmitters.",
                    functions: [
                        "Maintain blood-brain barrier via end-feet",
                        "Recycle neurotransmitters (especially glutamate)",
                        "Provide lactate fuel shuttle to neurons",
                        "Buffer extracellular potassium",
                        "Modulate synaptic transmission (gliotransmission)",
                        "Form glial scar after injury"
                    ],
                    position3D: [
                        0.12,
                        0.14,
                        0.02
                    ],
                    color: "#7dd3fc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "blood-vessels",
                            type: "structural",
                            strength: 0.95,
                            signalType: "chemical",
                            label: "End-feet on capillaries (BBB)"
                        },
                        {
                            targetId: "synapse-types",
                            type: "modulatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "Tripartite synapse modulation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-astrocytes",
                        collection: "support_infrastructure",
                        role: "Metabolic Support and Barrier Manager",
                        description: "Multi-function support cell maintaining the blood-brain barrier, recycling transmitters, and fueling neurons.",
                        fields: [
                            {
                                name: "calcium_wave_activity",
                                type: "float",
                                description: "Intercellular Ca2+ signaling"
                            },
                            {
                                name: "glutamate_clearance_rate",
                                type: "float",
                                description: "Synaptic glutamate uptake (μmol/s)"
                            },
                            {
                                name: "lactate_output",
                                type: "float",
                                description: "Fuel shuttle to neurons"
                            },
                            {
                                name: "territory_volume",
                                type: "float",
                                description: "Non-overlapping domain (μm³)"
                            }
                        ],
                        activationState: 0.85,
                        linkedModules: [
                            "capillary_endothelium",
                            "synaptic_cleft",
                            "neuronal_somata"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "oligodendrocytes",
                    name: "Oligodendrocytes",
                    level: "cellular",
                    category: "cellular",
                    description: "CNS myelinating glia. Each oligodendrocyte wraps myelin sheaths around up to 50 axon segments, insulating them for saltatory conduction (up to 150 m/s). Myelin loss (as in multiple sclerosis) devastates signal transmission.",
                    functions: [
                        "Produce myelin sheaths in the CNS",
                        "Wrap up to 50 axon segments per cell",
                        "Enable saltatory conduction (up to 150 m/s)",
                        "Provide metabolic support to wrapped axons"
                    ],
                    position3D: [
                        0.16,
                        0.12,
                        -0.02
                    ],
                    color: "#7dd3fc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "neuron-types",
                            type: "structural",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "Myelin wrapping of CNS axons"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-oligodendrocytes",
                        collection: "support_infrastructure",
                        role: "CNS Insulation Provider",
                        description: "Myelin-producing cells that dramatically increase signal speed by insulating CNS axons for saltatory conduction.",
                        fields: [
                            {
                                name: "segments_myelinated",
                                type: "int",
                                description: "Axon segments wrapped per cell (~50)"
                            },
                            {
                                name: "myelin_thickness",
                                type: "float",
                                description: "Sheath thickness (μm)"
                            },
                            {
                                name: "internode_length",
                                type: "float",
                                description: "Distance between nodes of Ranvier (mm)"
                            }
                        ],
                        activationState: 0.85,
                        linkedModules: [
                            "cns_axons",
                            "nodes_of_ranvier",
                            "axonal_metabolism"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "microglia",
                    name: "Microglia",
                    level: "cellular",
                    category: "cellular",
                    description: "Resident immune cells of the CNS (mesoderm-derived, unlike other glia). Constantly survey the microenvironment with motile processes. Activated by injury/infection to phagocytose debris. Also prune synapses during development and learning (complement-mediated).",
                    functions: [
                        "Immune surveillance of CNS microenvironment",
                        "Phagocytose pathogens, debris, and dead cells",
                        "Prune synapses during development (complement C1q/C3)",
                        "Release cytokines for neuroinflammation",
                        "Support neural circuit refinement"
                    ],
                    position3D: [
                        0.18,
                        0.08,
                        0
                    ],
                    color: "#7dd3fc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "synapse-types",
                            type: "modulatory",
                            strength: 0.6,
                            signalType: "chemical",
                            label: "Complement-mediated synaptic pruning"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-microglia",
                        collection: "support_infrastructure",
                        role: "Immune Defense and Synapse Pruner",
                        description: "Resident immune cells that defend against pathogens and sculpt neural circuits by eliminating weak synapses.",
                        fields: [
                            {
                                name: "surveillance_state",
                                type: "string",
                                description: "Resting (ramified) or activated (amoeboid)"
                            },
                            {
                                name: "phagocytic_activity",
                                type: "float",
                                description: "Debris clearance rate"
                            },
                            {
                                name: "cytokine_output",
                                type: "float",
                                description: "Pro/anti-inflammatory signaling"
                            },
                            {
                                name: "pruning_rate",
                                type: "float",
                                description: "Synapses eliminated per hour"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "complement_system",
                            "synaptic_debris",
                            "neuronal_health_signals"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "schwann-cells",
                    name: "Schwann Cells",
                    level: "cellular",
                    category: "cellular",
                    description: "PNS myelinating glia. Unlike oligodendrocytes, each Schwann cell wraps only one axon segment. Enable peripheral nerve regeneration by forming Bands of Büngner (regeneration tubes) after injury.",
                    functions: [
                        "Produce myelin in peripheral nervous system",
                        "One cell per axon internode (unlike oligodendrocytes)",
                        "Guide axon regeneration after peripheral nerve injury",
                        "Form Bands of Büngner for repair"
                    ],
                    position3D: [
                        0.2,
                        0.1,
                        0.02
                    ],
                    color: "#7dd3fc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "neuron-types",
                            type: "structural",
                            strength: 0.85,
                            signalType: "chemical",
                            label: "Myelin wrapping of PNS axons"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-schwann-cells",
                        collection: "support_infrastructure",
                        role: "PNS Insulation and Repair Agent",
                        description: "Peripheral myelin provider with unique regeneration-guiding capability after nerve injury.",
                        fields: [
                            {
                                name: "myelin_segment",
                                type: "float",
                                description: "Single internode length (mm)"
                            },
                            {
                                name: "regeneration_support",
                                type: "boolean",
                                description: "Forming regeneration tube"
                            },
                            {
                                name: "growth_factor_output",
                                type: "float",
                                description: "NGF/BDNF secretion for regrowth"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "pns_axons",
                            "peripheral_nerves",
                            "neuromuscular_junctions"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "ependymal-cells",
                    name: "Ependymal Cells",
                    level: "cellular",
                    category: "cellular",
                    description: "Ciliated epithelial cells lining the ventricles and central canal. Produce and circulate cerebrospinal fluid (CSF) through ciliary beating. Some (tanycytes) have chemosensory and neuroendocrine roles at the hypothalamic floor.",
                    functions: [
                        "Produce cerebrospinal fluid (with choroid plexus)",
                        "Circulate CSF via coordinated ciliary beating",
                        "Form barrier between CSF and brain parenchyma",
                        "Tanycytes sense blood-borne metabolic signals"
                    ],
                    position3D: [
                        0.14,
                        0.06,
                        0
                    ],
                    color: "#7dd3fc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "ventricular-system",
                            type: "structural",
                            strength: 0.9,
                            signalType: "mechanical",
                            label: "Ventricular lining"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-ependymal",
                        collection: "support_infrastructure",
                        role: "CSF Production and Circulation",
                        description: "Ventricular lining cells that produce and propel cerebrospinal fluid for brain buoyancy, waste clearance, and chemical homeostasis.",
                        fields: [
                            {
                                name: "csf_production_rate",
                                type: "float",
                                description: "mL/hour of CSF produced"
                            },
                            {
                                name: "ciliary_beat_frequency",
                                type: "float",
                                description: "Cilia beating rate (Hz)"
                            },
                            {
                                name: "chemosensory_active",
                                type: "boolean",
                                description: "Tanycyte sensing active"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [
                            "choroid_plexus",
                            "ventricular_system",
                            "subarachnoid_space"
                        ],
                        category: "cellular"
                    },
                    children: []
                }
            ]
        },
        {
            id: "synapse-types",
            name: "Synapse Types",
            level: "cellular",
            category: "cellular",
            description: "The specialized junctions where neurons communicate. Chemical synapses use neurotransmitter diffusion across a ~20nm cleft; electrical synapses use gap junctions for direct ionic coupling. Classified by location on the postsynaptic neuron.",
            functions: [
                "Enable inter-neuronal signal transmission",
                "Provide sites for synaptic plasticity (learning/memory)",
                "Allow signal modulation and integration",
                "Support both fast (electrical) and flexible (chemical) transmission"
            ],
            position3D: [
                0,
                -0.1,
                0
            ],
            color: "#d8b4fe",
            signalType: "chemical",
            connections: [
                {
                    targetId: "neuron-types",
                    type: "structural",
                    strength: 1.0,
                    signalType: "chemical",
                    label: "Interface between neurons"
                },
                {
                    targetId: "neurotransmitters",
                    type: "structural",
                    strength: 0.95,
                    signalType: "chemical",
                    label: "Neurotransmitters as signal carriers"
                }
            ],
            schemaMapping: {
                id: "schema-connection-interfaces",
                collection: "connection_interfaces",
                role: "Inter-Node Links",
                description: "The communication junctions between processing units, supporting both fast electrical coupling and flexible chemical signaling with plasticity.",
                fields: [
                    {
                        name: "synapse_class",
                        type: "string",
                        description: "Chemical or electrical"
                    },
                    {
                        name: "cleft_width",
                        type: "float",
                        description: "Synaptic cleft distance (nm)"
                    },
                    {
                        name: "vesicle_count",
                        type: "int",
                        description: "Ready-releasable pool size"
                    },
                    {
                        name: "plasticity_state",
                        type: "string",
                        description: "LTP, LTD, or baseline"
                    }
                ],
                activationState: 0.75,
                linkedModules: [
                    "presynaptic_terminal",
                    "postsynaptic_density",
                    "glial_processes"
                ],
                category: "cellular"
            },
            children: [
                {
                    id: "chemical-synapse",
                    name: "Chemical Synapse",
                    level: "cellular",
                    category: "cellular",
                    description: "The predominant synapse type. Presynaptic action potential triggers Ca2+ influx → vesicle fusion → neurotransmitter release into ~20nm cleft → binding to postsynaptic receptors → EPSP or IPSP. Unidirectional, with ~0.5-1ms synaptic delay. Highly plastic.",
                    functions: [
                        "Convert electrical to chemical signal and back",
                        "Amplify or attenuate signal via vesicle release probability",
                        "Undergo long-term potentiation (LTP) and depression (LTD)",
                        "Enable precise temporal summation and integration"
                    ],
                    position3D: [
                        -0.05,
                        -0.12,
                        0
                    ],
                    color: "#d8b4fe",
                    signalType: "chemical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-chemical-synapse",
                        collection: "connection_interfaces",
                        role: "Standard Communication Port",
                        description: "Unidirectional, plastic signaling junction using chemical messengers for flexible and modulatable transmission.",
                        fields: [
                            {
                                name: "release_probability",
                                type: "float",
                                description: "Vesicle fusion probability per AP"
                            },
                            {
                                name: "quantal_size",
                                type: "float",
                                description: "Neurotransmitter per vesicle"
                            },
                            {
                                name: "synaptic_delay",
                                type: "float",
                                description: "~0.5-1ms transmission delay"
                            },
                            {
                                name: "receptor_type",
                                type: "string",
                                description: "Ionotropic or metabotropic"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "presynaptic_ca_channels",
                            "snare_complex",
                            "postsynaptic_receptors"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "electrical-synapse",
                    name: "Electrical Synapse (Gap Junction)",
                    level: "cellular",
                    category: "cellular",
                    description: "Direct ionic coupling between neurons via connexin/innexin gap junction channels (~3.5nm gap). Bidirectional, near-instantaneous transmission. Enables synchronized firing in interneuron networks. Less plastic than chemical synapses.",
                    functions: [
                        "Enable near-instantaneous signal transmission",
                        "Synchronize firing across neuronal populations",
                        "Allow bidirectional ionic and small molecule flow",
                        "Support fast oscillatory network activity"
                    ],
                    position3D: [
                        0.05,
                        -0.12,
                        0
                    ],
                    color: "#d8b4fe",
                    signalType: "electrical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-electrical-synapse",
                        collection: "connection_interfaces",
                        role: "Direct Coupling Port",
                        description: "Zero-delay bidirectional junction for synchronized activity across neuronal populations.",
                        fields: [
                            {
                                name: "gap_width",
                                type: "float",
                                description: "~3.5nm gap junction distance"
                            },
                            {
                                name: "conductance",
                                type: "float",
                                description: "Junctional conductance (pS)"
                            },
                            {
                                name: "connexin_type",
                                type: "string",
                                description: "Connexin protein subtype (e.g., Cx36)"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "connexin_hemichannels",
                            "interneuron_networks"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "axodendritic-synapse",
                    name: "Axodendritic Synapse",
                    level: "cellular",
                    category: "cellular",
                    description: "The most common synapse location: presynaptic axon terminal contacts a postsynaptic dendrite (often on a dendritic spine). Spines provide biochemical compartmentalization for input-specific plasticity.",
                    functions: [
                        "Standard input site on dendrites and spines",
                        "Enable input-specific synaptic plasticity (per-spine)",
                        "Allow spatial summation across dendritic tree",
                        "Provide biochemical compartmentalization via spines"
                    ],
                    position3D: [
                        -0.03,
                        -0.15,
                        0.02
                    ],
                    color: "#d8b4fe",
                    signalType: "chemical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-axodendritic",
                        collection: "connection_interfaces",
                        role: "Standard Input Port",
                        description: "The canonical synapse location on dendritic spines, providing compartmentalized plasticity for each input.",
                        fields: [
                            {
                                name: "spine_volume",
                                type: "float",
                                description: "Dendritic spine volume (μm³)"
                            },
                            {
                                name: "psd_area",
                                type: "float",
                                description: "Postsynaptic density area (μm²)"
                            },
                            {
                                name: "ampa_receptor_count",
                                type: "int",
                                description: "Number of AMPA receptors"
                            }
                        ],
                        activationState: 0.7,
                        linkedModules: [
                            "dendritic_spine",
                            "psd_scaffold",
                            "actin_cytoskeleton"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "axosomatic-synapse",
                    name: "Axosomatic Synapse",
                    level: "cellular",
                    category: "cellular",
                    description: "Synapse onto the cell body (soma) of the postsynaptic neuron. Typically inhibitory (basket cell terminals). Has powerful influence due to proximity to axon hillock/initial segment where action potentials are initiated.",
                    functions: [
                        "Provide powerful perisomatic inhibition",
                        "Gate output of postsynaptic neuron",
                        "Control timing of action potential generation",
                        "Enable basket cell-mediated gamma oscillations"
                    ],
                    position3D: [
                        0.03,
                        -0.15,
                        0.02
                    ],
                    color: "#d8b4fe",
                    signalType: "chemical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-axosomatic",
                        collection: "connection_interfaces",
                        role: "Perisomatic Gate",
                        description: "High-impact inhibitory synapse near the spike-generating zone, providing powerful output control.",
                        fields: [
                            {
                                name: "proximity_to_ais",
                                type: "float",
                                description: "Distance to axon initial segment (μm)"
                            },
                            {
                                name: "inhibitory_weight",
                                type: "float",
                                description: "IPSP amplitude (mV)"
                            },
                            {
                                name: "basket_terminal",
                                type: "boolean",
                                description: "From basket cell interneuron"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "basket_cells",
                            "soma_membrane",
                            "axon_hillock"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "axoaxonic-synapse",
                    name: "Axoaxonic Synapse",
                    level: "cellular",
                    category: "cellular",
                    description: "Synapse from one axon onto another axon's terminal or initial segment. Enables presynaptic modulation — can increase or decrease neurotransmitter release from the target terminal without changing its membrane potential. Chandelier cells specialize in this.",
                    functions: [
                        "Modulate neurotransmitter release presynaptically",
                        "Enable presynaptic facilitation or inhibition",
                        "Provide gain control at individual synapses",
                        "Chandelier cells target axon initial segments"
                    ],
                    position3D: [
                        0,
                        -0.18,
                        0
                    ],
                    color: "#d8b4fe",
                    signalType: "chemical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-axoaxonic",
                        collection: "connection_interfaces",
                        role: "Presynaptic Modulation Port",
                        description: "Meta-level synapse that modulates another synapse's output, providing fine-grained gain control.",
                        fields: [
                            {
                                name: "modulation_type",
                                type: "string",
                                description: "Facilitation or inhibition"
                            },
                            {
                                name: "release_probability_change",
                                type: "float",
                                description: "Delta in vesicle release probability"
                            },
                            {
                                name: "target_terminal_id",
                                type: "string",
                                description: "Which synapse is being modulated"
                            }
                        ],
                        activationState: 0.5,
                        linkedModules: [
                            "chandelier_cells",
                            "presynaptic_terminals",
                            "gaba_b_receptors"
                        ],
                        category: "cellular"
                    },
                    children: []
                }
            ]
        },
        {
            id: "neurotransmitters",
            name: "Neurotransmitters",
            level: "cellular",
            category: "cellular",
            description: "Chemical messengers released at synapses to transmit signals between neurons. Major categories: amino acids (glutamate, GABA), monoamines (dopamine, serotonin, norepinephrine), acetylcholine, neuropeptides (endorphins, oxytocin, substance P). Each shapes neural computation differently.",
            functions: [
                "Carry signals across the synaptic cleft",
                "Activate specific postsynaptic receptor subtypes",
                "Modulate neural circuit excitability and plasticity",
                "Regulate mood, motivation, pain, and cognition",
                "Enable both fast (ionotropic) and slow (metabotropic) signaling"
            ],
            position3D: [
                0,
                0.1,
                -0.1
            ],
            color: "#f0abfc",
            signalType: "chemical",
            connections: [
                {
                    targetId: "synapse-types",
                    type: "structural",
                    strength: 0.95,
                    signalType: "chemical",
                    label: "Released at synaptic terminals"
                }
            ],
            schemaMapping: {
                id: "schema-signal-molecules",
                collection: "signal_molecules",
                role: "Message Payload Types",
                description: "The vocabulary of chemical signals used by the nervous system. Each molecule type encodes a different category of message (excitation, inhibition, reward, mood, pain, etc.).",
                fields: [
                    {
                        name: "molecule_name",
                        type: "string",
                        description: "Chemical name"
                    },
                    {
                        name: "classification",
                        type: "string",
                        description: "Amino acid, monoamine, peptide, etc."
                    },
                    {
                        name: "primary_effect",
                        type: "string",
                        description: "Excitatory, inhibitory, or modulatory"
                    },
                    {
                        name: "receptor_subtypes",
                        type: "string[]",
                        description: "Known receptor types"
                    }
                ],
                activationState: 0.85,
                linkedModules: [
                    "synaptic_vesicles",
                    "reuptake_transporters",
                    "enzymatic_degradation"
                ],
                category: "cellular"
            },
            children: [
                {
                    id: "glutamate",
                    name: "Glutamate",
                    level: "cellular",
                    category: "cellular",
                    description: "The primary excitatory neurotransmitter of the CNS, used at ~90% of excitatory synapses. Acts on AMPA receptors (fast excitation), NMDA receptors (plasticity, Ca2+ permeable — critical for LTP), and kainate receptors. Excess causes excitotoxicity.",
                    functions: [
                        "Mediate fast excitatory transmission (AMPA)",
                        "Enable synaptic plasticity and memory (NMDA)",
                        "Drive cortical and thalamic circuit activity",
                        "Excitotoxicity in excess (stroke, neurodegeneration)"
                    ],
                    position3D: [
                        -0.08,
                        0.12,
                        -0.1
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-glutamate",
                        collection: "signal_molecules",
                        role: "Primary Excitatory Signal",
                        description: "The dominant excitatory chemical message, driving most fast neural transmission and gating plasticity mechanisms.",
                        fields: [
                            {
                                name: "concentration_mm",
                                type: "float",
                                description: "Synaptic cleft concentration (mM)"
                            },
                            {
                                name: "receptor_target",
                                type: "string",
                                description: "AMPA, NMDA, kainate, mGluR"
                            },
                            {
                                name: "clearance_mechanism",
                                type: "string",
                                description: "EAAT transporter reuptake"
                            }
                        ],
                        activationState: 0.8,
                        linkedModules: [
                            "ampa_receptors",
                            "nmda_receptors",
                            "astrocyte_glutamate_uptake"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "gaba",
                    name: "GABA (γ-Aminobutyric Acid)",
                    level: "cellular",
                    category: "cellular",
                    description: "The primary inhibitory neurotransmitter of the CNS. GABA-A receptors (ionotropic, Cl- channels — fast inhibition, target of benzodiazepines and barbiturates). GABA-B receptors (metabotropic, K+ channels — slow, prolonged inhibition). Synthesized from glutamate by GAD enzyme.",
                    functions: [
                        "Mediate fast inhibition via GABA-A (Cl- influx)",
                        "Mediate slow inhibition via GABA-B (K+ efflux)",
                        "Balance excitatory activity to prevent seizures",
                        "Shape temporal dynamics of neural circuits",
                        "Target of anxiolytics (benzodiazepines)"
                    ],
                    position3D: [
                        -0.04,
                        0.1,
                        -0.1
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [],
                    schemaMapping: {
                        id: "schema-gaba",
                        collection: "signal_molecules",
                        role: "Primary Inhibitory Signal",
                        description: "The dominant inhibitory chemical message, essential for preventing runaway excitation and shaping temporal coding.",
                        fields: [
                            {
                                name: "receptor_target",
                                type: "string",
                                description: "GABA-A (fast) or GABA-B (slow)"
                            },
                            {
                                name: "cl_reversal_potential",
                                type: "float",
                                description: "Chloride equilibrium (mV)"
                            },
                            {
                                name: "gad_expression",
                                type: "float",
                                description: "Synthesis enzyme level"
                            }
                        ],
                        activationState: 0.75,
                        linkedModules: [
                            "gaba_a_receptors",
                            "gaba_b_receptors",
                            "gat_transporters"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "dopamine",
                    name: "Dopamine",
                    level: "cellular",
                    category: "cellular",
                    description: "Monoamine neurotransmitter central to reward, motivation, motor control, and executive function. Major pathways: mesolimbic (reward), mesocortical (cognition), nigrostriatal (movement), tuberoinfundibular (prolactin regulation). Dysfunction in Parkinson's (loss), schizophrenia (excess), and addiction.",
                    functions: [
                        "Signal reward prediction and prediction error",
                        "Drive motivation and goal-directed behavior",
                        "Modulate prefrontal executive function",
                        "Enable smooth voluntary movement (basal ganglia)",
                        "Regulate prolactin secretion"
                    ],
                    position3D: [
                        0,
                        0.14,
                        -0.1
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "basal-ganglia",
                            type: "modulatory",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "Nigrostriatal motor pathway"
                        },
                        {
                            targetId: "prefrontal-cortex",
                            type: "modulatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "Mesocortical cognitive modulation"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-reward-signal",
                        collection: "reward_signal",
                        role: "Reinforcement Signal",
                        description: "The primary reinforcement learning signal encoding reward prediction errors to shape future behavior.",
                        fields: [
                            {
                                name: "prediction_error",
                                type: "float",
                                description: "Actual - expected reward (RPE)"
                            },
                            {
                                name: "tonic_level",
                                type: "float",
                                description: "Baseline dopamine concentration"
                            },
                            {
                                name: "phasic_burst",
                                type: "float",
                                description: "Reward-driven burst firing"
                            },
                            {
                                name: "pathway",
                                type: "string",
                                description: "Mesolimbic, mesocortical, nigrostriatal, or tuberoinfundibular"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "vta",
                            "substantia_nigra",
                            "nucleus_accumbens",
                            "prefrontal_cortex"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "serotonin",
                    name: "Serotonin (5-HT)",
                    level: "cellular",
                    category: "cellular",
                    description: "Monoamine neurotransmitter with widespread modulatory influence from raphe nuclei in brainstem. At least 14 receptor subtypes (5-HT1 through 5-HT7). Regulates mood, sleep/wake, appetite, pain, and gut motility (~95% of body's 5-HT is in the gut). Target of SSRIs for depression.",
                    functions: [
                        "Modulate mood and emotional state",
                        "Regulate sleep-wake cycle (with melatonin precursor)",
                        "Control appetite and satiety",
                        "Modulate pain perception centrally",
                        "Regulate gut motility (enteric serotonin)"
                    ],
                    position3D: [
                        0.04,
                        0.12,
                        -0.1
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "raphe-nuclei",
                            type: "structural",
                            strength: 0.95,
                            signalType: "chemical",
                            label: "Origin from brainstem raphe"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-mood-baseline",
                        collection: "mood_baseline",
                        role: "State Stabilizer",
                        description: "Widespread modulatory signal that sets the baseline tone for mood, arousal, and appetite across the brain.",
                        fields: [
                            {
                                name: "receptor_subtype",
                                type: "string",
                                description: "5-HT1A, 5-HT2A, 5-HT3, etc."
                            },
                            {
                                name: "tonic_level",
                                type: "float",
                                description: "Baseline serotonin concentration"
                            },
                            {
                                name: "reuptake_rate",
                                type: "float",
                                description: "SERT transporter activity"
                            },
                            {
                                name: "mood_index",
                                type: "float",
                                description: "Net affective modulation (-1 to +1)"
                            }
                        ],
                        activationState: 0.65,
                        linkedModules: [
                            "dorsal_raphe",
                            "median_raphe",
                            "cortical_targets",
                            "limbic_targets"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "norepinephrine",
                    name: "Norepinephrine (Noradrenaline)",
                    level: "cellular",
                    category: "cellular",
                    description: "Monoamine neurotransmitter released from the locus coeruleus with widespread projections throughout the brain. Enhances alertness, attention, and vigilance. Acts on alpha and beta adrenergic receptors. Also released peripherally by sympathetic postganglionic neurons.",
                    functions: [
                        "Enhance alertness and wakefulness",
                        "Increase selective attention and focus",
                        "Modulate working memory in prefrontal cortex",
                        "Facilitate stress-related memory consolidation",
                        "Regulate autonomic sympathetic tone (peripherally)"
                    ],
                    position3D: [
                        0.08,
                        0.1,
                        -0.1
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "locus-coeruleus",
                            type: "structural",
                            strength: 0.95,
                            signalType: "chemical",
                            label: "Origin from locus coeruleus"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-norepinephrine",
                        collection: "signal_molecules",
                        role: "Alertness and Attention Signal",
                        description: "Global arousal modulator that amplifies sensory processing and attentional focus during salient events.",
                        fields: [
                            {
                                name: "lc_firing_mode",
                                type: "string",
                                description: "Tonic (exploratory) or phasic (focused)"
                            },
                            {
                                name: "arousal_level",
                                type: "float",
                                description: "Global brain arousal state"
                            },
                            {
                                name: "receptor_target",
                                type: "string",
                                description: "Alpha-1, alpha-2, beta-1, beta-2"
                            }
                        ],
                        activationState: 0.55,
                        linkedModules: [
                            "locus_coeruleus",
                            "prefrontal_cortex",
                            "amygdala",
                            "hippocampus"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "acetylcholine",
                    name: "Acetylcholine (ACh)",
                    level: "cellular",
                    category: "cellular",
                    description: "The first neurotransmitter discovered. Two major CNS sources: basal forebrain (Meynert nucleus → cortex, for attention/memory) and pedunculopontine/laterodorsal tegmentum (→ thalamus, for arousal). Also the neuromuscular junction transmitter. Nicotinic (ionotropic) and muscarinic (metabotropic) receptors.",
                    functions: [
                        "Activate skeletal muscle at neuromuscular junction",
                        "Enhance cortical attention and arousal (basal forebrain)",
                        "Support memory encoding in hippocampus",
                        "Modulate thalamic relay for sensory gating",
                        "Mediate parasympathetic postganglionic effects"
                    ],
                    position3D: [
                        -0.06,
                        0.08,
                        -0.12
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "basal-forebrain",
                            type: "structural",
                            strength: 0.9,
                            signalType: "chemical",
                            label: "Nucleus basalis of Meynert projection"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-acetylcholine",
                        collection: "signal_molecules",
                        role: "Muscle Activator and Memory Enabler",
                        description: "Dual-role transmitter driving muscle contraction peripherally and enabling cortical attention/memory centrally.",
                        fields: [
                            {
                                name: "receptor_type",
                                type: "string",
                                description: "Nicotinic (nAChR) or muscarinic (mAChR)"
                            },
                            {
                                name: "source_nucleus",
                                type: "string",
                                description: "Basal forebrain, PPN/LDT, or motor neuron"
                            },
                            {
                                name: "cholinesterase_activity",
                                type: "float",
                                description: "AChE degradation rate"
                            }
                        ],
                        activationState: 0.6,
                        linkedModules: [
                            "nucleus_basalis",
                            "motor_endplate",
                            "hippocampal_cholinergic"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "endorphins",
                    name: "Endorphins",
                    level: "cellular",
                    category: "cellular",
                    description: "Endogenous opioid neuropeptides (β-endorphin, enkephalins, dynorphins) that bind to mu, delta, and kappa opioid receptors. Released during pain, stress, and exercise. Produce analgesia, euphoria, and modulate stress response. Mechanism of opioid drug action.",
                    functions: [
                        "Produce endogenous analgesia (pain relief)",
                        "Induce euphoria and reward (runner's high)",
                        "Modulate stress and anxiety response",
                        "Regulate immune function",
                        "Inhibit substance P and pain pathways"
                    ],
                    position3D: [
                        0.02,
                        0.06,
                        -0.12
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "periaqueductal-gray",
                            type: "modulatory",
                            strength: 0.85,
                            signalType: "chemical",
                            label: "PAG endorphin-mediated analgesia"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-endorphins",
                        collection: "signal_molecules",
                        role: "Pain Relief and Reward Peptide",
                        description: "Endogenous opioid peptides that suppress pain signaling and produce reward states during stress and physical exertion.",
                        fields: [
                            {
                                name: "opioid_type",
                                type: "string",
                                description: "β-endorphin, enkephalin, or dynorphin"
                            },
                            {
                                name: "receptor_target",
                                type: "string",
                                description: "Mu, delta, or kappa opioid receptor"
                            },
                            {
                                name: "analgesia_level",
                                type: "float",
                                description: "Pain suppression magnitude"
                            }
                        ],
                        activationState: 0.3,
                        linkedModules: [
                            "periaqueductal_gray",
                            "raphe_magnus",
                            "spinal_dorsal_horn"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "oxytocin",
                    name: "Oxytocin",
                    level: "cellular",
                    category: "cellular",
                    description: "Neuropeptide produced in the hypothalamic paraventricular and supraoptic nuclei. Released both as a hormone (posterior pituitary → blood) and as a neuromodulator within the brain. Promotes social bonding, trust, empathy, maternal behavior, and pair bonding. Also triggers uterine contraction and milk let-down.",
                    functions: [
                        "Promote social bonding and trust",
                        "Enhance empathy and social cognition",
                        "Trigger uterine contractions in labor",
                        "Stimulate milk let-down reflex",
                        "Reduce cortisol and anxiety in social contexts"
                    ],
                    position3D: [
                        0.06,
                        0.08,
                        -0.14
                    ],
                    color: "#f0abfc",
                    signalType: "hormonal",
                    connections: [
                        {
                            targetId: "hypothalamus-pvn",
                            type: "structural",
                            strength: 0.95,
                            signalType: "chemical",
                            label: "Produced in PVN and SON"
                        },
                        {
                            targetId: "amygdala",
                            type: "modulatory",
                            strength: 0.7,
                            signalType: "chemical",
                            label: "Reduces amygdala fear response"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-oxytocin",
                        collection: "signal_molecules",
                        role: "Social Bonding Signal",
                        description: "Neuropeptide that facilitates trust, attachment, and prosocial behavior by modulating limbic and reward circuits.",
                        fields: [
                            {
                                name: "plasma_level",
                                type: "float",
                                description: "Circulating oxytocin (pg/mL)"
                            },
                            {
                                name: "central_release",
                                type: "float",
                                description: "Brain parenchymal concentration"
                            },
                            {
                                name: "social_context",
                                type: "string",
                                description: "Bonding, trust, or reproductive trigger"
                            }
                        ],
                        activationState: 0.4,
                        linkedModules: [
                            "paraventricular_nucleus",
                            "supraoptic_nucleus",
                            "posterior_pituitary",
                            "amygdala"
                        ],
                        category: "cellular"
                    },
                    children: []
                },
                {
                    id: "substance-p",
                    name: "Substance P",
                    level: "cellular",
                    category: "cellular",
                    description: "An 11-amino acid neuropeptide released by C-fiber nociceptors in the spinal dorsal horn. Acts on neurokinin-1 (NK1) receptors. Major role in pain transmission, neurogenic inflammation, and vomiting reflex. Co-released with glutamate at pain synapses.",
                    functions: [
                        "Transmit pain signals in spinal dorsal horn",
                        "Promote neurogenic inflammation (vasodilation, edema)",
                        "Mediate vomiting reflex via brainstem NK1 receptors",
                        "Amplify nociceptive signaling (wind-up phenomenon)"
                    ],
                    position3D: [
                        -0.02,
                        0.06,
                        -0.14
                    ],
                    color: "#f0abfc",
                    signalType: "chemical",
                    connections: [
                        {
                            targetId: "spinal-dorsal-horn",
                            type: "excitatory",
                            strength: 0.8,
                            signalType: "chemical",
                            label: "Slow pain transmission in lamina I"
                        }
                    ],
                    schemaMapping: {
                        id: "schema-substance-p",
                        collection: "signal_molecules",
                        role: "Pain Signaling Peptide",
                        description: "Nociceptive neuropeptide that amplifies pain transmission and drives neurogenic inflammation at injury sites.",
                        fields: [
                            {
                                name: "nk1_receptor_binding",
                                type: "float",
                                description: "NK1 receptor activation level"
                            },
                            {
                                name: "inflammation_index",
                                type: "float",
                                description: "Neurogenic inflammation magnitude"
                            },
                            {
                                name: "corelease_with_glutamate",
                                type: "boolean",
                                description: "Co-transmitted with glutamate"
                            }
                        ],
                        activationState: 0.25,
                        linkedModules: [
                            "c_fiber_terminals",
                            "dorsal_horn_lamina_i",
                            "brainstem_vomiting_center"
                        ],
                        category: "cellular"
                    },
                    children: []
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/anatomy/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "anatomyRoot",
    ()=>anatomyRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$cerebrum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/cerebrum.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$cerebellum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/cerebellum.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$brainstem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/brainstem.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$limbic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/limbic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$autonomic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/autonomic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$cranial$2d$nerves$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/cranial-nerves.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$pathways$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/pathways.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$microscopic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/anatomy/microscopic.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const anatomyRoot = {
    id: "human-nervous-system",
    name: "Human Nervous System",
    level: "macro",
    category: "cerebrum",
    description: "The complete human nervous system — a distributed, redundant, network-based parallel-processing system containing approximately 86 billion neurons forming 100 trillion synaptic connections across hundreds of named anatomical regions.",
    functions: [
        "Conscious thought and abstract reasoning",
        "Voluntary and involuntary movement control",
        "Sensory perception and integration",
        "Autonomic regulation of vital functions",
        "Memory encoding, storage, and retrieval",
        "Emotional processing and social cognition",
        "Language production and comprehension",
        "Homeostatic regulation of internal state"
    ],
    children: [
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$cerebrum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cerebrum"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$cerebellum$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cerebellum"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$brainstem$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["brainstem"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$limbic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["limbicSystem"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$autonomic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["autonomicSystem"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$cranial$2d$nerves$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cranialNerves"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$pathways$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["neuralPathways"],
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$microscopic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microscopicStructures"]
    ],
    position3D: [
        0,
        0,
        0
    ],
    color: "#6366f1",
    schemaMapping: {
        id: "schema-root",
        collection: "system_root",
        role: "Master Orchestrator",
        description: "Root-level system coordinating all cognitive, autonomic, and sensory subsystems",
        fields: [
            {
                name: "global_state",
                type: "vector<f32>",
                description: "Aggregate system state embedding"
            },
            {
                name: "consciousness_level",
                type: "f32",
                description: "Wakefulness/awareness metric (0=coma, 1=fully alert)"
            },
            {
                name: "active_subsystems",
                type: "string[]",
                description: "Currently active module identifiers"
            },
            {
                name: "timestamp",
                type: "u64",
                description: "System time reference"
            }
        ],
        activationState: 1.0,
        linkedModules: [
            "schema-cognitive-modules",
            "schema-error-correction",
            "schema-background-processes",
            "schema-memory-embeddings",
            "schema-autonomic-engine",
            "schema-signal-router"
        ],
        category: "cerebrum"
    },
    connections: [],
    signalType: "electrical"
};
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/mappings.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSchemaGraph",
    ()=>buildSchemaGraph,
    "findBioIdBySchemaId",
    ()=>findBioIdBySchemaId,
    "findNodeById",
    ()=>findNodeById,
    "findSchemaByBioId",
    ()=>findSchemaByBioId,
    "findSchemaById",
    ()=>findSchemaById,
    "flattenTree",
    ()=>flattenTree,
    "getAllBioNodes",
    ()=>getAllBioNodes,
    "getAllSchemaNodes",
    ()=>getAllSchemaNodes,
    "getChildrenOf",
    ()=>getChildrenOf,
    "searchNodes",
    ()=>searchNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/anatomy/index.ts [app-client] (ecmascript) <locals>");
;
;
let nodeCache = null;
let schemaCache = null;
let bioToSchemaCache = null;
let schemaToBioCache = null;
function buildCaches() {
    if (nodeCache) return;
    nodeCache = new Map();
    schemaCache = new Map();
    bioToSchemaCache = new Map();
    schemaToBioCache = new Map();
    function walk(node) {
        nodeCache.set(node.id, node);
        if (node.schemaMapping) {
            schemaCache.set(node.schemaMapping.id, node.schemaMapping);
            bioToSchemaCache.set(node.id, node.schemaMapping.id);
            schemaToBioCache.set(node.schemaMapping.id, node.id);
        }
        for (const child of node.children){
            walk(child);
        }
    }
    walk(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$anatomy$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["anatomyRoot"]);
}
function findNodeById(id) {
    buildCaches();
    return nodeCache.get(id);
}
function findSchemaById(id) {
    buildCaches();
    return schemaCache.get(id);
}
function findSchemaByBioId(bioId) {
    buildCaches();
    var _bioToSchemaCache_get;
    return (_bioToSchemaCache_get = bioToSchemaCache.get(bioId)) !== null && _bioToSchemaCache_get !== void 0 ? _bioToSchemaCache_get : null;
}
function findBioIdBySchemaId(schemaId) {
    buildCaches();
    var _schemaToBioCache_get;
    return (_schemaToBioCache_get = schemaToBioCache.get(schemaId)) !== null && _schemaToBioCache_get !== void 0 ? _schemaToBioCache_get : null;
}
function getAllBioNodes() {
    buildCaches();
    return Array.from(nodeCache.values());
}
function getAllSchemaNodes() {
    buildCaches();
    return Array.from(schemaCache.values());
}
function getChildrenOf(id) {
    const node = findNodeById(id);
    var _node_children;
    return (_node_children = node === null || node === void 0 ? void 0 : node.children) !== null && _node_children !== void 0 ? _node_children : [];
}
function flattenTree(node) {
    const result = [
        node
    ];
    for (const child of node.children){
        result.push(...flattenTree(child));
    }
    return result;
}
function searchNodes(query) {
    buildCaches();
    const lower = query.toLowerCase();
    return Array.from(nodeCache.values()).filter((node)=>{
        var _node_schemaMapping, _node_schemaMapping1;
        return node.name.toLowerCase().includes(lower) || node.description.toLowerCase().includes(lower) || node.functions.some((f)=>f.toLowerCase().includes(lower)) || ((_node_schemaMapping = node.schemaMapping) === null || _node_schemaMapping === void 0 ? void 0 : _node_schemaMapping.collection.toLowerCase().includes(lower)) || ((_node_schemaMapping1 = node.schemaMapping) === null || _node_schemaMapping1 === void 0 ? void 0 : _node_schemaMapping1.role.toLowerCase().includes(lower));
    });
}
function buildSchemaGraph() {
    buildCaches();
    const nodes = [];
    const links = [];
    const seen = new Set();
    for (const schema of schemaCache.values()){
        if (!seen.has(schema.id)) {
            seen.add(schema.id);
            nodes.push({
                id: schema.id,
                name: schema.role,
                val: schema.fields.length + 1,
                color: schema.category in {
                    cerebrum: 1,
                    brainstem: 1,
                    cerebellum: 1,
                    limbic: 1,
                    autonomic: 1,
                    peripheral: 1,
                    endocrine: 1,
                    organ: 1,
                    pathway: 1,
                    cellular: 1
                } ? getCategoryColor(schema.category) : "#6366f1",
                category: schema.category
            });
        }
        for (const linkedId of schema.linkedModules){
            if (schemaCache.has(linkedId)) {
                links.push({
                    source: schema.id,
                    target: linkedId,
                    type: "modulatory",
                    strength: 0.5
                });
            }
        }
    }
    return {
        nodes,
        links
    };
}
function getCategoryColor(category) {
    const colors = {
        cerebrum: "#6366f1",
        cerebellum: "#8b5cf6",
        brainstem: "#ec4899",
        limbic: "#f97316",
        autonomic: "#22c55e",
        peripheral: "#eab308",
        endocrine: "#f59e0b",
        organ: "#ef4444",
        pathway: "#06b6d4",
        cellular: "#a78bfa"
    };
    var _colors_category;
    return (_colors_category = colors[category]) !== null && _colors_category !== void 0 ? _colors_category : "#6366f1";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useExplorerStore",
    ()=>useExplorerStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mappings.ts [app-client] (ecmascript) <locals>");
;
;
const useExplorerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        selectedBioNodeId: null,
        selectedSchemaNodeId: null,
        hoveredBioNodeId: null,
        drillDownPath: [],
        currentLevel: "macro",
        visibleLayers: new Set([
            "nervous"
        ]),
        showConnections: true,
        showSignalFlow: false,
        schemaViewMode: "split",
        selectBioNode: (id)=>{
            const schemaId = id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findSchemaByBioId"])(id) : null;
            set({
                selectedBioNodeId: id,
                selectedSchemaNodeId: schemaId
            });
        },
        selectSchemaNode: (id)=>{
            const bioId = id ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findBioIdBySchemaId"])(id) : null;
            set({
                selectedSchemaNodeId: id,
                selectedBioNodeId: bioId
            });
        },
        hoverBioNode: (id)=>set({
                hoveredBioNodeId: id
            }),
        drillInto: (id)=>{
            const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findNodeById"])(id);
            if (!node) return;
            set((state)=>({
                    drillDownPath: [
                        ...state.drillDownPath,
                        id
                    ],
                    currentLevel: node.level,
                    selectedBioNodeId: id,
                    selectedSchemaNodeId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findSchemaByBioId"])(id)
                }));
        },
        drillOut: ()=>{
            set((state)=>{
                const newPath = [
                    ...state.drillDownPath
                ];
                newPath.pop();
                const parentId = newPath[newPath.length - 1] || null;
                const parentNode = parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findNodeById"])(parentId) : null;
                return {
                    drillDownPath: newPath,
                    currentLevel: (parentNode === null || parentNode === void 0 ? void 0 : parentNode.level) || "macro",
                    selectedBioNodeId: parentId,
                    selectedSchemaNodeId: parentId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findSchemaByBioId"])(parentId) : null
                };
            });
        },
        drillToRoot: ()=>{
            set({
                drillDownPath: [],
                currentLevel: "macro",
                selectedBioNodeId: null,
                selectedSchemaNodeId: null
            });
        },
        toggleLayer: (layer)=>{
            set((state)=>{
                const next = new Set(state.visibleLayers);
                if (next.has(layer)) next.delete(layer);
                else next.add(layer);
                return {
                    visibleLayers: next
                };
            });
        },
        setSchemaViewMode: (mode)=>set({
                schemaViewMode: mode
            }),
        setShowConnections: (show)=>set({
                showConnections: show
            }),
        setShowSignalFlow: (show)=>set({
                showSignalFlow: show
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/brain-model-loader.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BRAIN_MODEL_REGISTRY",
    ()=>BRAIN_MODEL_REGISTRY,
    "DEFAULT_VISIBLE",
    ()=>DEFAULT_VISIBLE,
    "LAYER_GROUPS",
    ()=>LAYER_GROUPS,
    "parseBrainModel",
    ()=>parseBrainModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
function parseBrainModel(json) {
    const { vertices, normals, faces } = json.model;
    const srcPositions = vertices;
    const srcNormals = normals;
    const outPositions = [];
    const outNormals = [];
    let i = 0;
    while(i < faces.length){
        const flag = faces[i++];
        const isQuad = !!(flag & 1);
        const hasMaterial = !!(flag & 2);
        const hasFaceVertexUv = !!(flag & 8);
        const hasFaceVertexNormal = !!(flag & 32);
        const hasFaceVertexColor = !!(flag & 128);
        const nVerts = isQuad ? 4 : 3;
        const vertIndices = [];
        for(let v = 0; v < nVerts; v++)vertIndices.push(faces[i++]);
        if (hasMaterial) i++;
        const normalIndices = [];
        if (hasFaceVertexUv) i += nVerts;
        if (hasFaceVertexNormal) {
            for(let v = 0; v < nVerts; v++)normalIndices.push(faces[i++]);
        }
        if (hasFaceVertexColor) i += nVerts;
        // Emit triangle(s)
        const triSets = isQuad ? [
            [
                0,
                1,
                2
            ],
            [
                0,
                2,
                3
            ]
        ] : [
            [
                0,
                1,
                2
            ]
        ];
        for (const tri of triSets){
            for (const t of tri){
                const vi = vertIndices[t];
                outPositions.push(srcPositions[vi * 3], srcPositions[vi * 3 + 1], srcPositions[vi * 3 + 2]);
                if (normalIndices.length > 0) {
                    const ni = normalIndices[t];
                    outNormals.push(srcNormals[ni * 3], srcNormals[ni * 3 + 1], srcNormals[ni * 3 + 2]);
                } else {
                    outNormals.push(srcNormals[vi * 3], srcNormals[vi * 3 + 1], srcNormals[vi * 3 + 2]);
                }
            }
        }
    }
    const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
    geometry.setAttribute("position", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](outPositions, 3));
    geometry.setAttribute("normal", new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float32BufferAttribute"](outNormals, 3));
    return geometry;
}
const BRAIN_MODEL_REGISTRY = [
    // Cerebral hemispheres
    {
        id: "left-hemisphere",
        name: "Left Hemisphere",
        file: "Brain-cerebral_hemisphere-left.json",
        parent: null,
        color: "#6366f1",
        opacity: 0.3,
        category: "cerebrum"
    },
    {
        id: "right-hemisphere",
        name: "Right Hemisphere",
        file: "Brain-cerebral_hemisphere-right.json",
        parent: null,
        color: "#818cf8",
        opacity: 0.3,
        category: "cerebrum"
    },
    // Cerebellum
    {
        id: "cerebellum",
        name: "Cerebellum",
        file: "Brain-cerebellum.json",
        parent: null,
        color: "#8b5cf6",
        opacity: 0.55,
        category: "cerebellum"
    },
    // Brainstem
    {
        id: "midbrain",
        name: "Midbrain",
        file: "Brain-brain_stem-midbrain.json",
        parent: null,
        color: "#ec4899",
        opacity: 0.6,
        category: "brainstem"
    },
    {
        id: "pons",
        name: "Pons",
        file: "Brain-brain_stem-pons.json",
        parent: null,
        color: "#f472b6",
        opacity: 0.6,
        category: "brainstem"
    },
    {
        id: "medulla",
        name: "Medulla Oblongata",
        file: "Brain-brain_stem-medulla_oblongata.json",
        parent: null,
        color: "#db2777",
        opacity: 0.6,
        category: "brainstem"
    },
    // Limbic system
    {
        id: "hippocampus",
        name: "Hippocampus",
        file: "Brain-limbic_system-hippocampus-hippocampus.json",
        parent: null,
        color: "#f97316",
        opacity: 0.75,
        category: "limbic"
    },
    {
        id: "amygdala",
        name: "Amygdala",
        file: "Brain-limbic_system-amygdala.json",
        parent: null,
        color: "#ef4444",
        opacity: 0.75,
        category: "limbic"
    },
    {
        id: "hypothalamus",
        name: "Hypothalamus",
        file: "Brain-limbic_system-hypothalamus.json",
        parent: null,
        color: "#f59e0b",
        opacity: 0.75,
        category: "limbic"
    },
    {
        id: "entorhinal-cortex",
        name: "Entorhinal Cortex",
        file: "Brain-limbic_system-entorhinal_cortex.json",
        parent: null,
        color: "#fb923c",
        opacity: 0.7,
        category: "limbic"
    },
    {
        id: "dentate-gyrus",
        name: "Dentate Gyrus",
        file: "Brain-limbic_system-hippocampus-dentate_gyrus.json",
        parent: null,
        color: "#fdba74",
        opacity: 0.7,
        category: "limbic"
    },
    {
        id: "subiculum",
        name: "Subiculum",
        file: "Brain-limbic_system-hippocampus-subiculum.json",
        parent: null,
        color: "#fed7aa",
        opacity: 0.65,
        category: "limbic"
    },
    // Thalamus & related
    {
        id: "thalamus",
        name: "Thalamus",
        file: "Brain-thalamus.json",
        parent: null,
        color: "#f97316",
        opacity: 0.65,
        category: "limbic"
    },
    {
        id: "corpus-callosum",
        name: "Corpus Callosum",
        file: "Brain-corpus_callosum.json",
        parent: null,
        color: "#e2e8f0",
        opacity: 0.4,
        category: "cerebrum"
    },
    {
        id: "ventricles",
        name: "Ventricles",
        file: "Brain-ventricles.json",
        parent: null,
        color: "#38bdf8",
        opacity: 0.3,
        category: "organ"
    },
    {
        id: "pituitary",
        name: "Pituitary Gland",
        file: "Brain-pituitary_gland.json",
        parent: null,
        color: "#fbbf24",
        opacity: 0.7,
        category: "endocrine"
    },
    {
        id: "olfactory-bulb",
        name: "Olfactory Bulb",
        file: "Brain-olfactory_bulb.json",
        parent: null,
        color: "#a3e635",
        opacity: 0.65,
        category: "peripheral"
    },
    {
        id: "auditory-cortex",
        name: "Primary Auditory Cortex",
        file: "Brain-primary_auditory_cortex.json",
        parent: null,
        color: "#2dd4bf",
        opacity: 0.65,
        category: "cerebrum"
    },
    // Basal ganglia
    {
        id: "caudate-nucleus",
        name: "Caudate Nucleus",
        file: "Brain-basal_ganglia-caudate_nucleus.json",
        parent: null,
        color: "#fb923c",
        opacity: 0.7,
        category: "limbic"
    },
    {
        id: "putamen",
        name: "Putamen",
        file: "Brain-basal_ganglia-putamen.json",
        parent: null,
        color: "#f97316",
        opacity: 0.65,
        category: "limbic"
    },
    {
        id: "globus-pallidus",
        name: "Globus Pallidus",
        file: "Brain-basal_ganglia-globus_pallidus.json",
        parent: null,
        color: "#ea580c",
        opacity: 0.65,
        category: "limbic"
    },
    {
        id: "nucleus-accumbens",
        name: "Nucleus Accumbens",
        file: "Brain-basal_ganglia-nucleus_accumbens.json",
        parent: null,
        color: "#c2410c",
        opacity: 0.7,
        category: "limbic"
    },
    {
        id: "substantia-nigra",
        name: "Substantia Nigra",
        file: "Brain-basal_ganglia-substantia_nigra.json",
        parent: null,
        color: "#9a3412",
        opacity: 0.7,
        category: "brainstem"
    },
    {
        id: "subthalamic-nucleus",
        name: "Subthalamic Nucleus",
        file: "Brain-basal_ganglia-subthalamic_nucleus.json",
        parent: null,
        color: "#7c2d12",
        opacity: 0.7,
        category: "limbic"
    },
    // Cranial nerves
    {
        id: "cn-i",
        name: "CN I — Olfactory",
        file: "Brain-cranial_nerves-cranial_nerve_I_olfactory.json",
        parent: null,
        color: "#a3e635",
        opacity: 0.6,
        category: "peripheral"
    },
    {
        id: "cn-ii",
        name: "CN II — Optic",
        file: "Brain-cranial_nerves-cranial_nerve_II_optic.json",
        parent: null,
        color: "#60a5fa",
        opacity: 0.6,
        category: "peripheral"
    },
    {
        id: "cn-iii",
        name: "CN III — Oculomotor",
        file: "Brain-cranial_nerves-cranial_nerve_III_oculomotor.json",
        parent: null,
        color: "#f97316",
        opacity: 0.55,
        category: "peripheral"
    },
    {
        id: "cn-iv",
        name: "CN IV — Trochlear",
        file: "Brain-cranial_nerves-cranial_nerve_IV_trochlear.json",
        parent: null,
        color: "#f97316",
        opacity: 0.55,
        category: "peripheral"
    },
    {
        id: "cn-v",
        name: "CN V — Trigeminal",
        file: "Brain-cranial_nerves-cranial_nerve_V_trigeminal.json",
        parent: null,
        color: "#e879f9",
        opacity: 0.6,
        category: "peripheral"
    },
    {
        id: "cn-vi",
        name: "CN VI — Abducens",
        file: "Brain-cranial_nerves-cranial_nerve_VI_abducens.json",
        parent: null,
        color: "#f97316",
        opacity: 0.55,
        category: "peripheral"
    },
    {
        id: "cn-vii",
        name: "CN VII — Facial",
        file: "Brain-cranial_nerves-cranial_nerve_VII_facial.json",
        parent: null,
        color: "#fbbf24",
        opacity: 0.6,
        category: "peripheral"
    },
    {
        id: "cn-viii",
        name: "CN VIII — Vestibulocochlear",
        file: "Brain-cranial_nerves-cranial_nerve_VIII_vestibulocochlear.json",
        parent: null,
        color: "#2dd4bf",
        opacity: 0.6,
        category: "peripheral"
    },
    {
        id: "cn-ix",
        name: "CN IX — Glossopharyngeal",
        file: "Brain-cranial_nerves-cranial_nerve_IX_glossopharyngeal.json",
        parent: null,
        color: "#fb923c",
        opacity: 0.55,
        category: "peripheral"
    },
    {
        id: "cn-x",
        name: "CN X — Vagus",
        file: "Brain-cranial_nerves-cranial_nerve_X_vagus.json",
        parent: null,
        color: "#22c55e",
        opacity: 0.65,
        category: "peripheral"
    },
    {
        id: "cn-xi",
        name: "CN XI — Accessory",
        file: "Brain-cranial_nerves-cranial_nerve_XI_accessory.json",
        parent: null,
        color: "#f87171",
        opacity: 0.55,
        category: "peripheral"
    },
    {
        id: "cn-xii",
        name: "CN XII — Hypoglossal",
        file: "Brain-cranial_nerves-cranial_nerve_XII_hypoglossal.json",
        parent: null,
        color: "#c084fc",
        opacity: 0.55,
        category: "peripheral"
    }
];
const LAYER_GROUPS = {
    hemispheres: [
        "left-hemisphere",
        "right-hemisphere",
        "corpus-callosum",
        "auditory-cortex",
        "olfactory-bulb"
    ],
    cerebellum: [
        "cerebellum"
    ],
    brainstem: [
        "midbrain",
        "pons",
        "medulla",
        "substantia-nigra"
    ],
    limbic: [
        "hippocampus",
        "amygdala",
        "hypothalamus",
        "entorhinal-cortex",
        "dentate-gyrus",
        "subiculum",
        "thalamus"
    ],
    deepStructures: [
        "ventricles",
        "pituitary"
    ],
    basalGanglia: [
        "caudate-nucleus",
        "putamen",
        "globus-pallidus",
        "nucleus-accumbens",
        "subthalamic-nucleus"
    ],
    cranialNerves: [
        "cn-i",
        "cn-ii",
        "cn-iii",
        "cn-iv",
        "cn-v",
        "cn-vi",
        "cn-vii",
        "cn-viii",
        "cn-ix",
        "cn-x",
        "cn-xi",
        "cn-xii"
    ]
};
const DEFAULT_VISIBLE = new Set([
    "left-hemisphere",
    "right-hemisphere",
    "cerebellum",
    "midbrain",
    "pons",
    "medulla",
    "thalamus",
    "corpus-callosum"
]);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/body/Brain3DViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrainViewProvider",
    ()=>BrainViewProvider,
    "default",
    ()=>Brain3DViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/brain-model-loader.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const geometryCache = new Map();
const loadingSet = new Set();
function useBrainGeometry(file) {
    _s();
    var _geometryCache_get;
    const [geometry, setGeometry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])((_geometryCache_get = geometryCache.get(file)) !== null && _geometryCache_get !== void 0 ? _geometryCache_get : null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBrainGeometry.useEffect": ()=>{
            if (geometryCache.has(file)) {
                setGeometry(geometryCache.get(file));
                return;
            }
            if (loadingSet.has(file)) return;
            loadingSet.add(file);
            fetch("/models/brain/".concat(file)).then({
                "useBrainGeometry.useEffect": (r)=>r.json()
            }["useBrainGeometry.useEffect"]).then({
                "useBrainGeometry.useEffect": (json)=>{
                    const geo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseBrainModel"])(json);
                    geometryCache.set(file, geo);
                    setGeometry(geo);
                }
            }["useBrainGeometry.useEffect"]).catch({
                "useBrainGeometry.useEffect": ()=>loadingSet.delete(file)
            }["useBrainGeometry.useEffect"]);
        }
    }["useBrainGeometry.useEffect"], [
        file
    ]);
    return geometry;
}
_s(useBrainGeometry, "rq8FMmf92hF6yv1EH4sjr0i6ZZc=");
const BrainViewContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    visibleIds: new Set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAIN_MODEL_REGISTRY"].map((e)=>e.id)),
    isolatedId: null
});
function BrainViewProvider(param) {
    let { visibleIds, isolatedId, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrainViewContext.Provider, {
        value: {
            visibleIds,
            isolatedId
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/body/Brain3DViewer.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = BrainViewProvider;
// ---------------------------------------------------------------------------
// Single brain region mesh
// ---------------------------------------------------------------------------
function BrainRegionMesh(param) {
    let { entry } = param;
    _s1();
    const geometry = useBrainGeometry(entry.file);
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const matRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { selectedBioNodeId, selectBioNode, hoverBioNode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    const { isolatedId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BrainViewContext);
    const isSelected = selectedBioNodeId === entry.id;
    const isIsolated = isolatedId === entry.id;
    const somethingIsolated = isolatedId !== null;
    const isDimmed = somethingIsolated && !isIsolated;
    const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BrainRegionMesh.useMemo[color]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](entry.color)
    }["BrainRegionMesh.useMemo[color]"], [
        entry.color
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "BrainRegionMesh.useFrame": (param)=>{
            let { clock } = param;
            if (!matRef.current) return;
            let targetEmissive = 0.05;
            let targetOpacity = entry.opacity;
            if (isDimmed) {
                targetEmissive = 0.01;
                targetOpacity = 0.06;
            } else if (isIsolated) {
                targetEmissive = 0.3;
                targetOpacity = 0.9;
            } else if (isSelected) {
                const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.15 + 0.55;
                targetEmissive = pulse;
                targetOpacity = Math.min(entry.opacity + 0.3, 0.95);
            } else if (hovered) {
                targetEmissive = 0.4;
                targetOpacity = Math.min(entry.opacity + 0.25, 0.9);
            }
            matRef.current.emissiveIntensity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(matRef.current.emissiveIntensity, targetEmissive, 0.12);
            matRef.current.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(matRef.current.opacity, targetOpacity, 0.12);
        }
    }["BrainRegionMesh.useFrame"]);
    if (!geometry) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: meshRef,
                geometry: geometry,
                onClick: (e)=>{
                    e.stopPropagation();
                    selectBioNode(isSelected ? null : entry.id);
                },
                onPointerEnter: (e)=>{
                    e.stopPropagation();
                    setHovered(true);
                    hoverBioNode(entry.id);
                    document.body.style.cursor = "pointer";
                },
                onPointerLeave: ()=>{
                    setHovered(false);
                    hoverBioNode(null);
                    document.body.style.cursor = "";
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                    ref: matRef,
                    color: color,
                    emissive: color,
                    emissiveIntensity: 0.05,
                    transparent: true,
                    opacity: entry.opacity,
                    roughness: 0.4,
                    metalness: 0.05,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                    depthWrite: false
                }, void 0, false, {
                    fileName: "[project]/components/body/Brain3DViewer.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/body/Brain3DViewer.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            (hovered || isSelected || isIsolated) && geometry && !isDimmed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RegionLabel, {
                entry: entry,
                geometry: geometry
            }, void 0, false, {
                fileName: "[project]/components/body/Brain3DViewer.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/body/Brain3DViewer.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s1(BrainRegionMesh, "ErkJ0rZC+JpsuJsyLx4y9jP20S8=", false, function() {
    return [
        useBrainGeometry,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = BrainRegionMesh;
function RegionLabel(param) {
    let { entry, geometry } = param;
    _s2();
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RegionLabel.useMemo[center]": ()=>{
            geometry.computeBoundingBox();
            const box = geometry.boundingBox;
            const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            box.getCenter(c);
            c.y = box.max.y + 0.5;
            return c;
        }
    }["RegionLabel.useMemo[center]"], [
        geometry
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
        position: [
            center.x,
            center.y,
            center.z
        ],
        fontSize: 0.5,
        color: "#fafafa",
        anchorX: "center",
        anchorY: "bottom",
        outlineWidth: 0.03,
        outlineColor: "#000000",
        children: entry.name
    }, void 0, false, {
        fileName: "[project]/components/body/Brain3DViewer.tsx",
        lineNumber: 174,
        columnNumber: 5
    }, this);
}
_s2(RegionLabel, "BtWZDGVyQ2L0Gv7TJUbUk/Xae7Q=");
_c2 = RegionLabel;
function LoadingProgress(param) {
    let { loaded, total } = param;
    if (loaded >= total) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
        center: true,
        position: [
            0,
            12,
            0
        ],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-[var(--color-surface)]/90 backdrop-blur rounded-lg px-4 py-2 text-xs text-[var(--color-text-muted)] whitespace-nowrap",
            children: [
                "Loading models... ",
                loaded,
                "/",
                total
            ]
        }, void 0, true, {
            fileName: "[project]/components/body/Brain3DViewer.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/body/Brain3DViewer.tsx",
        lineNumber: 191,
        columnNumber: 5
    }, this);
}
_c3 = LoadingProgress;
function Brain3DViewer() {
    _s3();
    const { visibleIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BrainViewContext);
    const [loadedCount, setLoadedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Brain3DViewer.useEffect": ()=>{
            const interval = setInterval({
                "Brain3DViewer.useEffect.interval": ()=>setLoadedCount(geometryCache.size)
            }["Brain3DViewer.useEffect.interval"], 200);
            return ({
                "Brain3DViewer.useEffect": ()=>clearInterval(interval)
            })["Brain3DViewer.useEffect"];
        }
    }["Brain3DViewer.useEffect"], []);
    const visibleEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Brain3DViewer.useMemo[visibleEntries]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAIN_MODEL_REGISTRY"].filter({
                "Brain3DViewer.useMemo[visibleEntries]": (e)=>visibleIds.has(e.id)
            }["Brain3DViewer.useMemo[visibleEntries]"])
    }["Brain3DViewer.useMemo[visibleEntries]"], [
        visibleIds
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingProgress, {
                loaded: loadedCount,
                total: visibleEntries.length
            }, void 0, false, {
                fileName: "[project]/components/body/Brain3DViewer.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            visibleEntries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrainRegionMesh, {
                    entry: entry
                }, entry.id, false, {
                    fileName: "[project]/components/body/Brain3DViewer.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/body/Brain3DViewer.tsx",
        lineNumber: 217,
        columnNumber: 5
    }, this);
}
_s3(Brain3DViewer, "6RsKr5d1+nB/wktJ6IjJS7fQNpM=");
_c4 = Brain3DViewer;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "BrainViewProvider");
__turbopack_context__.k.register(_c1, "BrainRegionMesh");
__turbopack_context__.k.register(_c2, "RegionLabel");
__turbopack_context__.k.register(_c3, "LoadingProgress");
__turbopack_context__.k.register(_c4, "Brain3DViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/body/HumanBody.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HumanBody
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$body$2f$Brain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/body/Brain3DViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// ---------------------------------------------------------------------------
// PATHWAY DEFINITIONS — all in a cohesive blue/cyan palette
// ---------------------------------------------------------------------------
const PATHWAYS = [
    {
        name: "Corticospinal",
        points: [
            [
                0,
                11.5,
                1
            ],
            [
                0.3,
                10.5,
                0.5
            ],
            [
                0.2,
                9,
                0
            ],
            [
                0.1,
                7.5,
                -0.2
            ],
            [
                0,
                5.5,
                -0.5
            ],
            [
                0,
                3,
                -0.8
            ]
        ],
        relatedIds: [
            "left-hemisphere",
            "midbrain",
            "pons",
            "medulla"
        ]
    },
    {
        name: "Sensory",
        points: [
            [
                0,
                3,
                -0.5
            ],
            [
                0,
                5.5,
                -0.3
            ],
            [
                -0.1,
                7,
                0
            ],
            [
                -0.2,
                8,
                0.3
            ],
            [
                0,
                8.5,
                0
            ],
            [
                0,
                10.5,
                0.5
            ]
        ],
        relatedIds: [
            "medulla",
            "thalamus",
            "right-hemisphere"
        ]
    },
    {
        name: "Limbic",
        points: [
            [
                -2.5,
                7.2,
                1.5
            ],
            [
                -2.8,
                7.5,
                0.5
            ],
            [
                -2,
                8,
                -0.5
            ],
            [
                0,
                8.5,
                0
            ],
            [
                0.5,
                10,
                1
            ],
            [
                0,
                11.5,
                1.5
            ]
        ],
        relatedIds: [
            "amygdala",
            "hippocampus",
            "thalamus",
            "left-hemisphere"
        ]
    },
    {
        name: "Cerebellar",
        points: [
            [
                1,
                11,
                0.5
            ],
            [
                0.8,
                9.5,
                0
            ],
            [
                0.5,
                7.5,
                -0.5
            ],
            [
                0,
                6,
                -2.5
            ],
            [
                -0.5,
                7,
                -0.3
            ],
            [
                0,
                8.5,
                0
            ]
        ],
        relatedIds: [
            "right-hemisphere",
            "pons",
            "cerebellum",
            "thalamus"
        ]
    },
    {
        name: "Vagus",
        points: [
            [
                0.8,
                6,
                0.5
            ],
            [
                1.2,
                5,
                1
            ],
            [
                1.5,
                4,
                1.5
            ],
            [
                1.3,
                3,
                2
            ],
            [
                1,
                2,
                2
            ],
            [
                0.8,
                0.5,
                1.5
            ]
        ],
        relatedIds: [
            "cn-x",
            "medulla"
        ]
    },
    {
        name: "Visual",
        points: [
            [
                2,
                8.5,
                4
            ],
            [
                1,
                8.5,
                3
            ],
            [
                0,
                8.5,
                2.5
            ],
            [
                0,
                8.5,
                0
            ],
            [
                0,
                9.5,
                -1.5
            ],
            [
                -0.5,
                10.5,
                -2
            ]
        ],
        relatedIds: [
            "cn-ii",
            "thalamus",
            "left-hemisphere"
        ]
    },
    {
        name: "Basal Ganglia",
        points: [
            [
                0,
                11,
                1
            ],
            [
                1.5,
                9.5,
                0.5
            ],
            [
                2,
                9,
                0
            ],
            [
                1.5,
                8.5,
                -0.2
            ],
            [
                0,
                8.5,
                0
            ],
            [
                -0.5,
                10,
                0.5
            ]
        ],
        relatedIds: [
            "caudate-nucleus",
            "putamen",
            "globus-pallidus",
            "thalamus"
        ]
    },
    {
        name: "Fornix",
        points: [
            [
                -2.5,
                7.8,
                -0.5
            ],
            [
                -1.5,
                9,
                -0.8
            ],
            [
                0,
                9.5,
                -0.5
            ],
            [
                1.5,
                9,
                -0.8
            ],
            [
                2.5,
                7.8,
                -0.5
            ]
        ],
        relatedIds: [
            "hippocampus",
            "thalamus"
        ]
    },
    {
        name: "Callosal",
        points: [
            [
                -3,
                10,
                0
            ],
            [
                -1.5,
                10.5,
                -0.5
            ],
            [
                0,
                10.8,
                -0.8
            ],
            [
                1.5,
                10.5,
                -0.5
            ],
            [
                3,
                10,
                0
            ]
        ],
        relatedIds: [
            "corpus-callosum",
            "left-hemisphere",
            "right-hemisphere"
        ]
    }
];
const PATHWAY_COLOR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#2d5a8a");
const PATHWAY_ACTIVE_COLOR = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#38bdf8");
// ---------------------------------------------------------------------------
// HAIR-THIN PATHWAY LINES
// ---------------------------------------------------------------------------
function PathwayLine(param) {
    let { points, active } = param;
    _s();
    const matRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const colorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#1e3a5f"));
    const tubeGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PathwayLine.useMemo[tubeGeo]": ()=>{
            const curve = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](points.map({
                "PathwayLine.useMemo[tubeGeo]": (p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...p)
            }["PathwayLine.useMemo[tubeGeo]"]));
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TubeGeometry"](curve, 64, 0.012, 4, false);
        }
    }["PathwayLine.useMemo[tubeGeo]"], [
        points
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "PathwayLine.useFrame": ()=>{
            if (!matRef.current) return;
            const targetOpacity = active ? 0.7 : 0.16;
            matRef.current.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(matRef.current.opacity, targetOpacity, 0.06);
            colorRef.current.lerp(active ? PATHWAY_ACTIVE_COLOR : PATHWAY_COLOR, 0.05);
            matRef.current.color.copy(colorRef.current);
        }
    }["PathwayLine.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        geometry: tubeGeo,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
            ref: matRef,
            color: PATHWAY_COLOR,
            transparent: true,
            opacity: 0.08,
            depthWrite: false,
            side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
        }, void 0, false, {
            fileName: "[project]/components/body/HumanBody.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/body/HumanBody.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_s(PathwayLine, "BPLYvwjzoXHClS1XAUDFRhGwn0E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = PathwayLine;
function NeuronZips() {
    _s1();
    const zipCount = 8;
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const curves = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuronZips.useMemo[curves]": ()=>PATHWAYS.map({
                "NeuronZips.useMemo[curves]": (p)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CatmullRomCurve3"](p.points.map({
                        "NeuronZips.useMemo[curves]": (pt)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...pt)
                    }["NeuronZips.useMemo[curves]"]))
            }["NeuronZips.useMemo[curves]"])
    }["NeuronZips.useMemo[curves]"], []);
    const neuronColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuronZips.useMemo[neuronColor]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"]("#67d4ff")
    }["NeuronZips.useMemo[neuronColor]"], []);
    const zipStates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Array.from({
        length: zipCount
    }, {
        "NeuronZips.useRef[zipStates]": ()=>({
                pathIndex: Math.floor(Math.random() * PATHWAYS.length),
                progress: 0,
                speed: 0.2 + Math.random() * 0.35,
                phase: "waiting",
                timer: Math.random() * 8,
                opacity: 0,
                size: 0.08 + Math.random() * 0.05,
                forward: Math.random() > 0.5
            })
    }["NeuronZips.useRef[zipStates]"]));
    // Pre-create position vectors
    const positions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Array.from({
        length: zipCount
    }, {
        "NeuronZips.useRef[positions]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]()
    }["NeuronZips.useRef[positions]"]));
    const opacities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Float32Array(zipCount));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "NeuronZips.useFrame": (_, delta)=>{
            const dt = Math.min(delta, 0.05);
            zipStates.current.forEach({
                "NeuronZips.useFrame": (zip, i)=>{
                    zip.timer += dt;
                    if (zip.phase === "waiting") {
                        zip.opacity = Math.max(0, zip.opacity - dt * 4);
                        if (zip.timer > 2 + Math.random() * 0.1) {
                            zip.phase = "traveling";
                            zip.progress = 0;
                            zip.timer = 0;
                            zip.pathIndex = Math.floor(Math.random() * PATHWAYS.length);
                            zip.speed = 0.15 + Math.random() * 0.4;
                            zip.size = 0.07 + Math.random() * 0.06;
                            zip.forward = Math.random() > 0.5;
                        }
                    } else if (zip.phase === "traveling") {
                        zip.progress += dt * zip.speed;
                        zip.opacity = Math.min(1, zip.opacity + dt * 8);
                        if (zip.progress >= 1) {
                            zip.phase = "fading";
                            zip.timer = 0;
                        }
                        const frac = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(zip.forward ? zip.progress : 1 - zip.progress, 0, 1);
                        const curve = curves[zip.pathIndex];
                        const point = curve.getPointAt(frac);
                        positions.current[i].copy(point);
                    } else if (zip.phase === "fading") {
                        zip.opacity = Math.max(0, zip.opacity - dt * 2.5);
                        if (zip.opacity <= 0) {
                            zip.phase = "waiting";
                            zip.timer = -Math.random() * 5;
                        }
                    }
                    opacities.current[i] = zip.opacity;
                }
            }["NeuronZips.useFrame"]);
        }
    }["NeuronZips.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: Array.from({
            length: zipCount
        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuronZipMesh, {
                index: i,
                positions: positions,
                opacities: opacities,
                zipStates: zipStates,
                color: neuronColor
            }, i, false, {
                fileName: "[project]/components/body/HumanBody.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/body/HumanBody.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
_s1(NeuronZips, "4lWScey2itmickMRi+BNmV903Vs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = NeuronZips;
function NeuronZipMesh(param) {
    let { index, positions, opacities, zipStates, color } = param;
    _s2();
    const groupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coreRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const glowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const haloRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "NeuronZipMesh.useFrame": (param)=>{
            let { clock } = param;
            if (!groupRef.current) return;
            const pos = positions.current[index];
            const op = opacities.current[index];
            const zip = zipStates.current[index];
            groupRef.current.position.copy(pos);
            const pulse = zip.phase === "traveling" ? 1 + Math.sin(clock.getElapsedTime() * 12) * 0.2 : 0.6;
            const s = zip.size * pulse;
            groupRef.current.scale.setScalar(s / 0.08);
            if (coreRef.current) coreRef.current.opacity = op * 0.95;
            if (glowRef.current) glowRef.current.opacity = op * 0.55;
            if (haloRef.current) haloRef.current.opacity = op * 0.15;
        }
    }["NeuronZipMesh.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        ref: groupRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.08,
                            10,
                            10
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/body/HumanBody.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        ref: haloRef,
                        color: color,
                        transparent: true,
                        opacity: 0,
                        depthWrite: false,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                    }, void 0, false, {
                        fileName: "[project]/components/body/HumanBody.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/body/HumanBody.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                scale: 0.5,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.08,
                            10,
                            10
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/body/HumanBody.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        ref: glowRef,
                        color: color,
                        transparent: true,
                        opacity: 0,
                        depthWrite: false,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                    }, void 0, false, {
                        fileName: "[project]/components/body/HumanBody.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/body/HumanBody.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                scale: 0.2,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                        args: [
                            0.08,
                            8,
                            8
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/body/HumanBody.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        ref: coreRef,
                        color: "#ffffff",
                        transparent: true,
                        opacity: 0,
                        depthWrite: false,
                        blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                    }, void 0, false, {
                        fileName: "[project]/components/body/HumanBody.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/body/HumanBody.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/body/HumanBody.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_s2(NeuronZipMesh, "fRwJVn1oU8C4PHrZPUbLjrBXTDw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = NeuronZipMesh;
function HumanBody() {
    _s3();
    const { selectedBioNodeId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    const activePathways = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HumanBody.useMemo[activePathways]": ()=>{
            if (!selectedBioNodeId) return new Set();
            const active = new Set();
            PATHWAYS.forEach({
                "HumanBody.useMemo[activePathways]": (p, i)=>{
                    if (p.relatedIds.includes(selectedBioNodeId)) active.add(i);
                }
            }["HumanBody.useMemo[activePathways]"]);
            return active;
        }
    }["HumanBody.useMemo[activePathways]"], [
        selectedBioNodeId
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$body$2f$Brain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/body/HumanBody.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            PATHWAYS.map((pathway, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PathwayLine, {
                    points: pathway.points,
                    active: activePathways.has(i)
                }, pathway.name, false, {
                    fileName: "[project]/components/body/HumanBody.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuronZips, {}, void 0, false, {
                fileName: "[project]/components/body/HumanBody.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/body/HumanBody.tsx",
        lineNumber: 240,
        columnNumber: 5
    }, this);
}
_s3(HumanBody, "J4VGSjB1wdhVji7fSeHCYhkxRf8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"]
    ];
});
_c3 = HumanBody;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "PathwayLine");
__turbopack_context__.k.register(_c1, "NeuronZips");
__turbopack_context__.k.register(_c2, "NeuronZipMesh");
__turbopack_context__.k.register(_c3, "HumanBody");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CAMERA_POSITIONS",
    ()=>CAMERA_POSITIONS,
    "CATEGORY_COLORS",
    ()=>CATEGORY_COLORS,
    "LAYER_COLORS",
    ()=>LAYER_COLORS,
    "SIGNAL_COLORS",
    ()=>SIGNAL_COLORS
]);
const CATEGORY_COLORS = {
    cerebrum: "#6366f1",
    cerebellum: "#8b5cf6",
    brainstem: "#ec4899",
    limbic: "#f97316",
    autonomic: "#22c55e",
    peripheral: "#eab308",
    endocrine: "#f59e0b",
    organ: "#ef4444",
    pathway: "#06b6d4",
    cellular: "#a78bfa"
};
const LAYER_COLORS = {
    skeletal: "#d4d4d8",
    muscular: "#ef4444",
    vascular: "#dc2626",
    nervous: "#facc15",
    autonomic: "#22c55e",
    endocrine: "#f59e0b"
};
const SIGNAL_COLORS = {
    electrical: "#60a5fa",
    chemical: "#34d399",
    hormonal: "#fbbf24",
    mechanical: "#f87171"
};
const CAMERA_POSITIONS = {
    fullBody: {
        position: [
            0,
            0,
            8
        ],
        target: [
            0,
            0,
            0
        ]
    },
    brain: {
        position: [
            0,
            3.5,
            3
        ],
        target: [
            0,
            3.2,
            0
        ]
    },
    brainstem: {
        position: [
            0,
            2.5,
            2.5
        ],
        target: [
            0,
            2.3,
            0
        ]
    },
    torso: {
        position: [
            0,
            0.5,
            4
        ],
        target: [
            0,
            0.5,
            0
        ]
    },
    micro: {
        position: [
            0,
            0,
            2
        ],
        target: [
            0,
            0,
            0
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/schema/modules.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computationalModules",
    ()=>computationalModules
]);
const computationalModules = [
    {
        id: "executive-controller",
        name: "Executive Controller",
        role: "Top-level decision making and planning",
        layer: 7,
        category: "cerebrum",
        description: "Analogous to prefrontal cortex — handles abstract reasoning, goal setting, working memory management, and inhibition of inappropriate responses.",
        inputSources: [
            "signal-router",
            "memory-retrieval",
            "emotional-modulator",
            "sensory-integrator"
        ],
        outputTargets: [
            "action-dispatcher",
            "attention-director",
            "narrative-engine"
        ]
    },
    {
        id: "action-dispatcher",
        name: "Action Dispatcher",
        role: "Motor command generation and execution",
        layer: 6,
        category: "cerebrum",
        description: "Translates high-level action plans into specific motor command sequences. Analogous to primary motor cortex.",
        inputSources: [
            "executive-controller",
            "action-gate",
            "error-corrector"
        ],
        outputTargets: [
            "output-pipeline",
            "error-corrector"
        ]
    },
    {
        id: "sensory-integrator",
        name: "Sensory Integrator",
        role: "Multi-modal sensory fusion",
        layer: 6,
        category: "cerebrum",
        description: "Combines visual, auditory, somatosensory, and other inputs into unified percepts. Analogous to association cortices.",
        inputSources: [
            "visual-processor",
            "auditory-processor",
            "somatosensory-encoder",
            "input-pipeline"
        ],
        outputTargets: [
            "signal-router",
            "executive-controller",
            "memory-writer"
        ]
    },
    {
        id: "signal-router",
        name: "Central Relay Hub",
        role: "Signal routing and filtering",
        layer: 5,
        category: "limbic",
        description: "Routes incoming signals to appropriate processing modules. Analogous to thalamus — every sensory input (except olfactory) passes through here.",
        inputSources: [
            "input-pipeline",
            "sensory-integrator",
            "alertness-controller"
        ],
        outputTargets: [
            "executive-controller",
            "sensory-integrator",
            "emotional-modulator"
        ]
    },
    {
        id: "memory-writer",
        name: "Memory Index Writer",
        role: "Encoding new experiences into long-term storage",
        layer: 5,
        category: "limbic",
        description: "Writes new episodic and semantic memories as vector embeddings. Analogous to hippocampus — performs pattern separation and completion.",
        inputSources: [
            "sensory-integrator",
            "emotional-modulator",
            "narrative-engine"
        ],
        outputTargets: [
            "memory-retrieval",
            "pattern-completer"
        ]
    },
    {
        id: "memory-retrieval",
        name: "Memory Retrieval Engine",
        role: "Searching and retrieving stored memories",
        layer: 5,
        category: "limbic",
        description: "Performs similarity search across memory embeddings. Analogous to CA3 pattern completion in hippocampus.",
        inputSources: [
            "memory-writer",
            "signal-router",
            "executive-controller"
        ],
        outputTargets: [
            "executive-controller",
            "narrative-engine",
            "emotional-modulator"
        ]
    },
    {
        id: "emotional-modulator",
        name: "Emotional Priority Modulator",
        role: "Weighting signals by emotional significance",
        layer: 4,
        category: "limbic",
        description: "Re-ranks and modulates all signals based on emotional valence. Analogous to amygdala — assigns threat/reward weight to incoming information.",
        inputSources: [
            "signal-router",
            "memory-retrieval",
            "body-state-monitor"
        ],
        outputTargets: [
            "executive-controller",
            "memory-writer",
            "autonomic-manager",
            "action-gate"
        ]
    },
    {
        id: "action-gate",
        name: "Action Gating System",
        role: "Selecting which actions to execute",
        layer: 4,
        category: "limbic",
        description: "Gates motor output — only allows selected actions through. Analogous to basal ganglia direct/indirect pathway.",
        inputSources: [
            "executive-controller",
            "emotional-modulator",
            "reward-predictor"
        ],
        outputTargets: [
            "action-dispatcher",
            "reward-predictor"
        ]
    },
    {
        id: "reward-predictor",
        name: "Reward Prediction Engine",
        role: "Predicting outcomes and computing reward prediction errors",
        layer: 4,
        category: "limbic",
        description: "Computes expected vs actual reward. Analogous to nucleus accumbens and VTA dopamine signals.",
        inputSources: [
            "action-gate",
            "sensory-integrator"
        ],
        outputTargets: [
            "action-gate",
            "memory-writer",
            "emotional-modulator"
        ]
    },
    {
        id: "error-corrector",
        name: "Prediction Error Calculator",
        role: "Comparing predicted vs actual motor outcomes",
        layer: 5,
        category: "cerebellum",
        description: "Refines movement by computing error between intended and actual outcome. Analogous to cerebellar error correction circuitry.",
        inputSources: [
            "action-dispatcher",
            "sensory-integrator"
        ],
        outputTargets: [
            "action-dispatcher",
            "movement-planner"
        ]
    },
    {
        id: "narrative-engine",
        name: "Self-Model / Internal Narrator",
        role: "Maintaining continuous self-narrative and identity",
        layer: 7,
        category: "cerebrum",
        description: "Generates internal monologue and self-referential thought. Analogous to default mode network — active during mind wandering and introspection.",
        inputSources: [
            "memory-retrieval",
            "emotional-modulator",
            "executive-controller"
        ],
        outputTargets: [
            "executive-controller",
            "memory-writer"
        ]
    },
    {
        id: "autonomic-manager",
        name: "Background Process Manager",
        role: "Managing all unconscious vital functions",
        layer: 1,
        category: "autonomic",
        description: "Controls heart rate, breathing, blood pressure, digestion, and other vital processes. Analogous to brainstem + autonomic nervous system.",
        inputSources: [
            "body-state-monitor",
            "emotional-modulator",
            "homeostatic-regulator"
        ],
        outputTargets: [
            "cardiac-controller",
            "respiratory-controller",
            "gut-controller"
        ]
    },
    {
        id: "homeostatic-regulator",
        name: "State Regulator",
        role: "Maintaining physiological homeostasis",
        layer: 2,
        category: "limbic",
        description: "Monitors and adjusts body temperature, hunger, thirst, sleep pressure, and hormonal balance. Analogous to hypothalamus.",
        inputSources: [
            "body-state-monitor",
            "circadian-timer"
        ],
        outputTargets: [
            "autonomic-manager",
            "emotional-modulator",
            "endocrine-controller"
        ]
    },
    {
        id: "alertness-controller",
        name: "System Wakefulness Controller",
        role: "Regulating arousal and vigilance levels",
        layer: 2,
        category: "brainstem",
        description: "Controls sleep-wake transitions and overall alertness. Analogous to reticular activating system and locus coeruleus.",
        inputSources: [
            "circadian-timer",
            "sensory-integrator"
        ],
        outputTargets: [
            "signal-router",
            "executive-controller"
        ]
    },
    {
        id: "body-state-monitor",
        name: "Interoceptive Encoder",
        role: "Monitoring internal body state",
        layer: 3,
        category: "limbic",
        description: "Encodes current body state — heart rate, gut status, muscle tension, pain levels. Analogous to insular cortex.",
        inputSources: [
            "autonomic-manager",
            "input-pipeline"
        ],
        outputTargets: [
            "emotional-modulator",
            "homeostatic-regulator",
            "executive-controller"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/SearchOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mappings.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function SearchOverlay() {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { selectBioNode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            var _inputRef_current;
            (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
        }
    }["SearchOverlay.useEffect"], []);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleSearch]": (value)=>{
            setQuery(value);
            if (value.length < 2) {
                setResults([]);
                return;
            }
            setResults((0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["searchNodes"])(value).slice(0, 15));
        }
    }["SearchOverlay.useCallback[handleSearch]"], []);
    const handleSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleSelect]": (node)=>{
            selectBioNode(node.id);
            setQuery("");
            setResults([]);
        }
    }["SearchOverlay.useCallback[handleSelect]"], [
        selectBioNode
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-sm"
            }, void 0, false, {
                fileName: "[project]/components/shared/SearchOverlay.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full max-w-lg mx-4 backdrop-blur-2xl bg-black/70 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 p-4 border-b border-white/[0.06]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "#525252",
                                strokeWidth: "2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "11",
                                        cy: "11",
                                        r: "8"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                        lineNumber: 37,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "21",
                                        y1: "21",
                                        x2: "16.65",
                                        y2: "16.65"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                        lineNumber: 37,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: inputRef,
                                type: "text",
                                value: query,
                                onChange: (e)=>handleSearch(e.target.value),
                                placeholder: "Search brain regions, schema collections...",
                                className: "flex-1 bg-transparent text-sm text-white placeholder:text-neutral-600 outline-none"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                className: "text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-600",
                                children: "ESC"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    results.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-72 overflow-y-auto p-2",
                        children: results.map((node)=>{
                            var _CATEGORY_COLORS_node_category;
                            const color = (_CATEGORY_COLORS_node_category = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_COLORS"][node.category]) !== null && _CATEGORY_COLORS_node_category !== void 0 ? _CATEGORY_COLORS_node_category : "#6366f1";
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>handleSelect(node),
                                className: "w-full flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full mt-1.5 shrink-0",
                                        style: {
                                            backgroundColor: color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                        lineNumber: 60,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold text-white truncate",
                                                        children: node.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                        lineNumber: 63,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-neutral-600 capitalize",
                                                        children: node.category
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                lineNumber: 62,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-neutral-500 truncate mt-0.5",
                                                children: node.description
                                            }, void 0, false, {
                                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                lineNumber: 66,
                                                columnNumber: 21
                                            }, this),
                                            node.schemaMapping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                        className: "text-[9px] font-mono text-cyan-500",
                                                        children: node.schemaMapping.collection
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] text-neutral-700",
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] text-purple-400",
                                                        children: node.schemaMapping.role
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                        lineNumber: 71,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                                lineNumber: 68,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                                        lineNumber: 61,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, node.id, true, {
                                fileName: "[project]/components/shared/SearchOverlay.tsx",
                                lineNumber: 55,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    query.length >= 2 && results.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 text-center text-xs text-neutral-600",
                        children: [
                            'No results for "',
                            query,
                            '"'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    query.length < 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 text-center text-xs text-neutral-600",
                        children: "Type at least 2 characters"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/SearchOverlay.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/SearchOverlay.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shared/SearchOverlay.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(SearchOverlay, "dCUpKvjeQydPcaJ0mjjGCCMnnK8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"]
    ];
});
_c = SearchOverlay;
var _c;
__turbopack_context__.k.register(_c, "SearchOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/explorer/BrainExplorer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BrainExplorer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Stars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$body$2f$Brain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/body/Brain3DViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$body$2f$HumanBody$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/body/HumanBody.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mappings.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/brain-model-loader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$schema$2f$modules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/schema/modules.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$SearchOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/SearchOverlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function findLayerForId(id) {
    for (const [key, ids] of Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYER_GROUPS"])){
        if (ids.includes(id)) return key;
    }
    return null;
}
const BIO_TO_MODULE = {
    "frontal-lobe": "executive-controller",
    "prefrontal-cortex": "executive-controller",
    "primary-motor-cortex": "action-dispatcher",
    "thalamus": "signal-router",
    "hippocampus": "memory-writer",
    "amygdala": "emotional-modulator",
    "basal-ganglia": "action-gate",
    "caudate-nucleus": "action-gate",
    "putamen": "action-gate",
    "nucleus-accumbens": "reward-predictor",
    "substantia-nigra": "reward-predictor",
    "cerebellum": "error-corrector",
    "hypothalamus": "homeostatic-regulator",
    "midbrain": "alertness-controller",
    "pons": "alertness-controller",
    "medulla": "autonomic-manager",
    "entorhinal-cortex": "memory-retrieval",
    "dentate-gyrus": "memory-writer",
    "subiculum": "memory-retrieval",
    "auditory-cortex": "sensory-integrator",
    "cn-x": "autonomic-manager",
    "left-hemisphere": "narrative-engine",
    "right-hemisphere": "sensory-integrator",
    "corpus-callosum": "signal-router",
    "pituitary": "homeostatic-regulator",
    "ventricles": "body-state-monitor"
};
const LAYER_TOGGLE_CONFIG = [
    {
        key: "hemispheres",
        label: "Cortex",
        color: "#6366f1"
    },
    {
        key: "cerebellum",
        label: "Cerebellum",
        color: "#8b5cf6"
    },
    {
        key: "brainstem",
        label: "Brainstem",
        color: "#ec4899"
    },
    {
        key: "limbic",
        label: "Limbic",
        color: "#f97316"
    },
    {
        key: "deepStructures",
        label: "Deep",
        color: "#38bdf8"
    },
    {
        key: "basalGanglia",
        label: "Basal Ganglia",
        color: "#fb923c"
    },
    {
        key: "cranialNerves",
        label: "Nerves",
        color: "#22c55e"
    }
];
// ---------------------------------------------------------------------------
// LAYER CONTROLS — floating left
// ---------------------------------------------------------------------------
function LayerControls(param) {
    let { activeLayers, onToggle, onShowAll, onReset } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            x: -20
        },
        animate: {
            opacity: 1,
            x: 0
        },
        transition: {
            delay: 0.3,
            duration: 0.4
        },
        className: "absolute top-20 left-4 z-20 flex flex-col gap-1.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-xl p-2 flex flex-col gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-neutral-500 uppercase tracking-widest font-semibold px-1 mb-0.5",
                    children: "Layers"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                LAYER_TOGGLE_CONFIG.map((param)=>{
                    let { key, label, color } = param;
                    const active = activeLayers.has(key);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onToggle(key),
                        className: "flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                        style: {
                            background: active ? "".concat(color, "15") : "transparent",
                            color: active ? color : "#525252"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full transition-all duration-200",
                                style: {
                                    backgroundColor: active ? color : "#333",
                                    boxShadow: active ? "0 0 6px ".concat(color, "60") : "none"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            label
                        ]
                    }, key, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 91,
                        columnNumber: 13
                    }, this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-px bg-white/[0.04] my-1"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onShowAll,
                    className: "text-[10px] text-neutral-500 hover:text-neutral-300 px-2 py-1 transition-colors",
                    children: "Show All"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onReset,
                    className: "text-[10px] text-neutral-500 hover:text-neutral-300 px-2 py-1 transition-colors",
                    children: "Reset"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/explorer/BrainExplorer.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c = LayerControls;
// ---------------------------------------------------------------------------
// SELECTION ACTIONS — floating left, below layers, appears when selected
// ---------------------------------------------------------------------------
function SelectionActions(param) {
    let { onIsolate, onHide, isolatedId, onClearIsolate } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 10
        },
        className: "absolute bottom-24 left-4 z-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-xl p-2 flex flex-col gap-1",
            children: isolatedId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClearIsolate,
                className: "px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all",
                children: "Exit Isolate"
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 142,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onIsolate,
                        className: "px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-400 hover:bg-indigo-500/10 transition-all",
                        children: "Isolate"
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 147,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onHide,
                        className: "px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all",
                        children: "Hide"
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/components/explorer/BrainExplorer.tsx",
            lineNumber: 140,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_c1 = SelectionActions;
// ---------------------------------------------------------------------------
// TOP BAR — floating, minimal
// ---------------------------------------------------------------------------
function TopBar(param) {
    let { architectureOpen, onToggleArchitecture } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: -10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.2,
            duration: 0.4
        },
        className: "absolute top-4 left-1/2 -translate-x-1/2 z-30",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-2xl px-1.5 py-1.5 flex items-center gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-2 h-2 rounded-full bg-indigo-500",
                            style: {
                                boxShadow: "0 0 8px #6366f180"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold text-neutral-300 tracking-wide",
                            children: "WINTERMUTE"
                        }, void 0, false, {
                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                            lineNumber: 180,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-px h-5 bg-white/[0.06]"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onToggleArchitecture,
                    className: "px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ".concat(architectureOpen ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04]"),
                    children: "Architecture"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SearchTrigger, {}, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/explorer/BrainExplorer.tsx",
            lineNumber: 177,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c2 = TopBar;
function SearchTrigger() {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchTrigger.useEffect": ()=>{
            const handler = {
                "SearchTrigger.useEffect.handler": (e)=>{
                    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                        e.preventDefault();
                        setOpen({
                            "SearchTrigger.useEffect.handler": (v)=>!v
                        }["SearchTrigger.useEffect.handler"]);
                    }
                    if (e.key === "Escape") setOpen(false);
                }
            }["SearchTrigger.useEffect.handler"];
            window.addEventListener("keydown", handler);
            return ({
                "SearchTrigger.useEffect": ()=>window.removeEventListener("keydown", handler)
            })["SearchTrigger.useEffect"];
        }
    }["SearchTrigger.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(true),
                className: "px-3 py-1.5 rounded-xl text-xs text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] transition-all flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "11",
                                cy: "11",
                                r: "8"
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 220,
                                columnNumber: 107
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                x1: "21",
                                y1: "21",
                                x2: "16.65",
                                y2: "16.65"
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 220,
                                columnNumber: 139
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden sm:inline",
                        children: "Search"
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "text-[9px] px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-600",
                        children: "⌘K"
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$SearchOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 224,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true);
}
_s(SearchTrigger, "e27cRtNMdAs0U0o1oHlS6A8OEBo=");
_c3 = SearchTrigger;
// ---------------------------------------------------------------------------
// RIGHT DRAWER — detail panel for selected structure
// ---------------------------------------------------------------------------
function RightDrawer() {
    _s1();
    const { selectedBioNodeId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    const node = selectedBioNodeId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mappings$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["findNodeById"])(selectedBioNodeId) : null;
    if (!node) return null;
    var _CATEGORY_COLORS_node_category;
    const color = (_CATEGORY_COLORS_node_category = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_COLORS"][node.category]) !== null && _CATEGORY_COLORS_node_category !== void 0 ? _CATEGORY_COLORS_node_category : "#6366f1";
    const moduleId = BIO_TO_MODULE[selectedBioNodeId];
    const compModule = moduleId ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$schema$2f$modules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computationalModules"].find((m)=>m.id === moduleId) : null;
    var _CATEGORY_COLORS_compModule_category;
    const moduleColor = compModule ? (_CATEGORY_COLORS_compModule_category = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_COLORS"][compModule.category]) !== null && _CATEGORY_COLORS_compModule_category !== void 0 ? _CATEGORY_COLORS_compModule_category : "#6366f1" : color;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            x: 40
        },
        animate: {
            opacity: 1,
            x: 0
        },
        exit: {
            opacity: 0,
            x: 40
        },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        },
        className: "absolute top-20 right-4 bottom-4 z-20 w-[340px] max-w-[40vw] flex flex-col gap-3 overflow-y-auto pointer-events-none",
        style: {
            scrollbarWidth: "none"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-full",
                        style: {
                            background: "linear-gradient(90deg, ".concat(color, ", ").concat(color, "00)")
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2.5 h-2.5 rounded-full",
                                        style: {
                                            backgroundColor: color,
                                            boxShadow: "0 0 8px ".concat(color, "60")
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 258,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-white",
                                        children: node.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 259,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase tracking-widest text-neutral-500 font-semibold",
                                children: node.category
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-neutral-400 leading-relaxed mt-2",
                                children: node.description
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5 mt-3",
                                children: [
                                    node.functions.slice(0, 5).map((fn, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] px-2 py-0.5 rounded-full border",
                                            style: {
                                                borderColor: "".concat(color, "30"),
                                                color,
                                                background: "".concat(color, "08")
                                            },
                                            children: fn
                                        }, i, false, {
                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, this)),
                                    node.functions.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-neutral-600",
                                        children: [
                                            "+",
                                            node.functions.length - 5
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, this),
            node.schemaMapping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-full",
                        style: {
                            background: "linear-gradient(90deg, #6366f1, #6366f100)"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 280,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase tracking-widest text-indigo-500 font-semibold",
                                children: "Schema Mapping"
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 282,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-neutral-500",
                                                children: "Collection"
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 285,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "text-xs text-cyan-400 font-mono",
                                                children: node.schemaMapping.collection
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-neutral-500",
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-white",
                                                children: node.schemaMapping.role
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-neutral-500 uppercase tracking-wider",
                                        children: "Fields"
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this),
                                    node.schemaMapping.fields.map((field, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-2 py-1 border-b border-white/[0.03] last:border-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "text-[10px] font-mono text-emerald-400 shrink-0",
                                                    children: field.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                    className: "text-[10px] font-mono text-purple-400 shrink-0",
                                                    children: field.type
                                                }, void 0, false, {
                                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                    lineNumber: 299,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-neutral-600 ml-auto text-right",
                                                    children: field.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                            lineNumber: 297,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 294,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 281,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this),
            compModule && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-full",
                        style: {
                            background: "linear-gradient(90deg, ".concat(moduleColor, ", ").concat(moduleColor, "00)")
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 311,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] uppercase tracking-widest text-neutral-500 font-semibold",
                                children: "Computational Module"
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-white",
                                        children: compModule.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-neutral-500 mt-0.5",
                                        children: compModule.role
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-neutral-400 leading-relaxed mt-2",
                                        children: compModule.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 317,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 grid grid-cols-2 gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-neutral-500 uppercase tracking-wider",
                                                children: "Inputs"
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 space-y-0.5",
                                                children: compModule.inputSources.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-emerald-400/70 font-mono flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-emerald-500",
                                                                children: "←"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                                lineNumber: 326,
                                                                columnNumber: 23
                                                            }, this),
                                                            " ",
                                                            src
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 323,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-neutral-500 uppercase tracking-wider",
                                                children: "Outputs"
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-1 space-y-0.5",
                                                children: compModule.outputTargets.map((tgt, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-[10px] text-orange-400/70 font-mono flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-orange-500",
                                                                children: "→"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 23
                                                            }, this),
                                                            " ",
                                                            tgt
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                lineNumber: 333,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 320,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 312,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 310,
                columnNumber: 9
            }, this),
            node.connections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] uppercase tracking-widest text-neutral-500 font-semibold",
                        children: [
                            "Neural Connections (",
                            node.connections.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 349,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1",
                        children: node.connections.slice(0, 8).map((conn, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-[10px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full ".concat(conn.type === "excitatory" ? "bg-emerald-500" : conn.type === "inhibitory" ? "bg-red-500" : "bg-blue-500")
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 353,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-500",
                                        children: conn.type
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 354,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-400",
                                        children: [
                                            "→ ",
                                            conn.targetId
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 355,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto text-neutral-600",
                                        children: [
                                            (conn.strength * 100).toFixed(0),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 356,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 352,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 348,
                columnNumber: 9
            }, this)
        ]
    }, selectedBioNodeId, true, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
_s1(RightDrawer, "k3XlWweuD6/yaMeK5pA620VT1KY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"]
    ];
});
_c4 = RightDrawer;
// ---------------------------------------------------------------------------
// BOTTOM SHEET — computational architecture
// ---------------------------------------------------------------------------
const LAYER_LABELS = {
    7: "Consciousness",
    6: "Executive",
    5: "Integration",
    4: "Modulation",
    3: "Monitoring",
    2: "Regulation",
    1: "Survival"
};
const LAYER_ORDER = [
    7,
    6,
    5,
    4,
    3,
    2,
    1
];
function ArchitectureSheet(param) {
    let { open, onClose, highlightedModuleId } = param;
    _s2();
    const { selectBioNode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    const handleModuleClick = (moduleId)=>{
        var _Object_entries_find;
        const bioId = (_Object_entries_find = Object.entries(BIO_TO_MODULE).find((param)=>{
            let [, m] = param;
            return m === moduleId;
        })) === null || _Object_entries_find === void 0 ? void 0 : _Object_entries_find[0];
        if (bioId) selectBioNode(bioId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            y: "100%"
        },
        animate: {
            y: open ? "0%" : "100%"
        },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 35
        },
        className: "absolute bottom-0 left-0 right-0 z-30 pointer-events-auto",
        style: {
            height: "45vh",
            maxHeight: 420
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full backdrop-blur-2xl bg-black/60 border-t border-white/[0.06] rounded-t-3xl overflow-hidden flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-6 py-3 border-b border-white/[0.04] shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-1 rounded-full bg-white/10"
                                }, void 0, false, {
                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                    lineNumber: 400,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-semibold text-neutral-300 uppercase tracking-widest",
                                    children: "Computational Architecture"
                                }, void 0, false, {
                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-neutral-500 hover:text-neutral-300 transition-colors p-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "18",
                                        y1: "6",
                                        x2: "6",
                                        y2: "18"
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 404,
                                        columnNumber: 111
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                        x1: "6",
                                        y1: "6",
                                        x2: "18",
                                        y2: "18"
                                    }, void 0, false, {
                                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                        lineNumber: 404,
                                        columnNumber: 149
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 404,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                            lineNumber: 403,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 398,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 py-4 space-y-1",
                    children: LAYER_ORDER.map((layer)=>{
                        const mods = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$schema$2f$modules$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computationalModules"].filter((m)=>m.layer === layer);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mb-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] uppercase tracking-widest text-neutral-600 font-bold",
                                            children: LAYER_LABELS[layer]
                                        }, void 0, false, {
                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                            lineNumber: 415,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] text-neutral-700",
                                            children: [
                                                "L",
                                                layer
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                            lineNumber: 416,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 h-px bg-white/[0.03]"
                                        }, void 0, false, {
                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                            lineNumber: 417,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                    lineNumber: 414,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3",
                                    children: mods.map((mod)=>{
                                        var _CATEGORY_COLORS_mod_category;
                                        const color = (_CATEGORY_COLORS_mod_category = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_COLORS"][mod.category]) !== null && _CATEGORY_COLORS_mod_category !== void 0 ? _CATEGORY_COLORS_mod_category : "#6366f1";
                                        const isHighlighted = highlightedModuleId === mod.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleModuleClick(mod.id),
                                            className: "text-left rounded-xl border p-3 transition-all duration-200 group",
                                            style: {
                                                background: isHighlighted ? "".concat(color, "12") : "rgba(255,255,255,0.02)",
                                                borderColor: isHighlighted ? "".concat(color, "40") : "rgba(255,255,255,0.04)",
                                                boxShadow: isHighlighted ? "0 0 20px ".concat(color, "15") : "none"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-2 h-2 rounded-full shrink-0 transition-all duration-200",
                                                            style: {
                                                                backgroundColor: isHighlighted ? color : "#333",
                                                                boxShadow: isHighlighted ? "0 0 8px ".concat(color, "60") : "none"
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-semibold truncate transition-colors ".concat(isHighlighted ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"),
                                                            children: mod.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] leading-snug transition-colors ".concat(isHighlighted ? "text-neutral-400" : "text-neutral-600 group-hover:text-neutral-500"),
                                                    children: mod.role
                                                }, void 0, false, {
                                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 mt-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-emerald-600",
                                                            children: [
                                                                mod.inputSources.length,
                                                                " in"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-neutral-700",
                                                            children: "/"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                            lineNumber: 451,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-orange-600",
                                                            children: [
                                                                mod.outputTargets.length,
                                                                " out"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, mod.id, true, {
                                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                            lineNumber: 424,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                    lineNumber: 419,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, layer, true, {
                            fileName: "[project]/components/explorer/BrainExplorer.tsx",
                            lineNumber: 413,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 409,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/explorer/BrainExplorer.tsx",
            lineNumber: 396,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 389,
        columnNumber: 5
    }, this);
}
_s2(ArchitectureSheet, "lOswubl+tv6pJowB9/R10fKfrRQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"]
    ];
});
_c5 = ArchitectureSheet;
// ---------------------------------------------------------------------------
// HINT OVERLAY — shows when nothing selected
// ---------------------------------------------------------------------------
function HintOverlay() {
    _s3();
    const { selectedBioNodeId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    if (selectedBioNodeId) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        className: "absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "backdrop-blur-xl bg-black/30 border border-white/[0.04] rounded-2xl px-5 py-3 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-neutral-400",
                    children: "Click any brain structure to explore"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 482,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] text-neutral-600 mt-0.5",
                    children: "Rotate: drag / Zoom: scroll / Search: ⌘K"
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 483,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/explorer/BrainExplorer.tsx",
            lineNumber: 481,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 475,
        columnNumber: 5
    }, this);
}
_s3(HintOverlay, "k3XlWweuD6/yaMeK5pA620VT1KY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"]
    ];
});
_c6 = HintOverlay;
function BrainExplorer() {
    _s4();
    const { selectedBioNodeId, selectBioNode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"])();
    const [activeLayers, setActiveLayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set([
        "hemispheres",
        "cerebellum",
        "brainstem",
        "deepStructures"
    ]));
    const [isolatedId, setIsolatedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hiddenIds, setHiddenIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [architectureOpen, setArchitectureOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const visibleIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BrainExplorer.useMemo[visibleIds]": ()=>{
            const ids = new Set();
            for (const key of activeLayers){
                for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYER_GROUPS"][key]){
                    if (!hiddenIds.has(id)) ids.add(id);
                }
            }
            return ids;
        }
    }["BrainExplorer.useMemo[visibleIds]"], [
        activeLayers,
        hiddenIds
    ]);
    var _BIO_TO_MODULE_selectedBioNodeId;
    const highlightedModuleId = selectedBioNodeId ? (_BIO_TO_MODULE_selectedBioNodeId = BIO_TO_MODULE[selectedBioNodeId]) !== null && _BIO_TO_MODULE_selectedBioNodeId !== void 0 ? _BIO_TO_MODULE_selectedBioNodeId : null : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrainExplorer.useEffect": ()=>{
            if (!selectedBioNodeId) return;
            const layer = findLayerForId(selectedBioNodeId);
            if (layer && !activeLayers.has(layer)) {
                setActiveLayers({
                    "BrainExplorer.useEffect": (prev)=>new Set([
                            ...prev,
                            layer
                        ])
                }["BrainExplorer.useEffect"]);
            }
        }
    }["BrainExplorer.useEffect"], [
        selectedBioNodeId,
        activeLayers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BrainExplorer.useEffect": ()=>{
            if (!selectedBioNodeId) setIsolatedId(null);
        }
    }["BrainExplorer.useEffect"], [
        selectedBioNodeId
    ]);
    const toggleLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BrainExplorer.useCallback[toggleLayer]": (key)=>{
            setActiveLayers({
                "BrainExplorer.useCallback[toggleLayer]": (prev)=>{
                    const next = new Set(prev);
                    if (next.has(key)) next.delete(key);
                    else next.add(key);
                    return next;
                }
            }["BrainExplorer.useCallback[toggleLayer]"]);
            setIsolatedId(null);
        }
    }["BrainExplorer.useCallback[toggleLayer]"], []);
    const showAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BrainExplorer.useCallback[showAll]": ()=>{
            setActiveLayers(new Set(Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYER_GROUPS"])));
            setHiddenIds(new Set());
            setIsolatedId(null);
        }
    }["BrainExplorer.useCallback[showAll]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BrainExplorer.useCallback[reset]": ()=>{
            setActiveLayers(new Set([
                "hemispheres",
                "cerebellum",
                "brainstem",
                "deepStructures"
            ]));
            setHiddenIds(new Set());
            setIsolatedId(null);
        }
    }["BrainExplorer.useCallback[reset]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-screen overflow-hidden bg-[#060609] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                camera: {
                    position: [
                        0,
                        10,
                        30
                    ],
                    fov: 40
                },
                gl: {
                    antialias: true,
                    alpha: true
                },
                dpr: [
                    1,
                    2
                ],
                className: "!absolute inset-0",
                onPointerMissed: ()=>{
                    selectBioNode(null);
                    setIsolatedId(null);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                        attach: "background",
                        args: [
                            "#060609"
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 559,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                        attach: "fog",
                        args: [
                            "#060609",
                            40,
                            80
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.45
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            10,
                            15,
                            10
                        ],
                        intensity: 0.7,
                        color: "#e0e7ff"
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            -8,
                            5,
                            -10
                        ],
                        intensity: 0.25,
                        color: "#c7d2fe"
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 563,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            0,
                            8,
                            8
                        ],
                        intensity: 0.4,
                        color: "#818cf8",
                        distance: 30
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 564,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            0,
                            5,
                            -5
                        ],
                        intensity: 0.15,
                        color: "#ec4899",
                        distance: 20
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$body$2f$Brain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrainViewProvider"], {
                                visibleIds: visibleIds,
                                isolatedId: isolatedId,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$body$2f$HumanBody$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                    lineNumber: 569,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 568,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stars"], {
                                radius: 100,
                                depth: 80,
                                count: 800,
                                factor: 2,
                                saturation: 0,
                                fade: true,
                                speed: 0.15
                            }, void 0, false, {
                                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 567,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                        makeDefault: true,
                        enableDamping: true,
                        dampingFactor: 0.06,
                        minDistance: 12,
                        maxDistance: 55,
                        enablePan: true,
                        target: [
                            0,
                            7,
                            0
                        ],
                        rotateSpeed: 0.5
                    }, void 0, false, {
                        fileName: "[project]/components/explorer/BrainExplorer.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 549,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopBar, {
                architectureOpen: architectureOpen,
                onToggleArchitecture: ()=>setArchitectureOpen((v)=>!v)
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayerControls, {
                activeLayers: activeLayers,
                onToggle: toggleLayer,
                onShowAll: showAll,
                onReset: reset
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: selectedBioNodeId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectionActions, {
                    onIsolate: ()=>selectedBioNodeId && setIsolatedId(selectedBioNodeId),
                    onHide: ()=>{
                        if (selectedBioNodeId) {
                            setHiddenIds((prev)=>new Set([
                                    ...prev,
                                    selectedBioNodeId
                                ]));
                            setIsolatedId(null);
                        }
                    },
                    isolatedId: isolatedId,
                    onClearIsolate: ()=>setIsolatedId(null)
                }, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 592,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 590,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RightDrawer, {}, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 607,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 606,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HintOverlay, {}, void 0, false, {
                    fileName: "[project]/components/explorer/BrainExplorer.tsx",
                    lineNumber: 611,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 610,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArchitectureSheet, {
                open: architectureOpen,
                onClose: ()=>setArchitectureOpen(false),
                highlightedModuleId: highlightedModuleId
            }, void 0, false, {
                fileName: "[project]/components/explorer/BrainExplorer.tsx",
                lineNumber: 614,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/explorer/BrainExplorer.tsx",
        lineNumber: 547,
        columnNumber: 5
    }, this);
}
_s4(BrainExplorer, "Gv/N4tjUEphKC/MxYgSPIGSSads=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useExplorerStore"]
    ];
});
_c7 = BrainExplorer;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "LayerControls");
__turbopack_context__.k.register(_c1, "SelectionActions");
__turbopack_context__.k.register(_c2, "TopBar");
__turbopack_context__.k.register(_c3, "SearchTrigger");
__turbopack_context__.k.register(_c4, "RightDrawer");
__turbopack_context__.k.register(_c5, "ArchitectureSheet");
__turbopack_context__.k.register(_c6, "HintOverlay");
__turbopack_context__.k.register(_c7, "BrainExplorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/explorer/BrainExplorer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/explorer/BrainExplorer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_74e89543._.js.map