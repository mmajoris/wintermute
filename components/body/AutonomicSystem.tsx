"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import RegionMesh from "./RegionMesh";
import PulseEffect from "./PulseEffect";

function HeartbeatIndicator() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    // Simulated heartbeat rhythm: 72 bpm = 1.2 Hz
    const beat = Math.pow(Math.sin(t * 1.2 * Math.PI) * 0.5 + 0.5, 4);
    const scale = 1 + beat * 0.15;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref} position={[0, -0.8, 0.3]}>
      <sphereGeometry args={[0.12, 24, 24]} />
      <meshStandardMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function VagusNervePath() {
  const points = useMemo(
    () => [
      new THREE.Vector3(0, 0.4, 0.1),
      new THREE.Vector3(0.05, 0.2, 0.15),
      new THREE.Vector3(0.03, 0, 0.2),
      new THREE.Vector3(0, -0.3, 0.25),
      new THREE.Vector3(-0.02, -0.6, 0.28),
      new THREE.Vector3(0, -0.8, 0.3),
    ],
    []
  );

  const { showSignalFlow } = useExplorerStore();

  return (
    <group>
      <Line
        points={points}
        color="#22c55e"
        lineWidth={1.5}
        transparent
        opacity={0.5}
      />
      {showSignalFlow && (
        <PulseEffect path={points} color="#22c55e" speed={0.8} count={8} />
      )}
    </group>
  );
}

function SympatheticChain() {
  const leftPoints = useMemo(
    () => [
      new THREE.Vector3(-0.15, 0.3, 0.05),
      new THREE.Vector3(-0.18, 0.1, 0.08),
      new THREE.Vector3(-0.2, -0.1, 0.1),
      new THREE.Vector3(-0.18, -0.4, 0.12),
      new THREE.Vector3(-0.15, -0.7, 0.15),
    ],
    []
  );
  const rightPoints = useMemo(
    () => leftPoints.map((p) => new THREE.Vector3(-p.x, p.y, p.z)),
    [leftPoints]
  );

  return (
    <group>
      <Line points={leftPoints} color="#ef4444" lineWidth={1} transparent opacity={0.3} />
      <Line points={rightPoints} color="#ef4444" lineWidth={1} transparent opacity={0.3} />
    </group>
  );
}

export default function AutonomicSystem({
  nodes,
}: {
  nodes: BiologicalNode[];
}) {
  const { drillInto } = useExplorerStore();

  return (
    <group>
      <HeartbeatIndicator />
      <VagusNervePath />
      <SympatheticChain />

      {nodes.map((node) => (
        <RegionMesh key={node.id} node={node} onDrillDown={drillInto} />
      ))}
    </group>
  );
}
