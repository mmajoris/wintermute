"use client";

import {
  useRef,
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Html } from "@react-three/drei";
import { useLiveStore } from "@/lib/live-store";
import {
  parseBrainModel,
  BRAIN_MODEL_REGISTRY,
  type BrainModelEntry,
} from "@/lib/brain-model-loader";
import { getCollectionsForRegion } from "@/lib/collection-mapping";
import { NEURAL_MATERIAL_DEFAULTS } from "./shaders/NeuralBrainMaterial";
import "./shaders/NeuralBrainMaterial";

const geometryCache = new Map<string, THREE.BufferGeometry>();
const loadingSet = new Set<string>();

function useBrainGeometry(file: string): THREE.BufferGeometry | null {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(
    geometryCache.get(file) ?? null
  );

  useEffect(() => {
    if (geometryCache.has(file)) {
      setGeometry(geometryCache.get(file)!);
      return;
    }
    if (loadingSet.has(file)) return;
    loadingSet.add(file);

    fetch(`/models/brain/${file}`)
      .then((r) => r.json())
      .then((json) => {
        const geo = parseBrainModel(json);
        geometryCache.set(file, geo);
        setGeometry(geo);
      })
      .catch(() => loadingSet.delete(file));
  }, [file]);

  return geometry;
}

interface NeuralBrainViewState {
  visibleIds: Set<string>;
}

const NeuralBrainViewContext = createContext<NeuralBrainViewState>({
  visibleIds: new Set(BRAIN_MODEL_REGISTRY.map((e) => e.id)),
});

export function NeuralBrainViewProvider({
  visibleIds,
  children,
}: {
  visibleIds: Set<string>;
  children: React.ReactNode;
}) {
  return (
    <NeuralBrainViewContext.Provider value={{ visibleIds }}>
      {children}
    </NeuralBrainViewContext.Provider>
  );
}

// Depth classification for transparency
const OUTER_IDS = new Set([
  "left-hemisphere", "right-hemisphere", "cerebellum", "corpus-callosum",
]);
const MID_IDS = new Set([
  "midbrain", "pons", "medulla", "thalamus", "auditory-cortex",
]);

function getLayerDepth(id: string): number {
  if (OUTER_IDS.has(id)) return 0.0;
  if (MID_IDS.has(id)) return 0.5;
  return 1.0;
}

function NeuralBrainRegionMesh({ entry }: { entry: BrainModelEntry }) {
  const geometry = useBrainGeometry(entry.file);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const hoveredRef = useRef(false);
  const [, forceUpdate] = useState(0);

  const {
    selectedRegionId,
    selectRegion,
    hoverRegion,
    regionActivity,
  } = useLiveStore();

  const isSelected = selectedRegionId === entry.id;
  const activity = regionActivity.get(entry.id);
  const activityIntensity = activity?.intensity ?? 0;
  const collections = getCollectionsForRegion(entry.id);
  const layerDepth = getLayerDepth(entry.id);

  // Outer = more transparent, wider fresnel
  const baseFresnelAmount = layerDepth === 0 ? 0.35 : layerDepth === 0.5 ? 0.5 : 0.65;
  const baseBrightness = layerDepth === 0 ? 0.25 : layerDepth === 0.5 ? 0.5 : 0.8;
  const baseOpacity = layerDepth === 0 ? 0.35 : layerDepth === 0.5 ? 0.6 : 0.9;

  useFrame(() => {
    if (!matRef.current) return;
    const hovered = hoveredRef.current;

    // Adjust brightness on hover/select
    let targetBrightness = baseBrightness;
    let targetOpacity = baseOpacity;
    let targetFresnel = baseFresnelAmount;

    if (hovered) {
      targetBrightness += 0.4;
      targetOpacity = Math.min(targetOpacity + 0.2, 1.0);
      targetFresnel = Math.min(targetFresnel + 0.15, 0.95);
    }
    if (isSelected) {
      targetBrightness += 0.5;
      targetOpacity = Math.min(targetOpacity + 0.3, 1.0);
      targetFresnel = Math.min(targetFresnel + 0.2, 0.95);
    }
    if (activityIntensity > 0) {
      targetBrightness += activityIntensity * 0.4;
    }

    const u = matRef.current.uniforms;
    u.hologramBrightness.value = THREE.MathUtils.lerp(u.hologramBrightness.value, targetBrightness, 0.1);
    u.hologramOpacity.value = THREE.MathUtils.lerp(u.hologramOpacity.value, targetOpacity, 0.1);
    u.fresnelAmount.value = THREE.MathUtils.lerp(u.fresnelAmount.value, targetFresnel, 0.1);
  });

  if (!geometry) return null;

  const showLabel = hoveredRef.current || isSelected || activityIntensity > 0.3;

  return (
    <group>
      <mesh
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          selectRegion(isSelected ? null : entry.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          hoveredRef.current = true;
          hoverRegion(entry.id);
          document.body.style.cursor = "pointer";
          forceUpdate((n) => n + 1);
        }}
        onPointerOut={() => {
          hoveredRef.current = false;
          hoverRegion(null);
          document.body.style.cursor = "";
          forceUpdate((n) => n + 1);
        }}
      >
        {/* @ts-expect-error - custom shader material JSX */}
        <neuralBrainShaderMaterial
          ref={matRef}
          fresnelAmount={baseFresnelAmount}
          fresnelOpacity={1.0}
          hologramColor={new THREE.Color(0x00ccff)}
          hologramBrightness={baseBrightness}
          hologramOpacity={baseOpacity}
          noiseScale={0.8}
          layerDepth={layerDepth}
          {...NEURAL_MATERIAL_DEFAULTS}
        />
      </mesh>

      {showLabel && geometry && (
        <NeuralRegionLabel
          entry={entry}
          geometry={geometry}
          activityIntensity={activityIntensity}
          collections={collections}
          isSelected={isSelected}
        />
      )}
    </group>
  );
}

function NeuralRegionLabel({
  entry,
  geometry,
  activityIntensity,
  collections,
  isSelected,
}: {
  entry: BrainModelEntry;
  geometry: THREE.BufferGeometry;
  activityIntensity: number;
  collections: string[];
  isSelected: boolean;
}) {
  const center = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const c = new THREE.Vector3();
    box.getCenter(c);
    c.y = box.max.y + 0.6;
    return c;
  }, [geometry]);

  return (
    <group position={[center.x, center.y, center.z]}>
      <Text
        fontSize={0.45}
        color={isSelected ? "#00ffff" : "#88ddff"}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.025}
        outlineColor="#000000"
      >
        {entry.name}
      </Text>
      {activityIntensity > 0.1 && (
        <Html center position={[0, 0.7, 0]}>
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-[10px] whitespace-nowrap border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
            <span className="text-cyan-400 font-medium">
              {collections.length > 0
                ? `${collections.length} collection${collections.length > 1 ? "s" : ""}`
                : "Active"}
            </span>
            <span className="text-cyan-600 ml-1.5">
              {Math.round(activityIntensity * 100)}%
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

function LoadingProgress({
  loaded,
  total,
}: {
  loaded: number;
  total: number;
}) {
  if (loaded >= total) return null;
  return (
    <Html center position={[0, 12, 0]}>
      <div className="bg-black/60 backdrop-blur-xl rounded-xl px-5 py-3 text-xs text-cyan-400 whitespace-nowrap border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          Loading neural map... {loaded}/{total}
        </div>
      </div>
    </Html>
  );
}

export default function NeuralBrain3DViewer() {
  const { visibleIds } = useContext(NeuralBrainViewContext);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setLoadedCount(geometryCache.size), 200);
    return () => clearInterval(interval);
  }, []);

  const visibleEntries = useMemo(
    () => BRAIN_MODEL_REGISTRY.filter((e) => visibleIds.has(e.id)),
    [visibleIds]
  );

  return (
    <group>
      <LoadingProgress loaded={loadedCount} total={visibleEntries.length} />
      {visibleEntries.map((entry) => (
        <NeuralBrainRegionMesh key={entry.id} entry={entry} />
      ))}
    </group>
  );
}
