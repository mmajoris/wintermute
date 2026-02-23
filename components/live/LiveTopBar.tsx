"use client";

import { motion } from "framer-motion";
import { useLiveStore } from "@/lib/live-store";

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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-2xl px-1.5 py-1.5 flex items-center gap-1">
        <div className="px-3 flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: connected ? "#22c55e" : "#ef4444",
              boxShadow: connected
                ? "0 0 8px #22c55e80"
                : "0 0 8px #ef444480",
            }}
          />
          <span className="text-xs font-semibold text-neutral-300 tracking-wide">
            LIVE VIEW
          </span>
        </div>

        <div className="w-px h-5 bg-white/[0.06]" />

        <div className="px-3 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-neutral-500 uppercase">
              Events
            </span>
            <span className="text-xs font-mono text-cyan-400">
              {eventsPerSecond.toFixed(1)}/s
            </span>
          </div>

          {lastThoughtTick && (
            <>
              <div className="w-px h-4 bg-white/[0.04]" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-neutral-500 uppercase">
                  Mood
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: moodColor }}
                >
                  {moodLabel}
                </span>
              </div>
              <div className="w-px h-4 bg-white/[0.04]" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-neutral-500 uppercase">
                  Energy
                </span>
                <span className="text-xs font-mono text-purple-400">
                  {((lastThoughtTick.energy ?? 0) * 100).toFixed(0)}%
                </span>
              </div>
            </>
          )}
        </div>

        <div className="w-px h-5 bg-white/[0.06]" />

        <button
          onClick={onTogglePanel}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
            panelOpen
              ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
              : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.04]"
          }`}
        >
          Processes
        </button>
      </div>
    </motion.div>
  );
}
