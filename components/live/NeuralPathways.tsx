"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import {
  NEUROTRANSMITTER_PATHWAYS,
  REGION_CENTERS,
} from "@/lib/collection-mapping";

const PATHWAY_LIFETIME = 2000;

interface PathwayLine {
  key: string;
  pathway: string;
  color: THREE.Color;
  geometry: THREE.TubeGeometry;
}

function buildAllPathways(): PathwayLine[] {
  const lines: PathwayLine[] = [];

  for (const [name, pathway] of Object.entries(NEUROTRANSMITTER_PATHWAYS)) {
    const sourceCenter = REGION_CENTERS[pathway.source];
    if (!sourceCenter) continue;

    for (const target of pathway.targets) {
      const targetCenter = REGION_CENTERS[target];
      if (!targetCenter) continue;

      const src = new THREE.Vector3(...sourceCenter);
      const tgt = new THREE.Vector3(...targetCenter);
      const mid = new THREE.Vector3().lerpVectors(src, tgt, 0.5);
      mid.y += 1.5;
      mid.z += 0.5;

      const curve = new THREE.CatmullRomCurve3([src, mid, tgt], false, "catmullrom", 0.5);
      const geometry = new THREE.TubeGeometry(curve, 32, 0.1, 6, false);

      lines.push({
        key: `${name}-${target}`,
        pathway: name,
        color: new THREE.Color(pathway.color),
        geometry,
      });
    }
  }

  return lines;
}

export default function NeuralPathways() {
  const allLines = useMemo(() => buildAllPathways(), []);
  const matRefs = useRef<Map<string, THREE.MeshBasicMaterial>>(new Map());

  useFrame(() => {
    const { pathwayActivations } = useLiveStore.getState();
    const now = Date.now();

    // Calculate intensity per pathway name
    const intensities = new Map<string, number>();
    for (const activation of pathwayActivations) {
      const elapsed = now - activation.startedAt;
      if (elapsed >= 0 && elapsed < PATHWAY_LIFETIME) {
        const progress = elapsed / PATHWAY_LIFETIME;
        const fade = progress < 0.15
          ? progress / 0.15
          : 1 - ((progress - 0.15) / 0.85);
        const current = intensities.get(activation.pathway) || 0;
        intensities.set(activation.pathway, Math.max(current, fade * activation.intensity));
      }
    }

    // Update material opacities directly every frame
    for (const line of allLines) {
      const mat = matRefs.current.get(line.key);
      if (mat) {
        const intensity = intensities.get(line.pathway) || 0;
        mat.opacity = intensity * 0.85;
      }
    }
  });

  return (
    <group>
      {allLines.map((line) => (
        <mesh key={line.key} geometry={line.geometry}>
          <meshBasicMaterial
            ref={(ref) => {
              if (ref) matRefs.current.set(line.key, ref);
            }}
            color={line.color}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
