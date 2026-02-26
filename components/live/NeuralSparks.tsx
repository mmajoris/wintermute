"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { buildPathwayCurves } from "@/lib/pathway-curves";
import { getContainingRegion } from "@/lib/region-visibility";

const SPARK_TRAVEL_TIME = 500;
const TRAIL_COUNT = 6;
const TRAIL_SPACING = 0.035;
const MAX_SPARKS = 80;
const INSTANCES_PER_SPARK = 1 + TRAIL_COUNT;
const MAX_INSTANCES = MAX_SPARKS * INSTANCES_PER_SPARK;

const TRAIL_SCALES = [0.7, 0.5, 0.35, 0.22, 0.12, 0.05];
const TRAIL_ALPHAS = [0.8, 0.5, 0.3, 0.15, 0.07, 0.02];

const SPARK_ORANGE = new THREE.Color(1.0, 0.55, 0.05);
const SPARK_WHITE_HOT = new THREE.Color(1.0, 0.9, 0.7);

interface ActiveSpark {
  curveIndex: number;
  startedAt: number;
  intensity: number;
}

const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

interface NeuralSparksProps {
  visibleRegions: Set<string>;
}

export default function NeuralSparks({ visibleRegions }: NeuralSparksProps) {
  const allCurves = useMemo(() => buildPathwayCurves(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const seenActivations = useRef<Set<string>>(new Set());
  const activeSparks = useRef<ActiveSpark[]>([]);

  const sparkGeo = useMemo(() => new THREE.IcosahedronGeometry(0.028, 1), []);
  const sparkMat = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      toneMapped: false,
    });
    mat.blending = THREE.AdditiveBlending;
    return mat;
  }, []);

  // Build a lookup from pathway name to curve indices
  const pathwayToCurves = useMemo(() => {
    const map = new Map<string, number[]>();
    allCurves.forEach((c, i) => {
      const existing = map.get(c.pathway) || [];
      existing.push(i);
      map.set(c.pathway, existing);
    });
    return map;
  }, [allCurves]);

  // Determine which curve indices are visible based on source/target regions
  const visibleCurveIndices = useMemo(() => {
    const visible = new Set<number>();
    allCurves.forEach((c, i) => {
      const sourceVisible = getContainingRegion(c.source, visibleRegions);
      const targetVisible = getContainingRegion(c.target, visibleRegions);
      if (sourceVisible && targetVisible) {
        visible.add(i);
      }
    });
    return visible;
  }, [allCurves, visibleRegions]);

  useFrame(() => {
    if (!meshRef.current) return;

    const { pathwayActivations } = useLiveStore.getState();
    const now = Date.now();
    const sparks = activeSparks.current;

    // Spawn new sparks from activations we haven't seen
    for (const activation of pathwayActivations) {
      const id = `${activation.pathway}-${activation.startedAt}`;
      if (seenActivations.current.has(id)) continue;
      seenActivations.current.add(id);

      const curveIndices = pathwayToCurves.get(activation.pathway);
      if (!curveIndices) continue;

      for (const ci of curveIndices) {
        if (sparks.length >= MAX_SPARKS) break;
        sparks.push({
          curveIndex: ci,
          startedAt: now,
          intensity: activation.intensity,
        });
      }
    }

    // Clean up old seen IDs (keep last 5 seconds)
    if (seenActivations.current.size > 200) {
      const cutoff = now - 5000;
      const newSeen = new Set<string>();
      for (const id of seenActivations.current) {
        const ts = parseInt(id.split("-").pop() || "0");
        if (ts > cutoff) newSeen.add(id);
      }
      seenActivations.current = newSeen;
    }

    let instanceIndex = 0;

    // Update active sparks
    let writeIndex = 0;
    for (let i = 0; i < sparks.length; i++) {
      const spark = sparks[i];
      const elapsed = now - spark.startedAt;
      const progress = elapsed / SPARK_TRAVEL_TIME;

      if (progress > 1.0) continue; // spark finished
      sparks[writeIndex++] = spark; // compact the array

      const curve = allCurves[spark.curveIndex];
      if (!curve) continue;

      // Skip rendering if the curve's regions are hidden
      if (!visibleCurveIndices.has(spark.curveIndex)) continue;

      const headT = Math.min(progress, 1);
      const headPos = curve.curve.getPointAt(headT);

      // Stretch the head spark along the travel direction
      const tangent = curve.curve.getTangentAt(headT);
      _dummy.position.copy(headPos);
      _dummy.scale.set(1.0, 1.0, 2.5);
      _dummy.lookAt(headPos.x + tangent.x, headPos.y + tangent.y, headPos.z + tangent.z);
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(instanceIndex, _dummy.matrix);
      _color.copy(SPARK_WHITE_HOT).multiplyScalar(3.0 * spark.intensity);
      meshRef.current.setColorAt(instanceIndex, _color);
      instanceIndex++;

      // Trail points — progressively dimmer and more orange
      for (let t = 0; t < TRAIL_COUNT; t++) {
        const trailProgress = progress - TRAIL_SPACING * (t + 1);
        if (trailProgress < 0 || instanceIndex >= MAX_INSTANCES) {
          _dummy.position.set(0, -100, 0);
          _dummy.scale.setScalar(0);
          _dummy.updateMatrix();
          meshRef.current.setMatrixAt(instanceIndex, _dummy.matrix);
          if (meshRef.current.instanceColor) {
            meshRef.current.setColorAt(instanceIndex, _color.setScalar(0));
          }
          instanceIndex++;
          continue;
        }

        const trailT = Math.min(trailProgress, 1);
        const trailPos = curve.curve.getPointAt(trailT);
        const trailTangent = curve.curve.getTangentAt(trailT);
        const s = TRAIL_SCALES[t];
        _dummy.position.copy(trailPos);
        _dummy.scale.set(s, s, s * 1.8);
        _dummy.lookAt(trailPos.x + trailTangent.x, trailPos.y + trailTangent.y, trailPos.z + trailTangent.z);
        _dummy.updateMatrix();
        meshRef.current.setMatrixAt(instanceIndex, _dummy.matrix);

        const orangeMix = Math.min(1, (t + 1) / TRAIL_COUNT);
        _color.copy(SPARK_WHITE_HOT).lerp(SPARK_ORANGE, orangeMix).multiplyScalar(TRAIL_ALPHAS[t] * spark.intensity * 2.5);
        meshRef.current.setColorAt(instanceIndex, _color);
        instanceIndex++;
      }
    }
    sparks.length = writeIndex;

    // Hide remaining instances
    for (let i = instanceIndex; i < MAX_INSTANCES; i++) {
      _dummy.position.set(0, -100, 0);
      _dummy.scale.setScalar(0);
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, _dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[sparkGeo, sparkMat, MAX_INSTANCES]}
      frustumCulled={false}
    />
  );
}
