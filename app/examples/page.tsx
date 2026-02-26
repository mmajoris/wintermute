"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { HudThemeProvider } from "@/components/ui/hud-theme";

const FrameExamples = dynamic(() => import("@/components/examples/FrameExamples"), { ssr: false });
const DataDisplayExamples = dynamic(() => import("@/components/examples/DataDisplayExamples"), { ssr: false });

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

const TABS = ["Frames", "Data Display"] as const;
type Tab = (typeof TABS)[number];

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Frames");
  const [brightness, setBrightness] = useState(1);
  const [hue, setHue] = useState(185);
  const [rgb, setRgb] = useState<[number, number, number]>([0, 200, 220]);

  useEffect(() => {
    setRgb(hslToRgb(hue, 0.85, 0.43));
  }, [hue]);

  return (
    <HudThemeProvider r={rgb[0]} g={rgb[1]} b={rgb[2]} brightness={brightness}>
      <div className="min-h-screen w-full" style={{ background: "#030406" }}>
        <div className="sticky top-0 z-50 px-10 pt-8 pb-6" style={{ background: "linear-gradient(to bottom, #030406 70%, transparent)" }}>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-200 rounded"
                  style={activeTab === tab ? {
                    color: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
                    background: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.08)`,
                    boxShadow: `inset 0 -2px 0 rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`,
                  } : {
                    color: "rgba(255,255,255,0.25)",
                    background: "transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-white/8" />

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase text-neutral-500">Brightness</span>
              <input
                type="range" min="0.1" max="2.5" step="0.05" value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                className="w-28 h-0.5 appearance-none bg-neutral-700 rounded-full cursor-pointer accent-cyan-500"
              />
              <span className="text-[10px] font-mono w-8" style={{ color: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)` }}>
                {brightness.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase text-neutral-500">Hue</span>
              <input
                type="range" min="0" max="360" step="1" value={hue}
                onChange={(e) => setHue(parseInt(e.target.value))}
                className="w-28 h-0.5 appearance-none rounded-full cursor-pointer"
                style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}
              />
              <span className="text-[10px] font-mono w-8" style={{ color: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)` }}>
                {hue}°
              </span>
              <div className="w-4 h-4 rounded-full border border-white/10" style={{ background: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` }} />
            </div>
          </div>
        </div>

        <div className="px-10 pb-10">
          {activeTab === "Frames" && <FrameExamples />}
          {activeTab === "Data Display" && <DataDisplayExamples />}
        </div>
      </div>
    </HudThemeProvider>
  );
}
