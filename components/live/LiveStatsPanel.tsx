"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "./BracketFrame";
import HudBarChart, { BarData } from "@/components/ui/HudBarChart";

export default function LiveStatsPanel() {
  const { systemVitals, eventsPerSecond, dopamineLevel, emotionalState, connected } =
    useLiveStore();

  const online = connected && eventsPerSecond > 0;

  const stats: BarData[] = useMemo(() => {
    if (!online) {
      return [
        { label: "CPU", value: 0, maxValue: 100 },
        { label: "MEM", value: 0, maxValue: 100 },
        { label: "EV/s", value: 0, maxValue: 50 },
        { label: "DA", value: 0, maxValue: 100 },
        { label: "VAL", value: 0, maxValue: 100 },
        { label: "ARO", value: 0, maxValue: 100 },
      ];
    }

    const cpu = systemVitals?.cpu_percent ?? 0;
    const mem = systemVitals?.memory_percent ?? 0;
    const valence = emotionalState?.valence ?? 0;
    const arousal = emotionalState?.arousal ?? 0.5;

    return [
      { label: "CPU", value: cpu, maxValue: 100 },
      { label: "MEM", value: mem, maxValue: 100 },
      { label: "EV/s", value: Math.min(eventsPerSecond, 50), maxValue: 50 },
      { label: "DA", value: dopamineLevel * 100, maxValue: 100 },
      { label: "VAL", value: (valence + 1) * 50, maxValue: 100 },
      { label: "ARO", value: arousal * 100, maxValue: 100 },
    ];
  }, [online, systemVitals, eventsPerSecond, dopamineLevel, emotionalState]);

  return (
    <BracketFrame variant="detail-5" className="p-4 shrink-0">
      <HudSectionTitle>System Vitals</HudSectionTitle>
      <div className="mt-2">
        <HudBarChart
          data={stats}
          barHeight={9}
          barGap={3}
          glitch="catastrophic"
          glitchIntensity={3.0}
        />
      </div>
    </BracketFrame>
  );
}
