"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "./BracketFrame";

export default function LiveStatsPanel() {
  const { systemVitals, eventsPerSecond, dopamineLevel, emotionalState } =
    useLiveStore();

  const stats = useMemo(() => {
    const cpu = systemVitals?.cpu_percent ?? 0;
    const mem = systemVitals?.memory_percent ?? 0;
    const valence = emotionalState?.valence ?? 0;
    const arousal = emotionalState?.arousal ?? 0.5;

    return [
      { label: "CPU", value: cpu, max: 100, color: cpu > 80 ? "#ef4444" : "#22c55e" },
      { label: "MEM", value: mem, max: 100, color: mem > 80 ? "#ef4444" : "#00e5ff" },
      { label: "EV/s", value: Math.min(eventsPerSecond, 50), max: 50, color: "#6366f1" },
      { label: "DA", value: dopamineLevel * 100, max: 100, color: "#f59e0b" },
      { label: "VAL", value: (valence + 1) * 50, max: 100, color: valence > 0.3 ? "#22c55e" : valence < -0.3 ? "#ef4444" : "#f59e0b" },
      { label: "ARO", value: arousal * 100, max: 100, color: "#a855f7" },
    ];
  }, [systemVitals, eventsPerSecond, dopamineLevel, emotionalState]);

  return (
    <BracketFrame className="p-4 shrink-0">
      <HudSectionTitle>System Vitals</HudSectionTitle>
      <div className="mt-2 space-y-2">
        {stats.map(({ label, value, max, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-8 text-[10px] font-mono text-neutral-400 shrink-0">
              {label}
            </span>
            <div
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((value / max) * 100, 100)}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            <span
              className="w-8 text-right text-[10px] font-mono shrink-0"
              style={{ color }}
            >
              {value.toFixed(0)}
            </span>
          </div>
        ))}
      </div>
    </BracketFrame>
  );
}
