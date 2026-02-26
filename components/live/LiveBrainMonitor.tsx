"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { LAYER_GROUPS } from "@/lib/brain-model-loader";
import { NeuralBrainViewProvider } from "./NeuralBrain3DViewer";
import NeuralBrain3DViewer from "./NeuralBrain3DViewer";
import NeuralEffects from "./NeuralEffects";
import NeuralPathways from "./NeuralPathways";
import NeuralSparks from "./NeuralSparks";
import LiveTopBar from "./LiveTopBar";
import LiveProcessPanel from "./LiveProcessPanel";
import LiveLeftPanel from "./LiveLeftPanel";
import { BracketFrame } from "./BracketFrame";
import { HudThemeProvider } from "@/components/ui/hud-theme";
import { useEventStream } from "./useEventStream";

const spinSpeedRef = { current: 0.08 };
export const renderOptionsRef = { showShader: true, showWireframe: false };

function RotatingBrain({ children }: { children?: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * spinSpeedRef.current;
    }
  });
  
  return (
    <group ref={groupRef}>
      <NeuralBrain3DViewer />
      {children}
    </group>
  );
}

type LayerKey = keyof typeof LAYER_GROUPS;

const LAYER_TOGGLE_CONFIG: { key: LayerKey; label: string; color: string }[] = [
  { key: "hemispheres", label: "Cortex", color: "#6366f1" },
  { key: "cerebellum", label: "Cerebellum", color: "#8b5cf6" },
  { key: "brainstem", label: "Brainstem", color: "#ec4899" },
  { key: "limbic", label: "Limbic", color: "#f97316" },
  { key: "deepStructures", label: "Deep", color: "#38bdf8" },
  { key: "basalGanglia", label: "Basal Ganglia", color: "#fb923c" },
  { key: "cranialNerves", label: "Nerves", color: "#22c55e" },
];

function LayerToggles({
  activeLayers,
  onToggle,
  onShowAll,
}: {
  activeLayers: Set<LayerKey>;
  onToggle: (k: LayerKey) => void;
  onShowAll: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
    >
      <BracketFrame variant="asymmetric" className="px-3 py-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium"
            style={{ color: "rgba(0, 200, 220, 0.7)" }}>
            Brain Layers
          </span>
          <button onClick={onShowAll}
            className="ml-auto text-[9px] text-neutral-500 hover:text-neutral-300 transition-colors">
            Show All
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LAYER_TOGGLE_CONFIG.map(({ key, label, color }) => {
            const active = activeLayers.has(key);
            return (
              <button key={key} onClick={() => onToggle(key)}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium transition-all"
                style={{ background: active ? `${color}15` : "transparent", color: active ? color : "#525252" }}>
                <span className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: active ? color : "#333" }} />
                {label}
              </button>
            );
          })}
        </div>
      </BracketFrame>
    </motion.div>
  );
}

function ControlBar({ brightness, onBrightnessChange }: { brightness: number; onBrightnessChange: (v: number) => void }) {
  const [spinSpeed, setSpinSpeed] = useState(0.08);
  const [showShader, setShowShader] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="w-full"
    >
      <BracketFrame variant="combo-b" className="overflow-hidden">
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="text-[10px] uppercase tracking-[0.12em] font-medium"
            style={{ color: "rgba(0, 200, 220, 0.7)" }}>
            Controls
          </span>

          <div className="w-px h-3.5 bg-white/8" />

          <span className="text-[9px] text-neutral-500 uppercase">Spin</span>
          <input type="range" min="0" max="0.5" step="0.01" value={spinSpeed}
            onChange={(e) => { const v = parseFloat(e.target.value); setSpinSpeed(v); spinSpeedRef.current = v; }}
            className="w-20 h-0.5 appearance-none bg-neutral-700 rounded-full cursor-pointer accent-cyan-600"
          />

          <div className="w-px h-3.5 bg-white/8" />

          <span className="text-[9px] text-neutral-500 uppercase">UI</span>
          <input type="range" min="0.1" max="2.5" step="0.05" value={brightness}
            onChange={(e) => onBrightnessChange(parseFloat(e.target.value))}
            className="w-20 h-0.5 appearance-none bg-neutral-700 rounded-full cursor-pointer accent-cyan-600"
          />
          <span className="text-[9px] font-mono w-6" style={{ color: "rgba(0, 200, 220, 0.5)" }}>
            {brightness.toFixed(1)}
          </span>

          <div className="w-px h-3.5 bg-white/8" />

          <button onClick={() => { const n = !showShader; setShowShader(n); renderOptionsRef.showShader = n; }}
            className="text-[10px] px-2 py-0.5 rounded transition-colors"
            style={{
              color: showShader ? "rgba(0, 200, 220, 0.9)" : "rgba(255,255,255,0.2)",
              background: showShader ? "rgba(0, 200, 220, 0.08)" : "transparent",
            }}>
            Shader
          </button>
          <button onClick={() => { const n = !showWireframe; setShowWireframe(n); renderOptionsRef.showWireframe = n; }}
            className="text-[10px] px-2 py-0.5 rounded transition-colors"
            style={{
              color: showWireframe ? "rgba(0, 200, 220, 0.9)" : "rgba(255,255,255,0.2)",
              background: showWireframe ? "rgba(0, 200, 220, 0.08)" : "transparent",
            }}>
            Wire
          </button>
        </div>
      </BracketFrame>
    </motion.div>
  );
}

function ConnectionHint() {
  const { connected, connectionError } = useLiveStore();

  if (connected) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <BracketFrame variant="detail-2" className="px-5 py-3 text-center">
        <p className="text-xs text-neutral-400">
          {connectionError
            ? `Connection error: ${connectionError}`
            : "Connecting to brain event stream..."}
        </p>
        <p className="text-[10px] text-neutral-600 mt-0.5">
          Waiting for Molly to come online
        </p>
      </BracketFrame>
    </motion.div>
  );
}

export default function LiveBrainMonitor() {
  const { selectRegion, decayActivity } = useLiveStore();

  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(
    new Set<LayerKey>([
      "hemispheres",
      "cerebellum",
      "brainstem",
      "limbic",
      "basalGanglia",
      "deepStructures",
      "cranialNerves",
    ])
  );
  const [panelOpen, setPanelOpen] = useState(true);
  const [hudBrightness, setHudBrightness] = useState(1);

  useEventStream();

  useEffect(() => {
    const interval = setInterval(() => {
      decayActivity();
    }, 50);
    return () => clearInterval(interval);
  }, [decayActivity]);

  const visibleIds = useMemo(() => {
    const ids = new Set<string>();
    for (const key of activeLayers) {
      for (const id of LAYER_GROUPS[key]) {
        ids.add(id);
      }
    }
    return ids;
  }, [activeLayers]);

  const toggleLayer = useCallback((key: LayerKey) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const showAll = useCallback(() => {
    setActiveLayers(new Set(Object.keys(LAYER_GROUPS) as LayerKey[]));
  }, []);

  return (
    <HudThemeProvider brightness={hudBrightness}>
    <div
      className="h-screen w-screen overflow-hidden grid"
      style={{
        background: "#030406",
        gridTemplateColumns: "280px 1fr 320px",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* Row 1: Top bar */}
      <div className="col-span-3 w-full px-4 pt-4">
        <LiveTopBar panelOpen={panelOpen} onTogglePanel={() => setPanelOpen((v) => !v)} />
      </div>

      {/* Row 2: Left column */}
      <div className="overflow-y-auto min-h-0 flex flex-col gap-3 p-4">
        <LiveLeftPanel />
      </div>

      {/* Row 2: Center - Brain Canvas */}
      <div className="relative min-h-0 flex flex-col">
        <div className="flex-1 min-h-0">
          <Canvas
            camera={{ position: [0, 10, 38], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
            className="w-full h-full"
            onPointerMissed={() => selectRegion(null)}
          >
          <color attach="background" args={["#030406"]} />
          <fog attach="fog" args={["#030406", 40, 80]} />
            <ambientLight intensity={0.08} />

            <Suspense fallback={null}>
              <NeuralBrainViewProvider visibleIds={visibleIds}>
                <RotatingBrain>
                  <NeuralPathways visibleRegions={visibleIds} />
                  <NeuralSparks visibleRegions={visibleIds} />
                </RotatingBrain>
              </NeuralBrainViewProvider>
              <NeuralEffects />
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

          <AnimatePresence>
            <ConnectionHint />
          </AnimatePresence>
        </div>

        {/* Layer toggles below the canvas */}
        <div className="px-4 py-3">
          <LayerToggles
            activeLayers={activeLayers}
            onToggle={toggleLayer}
            onShowAll={showAll}
          />
        </div>
      </div>

      {/* Row 2: Right column */}
      <div className="overflow-y-auto min-h-0 flex flex-col gap-3 p-4">
        <AnimatePresence>{panelOpen && <LiveProcessPanel />}</AnimatePresence>
      </div>

      {/* Row 3: Bottom control bar */}
      <div className="col-span-3 px-4 pb-4">
        <ControlBar brightness={hudBrightness} onBrightnessChange={setHudBrightness} />
      </div>
    </div>
    </HudThemeProvider>
  );
}
