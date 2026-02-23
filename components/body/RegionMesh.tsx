"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExplorerStore } from "@/lib/store";
import type { BiologicalNode } from "@/lib/types";

interface RegionMeshProps {
  node: BiologicalNode;
  geometry?: THREE.BufferGeometry;
  onDrillDown?: (id: string) => void;
  parentPosition?: [number, number, number];
}

export default function RegionMesh({
  node,
  geometry,
  onDrillDown,
  parentPosition = [0, 0, 0],
}: RegionMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const currentEmissiveIntensity = useRef(0);

  const { selectedBioNodeId, selectBioNode, hoverBioNode } =
    useExplorerStore();

  const isSelected = selectedBioNodeId === node.id;
  const baseColor = useMemo(() => new THREE.Color(node.color), [node.color]);

  const worldPos: [number, number, number] = [
    parentPosition[0] + node.position3D[0],
    parentPosition[1] + node.position3D[1],
    parentPosition[2] + node.position3D[2],
  ];

  useFrame(({ clock }) => {
    if (!matRef.current) return;

    let targetIntensity = 0.1;
    if (hovered) targetIntensity = 0.6;
    if (isSelected) {
      const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.2 + 0.8;
      targetIntensity = pulse;
    }

    currentEmissiveIntensity.current = THREE.MathUtils.lerp(
      currentEmissiveIntensity.current,
      targetIntensity,
      0.1
    );
    matRef.current.emissiveIntensity = currentEmissiveIntensity.current;

    if (meshRef.current && isSelected) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.02;
      meshRef.current.scale.setScalar(s);
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isSelected && node.children.length > 0 && onDrillDown) {
      onDrillDown(node.id);
    } else {
      selectBioNode(node.id);
    }
  };

  const defaultGeom = useMemo(
    () =>
      new THREE.SphereGeometry(
        node.scale3D ? node.scale3D[0] : 0.15,
        32,
        32
      ),
    [node.scale3D]
  );

  return (
    <mesh
      ref={meshRef}
      position={worldPos}
      geometry={geometry || defaultGeom}
      onClick={handleClick}
      onPointerEnter={(e: { stopPropagation: () => void }) => {
        e.stopPropagation();
        setHovered(true);
        hoverBioNode(node.id);
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
        color={baseColor}
        emissive={baseColor}
        emissiveIntensity={0.1}
        transparent
        opacity={isSelected ? 0.85 : hovered ? 0.7 : 0.5}
        roughness={0.3}
        metalness={0.1}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
