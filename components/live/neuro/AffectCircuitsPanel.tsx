"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { getAffectCircuitLevel, type AffectCircuitLevel } from "@/lib/brain-events";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

interface CircuitMeta {
  key: string;
  label: string;
  color: string;
  region: string;
}

const CIRCUITS: CircuitMeta[] = [
  { key: "seeking",      label: "SEEKING",      color: "#06b6d4", region: "VTA/NAc" },
  { key: "rage",         label: "RAGE",         color: "#ef4444", region: "Amygdala/Hypo" },
  { key: "fear",         label: "FEAR",         color: "#8b5cf6", region: "Amygdala/PAG" },
  { key: "lust",         label: "LUST",         color: "#ec4899", region: "Hypothalamic" },
  { key: "care",         label: "CARE",         color: "#f97316", region: "OXT/ACC" },
  { key: "panic_grief",  label: "PANIC",        color: "#3b82f6", region: "PAG/ACC" },
  { key: "play",         label: "PLAY",         color: "#22c55e", region: "Thal/Cortex" },
];

const CIRCUIT_COUNT = CIRCUITS.length;

function smoothClosedPath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 3) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    d += ` C ${p1.x + (p2.x - p0.x) / 6},${p1.y + (p2.y - p0.y) / 6} ${p2.x - (p3.x - p1.x) / 6},${p2.y - (p3.y - p1.y) / 6} ${p2.x},${p2.y}`;
  }
  return d + " Z";
}

function VADIndicator({ label, value, min, max, color }: {
  label: string; value: number; min: number; max: number; color: string;
}) {
  const normalized = (value - min) / (max - min);
  const pct = Math.max(0, Math.min(100, normalized * 100));

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[7px] w-4 font-bold" style={{ color: `${color}bb` }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full relative" style={{ background: "#ffffff08" }}>
        <div className="absolute top-0 bottom-0 w-px" style={{ left: "50%", background: "#ffffff15" }} />
        <div
          className="absolute top-0 bottom-0 rounded-full transition-all duration-700"
          style={{
            left: `${Math.min(pct, 50)}%`,
            width: `${Math.abs(pct - 50)}%`,
            background: color,
            opacity: 0.7,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-700"
          style={{ left: `${pct}%`, marginLeft: -4, background: color, boxShadow: `0 0 4px ${color}60` }}
        />
      </div>
      <span className="text-[8px] font-mono w-6 text-right" style={{ color: `${color}99` }}>
        {value.toFixed(2)}
      </span>
    </div>
  );
}

export default function AffectCircuitsPanel() {
  const affectCircuits = useLiveStore((s) => s.affectCircuits);
  const moodSnapshot = useLiveStore((s) => s.moodSnapshot);
  const moodHistory = useLiveStore((s) => s.moodHistory);
  const connected = useLiveStore((s) => s.mollyAwake);

  const cx = 100, cy = 100, maxR = 72;
  const angleStep = (Math.PI * 2) / CIRCUIT_COUNT;
  const startAngle = -Math.PI / 2;

  const vertices = useMemo(() => {
    return CIRCUITS.map((cm, i) => {
      const angle = startAngle + i * angleStep;
      const level: AffectCircuitLevel | undefined = affectCircuits
        ? getAffectCircuitLevel(affectCircuits, cm.key as "seeking" | "rage" | "fear" | "lust" | "care" | "panic_grief" | "play")
        : undefined;
      const tonic = level?.tonic ?? 0.2;
      const phasic = level?.phasic ?? 0;
      const combined = Math.min(1, tonic + phasic);

      return {
        ...cm, angle, tonic, phasic, combined,
        tonicX: cx + Math.cos(angle) * tonic * maxR,
        tonicY: cy + Math.sin(angle) * tonic * maxR,
        phasicX: cx + Math.cos(angle) * combined * maxR,
        phasicY: cy + Math.sin(angle) * combined * maxR,
        axisX: cx + Math.cos(angle) * maxR,
        axisY: cy + Math.sin(angle) * maxR,
        labelX: cx + Math.cos(angle) * (maxR + 14),
        labelY: cy + Math.sin(angle) * (maxR + 14),
      };
    });
  }, [affectCircuits]);

  const tonicPath = smoothClosedPath(vertices.map((v) => ({ x: v.tonicX, y: v.tonicY })));
  const phasicPath = smoothClosedPath(vertices.map((v) => ({ x: v.phasicX, y: v.phasicY })));

  const valence = moodSnapshot?.valence ?? affectCircuits?.valence ?? 0;
  const arousal = moodSnapshot?.arousal ?? affectCircuits?.arousal ?? 0.5;
  const dominance = moodSnapshot?.dominance ?? affectCircuits?.dominance ?? 0.5;

  const online = connected && affectCircuits !== null;

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Affect Circuits (Panksepp 7)</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting affect data..." : "Offline"}
        </div>
      ) : (
        <>
          {/* Radar chart */}
          <svg viewBox="-20 -20 240 240" className="w-full" style={{ maxHeight: 230 }}>
            <defs>
              <radialGradient id="ac-tonic-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              <filter id="ac-glow">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>

            {/* Grid rings */}
            {[0.25, 0.5, 0.75, 1.0].map((ring) => (
              <circle key={ring} cx={cx} cy={cy} r={ring * maxR}
                fill="none" stroke="#ffffff06" strokeWidth="0.5" strokeDasharray={ring < 1 ? "2,3" : "none"} />
            ))}

            {/* Axes */}
            {vertices.map((v, i) => (
              <line key={i} x1={cx} y1={cy} x2={v.axisX} y2={v.axisY}
                stroke="#ffffff06" strokeWidth="0.4" />
            ))}

            {/* Tonic layer (background) */}
            <path d={tonicPath} fill="url(#ac-tonic-grad)" stroke="#ffffff15" strokeWidth="0.6"
              style={{ transition: "d 0.8s ease-out" }} />

            {/* Phasic layer (foreground) */}
            <path d={phasicPath} fill="none" filter="url(#ac-glow)" stroke="#ffffff08" strokeWidth="4"
              style={{ transition: "d 0.6s ease-out" }} />

            {/* Colored segments */}
            {vertices.map((v, i) => {
              const nextV = vertices[(i + 1) % CIRCUIT_COUNT];
              return (
                <path key={`seg-${i}`}
                  d={`M ${cx},${cy} L ${v.phasicX},${v.phasicY} Q ${(v.phasicX + nextV.phasicX) / 2},${(v.phasicY + nextV.phasicY) / 2} ${nextV.phasicX},${nextV.phasicY} Z`}
                  fill={v.color} opacity={0.08}
                  style={{ transition: "d 0.6s ease-out" }}
                />
              );
            })}

            <path d={phasicPath} fill="none" stroke="#ffffffcc" strokeWidth="0.8" strokeLinejoin="round"
              style={{ transition: "d 0.6s ease-out" }} />

            {/* Nodes */}
            {vertices.map((v, i) => {
              const isActive = v.phasic > 0.1;
              return (
                <g key={`nd-${i}`}>
                  {isActive && (
                    <circle cx={v.phasicX} cy={v.phasicY} r="6" fill="none" stroke={v.color} strokeWidth="0.5" opacity="0.4">
                      <animate attributeName="r" values="5;10;5" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={v.phasicX} cy={v.phasicY} r={isActive ? 3 : 2}
                    fill={v.color} opacity={isActive ? 0.9 : 0.4}
                    style={{ transition: "cx 0.6s, cy 0.6s, r 0.3s" }}
                  />
                  <circle cx={v.phasicX} cy={v.phasicY} r="0.8" fill="white" opacity={isActive ? 0.8 : 0.3}
                    style={{ transition: "cx 0.6s, cy 0.6s" }} />
                </g>
              );
            })}

            {/* Labels */}
            {vertices.map((v, i) => {
              const isTop = Math.abs(v.angle + Math.PI / 2) < 0.4;
              const isBottom = Math.abs(v.angle - Math.PI / 2) < 0.4;
              const isLeft = v.angle > Math.PI / 2 || v.angle < -Math.PI / 2;
              const anchor = isTop || isBottom ? "middle" : isLeft ? "end" : "start";
              const dy = isTop ? -4 : isBottom ? 8 : 3;

              return (
                <g key={`lb-${i}`}>
                  <text x={v.labelX} y={v.labelY + dy} textAnchor={anchor}
                    fill={v.color} fontSize="8" fontWeight="700" fontFamily="system-ui, sans-serif" opacity="0.9">
                    {v.label}
                  </text>
                  <text x={v.labelX} y={v.labelY + dy + 9} textAnchor={anchor}
                    fill="#ffffff25" fontSize="5" fontFamily="'IBM Plex Mono', monospace">
                    {v.region}
                  </text>
                  <text x={v.labelX} y={v.labelY + dy + 16} textAnchor={anchor}
                    fill={v.color} fontSize="6" fontFamily="'IBM Plex Mono', monospace" opacity="0.6">
                    T:{(v.tonic * 100).toFixed(0)} P:{(v.phasic * 100).toFixed(0)}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* VAD indicators */}
          <div className="mt-1 space-y-1">
            <div className="text-[7px] uppercase tracking-wider mb-1" style={{ color: "#ffffff25" }}>
              Valence · Arousal · Dominance
            </div>
            <VADIndicator label="V" value={valence} min={-1} max={1} color="#34d399" />
            <VADIndicator label="A" value={arousal} min={0} max={1} color="#f59e0b" />
            <VADIndicator label="D" value={dominance} min={0} max={1} color="#6366f1" />
          </div>

          {/* Mood history mini-sparkline */}
          {moodHistory.length > 2 && (
            <div className="mt-2 pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="text-[7px] uppercase tracking-wider mb-1" style={{ color: "#ffffff20" }}>
                Mood Trajectory ({moodHistory.length} samples)
              </div>
              <svg viewBox="0 0 200 30" className="w-full" style={{ height: 30 }}>
                {/* Valence line */}
                <path
                  d={moodHistory.map((m, i) => {
                    const x = (i / (moodHistory.length - 1)) * 200;
                    const y = 15 - m.valence * 12;
                    return `${i === 0 ? "M" : "L"} ${x},${y}`;
                  }).join(" ")}
                  fill="none" stroke="#34d399" strokeWidth="0.8" opacity="0.6"
                />
                {/* Arousal line */}
                <path
                  d={moodHistory.map((m, i) => {
                    const x = (i / (moodHistory.length - 1)) * 200;
                    const y = 28 - m.arousal * 24;
                    return `${i === 0 ? "M" : "L"} ${x},${y}`;
                  }).join(" ")}
                  fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.4"
                />
                <line x1="0" y1="15" x2="200" y2="15" stroke="#ffffff08" strokeWidth="0.3" />
              </svg>
            </div>
          )}
        </>
      )}
    </BracketFrame>
  );
}
