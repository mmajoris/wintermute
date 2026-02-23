"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import {
  Color,
  DoubleSide,
  AdditiveBlending,
} from "three";

const NeuralBrainShaderMaterial = shaderMaterial(
  {
    time: 0,
    fresnelAmount: 0.65,
    fresnelOpacity: 1.0,
    outerColor: new Color(0x8844cc),    // Purple for outer edges
    innerColor: new Color(0x22aaff),    // Cyan-blue for inner glow
    accentColor: new Color(0xcc44aa),   // Pink/magenta accent
    hologramBrightness: 0.8,
    hologramOpacity: 1.0,
    noiseScale: 0.8,
    layerDepth: 0.0,   // 0 = outer, 0.5 = mid, 1.0 = inner
  },
  // Vertex shader
  /*glsl*/ `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vPositionW;
    varying vec3 vNormalW;
    varying vec3 vLocalPos;
    varying vec4 vPos;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vLocalPos = position;
      
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vPositionW = (modelMatrix * vec4(position, 1.0)).xyz;
      vNormalW = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
      vPos = projectionMatrix * mvPosition;
      
      gl_Position = vPos;
    }
  `,
  // Fragment shader
  /*glsl*/ `
    uniform float time;
    uniform float fresnelAmount;
    uniform float fresnelOpacity;
    uniform vec3 outerColor;
    uniform vec3 innerColor;
    uniform vec3 accentColor;
    uniform float hologramBrightness;
    uniform float hologramOpacity;
    uniform float noiseScale;
    uniform float layerDepth;
    
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    varying vec3 vPositionW;
    varying vec3 vNormalW;
    varying vec3 vLocalPos;
    varying vec4 vPos;
    
    // Simplex-style noise for organic variation
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    void main() {
      // Fresnel - bright at edges, transparent in center
      vec3 viewDir = normalize(cameraPosition - vPositionW);
      float fresnelBase = dot(viewDir, vNormalW);
      float fresnel = clamp(fresnelAmount - fresnelBase * (1.6 - fresnelOpacity / 2.0), 0.0, fresnelOpacity);
      
      // Noise in local space with slow time drift
      float t = time * 0.15;
      float noise = snoise(vLocalPos * noiseScale + t) * 0.5 + 0.5;
      
      // Single vein/pathway pattern with slower drift
      float veins = abs(snoise(vLocalPos * noiseScale * 1.5 + t * 0.7));
      veins = clamp(1.0 - veins, 0.0, 1.0);
      veins = veins * veins * veins;
      
      float veinIntensity = clamp(veins, 0.0, 1.0);
      
      // Color gradient: purple at edges -> cyan at center/veins
      // Outer layers are more purple, inner layers more cyan
      float colorMix = fresnel * 0.6 + (1.0 - layerDepth) * 0.4;
      vec3 surfaceColor = mix(innerColor, outerColor, colorMix);
      
      // Veins glow brighter cyan/white
      vec3 veinColor = mix(innerColor, vec3(0.7, 0.85, 1.0), 0.4);
      
      // Accent color mixed in via noise for variation
      vec3 accentMix = accentColor * noise * 0.2 * (1.0 - layerDepth);
      
      // Inner glow
      float innerGlow = (1.0 - fresnel) * noise * 0.2 * (0.3 + layerDepth * 0.7);
      
      // Compose final color - noise is a subtle undertone, not dominant
      vec3 finalColor = surfaceColor * hologramBrightness * (fresnel * 0.8 + innerGlow);
      finalColor += veinColor * veinIntensity * 0.25 * hologramBrightness;
      finalColor += accentMix * 0.6;
      
      // Subtle vein brightening
      finalColor += vec3(0.8, 0.9, 1.0) * veinIntensity * veinIntensity * 0.08;
      finalColor = clamp(finalColor, 0.0, 2.0);
      
      // Opacity: fresnel edges dominant, veins as subtle accent
      float fillAmount = mix(0.0, 0.05, layerDepth);
      float fresnelAlpha = fresnel * mix(0.4, 0.6, layerDepth);
      float veinAlpha = veinIntensity * mix(0.2, 0.15, layerDepth);
      float alpha = fillAmount + fresnelAlpha + veinAlpha + innerGlow;
      alpha *= hologramOpacity;
      alpha = clamp(alpha, 0.0, 1.0);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

extend({ NeuralBrainShaderMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    neuralBrainShaderMaterial: JSX.IntrinsicElements["shaderMaterial"] & {
      time?: number;
      fresnelAmount?: number;
      fresnelOpacity?: number;
      outerColor?: Color;
      innerColor?: Color;
      accentColor?: Color;
      hologramBrightness?: number;
      hologramOpacity?: number;
      noiseScale?: number;
      layerDepth?: number;
    };
  }
}

export { NeuralBrainShaderMaterial };
export const NEURAL_MATERIAL_DEFAULTS = {
  transparent: true,
  side: DoubleSide,
  depthWrite: false,
  blending: AdditiveBlending,
};
