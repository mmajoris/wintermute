"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import type { OscillationPopulation } from "@/lib/brain-events";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

interface ElectrodePos {
  id: string;
  x: number;
  y: number;
}

const ELECTRODES: ElectrodePos[] = [
  { id: "Fp1", x: 0.37, y: 0.12 },
  { id: "Fp2", x: 0.63, y: 0.12 },
  { id: "F7",  x: 0.17, y: 0.30 },
  { id: "F3",  x: 0.35, y: 0.30 },
  { id: "Fz",  x: 0.50, y: 0.28 },
  { id: "F4",  x: 0.65, y: 0.30 },
  { id: "F8",  x: 0.83, y: 0.30 },
  { id: "T3",  x: 0.08, y: 0.50 },
  { id: "C3",  x: 0.33, y: 0.50 },
  { id: "Cz",  x: 0.50, y: 0.50 },
  { id: "C4",  x: 0.67, y: 0.50 },
  { id: "T4",  x: 0.92, y: 0.50 },
  { id: "T5",  x: 0.17, y: 0.70 },
  { id: "P3",  x: 0.35, y: 0.70 },
  { id: "Pz",  x: 0.50, y: 0.72 },
  { id: "P4",  x: 0.65, y: 0.70 },
  { id: "T6",  x: 0.83, y: 0.70 },
  { id: "O1",  x: 0.37, y: 0.88 },
  { id: "Oz",  x: 0.50, y: 0.90 },
  { id: "O2",  x: 0.63, y: 0.88 },
];

const GRID_SIZE = 32;

function getPowerAtPoint(
  px: number,
  py: number,
  electrodes: ElectrodePos[],
  powerMap: Map<string, number>,
): number {
  let sumW = 0;
  let sumV = 0;
  for (const e of electrodes) {
    const dx = px - e.x;
    const dy = py - e.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const w = 1 / (dist * dist + 0.001);
    sumW += w;
    sumV += w * (powerMap.get(e.id) ?? 0.3);
  }
  return sumW > 0 ? sumV / sumW : 0;
}

function powerToColor(power: number): string {
  const t = Math.max(0, Math.min(1, power));
  if (t < 0.25) {
    const s = t / 0.25;
    return `rgb(${Math.round(10 + s * 20)}, ${Math.round(20 + s * 60)}, ${Math.round(80 + s * 100)})`;
  }
  if (t < 0.5) {
    const s = (t - 0.25) / 0.25;
    return `rgb(${Math.round(30 + s * 20)}, ${Math.round(80 + s * 100)}, ${Math.round(180 - s * 60)})`;
  }
  if (t < 0.75) {
    const s = (t - 0.5) / 0.25;
    return `rgb(${Math.round(50 + s * 180)}, ${Math.round(180 + s * 60)}, ${Math.round(120 - s * 80)})`;
  }
  const s = (t - 0.75) / 0.25;
  return `rgb(${Math.round(230 + s * 25)}, ${Math.round(240 - s * 140)}, ${Math.round(40 - s * 30)})`;
}

function buildPowerMap(populations: OscillationPopulation[] | undefined): Map<string, number> {
  const map = new Map<string, number>();
  if (!populations) {
    for (const e of ELECTRODES) map.set(e.id, 0.3);
    return map;
  }
  for (const e of ELECTRODES) {
    const pop = populations.find((p) => p.id === e.id);
    map.set(e.id, pop ? pop.amplitude : 0.3);
  }
  return map;
}

export default function BrainTopography() {
  const oscillationState = useLiveStore((s) => s.oscillationState);
  const connected = useLiveStore((s) => s.mollyAwake);

  const powerMap = useMemo(() => buildPowerMap(oscillationState?.populations), [oscillationState]);

  const heatmapCells = useMemo(() => {
    const cells: { x: number; y: number; color: string }[] = [];
    const step = 1 / GRID_SIZE;
    const cx = 0.5, cy = 0.5, headR = 0.42;

    for (let gx = 0; gx < GRID_SIZE; gx++) {
      for (let gy = 0; gy < GRID_SIZE; gy++) {
        const px = (gx + 0.5) * step;
        const py = (gy + 0.5) * step;
        const dx = px - cx;
        const dy = py - cy;
        if (dx * dx + dy * dy > headR * headR) continue;
        const power = getPowerAtPoint(px, py, ELECTRODES, powerMap);
        cells.push({ x: gx, y: gy, color: powerToColor(power) });
      }
    }
    return cells;
  }, [powerMap]);

  const vbSize = 200;
  const cx = vbSize / 2;
  const cy = vbSize / 2;
  const headR = vbSize * 0.42;

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col" style={{ minHeight: 280 }}>
      <HudSectionTitle>
        qEEG Topography
        <span className="ml-auto text-[8px] font-normal" style={{ color: connected ? "#34d399" : "#525252" }}>
          {connected ? "LIVE" : "—"}
        </span>
      </HudSectionTitle>

      <svg viewBox={`0 0 ${vbSize} ${vbSize}`} className="w-full mt-1 flex-1" style={{ maxHeight: 260 }}>
        <defs>
          <clipPath id="head-clip">
            <circle cx={cx} cy={cy} r={headR} />
          </clipPath>
          <filter id="topo-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r={headR + 1} fill="none" stroke="#ffffff08" strokeWidth="1" />

        <g clipPath="url(#head-clip)" filter="url(#topo-blur)">
          {heatmapCells.map((cell, i) => {
            const step = vbSize / GRID_SIZE;
            return (
              <rect
                key={i}
                x={cell.x * step}
                y={cell.y * step}
                width={step + 0.5}
                height={step + 0.5}
                fill={cell.color}
                opacity={0.85}
              />
            );
          })}
        </g>

        <circle cx={cx} cy={cy} r={headR} fill="none" stroke="#ffffff20" strokeWidth="1.5" />

        {/* Nose */}
        <path
          d={`M ${cx - 6} ${cy - headR + 2} L ${cx} ${cy - headR - 8} L ${cx + 6} ${cy - headR + 2}`}
          fill="none" stroke="#ffffff25" strokeWidth="1.2"
        />

        {/* Ears */}
        <ellipse cx={cx - headR - 3} cy={cy} rx="4" ry="8" fill="none" stroke="#ffffff15" strokeWidth="1" />
        <ellipse cx={cx + headR + 3} cy={cy} rx="4" ry="8" fill="none" stroke="#ffffff15" strokeWidth="1" />

        {/* Electrode positions */}
        {ELECTRODES.map((e) => {
          const ex = e.x * vbSize;
          const ey = e.y * vbSize;
          const power = powerMap.get(e.id) ?? 0.3;
          return (
            <g key={e.id}>
              <circle cx={ex} cy={ey} r="3" fill="none" stroke="#ffffffcc" strokeWidth="0.5" />
              <circle cx={ex} cy={ey} r="1" fill="#ffffffaa" />
              <text x={ex} y={ey - 5} textAnchor="middle" fill="#ffffffaa" fontSize="5.5"
                fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
                {e.id}
              </text>
              <text x={ex} y={ey + 8} textAnchor="middle" fill="#ffffff55" fontSize="4"
                fontFamily="'IBM Plex Mono', monospace">
                {(power * 100).toFixed(0)}
              </text>
            </g>
          );
        })}

        {/* Color legend */}
        <defs>
          <linearGradient id="topo-legend" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(10,20,80)" />
            <stop offset="25%" stopColor="rgb(30,80,180)" />
            <stop offset="50%" stopColor="rgb(50,180,120)" />
            <stop offset="75%" stopColor="rgb(230,240,40)" />
            <stop offset="100%" stopColor="rgb(255,100,10)" />
          </linearGradient>
        </defs>
        <rect x="20" y={vbSize - 14} width="60" height="5" rx="1" fill="url(#topo-legend)" />
        <text x="20" y={vbSize - 16} fill="#ffffff50" fontSize="4" fontFamily="'IBM Plex Mono', monospace">Low</text>
        <text x="80" y={vbSize - 16} fill="#ffffff50" fontSize="4" fontFamily="'IBM Plex Mono', monospace" textAnchor="end">High</text>
        <text x="50" y={vbSize - 16} fill="#ffffff40" fontSize="3.5" fontFamily="'IBM Plex Mono', monospace" textAnchor="middle">Power (μV²)</text>
      </svg>
    </BracketFrame>
  );
}
