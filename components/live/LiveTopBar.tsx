"use client";

import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import { useLiveStore } from "@/lib/live-store";
import { BracketFrame } from "./BracketFrame";

function TopBarToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-[10px] font-medium transition-all duration-200 border rounded"
      style={active ? {
        background: "rgba(0, 200, 220, 0.06)",
        color: "rgba(0, 200, 220, 0.85)",
        borderColor: "rgba(0, 200, 220, 0.2)",
      } : {
        background: "transparent",
        color: "rgba(163, 163, 163, 0.6)",
        borderColor: "rgba(255, 255, 255, 0.06)",
      }}
    >
      {label}
    </button>
  );
}

function MollyControls({ connected }: { connected: boolean }) {
  const [sending, setSending] = useState(false);
  const [vmStatus, setVmStatus] = useState<{ molly_active: string; docker: string; timestamp: string } | null>(null);

  const pollVmStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/vm-status");
      if (res.ok) {
        const data = await res.json();
        setVmStatus(data.status);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    pollVmStatus();
    const interval = setInterval(pollVmStatus, 30000);
    return () => clearInterval(interval);
  }, [pollVmStatus]);

  const sendCommand = async (command: "sleep" | "wake") => {
    setSending(true);
    try {
      await fetch("/api/commands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
    } catch { /* ignore */ }
    setSending(false);
  };

  const mollyActive = vmStatus?.molly_active === "active";
  const showSleep = connected || mollyActive;

  return (
    <div className="flex items-center gap-1.5">
      {showSleep ? (
        <button
          onClick={() => sendCommand("sleep")}
          disabled={sending}
          className="px-2 py-1 text-[10px] font-medium text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/8 border border-transparent hover:border-amber-500/20 rounded transition-all disabled:opacity-40"
        >
          Sleep
        </button>
      ) : (
        <button
          onClick={() => sendCommand("wake")}
          disabled={sending}
          className="px-2 py-1 text-[10px] font-medium text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/8 border border-transparent hover:border-emerald-500/20 rounded transition-all disabled:opacity-40"
        >
          Wake
        </button>
      )}
      {vmStatus && (
        <span className="text-[9px] font-mono text-neutral-600" title={`Docker: ${vmStatus.docker || "unknown"}`}>
          VM:{vmStatus.molly_active}
        </span>
      )}
    </div>
  );
}

export default function LiveTopBar({
  panelOpen,
  onTogglePanel,
  atlasOpen,
  onToggleAtlas,
  architectureOpen,
  onToggleArchitecture,
  onOpenSearch,
}: {
  panelOpen: boolean;
  onTogglePanel: () => void;
  atlasOpen: boolean;
  onToggleAtlas: () => void;
  architectureOpen: boolean;
  onToggleArchitecture: () => void;
  onOpenSearch: () => void;
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
    <BracketFrame variant="combo-e" className="w-full px-4 py-2.5">
      <div className="flex items-center justify-between gap-4">
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

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-neutral-500 uppercase tracking-wide">
          {connected ? "ONLINE" : "OFFLINE"}
        </span>
        <div className="w-px h-3.5 bg-white/8" />
        <MollyControls connected={connected} />
        <div className="w-px h-3.5 bg-white/8" />
        <button
          onClick={onOpenSearch}
          className="px-2 py-1 text-[10px] text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1.5"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <kbd className="text-[8px] px-1 py-px bg-white/4 border border-white/6 text-neutral-600">⌘K</kbd>
        </button>
        <div className="w-px h-3.5 bg-white/8" />
        <TopBarToggle label="Atlas" active={atlasOpen} onClick={onToggleAtlas} />
        <TopBarToggle label="Architecture" active={architectureOpen} onClick={onToggleArchitecture} />
        <TopBarToggle label="Processes" active={panelOpen} onClick={onTogglePanel} />
        <div className="w-px h-3.5 bg-white/8" />
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-2 py-1 text-[10px] text-neutral-600 hover:text-red-400 transition-colors"
        >
          Logout
        </button>
      </div>
      </div>
    </BracketFrame>
  );
}
