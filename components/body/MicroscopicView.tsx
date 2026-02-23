"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import RegionMesh from "./RegionMesh";

function NeuronVisualization({
  position,
}: {
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Procedural dendrites
  const dendrites = useMemo(() => {
    const branches: THREE.Vector3[][] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const length = 0.15 + Math.random() * 0.1;
      const pts: THREE.Vector3[] = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(
          Math.cos(angle) * length * 0.5,
          Math.sin(angle) * length * 0.4 + 0.05,
          Math.sin(angle * 0.7) * 0.03
        ),
        new THREE.Vector3(
          Math.cos(angle) * length,
          Math.sin(angle) * length * 0.8 + 0.1,
          Math.sin(angle * 1.3) * 0.05
        ),
      ];
      branches.push(pts);
    }
    return branches;
  }, []);

  // Axon path
  const axonPath = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -0.08, 0.01),
      new THREE.Vector3(0.02, -0.2, -0.01),
      new THREE.Vector3(-0.01, -0.35, 0),
      new THREE.Vector3(0.03, -0.45, 0.02),
    ],
    []
  );

  // Synapse terminals
  const terminals = useMemo(() => {
    const last = axonPath[axonPath.length - 1];
    return [
      new THREE.Vector3(last.x - 0.04, last.y - 0.03, last.z),
      new THREE.Vector3(last.x + 0.02, last.y - 0.04, last.z + 0.02),
      new THREE.Vector3(last.x + 0.04, last.y - 0.02, last.z - 0.01),
    ];
  }, [axonPath]);

  return (
    <group position={position} ref={groupRef}>
      {/* Cell body (soma) */}
      <mesh>
        <sphereGeometry args={[0.04, 20, 20]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshStandardMaterial
          color="#6d28d9"
          emissive="#6d28d9"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Dendrites */}
      {dendrites.map((pts, i) => (
        <Line
          key={`d-${i}`}
          points={pts}
          color="#c4b5fd"
          lineWidth={0.8}
          transparent
          opacity={0.5}
        />
      ))}

      {/* Axon */}
      <Line
        points={axonPath}
        color="#818cf8"
        lineWidth={1.2}
        transparent
        opacity={0.6}
      />

      {/* Myelin sheath segments */}
      {[0.25, 0.45, 0.65].map((t, i) => {
        const curve = new THREE.CatmullRomCurve3(axonPath);
        const p = curve.getPointAt(t);
        return (
          <mesh key={`m-${i}`} position={[p.x, p.y, p.z]}>
            <torusGeometry args={[0.012, 0.005, 8, 12]} />
            <meshStandardMaterial
              color="#fbbf24"
              transparent
              opacity={0.4}
            />
          </mesh>
        );
      })}

      {/* Synaptic terminals */}
      {terminals.map((pos, i) => (
        <mesh key={`t-${i}`} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.012, 10, 10]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function NeurotransmitterParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      posArr.array[i * 3] += velocities[i * 3];
      posArr.array[i * 3 + 1] += velocities[i * 3 + 1];
      posArr.array[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce
      for (let j = 0; j < 3; j++) {
        const bound = j === 2 ? 0.15 : 0.4;
        if (
          Math.abs(posArr.array[i * 3 + j]) > bound
        ) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }
    posArr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#34d399"
        size={0.015}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function MicroscopicView({
  nodes,
}: {
  nodes: BiologicalNode[];
}) {
  const { drillInto } = useExplorerStore();

  return (
    <group>
      {/* Background neuron illustrations */}
      <NeuronVisualization position={[-0.3, 0.2, -0.1]} />
      <NeuronVisualization position={[0.25, -0.1, 0.05]} />

      {/* Floating neurotransmitter particles */}
      <NeurotransmitterParticles />

      {/* Actual data nodes */}
      {nodes.map((node) => (
        <RegionMesh key={node.id} node={node} onDrillDown={drillInto} />
      ))}
    </group>
  );
}
