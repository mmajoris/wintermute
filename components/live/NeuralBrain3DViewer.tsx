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
import { renderOptionsRef } from "./LiveBrainMonitor";
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
    spreadingActivations,
  } = useLiveStore();

  const isSelected = selectedRegionId === entry.id;
  const activity = regionActivity.get(entry.id);
  const baseActivityIntensity = activity?.intensity ?? 0;
  
  // Check if this region is part of any active spreading activation
  const spreadBoost = useMemo(() => {
    const now = Date.now();
    let boost = 0;
    for (const spread of spreadingActivations) {
      const elapsed = now - spread.startedAt;
      for (const node of spread.nodes) {
        if (node.regionId === entry.id && elapsed >= node.delay && elapsed < node.delay + 1500) {
          const progress = (elapsed - node.delay) / 1500;
          const wave = Math.sin(progress * Math.PI) * node.intensity;
          boost = Math.max(boost, wave);
        }
      }
    }
    return boost;
  }, [spreadingActivations, entry.id]);
  
  const activityIntensity = Math.min(1, baseActivityIntensity + spreadBoost);
  const collections = getCollectionsForRegion(entry.id);
  const layerDepth = getLayerDepth(entry.id);

  // Per-category: color, noise scale, and biologically-inspired texture type
  // 0=cortex, 1=cerebellum, 2=brainstem, 3=limbic, 4=fiber, 5=nerve, 6=fluid
  const regionStyle = useMemo(() => {
    const id = entry.id;
    const cat = entry.category;
    
    // Special cases by ID
    if (id === "corpus-callosum") {
      return { outer: new THREE.Color(0x4466bb), inner: new THREE.Color(0x55ccff), accent: new THREE.Color(0x6677cc), noiseScale: 0.8, textureType: 4 };
    }
    if (id === "ventricles") {
      return { outer: new THREE.Color(0x3355bb), inner: new THREE.Color(0x33bbff), accent: new THREE.Color(0x5577cc), noiseScale: 0.5, textureType: 6 };
    }
    // Basal ganglia - warm amber-purple
    if (["caudate-nucleus", "putamen", "globus-pallidus", "nucleus-accumbens", "subthalamic-nucleus"].includes(id)) {
      return { outer: new THREE.Color(0x7744aa), inner: new THREE.Color(0xbb77dd), accent: new THREE.Color(0x9955bb), noiseScale: 1.0, textureType: 3 };
    }
    
    switch (cat) {
      case "cerebrum":
        return { outer: new THREE.Color(0x5544aa), inner: new THREE.Color(0x22bbff), accent: new THREE.Color(0x7744bb), noiseScale: 0.7, textureType: 0 };
      case "cerebellum":
        return { outer: new THREE.Color(0x4455bb), inner: new THREE.Color(0x22ccff), accent: new THREE.Color(0x6655cc), noiseScale: 0.6, textureType: 1 };
      case "brainstem":
        return { outer: new THREE.Color(0x6644aa), inner: new THREE.Color(0x44aaee), accent: new THREE.Color(0x9944aa), noiseScale: 0.8, textureType: 2 };
      case "limbic":
        return { outer: new THREE.Color(0x5555bb), inner: new THREE.Color(0x33ccdd), accent: new THREE.Color(0x8855aa), noiseScale: 0.9, textureType: 3 };
      case "endocrine":
        return { outer: new THREE.Color(0x4466aa), inner: new THREE.Color(0x44ddcc), accent: new THREE.Color(0x6688bb), noiseScale: 1.0, textureType: 3 };
      case "peripheral":
        return { outer: new THREE.Color(0x2277aa), inner: new THREE.Color(0x22eebb), accent: new THREE.Color(0x33aa88), noiseScale: 0.8, textureType: 5 };
      default:
        return { outer: new THREE.Color(0x5544aa), inner: new THREE.Color(0x22bbff), accent: new THREE.Color(0x7744bb), noiseScale: 0.8, textureType: 0 };
    }
  }, [entry.id, entry.category]);

  // Full wireframe - color matches region, outer layers more transparent
  const isOuterWire = OUTER_IDS.has(entry.id);
  const wireframeMaterial = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: regionStyle.inner,
      wireframe: true,
      transparent: true,
      opacity: isOuterWire ? 0.05 : 0.08,
      depthWrite: false,
    });
    mat.blending = THREE.AdditiveBlending;
    return mat;
  }, [isOuterWire, regionStyle.inner]);

  // Hemispheres get asymmetric baselines for visual separation
  const isLeftHemi = entry.id === "left-hemisphere";
  const isRightHemi = entry.id === "right-hemisphere";
  
  let baseFresnelAmount: number, baseBrightness: number, baseOpacity: number;
  
  if (isLeftHemi) {
    baseFresnelAmount = 0.58;
    baseBrightness = 0.25;
    baseOpacity = 0.2;
  } else if (isRightHemi) {
    // Right hemisphere: elevated to ~selected level
    baseFresnelAmount = 0.7;
    baseBrightness = 0.6;
    baseOpacity = 0.5;
  } else if (layerDepth === 0) {
    // Other outer (cerebellum, corpus callosum): between old and hover
    baseFresnelAmount = 0.6;
    baseBrightness = 0.45;
    baseOpacity = 0.35;
  } else if (layerDepth === 0.5) {
    baseFresnelAmount = 0.5;
    baseBrightness = 0.4;
    baseOpacity = 0.5;
  } else {
    baseFresnelAmount = 0.45;
    baseBrightness = 0.5;
    baseOpacity = 0.55;
  }

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const hovered = hoveredRef.current;

    matRef.current.uniforms.time.value = clock.getElapsedTime();

    // Adjust brightness on hover/select
    let targetBrightness = baseBrightness;
    let targetOpacity = baseOpacity;
    let targetFresnel = baseFresnelAmount;

    if (hovered) {
      targetBrightness += 0.3;
      targetOpacity = Math.min(targetOpacity + 0.15, 1.0);
      targetFresnel = Math.min(targetFresnel + 0.1, 0.95);
    }
    if (isSelected) {
      targetBrightness += 0.4;
      targetOpacity = Math.min(targetOpacity + 0.2, 1.0);
      targetFresnel = Math.min(targetFresnel + 0.15, 0.95);
    }
    if (activityIntensity > 0) {
      targetBrightness += activityIntensity * 1.2;
      targetOpacity = Math.min(targetOpacity + activityIntensity * 0.4, 1.0);
      targetFresnel = Math.min(targetFresnel + activityIntensity * 0.2, 0.95);
    }

    const u = matRef.current.uniforms;
    u.hologramBrightness.value = THREE.MathUtils.lerp(u.hologramBrightness.value, targetBrightness, 0.1);
    u.hologramOpacity.value = THREE.MathUtils.lerp(u.hologramOpacity.value, targetOpacity, 0.1);
    u.fresnelAmount.value = THREE.MathUtils.lerp(u.fresnelAmount.value, targetFresnel, 0.1);

    // Force per-region values every frame
    u.noiseScale.value = regionStyle.noiseScale;
    u.textureType.value = regionStyle.textureType;
    u.outerColor.value.copy(regionStyle.outer);
    u.innerColor.value.copy(regionStyle.inner);
    u.accentColor.value.copy(regionStyle.accent);
    u.layerDepth.value = layerDepth;
  });

  if (!geometry) return null;

  const showLabel = false;

  const { showShader, showWireframe } = renderOptionsRef;

  return (
    <group>
      {/* Invisible interaction mesh (always present for hover/click) */}
      <mesh
        geometry={geometry}
        visible={false}
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
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Shader surface */}
      {showShader && (
        <mesh geometry={geometry}>
          <neuralBrainShaderMaterial
            ref={matRef}
            fresnelAmount={baseFresnelAmount}
            fresnelOpacity={1.0}
            outerColor={regionStyle.outer}
            innerColor={regionStyle.inner}
            accentColor={regionStyle.accent}
            hologramBrightness={baseBrightness}
            hologramOpacity={baseOpacity}
            noiseScale={regionStyle.noiseScale}
            textureType={regionStyle.textureType}
            layerDepth={layerDepth}
            {...NEURAL_MATERIAL_DEFAULTS}
          />
        </mesh>
      )}

      {/* Wireframe */}
      {showWireframe && (
        <mesh geometry={geometry} material={wireframeMaterial} />
      )}

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
