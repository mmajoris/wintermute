"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const NeuralPathwayShaderMaterial = shaderMaterial(
  {
    color: new THREE.Color(1, 0.6, 0.2),
    opacity: 0,
    fresnelPower: 2.2,
    coreStrength: 1.0,
    time: 0,
  },
  /* vertex */
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* fragment */
  `
    uniform vec3 color;
    uniform float opacity;
    uniform float fresnelPower;
    uniform float coreStrength;
    uniform float time;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;

    void main() {
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      float fresnel = 1.0 - abs(dot(normal, viewDir));
      fresnel = pow(fresnel, fresnelPower);

      // Longitudinal shimmer - subtle energy flow along path
      float flow = sin(vUv.x * 12.0 + time * 2.0) * 0.5 + 0.5;
      flow = pow(flow, 2.0) * coreStrength;

      vec3 glow = color * (fresnel * 0.9 + flow * 0.25 + 0.1);
      glow = clamp(glow, vec3(0.0), vec3(2.0));

      float alpha = opacity * (fresnel * 0.85 + flow * 0.3 + 0.08);
      alpha = clamp(alpha, 0.0, 1.0);

      gl_FragColor = vec4(glow, alpha);
    }
  `
);

extend({ NeuralPathwayShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    neuralPathwayShaderMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      color?: THREE.Color;
      opacity?: number;
      fresnelPower?: number;
      coreStrength?: number;
      time?: number;
    };
  }
}

export { NeuralPathwayShaderMaterial };
