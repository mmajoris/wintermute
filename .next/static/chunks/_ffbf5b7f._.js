(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/collection-mapping.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Collection to Brain Region Mapping
 * 
 * Maps Qdrant collection names (from Molly's brain architecture) to
 * brain region IDs (from the 3D visualization).
 * 
 * Based on the 60-collection architecture in MOLLY-ARCHITECTURE.md
 */ __turbopack_context__.s([
    "COLLECTION_TO_REGION",
    ()=>COLLECTION_TO_REGION,
    "QUEUE_TO_REGION",
    ()=>QUEUE_TO_REGION,
    "REGION_TO_COLLECTIONS",
    ()=>REGION_TO_COLLECTIONS,
    "WORKER_TO_REGION",
    ()=>WORKER_TO_REGION,
    "getCollectionsForRegion",
    ()=>getCollectionsForRegion,
    "getRegionForCollection",
    ()=>getRegionForCollection,
    "getRegionForQueue",
    ()=>getRegionForQueue,
    "getRegionForWorker",
    ()=>getRegionForWorker
]);
const COLLECTION_TO_REGION = {
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
    global_state_modifier: "cn-x",
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
    mood_baseline: "pons"
};
const REGION_TO_COLLECTIONS = {};
for (const [collection, region] of Object.entries(COLLECTION_TO_REGION)){
    if (!REGION_TO_COLLECTIONS[region]) {
        REGION_TO_COLLECTIONS[region] = [];
    }
    REGION_TO_COLLECTIONS[region].push(collection);
}
const WORKER_TO_REGION = {
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
    "narrative-engine": "left-hemisphere"
};
const QUEUE_TO_REGION = {
    "input-raw": "thalamus",
    "classify-result": "thalamus",
    "memory-write": "hippocampus",
    "memory-retrieve": "hippocampus",
    "action-evaluate": "caudate-nucleus",
    "action-execute": "left-hemisphere",
    "reward-compute": "nucleus-accumbens",
    "reflection": "left-hemisphere",
    "thought": "left-hemisphere"
};
function getRegionForCollection(collection) {
    var _COLLECTION_TO_REGION_collection;
    return (_COLLECTION_TO_REGION_collection = COLLECTION_TO_REGION[collection]) !== null && _COLLECTION_TO_REGION_collection !== void 0 ? _COLLECTION_TO_REGION_collection : null;
}
function getRegionForWorker(worker) {
    var _WORKER_TO_REGION_worker;
    return (_WORKER_TO_REGION_worker = WORKER_TO_REGION[worker]) !== null && _WORKER_TO_REGION_worker !== void 0 ? _WORKER_TO_REGION_worker : null;
}
function getRegionForQueue(queue) {
    var _QUEUE_TO_REGION_queue;
    return (_QUEUE_TO_REGION_queue = QUEUE_TO_REGION[queue]) !== null && _QUEUE_TO_REGION_queue !== void 0 ? _QUEUE_TO_REGION_queue : null;
}
function getCollectionsForRegion(region) {
    var _REGION_TO_COLLECTIONS_region;
    return (_REGION_TO_COLLECTIONS_region = REGION_TO_COLLECTIONS[region]) !== null && _REGION_TO_COLLECTIONS_region !== void 0 ? _REGION_TO_COLLECTIONS_region : [];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/live-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFilteredEvents",
    ()=>getFilteredEvents,
    "useLiveStore",
    ()=>useLiveStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/collection-mapping.ts [app-client] (ecmascript)");
;
;
const ACTIVITY_DECAY_RATE = 0.92;
const MIN_ACTIVITY_THRESHOLD = 0.05;
const MAX_RECENT_EVENTS = 200;
const useLiveStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        connected: false,
        connectionError: null,
        eventsPerSecond: 0,
        recentEvents: [],
        maxRecentEvents: MAX_RECENT_EVENTS,
        regionActivity: new Map(),
        activeWorkers: new Map(),
        queueStatus: new Map(),
        emotionalState: null,
        systemVitals: null,
        lastThoughtTick: null,
        thoughtLoopPulse: 0,
        selectedRegionId: null,
        hoveredRegionId: null,
        setConnected: function(connected) {
            let error = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            return set({
                connected,
                connectionError: error
            });
        },
        setEventsPerSecond: (rate)=>set({
                eventsPerSecond: rate
            }),
        processEvent: (envelope)=>{
            const state = get();
            const event = envelope.event;
            const now = Date.now();
            const newRecentEvents = [
                ...state.recentEvents,
                envelope
            ].slice(-state.maxRecentEvents);
            const updates = {
                recentEvents: newRecentEvents
            };
            const newRegionActivity = new Map(state.regionActivity);
            const newActiveWorkers = new Map(state.activeWorkers);
            const newQueueStatus = new Map(state.queueStatus);
            switch(event.type){
                case "thought_loop_tick":
                    updates.lastThoughtTick = event;
                    updates.thoughtLoopPulse = 1;
                    break;
                case "collection_activity":
                    {
                        const regionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionForCollection"])(event.collection);
                        if (regionId) {
                            activateRegion(newRegionActivity, regionId, now, event.collection);
                        }
                        break;
                    }
                case "worker_activity":
                    {
                        const regionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionForWorker"])(event.worker);
                        if (event.status === "started") {
                            newActiveWorkers.set(event.job_id, {
                                worker: event.worker,
                                jobId: event.job_id,
                                startedAt: now,
                                regionId
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
                case "queue_metrics":
                    {
                        newQueueStatus.set(event.queue, {
                            queue: event.queue,
                            pending: event.pending,
                            active: event.active,
                            completed: event.completed,
                            failed: event.failed
                        });
                        updates.queueStatus = newQueueStatus;
                        const regionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionForQueue"])(event.queue);
                        if (regionId && event.active > 0) {
                            activateRegion(newRegionActivity, regionId, now, event.queue);
                        }
                        break;
                    }
                case "emotional_state":
                    updates.emotionalState = event;
                    break;
                case "system_vitals":
                    updates.systemVitals = event;
                    break;
                case "soul_cycle":
                    {
                        activateRegion(newRegionActivity, "left-hemisphere", now, "soul_cycle");
                        break;
                    }
                case "action_dispatch":
                    {
                        activateRegion(newRegionActivity, "left-hemisphere", now, "action_dispatch");
                        break;
                    }
                case "memory_event":
                    {
                        activateRegion(newRegionActivity, "hippocampus", now, "memory");
                        break;
                    }
                case "reward_signal":
                    {
                        activateRegion(newRegionActivity, "nucleus-accumbens", now, "reward");
                        break;
                    }
                case "error_correction":
                    {
                        activateRegion(newRegionActivity, "cerebellum", now, "error_correction");
                        break;
                    }
            }
            updates.regionActivity = newRegionActivity;
            set(updates);
        },
        processHistory: (envelopes)=>{
            for (const envelope of envelopes){
                get().processEvent(envelope);
            }
        },
        selectRegion: (id)=>set({
                selectedRegionId: id
            }),
        hoverRegion: (id)=>set({
                hoveredRegionId: id
            }),
        decayActivity: ()=>{
            const state = get();
            const newRegionActivity = new Map();
            const now = Date.now();
            for (const [regionId, activity] of state.regionActivity){
                const timeSinceActivity = now - activity.lastActivity;
                const decayFactor = Math.pow(ACTIVITY_DECAY_RATE, timeSinceActivity / 100);
                const newIntensity = activity.intensity * decayFactor;
                if (newIntensity > MIN_ACTIVITY_THRESHOLD) {
                    newRegionActivity.set(regionId, {
                        ...activity,
                        intensity: newIntensity
                    });
                }
            }
            const newPulse = state.thoughtLoopPulse * 0.95;
            set({
                regionActivity: newRegionActivity,
                thoughtLoopPulse: newPulse < 0.01 ? 0 : newPulse
            });
        },
        triggerThoughtPulse: ()=>set({
                thoughtLoopPulse: 1
            })
    }));
function activateRegion(activityMap, regionId, now, operation) {
    const existing = activityMap.get(regionId);
    const newIntensity = existing ? Math.min(existing.intensity + 0.3, 1) : 0.5;
    var _existing_activeOperations;
    const activeOperations = (_existing_activeOperations = existing === null || existing === void 0 ? void 0 : existing.activeOperations) !== null && _existing_activeOperations !== void 0 ? _existing_activeOperations : new Set();
    activeOperations.add(operation);
    activityMap.set(regionId, {
        regionId,
        intensity: newIntensity,
        lastActivity: now,
        activeOperations
    });
}
function getFilteredEvents(events, regionId, types) {
    return events.filter((envelope)=>{
        if (types && !types.includes(envelope.event.type)) {
            return false;
        }
        if (!regionId) return true;
        const event = envelope.event;
        switch(event.type){
            case "collection_activity":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionForCollection"])(event.collection) === regionId;
            case "worker_activity":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionForWorker"])(event.worker) === regionId;
            case "queue_metrics":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionForQueue"])(event.queue) === regionId;
            default:
                return true;
        }
    });
}
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
"[project]/components/live/shaders/NeuralBrainMaterial.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NeuralBrainMaterial",
    ()=>NeuralBrainMaterial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shaderMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/shaderMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export e as extend>");
"use client";
;
;
;
const NeuralBrainMaterial = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$shaderMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shaderMaterial"])({
    time: 0,
    baseColor: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x00d4ff),
    glowColor: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x00ffff),
    activityIntensity: 0,
    opacity: 0.6,
    fresnelPower: 2.5,
    pulseSpeed: 1.0,
    wireframeOpacity: 0.4
}, "\n    varying vec3 vNormal;\n    varying vec3 vViewPosition;\n    varying vec2 vUv;\n    varying vec3 vWorldPosition;\n    \n    void main() {\n      vUv = uv;\n      vNormal = normalize(normalMatrix * normal);\n      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n      vViewPosition = -mvPosition.xyz;\n      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;\n      gl_Position = projectionMatrix * mvPosition;\n    }\n  ", "\n    uniform float time;\n    uniform vec3 baseColor;\n    uniform vec3 glowColor;\n    uniform float activityIntensity;\n    uniform float opacity;\n    uniform float fresnelPower;\n    uniform float pulseSpeed;\n    uniform float wireframeOpacity;\n    \n    varying vec3 vNormal;\n    varying vec3 vViewPosition;\n    varying vec2 vUv;\n    varying vec3 vWorldPosition;\n    \n    // Simplex noise for organic variation\n    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\n    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }\n    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }\n    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n    \n    float snoise(vec3 v) {\n      const vec2 C = vec2(1.0/6.0, 1.0/3.0);\n      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n      \n      vec3 i  = floor(v + dot(v, C.yyy));\n      vec3 x0 = v - i + dot(i, C.xxx);\n      \n      vec3 g = step(x0.yzx, x0.xyz);\n      vec3 l = 1.0 - g;\n      vec3 i1 = min(g.xyz, l.zxy);\n      vec3 i2 = max(g.xyz, l.zxy);\n      \n      vec3 x1 = x0 - i1 + C.xxx;\n      vec3 x2 = x0 - i2 + C.yyy;\n      vec3 x3 = x0 - D.yyy;\n      \n      i = mod289(i);\n      vec4 p = permute(permute(permute(\n                i.z + vec4(0.0, i1.z, i2.z, 1.0))\n              + i.y + vec4(0.0, i1.y, i2.y, 1.0))\n              + i.x + vec4(0.0, i1.x, i2.x, 1.0));\n              \n      float n_ = 0.142857142857;\n      vec3 ns = n_ * D.wyz - D.xzx;\n      \n      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);\n      \n      vec4 x_ = floor(j * ns.z);\n      vec4 y_ = floor(j - 7.0 * x_);\n      \n      vec4 x = x_ *ns.x + ns.yyyy;\n      vec4 y = y_ *ns.x + ns.yyyy;\n      vec4 h = 1.0 - abs(x) - abs(y);\n      \n      vec4 b0 = vec4(x.xy, y.xy);\n      vec4 b1 = vec4(x.zw, y.zw);\n      \n      vec4 s0 = floor(b0)*2.0 + 1.0;\n      vec4 s1 = floor(b1)*2.0 + 1.0;\n      vec4 sh = -step(h, vec4(0.0));\n      \n      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;\n      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;\n      \n      vec3 p0 = vec3(a0.xy, h.x);\n      vec3 p1 = vec3(a0.zw, h.y);\n      vec3 p2 = vec3(a1.xy, h.z);\n      vec3 p3 = vec3(a1.zw, h.w);\n      \n      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));\n      p0 *= norm.x;\n      p1 *= norm.y;\n      p2 *= norm.z;\n      p3 *= norm.w;\n      \n      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n      m = m * m;\n      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));\n    }\n    \n    void main() {\n      // Fresnel effect for edge glow\n      vec3 viewDir = normalize(vViewPosition);\n      float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), fresnelPower);\n      \n      // Animated noise for organic pulsing\n      float noise = snoise(vWorldPosition * 0.3 + time * 0.2 * pulseSpeed) * 0.5 + 0.5;\n      float pulse = sin(time * pulseSpeed * 2.0) * 0.3 + 0.7;\n      \n      // Activity-based intensity boost\n      float activityPulse = sin(time * 6.0) * 0.2 + 0.8;\n      float activityBoost = activityIntensity * activityPulse;\n      \n      // Combine effects\n      float edgeGlow = fresnel * (0.6 + noise * 0.4) * pulse;\n      edgeGlow += activityBoost * fresnel * 0.8;\n      \n      // Color mixing\n      vec3 finalColor = mix(baseColor, glowColor, edgeGlow);\n      finalColor += glowColor * activityBoost * 0.5;\n      \n      // Inner glow (subtle)\n      float innerGlow = (1.0 - fresnel) * 0.15 * (0.5 + noise * 0.5);\n      finalColor += baseColor * innerGlow;\n      \n      // Final alpha with fresnel-based transparency\n      float alpha = opacity * (0.3 + fresnel * 0.7 + activityBoost * 0.3);\n      alpha = clamp(alpha, 0.0, 1.0);\n      \n      gl_FragColor = vec4(finalColor, alpha);\n    }\n  ");
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__e__as__extend$3e$__["extend"])({
    NeuralBrainMaterial
});
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/NeuralBrain3DViewer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NeuralBrainViewProvider",
    ()=>NeuralBrainViewProvider,
    "default",
    ()=>NeuralBrain3DViewer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/web/Html.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/brain-model-loader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/collection-mapping.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$shaders$2f$NeuralBrainMaterial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/shaders/NeuralBrainMaterial.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
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
const NeuralBrainViewContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    visibleIds: new Set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAIN_MODEL_REGISTRY"].map((e)=>e.id))
});
function NeuralBrainViewProvider(param) {
    let { visibleIds, children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralBrainViewContext.Provider, {
        value: {
            visibleIds
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c = NeuralBrainViewProvider;
// Cyan color palette for neural look
const NEURAL_COLORS = {
    base: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x00a8cc),
    glow: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x00ffff),
    active: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x00ff88),
    highlight: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x88ffff)
};
function NeuralBrainRegionMesh(param) {
    let { entry } = param;
    _s1();
    const geometry = useBrainGeometry(entry.file);
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wireframeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const matRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { selectedRegionId, selectRegion, hoverRegion, regionActivity, thoughtLoopPulse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const isSelected = selectedRegionId === entry.id;
    const activity = regionActivity.get(entry.id);
    var _activity_intensity;
    const activityIntensity = (_activity_intensity = activity === null || activity === void 0 ? void 0 : activity.intensity) !== null && _activity_intensity !== void 0 ? _activity_intensity : 0;
    const collections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCollectionsForRegion"])(entry.id);
    // Create wireframe geometry
    const wireframeGeo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuralBrainRegionMesh.useMemo[wireframeGeo]": ()=>{
            if (!geometry) return null;
            return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WireframeGeometry"](geometry);
        }
    }["NeuralBrainRegionMesh.useMemo[wireframeGeo]"], [
        geometry
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "NeuralBrainRegionMesh.useFrame": (param)=>{
            let { clock } = param;
            if (!matRef.current) return;
            const time = clock.getElapsedTime();
            matRef.current.uniforms.time.value = time;
            // Activity intensity
            let targetActivity = activityIntensity;
            if (isSelected) targetActivity = Math.max(targetActivity, 0.5);
            if (hovered) targetActivity = Math.max(targetActivity, 0.3);
            matRef.current.uniforms.activityIntensity.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(matRef.current.uniforms.activityIntensity.value, targetActivity, 0.1);
            // Pulse speed based on thought loop
            matRef.current.uniforms.pulseSpeed.value = 1 + thoughtLoopPulse * 0.5;
            // Update wireframe opacity
            if (wireframeRef.current) {
                const wireMat = wireframeRef.current.material;
                const targetWireOpacity = 0.15 + activityIntensity * 0.3 + (hovered ? 0.2 : 0) + (isSelected ? 0.25 : 0);
                wireMat.opacity = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(wireMat.opacity, targetWireOpacity, 0.1);
            }
        }
    }["NeuralBrainRegionMesh.useFrame"]);
    if (!geometry) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: meshRef,
                geometry: geometry,
                onClick: (e)=>{
                    e.stopPropagation();
                    selectRegion(isSelected ? null : entry.id);
                },
                onPointerEnter: (e)=>{
                    e.stopPropagation();
                    setHovered(true);
                    hoverRegion(entry.id);
                    document.body.style.cursor = "pointer";
                },
                onPointerLeave: ()=>{
                    setHovered(false);
                    hoverRegion(null);
                    document.body.style.cursor = "";
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("neuralBrainMaterial", {
                    ref: matRef,
                    time: 0,
                    baseColor: NEURAL_COLORS.base,
                    glowColor: NEURAL_COLORS.glow,
                    activityIntensity: 0,
                    opacity: 0.5,
                    fresnelPower: 2.2,
                    pulseSpeed: 1,
                    transparent: true,
                    side: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                    depthWrite: false
                }, void 0, false, {
                    fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            wireframeGeo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineSegments", {
                ref: wireframeRef,
                geometry: wireframeGeo,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("lineBasicMaterial", {
                    color: NEURAL_COLORS.glow,
                    transparent: true,
                    opacity: 0.15,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                    depthWrite: false
                }, void 0, false, {
                    fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                    lineNumber: 178,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 177,
                columnNumber: 9
            }, this),
            (hovered || isSelected || activityIntensity > 0.3) && geometry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralRegionLabel, {
                entry: entry,
                geometry: geometry,
                activityIntensity: activityIntensity,
                collections: collections,
                isSelected: isSelected
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_s1(NeuralBrainRegionMesh, "W/5tBRs0jUqLvjNKm7UbxBR0y/s=", false, function() {
    return [
        useBrainGeometry,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = NeuralBrainRegionMesh;
function NeuralRegionLabel(param) {
    let { entry, geometry, activityIntensity, collections, isSelected } = param;
    _s2();
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuralRegionLabel.useMemo[center]": ()=>{
            geometry.computeBoundingBox();
            const box = geometry.boundingBox;
            const c = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            box.getCenter(c);
            c.y = box.max.y + 0.6;
            return c;
        }
    }["NeuralRegionLabel.useMemo[center]"], [
        geometry
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            center.x,
            center.y,
            center.z
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                fontSize: 0.45,
                color: isSelected ? "#00ffff" : "#88ddff",
                anchorX: "center",
                anchorY: "bottom",
                outlineWidth: 0.025,
                outlineColor: "#000000",
                font: "/fonts/inter-medium.woff",
                children: entry.name
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            activityIntensity > 0.1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$web$2f$Html$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Html"], {
                center: true,
                position: [
                    0,
                    0.7,
                    0
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-[10px] whitespace-nowrap border border-cyan-500/30 shadow-lg shadow-cyan-500/20",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-cyan-400 font-medium",
                            children: collections.length > 0 ? "".concat(collections.length, " collection").concat(collections.length > 1 ? "s" : "") : "Active"
                        }, void 0, false, {
                            fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-cyan-600 ml-1.5",
                            children: [
                                Math.round(activityIntensity * 100),
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                            lineNumber: 245,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                    lineNumber: 239,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 238,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
        lineNumber: 225,
        columnNumber: 5
    }, this);
}
_s2(NeuralRegionLabel, "BtWZDGVyQ2L0Gv7TJUbUk/Xae7Q=");
_c2 = NeuralRegionLabel;
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
            className: "bg-black/60 backdrop-blur-xl rounded-xl px-5 py-3 text-xs text-cyan-400 whitespace-nowrap border border-cyan-500/20",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    "Loading neural map... ",
                    loaded,
                    "/",
                    total
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 266,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
            lineNumber: 265,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
}
_c3 = LoadingProgress;
function NeuralBrain3DViewer() {
    _s3();
    const { visibleIds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(NeuralBrainViewContext);
    const [loadedCount, setLoadedCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeuralBrain3DViewer.useEffect": ()=>{
            const interval = setInterval({
                "NeuralBrain3DViewer.useEffect.interval": ()=>setLoadedCount(geometryCache.size)
            }["NeuralBrain3DViewer.useEffect.interval"], 200);
            return ({
                "NeuralBrain3DViewer.useEffect": ()=>clearInterval(interval)
            })["NeuralBrain3DViewer.useEffect"];
        }
    }["NeuralBrain3DViewer.useEffect"], []);
    const visibleEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuralBrain3DViewer.useMemo[visibleEntries]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAIN_MODEL_REGISTRY"].filter({
                "NeuralBrain3DViewer.useMemo[visibleEntries]": (e)=>visibleIds.has(e.id)
            }["NeuralBrain3DViewer.useMemo[visibleEntries]"])
    }["NeuralBrain3DViewer.useMemo[visibleEntries]"], [
        visibleIds
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingProgress, {
                loaded: loadedCount,
                total: visibleEntries.length
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            visibleEntries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NeuralBrainRegionMesh, {
                    entry: entry
                }, entry.id, false, {
                    fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/NeuralBrain3DViewer.tsx",
        lineNumber: 290,
        columnNumber: 5
    }, this);
}
_s3(NeuralBrain3DViewer, "6RsKr5d1+nB/wktJ6IjJS7fQNpM=");
_c4 = NeuralBrain3DViewer;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "NeuralBrainViewProvider");
__turbopack_context__.k.register(_c1, "NeuralBrainRegionMesh");
__turbopack_context__.k.register(_c2, "NeuralRegionLabel");
__turbopack_context__.k.register(_c3, "LoadingProgress");
__turbopack_context__.k.register(_c4, "NeuralBrain3DViewer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/NeuralParticles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeuralParticles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PARTICLE_COUNT = 200;
const BRAIN_BOUNDS = {
    min: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-8, 0, -6),
    max: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](8, 16, 6)
};
function NeuralParticles() {
    _s();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { eventsPerSecond, regionActivity, thoughtLoopPulse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuralParticles.useMemo[particles]": ()=>{
            return Array.from({
                length: PARTICLE_COUNT
            }, {
                "NeuralParticles.useMemo[particles]": ()=>({
                        position: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(BRAIN_BOUNDS.min.x, BRAIN_BOUNDS.max.x), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(BRAIN_BOUNDS.min.y, BRAIN_BOUNDS.max.y), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(BRAIN_BOUNDS.min.z, BRAIN_BOUNDS.max.z)),
                        velocity: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloatSpread(0.02), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.01, 0.04), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloatSpread(0.02)),
                        life: Math.random(),
                        maxLife: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(2, 5),
                        size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.08, 0.25),
                        brightness: Math.random()
                    })
            }["NeuralParticles.useMemo[particles]"]);
        }
    }["NeuralParticles.useMemo[particles]"], []);
    const [positions, colors, sizes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NeuralParticles.useMemo": ()=>{
            const pos = new Float32Array(PARTICLE_COUNT * 3);
            const col = new Float32Array(PARTICLE_COUNT * 3);
            const siz = new Float32Array(PARTICLE_COUNT);
            return [
                pos,
                col,
                siz
            ];
        }
    }["NeuralParticles.useMemo"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "NeuralParticles.useFrame": (state, delta)=>{
            if (!pointsRef.current) return;
            const geometry = pointsRef.current.geometry;
            const posAttr = geometry.attributes.position;
            const colAttr = geometry.attributes.color;
            const sizeAttr = geometry.attributes.size;
            // Activity level affects particle behavior
            const activityLevel = Math.min(eventsPerSecond / 20, 1);
            const totalRegionActivity = Array.from(regionActivity.values()).reduce({
                "NeuralParticles.useFrame.totalRegionActivity": (sum, r)=>sum + r.intensity
            }["NeuralParticles.useFrame.totalRegionActivity"], 0);
            const normalizedActivity = Math.min(totalRegionActivity / 5, 1);
            // Colors: cyan base, orange for active particles
            const cyanColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0x00d4ff);
            const orangeColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xff6b35);
            const whiteColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](0xffffff);
            for(let i = 0; i < PARTICLE_COUNT; i++){
                const p = particles[i];
                // Update life
                p.life += delta / p.maxLife;
                // Respawn if dead
                if (p.life >= 1) {
                    p.life = 0;
                    p.maxLife = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(2, 5);
                    p.position.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(BRAIN_BOUNDS.min.x, BRAIN_BOUNDS.max.x), BRAIN_BOUNDS.min.y + Math.random() * 2, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(BRAIN_BOUNDS.min.z, BRAIN_BOUNDS.max.z));
                    p.velocity.set(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloatSpread(0.02), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.02, 0.06) * (1 + activityLevel), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloatSpread(0.02));
                    p.brightness = Math.random();
                    p.size = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].randFloat(0.08, 0.25);
                }
                // Movement with activity influence
                const speedMult = 1 + activityLevel * 2 + thoughtLoopPulse * 0.5;
                p.position.add(p.velocity.clone().multiplyScalar(speedMult));
                // Slight drift toward center (brain shape)
                const toCenter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 8, 0).sub(p.position).normalize();
                p.position.add(toCenter.multiplyScalar(0.002));
                // Bounds check with soft wrapping
                if (p.position.y > BRAIN_BOUNDS.max.y) {
                    p.life = 1; // Force respawn
                }
                p.position.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(p.position.x, BRAIN_BOUNDS.min.x, BRAIN_BOUNDS.max.x);
                p.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(p.position.z, BRAIN_BOUNDS.min.z, BRAIN_BOUNDS.max.z);
                // Update position buffer
                posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);
                // Life-based fade (fade in, stay, fade out)
                const lifeFade = p.life < 0.1 ? p.life / 0.1 : p.life > 0.8 ? (1 - p.life) / 0.2 : 1;
                // Color: mix between cyan and orange based on activity and randomness
                const isActiveParticle = p.brightness > 0.7 && normalizedActivity > 0.3;
                const particleColor = isActiveParticle ? orangeColor.clone().lerp(whiteColor, normalizedActivity * 0.3) : cyanColor.clone().lerp(whiteColor, p.brightness * 0.2);
                colAttr.setXYZ(i, particleColor.r * lifeFade, particleColor.g * lifeFade, particleColor.b * lifeFade);
                // Size with pulse
                const sizePulse = Math.sin(state.clock.elapsedTime * 3 + i) * 0.3 + 1;
                const activitySize = isActiveParticle ? 1.5 : 1;
                sizeAttr.setX(i, p.size * lifeFade * sizePulse * activitySize);
            }
            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;
            sizeAttr.needsUpdate = true;
        }
    }["NeuralParticles.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("points", {
        ref: pointsRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferGeometry", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-position",
                        count: PARTICLE_COUNT,
                        array: positions,
                        itemSize: 3
                    }, void 0, false, {
                        fileName: "[project]/components/live/NeuralParticles.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-color",
                        count: PARTICLE_COUNT,
                        array: colors,
                        itemSize: 3
                    }, void 0, false, {
                        fileName: "[project]/components/live/NeuralParticles.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("bufferAttribute", {
                        attach: "attributes-size",
                        count: PARTICLE_COUNT,
                        array: sizes,
                        itemSize: 1
                    }, void 0, false, {
                        fileName: "[project]/components/live/NeuralParticles.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/NeuralParticles.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointsMaterial", {
                size: 0.15,
                vertexColors: true,
                transparent: true,
                opacity: 0.9,
                sizeAttenuation: true,
                blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"],
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralParticles.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/NeuralParticles.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_s(NeuralParticles, "zXZMqoHPzPkSf/ve+xEmJO9yC8s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = NeuralParticles;
var _c;
__turbopack_context__.k.register(_c, "NeuralParticles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/NeuralEffects.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeuralEffects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postprocessing/build/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function NeuralEffects() {
    _s();
    const { eventsPerSecond, thoughtLoopPulse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    // Dynamic bloom based on activity
    const activityLevel = Math.min(eventsPerSecond / 15, 1);
    const bloomIntensity = 1.2 + activityLevel * 0.8 + thoughtLoopPulse * 0.3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                intensity: bloomIntensity,
                luminanceThreshold: 0.2,
                luminanceSmoothing: 0.9,
                mipmapBlur: true,
                radius: 0.8
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralEffects.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChromaticAberration"], {
                blendFunction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlendFunction"].NORMAL,
                offset: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.0005 + activityLevel * 0.001, 0.0005 + activityLevel * 0.001),
                radialModulation: false,
                modulationOffset: 0
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralEffects.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vignette"], {
                offset: 0.3,
                darkness: 0.7,
                blendFunction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlendFunction"].NORMAL
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralEffects.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Noise"], {
                premultiply: true,
                blendFunction: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlendFunction"].SOFT_LIGHT,
                opacity: 0.15
            }, void 0, false, {
                fileName: "[project]/components/live/NeuralEffects.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/NeuralEffects.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(NeuralEffects, "+0xe8TKAv0k/ED1JHRUmKV/8p5c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c = NeuralEffects;
var _c;
__turbopack_context__.k.register(_c, "NeuralEffects");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/LiveTopBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveTopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function LiveTopBar(param) {
    let { panelOpen, onTogglePanel } = param;
    _s();
    const { connected, eventsPerSecond, emotionalState, lastThoughtTick } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    var _emotionalState_mood;
    const moodLabel = (_emotionalState_mood = emotionalState === null || emotionalState === void 0 ? void 0 : emotionalState.mood) !== null && _emotionalState_mood !== void 0 ? _emotionalState_mood : "Unknown";
    var _emotionalState_valence;
    const moodValence = (_emotionalState_valence = emotionalState === null || emotionalState === void 0 ? void 0 : emotionalState.valence) !== null && _emotionalState_valence !== void 0 ? _emotionalState_valence : 0;
    const moodColor = moodValence > 0.3 ? "#22c55e" : moodValence < -0.3 ? "#ef4444" : "#f59e0b";
    var _lastThoughtTick_energy;
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
                            className: "w-2 h-2 rounded-full transition-all duration-300",
                            style: {
                                backgroundColor: connected ? "#22c55e" : "#ef4444",
                                boxShadow: connected ? "0 0 8px #22c55e80" : "0 0 8px #ef444480"
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/live/LiveTopBar.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-semibold text-neutral-300 tracking-wide",
                            children: "LIVE VIEW"
                        }, void 0, false, {
                            fileName: "[project]/components/live/LiveTopBar.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/live/LiveTopBar.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-px h-5 bg-white/[0.06]"
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveTopBar.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] text-neutral-500 uppercase",
                                    children: "Events"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/LiveTopBar.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-mono text-cyan-400",
                                    children: [
                                        eventsPerSecond.toFixed(1),
                                        "/s"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/live/LiveTopBar.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/LiveTopBar.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        lastThoughtTick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-4 bg-white/[0.04]"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/LiveTopBar.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-neutral-500 uppercase",
                                            children: "Mood"
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/LiveTopBar.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium",
                                            style: {
                                                color: moodColor
                                            },
                                            children: moodLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/LiveTopBar.tsx",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/live/LiveTopBar.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-4 bg-white/[0.04]"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/LiveTopBar.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-neutral-500 uppercase",
                                            children: "Energy"
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/LiveTopBar.tsx",
                                            lineNumber: 76,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-mono text-purple-400",
                                            children: [
                                                (((_lastThoughtTick_energy = lastThoughtTick.energy) !== null && _lastThoughtTick_energy !== void 0 ? _lastThoughtTick_energy : 0) * 100).toFixed(0),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/live/LiveTopBar.tsx",
                                            lineNumber: 79,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/live/LiveTopBar.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/live/LiveTopBar.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-px h-5 bg-white/[0.06]"
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveTopBar.tsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onTogglePanel,
                    className: "px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ".concat(panelOpen ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04]"),
                    children: "Processes"
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveTopBar.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/live/LiveTopBar.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/LiveTopBar.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(LiveTopBar, "aktU5QEaXMcvSRp2G1S8jcCjJaY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c = LiveTopBar;
var _c;
__turbopack_context__.k.register(_c, "LiveTopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/LiveProcessPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveProcessPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/brain-model-loader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/collection-mapping.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function formatTimestamp(ts) {
    const date = new Date(ts);
    return date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
function formatDuration(ms) {
    if (ms < 1000) return "".concat(ms, "ms");
    return "".concat((ms / 1000).toFixed(1), "s");
}
function EventIcon(param) {
    let { type } = param;
    const icons = {
        thought_loop_tick: {
            icon: "◉",
            color: "#818cf8"
        },
        collection_activity: {
            icon: "◆",
            color: "#22c55e"
        },
        worker_activity: {
            icon: "⚙",
            color: "#f59e0b"
        },
        queue_metrics: {
            icon: "▤",
            color: "#06b6d4"
        },
        emotional_state: {
            icon: "♥",
            color: "#ec4899"
        },
        soul_cycle: {
            icon: "✧",
            color: "#a78bfa"
        },
        action_dispatch: {
            icon: "→",
            color: "#fb923c"
        },
        system_vitals: {
            icon: "♡",
            color: "#ef4444"
        },
        budget_status: {
            icon: "$",
            color: "#eab308"
        },
        memory_event: {
            icon: "◇",
            color: "#14b8a6"
        },
        reward_signal: {
            icon: "★",
            color: "#f472b6"
        },
        error_correction: {
            icon: "⟳",
            color: "#8b5cf6"
        }
    };
    var _icons_type;
    const { icon, color } = (_icons_type = icons[type]) !== null && _icons_type !== void 0 ? _icons_type : {
        icon: "•",
        color: "#666"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-xs",
        style: {
            color
        },
        children: icon
    }, void 0, false, {
        fileName: "[project]/components/live/LiveProcessPanel.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = EventIcon;
function EventSummary(param) {
    let { event } = param;
    switch(event.type){
        case "thought_loop_tick":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Thought tick",
                    " ",
                    event.impulse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-indigo-400",
                        children: "(impulse)"
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this);
        case "collection_activity":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-cyan-400 font-mono",
                        children: event.collection
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-500",
                        children: event.operation
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-400",
                        children: [
                            "×",
                            event.count
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this);
        case "worker_activity":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-amber-400",
                        children: event.worker
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: event.status === "completed" ? "text-emerald-500" : event.status === "failed" ? "text-red-500" : "text-neutral-500",
                        children: event.status
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    event.duration_ms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-600 ml-1",
                        children: formatDuration(event.duration_ms)
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 71,
                columnNumber: 9
            }, this);
        case "queue_metrics":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-cyan-400 font-mono",
                        children: event.queue
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-500",
                        children: [
                            event.pending,
                            "p / ",
                            event.active,
                            "a"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this);
        case "emotional_state":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Mood:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: event.valence > 0.3 ? "text-emerald-400" : event.valence < -0.3 ? "text-red-400" : "text-amber-400",
                        children: event.mood
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this);
        case "soul_cycle":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Soul cycle",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-purple-400",
                        children: event.tier
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-500",
                        children: event.status
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this);
        case "action_dispatch":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Action:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-orange-400",
                        children: event.action
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-neutral-500",
                        children: [
                            "→ ",
                            event.target
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 127,
                columnNumber: 9
            }, this);
        case "system_vitals":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Vitals: CPU ",
                    event.cpu_percent.toFixed(0),
                    "% / Mem",
                    " ",
                    event.memory_percent.toFixed(0),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 135,
                columnNumber: 9
            }, this);
        case "memory_event":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Memory ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-teal-400",
                        children: event.operation
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 143,
                        columnNumber: 18
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this);
        case "reward_signal":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Reward:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: event.prediction_error > 0 ? "text-emerald-400" : "text-red-400",
                        children: [
                            event.prediction_error > 0 ? "+" : "",
                            event.prediction_error.toFixed(2)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this);
        case "error_correction":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    "Error correction:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-purple-400",
                        children: event.source
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: event.type
            }, void 0, false, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 168,
                columnNumber: 14
            }, this);
    }
}
_c1 = EventSummary;
function LiveProcessPanel() {
    _s();
    const { recentEvents, activeWorkers, selectedRegionId, selectRegion, regionActivity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const selectedRegion = selectedRegionId ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAIN_MODEL_REGISTRY"].find((r)=>r.id === selectedRegionId) : null;
    const filteredEvents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveProcessPanel.useMemo[filteredEvents]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredEvents"])(recentEvents, selectedRegionId).slice(-50);
        }
    }["LiveProcessPanel.useMemo[filteredEvents]"], [
        recentEvents,
        selectedRegionId
    ]);
    const activeRegions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveProcessPanel.useMemo[activeRegions]": ()=>{
            return Array.from(regionActivity.entries()).filter({
                "LiveProcessPanel.useMemo[activeRegions]": (param)=>{
                    let [, activity] = param;
                    return activity.intensity > 0.1;
                }
            }["LiveProcessPanel.useMemo[activeRegions]"]).sort({
                "LiveProcessPanel.useMemo[activeRegions]": (a, b)=>b[1].intensity - a[1].intensity
            }["LiveProcessPanel.useMemo[activeRegions]"]).slice(0, 8);
        }
    }["LiveProcessPanel.useMemo[activeRegions]"], [
        regionActivity
    ]);
    const collections = selectedRegionId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$collection$2d$mapping$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCollectionsForRegion"])(selectedRegionId) : [];
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
        className: "absolute top-20 right-4 bottom-20 z-20 w-[360px] max-w-[40vw] flex flex-col gap-3 overflow-hidden pointer-events-none",
        children: [
            selectedRegion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1 w-full",
                        style: {
                            background: "linear-gradient(90deg, ".concat(selectedRegion.color, ", ").concat(selectedRegion.color, "00)")
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2.5 h-2.5 rounded-full",
                                                style: {
                                                    backgroundColor: selectedRegion.color,
                                                    boxShadow: "0 0 8px ".concat(selectedRegion.color, "60")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                lineNumber: 219,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-semibold text-white",
                                                children: selectedRegion.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                lineNumber: 226,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 218,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>selectRegion(null),
                                        className: "text-neutral-500 hover:text-neutral-300 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "14",
                                            height: "14",
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
                                                    fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "6",
                                                    y1: "6",
                                                    x2: "18",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                    lineNumber: 243,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                            lineNumber: 234,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this),
                            collections.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-neutral-500 uppercase tracking-wider",
                                        children: [
                                            "Collections (",
                                            collections.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 250,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1 mt-1",
                                        children: [
                                            collections.slice(0, 6).map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono",
                                                    children: col
                                                }, col, false, {
                                                    fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 21
                                                }, this)),
                                            collections.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-neutral-600",
                                                children: [
                                                    "+",
                                                    collections.length - 6
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                lineNumber: 263,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 253,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                lineNumber: 249,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 216,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 209,
                columnNumber: 9
            }, this),
            activeWorkers.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl p-4 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-neutral-500 uppercase tracking-widest font-semibold",
                        children: [
                            "Active Workers (",
                            activeWorkers.size,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 276,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1.5",
                        children: Array.from(activeWorkers.values()).slice(0, 5).map((worker)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 287,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-400",
                                        children: worker.worker
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 288,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-600 font-mono text-[10px] ml-auto",
                                        children: formatDuration(Date.now() - worker.startedAt)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 289,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, worker.jobId, true, {
                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                lineNumber: 283,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 279,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 275,
                columnNumber: 9
            }, this),
            !selectedRegionId && activeRegions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl p-4 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-neutral-500 uppercase tracking-widest font-semibold",
                        children: "Active Regions"
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1.5",
                        children: activeRegions.map((param)=>{
                            let [regionId, activity] = param;
                            const region = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAIN_MODEL_REGISTRY"].find((r)=>r.id === regionId);
                            if (!region) return null;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>selectRegion(regionId),
                                className: "w-full flex items-center gap-2 text-xs hover:bg-white/[0.02] rounded px-1 py-0.5 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full",
                                        style: {
                                            backgroundColor: region.color,
                                            boxShadow: "0 0 4px ".concat(region.color, "60")
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 315,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-neutral-300",
                                        children: region.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 322,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-auto flex items-center gap-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-12 h-1 bg-white/[0.06] rounded-full overflow-hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full transition-all duration-300",
                                                style: {
                                                    width: "".concat(activity.intensity * 100, "%"),
                                                    backgroundColor: region.color
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                lineNumber: 325,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                            lineNumber: 324,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 323,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, regionId, true, {
                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                lineNumber: 310,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 303,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl flex-1 min-h-0 overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 border-b border-white/[0.04] shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-neutral-500 uppercase tracking-widest font-semibold",
                            children: [
                                "Event Stream",
                                selectedRegionId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-indigo-400 ml-1",
                                    children: "(filtered)"
                                }, void 0, false, {
                                    fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                    lineNumber: 346,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/live/LiveProcessPanel.tsx",
                            lineNumber: 343,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto p-2 space-y-1",
                        style: {
                            scrollbarWidth: "thin"
                        },
                        children: filteredEvents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 text-neutral-600 text-xs",
                            children: "Waiting for events..."
                        }, void 0, false, {
                            fileName: "[project]/components/live/LiveProcessPanel.tsx",
                            lineNumber: 355,
                            columnNumber: 13
                        }, this) : filteredEvents.map((envelope)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-2 px-2 py-1 rounded hover:bg-white/[0.02] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventIcon, {
                                        type: envelope.event.type
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 364,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-[11px] text-neutral-300 truncate",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EventSummary, {
                                                event: envelope.event
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                                lineNumber: 367,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                            lineNumber: 366,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 365,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-neutral-600 font-mono shrink-0",
                                        children: formatTimestamp(envelope.received_at)
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                        lineNumber: 370,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, envelope.id, true, {
                                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                                lineNumber: 360,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveProcessPanel.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveProcessPanel.tsx",
                lineNumber: 341,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/LiveProcessPanel.tsx",
        lineNumber: 201,
        columnNumber: 5
    }, this);
}
_s(LiveProcessPanel, "0gCgV+671BlYeBJBqt4o5wrtNFs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c2 = LiveProcessPanel;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "EventIcon");
__turbopack_context__.k.register(_c1, "EventSummary");
__turbopack_context__.k.register(_c2, "LiveProcessPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/LiveMetricsBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveMetricsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MiniBarChart(param) {
    let { values, max, color, label } = param;
    const normalizedValues = values.map((v)=>Math.min(v / max, 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] text-neutral-600 uppercase tracking-wider",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-px h-6",
                children: normalizedValues.map((v, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-1 rounded-t transition-all duration-200",
                        style: {
                            height: "".concat(Math.max(v * 100, 4), "%"),
                            backgroundColor: v > 0.7 ? "#ef4444" : color,
                            opacity: 0.3 + v * 0.7
                        }
                    }, i, false, {
                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/LiveMetricsBar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = MiniBarChart;
function GaugeIndicator(param) {
    let { value, max, label, color, unit = "" } = param;
    const percentage = Math.min(value / max * 100, 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] text-neutral-600 uppercase tracking-wider",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "h-full rounded-full",
                            style: {
                                backgroundColor: color
                            },
                            initial: {
                                width: 0
                            },
                            animate: {
                                width: "".concat(percentage, "%")
                            },
                            transition: {
                                duration: 0.3
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/live/LiveMetricsBar.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] font-mono",
                        style: {
                            color
                        },
                        children: [
                            value.toFixed(0),
                            unit
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/LiveMetricsBar.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c1 = GaugeIndicator;
function LiveMetricsBar() {
    _s();
    const { queueStatus, systemVitals, emotionalState, connected, recentEvents } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const queueDepths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveMetricsBar.useMemo[queueDepths]": ()=>{
            const depths = [];
            for (const status of queueStatus.values()){
                depths.push(status.pending + status.active);
            }
            while(depths.length < 10)depths.push(0);
            return depths.slice(-10);
        }
    }["LiveMetricsBar.useMemo[queueDepths]"], [
        queueStatus
    ]);
    const totalQueueItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveMetricsBar.useMemo[totalQueueItems]": ()=>{
            let total = 0;
            for (const status of queueStatus.values()){
                total += status.pending + status.active;
            }
            return total;
        }
    }["LiveMetricsBar.useMemo[totalQueueItems]"], [
        queueStatus
    ]);
    const recentEventCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveMetricsBar.useMemo[recentEventCounts]": ()=>{
            const now = Date.now();
            const buckets = Array(10).fill(0);
            const bucketSize = 1000;
            for (const event of recentEvents.slice(-100)){
                const age = now - new Date(event.received_at).getTime();
                const bucket = Math.floor(age / bucketSize);
                if (bucket >= 0 && bucket < 10) {
                    buckets[9 - bucket]++;
                }
            }
            return buckets;
        }
    }["LiveMetricsBar.useMemo[recentEventCounts]"], [
        recentEvents
    ]);
    var _emotionalState_valence;
    const valence = (_emotionalState_valence = emotionalState === null || emotionalState === void 0 ? void 0 : emotionalState.valence) !== null && _emotionalState_valence !== void 0 ? _emotionalState_valence : 0;
    var _emotionalState_arousal;
    const arousal = (_emotionalState_arousal = emotionalState === null || emotionalState === void 0 ? void 0 : emotionalState.arousal) !== null && _emotionalState_arousal !== void 0 ? _emotionalState_arousal : 0.5;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.4,
            duration: 0.4
        },
        className: "absolute bottom-4 left-4 right-4 z-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-2xl px-4 py-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full transition-all duration-300",
                                style: {
                                    backgroundColor: connected ? "#22c55e" : "#ef4444",
                                    boxShadow: connected ? "0 0 6px #22c55e60" : "0 0 6px #ef444460"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-neutral-500 uppercase tracking-wider",
                                children: connected ? "Connected" : "Disconnected"
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniBarChart, {
                                values: recentEventCounts,
                                max: 20,
                                color: "#6366f1",
                                label: "Events"
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MiniBarChart, {
                                values: queueDepths,
                                max: 50,
                                color: "#06b6d4",
                                label: "Queues"
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px h-8 bg-white/[0.06]"
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this),
                            systemVitals && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GaugeIndicator, {
                                        value: systemVitals.cpu_percent,
                                        max: 100,
                                        label: "CPU",
                                        color: systemVitals.cpu_percent > 80 ? "#ef4444" : "#22c55e",
                                        unit: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 163,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GaugeIndicator, {
                                        value: systemVitals.memory_percent,
                                        max: 100,
                                        label: "Memory",
                                        color: systemVitals.memory_percent > 80 ? "#ef4444" : "#06b6d4",
                                        unit: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 172,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px h-8 bg-white/[0.06]"
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-neutral-600 uppercase tracking-wider",
                                        children: "Valence"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 187,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 flex",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-1/2 bg-gradient-to-r from-red-500/20 to-transparent"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                                lineNumber: 193,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                                lineNumber: 194,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                        lineNumber: 192,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "absolute top-0 bottom-0 w-1 rounded-full bg-white",
                                                        style: {
                                                            left: "".concat((valence + 1) * 50, "%")
                                                        },
                                                        animate: {
                                                            left: "".concat((valence + 1) * 50, "%")
                                                        },
                                                        transition: {
                                                            duration: 0.3
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-mono",
                                                style: {
                                                    color: valence > 0.3 ? "#22c55e" : valence < -0.3 ? "#ef4444" : "#f59e0b"
                                                },
                                                children: [
                                                    valence > 0 ? "+" : "",
                                                    valence.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-neutral-600 uppercase tracking-wider",
                                        children: "Arousal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "h-full rounded-full bg-purple-500",
                                                    animate: {
                                                        width: "".concat(arousal * 100, "%")
                                                    },
                                                    transition: {
                                                        duration: 0.3
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                lineNumber: 225,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-mono text-purple-400",
                                                children: [
                                                    (arousal * 100).toFixed(0),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 224,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-px h-8 bg-white/[0.06]"
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-neutral-600 uppercase tracking-wider",
                                        children: "Queue Total"
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 241,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-mono text-cyan-400",
                                        children: totalQueueItems
                                    }, void 0, false, {
                                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveMetricsBar.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveMetricsBar.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/live/LiveMetricsBar.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/LiveMetricsBar.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
_s(LiveMetricsBar, "v49zL1sahRgVzoR4ih1V+kI9mRg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c2 = LiveMetricsBar;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MiniBarChart");
__turbopack_context__.k.register(_c1, "GaugeIndicator");
__turbopack_context__.k.register(_c2, "LiveMetricsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/useEventStream.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEventStream",
    ()=>useEventStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useEventStream() {
    _s();
    const { setConnected, processEvent, processHistory, setEventsPerSecond } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const eventSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const eventCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastCountTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(Date.now());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEventStream.useEffect": ()=>{
            let mounted = true;
            function connect() {
                if (!mounted) return;
                if (eventSourceRef.current) {
                    eventSourceRef.current.close();
                }
                const eventSource = new EventSource("/api/brain-events/stream");
                eventSourceRef.current = eventSource;
                eventSource.onopen = ({
                    "useEventStream.useEffect.connect": ()=>{
                        if (!mounted) return;
                        setConnected(true);
                        console.log("[live] Connected to event stream");
                    }
                })["useEventStream.useEffect.connect"];
                eventSource.onmessage = ({
                    "useEventStream.useEffect.connect": (event)=>{
                        if (!mounted) return;
                        try {
                            const message = JSON.parse(event.data);
                            if (message.type === "history") {
                                processHistory(message.data);
                            } else if (message.type === "brain_event") {
                                processEvent(message.data);
                                eventCountRef.current++;
                            }
                        } catch (err) {
                            console.error("[live] Failed to parse event:", err);
                        }
                    }
                })["useEventStream.useEffect.connect"];
                eventSource.onerror = ({
                    "useEventStream.useEffect.connect": ()=>{
                        if (!mounted) return;
                        setConnected(false, "Connection lost");
                        eventSource.close();
                        reconnectTimeoutRef.current = setTimeout({
                            "useEventStream.useEffect.connect": ()=>{
                                if (mounted) {
                                    console.log("[live] Reconnecting...");
                                    connect();
                                }
                            }
                        }["useEventStream.useEffect.connect"], 3000);
                    }
                })["useEventStream.useEffect.connect"];
            }
            connect();
            const rateInterval = setInterval({
                "useEventStream.useEffect.rateInterval": ()=>{
                    const now = Date.now();
                    const elapsed = (now - lastCountTimeRef.current) / 1000;
                    if (elapsed > 0) {
                        setEventsPerSecond(eventCountRef.current / elapsed);
                        eventCountRef.current = 0;
                        lastCountTimeRef.current = now;
                    }
                }
            }["useEventStream.useEffect.rateInterval"], 1000);
            return ({
                "useEventStream.useEffect": ()=>{
                    mounted = false;
                    if (eventSourceRef.current) {
                        eventSourceRef.current.close();
                    }
                    if (reconnectTimeoutRef.current) {
                        clearTimeout(reconnectTimeoutRef.current);
                    }
                    clearInterval(rateInterval);
                }
            })["useEventStream.useEffect"];
        }
    }["useEventStream.useEffect"], [
        setConnected,
        processEvent,
        processHistory,
        setEventsPerSecond
    ]);
}
_s(useEventStream, "dqxVDsVRy/PhExmxzvInZB7lO3Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/LiveBrainMonitor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LiveBrainMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Stars.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/live-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/brain-model-loader.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralBrain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/NeuralBrain3DViewer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralParticles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/NeuralParticles.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/NeuralEffects.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$LiveTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/LiveTopBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$LiveProcessPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/LiveProcessPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$LiveMetricsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/LiveMetricsBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$useEventStream$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/live/useEventStream.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
;
;
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
function LayerControls(param) {
    let { activeLayers, onToggle, onShowAll } = param;
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
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 48,
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
                                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this),
                            label
                        ]
                    }, key, true, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-px bg-white/[0.04] my-1"
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onShowAll,
                    className: "text-[10px] text-neutral-500 hover:text-neutral-300 px-2 py-1 transition-colors",
                    children: "Show All"
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/live/LiveBrainMonitor.tsx",
            lineNumber: 47,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = LayerControls;
function ConnectionHint() {
    _s();
    const { connected, connectionError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    if (connected) return null;
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
        className: "absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "backdrop-blur-xl bg-black/30 border border-white/[0.04] rounded-2xl px-5 py-3 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-neutral-400",
                    children: connectionError ? "Connection error: ".concat(connectionError) : "Connecting to brain event stream..."
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[10px] text-neutral-600 mt-0.5",
                    children: "Waiting for Molly to come online"
                }, void 0, false, {
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/live/LiveBrainMonitor.tsx",
            lineNumber: 98,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(ConnectionHint, "7M/dF6KszJav94oMEviDdsPu8dg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"]
    ];
});
_c1 = ConnectionHint;
function LiveBrainMonitor() {
    _s1();
    const { selectRegion, decayActivity } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"])();
    const [activeLayers, setActiveLayers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set([
        "hemispheres",
        "cerebellum",
        "brainstem",
        "limbic",
        "basalGanglia",
        "deepStructures"
    ]));
    const [panelOpen, setPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$useEventStream$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventStream"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LiveBrainMonitor.useEffect": ()=>{
            const interval = setInterval({
                "LiveBrainMonitor.useEffect.interval": ()=>{
                    decayActivity();
                }
            }["LiveBrainMonitor.useEffect.interval"], 50);
            return ({
                "LiveBrainMonitor.useEffect": ()=>clearInterval(interval)
            })["LiveBrainMonitor.useEffect"];
        }
    }["LiveBrainMonitor.useEffect"], [
        decayActivity
    ]);
    const visibleIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LiveBrainMonitor.useMemo[visibleIds]": ()=>{
            const ids = new Set();
            for (const key of activeLayers){
                for (const id of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYER_GROUPS"][key]){
                    ids.add(id);
                }
            }
            return ids;
        }
    }["LiveBrainMonitor.useMemo[visibleIds]"], [
        activeLayers
    ]);
    const toggleLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveBrainMonitor.useCallback[toggleLayer]": (key)=>{
            setActiveLayers({
                "LiveBrainMonitor.useCallback[toggleLayer]": (prev)=>{
                    const next = new Set(prev);
                    if (next.has(key)) next.delete(key);
                    else next.add(key);
                    return next;
                }
            }["LiveBrainMonitor.useCallback[toggleLayer]"]);
        }
    }["LiveBrainMonitor.useCallback[toggleLayer]"], []);
    const showAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LiveBrainMonitor.useCallback[showAll]": ()=>{
            setActiveLayers(new Set(Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$brain$2d$model$2d$loader$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LAYER_GROUPS"])));
        }
    }["LiveBrainMonitor.useCallback[showAll]"], []);
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
                onPointerMissed: ()=>selectRegion(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                        attach: "background",
                        args: [
                            "#030308"
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                        attach: "fog",
                        args: [
                            "#030308",
                            35,
                            70
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                        intensity: 0.15
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            15,
                            20,
                            10
                        ],
                        intensity: 0.3,
                        color: "#0088aa"
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                        position: [
                            -12,
                            8,
                            -15
                        ],
                        intensity: 0.2,
                        color: "#004466"
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            0,
                            12,
                            10
                        ],
                        intensity: 0.5,
                        color: "#00ffff",
                        distance: 40
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            0,
                            5,
                            -8
                        ],
                        intensity: 0.3,
                        color: "#0088ff",
                        distance: 25
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                        position: [
                            8,
                            8,
                            0
                        ],
                        intensity: 0.15,
                        color: "#ff6600",
                        distance: 20
                    }, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                        fallback: null,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralBrain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NeuralBrainViewProvider"], {
                                visibleIds: visibleIds,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralBrain3DViewer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralParticles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Stars$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stars"], {
                                radius: 120,
                                depth: 100,
                                count: 600,
                                factor: 2.5,
                                saturation: 0.1,
                                fade: true,
                                speed: 0.1
                            }, void 0, false, {
                                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$NeuralEffects$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 219,
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
                        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$LiveTopBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                panelOpen: panelOpen,
                onTogglePanel: ()=>setPanelOpen((v)=>!v)
            }, void 0, false, {
                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LayerControls, {
                activeLayers: activeLayers,
                onToggle: toggleLayer,
                onShowAll: showAll
            }, void 0, false, {
                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConnectionHint, {}, void 0, false, {
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: panelOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$LiveProcessPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                    lineNumber: 245,
                    columnNumber: 23
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$LiveMetricsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/live/LiveBrainMonitor.tsx",
                lineNumber: 248,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/live/LiveBrainMonitor.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s1(LiveBrainMonitor, "dmnoNRPKU916jc5GXmnq6nYqlkQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$live$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLiveStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$live$2f$useEventStream$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEventStream"]
    ];
});
_c2 = LiveBrainMonitor;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LayerControls");
__turbopack_context__.k.register(_c1, "ConnectionHint");
__turbopack_context__.k.register(_c2, "LiveBrainMonitor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/live/LiveBrainMonitor.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/live/LiveBrainMonitor.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_ffbf5b7f._.js.map