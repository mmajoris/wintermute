"use client";

import { useMemo, useRef, useEffect } from "react";
import { useLiveStore, getFilteredEvents } from "@/lib/live-store";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import { getCollectionsForRegion } from "@/lib/collection-mapping";
import type { BrainEvent } from "@/lib/brain-events";
import { BracketFrame, HudDivider, HudSectionTitle } from "./BracketFrame";

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
          {event.impulse && <span className="text-indigo-400">(impulse)</span>}
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
          <span className={event.status === "completed" ? "text-emerald-500" : event.status === "failed" ? "text-red-500" : "text-neutral-500"}>
            {event.status}
          </span>
          {event.duration_ms && (
            <span className="text-neutral-600 ml-1">{formatDuration(event.duration_ms)}</span>
          )}
        </span>
      );
    case "queue_metrics":
      return (
        <span>
          <span className="text-cyan-400 font-mono">{event.queue}</span>{" "}
          <span className="text-neutral-500">{event.pending}p / {event.active}a</span>
        </span>
      );
    case "emotional_state":
      return (
        <span>
          Mood:{" "}
          <span className={event.valence > 0.3 ? "text-emerald-400" : event.valence < -0.3 ? "text-red-400" : "text-amber-400"}>
            {event.mood}
          </span>
        </span>
      );
    case "soul_cycle":
      return (
        <span>
          Soul cycle <span className="text-purple-400">{event.tier}</span>{" "}
          <span className="text-neutral-500">{event.status}</span>
        </span>
      );
    case "action_dispatch":
      return (
        <span>
          Action: <span className="text-orange-400">{event.action}</span>{" "}
          <span className="text-neutral-500">→ {event.target}</span>
        </span>
      );
    case "system_vitals":
      return (
        <span>
          Vitals: CPU {event.cpu_percent.toFixed(0)}% / Mem {event.memory_percent.toFixed(0)}%
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
          <span className={event.prediction_error > 0 ? "text-emerald-400" : "text-red-400"}>
            {event.prediction_error > 0 ? "+" : ""}{event.prediction_error.toFixed(2)}
          </span>
        </span>
      );
    case "error_correction":
      return (
        <span>
          Error correction: <span className="text-purple-400">{event.source}</span>
        </span>
      );
    default:
      return <span>{event.type}</span>;
  }
}

export default function LiveProcessPanel() {
  const {
    recentEvents,
    activeWorkers,
    selectedRegionId,
    selectRegion,
  } = useLiveStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  const selectedRegion = selectedRegionId
    ? BRAIN_MODEL_REGISTRY.find((r) => r.id === selectedRegionId)
    : null;

  const filteredEvents = useMemo(() => {
    return getFilteredEvents(recentEvents, selectedRegionId).slice(-80);
  }, [recentEvents, selectedRegionId]);

  const collections = selectedRegionId
    ? getCollectionsForRegion(selectedRegionId)
    : [];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || userScrolledUp.current) return;
    el.scrollTop = el.scrollHeight;
  }, [filteredEvents]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    userScrolledUp.current = !atBottom;
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden min-h-0 flex-1">
      {selectedRegion && (
        <BracketFrame variant="combo-a" className="pointer-events-auto overflow-hidden shrink-0">
          <div className="h-px w-full"
            style={{ background: `linear-gradient(90deg, ${selectedRegion.color}, ${selectedRegion.color}00)` }}
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedRegion.color, boxShadow: `0 0 8px ${selectedRegion.color}60` }}
                />
                <span className="text-sm font-semibold text-white">{selectedRegion.name}</span>
              </div>
              <button onClick={() => selectRegion(null)}
                className="text-neutral-500 hover:text-neutral-300 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {collections.length > 0 && (
              <div className="mt-2">
                <HudSectionTitle>Collections ({collections.length})</HudSectionTitle>
                <div className="flex flex-wrap gap-1 mt-1">
                  {collections.slice(0, 6).map((col) => (
                    <span key={col}
                      className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                      {col}
                    </span>
                  ))}
                  {collections.length > 6 && (
                    <span className="text-[10px] text-neutral-600">+{collections.length - 6}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </BracketFrame>
      )}

      {activeWorkers.size > 0 && (
        <BracketFrame variant="crosshair" className="pointer-events-auto p-4 shrink-0">
          <HudSectionTitle>Active Workers ({activeWorkers.size})</HudSectionTitle>
          <div className="mt-2 space-y-1.5">
            {Array.from(activeWorkers.values()).slice(0, 5).map((worker) => (
              <div key={worker.jobId} className="flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-amber-400">{worker.worker}</span>
                <span className="text-neutral-600 font-mono text-[10px] ml-auto">
                  {formatDuration(Date.now() - worker.startedAt)}
                </span>
              </div>
            ))}
          </div>
        </BracketFrame>
      )}

      <BracketFrame variant="detail-5" className="pointer-events-auto flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col h-full">
        <div className="p-3 shrink-0">
          <HudSectionTitle>
            Event Stream
            {selectedRegionId && <span className="text-indigo-400 ml-1">(filtered)</span>}
          </HudSectionTitle>
          <HudDivider />
        </div>
        <div ref={scrollRef} onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-2 space-y-0.5"
          style={{ scrollbarWidth: "thin" }}
        >
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-neutral-600 text-xs">
              Waiting for events...
            </div>
          ) : (
            filteredEvents.map((envelope) => (
              <div key={envelope.id}
                className="flex items-start gap-2 px-2 py-1 rounded hover:bg-white/3 transition-colors"
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
      </BracketFrame>
    </div>
  );
}
