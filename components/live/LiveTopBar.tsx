"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { signOut } from "next-auth/react";
import { useLiveStore } from "@/lib/live-store";
import { useHudColor } from "@/components/ui/hud-theme";
import HudFrame from "@/components/ui/HudFrame";
import { BracketFrame } from "./BracketFrame";
import CommandModal from "./CommandModal";
import type { CommandType } from "@/lib/kv";

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

type MollyState = "awake" | "asleep" | "unknown";

const VM_POLL_INTERVAL_MS = 15_000;
const STALE_THRESHOLD_MS = 90_000;

interface VMStatusResponse {
  status: {
    molly_active: string;
    docker: string;
    timestamp: string;
  } | null;
}

function useMollyState(): { state: MollyState; loading: boolean } {
  const [vmStatus, setVmStatus] = useState<VMStatusResponse["status"]>(null);
  const [loading, setLoading] = useState(true);
  const eventsPerSecond = useLiveStore((s) => s.eventsPerSecond);

  const poll = useCallback(async () => {
    try {
      const res = await fetch("/api/vm-status");
      if (res.ok) {
        const data: VMStatusResponse = await res.json();
        setVmStatus(data.status);
      }
    } catch { /* network failure — keep last known state */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    poll();
    const id = setInterval(poll, VM_POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [poll]);

  let state: MollyState = "unknown";

  if (vmStatus) {
    const age = Date.now() - new Date(vmStatus.timestamp).getTime();
    if (age < STALE_THRESHOLD_MS) {
      state = vmStatus.molly_active === "active" ? "awake" : "asleep";
    }
  }

  // Fallback: if watcher status is stale/missing, infer from live event stream
  if (state === "unknown" && eventsPerSecond > 0) {
    state = "awake";
  }

  return { state, loading };
}

function ConfirmCommandModal({
  command,
  onConfirm,
  onCancel,
}: {
  command: CommandType;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const c = useHudColor();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const label = command === "wake" ? "Wake" : "Sleep";
  const accentColor = command === "wake" ? "#22c55e" : "#f59e0b";
  const valid = input.toLowerCase().trim() === "confirm";

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <HudFrame variant="detail-3" className="relative w-full max-w-sm mx-4 p-0">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: accentColor,
                boxShadow: `0 0 8px ${accentColor}80`,
              }}
            />
            <span
              className="text-[11px] font-medium tracking-[0.12em] uppercase"
              style={{ color: c(0.8) }}
            >
              Confirm {label}
            </span>
          </div>
          <p className="text-[12px] leading-relaxed mb-4" style={{ color: "rgba(200, 210, 220, 0.7)" }}>
            Are you absolutely sure you want to initiate the <strong style={{ color: accentColor }}>{label}</strong> sequence?
            Type <span className="font-mono" style={{ color: c(0.8) }}>confirm</span> in the box below and press Confirm to continue.
          </p>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && valid) onConfirm(); }}
            placeholder="Type confirm..."
            className="w-full px-3 py-2 text-[12px] font-mono bg-transparent rounded outline-none transition-colors"
            style={{
              border: `1px solid ${valid ? accentColor + "50" : c(0.12)}`,
              color: "rgba(200, 210, 220, 0.9)",
            }}
          />
        </div>
        <div
          className="flex items-center justify-end gap-2 px-5 py-3"
          style={{ borderTop: `1px solid ${c(0.1)}` }}
        >
          <button
            onClick={onCancel}
            className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded transition-all text-neutral-500 hover:text-neutral-300 border border-white/8 hover:border-white/15"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!valid}
            className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: valid ? accentColor + "18" : "transparent",
              color: valid ? accentColor : "rgba(163, 163, 163, 0.4)",
              border: `1px solid ${valid ? accentColor + "40" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            Confirm
          </button>
        </div>
      </HudFrame>
    </div>
  );
}

function MollyControls({
  state,
  loading,
  onCommand,
}: {
  state: MollyState;
  loading: boolean;
  onCommand: (command: CommandType) => void;
}) {
  const [confirming, setConfirming] = useState<CommandType | null>(null);

  if (loading) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-neutral-600 animate-pulse">...</span>
      </div>
    );
  }

  const command: CommandType = state === "awake" ? "sleep" : "wake";
  const isWake = command === "wake";

  return (
    <>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setConfirming(command)}
          className={`px-2 py-1 text-[10px] font-medium border border-transparent rounded transition-all ${
            isWake
              ? state === "unknown"
                ? "text-neutral-500 hover:text-emerald-300 hover:bg-emerald-500/8 hover:border-emerald-500/20"
                : "text-emerald-400/70 hover:text-emerald-300 hover:bg-emerald-500/8 hover:border-emerald-500/20"
              : "text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/8 hover:border-amber-500/20"
          }`}
        >
          {isWake ? "Wake" : "Sleep"}
        </button>
      </div>
      {confirming && (
        <ConfirmCommandModal
          command={confirming}
          onConfirm={() => { setConfirming(null); onCommand(confirming); }}
          onCancel={() => setConfirming(null)}
        />
      )}
    </>
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
  const { eventsPerSecond, emotionalState, lastThoughtTick } =
    useLiveStore();
  const { state: mollyState, loading: mollyLoading } = useMollyState();
  const [activeCommand, setActiveCommand] = useState<CommandType | null>(null);

  const handleCommand = useCallback(async (command: CommandType) => {
    setActiveCommand(command);
    try {
      await fetch("/api/commands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
    } catch { /* modal will show timeout if watcher never responds */ }
  }, []);

  const moodLabel = emotionalState?.mood ?? "Unknown";
  const moodValence = emotionalState?.valence ?? 0;
  const moodColor =
    moodValence > 0.3
      ? "#22c55e"
      : moodValence < -0.3
        ? "#ef4444"
        : "#f59e0b";

  const dotColor = mollyState === "awake" ? "#22c55e"
    : mollyState === "asleep" ? "#ef4444"
    : "#f59e0b";
  const statusLabel = mollyState === "awake" ? "ONLINE"
    : mollyState === "asleep" ? "SLEEPING"
    : "UNKNOWN";

  return (
    <>
    <BracketFrame variant="combo-e" className="w-full px-4 py-2.5">
      <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 shrink-0">
        <div
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: dotColor,
            boxShadow: `0 0 6px ${dotColor}80`,
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
          {statusLabel}
        </span>
        <div className="w-px h-3.5 bg-white/8" />
        <MollyControls state={mollyState} loading={mollyLoading} onCommand={handleCommand} />
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
    {activeCommand && (
      <CommandModal
        command={activeCommand}
        onClose={() => setActiveCommand(null)}
      />
    )}
    </>
  );
}
