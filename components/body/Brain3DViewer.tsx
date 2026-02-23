"use client";

import { useRef, useState, useEffect, useMemo, createContext, useContext } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Text, Html } from "@react-three/drei";
import { useExplorerStore } from "@/lib/store";
import {
  parseBrainModel,
  BRAIN_MODEL_REGISTRY,
  type BrainModelEntry,
} from "@/lib/brain-model-loader";

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

// ---------------------------------------------------------------------------
// Context for visibility state (shared between BodyCanvas toggles + meshes)
// ---------------------------------------------------------------------------
interface BrainViewState {
  visibleIds: Set<string>;
  isolatedId: string | null;
}

const BrainViewContext = createContext<BrainViewState>({
  visibleIds: new Set(BRAIN_MODEL_REGISTRY.map((e) => e.id)),
  isolatedId: null,
});

export function BrainViewProvider({
  visibleIds,
  isolatedId,
  children,
}: {
  visibleIds: Set<string>;
  isolatedId: string | null;
  children: React.ReactNode;
}) {
  return (
    <BrainViewContext.Provider value={{ visibleIds, isolatedId }}>
      {children}
    </BrainViewContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Single brain region mesh
// ---------------------------------------------------------------------------
function BrainRegionMesh({ entry }: { entry: BrainModelEntry }) {
  const geometry = useBrainGeometry(entry.file);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const { selectedBioNodeId, selectBioNode, hoverBioNode } = useExplorerStore();
  const { isolatedId } = useContext(BrainViewContext);

  const isSelected = selectedBioNodeId === entry.id;
  const isIsolated = isolatedId === entry.id;
  const somethingIsolated = isolatedId !== null;
  const isDimmed = somethingIsolated && !isIsolated;
  const color = useMemo(() => new THREE.Color(entry.color), [entry.color]);

  useFrame(({ clock }) => {
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

    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity, targetEmissive, 0.12
    );
    matRef.current.opacity = THREE.MathUtils.lerp(
      matRef.current.opacity, targetOpacity, 0.12
    );
  });

  if (!geometry) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={(e) => {
          e.stopPropagation();
          selectBioNode(isSelected ? null : entry.id);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          hoverBioNode(entry.id);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          hoverBioNode(null);
          document.body.style.cursor = "";
        }}
      >
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.05}
          transparent
          opacity={entry.opacity}
          roughness={0.4}
          metalness={0.05}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {(hovered || isSelected || isIsolated) && geometry && !isDimmed && (
        <RegionLabel entry={entry} geometry={geometry} />
      )}
    </group>
  );
}

function RegionLabel({ entry, geometry }: { entry: BrainModelEntry; geometry: THREE.BufferGeometry }) {
  const center = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const c = new THREE.Vector3();
    box.getCenter(c);
    c.y = box.max.y + 0.5;
    return c;
  }, [geometry]);

  return (
    <Text
      position={[center.x, center.y, center.z]}
      fontSize={0.5}
      color="#fafafa"
      anchorX="center"
      anchorY="bottom"
      outlineWidth={0.03}
      outlineColor="#000000"
    >
      {entry.name}
    </Text>
  );
}

function LoadingProgress({ loaded, total }: { loaded: number; total: number }) {
  if (loaded >= total) return null;
  return (
    <Html center position={[0, 12, 0]}>
      <div className="bg-[var(--color-surface)]/90 backdrop-blur rounded-lg px-4 py-2 text-xs text-[var(--color-text-muted)] whitespace-nowrap">
        Loading models... {loaded}/{total}
      </div>
    </Html>
  );
}

// ---------------------------------------------------------------------------
// Main component — reads visibility from context
// ---------------------------------------------------------------------------
export default function Brain3DViewer() {
  const { visibleIds } = useContext(BrainViewContext);
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
        <BrainRegionMesh key={entry.id} entry={entry} />
      ))}
    </group>
  );
}
