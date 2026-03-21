"use client";

import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

const HOUR_MARKS = Array.from({ length: 24 }, (_, i) => i);

function CircadianClock({ circadianTime, alertness, sleepPressure, theta }: {
  circadianTime: number; alertness: number; sleepPressure: number; theta: number;
}) {
  const cx = 90, cy = 90, r = 72;
  const hourAngle = ((circadianTime / 24) * 360 - 90) * (Math.PI / 180);
  const markerX = cx + Math.cos(hourAngle) * (r - 8);
  const markerY = cy + Math.sin(hourAngle) * (r - 8);

  const alertnessPoints = HOUR_MARKS.map((h) => {
    const a = ((h / 24) * 360 - 90) * (Math.PI / 180);
    const baseAlertness = 0.5 + 0.4 * Math.cos(((h - 14) / 24) * Math.PI * 2);
    const radius = r * 0.3 + baseAlertness * r * 0.5;
    return { x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius };
  });

  const alertnessPath = alertnessPoints.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${p.x},${p.y}`
  ).join(" ") + " Z";

  return (
    <svg viewBox="0 0 180 180" className="w-full" style={{ maxHeight: 200 }}>
      {/* Night arc (21:00-06:00) */}
      <path
        d={`M ${cx + Math.cos(((21 / 24) * 360 - 90) * Math.PI / 180) * r} ${cy + Math.sin(((21 / 24) * 360 - 90) * Math.PI / 180) * r}
            A ${r} ${r} 0 0 1 ${cx + Math.cos(((6 / 24) * 360 - 90) * Math.PI / 180) * r} ${cy + Math.sin(((6 / 24) * 360 - 90) * Math.PI / 180) * r}`}
        fill="none" stroke="#3b82f620" strokeWidth="8"
      />

      {/* Day arc (06:00-21:00) */}
      <path
        d={`M ${cx + Math.cos(((6 / 24) * 360 - 90) * Math.PI / 180) * r} ${cy + Math.sin(((6 / 24) * 360 - 90) * Math.PI / 180) * r}
            A ${r} ${r} 0 0 1 ${cx + Math.cos(((21 / 24) * 360 - 90) * Math.PI / 180) * r} ${cy + Math.sin(((21 / 24) * 360 - 90) * Math.PI / 180) * r}`}
        fill="none" stroke="#fbbf2415" strokeWidth="8"
      />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff10" strokeWidth="1" />

      {/* Alertness curve */}
      <path d={alertnessPath} fill="#34d39908" stroke="#34d39940" strokeWidth="0.8" />

      {/* Hour marks */}
      {HOUR_MARKS.map((h) => {
        const a = ((h / 24) * 360 - 90) * (Math.PI / 180);
        const isMajor = h % 6 === 0;
        const innerR = r - (isMajor ? 8 : 4);
        const outerR = r;
        return (
          <g key={h}>
            <line
              x1={cx + Math.cos(a) * innerR}
              y1={cy + Math.sin(a) * innerR}
              x2={cx + Math.cos(a) * outerR}
              y2={cy + Math.sin(a) * outerR}
              stroke={isMajor ? "#ffffff30" : "#ffffff10"}
              strokeWidth={isMajor ? 1 : 0.5}
            />
            {isMajor && (
              <text
                x={cx + Math.cos(a) * (r + 10)}
                y={cy + Math.sin(a) * (r + 10)}
                textAnchor="middle" dominantBaseline="central"
                fill="#ffffff55" fontSize="7" fontFamily="'IBM Plex Mono', monospace" fontWeight="600"
              >
                {String(h).padStart(2, "0")}
              </text>
            )}
          </g>
        );
      })}

      {/* Circadian markers */}
      {/* Cortisol Awakening Response ~06:00-08:00 */}
      <text
        x={cx + Math.cos(((7 / 24) * 360 - 90) * Math.PI / 180) * (r * 0.6)}
        y={cy + Math.sin(((7 / 24) * 360 - 90) * Math.PI / 180) * (r * 0.6)}
        textAnchor="middle" fill="#ef444455" fontSize="4"
        fontFamily="'IBM Plex Mono', monospace"
      >
        CAR
      </text>

      {/* Melatonin onset ~21:00 */}
      <text
        x={cx + Math.cos(((21 / 24) * 360 - 90) * Math.PI / 180) * (r * 0.55)}
        y={cy + Math.sin(((21 / 24) * 360 - 90) * Math.PI / 180) * (r * 0.55)}
        textAnchor="middle" fill="#3b82f655" fontSize="4"
        fontFamily="'IBM Plex Mono', monospace"
      >
        MLT onset
      </text>

      {/* Current position marker */}
      <circle cx={markerX} cy={markerY} r="5" fill="none" stroke="#06b6d4" strokeWidth="1.5">
        <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={markerX} cy={markerY} r="2.5" fill="#06b6d4" />
      <circle cx={markerX} cy={markerY} r="1" fill="white" opacity="0.8" />

      {/* Center info */}
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#06b6d4dd" fontSize="14"
        fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">
        {String(Math.floor(circadianTime)).padStart(2, "0")}:{String(Math.floor((circadianTime % 1) * 60)).padStart(2, "0")}
      </text>
      <text x={cx} y={cy + 4} textAnchor="middle" fill="#ffffff30" fontSize="5"
        fontFamily="'IBM Plex Mono', monospace">
        CT (circadian time)
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#ffffff20" fontSize="4.5"
        fontFamily="'IBM Plex Mono', monospace">
        θ = {theta.toFixed(2)} rad
      </text>
    </svg>
  );
}

function MetricBar({ label, value, color, warningThreshold }: {
  label: string; value: number; color: string; warningThreshold?: number;
}) {
  const pct = Math.max(0, Math.min(100, value * 100));
  const isWarning = warningThreshold !== undefined && value > warningThreshold;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[7px] w-16 uppercase tracking-wider" style={{ color: `${color}88` }}>{label}</span>
      <div className="flex-1 h-2 rounded-sm overflow-hidden" style={{ background: "#ffffff08" }}>
        <div className="h-full rounded-sm transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: isWarning ? "#ef4444" : color,
            boxShadow: isWarning ? "0 0 6px #ef444440" : "none",
          }}
        />
      </div>
      <span className="text-[8px] font-mono w-8 text-right"
        style={{ color: isWarning ? "#ef4444" : `${color}aa` }}>
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

export default function CircadianPanel() {
  const circadian = useLiveStore((s) => s.circadianState);
  const homeostasis = useLiveStore((s) => s.homeostasisState);
  const connected = useLiveStore((s) => s.eventsPerSecond > 0);

  const online = connected && (circadian !== null || homeostasis !== null);

  const modeColors: Record<string, { bg: string; text: string; label: string }> = {
    homeostatic: { bg: "#22c55e15", text: "#22c55e", label: "HOMEOSTATIC" },
    allostatic: { bg: "#fbbf2415", text: "#fbbf24", label: "ALLOSTATIC" },
    allostatic_overload: { bg: "#ef444420", text: "#ef4444", label: "ALLOSTATIC OVERLOAD" },
  };
  const mode = homeostasis?.operating_mode ?? "homeostatic";
  const modeStyle = modeColors[mode] ?? modeColors.homeostatic;

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Circadian & Homeostasis</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting circadian data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-1 space-y-2">
          {circadian && (
            <CircadianClock
              circadianTime={circadian.circadian_time}
              alertness={circadian.alertness}
              sleepPressure={circadian.sleep_pressure}
              theta={circadian.theta}
            />
          )}

          {circadian && (
            <div className="space-y-1">
              <MetricBar label="Alertness" value={circadian.alertness} color="#34d399" />
              <MetricBar label="Sleep Press." value={circadian.sleep_pressure} color="#3b82f6" warningThreshold={0.8} />
            </div>
          )}

          {homeostasis && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center gap-2">
                <span className="text-[7px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Operating Mode</span>
                <span className="text-[8px] font-bold px-2 py-0.5 rounded"
                  style={{ color: modeStyle.text, background: modeStyle.bg }}>
                  {modeStyle.label}
                </span>
              </div>
              <MetricBar label="Resource Util." value={homeostasis.resource_utilization} color="#f59e0b" warningThreshold={0.85} />
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
