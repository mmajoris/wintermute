"use client";

import React from "react";
import { useHudColor } from "./hud-theme";

export interface HudCircularGaugeProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  glowIntensity?: number;
  animated?: boolean;
}

export default function HudCircularGauge({
  value,
  max = 100,
  size = 120,
  strokeWidth = 4,
  label,
  showValue = true,
  showTicks = true,
  tickCount = 24,
  glowIntensity = 0.6,
  animated = true,
}: HudCircularGaugeProps) {
  const c = useHudColor();
  const normalizedValue = Math.min(Math.max(value / max, 0), 1);
  
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - strokeWidth * 2 - 16) / 2;
  const innerRadius = radius - 12;
  
  const startAngle = -225;
  const endAngle = 45;
  const angleRange = endAngle - startAngle;
  const currentAngle = startAngle + angleRange * normalizedValue;

  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const angle = (startAngle + (angleRange * i) / tickCount) * (Math.PI / 180);
    const isActive = i / tickCount <= normalizedValue;
    const isMajor = i % 4 === 0;
    const tickLength = isMajor ? 8 : 4;
    const outerR = radius + 6;
    const innerR = outerR - tickLength;
    
    ticks.push({
      x1: cx + Math.cos(angle) * innerR,
      y1: cy + Math.sin(angle) * innerR,
      x2: cx + Math.cos(angle) * outerR,
      y2: cy + Math.sin(angle) * outerR,
      isActive,
      isMajor,
    });
  }

  const arcPath = (r: number, startDeg: number, endDeg: number) => {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1},${y1} A ${r},${r} 0 ${largeArc} 1 ${x2},${y2}`;
  };

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id={`gauge-glow-${size}`}>
            <feGaussianBlur stdDeviation={3 * glowIntensity} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`gauge-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c(1)} />
            <stop offset="100%" stopColor={c(0.6)} />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={arcPath(radius, startAngle, endAngle)}
          fill="none"
          stroke={c(0.1)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Active arc */}
        <path
          d={arcPath(radius, startAngle, currentAngle)}
          fill="none"
          stroke={c(0.9)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={`url(#gauge-glow-${size})`}
          style={animated ? { transition: "d 0.5s ease-out" } : undefined}
        />

        {/* Inner decorative ring */}
        <circle
          cx={cx}
          cy={cy}
          r={innerRadius}
          fill="none"
          stroke={c(0.08)}
          strokeWidth={1}
        />

        {/* Tick marks */}
        {showTicks && ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.isActive ? c(tick.isMajor ? 0.7 : 0.4) : c(0.15)}
            strokeWidth={tick.isMajor ? 1.5 : 0.75}
            style={animated ? { transition: "stroke 0.3s ease-out" } : undefined}
          />
        ))}

        {/* Center dot */}
        <circle cx={cx} cy={cy} r={2} fill={c(0.5)} />

        {/* Indicator dot at current position */}
        {normalizedValue > 0 && (
          <circle
            cx={cx + Math.cos((currentAngle * Math.PI) / 180) * radius}
            cy={cy + Math.sin((currentAngle * Math.PI) / 180) * radius}
            r={strokeWidth / 2 + 1}
            fill={c(1)}
            filter={`url(#gauge-glow-${size})`}
          />
        )}
      </svg>

      {/* Center value display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue && (
          <span
            className="font-mono font-bold tabular-nums"
            style={{
              fontSize: size * 0.22,
              color: c(0.95),
              textShadow: `0 0 ${8 * glowIntensity}px ${c(0.5)}`,
            }}
          >
            {Math.round(value)}
          </span>
        )}
        {label && (
          <span
            className="text-[9px] uppercase tracking-wider mt-0.5"
            style={{ color: c(0.4) }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
