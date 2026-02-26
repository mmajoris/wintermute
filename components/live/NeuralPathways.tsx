"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { buildPathwayCurves } from "@/lib/pathway-curves";
import { NeuralPathwayShaderMaterial } from "./shaders/NeuralPathwayMaterial";
import { getContainingRegion } from "@/lib/region-visibility";

const PATHWAY_LIFETIME = 2000;

// Higher-res tubes: more radial segments for smooth cinematic glow
const OUTER_RADIUS = 0.048;
const INNER_RADIUS = 0.014;
const RADIAL_SEGMENTS = 16;
const TUBULAR_SEGMENTS = 48;

interface NeuralPathwaysProps {
  visibleRegions: Set<string>;
}

export default function NeuralPathways({ visibleRegions }: NeuralPathwaysProps) {
  const allCurves = useMemo(() => buildPathwayCurves(), []);

  const tubePairs = useMemo(() => {
    return allCurves.map((c) => {
      const outerMat = new NeuralPathwayShaderMaterial();
      const innerMat = new NeuralPathwayShaderMaterial();
      outerMat.transparent = true;
      outerMat.depthWrite = false;
      outerMat.blending = THREE.AdditiveBlending;
      outerMat.side = THREE.DoubleSide;
      innerMat.transparent = true;
      innerMat.depthWrite = false;
      innerMat.blending = THREE.AdditiveBlending;
      innerMat.side = THREE.DoubleSide;
      return {
        key: c.key,
        pathway: c.pathway,
        source: c.source,
        target: c.target,
        color: c.color,
        outerGeo: new THREE.TubeGeometry(c.curve, TUBULAR_SEGMENTS, OUTER_RADIUS, RADIAL_SEGMENTS, false),
        innerGeo: new THREE.TubeGeometry(c.curve, TUBULAR_SEGMENTS, INNER_RADIUS, RADIAL_SEGMENTS, false),
        outerMat,
        innerMat,
      };
    });
  }, [allCurves]);

  // Determine which tubes are visible based on source/target regions
  const visibleTubes = useMemo(() => {
    return new Set(
      tubePairs
        .filter((tube) => {
          const sourceVisible = getContainingRegion(tube.source, visibleRegions);
          const targetVisible = getContainingRegion(tube.target, visibleRegions);
          return sourceVisible && targetVisible;
        })
        .map((tube) => tube.key)
    );
  }, [tubePairs, visibleRegions]);

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

    const t = now * 0.001;
    for (const tube of tubePairs) {
      const intensity = intensities.get(tube.pathway) || 0;
      tube.outerMat.uniforms.opacity.value = intensity * 0.5;
      tube.outerMat.uniforms.time.value = t;
      tube.outerMat.uniforms.color.value.copy(tube.color);
      tube.innerMat.uniforms.opacity.value = intensity * 0.9;
      tube.innerMat.uniforms.time.value = t;
      tube.innerMat.uniforms.color.value.copy(tube.color);
      tube.innerMat.uniforms.coreStrength.value = 1.2;
    }
  });

  return (
    <group>
      {tubePairs.map((tube) => (
        <group key={tube.key} visible={visibleTubes.has(tube.key)}>
          <mesh geometry={tube.outerGeo} material={tube.outerMat} />
          <mesh geometry={tube.innerGeo} material={tube.innerMat} />
        </group>
      ))}
    </group>
  );
}
