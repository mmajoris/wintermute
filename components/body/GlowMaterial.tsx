"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

const GlowShaderMaterial = shaderMaterial(
  {
    color: new THREE.Color("#6366f1"),
    opacity: 0.6,
    glowIntensity: 0.0,
    time: 0,
    selected: 0,
    hovered: 0,
  },
  `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  `
    uniform vec3 color;
    uniform float opacity;
    uniform float glowIntensity;
    uniform float time;
    uniform float selected;
    uniform float hovered;

    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      float fresnel = 1.0 - abs(dot(normal, viewDir));
      fresnel = pow(fresnel, 2.0);
      
      vec3 baseColor = color;
      float alpha = opacity;
      
      float hoverGlow = hovered * 0.3 * fresnel;
      baseColor += vec3(hoverGlow);
      alpha += hovered * 0.15;
      
      float pulse = sin(time * 3.0) * 0.15 + 0.85;
      float selectGlow = selected * 0.4 * fresnel * pulse;
      baseColor += vec3(selectGlow) * color;
      alpha += selected * 0.2 * pulse;
      
      baseColor += color * glowIntensity * fresnel * 0.5;
      
      gl_FragColor = vec4(baseColor, alpha);
    }
  `
);

extend({ GlowShaderMaterial });

export { GlowShaderMaterial };
