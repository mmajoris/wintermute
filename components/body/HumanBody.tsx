"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Brain3DViewer from "./Brain3DViewer";
import { useExplorerStore } from "@/lib/store";

// ---------------------------------------------------------------------------
// PATHWAY DEFINITIONS — all in a cohesive blue/cyan palette
// ---------------------------------------------------------------------------
const PATHWAYS: {
  name: string;
  points: [number, number, number][];
  relatedIds: string[];
}[] = [
  { name: "Corticospinal", points: [[0, 11.5, 1], [0.3, 10.5, 0.5], [0.2, 9, 0], [0.1, 7.5, -0.2], [0, 5.5, -0.5], [0, 3, -0.8]], relatedIds: ["left-hemisphere", "midbrain", "pons", "medulla"] },
  { name: "Sensory", points: [[0, 3, -0.5], [0, 5.5, -0.3], [-0.1, 7, 0], [-0.2, 8, 0.3], [0, 8.5, 0], [0, 10.5, 0.5]], relatedIds: ["medulla", "thalamus", "right-hemisphere"] },
  { name: "Limbic", points: [[-2.5, 7.2, 1.5], [-2.8, 7.5, 0.5], [-2, 8, -0.5], [0, 8.5, 0], [0.5, 10, 1], [0, 11.5, 1.5]], relatedIds: ["amygdala", "hippocampus", "thalamus", "left-hemisphere"] },
  { name: "Cerebellar", points: [[1, 11, 0.5], [0.8, 9.5, 0], [0.5, 7.5, -0.5], [0, 6, -2.5], [-0.5, 7, -0.3], [0, 8.5, 0]], relatedIds: ["right-hemisphere", "pons", "cerebellum", "thalamus"] },
  { name: "Vagus", points: [[0.8, 6, 0.5], [1.2, 5, 1], [1.5, 4, 1.5], [1.3, 3, 2], [1, 2, 2], [0.8, 0.5, 1.5]], relatedIds: ["cn-x", "medulla"] },
  { name: "Visual", points: [[2, 8.5, 4], [1, 8.5, 3], [0, 8.5, 2.5], [0, 8.5, 0], [0, 9.5, -1.5], [-0.5, 10.5, -2]], relatedIds: ["cn-ii", "thalamus", "left-hemisphere"] },
  { name: "Basal Ganglia", points: [[0, 11, 1], [1.5, 9.5, 0.5], [2, 9, 0], [1.5, 8.5, -0.2], [0, 8.5, 0], [-0.5, 10, 0.5]], relatedIds: ["caudate-nucleus", "putamen", "globus-pallidus", "thalamus"] },
  { name: "Fornix", points: [[-2.5, 7.8, -0.5], [-1.5, 9, -0.8], [0, 9.5, -0.5], [1.5, 9, -0.8], [2.5, 7.8, -0.5]], relatedIds: ["hippocampus", "thalamus"] },
  { name: "Callosal", points: [[-3, 10, 0], [-1.5, 10.5, -0.5], [0, 10.8, -0.8], [1.5, 10.5, -0.5], [3, 10, 0]], relatedIds: ["corpus-callosum", "left-hemisphere", "right-hemisphere"] },
];

const PATHWAY_COLOR = new THREE.Color("#2d5a8a");
const PATHWAY_ACTIVE_COLOR = new THREE.Color("#38bdf8");

// ---------------------------------------------------------------------------
// HAIR-THIN PATHWAY LINES
// ---------------------------------------------------------------------------
function PathwayLine({
  points,
  active,
}: {
  points: [number, number, number][];
  active: boolean;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const colorRef = useRef(new THREE.Color("#1e3a5f"));

  const tubeGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, 64, 0.012, 4, false);
  }, [points]);

  useFrame(() => {
    if (!matRef.current) return;
    const targetOpacity = active ? 0.7 : 0.16;
    matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, targetOpacity, 0.06);
    colorRef.current.lerp(active ? PATHWAY_ACTIVE_COLOR : PATHWAY_COLOR, 0.05);
    matRef.current.color.copy(colorRef.current);
  });

  return (
    <mesh geometry={tubeGeo}>
      <meshBasicMaterial
        ref={matRef}
        color={PATHWAY_COLOR}
        transparent
        opacity={0.08}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// NEURON ZIPS — sporadic bright neurons that whoosh along pathways
// ---------------------------------------------------------------------------
interface ZipState {
  pathIndex: number;
  progress: number;
  speed: number;
  phase: "waiting" | "traveling" | "fading";
  timer: number;
  opacity: number;
  size: number;
  forward: boolean;
}

function NeuronZips() {
  const zipCount = 8;
  const groupRef = useRef<THREE.Group>(null);

  const curves = useMemo(
    () => PATHWAYS.map((p) => new THREE.CatmullRomCurve3(p.points.map((pt) => new THREE.Vector3(...pt)))),
    []
  );

  const neuronColor = useMemo(() => new THREE.Color("#67d4ff"), []);

  const zipStates = useRef<ZipState[]>(
    Array.from({ length: zipCount }, () => ({
      pathIndex: Math.floor(Math.random() * PATHWAYS.length),
      progress: 0,
      speed: 0.2 + Math.random() * 0.35,
      phase: "waiting" as const,
      timer: Math.random() * 8,
      opacity: 0,
      size: 0.08 + Math.random() * 0.05,
      forward: Math.random() > 0.5,
    }))
  );

  // Pre-create position vectors
  const positions = useRef(Array.from({ length: zipCount }, () => new THREE.Vector3()));
  const opacities = useRef(new Float32Array(zipCount));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);

    zipStates.current.forEach((zip, i) => {
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

        const frac = THREE.MathUtils.clamp(zip.forward ? zip.progress : 1 - zip.progress, 0, 1);
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
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: zipCount }).map((_, i) => (
        <NeuronZipMesh
          key={i}
          index={i}
          positions={positions}
          opacities={opacities}
          zipStates={zipStates}
          color={neuronColor}
        />
      ))}
    </group>
  );
}

function NeuronZipMesh({
  index,
  positions,
  opacities,
  zipStates,
  color,
}: {
  index: number;
  positions: React.MutableRefObject<THREE.Vector3[]>;
  opacities: React.MutableRefObject<Float32Array>;
  zipStates: React.MutableRefObject<ZipState[]>;
  color: THREE.Color;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const haloRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
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
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshBasicMaterial ref={haloRef} color={color} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh scale={0.5}>
        <sphereGeometry args={[0.08, 10, 10]} />
        <meshBasicMaterial ref={glowRef} color={color} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh scale={0.2}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial ref={coreRef} color="#ffffff" transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
export default function HumanBody() {
  const { selectedBioNodeId } = useExplorerStore();

  const activePathways = useMemo(() => {
    if (!selectedBioNodeId) return new Set<number>();
    const active = new Set<number>();
    PATHWAYS.forEach((p, i) => {
      if (p.relatedIds.includes(selectedBioNodeId)) active.add(i);
    });
    return active;
  }, [selectedBioNodeId]);

  return (
    <group>
      <Brain3DViewer />

      {PATHWAYS.map((pathway, i) => (
        <PathwayLine
          key={pathway.name}
          points={pathway.points}
          active={activePathways.has(i)}
        />
      ))}

      <NeuronZips />
    </group>
  );
}
