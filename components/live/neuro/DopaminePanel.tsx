"use client";

import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

const TONIC_HISTORY_LEN = 60;
const PHASIC_HISTORY_LEN = 60;
const RPE_HISTORY_LEN = 60;

const tonicHistory: number[] = new Array(TONIC_HISTORY_LEN).fill(0.4);
const phasicHistory: number[] = new Array(PHASIC_HISTORY_LEN).fill(0);
const rpeHistory: number[] = new Array(RPE_HISTORY_LEN).fill(0);

function MiniTrace({
  data,
  width,
  height,
  color,
  baseline,
  label,
  value,
}: {
  data: number[];
  width: number;
  height: number;
  color: string;
  baseline: number;
  label: string;
  value: string;
}) {
  const baselineY = height - baseline * height;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - Math.max(0, Math.min(1, (v + 1) / 2)) * height,
  }));

  let d = "";
  for (let i = 0; i < pts.length; i++) {
    d += `${i === 0 ? "M" : "L"} ${pts[i].x},${pts[i].y} `;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-[8px] font-bold" style={{ color }}>{label}</span>
        <span className="text-[9px] font-mono" style={{ color: `${color}bb` }}>{value}</span>
      </div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <line x1={0} y1={baselineY} x2={width} y2={baselineY}
          stroke={`${color}20`} strokeWidth="0.5" strokeDasharray="2,3" />
        <path d={d + `L ${width},${height} L 0,${height} Z`}
          fill={`${color}08`} />
        <path d={d} fill="none" stroke={`${color}25`} strokeWidth="2" />
        <path d={d} fill="none" stroke={color} strokeWidth="0.8" opacity="0.7" />
        {pts.length > 0 && (
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2"
            fill={color} opacity="0.8" />
        )}
      </svg>
    </div>
  );
}

function PathwayDiagram({ vtaRate, nacActivity }: { vtaRate: number; nacActivity: number }) {
  const vtaPct = Math.max(0, Math.min(100, vtaRate * 100));
  const nacPct = Math.max(0, Math.min(100, nacActivity * 100));

  return (
    <svg viewBox="0 0 240 50" className="w-full" style={{ height: 50 }}>
      {/* VTA */}
      <rect x="8" y="12" width="64" height="26" rx="3" fill="#6366f110" stroke="#6366f140" strokeWidth="0.5" />
      <text x="40" y="22" textAnchor="middle" fill="#6366f1cc" fontSize="6.5" fontWeight="bold"
        fontFamily="'IBM Plex Mono', monospace">VTA</text>
      <text x="40" y="32" textAnchor="middle" fill="#6366f188" fontSize="5"
        fontFamily="'IBM Plex Mono', monospace">Fire: {vtaPct.toFixed(0)}%</text>

      {/* Arrow: mesolimbic pathway */}
      <line x1="74" y1="25" x2="102" y2="25" stroke="#6366f150" strokeWidth="1.2" />
      <polygon points="102,22 108,25 102,28" fill="#6366f160" />
      <text x="91" y="18" textAnchor="middle" fill="#ffffff20" fontSize="4"
        fontFamily="'IBM Plex Mono', monospace">mesolimbic</text>

      {/* NAc */}
      <rect x="110" y="12" width="64" height="26" rx="3" fill="#f59e0b10" stroke="#f59e0b40" strokeWidth="0.5" />
      <text x="142" y="22" textAnchor="middle" fill="#f59e0bcc" fontSize="6.5" fontWeight="bold"
        fontFamily="'IBM Plex Mono', monospace">NAc</text>
      <text x="142" y="32" textAnchor="middle" fill="#f59e0b88" fontSize="5"
        fontFamily="'IBM Plex Mono', monospace">Act: {nacPct.toFixed(0)}%</text>

      {/* Arrow to PFC */}
      <line x1="176" y1="25" x2="198" y2="25" stroke="#f59e0b40" strokeWidth="1" />
      <polygon points="198,22.5 203,25 198,27.5" fill="#f59e0b50" />

      {/* PFC */}
      <rect x="205" y="16" width="30" height="18" rx="2" fill="#22c55e08" stroke="#22c55e30" strokeWidth="0.5" />
      <text x="220" y="28" textAnchor="middle" fill="#22c55e88" fontSize="5.5" fontWeight="bold"
        fontFamily="'IBM Plex Mono', monospace">PFC</text>

      {/* Nigrostriatal fork */}
      <line x1="40" y1="40" x2="40" y2="46" stroke="#6366f130" strokeWidth="0.6" />
      <text x="40" y="49" textAnchor="middle" fill="#ffffff15" fontSize="3.5"
        fontFamily="'IBM Plex Mono', monospace">nigrostriatal → dorsal striatum</text>
    </svg>
  );
}

export default function DopaminePanel() {
  const dopamineState = useLiveStore((s) => s.dopamineState);
  const connected = useLiveStore((s) => s.connected);
  if (dopamineState) {
    tonicHistory.push(dopamineState.tonic);
    if (tonicHistory.length > TONIC_HISTORY_LEN) tonicHistory.shift();

    phasicHistory.push(dopamineState.phasic);
    if (phasicHistory.length > PHASIC_HISTORY_LEN) phasicHistory.shift();

    rpeHistory.push(dopamineState.reward_prediction_error);
    if (rpeHistory.length > RPE_HISTORY_LEN) rpeHistory.shift();
  }

  const online = connected && dopamineState !== null;

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Dopamine System</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting DA data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          <PathwayDiagram
            vtaRate={dopamineState?.vta_firing_rate ?? 0}
            nacActivity={dopamineState?.nac_activity ?? 0}
          />

          <div className="space-y-2">
            <MiniTrace
              data={tonicHistory.map((v) => v * 2 - 1)}
              width={240} height={28} color="#6366f1"
              baseline={0.5} label="DA Tonic"
              value={(dopamineState?.tonic ?? 0).toFixed(2)}
            />
            <MiniTrace
              data={phasicHistory.map((v) => v * 2 - 1)}
              width={240} height={28} color="#a78bfa"
              baseline={0.5} label="DA Phasic"
              value={(dopamineState?.phasic ?? 0).toFixed(2)}
            />
            <MiniTrace
              data={rpeHistory}
              width={240} height={28} color="#f59e0b"
              baseline={0.5} label="RPE"
              value={(() => {
                const rpe = dopamineState?.reward_prediction_error ?? 0;
                return `${rpe >= 0 ? "+" : ""}${rpe.toFixed(3)}`;
              })()}
            />
          </div>

          <div className="flex gap-3 pt-1" style={{ borderTop: "1px solid #ffffff08" }}>
            <div className="flex-1">
              <div className="text-[7px] uppercase tracking-wider" style={{ color: "#ffffff20" }}>Learning Signal</div>
              <div className="text-[10px] font-mono mt-0.5" style={{
                color: (dopamineState?.learning_signal ?? 0) > 0.3 ? "#34d399" :
                  (dopamineState?.learning_signal ?? 0) < -0.3 ? "#ef4444" : "#ffffff55"
              }}>
                {(dopamineState?.learning_signal ?? 0).toFixed(3)}
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[7px] uppercase tracking-wider" style={{ color: "#ffffff20" }}>VTA Rate</div>
              <div className="text-[10px] font-mono mt-0.5" style={{ color: "#6366f1aa" }}>
                {((dopamineState?.vta_firing_rate ?? 0) * 100).toFixed(0)}%
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[7px] uppercase tracking-wider" style={{ color: "#ffffff20" }}>NAc Activity</div>
              <div className="text-[10px] font-mono mt-0.5" style={{ color: "#f59e0baa" }}>
                {((dopamineState?.nac_activity ?? 0) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </BracketFrame>
  );
}
