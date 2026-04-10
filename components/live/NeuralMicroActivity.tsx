"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLiveStore } from "@/lib/live-store";
import { BRAIN_REGIONS_3D } from "@/lib/brain-anatomy-3d";

const CORTEX_POINTS = 2800;
const CEREBELLUM_POINTS = 500;
const DEEP_POINTS_PER_ENTRY = 50;
const MAX_REGIONS = 64;

const BRAIN_CY = 11;
const BRAIN_CZ = -0.5;

const CB_CX = 0, CB_CY = 5.5, CB_CZ = -4.5;
const CB_RX = 3.5, CB_RY = 1.8, CB_RZ = 2.5;

// Per-region electrophysiological firing characteristics
interface FireProfile {
  baseRate: number;   // spontaneous firing rate (Hz)
  rateGain: number;   // additional Hz at full activation
  flashScale: number; // visual brightness/size multiplier (inverse-ish of rate)
}

const FIRE_PROFILES: Record<string, FireProfile> = {
  // Cortical pyramidal neurons: 1-20 Hz typical range
  "left-hemisphere":   { baseRate: 1.0,  rateGain: 18.0, flashScale: 1.0  },
  "right-hemisphere":  { baseRate: 1.0,  rateGain: 18.0, flashScale: 1.0  },
  // Purkinje cells: 40-100 Hz spontaneous, most active cells in the brain
  "cerebellum":        { baseRate: 35.0, rateGain: 60.0, flashScale: 0.22 },
  // Thalamic relay neurons: 2-10 Hz tonic, burst mode much faster
  "thalamus":          { baseRate: 2.0,  rateGain: 28.0, flashScale: 0.7  },
  // Medium spiny neurons (MSNs): extremely quiet at rest (~0.1-1 Hz)
  "caudate-nucleus":   { baseRate: 0.2,  rateGain: 22.0, flashScale: 1.2  },
  "putamen":           { baseRate: 0.2,  rateGain: 22.0, flashScale: 1.2  },
  // GPe/GPi: high tonic discharge rate (25-80 Hz)
  "globus-pallidus":   { baseRate: 25.0, rateGain: 50.0, flashScale: 0.28 },
  // NAc MSNs: quiet like dorsal striatum
  "nucleus-accumbens": { baseRate: 0.3,  rateGain: 18.0, flashScale: 1.1  },
  // Hippocampal place cells: sparse coding, low baseline
  "hippocampus":       { baseRate: 0.5,  rateGain: 18.0, flashScale: 1.0  },
  // Amygdala projection neurons: moderate spontaneous rate
  "amygdala":          { baseRate: 2.0,  rateGain: 25.0, flashScale: 0.8  },
  // Hypothalamic neuroendocrine neurons: moderate tonic
  "hypothalamus":      { baseRate: 3.0,  rateGain: 12.0, flashScale: 0.7  },
  // Midbrain (SN/VTA dopaminergic + reticular): moderate spontaneous
  "midbrain":          { baseRate: 5.0,  rateGain: 20.0, flashScale: 0.6  },
  // Pontine nuclei: moderate relay activity
  "pons":              { baseRate: 4.0,  rateGain: 16.0, flashScale: 0.6  },
  // Medullary autonomic centers: steady moderate rate
  "medulla":           { baseRate: 3.0,  rateGain: 12.0, flashScale: 0.7  },
};

const DEFAULT_PROFILE: FireProfile = { baseRate: 1.0, rateGain: 15.0, flashScale: 1.0 };

const STORE_IDS: string[] = [];
const REGION_INDEX: Map<string, number> = new Map();

function regIdx(storeId: string): number {
  let i = REGION_INDEX.get(storeId);
  if (i !== undefined) return i;
  i = STORE_IDS.length;
  STORE_IDS.push(storeId);
  REGION_INDEX.set(storeId, i);
  return i;
}

regIdx("left-hemisphere");
regIdx("right-hemisphere");
regIdx("cerebellum");
for (const r of BRAIN_REGIONS_3D) {
  if (r.storeId) regIdx(r.storeId);
}
const TOTAL_REGIONS = STORE_IDS.length;

function buildFireRateArrays(): {
  baseRates: Float32Array;
  rateGains: Float32Array;
  flashScales: Float32Array;
} {
  const baseRates = new Float32Array(MAX_REGIONS);
  const rateGains = new Float32Array(MAX_REGIONS);
  const flashScales = new Float32Array(MAX_REGIONS);

  for (let i = 0; i < TOTAL_REGIONS; i++) {
    const p = FIRE_PROFILES[STORE_IDS[i]] ?? DEFAULT_PROFILE;
    baseRates[i] = p.baseRate;
    rateGains[i] = p.rateGain;
    flashScales[i] = p.flashScale;
  }

  return { baseRates, rateGains, flashScales };
}

interface SampledPoints {
  positions: Float32Array;
  regionIndices: Float32Array;
  seeds: Float32Array;
  count: number;
}

function buildPoints(): SampledPoints {
  const deepEntries = BRAIN_REGIONS_3D.filter((r) => r.storeId);
  const totalDeep = deepEntries.length * DEEP_POINTS_PER_ENTRY;
  const total = CORTEX_POINTS + CEREBELLUM_POINTS + totalDeep;

  const positions = new Float32Array(total * 3);
  const regionIndices = new Float32Array(total);
  const seeds = new Float32Array(total);
  let idx = 0;

  const leftIdx = REGION_INDEX.get("left-hemisphere")!;
  const rightIdx = REGION_INDEX.get("right-hemisphere")!;

  for (let i = 0; i < CORTEX_POINTS; i++) {
    const theta = Math.random() * Math.PI * 2;
    const cosPhi = 2 * Math.random() - 1;
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);

    const latR = 6.5;
    const vertR = 7.5;
    const apR = Math.sin(theta) > 0 ? 5.2 : 5.8;

    let x = sinPhi * Math.cos(theta) * latR;
    const y = cosPhi * vertR;
    const z = sinPhi * Math.sin(theta) * apR;

    const yNorm = (y + vertR) / (2 * vertR);
    if (Math.abs(x) < 1.0 && yNorm > 0.55) {
      const depth = (1 - Math.abs(x)) * (yNorm - 0.55) * 2.2;
      x += (x < 0 ? -1 : x > 0 ? 1 : Math.random() > 0.5 ? 1 : -1) * depth * 1.5;
    }

    const noise = 0.92 + Math.random() * 0.16;
    positions[idx * 3] = x * noise;
    positions[idx * 3 + 1] = y * noise + BRAIN_CY;
    positions[idx * 3 + 2] = z * noise + BRAIN_CZ;
    regionIndices[idx] = x < 0 ? leftIdx : rightIdx;
    seeds[idx] = Math.random();
    idx++;
  }

  const cbIdx = REGION_INDEX.get("cerebellum")!;
  for (let i = 0; i < CEREBELLUM_POINTS; i++) {
    const theta = Math.random() * Math.PI * 2;
    const cosPhi = 2 * Math.random() - 1;
    const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
    const noise = 0.9 + Math.random() * 0.2;

    positions[idx * 3] = sinPhi * Math.cos(theta) * CB_RX * noise + CB_CX;
    positions[idx * 3 + 1] = cosPhi * CB_RY * noise + CB_CY;
    positions[idx * 3 + 2] = sinPhi * Math.sin(theta) * CB_RZ * noise + CB_CZ;
    regionIndices[idx] = cbIdx;
    seeds[idx] = Math.random();
    idx++;
  }

  for (const entry of deepEntries) {
    const rIdx = REGION_INDEX.get(entry.storeId!)!;
    const [cx, cy, cz] = entry.center;
    const [rx, ry, rz] = entry.radii;

    for (let i = 0; i < DEEP_POINTS_PER_ENTRY; i++) {
      const theta = Math.random() * Math.PI * 2;
      const cosPhi = 2 * Math.random() - 1;
      const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
      const noise = 0.85 + Math.random() * 0.3;

      positions[idx * 3] = sinPhi * Math.cos(theta) * rx * noise + cx;
      positions[idx * 3 + 1] = cosPhi * ry * noise + cy;
      positions[idx * 3 + 2] = sinPhi * Math.sin(theta) * rz * noise + cz;
      regionIndices[idx] = rIdx;
      seeds[idx] = Math.random();
      idx++;
    }
  }

  return { positions, regionIndices, seeds, count: idx };
}

const vertexShader = /* glsl */ `
uniform float time;
uniform float regionIntensities[${MAX_REGIONS}];
uniform float regionBaseRates[${MAX_REGIONS}];
uniform float regionRateGains[${MAX_REGIONS}];
uniform float regionFlashScales[${MAX_REGIONS}];
uniform float connected;

attribute float regionIdx;
attribute float seed;

varying float vBrightness;

float hash2(float a, float b) {
  return fract(sin(a * 12.9898 + b * 78.233) * 43758.5453);
}

void main() {
  int rIdx = int(regionIdx + 0.5);
  float intensity = regionIntensities[rIdx];

  if (intensity < -0.5) {
    gl_PointSize = 0.0;
    gl_Position = vec4(0.0, 0.0, -2.0, 1.0);
    vBrightness = 0.0;
    return;
  }

  float baseRate = regionBaseRates[rIdx];
  float rateGain = regionRateGains[rIdx];
  float fScale = regionFlashScales[rIdx];

  float rate = baseRate + intensity * connected * rateGain
             + (1.0 - connected) * baseRate * 0.6;

  float phase = time * rate + seed * 137.0;
  float beat = floor(phase);
  float t = fract(phase);

  float shouldFire = step(0.65, hash2(beat, seed * 73.1));

  float flash = shouldFire * smoothstep(0.0, 0.04, t) * exp(-t * 10.0) * fScale;

  float twinkle = hash2(beat * 0.037, seed) * 0.04 * fScale
                * (0.15 + intensity * 0.85);

  vBrightness = flash + twinkle;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float dist = -mvPosition.z;
  float sizeAtten = 280.0 / max(dist, 1.0);

  gl_PointSize = max(0.0, (0.6 + flash * 5.0 * fScale) * sizeAtten);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
varying float vBrightness;

void main() {
  float dist = length(gl_PointCoord - 0.5) * 2.0;
  if (dist > 1.0) discard;

  float glow = exp(-dist * dist * 2.5);

  vec3 hotColor = vec3(1.0, 0.95, 0.85);
  vec3 coolColor = vec3(0.25, 0.75, 1.0);
  vec3 color = mix(coolColor, hotColor, clamp(vBrightness * 3.0, 0.0, 1.0));

  float alpha = glow * vBrightness;
  if (alpha < 0.002) discard;

  gl_FragColor = vec4(color * alpha * 2.5, alpha);
}
`;

interface NeuralMicroActivityProps {
  visibleRegions: Set<string>;
}

export default function NeuralMicroActivity({ visibleRegions }: NeuralMicroActivityProps) {
  const visibleRef = useRef(visibleRegions);
  visibleRef.current = visibleRegions;

  const { positions, regionIndices: rIndices, seeds } = useMemo(() => buildPoints(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("regionIdx", new THREE.BufferAttribute(rIndices, 1));
    geo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [positions, rIndices, seeds]);

  const material = useMemo(() => {
    const { baseRates, rateGains, flashScales } = buildFireRateArrays();
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        regionIntensities: { value: new Float32Array(MAX_REGIONS) },
        regionBaseRates: { value: baseRates },
        regionRateGains: { value: rateGains },
        regionFlashScales: { value: flashScales },
        connected: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame(({ clock }) => {
    const { regionActivity, mollyAwake } = useLiveStore.getState();
    const vr = visibleRef.current;
    const arr = material.uniforms.regionIntensities.value as Float32Array;

    for (let i = 0; i < TOTAL_REGIONS; i++) {
      const storeId = STORE_IDS[i];
      if (!vr.has(storeId)) {
        arr[i] = -1;
        continue;
      }
      const activity = regionActivity.get(storeId);
      arr[i] = activity?.intensity ?? 0;
    }

    material.uniforms.time.value = clock.getElapsedTime();
    material.uniforms.connected.value = mollyAwake ? 1.0 : 0.0;
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
