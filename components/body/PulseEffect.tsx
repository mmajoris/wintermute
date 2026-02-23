"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PulseEffectProps {
  path: THREE.Vector3[];
  color: string;
  speed?: number;
  count?: number;
}

export default function PulseEffect({
  path,
  color,
  speed = 1,
  count = 5,
}: PulseEffectProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const curve = useMemo(() => {
    if (path.length < 2) return null;
    return new THREE.CatmullRomCurve3(path);
  }, [path]);

  const [positions, particleCount] = useMemo(() => {
    if (!curve) return [new Float32Array(0), 0];
    const arr = new Float32Array(count * 3);
    return [arr, count];
  }, [curve, count]);

  useFrame(({ clock }) => {
    if (!curve || !pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const t = clock.getElapsedTime() * speed;

    for (let i = 0; i < particleCount; i++) {
      const frac = ((t + i / particleCount) % 1);
      const point = curve.getPointAt(frac);
      posAttr.setXYZ(i, point.x, point.y, point.z);
    }
    posAttr.needsUpdate = true;
  });

  if (!curve) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
