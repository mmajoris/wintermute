"use client";

import React from "react";
import { useHudColor } from "./hud-theme";

export interface HudRingGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  variant?: "full" | "three-quarter" | "half";
  animated?: boolean;
}

export default function HudRingGauge({
  value,
  max = 100,
  size = 80,
  strokeWidth = 3,
  label,
  showValue = false,
  showPercentage = false,
  variant = "full",
  animated = true,
}: HudRingGaugeProps) {
  const c = useHudColor();
  const normalizedValue = Math.min(Math.max(value / max, 0), 1);
  
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - strokeWidth * 2) / 2 - 2;
  
  const angleConfig = {
    full: { start: -90, range: 360 },
    "three-quarter": { start: -225, range: 270 },
    half: { start: -180, range: 180 },
  };
  
  const { start: startAngle, range: angleRange } = angleConfig[variant];
  const endAngle = startAngle + angleRange;
  const currentAngle = startAngle + angleRange * normalizedValue;

  const arcPath = (r: number, startDeg: number, endDeg: number) => {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    
    if (variant === "full" && endDeg - startDeg >= 360) {
      return `M ${cx},${cy - r} A ${r},${r} 0 1 1 ${cx - 0.01},${cy - r}`;
    }
    
    return `M ${x1},${y1} A ${r},${r} 0 ${largeArc} 1 ${x2},${y2}`;
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <filter id={`ring-glow-${size}-${variant}`}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d={arcPath(radius, startAngle, endAngle)}
            fill="none"
            stroke={c(0.12)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active arc */}
          {normalizedValue > 0 && (
            <path
              d={arcPath(radius, startAngle, currentAngle)}
              fill="none"
              stroke={c(0.85)}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              filter={`url(#ring-glow-${size}-${variant})`}
              style={animated ? { transition: "d 0.5s ease-out" } : undefined}
            />
          )}

          {/* End cap glow */}
          {normalizedValue > 0.02 && (
            <circle
              cx={cx + Math.cos((currentAngle * Math.PI) / 180) * radius}
              cy={cy + Math.sin((currentAngle * Math.PI) / 180) * radius}
              r={strokeWidth / 2 + 1}
              fill={c(1)}
              opacity={0.8}
            />
          )}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <span
              className="font-mono font-semibold tabular-nums"
              style={{ fontSize: size * 0.25, color: c(0.9) }}
            >
              {Math.round(value)}
            </span>
          )}
          {showPercentage && (
            <span
              className="font-mono tabular-nums"
              style={{ fontSize: size * 0.18, color: c(0.7) }}
            >
              {Math.round(normalizedValue * 100)}%
            </span>
          )}
        </div>
      </div>

      {label && (
        <span
          className="text-[8px] uppercase tracking-wider mt-1"
          style={{ color: c(0.4) }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
