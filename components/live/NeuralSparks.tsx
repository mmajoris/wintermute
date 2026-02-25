"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { buildPathwayCurves } from "@/lib/pathway-curves";

const SPARK_TRAVEL_TIME = 600;
const TRAIL_COUNT = 4;
const TRAIL_SPACING = 0.06;
const MAX_SPARKS = 60;
const INSTANCES_PER_SPARK = 1 + TRAIL_COUNT; // head + trail
const MAX_INSTANCES = MAX_SPARKS * INSTANCES_PER_SPARK;

const TRAIL_SCALES = [1.0, 0.7, 0.45, 0.25];
const TRAIL_ALPHAS = [1.0, 0.55, 0.25, 0.08];

interface ActiveSpark {
  curveIndex: number;
  startedAt: number;
  intensity: number;
}

const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

export default function NeuralSparks() {
  const allCurves = useMemo(() => buildPathwayCurves(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const seenActivations = useRef<Set<string>>(new Set());
  const activeSparks = useRef<ActiveSpark[]>([]);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.15, 8, 6), []);
  const sparkMat = useMemo(() => {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      depthWrite: false,
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

      // Head spark
      const headPos = curve.curve.getPointAt(Math.min(progress, 1));
      _dummy.position.copy(headPos);
      _dummy.scale.setScalar(1.0);
      _dummy.updateMatrix();
      meshRef.current.setMatrixAt(instanceIndex, _dummy.matrix);
      _color.copy(curve.color).multiplyScalar(1.5 * spark.intensity);
      meshRef.current.setColorAt(instanceIndex, _color);
      instanceIndex++;

      // Trail points
      for (let t = 0; t < TRAIL_COUNT; t++) {
        const trailProgress = progress - TRAIL_SPACING * (t + 1);
        if (trailProgress < 0 || instanceIndex >= MAX_INSTANCES) {
          // Hide off-screen
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

        const trailPos = curve.curve.getPointAt(Math.min(trailProgress, 1));
        _dummy.position.copy(trailPos);
        _dummy.scale.setScalar(TRAIL_SCALES[t]);
        _dummy.updateMatrix();
        meshRef.current.setMatrixAt(instanceIndex, _dummy.matrix);
        _color.copy(curve.color).multiplyScalar(TRAIL_ALPHAS[t] * spark.intensity);
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
      args={[sphereGeo, sparkMat, MAX_INSTANCES]}
      frustumCulled={false}
    />
  );
}
