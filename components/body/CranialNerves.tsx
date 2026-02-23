"use client";

import * as THREE from "three";
import { Line, Text } from "@react-three/drei";
import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import RegionMesh from "./RegionMesh";
import PulseEffect from "./PulseEffect";

const NERVE_DISPLAY_COLORS: Record<string, string> = {
  "cn-i": "#a3e635",
  "cn-ii": "#60a5fa",
  "cn-iii": "#f97316",
  "cn-iv": "#f97316",
  "cn-v": "#e879f9",
  "cn-vi": "#f97316",
  "cn-vii": "#fbbf24",
  "cn-viii": "#2dd4bf",
  "cn-ix": "#fb923c",
  "cn-x": "#22c55e",
  "cn-xi": "#f87171",
  "cn-xii": "#c084fc",
};

function NervePathway({ node }: { node: BiologicalNode }) {
  const { showSignalFlow, selectedBioNodeId } = useExplorerStore();
  const isSelected = selectedBioNodeId === node.id;

  if (!node.pathway || node.pathway.length < 2) return null;

  const points = node.pathway.map((p) => new THREE.Vector3(...p.position));
  const color = NERVE_DISPLAY_COLORS[node.id] ?? node.color;

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={isSelected ? 2 : 0.8}
        transparent
        opacity={isSelected ? 0.7 : 0.3}
      />
      {(showSignalFlow || isSelected) && (
        <PulseEffect path={points} color={color} speed={1.2} count={4} />
      )}
    </group>
  );
}

export default function CranialNerves({
  nodes,
}: {
  nodes: BiologicalNode[];
}) {
  const { drillInto, selectedBioNodeId, hoveredBioNodeId } = useExplorerStore();

  return (
    <group>
      {/* Brainstem anchor indicator */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.4, 12]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.15}
          transparent
          opacity={0.25}
        />
      </mesh>

      {nodes.map((node) => (
        <group key={node.id}>
          <RegionMesh node={node} onDrillDown={drillInto} />
          <NervePathway node={node} />
          {(selectedBioNodeId === node.id || hoveredBioNodeId === node.id) && (
            <Text
              position={[
                node.position3D[0],
                node.position3D[1] + 0.18,
                node.position3D[2],
              ]}
              fontSize={0.06}
              color="#fafafa"
              anchorX="center"
              anchorY="bottom"
              outlineWidth={0.002}
              outlineColor="#0a0a0a"
            >
              {node.name}
            </Text>
          )}
        </group>
      ))}
    </group>
  );
}
