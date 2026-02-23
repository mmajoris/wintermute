"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrainViewProvider } from "@/components/body/Brain3DViewer";
import HumanBody from "@/components/body/HumanBody";
import { useExplorerStore } from "@/lib/store";
import { findNodeById } from "@/data/mappings";
import { LAYER_GROUPS } from "@/lib/brain-model-loader";
import { CATEGORY_COLORS } from "@/lib/constants";
import { computationalModules } from "@/data/schema/modules";
import SearchOverlay from "@/components/shared/SearchOverlay";

type LayerKey = keyof typeof LAYER_GROUPS;

function findLayerForId(id: string): LayerKey | null {
  for (const [key, ids] of Object.entries(LAYER_GROUPS)) {
    if ((ids as string[]).includes(id)) return key as LayerKey;
  }
  return null;
}

const BIO_TO_MODULE: Record<string, string> = {
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
  "ventricles": "body-state-monitor",
};

const LAYER_TOGGLE_CONFIG: { key: LayerKey; label: string; color: string }[] = [
  { key: "hemispheres", label: "Cortex", color: "#6366f1" },
  { key: "cerebellum", label: "Cerebellum", color: "#8b5cf6" },
  { key: "brainstem", label: "Brainstem", color: "#ec4899" },
  { key: "limbic", label: "Limbic", color: "#f97316" },
  { key: "deepStructures", label: "Deep", color: "#38bdf8" },
  { key: "basalGanglia", label: "Basal Ganglia", color: "#fb923c" },
  { key: "cranialNerves", label: "Nerves", color: "#22c55e" },
];

// ---------------------------------------------------------------------------
// LAYER CONTROLS — floating left
// ---------------------------------------------------------------------------
function LayerControls({
  activeLayers,
  onToggle,
  onShowAll,
  onReset,
}: {
  activeLayers: Set<LayerKey>;
  onToggle: (k: LayerKey) => void;
  onShowAll: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="absolute top-20 left-4 z-20 flex flex-col gap-1.5"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-xl p-2 flex flex-col gap-1">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold px-1 mb-0.5">Layers</span>
        {LAYER_TOGGLE_CONFIG.map(({ key, label, color }) => {
          const active = activeLayers.has(key);
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
              style={{
                background: active ? `${color}15` : "transparent",
                color: active ? color : "#525252",
              }}
            >
              <span
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: active ? color : "#333",
                  boxShadow: active ? `0 0 6px ${color}60` : "none",
                }}
              />
              {label}
            </button>
          );
        })}
        <div className="h-px bg-white/[0.04] my-1" />
        <button onClick={onShowAll} className="text-[10px] text-neutral-500 hover:text-neutral-300 px-2 py-1 transition-colors">Show All</button>
        <button onClick={onReset} className="text-[10px] text-neutral-500 hover:text-neutral-300 px-2 py-1 transition-colors">Reset</button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// SELECTION ACTIONS — floating left, below layers, appears when selected
// ---------------------------------------------------------------------------
function SelectionActions({
  onIsolate,
  onHide,
  isolatedId,
  onClearIsolate,
}: {
  onIsolate: () => void;
  onHide: () => void;
  isolatedId: string | null;
  onClearIsolate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-24 left-4 z-20"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-xl p-2 flex flex-col gap-1">
        {isolatedId ? (
          <button onClick={onClearIsolate} className="px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all">
            Exit Isolate
          </button>
        ) : (
          <>
            <button onClick={onIsolate} className="px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-400 hover:bg-indigo-500/10 transition-all">
              Isolate
            </button>
            <button onClick={onHide} className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all">
              Hide
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// TOP BAR — floating, minimal
// ---------------------------------------------------------------------------
function TopBar({
  architectureOpen,
  onToggleArchitecture,
}: {
  architectureOpen: boolean;
  onToggleArchitecture: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-2xl px-1.5 py-1.5 flex items-center gap-1">
        <div className="px-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" style={{ boxShadow: "0 0 8px #6366f180" }} />
          <span className="text-xs font-semibold text-neutral-300 tracking-wide">WINTERMUTE</span>
        </div>
        <div className="w-px h-5 bg-white/[0.06]" />
        <button
          onClick={onToggleArchitecture}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
            architectureOpen
              ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
              : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04]"
          }`}
        >
          Architecture
        </button>
        <SearchTrigger />
      </div>
    </motion.div>
  );
}

function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-xl text-xs text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04] transition-all flex items-center gap-2"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="text-[9px] px-1 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-600">⌘K</kbd>
      </button>
      {open && <SearchOverlay />}
    </>
  );
}

// ---------------------------------------------------------------------------
// RIGHT DRAWER — detail panel for selected structure
// ---------------------------------------------------------------------------
function RightDrawer() {
  const { selectedBioNodeId } = useExplorerStore();
  const node = selectedBioNodeId ? findNodeById(selectedBioNodeId) : null;

  if (!node) return null;

  const color = CATEGORY_COLORS[node.category] ?? "#6366f1";
  const moduleId = BIO_TO_MODULE[selectedBioNodeId!];
  const compModule = moduleId ? computationalModules.find((m) => m.id === moduleId) : null;
  const moduleColor = compModule ? (CATEGORY_COLORS[compModule.category] ?? "#6366f1") : color;

  return (
    <motion.div
      key={selectedBioNodeId}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-20 right-4 bottom-4 z-20 w-[340px] max-w-[40vw] flex flex-col gap-3 overflow-y-auto pointer-events-none"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Bio card */}
      <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}00)` }} />
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }} />
            <span className="text-sm font-semibold text-white">{node.name}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">{node.category}</span>
          <p className="text-xs text-neutral-400 leading-relaxed mt-2">{node.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {node.functions.slice(0, 5).map((fn, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: `${color}30`, color, background: `${color}08` }}>
                {fn}
              </span>
            ))}
            {node.functions.length > 5 && (
              <span className="text-[10px] text-neutral-600">+{node.functions.length - 5}</span>
            )}
          </div>
        </div>
      </div>

      {/* Schema mapping card */}
      {node.schemaMapping && (
        <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, #6366f1, #6366f100)` }} />
          <div className="p-4">
            <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-semibold">Schema Mapping</span>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">Collection</span>
                <code className="text-xs text-cyan-400 font-mono">{node.schemaMapping.collection}</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500">Role</span>
                <span className="text-xs text-white">{node.schemaMapping.role}</span>
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Fields</span>
              {node.schemaMapping.fields.map((field, i) => (
                <div key={i} className="flex items-start gap-2 py-1 border-b border-white/[0.03] last:border-0">
                  <code className="text-[10px] font-mono text-emerald-400 shrink-0">{field.name}</code>
                  <code className="text-[10px] font-mono text-purple-400 shrink-0">{field.type}</code>
                  <span className="text-[10px] text-neutral-600 ml-auto text-right">{field.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Computational module card */}
      {compModule && (
        <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${moduleColor}, ${moduleColor}00)` }} />
          <div className="p-4">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">Computational Module</span>
            <div className="mt-2">
              <span className="text-sm font-semibold text-white">{compModule.name}</span>
              <p className="text-[10px] text-neutral-500 mt-0.5">{compModule.role}</p>
              <p className="text-xs text-neutral-400 leading-relaxed mt-2">{compModule.description}</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Inputs</span>
                <div className="mt-1 space-y-0.5">
                  {compModule.inputSources.map((src, i) => (
                    <div key={i} className="text-[10px] text-emerald-400/70 font-mono flex items-center gap-1">
                      <span className="text-emerald-500">←</span> {src}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Outputs</span>
                <div className="mt-1 space-y-0.5">
                  {compModule.outputTargets.map((tgt, i) => (
                    <div key={i} className="text-[10px] text-orange-400/70 font-mono flex items-center gap-1">
                      <span className="text-orange-500">→</span> {tgt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connections */}
      {node.connections.length > 0 && (
        <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl p-4">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">Neural Connections ({node.connections.length})</span>
          <div className="mt-2 space-y-1">
            {node.connections.slice(0, 8).map((conn, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px]">
                <span className={`w-1.5 h-1.5 rounded-full ${conn.type === "excitatory" ? "bg-emerald-500" : conn.type === "inhibitory" ? "bg-red-500" : "bg-blue-500"}`} />
                <span className="text-neutral-500">{conn.type}</span>
                <span className="text-neutral-400">→ {conn.targetId}</span>
                <span className="ml-auto text-neutral-600">{(conn.strength * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// BOTTOM SHEET — computational architecture
// ---------------------------------------------------------------------------
const LAYER_LABELS: Record<number, string> = { 7: "Consciousness", 6: "Executive", 5: "Integration", 4: "Modulation", 3: "Monitoring", 2: "Regulation", 1: "Survival" };
const LAYER_ORDER = [7, 6, 5, 4, 3, 2, 1];

function ArchitectureSheet({
  open,
  onClose,
  highlightedModuleId,
}: {
  open: boolean;
  onClose: () => void;
  highlightedModuleId: string | null;
}) {
  const { selectBioNode } = useExplorerStore();

  const handleModuleClick = (moduleId: string) => {
    const bioId = Object.entries(BIO_TO_MODULE).find(([, m]) => m === moduleId)?.[0];
    if (bioId) selectBioNode(bioId);
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: open ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
      className="absolute bottom-0 left-0 right-0 z-30 pointer-events-auto"
      style={{ height: "45vh", maxHeight: 420 }}
    >
      <div className="h-full backdrop-blur-2xl bg-black/60 border-t border-white/[0.06] rounded-t-3xl overflow-hidden flex flex-col">
        {/* Handle + header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.04] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-1 rounded-full bg-white/10" />
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-widest">Computational Architecture</span>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-300 transition-colors p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Architecture grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {LAYER_ORDER.map((layer) => {
            const mods = computationalModules.filter((m) => m.layer === layer);
            return (
              <div key={layer}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">{LAYER_LABELS[layer]}</span>
                  <span className="text-[9px] text-neutral-700">L{layer}</span>
                  <div className="flex-1 h-px bg-white/[0.03]" />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                  {mods.map((mod) => {
                    const color = CATEGORY_COLORS[mod.category] ?? "#6366f1";
                    const isHighlighted = highlightedModuleId === mod.id;
                    return (
                      <button
                        key={mod.id}
                        onClick={() => handleModuleClick(mod.id)}
                        className="text-left rounded-xl border p-3 transition-all duration-200 group"
                        style={{
                          background: isHighlighted ? `${color}12` : "rgba(255,255,255,0.02)",
                          borderColor: isHighlighted ? `${color}40` : "rgba(255,255,255,0.04)",
                          boxShadow: isHighlighted ? `0 0 20px ${color}15` : "none",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2 h-2 rounded-full shrink-0 transition-all duration-200"
                            style={{
                              backgroundColor: isHighlighted ? color : "#333",
                              boxShadow: isHighlighted ? `0 0 8px ${color}60` : "none",
                            }}
                          />
                          <span className={`text-xs font-semibold truncate transition-colors ${isHighlighted ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                            {mod.name}
                          </span>
                        </div>
                        <p className={`text-[10px] leading-snug transition-colors ${isHighlighted ? "text-neutral-400" : "text-neutral-600 group-hover:text-neutral-500"}`}>
                          {mod.role}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <span className="text-[9px] text-emerald-600">{mod.inputSources.length} in</span>
                          <span className="text-[9px] text-neutral-700">/</span>
                          <span className="text-[9px] text-orange-600">{mod.outputTargets.length} out</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// HINT OVERLAY — shows when nothing selected
// ---------------------------------------------------------------------------
function HintOverlay() {
  const { selectedBioNodeId } = useExplorerStore();
  if (selectedBioNodeId) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
    >
      <div className="backdrop-blur-xl bg-black/30 border border-white/[0.04] rounded-2xl px-5 py-3 text-center">
        <p className="text-xs text-neutral-400">Click any brain structure to explore</p>
        <p className="text-[10px] text-neutral-600 mt-0.5">Rotate: drag / Zoom: scroll / Search: ⌘K</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// MAIN ORCHESTRATOR
// ---------------------------------------------------------------------------
export default function BrainExplorer() {
  const { selectedBioNodeId, selectBioNode } = useExplorerStore();
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(
    new Set<LayerKey>(["hemispheres", "cerebellum", "brainstem", "deepStructures"])
  );
  const [isolatedId, setIsolatedId] = useState<string | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [architectureOpen, setArchitectureOpen] = useState(false);

  const visibleIds = useMemo(() => {
    const ids = new Set<string>();
    for (const key of activeLayers) {
      for (const id of LAYER_GROUPS[key]) {
        if (!hiddenIds.has(id)) ids.add(id);
      }
    }
    return ids;
  }, [activeLayers, hiddenIds]);

  const highlightedModuleId = selectedBioNodeId ? BIO_TO_MODULE[selectedBioNodeId] ?? null : null;

  useEffect(() => {
    if (!selectedBioNodeId) return;
    const layer = findLayerForId(selectedBioNodeId);
    if (layer && !activeLayers.has(layer)) {
      setActiveLayers((prev) => new Set([...prev, layer]));
    }
  }, [selectedBioNodeId, activeLayers]);

  useEffect(() => {
    if (!selectedBioNodeId) setIsolatedId(null);
  }, [selectedBioNodeId]);

  const toggleLayer = useCallback((key: LayerKey) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
    setIsolatedId(null);
  }, []);

  const showAll = useCallback(() => {
    setActiveLayers(new Set(Object.keys(LAYER_GROUPS) as LayerKey[]));
    setHiddenIds(new Set());
    setIsolatedId(null);
  }, []);

  const reset = useCallback(() => {
    setActiveLayers(new Set<LayerKey>(["hemispheres", "cerebellum", "brainstem", "deepStructures"]));
    setHiddenIds(new Set());
    setIsolatedId(null);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#060609] relative">
      {/* FULL-SCREEN 3D CANVAS */}
      <Canvas
        camera={{ position: [0, 10, 30], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="!absolute inset-0"
        onPointerMissed={() => {
          selectBioNode(null);
          setIsolatedId(null);
        }}
      >
        <color attach="background" args={["#060609"]} />
        <fog attach="fog" args={["#060609", 40, 80]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[10, 15, 10]} intensity={0.7} color="#e0e7ff" />
        <directionalLight position={[-8, 5, -10]} intensity={0.25} color="#c7d2fe" />
        <pointLight position={[0, 8, 8]} intensity={0.4} color="#818cf8" distance={30} />
        <pointLight position={[0, 5, -5]} intensity={0.15} color="#ec4899" distance={20} />

        <Suspense fallback={null}>
          <BrainViewProvider visibleIds={visibleIds} isolatedId={isolatedId}>
            <HumanBody />
          </BrainViewProvider>
          <Stars radius={100} depth={80} count={800} factor={2} saturation={0} fade speed={0.15} />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.06}
          minDistance={12}
          maxDistance={55}
          enablePan
          target={[0, 7, 0]}
          rotateSpeed={0.5}
        />
      </Canvas>

      {/* UI OVERLAYS */}
      <TopBar architectureOpen={architectureOpen} onToggleArchitecture={() => setArchitectureOpen((v) => !v)} />
      <LayerControls activeLayers={activeLayers} onToggle={toggleLayer} onShowAll={showAll} onReset={reset} />

      <AnimatePresence>
        {selectedBioNodeId && (
          <SelectionActions
            onIsolate={() => selectedBioNodeId && setIsolatedId(selectedBioNodeId)}
            onHide={() => {
              if (selectedBioNodeId) {
                setHiddenIds((prev) => new Set([...prev, selectedBioNodeId]));
                setIsolatedId(null);
              }
            }}
            isolatedId={isolatedId}
            onClearIsolate={() => setIsolatedId(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        <RightDrawer />
      </AnimatePresence>

      <AnimatePresence>
        <HintOverlay />
      </AnimatePresence>

      <ArchitectureSheet
        open={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
        highlightedModuleId={highlightedModuleId}
      />
    </div>
  );
}
