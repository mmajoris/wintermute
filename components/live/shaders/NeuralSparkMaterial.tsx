"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const NeuralSparkShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  /* vertex - instanceMatrix is injected by Three.js; instanceColor we must declare */
  `
    attribute vec3 instanceColor;
    varying vec3 vInstanceColor;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vInstanceColor = instanceColor;
      vec4 instPos = instanceMatrix * vec4(position, 1.0);
      mat3 im = mat3(instanceMatrix);
      vec3 instNormal = normalize((inverse(transpose(im)) * normal));
      vNormal = normalize((modelViewMatrix * vec4(instNormal, 0.0)).xyz);
      vec4 mvPosition = modelViewMatrix * instPos;
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  /* fragment */
  `
    uniform float time;

    varying vec3 vInstanceColor;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 viewDir = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);

      // Volumetric falloff: bright hot core, soft edge halo
      float fresnel = 1.0 - abs(dot(normal, viewDir));
      float core = 1.0 - pow(fresnel, 1.5);
      float halo = pow(fresnel, 2.0);

      vec3 glow = vInstanceColor * (core * 2.5 + halo * 0.6);
      glow = clamp(glow, vec3(0.0), vec3(8.0));

      float alpha = core * 0.95 + halo * 0.4;
      alpha = clamp(alpha, 0.0, 1.0);

      gl_FragColor = vec4(glow, alpha);
    }
  `
);

extend({ NeuralSparkShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    neuralSparkShaderMaterial: React.JSX.IntrinsicElements["shaderMaterial"] & {
      time?: number;
    };
  }
}

export { NeuralSparkShaderMaterial };
