"use client";

import React, { useRef, useEffect, useState } from "react";
import { useHudColor } from "./hud-theme";

export interface HudWaveformProps {
  data?: number[];
  width?: number;
  height?: number;
  variant?: "line" | "bars" | "filled";
  animated?: boolean;
  frequency?: number;
  amplitude?: number;
  showBaseline?: boolean;
  showEndpoints?: boolean;
}

function generateWaveData(length: number, frequency: number, amplitude: number, phase: number): number[] {
  const data: number[] = [];
  for (let i = 0; i < length; i++) {
    const t = i / length;
    const wave = Math.sin(t * Math.PI * 2 * frequency + phase) * amplitude;
    const noise = (Math.random() - 0.5) * 0.15 * amplitude;
    const harmonic = Math.sin(t * Math.PI * 4 * frequency + phase * 1.5) * amplitude * 0.3;
    data.push(0.5 + wave + noise + harmonic);
  }
  return data;
}

export default function HudWaveform({
  data,
  width = 200,
  height = 40,
  variant = "line",
  animated = true,
  frequency = 2,
  amplitude = 0.3,
  showBaseline = true,
  showEndpoints = true,
}: HudWaveformProps) {
  const c = useHudColor();
  const [phase, setPhase] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animated || data) return;
    
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime > 50) {
        setPhase(p => p + 0.1);
        lastTime = time;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animated, data]);

  const waveData = data || generateWaveData(50, frequency, amplitude, phase);
  const points = waveData.map((v, i) => ({
    x: (i / (waveData.length - 1)) * width,
    y: height - v * height,
  }));

  const linePath = points.reduce((path, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = points[i - 1];
    const cpx = (prev.x + pt.x) / 2;
    return `${path} Q ${prev.x},${prev.y} ${cpx},${(prev.y + pt.y) / 2}`;
  }, "") + ` L ${points[points.length - 1].x},${points[points.length - 1].y}`;

  const filledPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`waveform-gradient-${width}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c(0.6)} />
          <stop offset="100%" stopColor={c(0)} />
        </linearGradient>
        <filter id={`waveform-glow-${width}`}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Baseline */}
      {showBaseline && (
        <line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke={c(0.1)}
          strokeWidth={0.5}
          strokeDasharray="2,4"
        />
      )}

      {variant === "bars" ? (
        waveData.map((v, i) => {
          const barWidth = width / waveData.length - 1;
          const barHeight = v * height * 0.8;
          const x = (i / waveData.length) * width;
          const y = (height - barHeight) / 2;
          
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={Math.max(barWidth, 1)}
              height={barHeight}
              fill={c(0.6 + v * 0.4)}
              rx={0.5}
            />
          );
        })
      ) : variant === "filled" ? (
        <>
          <path d={filledPath} fill={`url(#waveform-gradient-${width})`} opacity={0.4} />
          <path
            d={linePath}
            fill="none"
            stroke={c(0.8)}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#waveform-glow-${width})`}
          />
        </>
      ) : (
        <path
          d={linePath}
          fill="none"
          stroke={c(0.8)}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#waveform-glow-${width})`}
        />
      )}

      {/* Endpoints */}
      {showEndpoints && variant !== "bars" && (
        <>
          <circle cx={points[0].x} cy={points[0].y} r={2} fill={c(0.9)} />
          <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={2} fill={c(0.9)} />
        </>
      )}
    </svg>
  );
}
