"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLiveStore } from "@/lib/live-store";

function MiniBarChart({
  values,
  max,
  color,
  label,
}: {
  values: number[];
  max: number;
  color: string;
  label: string;
}) {
  const normalizedValues = values.map((v) => Math.min(v / max, 1));

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] text-neutral-600 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-end gap-px h-6">
        {normalizedValues.map((v, i) => (
          <div
            key={i}
            className="w-1 rounded-t transition-all duration-200"
            style={{
              height: `${Math.max(v * 100, 4)}%`,
              backgroundColor: v > 0.7 ? "#ef4444" : color,
              opacity: 0.3 + v * 0.7,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function GaugeIndicator({
  value,
  max,
  label,
  color,
  unit = "",
}: {
  value: number;
  max: number;
  label: string;
  color: string;
  unit?: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] text-neutral-600 uppercase tracking-wider">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-[10px] font-mono" style={{ color }}>
          {value.toFixed(0)}
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function LiveMetricsBar() {
  const { queueStatus, systemVitals, emotionalState, connected, recentEvents } =
    useLiveStore();

  const queueDepths = useMemo(() => {
    const depths: number[] = [];
    for (const status of queueStatus.values()) {
      depths.push(status.pending + status.active);
    }
    while (depths.length < 10) depths.push(0);
    return depths.slice(-10);
  }, [queueStatus]);

  const totalQueueItems = useMemo(() => {
    let total = 0;
    for (const status of queueStatus.values()) {
      total += status.pending + status.active;
    }
    return total;
  }, [queueStatus]);

  const recentEventCounts = useMemo(() => {
    const now = Date.now();
    const buckets = Array(10).fill(0);
    const bucketSize = 1000;

    for (const event of recentEvents.slice(-100)) {
      const age = now - new Date(event.received_at).getTime();
      const bucket = Math.floor(age / bucketSize);
      if (bucket >= 0 && bucket < 10) {
        buckets[9 - bucket]++;
      }
    }
    return buckets;
  }, [recentEvents]);

  const valence = emotionalState?.valence ?? 0;
  const arousal = emotionalState?.arousal ?? 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="absolute bottom-4 left-4 right-4 z-20"
    >
      <div className="backdrop-blur-xl bg-black/40 border border-white/[0.06] rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: connected ? "#22c55e" : "#ef4444",
                boxShadow: connected
                  ? "0 0 6px #22c55e60"
                  : "0 0 6px #ef444460",
              }}
            />
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <MiniBarChart
              values={recentEventCounts}
              max={20}
              color="#6366f1"
              label="Events"
            />

            <MiniBarChart
              values={queueDepths}
              max={50}
              color="#06b6d4"
              label="Queues"
            />

            <div className="w-px h-8 bg-white/[0.06]" />

            {systemVitals && (
              <>
                <GaugeIndicator
                  value={systemVitals.cpu_percent}
                  max={100}
                  label="CPU"
                  color={
                    systemVitals.cpu_percent > 80 ? "#ef4444" : "#22c55e"
                  }
                  unit="%"
                />
                <GaugeIndicator
                  value={systemVitals.memory_percent}
                  max={100}
                  label="Memory"
                  color={
                    systemVitals.memory_percent > 80 ? "#ef4444" : "#06b6d4"
                  }
                  unit="%"
                />
              </>
            )}

            <div className="w-px h-8 bg-white/[0.06]" />

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-neutral-600 uppercase tracking-wider">
                Valence
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-gradient-to-r from-red-500/20 to-transparent" />
                    <div className="w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent" />
                  </div>
                  <motion.div
                    className="absolute top-0 bottom-0 w-1 rounded-full bg-white"
                    style={{ left: `${(valence + 1) * 50}%` }}
                    animate={{ left: `${(valence + 1) * 50}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span
                  className="text-[10px] font-mono"
                  style={{
                    color:
                      valence > 0.3
                        ? "#22c55e"
                        : valence < -0.3
                          ? "#ef4444"
                          : "#f59e0b",
                  }}
                >
                  {valence > 0 ? "+" : ""}
                  {valence.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-neutral-600 uppercase tracking-wider">
                Arousal
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-purple-500"
                    animate={{ width: `${arousal * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-[10px] font-mono text-purple-400">
                  {(arousal * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="w-px h-8 bg-white/[0.06]" />

            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-neutral-600 uppercase tracking-wider">
                Queue Total
              </span>
              <span className="text-sm font-mono text-cyan-400">
                {totalQueueItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
