"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { LAYER_GROUPS } from "@/lib/brain-model-loader";
import { NeuralBrainViewProvider } from "./NeuralBrain3DViewer";
import NeuralBrain3DViewer from "./NeuralBrain3DViewer";
import NeuralEffects from "./NeuralEffects";
import LiveTopBar from "./LiveTopBar";
import LiveProcessPanel from "./LiveProcessPanel";
import LiveMetricsBar from "./LiveMetricsBar";
import { useEventStream } from "./useEventStream";

const spinSpeedRef = { current: 0.08 };
export const renderOptionsRef = { showShader: true, showWireframe: false };

function RotatingBrain() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * spinSpeedRef.current;
    }
  });
  
  return (
    <group ref={groupRef}>
      <NeuralBrain3DViewer />
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

function LayerControls({
  activeLayers,
  onToggle,
  onShowAll,
}: {
  activeLayers: Set<LayerKey>;
  onToggle: (k: LayerKey) => void;
  onShowAll: () => void;
}) {
  const [spinSpeed, setSpinSpeed] = useState(0.08);
  const [showShader, setShowShader] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="absolute top-20 left-4 z-20 flex flex-col gap-1.5"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/6 rounded-xl p-2 flex flex-col gap-1">
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold px-1 mb-0.5">
          Layers
        </span>
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
        <div className="h-px bg-white/4 my-1" />
        <button
          onClick={onShowAll}
          className="text-[10px] text-neutral-500 hover:text-neutral-300 px-2 py-1 transition-colors"
        >
          Show All
        </button>
        <div className="h-px bg-white/4 my-1" />
        <div className="px-1 flex flex-col gap-1">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
            Spin
          </span>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={spinSpeed}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setSpinSpeed(v);
              spinSpeedRef.current = v;
            }}
            className="w-full h-1 appearance-none bg-neutral-700 rounded-full cursor-pointer accent-cyan-500"
          />
        </div>
        <div className="h-px bg-white/4 my-1" />
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold px-1 mb-0.5">
          Render
        </span>
        <button
          onClick={() => {
            const next = !showShader;
            setShowShader(next);
            renderOptionsRef.showShader = next;
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{
            background: showShader ? "#6366f115" : "transparent",
            color: showShader ? "#818cf8" : "#525252",
          }}
        >
          <span
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor: showShader ? "#818cf8" : "#333",
              boxShadow: showShader ? "0 0 6px #818cf860" : "none",
            }}
          />
          Shader
        </button>
        <button
          onClick={() => {
            const next = !showWireframe;
            setShowWireframe(next);
            renderOptionsRef.showWireframe = next;
          }}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{
            background: showWireframe ? "#22d3ee15" : "transparent",
            color: showWireframe ? "#22d3ee" : "#525252",
          }}
        >
          <span
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor: showWireframe ? "#22d3ee" : "#333",
              boxShadow: showWireframe ? "0 0 6px #22d3ee60" : "none",
            }}
          />
          Wireframe
        </button>
      </div>
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
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
    >
      <div className="backdrop-blur-xl bg-black/30 border border-white/[0.04] rounded-2xl px-5 py-3 text-center">
        <p className="text-xs text-neutral-400">
          {connectionError
            ? `Connection error: ${connectionError}`
            : "Connecting to brain event stream..."}
        </p>
        <p className="text-[10px] text-neutral-600 mt-0.5">
          Waiting for Molly to come online
        </p>
      </div>
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
    ])
  );
  const [panelOpen, setPanelOpen] = useState(true);

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
    <div className="h-screen w-screen overflow-hidden bg-[#060609] relative">
      <Canvas
        camera={{ position: [0, 10, 30], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="!absolute inset-0"
        onPointerMissed={() => selectRegion(null)}
      >
        <color attach="background" args={["#020206"]} />
        <fog attach="fog" args={["#020206", 40, 80]} />
        {/* Very minimal lighting - the shader provides its own glow */}
        <ambientLight intensity={0.08} />

        <Suspense fallback={null}>
          <NeuralBrainViewProvider visibleIds={visibleIds}>
            <RotatingBrain />
          </NeuralBrainViewProvider>
          <Stars
            radius={120}
            depth={100}
            count={600}
            factor={2.5}
            saturation={0.1}
            fade
            speed={0.1}
          />
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

      <LiveTopBar panelOpen={panelOpen} onTogglePanel={() => setPanelOpen((v) => !v)} />
      <LayerControls
        activeLayers={activeLayers}
        onToggle={toggleLayer}
        onShowAll={showAll}
      />

      <AnimatePresence>
        <ConnectionHint />
      </AnimatePresence>

      <AnimatePresence>
        {panelOpen && <LiveProcessPanel />}
      </AnimatePresence>

      <LiveMetricsBar />
    </div>
  );
}
