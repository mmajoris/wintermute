"use client";

import { useState, useEffect, useRef } from "react";
import { useHudColor } from "@/components/ui/hud-theme";
import HudFrame from "@/components/ui/HudFrame";
import type { CommandType, CommandLogMeta } from "@/lib/kv";

const LOG_POLL_MS = 1200;
const TIMEOUT_MS = 120_000;

interface LogPollResponse {
  lines: string[];
  meta: CommandLogMeta | null;
}

export default function CommandModal({
  command,
  onClose,
}: {
  command: CommandType;
  onClose: () => void;
}) {
  const c = useHudColor();
  const [lines, setLines] = useState<string[]>([]);
  const [meta, setMeta] = useState<CommandLogMeta | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());
  const sinceRef = useRef(0);
  const [, forceRender] = useState(0);

  const label = command === "wake" ? "Wake" : "Sleep";
  const accentColor = command === "wake" ? "#22c55e" : "#f59e0b";
  const done = meta?.status === "done" || meta?.status === "failed" || timedOut;
  const failed = meta?.status === "failed" || timedOut;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines.length]);

  // Tick the elapsed counter every second while running
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => forceRender((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;

      if (Date.now() - startTime.current > TIMEOUT_MS) {
        setTimedOut(true);
        return;
      }

      try {
        const res = await fetch(`/api/commands/log?since=${sinceRef.current}`);
        if (res.ok) {
          const data: LogPollResponse = await res.json();
          if (data.lines.length > 0) {
            setLines((prev) => [...prev, ...data.lines]);
            sinceRef.current += data.lines.length;

            const hasAwakeMarker = data.lines.some((l) => l.includes("MOLLY IS AWAKE"));
            const hasSleepMarker = data.lines.some((l) => l.includes("Goodnight") || l.includes("Stopped molly.service"));
            if (hasAwakeMarker || hasSleepMarker) {
              setMeta({ command, status: "done", exit_code: 0 });
              return;
            }
          }
          if (data.meta) {
            setMeta(data.meta);
            if (data.meta.status === "done" || data.meta.status === "failed") {
              return;
            }
          }
        }
      } catch { /* network blip — retry next tick */ }

      if (!cancelled) {
        setTimeout(poll, LOG_POLL_MS);
      }
    };

    const timer = setTimeout(poll, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const elapsed = Math.floor((Date.now() - startTime.current) / 1000);

  const lineColor = (line: string) => {
    if (line.includes("MOLLY IS AWAKE") || line.includes("Goodnight")) return "#22c55e";
    if (line.includes("Fatal:") || line.includes("failed") || line.includes("Error")) return "#ef4444";
    if (line.startsWith("──") || line.startsWith("  ╔") || line.startsWith("  ╚") || line.startsWith("  ║")) return accentColor;
    if (line.startsWith("[Emergence]") || line.startsWith("[Sleep]")) return "rgba(0, 200, 220, 0.7)";
    if (line.startsWith("  ")) return "rgba(163, 163, 163, 0.5)";
    return "rgba(200, 210, 220, 0.7)";
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={done ? onClose : undefined}
      />

      <HudFrame variant="detail-3" className="relative w-full max-w-lg mx-4 p-0">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pt-4 pb-3"
          style={{ borderBottom: `1px solid ${c(0.1)}` }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={done ? "" : "animate-pulse"}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: done
                  ? failed ? "#ef4444" : "#22c55e"
                  : accentColor,
                boxShadow: `0 0 8px ${done ? (failed ? "#ef444480" : "#22c55e80") : accentColor + "80"}`,
              }}
            />
            <span
              className="text-[11px] font-medium tracking-[0.12em] uppercase"
              style={{ color: c(0.8) }}
            >
              {label} Molly
            </span>
          </div>
          <span className="text-[10px] font-mono" style={{ color: c(0.3) }}>
            {elapsed}s
          </span>
        </div>

        {/* Terminal output */}
        <div
          ref={scrollRef}
          className="px-5 py-4 max-h-80 overflow-y-auto hud-scrollbar font-mono text-[11px] leading-relaxed space-y-0.5"
        >
          {lines.length === 0 && !done && (
            <div style={{ color: "rgba(163, 163, 163, 0.4)" }}>
              Waiting for output...
            </div>
          )}
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all" style={{ color: lineColor(line) }}>
              {line}
            </div>
          ))}
          {timedOut && (
            <div style={{ color: "#ef4444" }}>
              Timed out waiting for script to complete.
            </div>
          )}
          {!done && lines.length > 0 && (
            <div className="animate-pulse" style={{ color: c(0.3) }}>_</div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end px-5 py-3"
          style={{ borderTop: `1px solid ${c(0.1)}` }}
        >
          {done ? (
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded transition-all"
              style={{
                background: failed ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                color: failed ? "#ef4444" : "#22c55e",
                border: `1px solid ${failed ? "rgba(239, 68, 68, 0.25)" : "rgba(34, 197, 94, 0.25)"}`,
              }}
            >
              Dismiss
            </button>
          ) : (
            <span className="text-[10px]" style={{ color: c(0.3) }}>
              Streaming from VM...
            </span>
          )}
        </div>
      </HudFrame>
    </div>
  );
}
