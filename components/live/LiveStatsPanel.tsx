"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "./BracketFrame";

const TEAL = "rgba(0, 200, 220, ";

function tealAlpha(alpha: number) {
  return `${TEAL}${alpha})`;
}

export default function LiveStatsPanel() {
  const { systemVitals, eventsPerSecond, dopamineLevel, emotionalState } =
    useLiveStore();

  const stats = useMemo(() => {
    const cpu = systemVitals?.cpu_percent ?? 0;
    const mem = systemVitals?.memory_percent ?? 0;
    const valence = emotionalState?.valence ?? 0;
    const arousal = emotionalState?.arousal ?? 0.5;

    return [
      { label: "CPU", value: cpu, max: 100, critical: cpu > 80 },
      { label: "MEM", value: mem, max: 100, critical: mem > 80 },
      { label: "EV/s", value: Math.min(eventsPerSecond, 50), max: 50, critical: false },
      { label: "DA", value: dopamineLevel * 100, max: 100, critical: false },
      { label: "VAL", value: (valence + 1) * 50, max: 100, critical: false },
      { label: "ARO", value: arousal * 100, max: 100, critical: false },
    ];
  }, [systemVitals, eventsPerSecond, dopamineLevel, emotionalState]);

  return (
    <BracketFrame variant="detail-5" className="p-4 shrink-0">
      <HudSectionTitle>System Vitals</HudSectionTitle>
      <div className="mt-2 space-y-2">
        {stats.map(({ label, value, max, critical }) => {
          const fillAlpha = critical ? 0.4 : 0.65;
          const textAlpha = critical ? 0.6 : 0.9;
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className="w-8 text-[10px] font-mono shrink-0"
                style={{ color: tealAlpha(0.7) }}
              >
                {label}
              </span>
              <div
                className="flex-1 h-1.5 rounded-sm overflow-hidden"
                style={{
                  backgroundColor: "rgba(0, 4, 8, 0.9)",
                  border: "1px solid rgba(0, 180, 220, 0.12)",
                }}
              >
                <div
                  className="h-full rounded-sm transition-all duration-500"
                  style={{
                    width: `${Math.min((value / max) * 100, 100)}%`,
                    backgroundColor: tealAlpha(fillAlpha),
                  }}
                />
              </div>
              <span
                className="w-8 text-right text-[10px] font-mono shrink-0"
                style={{ color: tealAlpha(textAlpha) }}
              >
                {value.toFixed(0)}
              </span>
            </div>
          );
        })}
      </div>
    </BracketFrame>
  );
}
