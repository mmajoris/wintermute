"use client";

import { useLiveStore } from "@/lib/live-store";
import { BracketFrame } from "./BracketFrame";

export default function LiveTopBar({
  panelOpen,
  onTogglePanel,
}: {
  panelOpen: boolean;
  onTogglePanel: () => void;
}) {
  const { connected, eventsPerSecond, emotionalState, lastThoughtTick } =
    useLiveStore();

  const moodLabel = emotionalState?.mood ?? "Unknown";
  const moodValence = emotionalState?.valence ?? 0;
  const moodColor =
    moodValence > 0.3
      ? "#22c55e"
      : moodValence < -0.3
        ? "#ef4444"
        : "#f59e0b";

  return (
    <BracketFrame className="w-full px-4 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 shrink-0">
        <div
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: connected ? "#22c55e" : "#ef4444",
            boxShadow: connected
              ? "0 0 6px rgba(34, 197, 94, 0.5)"
              : "0 0 6px rgba(239, 68, 68, 0.5)",
          }}
        />
        <span className="text-[11px] font-medium tracking-[0.12em] uppercase"
          style={{ color: "rgba(0, 200, 220, 0.8)" }}>
          Live View
        </span>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-neutral-500 uppercase">Events</span>
          <span className="text-[11px] font-mono" style={{ color: "rgba(0, 200, 220, 0.85)" }}>
            {eventsPerSecond.toFixed(1)}/s
          </span>
        </div>
        {lastThoughtTick && (
          <>
            <div className="w-px h-3.5 bg-white/8" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-neutral-500 uppercase">Mood</span>
              <span className="text-[11px] font-medium" style={{ color: moodColor }}>
                {moodLabel}
              </span>
            </div>
            <div className="w-px h-3.5 bg-white/8" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-neutral-500 uppercase">Energy</span>
              <span className="text-[11px] font-mono text-purple-400/80">
                {((lastThoughtTick.energy ?? 0) * 100).toFixed(0)}%
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wide">
          {connected ? "ONLINE" : "OFFLINE"}
        </span>
        <button
          onClick={onTogglePanel}
          className="px-2.5 py-1 text-[10px] font-medium transition-all duration-200 border rounded"
          style={panelOpen ? {
            background: "rgba(0, 200, 220, 0.06)",
            color: "rgba(0, 200, 220, 0.85)",
            borderColor: "rgba(0, 200, 220, 0.2)",
          } : {
            background: "transparent",
            color: "rgba(163, 163, 163, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.06)",
          }}
        >
          Processes
        </button>
      </div>
    </BracketFrame>
  );
}
