"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
  brightness: number;
}

const PARTICLE_COUNT = 150;
const BRAIN_BOUNDS = {
  min: new THREE.Vector3(-8, 0, -6),
  max: new THREE.Vector3(8, 16, 6),
};

export default function NeuralParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { eventsPerSecond, regionActivity, thoughtLoopPulse } = useLiveStore();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      position: new THREE.Vector3(
        THREE.MathUtils.randFloat(BRAIN_BOUNDS.min.x, BRAIN_BOUNDS.max.x),
        THREE.MathUtils.randFloat(BRAIN_BOUNDS.min.y, BRAIN_BOUNDS.max.y),
        THREE.MathUtils.randFloat(BRAIN_BOUNDS.min.z, BRAIN_BOUNDS.max.z)
      ),
      velocity: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(0.02),
        THREE.MathUtils.randFloat(0.01, 0.04),
        THREE.MathUtils.randFloatSpread(0.02)
      ),
      life: Math.random(),
      maxLife: THREE.MathUtils.randFloat(2, 5),
      size: THREE.MathUtils.randFloat(0.08, 0.25),
      brightness: Math.random(),
    }));
  }, []);

  // Initialize positions array with particle data
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = particles[i].position.x;
      pos[i * 3 + 1] = particles[i].position.y;
      pos[i * 3 + 2] = particles[i].position.z;
    }
    return pos;
  }, [particles]);

  const colors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      col[i * 3] = 0;
      col[i * 3 + 1] = 0.83;
      col[i * 3 + 2] = 1;
    }
    return col;
  }, []);

  const sizes = useMemo(() => {
    const siz = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      siz[i] = particles[i].size;
    }
    return siz;
  }, [particles]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const colAttr = geometry.attributes.color as THREE.BufferAttribute;

    if (!posAttr || !colAttr) return;

    const activityLevel = Math.min(eventsPerSecond / 20, 1);
    const totalRegionActivity = Array.from(regionActivity.values()).reduce(
      (sum, r) => sum + r.intensity,
      0
    );
    const normalizedActivity = Math.min(totalRegionActivity / 5, 1);

    const cyanColor = new THREE.Color(0x00d4ff);
    const orangeColor = new THREE.Color(0xff6b35);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      p.life += delta / p.maxLife;

      if (p.life >= 1) {
        p.life = 0;
        p.maxLife = THREE.MathUtils.randFloat(2, 5);
        p.position.set(
          THREE.MathUtils.randFloat(BRAIN_BOUNDS.min.x, BRAIN_BOUNDS.max.x),
          BRAIN_BOUNDS.min.y + Math.random() * 2,
          THREE.MathUtils.randFloat(BRAIN_BOUNDS.min.z, BRAIN_BOUNDS.max.z)
        );
        p.velocity.set(
          THREE.MathUtils.randFloatSpread(0.02),
          THREE.MathUtils.randFloat(0.02, 0.06) * (1 + activityLevel),
          THREE.MathUtils.randFloatSpread(0.02)
        );
        p.brightness = Math.random();
      }

      const speedMult = 1 + activityLevel * 2 + thoughtLoopPulse * 0.5;
      p.position.add(p.velocity.clone().multiplyScalar(speedMult));

      const toCenter = new THREE.Vector3(0, 8, 0).sub(p.position).normalize();
      p.position.add(toCenter.multiplyScalar(0.002));

      if (p.position.y > BRAIN_BOUNDS.max.y) p.life = 1;
      p.position.x = THREE.MathUtils.clamp(p.position.x, BRAIN_BOUNDS.min.x, BRAIN_BOUNDS.max.x);
      p.position.z = THREE.MathUtils.clamp(p.position.z, BRAIN_BOUNDS.min.z, BRAIN_BOUNDS.max.z);

      posAttr.setXYZ(i, p.position.x, p.position.y, p.position.z);

      const lifeFade = p.life < 0.1 ? p.life / 0.1 : p.life > 0.8 ? (1 - p.life) / 0.2 : 1;
      const isActiveParticle = p.brightness > 0.7 && normalizedActivity > 0.3;
      const particleColor = isActiveParticle
        ? orangeColor.clone().lerp(whiteColor, normalizedActivity * 0.3)
        : cyanColor.clone().lerp(whiteColor, p.brightness * 0.2);

      colAttr.setXYZ(i, particleColor.r * lifeFade, particleColor.g * lifeFade, particleColor.b * lifeFade);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
