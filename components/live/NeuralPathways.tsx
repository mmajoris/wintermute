"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { buildPathwayCurves } from "@/lib/pathway-curves";

const PATHWAY_LIFETIME = 2000;

export default function NeuralPathways() {
  const allCurves = useMemo(() => buildPathwayCurves(), []);

  // Pre-build thin tube geometries for faint wire traces
  const tubes = useMemo(() => {
    return allCurves.map((c) => ({
      key: c.key,
      pathway: c.pathway,
      color: c.color,
      geometry: new THREE.TubeGeometry(c.curve, 32, 0.03, 4, false),
    }));
  }, [allCurves]);

  const matRefs = useRef<Map<string, THREE.MeshBasicMaterial>>(new Map());

  useFrame(() => {
    const { pathwayActivations } = useLiveStore.getState();
    const now = Date.now();

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

    for (const tube of tubes) {
      const mat = matRefs.current.get(tube.key);
      if (mat) {
        const intensity = intensities.get(tube.pathway) || 0;
        mat.opacity = intensity * 0.3;
      }
    }
  });

  return (
    <group>
      {tubes.map((tube) => (
        <mesh key={tube.key} geometry={tube.geometry}>
          <meshBasicMaterial
            ref={(ref) => {
              if (ref) matRefs.current.set(tube.key, ref);
            }}
            color={tube.color}
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
