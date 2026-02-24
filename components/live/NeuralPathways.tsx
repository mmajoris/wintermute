"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import {
  NEUROTRANSMITTER_PATHWAYS,
  REGION_CENTERS,
} from "@/lib/collection-mapping";

const PATHWAY_LIFETIME = 3000;

interface PathwayLine {
  pathway: string;
  source: string;
  target: string;
  color: THREE.Color;
  curve: THREE.CatmullRomCurve3;
}

function buildPathwayLines(): PathwayLine[] {
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
      // Arc the curve slightly outward for visual clarity
      mid.y += 1.5;
      mid.z += 0.5;

      const curve = new THREE.CatmullRomCurve3([src, mid, tgt], false, "catmullrom", 0.5);

      lines.push({
        pathway: name,
        source: pathway.source,
        target,
        color: new THREE.Color(pathway.color),
        curve,
      });
    }
  }

  return lines;
}

function PathwayArc({ line, intensity }: { line: PathwayLine; intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  const tubeGeo = useMemo(() => {
    return new THREE.TubeGeometry(line.curve, 32, 0.12, 6, false);
  }, [line.curve]);

  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = intensity * 0.9;
  });

  if (intensity < 0.01) return null;

  return (
    <mesh ref={meshRef} geometry={tubeGeo}>
      <meshBasicMaterial
        ref={matRef}
        color={line.color}
        transparent
        opacity={intensity * 0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function NeuralPathways() {
  const { pathwayActivations } = useLiveStore();

  const allLines = useMemo(() => buildPathwayLines(), []);

  // Build a map of active pathway names to their current intensity
  const activePathways = useMemo(() => {
    const map = new Map<string, number>();
    const now = Date.now();
    for (const activation of pathwayActivations) {
      const elapsed = now - activation.startedAt;
      if (elapsed < PATHWAY_LIFETIME) {
        const progress = elapsed / PATHWAY_LIFETIME;
        const fade = progress < 0.2
          ? progress / 0.2
          : 1 - ((progress - 0.2) / 0.8);
        const current = map.get(activation.pathway) || 0;
        map.set(activation.pathway, Math.max(current, fade * activation.intensity));
      }
    }
    return map;
  }, [pathwayActivations]);

  if (activePathways.size === 0) return null;

  return (
    <group>
      {allLines
        .filter((line) => activePathways.has(line.pathway))
        .map((line, i) => (
          <PathwayArc
            key={`${line.pathway}-${line.target}-${i}`}
            line={line}
            intensity={activePathways.get(line.pathway) || 0}
          />
        ))}
    </group>
  );
}
