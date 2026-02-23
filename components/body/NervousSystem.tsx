"use client";

import * as THREE from "three";
import { Line } from "@react-three/drei";
import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import RegionMesh from "./RegionMesh";
import PulseEffect from "./PulseEffect";

function PathwayLine({ node }: { node: BiologicalNode }) {
  const { showSignalFlow } = useExplorerStore();

  if (!node.pathway || node.pathway.length < 2) return null;

  const points = node.pathway.map(
    (p) => new THREE.Vector3(...p.position)
  );

  return (
    <group>
      <Line
        points={points}
        color={node.color}
        lineWidth={1}
        transparent
        opacity={0.4}
      />
      {showSignalFlow && <PulseEffect path={points} color={node.color} speed={1.5} />}
    </group>
  );
}

export default function NervousSystem({
  nodes,
}: {
  nodes: BiologicalNode[];
}) {
  const { drillInto } = useExplorerStore();

  const pathwayNodes = nodes.filter((n) => n.pathway && n.pathway.length > 0);
  const regionNodes = nodes.filter(
    (n) => !n.pathway || n.pathway.length === 0
  );

  return (
    <group>
      {regionNodes.map((node) => (
        <RegionMesh key={node.id} node={node} onDrillDown={drillInto} />
      ))}
      {pathwayNodes.map((node) => (
        <group key={node.id}>
          <RegionMesh node={node} onDrillDown={drillInto} />
          <PathwayLine node={node} />
        </group>
      ))}
    </group>
  );
}
