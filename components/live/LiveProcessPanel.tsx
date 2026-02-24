"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLiveStore, getFilteredEvents } from "@/lib/live-store";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import { getCollectionsForRegion, NEUROTRANSMITTER_PATHWAYS } from "@/lib/collection-mapping";
import type { BrainEvent } from "@/lib/brain-events";

function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function EventIcon({ type }: { type: BrainEvent["type"] }) {
  const icons: Record<BrainEvent["type"], { icon: string; color: string }> = {
    thought_loop_tick: { icon: "◉", color: "#818cf8" },
    collection_activity: { icon: "◆", color: "#22c55e" },
    worker_activity: { icon: "⚙", color: "#f59e0b" },
    queue_metrics: { icon: "▤", color: "#06b6d4" },
    emotional_state: { icon: "♥", color: "#ec4899" },
    soul_cycle: { icon: "✧", color: "#a78bfa" },
    action_dispatch: { icon: "→", color: "#fb923c" },
    system_vitals: { icon: "♡", color: "#ef4444" },
    budget_status: { icon: "$", color: "#eab308" },
    memory_event: { icon: "◇", color: "#14b8a6" },
    reward_signal: { icon: "★", color: "#f472b6" },
    error_correction: { icon: "⟳", color: "#8b5cf6" },
    thalamic_gate: { icon: "⊙", color: "#f97316" },
    hippocampal_cascade: { icon: "◎", color: "#14b8a6" },
    llm_call: { icon: "⧫", color: "#60a5fa" },
  };

  const { icon, color } = icons[type] ?? { icon: "•", color: "#666" };

  return (
    <span className="text-xs" style={{ color }}>
      {icon}
    </span>
  );
}

function EventSummary({ event }: { event: BrainEvent }) {
  switch (event.type) {
    case "thought_loop_tick":
      return (
        <span>
          Thought tick{" "}
          {event.impulse && (
            <span className="text-indigo-400">(impulse)</span>
          )}
        </span>
      );
    case "collection_activity":
      return (
        <span>
          <span className="text-cyan-400 font-mono">{event.collection}</span>{" "}
          <span className="text-neutral-500">{event.operation}</span>{" "}
          <span className="text-neutral-400">×{event.count}</span>
        </span>
      );
    case "worker_activity":
      return (
        <span>
          <span className="text-amber-400">{event.worker}</span>{" "}
          <span
            className={
              event.status === "completed"
                ? "text-emerald-500"
                : event.status === "failed"
                  ? "text-red-500"
                  : "text-neutral-500"
            }
          >
            {event.status}
          </span>
          {event.duration_ms && (
            <span className="text-neutral-600 ml-1">
              {formatDuration(event.duration_ms)}
            </span>
          )}
        </span>
      );
    case "queue_metrics":
      return (
        <span>
          <span className="text-cyan-400 font-mono">{event.queue}</span>{" "}
          <span className="text-neutral-500">
            {event.pending}p / {event.active}a
          </span>
        </span>
      );
    case "emotional_state":
      return (
        <span>
          Mood:{" "}
          <span
            className={
              event.valence > 0.3
                ? "text-emerald-400"
                : event.valence < -0.3
                  ? "text-red-400"
                  : "text-amber-400"
            }
          >
            {event.mood}
          </span>
        </span>
      );
    case "soul_cycle":
      return (
        <span>
          Soul cycle{" "}
          <span className="text-purple-400">{event.tier}</span>{" "}
          <span className="text-neutral-500">{event.status}</span>
        </span>
      );
    case "action_dispatch":
      return (
        <span>
          Action:{" "}
          <span className="text-orange-400">{event.action}</span>{" "}
          <span className="text-neutral-500">→ {event.target}</span>
        </span>
      );
    case "system_vitals":
      return (
        <span>
          Vitals: CPU {event.cpu_percent.toFixed(0)}% / Mem{" "}
          {event.memory_percent.toFixed(0)}%
        </span>
      );
    case "memory_event":
      return (
        <span>
          Memory <span className="text-teal-400">{event.operation}</span>
        </span>
      );
    case "reward_signal":
      return (
        <span>
          Reward:{" "}
          <span
            className={
              event.prediction_error > 0 ? "text-emerald-400" : "text-red-400"
            }
          >
            {event.prediction_error > 0 ? "+" : ""}
            {event.prediction_error.toFixed(2)}
          </span>
        </span>
      );
    case "error_correction":
      return (
        <span>
          Error correction:{" "}
          <span className="text-purple-400">{event.source}</span>
        </span>
      );
    default:
      return <span>{event.type}</span>;
  }
}

function NeurotransmitterGauges() {
  const { pathwayActivations, dopamineLevel } = useLiveStore();

  const levels = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [name] of Object.entries(NEUROTRANSMITTER_PATHWAYS)) {
      const active = pathwayActivations.filter(p => p.pathway === name);
      map[name] = active.length > 0 ? Math.max(...active.map(a => a.intensity)) : 0;
    }
    map.dopamine = Math.max(map.dopamine || 0, (dopamineLevel - 0.5) * 2);
    return map;
  }, [pathwayActivations, dopamineLevel]);

  const hasActivity = Object.values(levels).some(v => v > 0.05);
  if (!hasActivity) return null;

  return (
    <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/6 rounded-2xl p-4 shrink-0">
      <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
        Neurotransmitters
      </span>
      <div className="mt-2 space-y-1.5">
        {Object.entries(NEUROTRANSMITTER_PATHWAYS).map(([name, pathway]) => {
          const level = levels[name] || 0;
          if (level < 0.02) return null;
          return (
            <div key={name} className="flex items-center gap-2 text-[11px]">
              <span className="w-16 text-neutral-400 capitalize">{name}</span>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(level * 100, 100)}%`,
                    backgroundColor: pathway.color,
                    boxShadow: `0 0 6px ${pathway.color}60`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CognitiveProcesses() {
  const { activeProcesses, lastLLMCall, lastThalamicGate, lastCascade } = useLiveStore();

  if (activeProcesses.length === 0 && !lastLLMCall && !lastThalamicGate && !lastCascade) return null;

  return (
    <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/6 rounded-2xl p-4 shrink-0">
      <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
        Cognitive State
      </span>
      <div className="mt-2 space-y-1.5">
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
            <span className="text-neutral-500">Gate:</span>
            <span className={lastThalamicGate.passed ? "text-emerald-400" : "text-neutral-600"}>
              {lastThalamicGate.passed ? "open" : "closed"}
            </span>
            {lastThalamicGate.signal_type && (
              <span className="text-neutral-600 text-[10px]">{lastThalamicGate.signal_type}</span>
            )}
          </div>
        )}
        {lastCascade && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-neutral-500">Cascade:</span>
            <span className="text-teal-400">{lastCascade.total_activated} memories</span>
            <span className="text-neutral-600 text-[10px]">
              h1:{lastCascade.hop1_count} h2:{lastCascade.hop2_count}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveProcessPanel() {
  const {
    recentEvents,
    activeWorkers,
    selectedRegionId,
    selectRegion,
    regionActivity,
  } = useLiveStore();

  const selectedRegion = selectedRegionId
    ? BRAIN_MODEL_REGISTRY.find((r) => r.id === selectedRegionId)
    : null;

  const filteredEvents = useMemo(() => {
    return getFilteredEvents(recentEvents, selectedRegionId).slice(-50);
  }, [recentEvents, selectedRegionId]);

  const activeRegions = useMemo(() => {
    return Array.from(regionActivity.entries())
      .filter(([, activity]) => activity.intensity > 0.1)
      .sort((a, b) => b[1].intensity - a[1].intensity)
      .slice(0, 8);
  }, [regionActivity]);

  const collections = selectedRegionId
    ? getCollectionsForRegion(selectedRegionId)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute top-20 right-4 bottom-20 z-20 w-[360px] max-w-[40vw] flex flex-col gap-3 overflow-hidden pointer-events-none"
    >
      {selectedRegion && (
        <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl overflow-hidden shrink-0">
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${selectedRegion.color}, ${selectedRegion.color}00)`,
            }}
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: selectedRegion.color,
                    boxShadow: `0 0 8px ${selectedRegion.color}60`,
                  }}
                />
                <span className="text-sm font-semibold text-white">
                  {selectedRegion.name}
                </span>
              </div>
              <button
                onClick={() => selectRegion(null)}
                className="text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {collections.length > 0 && (
              <div className="mt-2">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                  Collections ({collections.length})
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {collections.slice(0, 6).map((col) => (
                    <span
                      key={col}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono"
                    >
                      {col}
                    </span>
                  ))}
                  {collections.length > 6 && (
                    <span className="text-[10px] text-neutral-600">
                      +{collections.length - 6}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeWorkers.size > 0 && (
        <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl p-4 shrink-0">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
            Active Workers ({activeWorkers.size})
          </span>
          <div className="mt-2 space-y-1.5">
            {Array.from(activeWorkers.values())
              .slice(0, 5)
              .map((worker) => (
                <div
                  key={worker.jobId}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-amber-400">{worker.worker}</span>
                  <span className="text-neutral-600 font-mono text-[10px] ml-auto">
                    {formatDuration(Date.now() - worker.startedAt)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <CognitiveProcesses />
      <NeurotransmitterGauges />

      {!selectedRegionId && activeRegions.length > 0 && (
        <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl p-4 shrink-0">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
            Active Regions
          </span>
          <div className="mt-2 space-y-1.5">
            {activeRegions.map(([regionId, activity]) => {
              const region = BRAIN_MODEL_REGISTRY.find(
                (r) => r.id === regionId
              );
              if (!region) return null;
              return (
                <button
                  key={regionId}
                  onClick={() => selectRegion(regionId)}
                  className="w-full flex items-center gap-2 text-xs hover:bg-white/[0.02] rounded px-1 py-0.5 transition-colors"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: region.color,
                      boxShadow: `0 0 4px ${region.color}60`,
                    }}
                  />
                  <span className="text-neutral-300">{region.name}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-12 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${activity.intensity * 100}%`,
                          backgroundColor: region.color,
                        }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="pointer-events-auto backdrop-blur-xl bg-black/50 border border-white/[0.06] rounded-2xl flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="p-3 border-b border-white/[0.04] shrink-0">
          <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
            Event Stream
            {selectedRegionId && (
              <span className="text-indigo-400 ml-1">(filtered)</span>
            )}
          </span>
        </div>
        <div
          className="flex-1 overflow-y-auto p-2 space-y-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-neutral-600 text-xs">
              Waiting for events...
            </div>
          ) : (
            filteredEvents.map((envelope) => (
              <div
                key={envelope.id}
                className="flex items-start gap-2 px-2 py-1 rounded hover:bg-white/[0.02] transition-colors"
              >
                <EventIcon type={envelope.event.type} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-neutral-300 truncate">
                    <EventSummary event={envelope.event} />
                  </div>
                </div>
                <span className="text-[9px] text-neutral-600 font-mono shrink-0">
                  {formatTimestamp(envelope.received_at)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
