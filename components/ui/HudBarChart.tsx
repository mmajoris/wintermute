"use client";

import React, { useMemo } from "react";
import { useHudColor } from "./hud-theme";

export interface BarData {
  label: string;
  value: number;
  maxValue?: number;
}

export type GlitchStyle = "none" | "noise" | "segments" | "interference" | "corrupt" | "catastrophic";

export interface HudBarChartProps {
  data: BarData[];
  showValues?: boolean;
  showAxis?: boolean;
  showGridLines?: boolean;
  gridLineCount?: number;
  barHeight?: number;
  barGap?: number;
  animated?: boolean;
  glitch?: GlitchStyle;
  glitchIntensity?: number;
  className?: string;
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

function generateNoiseSegments(
  barWidth: number,
  barHeight: number,
  seed: number,
  intensity: number
): Array<{ x: number; w: number; opacity: number }> {
  const rand = seededRandom(seed);
  const segments: Array<{ x: number; w: number; opacity: number }> = [];
  const numSegments = Math.floor(3 + rand() * 8 * intensity);
  
  for (let i = 0; i < numSegments; i++) {
    const x = rand() * barWidth * 0.9;
    const w = 1 + rand() * 4 * intensity;
    const opacity = 0.1 + rand() * 0.4;
    segments.push({ x, w, opacity });
  }
  return segments;
}

function generateGlitchGaps(
  barWidth: number,
  seed: number,
  intensity: number
): Array<{ x: number; w: number }> {
  const rand = seededRandom(seed);
  const gaps: Array<{ x: number; w: number }> = [];
  const numGaps = Math.floor(1 + rand() * 4 * intensity);
  
  for (let i = 0; i < numGaps; i++) {
    const x = rand() * barWidth * 0.8;
    const w = 2 + rand() * 8 * intensity;
    gaps.push({ x, w });
  }
  return gaps;
}

function generateInterferenceLines(
  barHeight: number,
  seed: number,
  intensity: number
): Array<{ y: number; opacity: number }> {
  const rand = seededRandom(seed);
  const lines: Array<{ y: number; opacity: number }> = [];
  const numLines = Math.floor(1 + rand() * 3 * intensity);
  
  for (let i = 0; i < numLines; i++) {
    const y = rand() * barHeight;
    const opacity = 0.3 + rand() * 0.5;
    lines.push({ y, opacity });
  }
  return lines;
}

export default function HudBarChart({
  data,
  showValues = false,
  showAxis = true,
  showGridLines = false,
  gridLineCount = 4,
  barHeight = 12,
  barGap = 6,
  animated = true,
  glitch = "none",
  glitchIntensity = 0.5,
  className = "",
}: HudBarChartProps) {
  const c = useHudColor();

  const maxVal = Math.max(...data.map((d) => d.maxValue ?? d.value));
  const maxLabelWidth = Math.max(...data.map((d) => d.label.length)) * 6 + 8;

  const glitchData = useMemo(() => {
    if (glitch === "none") return null;
    return data.map((item, idx) => {
      const seed = idx * 12345 + item.label.charCodeAt(0) * 100;
      return {
        noiseSegments: generateNoiseSegments(100, barHeight, seed, glitchIntensity),
        gaps: generateGlitchGaps(100, seed + 1000, glitchIntensity),
        interferenceLines: generateInterferenceLines(barHeight, seed + 2000, glitchIntensity),
        offsetX: (seededRandom(seed + 3000)() - 0.5) * 3 * glitchIntensity,
        corruptChunks: Array.from({ length: Math.floor(2 + seededRandom(seed + 4000)() * 4 * glitchIntensity) }, (_, i) => ({
          x: seededRandom(seed + 5000 + i)() * 80,
          w: 3 + seededRandom(seed + 6000 + i)() * 15 * glitchIntensity,
          brightness: 0.5 + seededRandom(seed + 7000 + i)() * 0.8,
        })),
      };
    });
  }, [data, glitch, glitchIntensity, barHeight]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col" style={{ gap: barGap }}>
        {data.map((item, idx) => {
          const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
          const gd = pct > 0 ? glitchData?.[idx] : null;
          
          return (
            <div key={idx} className="flex items-center" style={{ height: barHeight }}>
              <div
                className="shrink-0 text-[9px] uppercase tracking-wide truncate pr-3"
                style={{ color: c(0.5), width: maxLabelWidth }}
              >
                {item.label}
              </div>
              <div className="flex-1 relative h-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ background: c(0.05) }}
                />

                {showGridLines && (
                  <>
                    {Array.from({ length: gridLineCount }).map((_, i) => {
                      const position = ((i + 1) / gridLineCount) * 100;
                      return (
                        <div
                          key={i}
                          className="absolute top-0 bottom-0 w-px pointer-events-none"
                          style={{
                            left: `${position}%`,
                            background: `repeating-linear-gradient(to bottom, ${c(0.15)} 0px, ${c(0.15)} 1px, transparent 1px, transparent 3px)`,
                          }}
                        />
                      );
                    })}
                  </>
                )}

                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${pct}%`,
                    transform: gd ? `translateX(${gd.offsetX}px)` : undefined,
                    background: glitch === "none" 
                      ? `linear-gradient(90deg, ${c(0.15)} 0%, ${c(0.45)} 100%)`
                      : `linear-gradient(90deg, ${c(0.12)} 0%, ${c(0.35)} 50%, ${c(0.5)} 100%)`,
                    boxShadow: `0 0 8px ${c(0.3)}, inset 0 0 4px ${c(0.2)}`,
                    transition: animated ? "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)" : undefined,
                  }}
                />

                {glitch === "noise" && gd && (
                  <>
                    {gd.noiseSegments.map((seg, i) => (
                      <div
                        key={`noise-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(seg.x / 100) * pct}%`,
                          width: seg.w,
                          background: c(seg.opacity),
                          mixBlendMode: "screen",
                        }}
                      />
                    ))}
                  </>
                )}

                {glitch === "segments" && gd && (
                  <>
                    {gd.gaps.map((gap, i) => (
                      <div
                        key={`gap-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(gap.x / 100) * pct}%`,
                          width: gap.w,
                          background: c(0.02),
                        }}
                      />
                    ))}
                  </>
                )}

                {glitch === "interference" && gd && (
                  <>
                    {gd.interferenceLines.map((line, i) => (
                      <div
                        key={`line-${i}`}
                        className="absolute left-0 pointer-events-none"
                        style={{
                          top: line.y,
                          width: `${pct}%`,
                          height: 1,
                          background: c(line.opacity),
                          mixBlendMode: "screen",
                        }}
                      />
                    ))}
                    <div
                      className="absolute inset-y-0 left-0 pointer-events-none"
                      style={{
                        width: `${pct}%`,
                        background: `repeating-linear-gradient(0deg, transparent 0px, transparent ${2 + Math.floor(glitchIntensity * 2)}px, ${c(0.08)} ${2 + Math.floor(glitchIntensity * 2)}px, ${c(0.08)} ${3 + Math.floor(glitchIntensity * 2)}px)`,
                      }}
                    />
                  </>
                )}

                {glitch === "corrupt" && gd && (
                  <>
                    {gd.corruptChunks.map((chunk, i) => (
                      <div
                        key={`corrupt-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(chunk.x / 100) * pct}%`,
                          width: chunk.w,
                          background: c(chunk.brightness),
                          mixBlendMode: i % 2 === 0 ? "screen" : "multiply",
                        }}
                      />
                    ))}
                    {gd.gaps.slice(0, 2).map((gap, i) => (
                      <div
                        key={`cgap-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(gap.x / 100) * pct}%`,
                          width: gap.w * 0.5,
                          background: "rgba(0,0,0,0.8)",
                        }}
                      />
                    ))}
                  </>
                )}

                {glitch === "catastrophic" && gd && (
                  <>
                    {gd.corruptChunks.map((chunk, i) => (
                      <div
                        key={`corrupt-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(chunk.x / 100) * pct}%`,
                          width: chunk.w * 1.5,
                          background: c(chunk.brightness * 1.2),
                          mixBlendMode: i % 3 === 0 ? "screen" : i % 3 === 1 ? "overlay" : "hard-light",
                        }}
                      />
                    ))}
                    {gd.gaps.map((gap, i) => (
                      <div
                        key={`cgap-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(gap.x / 100) * pct}%`,
                          width: gap.w,
                          background: "rgba(0,0,0,0.9)",
                        }}
                      />
                    ))}
                    {gd.noiseSegments.map((seg, i) => (
                      <div
                        key={`noise-${i}`}
                        className="absolute top-0 bottom-0 pointer-events-none"
                        style={{
                          left: `${(seg.x / 100) * pct}%`,
                          width: seg.w * 2,
                          background: c(seg.opacity * 1.5),
                          mixBlendMode: "screen",
                        }}
                      />
                    ))}
                    {gd.interferenceLines.map((line, i) => (
                      <div
                        key={`line-${i}`}
                        className="absolute left-0 pointer-events-none"
                        style={{
                          top: line.y,
                          width: `${pct}%`,
                          height: 2,
                          background: c(line.opacity * 1.3),
                          mixBlendMode: "screen",
                        }}
                      />
                    ))}
                    <div
                      className="absolute inset-y-0 left-0 pointer-events-none"
                      style={{
                        width: `${pct}%`,
                        background: `repeating-linear-gradient(0deg, transparent 0px, transparent 2px, ${c(0.15)} 2px, ${c(0.15)} 3px)`,
                      }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 pointer-events-none"
                      style={{
                        width: `${pct}%`,
                        background: `repeating-linear-gradient(90deg, transparent 0px, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 5px)`,
                      }}
                    />
                  </>
                )}

                <div
                  className="absolute right-0 top-0 bottom-0 w-px"
                  style={{
                    background: `repeating-linear-gradient(to bottom, ${c(0.3)} 0px, ${c(0.3)} 2px, transparent 2px, transparent 4px)`,
                  }}
                />

                {showValues && (
                  <div
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-mono"
                    style={{ color: c(0.4) }}
                  >
                    {item.value.toFixed(item.value % 1 === 0 ? 0 : 1)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAxis && (
        <div className="absolute top-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none" style={{ width: 1 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-px"
              style={{ background: c(0.25), marginLeft: -8 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
