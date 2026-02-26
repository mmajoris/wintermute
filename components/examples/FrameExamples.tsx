"use client";

import React from "react";
import HudFrame, { HUD_FRAME_VARIANTS } from "@/components/ui/HudFrame";

const BASE = HUD_FRAME_VARIANTS.filter(v => !v.startsWith("combo") && !v.startsWith("detail"));
const COMBOS = HUD_FRAME_VARIANTS.filter(v => v.startsWith("combo"));
const DETAILS = HUD_FRAME_VARIANTS.filter(v => v.startsWith("detail"));

export default function FrameExamples() {
  return (
    <div className="grid grid-cols-4 gap-8 items-start">
      <Column label="Base Frames" variants={BASE.slice(0, 5)} />
      <Column label="Base Frames" variants={BASE.slice(5)} />
      <Column label="Combinations" variants={COMBOS} />
      <Column label="Detailed" variants={DETAILS} />
    </div>
  );
}

function Column({ label, variants }: { label: string; variants: string[] }) {
  return (
    <div className="space-y-6">
      <div className="text-[9px] uppercase tracking-widest mb-4" style={{ color: "rgba(0,200,220,0.3)" }}>
        {label}
      </div>
      {variants.map((variant) => (
        <div key={variant}>
          <div className="text-[10px] uppercase tracking-wide mb-2" style={{ color: "rgba(0, 200, 220, 0.4)" }}>
            {variant}
          </div>
          <HudFrame variant={variant} className="p-5">
            <div className="h-16" />
          </HudFrame>
        </div>
      ))}
    </div>
  );
}
