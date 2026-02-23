"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useCallback, useState, useMemo, useEffect } from "react";
import HumanBody from "./HumanBody";
import { BrainViewProvider } from "./Brain3DViewer";
import { useExplorerStore } from "@/lib/store";
import { findNodeById } from "@/data/mappings";
import { CATEGORY_COLORS } from "@/lib/constants";
import { LAYER_GROUPS } from "@/lib/brain-model-loader";
import Tooltip from "@/components/shared/Tooltip";

type LayerKey = keyof typeof LAYER_GROUPS;

const LAYER_TOGGLE_CONFIG: { key: LayerKey; label: string; color: string }[] = [
  { key: "hemispheres", label: "Hemispheres", color: "#6366f1" },
  { key: "cerebellum", label: "Cerebellum", color: "#8b5cf6" },
  { key: "brainstem", label: "Brainstem", color: "#ec4899" },
  { key: "limbic", label: "Limbic", color: "#f97316" },
  { key: "deepStructures", label: "Deep", color: "#38bdf8" },
  { key: "basalGanglia", label: "Basal Ganglia", color: "#fb923c" },
  { key: "cranialNerves", label: "Cranial Nerves", color: "#22c55e" },
];

function findLayerForId(id: string): LayerKey | null {
  for (const [key, ids] of Object.entries(LAYER_GROUPS)) {
    if ((ids as string[]).includes(id)) return key as LayerKey;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Info card for selected structure
// ---------------------------------------------------------------------------
function SelectedInfo() {
  const { selectedBioNodeId } = useExplorerStore();

  if (!selectedBioNodeId) {
    return (
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="bg-[var(--color-surface)]/80 backdrop-blur rounded-lg px-4 py-3 text-xs text-[var(--color-text-muted)] max-w-xs">
          <p className="font-medium text-[var(--color-text)] mb-1">3D Brain Atlas</p>
          <p>Click a structure to select. Double-click to isolate it (dims everything else). Use layer toggles to show/hide systems.</p>
        </div>
      </div>
    );
  }

  const node = findNodeById(selectedBioNodeId);
  if (!node) return null;
  const color = CATEGORY_COLORS[node.category] ?? "#6366f1";

  return (
    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
      <div className="bg-[var(--color-surface)]/85 backdrop-blur-md rounded-lg px-4 py-3 max-w-sm border-l-2" style={{ borderLeftColor: color }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs font-semibold text-[var(--color-text)]">{node.name}</span>
          <span className="text-[10px] text-[var(--color-text-muted)] capitalize">{node.category}</span>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed mb-1.5">
          {node.description.length > 180 ? node.description.slice(0, 180) + "..." : node.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {node.functions.slice(0, 4).map((fn, i) => (
            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>{fn}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layer + visibility controls
// ---------------------------------------------------------------------------
function LayerPanel({
  activeLayers,
  onToggleLayer,
  isolatedId,
  onIsolate,
  onClearIsolate,
  onHideSelected,
  onShowAll,
  onReset,
}: {
  activeLayers: Set<LayerKey>;
  onToggleLayer: (key: LayerKey) => void;
  isolatedId: string | null;
  onIsolate: () => void;
  onClearIsolate: () => void;
  onHideSelected: () => void;
  onShowAll: () => void;
  onReset: () => void;
}) {
  const { selectedBioNodeId } = useExplorerStore();

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 select-none">
      {/* Layer toggles */}
      {LAYER_TOGGLE_CONFIG.map(({ key, label, color }) => {
        const active = activeLayers.has(key);
        return (
          <button
            key={key}
            onClick={() => onToggleLayer(key)}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-all backdrop-blur"
            style={{
              background: active ? `${color}20` : "rgba(10,10,10,0.7)",
              color: active ? color : "#525252",
              border: `1px solid ${active ? `${color}40` : "transparent"}`,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: active ? color : "#525252" }} />
            {label}
          </button>
        );
      })}

      {/* Divider */}
      <div className="h-px bg-[var(--color-border)] my-1" />

      {/* Action buttons */}
      <button
        onClick={onShowAll}
        className="px-3 py-1.5 rounded text-xs backdrop-blur text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        style={{ background: "rgba(10,10,10,0.7)" }}
      >
        Show All
      </button>
      <button
        onClick={onReset}
        className="px-3 py-1.5 rounded text-xs backdrop-blur text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        style={{ background: "rgba(10,10,10,0.7)" }}
      >
        Reset View
      </button>

      {/* Selection actions — only show when something is selected */}
      {selectedBioNodeId && (
        <>
          <div className="h-px bg-[var(--color-border)] my-1" />
          {isolatedId ? (
            <button
              onClick={onClearIsolate}
              className="px-3 py-1.5 rounded text-xs backdrop-blur transition-colors border"
              style={{
                background: "rgba(99,102,241,0.15)",
                color: "#818cf8",
                borderColor: "rgba(99,102,241,0.3)",
              }}
            >
              Exit Isolate
            </button>
          ) : (
            <>
              <button
                onClick={onIsolate}
                className="px-3 py-1.5 rounded text-xs backdrop-blur text-[var(--color-accent-blue)] hover:text-white transition-colors border border-[var(--color-accent-blue)]/30 hover:bg-[var(--color-accent-blue)]/20"
                style={{ background: "rgba(10,10,10,0.7)" }}
              >
                Isolate Selected
              </button>
              <button
                onClick={onHideSelected}
                className="px-3 py-1.5 rounded text-xs backdrop-blur text-[var(--color-accent-red)] hover:text-white transition-colors border border-[var(--color-accent-red)]/30 hover:bg-[var(--color-accent-red)]/20"
                style={{ background: "rgba(10,10,10,0.7)" }}
              >
                Hide Selected
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main canvas
// ---------------------------------------------------------------------------
export default function BodyCanvas() {
  const { selectedBioNodeId, selectBioNode } = useExplorerStore();
  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(
    new Set<LayerKey>(["hemispheres", "cerebellum", "brainstem", "deepStructures"])
  );
  const [isolatedId, setIsolatedId] = useState<string | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  // Build the set of visible model IDs from active layers minus individually hidden
  const visibleIds = useMemo(() => {
    const ids = new Set<string>();
    for (const key of activeLayers) {
      for (const id of LAYER_GROUPS[key]) {
        if (!hiddenIds.has(id)) ids.add(id);
      }
    }
    return ids;
  }, [activeLayers, hiddenIds]);

  // When a structure is selected, auto-enable its layer if hidden
  useEffect(() => {
    if (!selectedBioNodeId) return;
    const layer = findLayerForId(selectedBioNodeId);
    if (layer && !activeLayers.has(layer)) {
      setActiveLayers((prev) => new Set([...prev, layer]));
    }
  }, [selectedBioNodeId, activeLayers]);

  // Clear isolation when selection changes
  useEffect(() => {
    if (!selectedBioNodeId) setIsolatedId(null);
  }, [selectedBioNodeId]);

  const toggleLayer = useCallback((key: LayerKey) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
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

  const isolate = useCallback(() => {
    if (selectedBioNodeId) setIsolatedId(selectedBioNodeId);
  }, [selectedBioNodeId]);

  const clearIsolate = useCallback(() => setIsolatedId(null), []);

  const hideSelected = useCallback(() => {
    if (!selectedBioNodeId) return;
    setHiddenIds((prev) => new Set([...prev, selectedBioNodeId]));
    setIsolatedId(null);
  }, [selectedBioNodeId]);

  return (
    <div className="relative h-full w-full bg-[var(--color-bg)]">
      <Canvas
        camera={{ position: [0, 10, 30], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onPointerMissed={() => {
          selectBioNode(null);
          setIsolatedId(null);
        }}
      >
        <color attach="background" args={["#060609"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={0.7} color="#e0e7ff" />
        <directionalLight position={[-8, 5, -10]} intensity={0.3} color="#c7d2fe" />
        <pointLight position={[0, 8, 8]} intensity={0.4} color="#818cf8" distance={30} />
        <pointLight position={[0, 5, -5]} intensity={0.2} color="#ec4899" distance={20} />

        <Suspense fallback={null}>
          <BrainViewProvider visibleIds={visibleIds} isolatedId={isolatedId}>
            <HumanBody />
          </BrainViewProvider>
          <Stars radius={80} depth={100} count={1200} factor={3} saturation={0.1} fade speed={0.2} />
        </Suspense>

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={10}
          maxDistance={60}
          enablePan
          target={[0, 7, 0]}
        />
      </Canvas>

      <LayerPanel
        activeLayers={activeLayers}
        onToggleLayer={toggleLayer}
        isolatedId={isolatedId}
        onIsolate={isolate}
        onClearIsolate={clearIsolate}
        onHideSelected={hideSelected}
        onShowAll={showAll}
        onReset={reset}
      />
      <Tooltip />
      <SelectedInfo />
    </div>
  );
}
