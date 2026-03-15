"use client";

import React from "react";
import { useHudColor } from "./hud-theme";

export interface HudLinearGaugeProps {
  value: number;
  max?: number;
  width?: number;
  height?: number;
  label?: string;
  showValue?: boolean;
  showTicks?: boolean;
  tickCount?: number;
  variant?: "solid" | "segmented" | "gradient";
  orientation?: "horizontal" | "vertical";
  animated?: boolean;
}

export default function HudLinearGauge({
  value,
  max = 100,
  width = 200,
  height = 8,
  label,
  showValue = true,
  showTicks = false,
  tickCount = 10,
  variant = "solid",
  orientation = "horizontal",
  animated = true,
}: HudLinearGaugeProps) {
  const c = useHudColor();
  const normalizedValue = Math.min(Math.max(value / max, 0), 1);
  
  const isVertical = orientation === "vertical";
  const barWidth = isVertical ? height : width;
  const barHeight = isVertical ? width : height;
  const fillSize = normalizedValue * (isVertical ? barHeight : barWidth);

  const segments = variant === "segmented" ? 20 : 0;
  const segmentGap = 2;

  return (
    <div
      className={`flex ${isVertical ? "flex-col-reverse items-center" : "items-center gap-3"}`}
    >
      {label && !isVertical && (
        <span
          className="text-[10px] uppercase tracking-wider shrink-0"
          style={{ color: c(0.5), minWidth: 60 }}
        >
          {label}
        </span>
      )}

      <div className="relative" style={{ width: barWidth, height: barHeight }}>
        <svg width={barWidth} height={barHeight} viewBox={`0 0 ${barWidth} ${barHeight}`}>
          <defs>
            <linearGradient
              id={`linear-gauge-gradient-${barWidth}`}
              x1="0%"
              y1="0%"
              x2={isVertical ? "0%" : "100%"}
              y2={isVertical ? "100%" : "0%"}
            >
              <stop offset="0%" stopColor={c(0.4)} />
              <stop offset="50%" stopColor={c(0.9)} />
              <stop offset="100%" stopColor={c(1)} />
            </linearGradient>
            <filter id={`linear-gauge-glow-${barWidth}`}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect
            x={0}
            y={0}
            width={barWidth}
            height={barHeight}
            fill={c(0.08)}
            rx={2}
          />

          {/* Fill */}
          {variant === "segmented" ? (
            Array.from({ length: segments }).map((_, i) => {
              const segmentWidth = (barWidth - (segments - 1) * segmentGap) / segments;
              const segmentX = i * (segmentWidth + segmentGap);
              const isActive = (i + 1) / segments <= normalizedValue;
              
              return (
                <rect
                  key={i}
                  x={isVertical ? 0 : segmentX}
                  y={isVertical ? barHeight - (i + 1) * (barHeight / segments) : 0}
                  width={isVertical ? barWidth : segmentWidth}
                  height={isVertical ? barHeight / segments - segmentGap : barHeight}
                  fill={isActive ? c(0.8) : c(0.08)}
                  rx={1}
                  style={animated ? { transition: "fill 0.2s ease-out" } : undefined}
                />
              );
            })
          ) : (
            <rect
              x={0}
              y={isVertical ? barHeight - fillSize : 0}
              width={isVertical ? barWidth : fillSize}
              height={isVertical ? fillSize : barHeight}
              fill={variant === "gradient" ? `url(#linear-gauge-gradient-${barWidth})` : c(0.85)}
              rx={2}
              filter={`url(#linear-gauge-glow-${barWidth})`}
              style={animated ? { transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1), height 1s cubic-bezier(0.4, 0, 0.2, 1)" } : undefined}
            />
          )}

          {/* Tick marks */}
          {showTicks && Array.from({ length: tickCount + 1 }).map((_, i) => {
            const pos = (i / tickCount) * barWidth;
            return (
              <line
                key={i}
                x1={isVertical ? 0 : pos}
                y1={isVertical ? pos : barHeight}
                x2={isVertical ? barWidth : pos}
                y2={isVertical ? pos : barHeight + 3}
                stroke={c(0.2)}
                strokeWidth={0.5}
              />
            );
          })}

          {/* End cap highlight */}
          {normalizedValue > 0.02 && variant !== "segmented" && (
            <rect
              x={isVertical ? 0 : fillSize - 2}
              y={isVertical ? barHeight - fillSize : 0}
              width={isVertical ? barWidth : 2}
              height={isVertical ? 2 : barHeight}
              fill={c(1)}
              opacity={0.9}
            />
          )}
        </svg>
      </div>

      {showValue && (
        <span
          className="font-mono text-[11px] tabular-nums shrink-0"
          style={{ color: c(0.7), minWidth: 32, textAlign: "right" }}
        >
          {Math.round(value)}
        </span>
      )}

      {label && isVertical && (
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
