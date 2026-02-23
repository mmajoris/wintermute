"use client";

import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import RegionMesh from "./RegionMesh";

export default function OrganSystem({
  nodes,
}: {
  nodes: BiologicalNode[];
}) {
  const { drillInto } = useExplorerStore();

  return (
    <group>
      {nodes.map((node) => (
        <RegionMesh key={node.id} node={node} onDrillDown={drillInto} />
      ))}
    </group>
  );
}
