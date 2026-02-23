"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import RegionMesh from "./RegionMesh";

function BrainOutline() {
  const points = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 0.8, 0.65, 0, 2 * Math.PI, false, 0);
    return curve.getPoints(64).map((p) => new THREE.Vector3(p.x, p.y + 0.05, 0));
  }, []);

  return (
    <Line
      points={points}
      color="#404040"
      lineWidth={0.5}
      transparent
      opacity={0.2}
    />
  );
}

function LobeGeometry({ node }: { node: BiologicalNode }) {
  const geom = useMemo(() => {
    switch (true) {
      case node.id.includes("frontal"):
        return new THREE.SphereGeometry(0.35, 32, 32, 0, Math.PI, 0, Math.PI);
      case node.id.includes("parietal"):
        return new THREE.SphereGeometry(0.28, 32, 32, 0, Math.PI, 0, Math.PI * 0.8);
      case node.id.includes("temporal"):
        return new THREE.SphereGeometry(0.22, 24, 24);
      case node.id.includes("occipital"):
        return new THREE.SphereGeometry(0.2, 24, 24);
      default:
        return new THREE.SphereGeometry(0.15, 24, 24);
    }
  }, [node.id]);

  return geom;
}

function DeepStructureGeometry({ node }: { node: BiologicalNode }) {
  const geom = useMemo(() => {
    if (node.id.includes("thalamus") && !node.id.includes("hypo")) {
      return new THREE.SphereGeometry(0.12, 24, 24);
    }
    if (node.id.includes("hypothalamus")) {
      return new THREE.SphereGeometry(0.08, 20, 20);
    }
    if (node.id.includes("hippocampus")) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(0.1, 0.05, 0.15, 0, 0.2, -0.05);
      shape.bezierCurveTo(0.15, -0.1, 0.05, -0.08, 0, 0);
      const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 4 };
      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }
    if (node.id.includes("amygdala")) {
      return new THREE.SphereGeometry(0.07, 16, 16);
    }
    if (node.id.includes("basal-ganglia")) {
      return new THREE.TorusGeometry(0.1, 0.04, 12, 24);
    }
    if (node.id.includes("corpus-callosum")) {
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.3, 0, 0),
        new THREE.Vector3(0, 0.1, 0),
        new THREE.Vector3(0.3, 0, 0)
      );
      return new THREE.TubeGeometry(curve, 20, 0.03, 8, false);
    }
    return new THREE.SphereGeometry(0.08, 20, 20);
  }, [node.id]);

  return geom;
}

export default function BrainExplorer({ nodes }: { nodes: BiologicalNode[] }) {
  const { drillInto } = useExplorerStore();

  const lobes = nodes.filter(
    (n) => n.id.includes("lobe") || n.id.includes("frontal") || n.id.includes("parietal") || n.id.includes("temporal") || n.id.includes("occipital")
  );
  const deepStructures = nodes.filter(
    (n) => !lobes.includes(n) && !n.id.includes("network")
  );
  const networks = nodes.filter((n) => n.id.includes("network"));

  return (
    <group>
      <BrainOutline />

      {/* Lobes with specialized geometry */}
      {lobes.map((node) => (
        <RegionMesh
          key={node.id}
          node={node}
          geometry={LobeGeometry({ node })}
          onDrillDown={drillInto}
        />
      ))}

      {/* Deep structures */}
      {deepStructures.map((node) => (
        <RegionMesh
          key={node.id}
          node={node}
          geometry={DeepStructureGeometry({ node })}
          onDrillDown={drillInto}
        />
      ))}

      {/* Functional networks as wireframe spheres */}
      {networks.map((node) => (
        <group key={node.id}>
          <RegionMesh
            node={node}
            geometry={new THREE.IcosahedronGeometry(0.25, 1)}
            onDrillDown={drillInto}
          />
        </group>
      ))}
    </group>
  );
}
