"use client";

import React from "react";
import { useHudColor } from "./hud-theme";

export interface HudVerticalBarsProps {
  values: number[];
  max?: number;
  width?: number;
  height?: number;
  barWidth?: number;
  gap?: number;
  showLabels?: boolean;
  labels?: string[];
  animated?: boolean;
}

export default function HudVerticalBars({
  values,
  max,
  width,
  height = 80,
  barWidth = 6,
  gap = 3,
  showLabels = false,
  labels,
  animated = true,
}: HudVerticalBarsProps) {
  const c = useHudColor();
  
  const computedMax = max ?? Math.max(...values, 1);
  const computedWidth = width ?? values.length * (barWidth + gap) - gap;
  
  return (
    <div className="inline-flex flex-col items-center">
      <svg width={computedWidth} height={height} viewBox={`0 0 ${computedWidth} ${height}`}>
        <defs>
          <linearGradient id="vbar-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={c(0.3)} />
            <stop offset="100%" stopColor={c(0.9)} />
          </linearGradient>
          <filter id="vbar-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {values.map((value, i) => {
          const normalizedValue = Math.min(Math.max(value / computedMax, 0), 1);
          const barHeight = normalizedValue * (height - 4);
          const x = i * (barWidth + gap);
          const y = height - barHeight - 2;
          
          return (
            <g key={i}>
              {/* Background bar */}
              <rect
                x={x}
                y={2}
                width={barWidth}
                height={height - 4}
                fill={c(0.06)}
                rx={1}
              />
              
              {/* Active bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="url(#vbar-gradient)"
                rx={1}
                filter="url(#vbar-glow)"
                style={animated ? { transition: "y 1s cubic-bezier(0.4, 0, 0.2, 1), height 1s cubic-bezier(0.4, 0, 0.2, 1)" } : undefined}
              />
              
              {/* Top highlight */}
              {normalizedValue > 0.05 && (
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={2}
                  fill={c(1)}
                  rx={1}
                  opacity={0.8}
                />
              )}
            </g>
          );
        })}
      </svg>

      {showLabels && labels && (
        <div className="flex mt-1" style={{ gap }}>
          {labels.slice(0, values.length).map((label, i) => (
            <span
              key={i}
              className="text-[7px] uppercase"
              style={{ width: barWidth, textAlign: "center", color: c(0.35) }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
