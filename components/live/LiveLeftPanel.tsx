"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { NEUROTRANSMITTER_PATHWAYS } from "@/lib/collection-mapping";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import { BracketFrame, HudDivider, HudSectionTitle } from "./BracketFrame";
import LiveStatsPanel from "./LiveStatsPanel";

const NT_NAMES = Object.keys(NEUROTRANSMITTER_PATHWAYS);
const HISTORY_LENGTH = 80;

const NT_META: Record<string, {
  abbr: string; full: string; receptor: string;
  baseline: number; type: "excitatory" | "inhibitory" | "modulatory";
}> = {
  dopamine:       { abbr: "DA",   full: "Dopamine",       receptor: "D\u2081/D\u2082",      baseline: 0.15, type: "modulatory" },
  serotonin:      { abbr: "5-HT", full: "Serotonin",      receptor: "5-HT\u2082\u2090",     baseline: 0.20, type: "modulatory" },
  norepinephrine: { abbr: "NE",   full: "Norepinephrine", receptor: "\u03B1\u2081/\u03B2\u2081",      baseline: 0.10, type: "modulatory" },
  acetylcholine:  { abbr: "ACh",  full: "Acetylcholine",  receptor: "nAChR",    baseline: 0.12, type: "modulatory" },
  gaba:           { abbr: "GABA", full: "\u03B3-Aminobutyric",  receptor: "GABA\u2090/\u1D2E", baseline: 0.25, type: "inhibitory" },
  glutamate:      { abbr: "Glu",  full: "Glutamate",      receptor: "NMDA/AMPA", baseline: 0.22, type: "excitatory" },
};

const NT_COUNT = NT_NAMES.length;

const ntHistory: Record<string, number[]> = {};
for (const name of NT_NAMES) {
  ntHistory[name] = new Array(HISTORY_LENGTH).fill(NT_META[name]?.baseline ?? 0.1);
}

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

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

function NeuralTrace({ name, width, height }: { name: string; width: number; height: number }) {
  const { pathwayActivations, dopamineLevel } = useLiveStore();
  const color = NEUROTRANSMITTER_PATHWAYS[name]?.color || "#ff8833";
  const meta = NT_META[name];
  const baseline = meta?.baseline ?? 0.1;

  const active = pathwayActivations.filter(p => p.pathway === name);
  const phasic = active.length > 0 ? Math.max(...active.map(a => a.intensity)) : 0;
  let level = Math.min(1, baseline + phasic * 0.85);
  if (name === "dopamine") {
    level = Math.max(level, baseline + Math.max(0, (dopamineLevel - 0.5)) * 0.8);
  }

  const h = ntHistory[name];
  h.push(level);
  if (h.length > HISTORY_LENGTH) h.shift();

  const isPhasic = level > baseline + 0.05;
  const pad = 2;
  const traceH = height - pad * 2;
  const pts = h.map((val, i) => ({
    x: (i / (HISTORY_LENGTH - 1)) * width,
    y: pad + traceH - Math.min(val, 1) * traceH,
  }));
  const linePath = smoothPath(pts);
  const areaPath = linePath + ` L ${width},${height} L 0,${height} Z`;
  const baselineY = pad + traceH - baseline * traceH;
  const lastPt = pts[pts.length - 1];

  return (
    <div className="group relative">
      <div className="flex items-center gap-2">
        <div className="w-11 shrink-0 text-right">
          <div className="text-[10px] font-semibold leading-none transition-colors duration-300"
            style={{ color: isPhasic ? color : `${color}88` }}
          >
            {meta?.abbr || name}
          </div>
          <div className="text-[7px] leading-tight mt-0.5 transition-colors duration-300"
            style={{ color: isPhasic ? `${color}99` : "rgba(255,255,255,0.15)" }}
          >
            {meta?.receptor || ""}
          </div>
        </div>

        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}
          className="shrink-0 overflow-visible"
        >
          <defs>
            <linearGradient id={`nt-area-${name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={isPhasic ? 0.25 : 0.06} />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
            {isPhasic && (
              <filter id={`nt-glow-${name}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          <path d={areaPath} fill={`url(#nt-area-${name})`} />

          <line x1={0} y1={baselineY} x2={width} y2={baselineY}
            stroke={`${color}20`} strokeWidth="0.5" strokeDasharray="2,3"
          />

          <path d={linePath} fill="none"
            stroke={`${color}30`} strokeWidth="3" strokeLinecap="round"
          />

          <path d={linePath} fill="none"
            stroke={color} strokeWidth={isPhasic ? 1.4 : 0.8}
            strokeLinecap="round"
            opacity={isPhasic ? 0.9 : 0.4}
            filter={isPhasic ? `url(#nt-glow-${name})` : undefined}
          />

          {lastPt && (
            <>
              {isPhasic && (
                <circle cx={lastPt.x} cy={lastPt.y} r="5"
                  fill={color} opacity="0.15"
                >
                  <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.15;0.05;0.15" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={lastPt.x} cy={lastPt.y}
                r={isPhasic ? 2.5 : 1.5}
                fill={color}
                opacity={isPhasic ? 1 : 0.4}
              >
                {isPhasic && (
                  <animate attributeName="r" values="2;3;2" dur="1s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx={lastPt.x} cy={lastPt.y} r="0.8"
                fill="white" opacity={isPhasic ? 0.9 : 0.3}
              />
            </>
          )}
        </svg>

        <span className="w-6 text-right text-[9px] font-mono shrink-0 transition-colors duration-300"
          style={{ color: isPhasic ? color : "rgba(255,255,255,0.2)" }}
        >
          {(level * 100).toFixed(0)}
        </span>
      </div>

      <div className="absolute left-12 top-0 bottom-0 flex items-center pointer-events-none
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <span className="text-[8px] text-neutral-500 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-sm">
          {meta?.full} · {meta?.type}
        </span>
      </div>
    </div>
  );
}

function CognitiveProcesses() {
  const { activeProcesses, lastThalamicGate, lastCascade } = useLiveStore();

  return (
    <div className="mt-3 pt-1">
      <HudDivider />
      <HudSectionTitle>Cognitive State</HudSectionTitle>
      <div className="mt-2 space-y-1.5">
        {activeProcesses.length === 0 && !lastThalamicGate && !lastCascade && (
          <div className="text-[11px] text-neutral-600">No active processes</div>
        )}
        {activeProcesses.map((proc) => (
          <div key={proc.name} className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300">{proc.name}</span>
            {proc.tier && (
              <span className="text-neutral-600 text-[10px] ml-auto">{proc.tier}</span>
            )}
          </div>
        ))}
        {lastThalamicGate && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: lastThalamicGate.passed ? "#22c55e" : "#525252" }}
            />
            <span className="text-neutral-400">Thalamic gate</span>
            <span className={lastThalamicGate.passed ? "text-emerald-400 ml-auto" : "text-neutral-600 ml-auto"}>
              {lastThalamicGate.passed ? "open" : "closed"}
            </span>
          </div>
        )}
        {lastCascade && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-neutral-400">Hippocampal cascade</span>
            <span className="text-teal-400 ml-auto">{lastCascade.total_activated}</span>
          </div>
        )}
      </div>
    </div>
  );
}

const MONITORED_REGIONS = [
  "thalamus", "hippocampus", "amygdala", "hypothalamus",
  "caudate-nucleus", "putamen", "nucleus-accumbens", "substantia-nigra",
  "midbrain", "pons", "medulla",
  "cerebellum", "left-hemisphere", "right-hemisphere",
];

function ActiveRegions() {
  const { regionActivity, selectRegion } = useLiveStore();

  return (
    <div className="mt-3 pt-1">
      <HudDivider />
      <HudSectionTitle>Neural Regions</HudSectionTitle>
      <div className="mt-2 space-y-0.5">
        {MONITORED_REGIONS.map((regionId) => {
          const region = BRAIN_MODEL_REGISTRY.find(r => r.id === regionId);
          if (!region) return null;
          const activity = regionActivity.get(regionId);
          const intensity = activity?.intensity ?? 0;
          const isActive = intensity > 0.05;
          return (
            <button key={regionId}
              onClick={() => selectRegion(regionId)}
              className="w-full flex items-center gap-2 text-[11px] hover:bg-white/3 rounded px-1 py-0.5 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500"
                style={{
                  backgroundColor: isActive ? region.color : `${region.color}30`,
                  boxShadow: isActive ? `0 0 6px ${region.color}80` : "none",
                }}
              />
              <span className="truncate transition-colors duration-500"
                style={{ color: isActive ? "#d4d4d4" : "#525252" }}
              >
                {region.name}
              </span>
              <div className="ml-auto w-10 h-1 rounded-full overflow-hidden shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(intensity * 100, 0)}%`,
                    backgroundColor: region.color,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SynapticRadial() {
  const { pathwayActivations, dopamineLevel } = useLiveStore();

  const levels = useMemo(() => {
    const map: Record<string, number> = {};
    for (const name of NT_NAMES) {
      const active = pathwayActivations.filter(p => p.pathway === name);
      const baseline = NT_META[name]?.baseline ?? 0.1;
      const phasic = active.length > 0 ? Math.max(...active.map(a => a.intensity)) : 0;
      map[name] = Math.min(1, baseline + phasic * 0.85);
    }
    map.dopamine = Math.max(map.dopamine || 0, (NT_META.dopamine?.baseline ?? 0.15) + Math.max(0, (dopamineLevel - 0.5)) * 0.8);
    return map;
  }, [pathwayActivations, dopamineLevel]);

  const cx = 100, cy = 100, maxR = 72;
  const angleStep = (Math.PI * 2) / NT_COUNT;
  const startAngle = -Math.PI / 2;

  const vertices = NT_NAMES.map((name, i) => {
    const angle = startAngle + i * angleStep;
    const level = levels[name] || 0;
    const baseline = NT_META[name]?.baseline ?? 0.1;
    return {
      name, angle, level,
      x: cx + Math.cos(angle) * level * maxR,
      y: cy + Math.sin(angle) * level * maxR,
      baseX: cx + Math.cos(angle) * baseline * maxR,
      baseY: cy + Math.sin(angle) * baseline * maxR,
      axisX: cx + Math.cos(angle) * maxR,
      axisY: cy + Math.sin(angle) * maxR,
      labelX: cx + Math.cos(angle) * (maxR + 18),
      labelY: cy + Math.sin(angle) * (maxR + 18),
    };
  });

  const activePath = smoothClosedPath(vertices.map(v => ({ x: v.x, y: v.y })));
  const baselinePath = smoothClosedPath(vertices.map(v => ({ x: v.baseX, y: v.baseY })));

  return (
    <svg viewBox="0 0 200 200" className="w-full">
      <defs>
        {NT_NAMES.map((name, i) => {
          const color = NEUROTRANSMITTER_PATHWAYS[name]?.color || "#ff8833";
          const nextColor = NEUROTRANSMITTER_PATHWAYS[NT_NAMES[(i + 1) % NT_COUNT]]?.color || "#ff8833";
          const a1 = startAngle + i * angleStep;
          const a2 = startAngle + (i + 1) * angleStep;
          return (
            <linearGradient key={`sg-${name}`} id={`lp-seg-${name}`}
              x1={cx + Math.cos(a1) * 40} y1={cy + Math.sin(a1) * 40}
              x2={cx + Math.cos(a2) * 40} y2={cy + Math.sin(a2) * 40}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={nextColor} stopOpacity="0.1" />
            </linearGradient>
          );
        })}
        <radialGradient id="lp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,150,50,0.06)" />
          <stop offset="70%" stopColor="rgba(255,100,30,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="lp-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {[0.25, 0.5, 0.75, 1.0].map(ring => {
        const pts = NT_NAMES.map((_, i) => {
          const a = startAngle + i * angleStep;
          const r = ring * maxR;
          return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
        });
        return (
          <path key={ring} d={smoothClosedPath(pts)}
            fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"
            strokeDasharray={ring === 1 ? "none" : "2,3"}
          />
        );
      })}

      {vertices.map((v, i) => (
        <line key={`ax-${i}`} x1={cx} y1={cy} x2={v.axisX} y2={v.axisY}
          stroke="rgba(255,255,255,0.03)" strokeWidth="0.4"
        />
      ))}

      <path d={baselinePath} fill="none"
        stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="1.5,2.5"
      />

      <path d={activePath} fill="url(#lp-glow)" filter="url(#lp-blur)"
        style={{ transition: "d 0.4s ease-out" }}
      />

      {vertices.map((v, i) => {
        const nextV = vertices[(i + 1) % NT_COUNT];
        const mx = (v.x + nextV.x) / 2, my = (v.y + nextV.y) / 2;
        return (
          <path key={`seg-${i}`}
            d={`M ${cx},${cy} L ${v.x},${v.y} C ${mx},${my} ${mx},${my} ${nextV.x},${nextV.y} Z`}
            fill={`url(#lp-seg-${v.name})`}
            style={{ transition: "d 0.4s ease-out" }}
          />
        );
      })}

      <path d={activePath} fill="none"
        stroke="rgba(255,200,120,0.35)" strokeWidth="1" strokeLinejoin="round"
        style={{ transition: "d 0.4s ease-out" }}
      />

      {vertices.map((v, i) => {
        const color = NEUROTRANSMITTER_PATHWAYS[v.name]?.color || "#ff8833";
        const isPhasic = v.level > (NT_META[v.name]?.baseline ?? 0.1) + 0.05;
        return (
          <g key={`nd-${i}`}>
            {isPhasic && (
              <circle cx={v.x} cy={v.y} fill="none" stroke={color} strokeWidth="0.5"
                opacity="0.3" r="6"
              >
                <animate attributeName="r" values="5;12;5" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={v.x} cy={v.y} r={isPhasic ? 3.5 : 2.5}
              fill={color} opacity={isPhasic ? 0.9 : 0.4}
              style={{ transition: "cx 0.4s, cy 0.4s, r 0.3s, opacity 0.3s" }}
            >
              {isPhasic && (
                <animate attributeName="r" values="3;4.5;3" dur="1.2s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx={v.x} cy={v.y} r="1" fill="white"
              opacity={isPhasic ? 0.8 : 0.3}
              style={{ transition: "cx 0.4s, cy 0.4s" }}
            />
          </g>
        );
      })}

      {vertices.map((v, i) => {
        const color = NEUROTRANSMITTER_PATHWAYS[v.name]?.color || "#ff8833";
        const meta = NT_META[v.name];
        const isTop = Math.abs(v.angle + Math.PI / 2) < 0.3;
        const isBottom = Math.abs(v.angle - Math.PI / 2) < 0.3;
        const isLeft = v.angle > Math.PI / 2 || v.angle < -Math.PI / 2;
        const anchor = isTop || isBottom ? "middle" : isLeft ? "end" : "start";
        const dy = isTop ? -5 : isBottom ? 10 : 3;

        return (
          <g key={`lb-${i}`}>
            <text x={v.labelX} y={v.labelY + dy}
              textAnchor={anchor} fill={color}
              fontSize="7" fontWeight="700" fontFamily="system-ui, sans-serif" opacity="0.85"
            >
              {meta?.abbr || v.name}
            </text>
            <text x={v.labelX} y={v.labelY + dy + 7.5}
              textAnchor={anchor} fill="rgba(255,255,255,0.2)"
              fontSize="4.5" fontFamily="system-ui, sans-serif"
            >
              {meta?.receptor || ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function LiveLeftPanel() {
  return (
    <>
      <LiveStatsPanel />
      <BracketFrame variant="detail-3" className="p-4 overflow-hidden">
        <HudSectionTitle>Synaptic Activity</HudSectionTitle>
        <SynapticRadial />
        <div className="mt-1 space-y-1.5">
          {NT_NAMES.map((name) => (
            <NeuralTrace key={name} name={name} width={170} height={24} />
          ))}
        </div>
      </BracketFrame>
      <BracketFrame variant="notched" className="p-4 overflow-hidden shrink-0">
        <CognitiveProcesses />
      </BracketFrame>
      <BracketFrame variant="combo-d" className="p-4 overflow-hidden shrink-0">
        <ActiveRegions />
      </BracketFrame>
    </>
  );
}
