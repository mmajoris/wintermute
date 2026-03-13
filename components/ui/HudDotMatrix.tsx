"use client";

import React, { useState, useEffect, useRef } from "react";
import { useHudColor } from "./hud-theme";

export interface HudDotMatrixProps {
  data?: number[][];
  rows?: number;
  cols?: number;
  dotSize?: number;
  gap?: number;
  animated?: boolean;
  pattern?: "random" | "wave" | "pulse" | "static";
  intensity?: number;
}

function generatePattern(
  rows: number,
  cols: number,
  pattern: string,
  time: number,
  intensity: number
): number[][] {
  const data: number[][] = [];
  
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      let value = 0;
      
      switch (pattern) {
        case "wave":
          value = (Math.sin((c / cols) * Math.PI * 2 + time) + 1) / 2;
          value *= (Math.sin((r / rows) * Math.PI + time * 0.5) + 1) / 2;
          break;
        case "pulse":
          const cx = cols / 2;
          const cy = rows / 2;
          const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
          const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
          value = Math.sin(dist / maxDist * Math.PI * 3 - time * 2);
          value = Math.max(0, value);
          break;
        case "random":
          value = Math.random() > 0.7 ? Math.random() : 0;
          break;
        default:
          value = Math.random() > 0.5 ? 0.8 : 0.1;
      }
      
      row.push(Math.min(1, Math.max(0, value * intensity)));
    }
    data.push(row);
  }
  
  return data;
}

export default function HudDotMatrix({
  data,
  rows = 8,
  cols = 16,
  dotSize = 4,
  gap = 2,
  animated = true,
  pattern = "wave",
  intensity = 1,
}: HudDotMatrixProps) {
  const c = useHudColor();
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!animated || data) return;
    
    let lastTime = 0;
    const animate = (t: number) => {
      if (t - lastTime > 80) {
        setTime(prev => prev + 0.15);
        lastTime = t;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animated, data]);

  const matrixData = data || generatePattern(rows, cols, pattern, time, intensity);
  const width = cols * (dotSize + gap) - gap;
  const height = rows * (dotSize + gap) - gap;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="dot-glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {matrixData.map((row, r) =>
        row.map((value, col) => {
          const x = col * (dotSize + gap);
          const y = r * (dotSize + gap);
          const isActive = value > 0.3;
          
          return (
            <rect
              key={`${r}-${col}`}
              x={x}
              y={y}
              width={dotSize}
              height={dotSize}
              fill={c(value * 0.9)}
              rx={1}
              filter={isActive ? "url(#dot-glow)" : undefined}
              style={{ transition: animated ? "fill 0.15s ease-out" : undefined }}
            />
          );
        })
      )}
    </svg>
  );
}
