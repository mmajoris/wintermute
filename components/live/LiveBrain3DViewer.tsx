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

interface LiveBrainViewState {
  visibleIds: Set<string>;
}

const LiveBrainViewContext = createContext<LiveBrainViewState>({
  visibleIds: new Set(BRAIN_MODEL_REGISTRY.map((e) => e.id)),
});

export function LiveBrainViewProvider({
  visibleIds,
  children,
}: {
  visibleIds: Set<string>;
  children: React.ReactNode;
}) {
  return (
    <LiveBrainViewContext.Provider value={{ visibleIds }}>
      {children}
    </LiveBrainViewContext.Provider>
  );
}

function LiveBrainRegionMesh({ entry }: { entry: BrainModelEntry }) {
  const geometry = useBrainGeometry(entry.file);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const {
    selectedRegionId,
    selectRegion,
    hoverRegion,
    regionActivity,
    thoughtLoopPulse,
    emotionalState,
  } = useLiveStore();

  const isSelected = selectedRegionId === entry.id;
  const activity = regionActivity.get(entry.id);
  const activityIntensity = activity?.intensity ?? 0;
  const collections = getCollectionsForRegion(entry.id);

  const baseColor = useMemo(() => new THREE.Color(entry.color), [entry.color]);

  const emotionalTint = useMemo(() => {
    if (!emotionalState) return new THREE.Color(1, 1, 1);
    const valence = emotionalState.valence;
    if (valence > 0.3) {
      return new THREE.Color(1, 1 - valence * 0.2, 1 - valence * 0.3);
    } else if (valence < -0.3) {
      return new THREE.Color(1 + valence * 0.3, 1 + valence * 0.2, 1);
    }
    return new THREE.Color(1, 1, 1);
  }, [emotionalState]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    let targetEmissive = 0.05;
    let targetOpacity = entry.opacity;

    const globalPulse = thoughtLoopPulse * 0.15;

    if (activityIntensity > 0) {
      const activityPulse =
        Math.sin(clock.getElapsedTime() * 6) * 0.1 * activityIntensity;
      targetEmissive = 0.2 + activityIntensity * 0.6 + activityPulse + globalPulse;
      targetOpacity = Math.min(entry.opacity + activityIntensity * 0.3, 0.95);
    } else if (isSelected) {
      const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.15 + 0.55;
      targetEmissive = pulse + globalPulse;
      targetOpacity = Math.min(entry.opacity + 0.3, 0.95);
    } else if (hovered) {
      targetEmissive = 0.4 + globalPulse;
      targetOpacity = Math.min(entry.opacity + 0.25, 0.9);
    } else {
      targetEmissive = 0.05 + globalPulse;
    }

    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      targetEmissive,
      0.15
    );
    matRef.current.opacity = THREE.MathUtils.lerp(
      matRef.current.opacity,
      targetOpacity,
      0.12
    );

    const tintedColor = baseColor.clone().multiply(emotionalTint);
    matRef.current.emissive.lerp(tintedColor, 0.1);
  });

  if (!geometry) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          selectRegion(isSelected ? null : entry.id);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          hoverRegion(entry.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          hoverRegion(null);
          document.body.style.cursor = "";
        }}
      >
        <meshStandardMaterial
          ref={matRef}
          color={baseColor}
          emissive={baseColor}
          emissiveIntensity={0.05}
          transparent
          opacity={entry.opacity}
          roughness={0.4}
          metalness={0.05}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {(hovered || isSelected || activityIntensity > 0.3) && geometry && (
        <LiveRegionLabel
          entry={entry}
          geometry={geometry}
          activityIntensity={activityIntensity}
          collections={collections}
        />
      )}
    </group>
  );
}

function LiveRegionLabel({
  entry,
  geometry,
  activityIntensity,
  collections,
}: {
  entry: BrainModelEntry;
  geometry: THREE.BufferGeometry;
  activityIntensity: number;
  collections: string[];
}) {
  const center = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const c = new THREE.Vector3();
    box.getCenter(c);
    c.y = box.max.y + 0.5;
    return c;
  }, [geometry]);

  return (
    <group position={[center.x, center.y, center.z]}>
      <Text
        fontSize={0.5}
        color="#fafafa"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {entry.name}
      </Text>
      {activityIntensity > 0.1 && (
        <Html center position={[0, 0.8, 0]}>
          <div className="bg-black/80 backdrop-blur rounded px-2 py-1 text-[10px] text-emerald-400 whitespace-nowrap border border-emerald-500/20">
            {collections.length > 0
              ? `${collections.length} collection${collections.length > 1 ? "s" : ""} active`
              : "Active"}
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
      <div className="bg-[var(--color-surface)]/90 backdrop-blur rounded-lg px-4 py-2 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
        Loading models... {loaded}/{total}
      </div>
    </Html>
  );
}

export default function LiveBrain3DViewer() {
  const { visibleIds } = useContext(LiveBrainViewContext);
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
        <LiveBrainRegionMesh key={entry.id} entry={entry} />
      ))}
    </group>
  );
}
