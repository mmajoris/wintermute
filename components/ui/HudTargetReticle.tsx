"use client";

import React from "react";
import { useHudColor } from "./hud-theme";

export interface HudTargetReticleProps {
  size?: number;
  variant?: "crosshair" | "bracket" | "circle" | "diamond";
  showCenter?: boolean;
  showCorners?: boolean;
  animated?: boolean;
  rotation?: number;
  label?: string;
  value?: number | string;
}

export default function HudTargetReticle({
  size = 100,
  variant = "crosshair",
  showCenter = true,
  showCorners = true,
  animated = true,
  rotation = 0,
  label,
  value,
}: HudTargetReticleProps) {
  const c = useHudColor();
  const cx = size / 2;
  const cy = size / 2;
  const innerR = size * 0.15;
  const outerR = size * 0.4;
  const cornerSize = size * 0.12;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={animated ? { transition: "transform 0.3s ease-out" } : undefined}
      >
        <defs>
          <filter id={`reticle-glow-${size}`}>
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
          {variant === "crosshair" && (
            <>
              {/* Outer circle */}
              <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={c(0.15)} strokeWidth={1} />
              
              {/* Cross lines */}
              <line x1={cx} y1={cy - outerR - 5} x2={cx} y2={cy - innerR} stroke={c(0.7)} strokeWidth={1.5} filter={`url(#reticle-glow-${size})`} />
              <line x1={cx} y1={cy + innerR} x2={cx} y2={cy + outerR + 5} stroke={c(0.7)} strokeWidth={1.5} filter={`url(#reticle-glow-${size})`} />
              <line x1={cx - outerR - 5} y1={cy} x2={cx - innerR} y2={cy} stroke={c(0.7)} strokeWidth={1.5} filter={`url(#reticle-glow-${size})`} />
              <line x1={cx + innerR} y1={cy} x2={cx + outerR + 5} y2={cy} stroke={c(0.7)} strokeWidth={1.5} filter={`url(#reticle-glow-${size})`} />
              
              {/* Inner ring */}
              <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={c(0.4)} strokeWidth={1} strokeDasharray="4,4" />
              
              {/* Tick marks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
                const rad = (angle * Math.PI) / 180;
                const r1 = outerR - 4;
                const r2 = outerR + 2;
                return (
                  <line
                    key={angle}
                    x1={cx + Math.cos(rad) * r1}
                    y1={cy + Math.sin(rad) * r1}
                    x2={cx + Math.cos(rad) * r2}
                    y2={cy + Math.sin(rad) * r2}
                    stroke={c(angle % 90 === 0 ? 0.5 : 0.25)}
                    strokeWidth={angle % 90 === 0 ? 1 : 0.5}
                  />
                );
              })}
            </>
          )}

          {variant === "bracket" && (
            <>
              {/* Corner brackets */}
              <path d={`M ${cx - outerR} ${cy - outerR + cornerSize} L ${cx - outerR} ${cy - outerR} L ${cx - outerR + cornerSize} ${cy - outerR}`} fill="none" stroke={c(0.8)} strokeWidth={2} strokeLinecap="square" filter={`url(#reticle-glow-${size})`} />
              <path d={`M ${cx + outerR - cornerSize} ${cy - outerR} L ${cx + outerR} ${cy - outerR} L ${cx + outerR} ${cy - outerR + cornerSize}`} fill="none" stroke={c(0.8)} strokeWidth={2} strokeLinecap="square" filter={`url(#reticle-glow-${size})`} />
              <path d={`M ${cx + outerR} ${cy + outerR - cornerSize} L ${cx + outerR} ${cy + outerR} L ${cx + outerR - cornerSize} ${cy + outerR}`} fill="none" stroke={c(0.8)} strokeWidth={2} strokeLinecap="square" filter={`url(#reticle-glow-${size})`} />
              <path d={`M ${cx - outerR + cornerSize} ${cy + outerR} L ${cx - outerR} ${cy + outerR} L ${cx - outerR} ${cy + outerR - cornerSize}`} fill="none" stroke={c(0.8)} strokeWidth={2} strokeLinecap="square" filter={`url(#reticle-glow-${size})`} />
              
              {/* Inner cross */}
              <line x1={cx - innerR} y1={cy} x2={cx + innerR} y2={cy} stroke={c(0.4)} strokeWidth={1} />
              <line x1={cx} y1={cy - innerR} x2={cx} y2={cy + innerR} stroke={c(0.4)} strokeWidth={1} />
            </>
          )}

          {variant === "circle" && (
            <>
              {/* Concentric circles */}
              <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={c(0.3)} strokeWidth={1} />
              <circle cx={cx} cy={cy} r={outerR * 0.7} fill="none" stroke={c(0.2)} strokeWidth={0.5} strokeDasharray="3,5" />
              <circle cx={cx} cy={cy} r={outerR * 0.4} fill="none" stroke={c(0.15)} strokeWidth={0.5} />
              
              {/* Crosshairs */}
              <line x1={cx - outerR} y1={cy} x2={cx - innerR} y2={cy} stroke={c(0.6)} strokeWidth={1} />
              <line x1={cx + innerR} y1={cy} x2={cx + outerR} y2={cy} stroke={c(0.6)} strokeWidth={1} />
              <line x1={cx} y1={cy - outerR} x2={cx} y2={cy - innerR} stroke={c(0.6)} strokeWidth={1} />
              <line x1={cx} y1={cy + innerR} x2={cx} y2={cy + outerR} stroke={c(0.6)} strokeWidth={1} />
              
              {/* Cardinal markers */}
              {[0, 90, 180, 270].map(angle => {
                const rad = (angle * Math.PI) / 180;
                return (
                  <circle
                    key={angle}
                    cx={cx + Math.cos(rad) * outerR}
                    cy={cy + Math.sin(rad) * outerR}
                    r={2}
                    fill={c(0.7)}
                  />
                );
              })}
            </>
          )}

          {variant === "diamond" && (
            <>
              {/* Diamond shape */}
              <path
                d={`M ${cx} ${cy - outerR} L ${cx + outerR} ${cy} L ${cx} ${cy + outerR} L ${cx - outerR} ${cy} Z`}
                fill="none"
                stroke={c(0.5)}
                strokeWidth={1}
              />
              
              {/* Inner diamond */}
              <path
                d={`M ${cx} ${cy - innerR * 2} L ${cx + innerR * 2} ${cy} L ${cx} ${cy + innerR * 2} L ${cx - innerR * 2} ${cy} Z`}
                fill="none"
                stroke={c(0.25)}
                strokeWidth={0.5}
                strokeDasharray="2,3"
              />
              
              {/* Corner accents */}
              {[[cx, cy - outerR], [cx + outerR, cy], [cx, cy + outerR], [cx - outerR, cy]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={3} fill={c(0.8)} filter={`url(#reticle-glow-${size})`} />
              ))}
            </>
          )}

          {/* Center dot */}
          {showCenter && (
            <>
              <circle cx={cx} cy={cy} r={3} fill={c(0.9)} filter={`url(#reticle-glow-${size})`} />
              <circle cx={cx} cy={cy} r={1.5} fill="white" opacity={0.8} />
            </>
          )}

          {/* Corner indicators */}
          {showCorners && variant !== "bracket" && (
            <>
              {[[0, 0], [size, 0], [size, size], [0, size]].map(([x, y], i) => (
                <rect
                  key={i}
                  x={x === 0 ? 2 : size - 6}
                  y={y === 0 ? 2 : size - 6}
                  width={4}
                  height={4}
                  fill={c(0.3)}
                />
              ))}
            </>
          )}
        </g>
      </svg>

      {(label || value !== undefined) && (
        <div className="flex flex-col items-center mt-1">
          {value !== undefined && (
            <span className="font-mono font-bold tabular-nums" style={{ fontSize: size * 0.12, color: c(0.9) }}>
              {value}
            </span>
          )}
          {label && (
            <span className="text-[8px] uppercase tracking-wider" style={{ color: c(0.4) }}>
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
