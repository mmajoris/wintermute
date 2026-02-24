"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function NeuralEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={1.3}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.85}
      />
      <Vignette
        offset={0.25}
        darkness={0.65}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
