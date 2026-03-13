"use client";

import React from "react";
import { useHudColor } from "./hud-theme";

export interface HudStatDisplayProps {
  value: number | string;
  label?: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  showIndicator?: boolean;
  indicatorColor?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: number;
  unit?: string;
  animated?: boolean;
}

export default function HudStatDisplay({
  value,
  label,
  sublabel,
  size = "md",
  showIndicator = false,
  indicatorColor,
  trend,
  trendValue,
  unit,
  animated = true,
}: HudStatDisplayProps) {
  const c = useHudColor();
  
  const sizeConfig = {
    sm: { value: 16, label: 8, sublabel: 7, indicator: 4, gap: 2 },
    md: { value: 24, label: 10, sublabel: 8, indicator: 6, gap: 4 },
    lg: { value: 36, label: 12, sublabel: 9, indicator: 8, gap: 6 },
  };
  
  const s = sizeConfig[size];

  const trendArrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "●";
  const trendColor = trend === "up" ? "#22c55e" : trend === "down" ? "#ef4444" : c(0.4);

  return (
    <div className="inline-flex flex-col">
      {label && (
        <span
          className="uppercase tracking-wider"
          style={{ fontSize: s.label, color: c(0.4), marginBottom: s.gap }}
        >
          {label}
        </span>
      )}
      
      <div className="flex items-baseline gap-1">
        {showIndicator && (
          <span
            className="rounded-full shrink-0"
            style={{
              width: s.indicator,
              height: s.indicator,
              backgroundColor: indicatorColor || c(0.8),
              boxShadow: `0 0 ${s.indicator}px ${indicatorColor || c(0.5)}`,
              marginRight: s.gap,
            }}
          />
        )}
        
        <span
          className="font-mono font-bold tabular-nums"
          style={{
            fontSize: s.value,
            color: c(0.95),
            textShadow: `0 0 8px ${c(0.3)}`,
            transition: animated ? "all 0.3s ease-out" : undefined,
          }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        
        {unit && (
          <span
            className="font-mono"
            style={{ fontSize: s.value * 0.5, color: c(0.4) }}
          >
            {unit}
          </span>
        )}
        
        {trend && (
          <span
            className="flex items-center gap-0.5 ml-1"
            style={{ fontSize: s.sublabel, color: trendColor }}
          >
            <span>{trendArrow}</span>
            {trendValue !== undefined && (
              <span className="font-mono tabular-nums">{trendValue}</span>
            )}
          </span>
        )}
      </div>
      
      {sublabel && (
        <span
          className="uppercase tracking-wide"
          style={{ fontSize: s.sublabel, color: c(0.25), marginTop: s.gap / 2 }}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
