"use client";

/**
 * Adapter Evolution Panel
 *
 * Visualizes Molly's substrate-cortex training trajectory in real time:
 *  - Total LoRA adapter norm over the recent snapshot history (her growing-up curve)
 *  - Recent per-turn learning gradient magnitudes, colored by plasticity gate decision
 *  - Sleep consolidation events as visible cycle markers on the trajectory
 *  - "Since deployment" counters: total turns, internal thoughts, total norm, drift since last sleep
 *
 * Data source: live-store fields populated by the per_turn_learning,
 * plasticity_gate_fire, adapter_state_snapshot, and sleep_consolidation
 * brain events. Until mmajoris/molly#361 and #370 land, the panel reads
 * mock data via the seed-adapter-events.ts dev script.
 *
 * Reference: docs in mmajoris/molly#370 (telemetry leaf), mmajoris/molly#361
 * (per-turn online learning), mmajoris/molly#356 (substrate-cortex epic).
 */

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";
import { useHudColor } from "@/components/ui/hud-theme";

const NORM_TRAJECTORY_W = 280;
const NORM_TRAJECTORY_H = 80;
const TURN_BARS_W = 280;
const TURN_BARS_H = 60;

function gateColor(decision: string, c: (a: number) => string): string {
  switch (decision) {
    case "fire":
      return "#22c55e"; // emerald
    case "suppress":
      return c(0.3);
    case "habituate":
      return "#f97316"; // orange
    default:
      return c(0.4);
  }
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toString();
}

function formatNorm(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 10) return n.toFixed(1);
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(3);
}

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const sec = Math.max(0, (now - then) / 1000);
  if (sec < 60) return `${Math.round(sec)}s ago`;
  const min = sec / 60;
  if (min < 60) return `${Math.round(min)}m ago`;
  const hr = min / 60;
  if (hr < 24) return `${hr.toFixed(1)}h ago`;
  const day = hr / 24;
  return `${day.toFixed(1)}d ago`;
}

export default function AdapterEvolutionPanel() {
  const c = useHudColor();
  const adapterSnapshotHistory = useLiveStore((s) => s.adapterSnapshotHistory);
  const lastAdapterSnapshot = useLiveStore((s) => s.lastAdapterSnapshot);
  const perTurnLearningHistory = useLiveStore((s) => s.perTurnLearningHistory);
  const plasticityGateHistory = useLiveStore((s) => s.plasticityGateHistory);
  const sleepConsolidationHistory = useLiveStore((s) => s.sleepConsolidationHistory);

  // Norm trajectory: derive a polyline path from snapshot history
  const normTrajectory = useMemo(() => {
    const snaps = adapterSnapshotHistory;
    if (snaps.length < 2) return { path: "", points: [] as Array<{ x: number; y: number; snap: typeof snaps[0] }>, min: 0, max: 1 };

    const norms = snaps.map((s) => s.total_norm);
    const min = Math.min(...norms);
    const max = Math.max(...norms);
    const range = max - min || 1;

    const points = snaps.map((snap, i) => {
      const x = (i / (snaps.length - 1)) * NORM_TRAJECTORY_W;
      const y = NORM_TRAJECTORY_H - ((snap.total_norm - min) / range) * NORM_TRAJECTORY_H;
      return { x, y, snap };
    });

    const path = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`)
      .join(" ");

    return { path, points, min, max };
  }, [adapterSnapshotHistory]);

  // Sleep cycle markers on the norm trajectory
  const sleepMarkers = useMemo(() => {
    const sleeps = sleepConsolidationHistory.filter((s) => s.phase === "end");
    if (sleeps.length === 0 || normTrajectory.points.length === 0) return [];

    return sleeps
      .map((sleep) => {
        const sleepTime = new Date(sleep.timestamp).getTime();
        // Find the snapshot closest to (and at or after) the sleep event
        let bestIdx = -1;
        let bestDelta = Infinity;
        normTrajectory.points.forEach((pt, i) => {
          const ptTime = new Date(pt.snap.timestamp).getTime();
          const delta = Math.abs(ptTime - sleepTime);
          if (delta < bestDelta) {
            bestDelta = delta;
            bestIdx = i;
          }
        });
        if (bestIdx === -1) return null;
        return { x: normTrajectory.points[bestIdx].x, y: normTrajectory.points[bestIdx].y };
      })
      .filter((m): m is { x: number; y: number } => m !== null);
  }, [sleepConsolidationHistory, normTrajectory.points]);

  // Per-turn learning bars: gradient_norm with color from plasticity gate decision
  const turnBars = useMemo(() => {
    const turns = perTurnLearningHistory.slice(-50);
    if (turns.length === 0) return { bars: [] as Array<{ x: number; y: number; w: number; h: number; color: string; norm: number }>, max: 1 };

    const norms = turns.map((t) => t.gradient_norm);
    const max = Math.max(...norms, 1e-6);
    const barW = (TURN_BARS_W - 2) / turns.length;

    // Build a turn_id → decision lookup from the gate history
    const decisionByTurn = new Map<string, string>();
    plasticityGateHistory.forEach((g) => {
      decisionByTurn.set(g.turn_id, g.decision);
    });

    const bars = turns.map((turn, i) => {
      const h = (turn.gradient_norm / max) * (TURN_BARS_H - 4);
      const x = i * barW + 1;
      const y = TURN_BARS_H - h - 2;
      const decision = decisionByTurn.get(turn.turn_id) ?? "fire";
      return { x, y, w: Math.max(1, barW - 1), h, color: gateColor(decision, c), norm: turn.gradient_norm };
    });

    return { bars, max };
  }, [perTurnLearningHistory, plasticityGateHistory, c]);

  // Counter readouts
  const totalTurns = lastAdapterSnapshot?.total_turns_since_deployment ?? 0;
  const totalThoughts = lastAdapterSnapshot?.total_internal_thoughts_since_deployment ?? 0;
  const currentNorm = lastAdapterSnapshot?.total_norm ?? 0;
  const driftSinceLastCheckpoint = lastAdapterSnapshot?.since_last_checkpoint_delta_norm ?? 0;
  const lastSleep = sleepConsolidationHistory.filter((s) => s.phase === "end").slice(-1)[0];

  const lastTurn = perTurnLearningHistory.slice(-1)[0];
  const lastGate = plasticityGateHistory.slice(-1)[0];

  // Plasticity gate firing distribution
  const gateDistribution = useMemo(() => {
    const last100 = plasticityGateHistory.slice(-100);
    if (last100.length === 0) return { fire: 0, suppress: 0, habituate: 0 };
    const counts = { fire: 0, suppress: 0, habituate: 0 };
    last100.forEach((g) => {
      if (g.decision in counts) counts[g.decision as keyof typeof counts]++;
    });
    const total = last100.length;
    return {
      fire: counts.fire / total,
      suppress: counts.suppress / total,
      habituate: counts.habituate / total,
    };
  }, [plasticityGateHistory]);

  return (
    <BracketFrame className="p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <HudSectionTitle>Adapter Evolution</HudSectionTitle>
        <span className="text-[8px] font-mono" style={{ color: c(0.5) }}>
          {adapterSnapshotHistory.length === 0 ? "no telemetry yet" : `${adapterSnapshotHistory.length} snapshots`}
        </span>
      </div>

      {/* Norm trajectory chart */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] uppercase tracking-wider" style={{ color: c(0.55) }}>
            Total Adapter Norm
          </span>
          <span className="text-[9px] font-mono" style={{ color: c(0.85) }}>
            {formatNorm(currentNorm)}
          </span>
        </div>
        <svg
          width={NORM_TRAJECTORY_W}
          height={NORM_TRAJECTORY_H}
          className="rounded"
          style={{ background: c(0.04), border: `1px solid ${c(0.12)}` }}
        >
          {normTrajectory.path && (
            <>
              {/* Range labels */}
              <text x={2} y={10} fontSize={7} fill={c(0.4)} fontFamily="monospace">
                {formatNorm(normTrajectory.max)}
              </text>
              <text x={2} y={NORM_TRAJECTORY_H - 2} fontSize={7} fill={c(0.4)} fontFamily="monospace">
                {formatNorm(normTrajectory.min)}
              </text>
              {/* Trajectory line */}
              <path
                d={normTrajectory.path}
                fill="none"
                stroke="#22d3ee"
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Sleep markers — visible cycles where consolidation happened */}
              {sleepMarkers.map((m, i) => (
                <g key={i}>
                  <line
                    x1={m.x}
                    y1={0}
                    x2={m.x}
                    y2={NORM_TRAJECTORY_H}
                    stroke="#a855f7"
                    strokeWidth={0.5}
                    strokeDasharray="2,2"
                    opacity={0.5}
                  />
                  <circle cx={m.x} cy={m.y} r={2.5} fill="#a855f7" opacity={0.85} />
                </g>
              ))}
            </>
          )}
          {!normTrajectory.path && (
            <text
              x={NORM_TRAJECTORY_W / 2}
              y={NORM_TRAJECTORY_H / 2}
              fontSize={9}
              fill={c(0.4)}
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              awaiting first checkpoint
            </text>
          )}
        </svg>
      </div>

      {/* Per-turn gradient bars colored by plasticity gate decision */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[8px] uppercase tracking-wider" style={{ color: c(0.55) }}>
            Recent Turns: |∇| × Gate
          </span>
          <span className="text-[9px] font-mono" style={{ color: c(0.7) }}>
            max {formatNorm(turnBars.max)}
          </span>
        </div>
        <svg
          width={TURN_BARS_W}
          height={TURN_BARS_H}
          className="rounded"
          style={{ background: c(0.04), border: `1px solid ${c(0.12)}` }}
        >
          {turnBars.bars.map((bar, i) => (
            <rect
              key={i}
              x={bar.x}
              y={bar.y}
              width={bar.w}
              height={bar.h}
              fill={bar.color}
              opacity={0.85}
            >
              <title>
                |∇|={formatNorm(bar.norm)}
              </title>
            </rect>
          ))}
          {turnBars.bars.length === 0 && (
            <text
              x={TURN_BARS_W / 2}
              y={TURN_BARS_H / 2}
              fontSize={9}
              fill={c(0.4)}
              fontFamily="monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              no turns yet
            </text>
          )}
        </svg>
        <div className="flex items-center gap-3 mt-1 text-[7px]" style={{ color: c(0.55) }}>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm" style={{ background: "#22c55e" }} />
            fire {(gateDistribution.fire * 100).toFixed(0)}%
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm" style={{ background: c(0.3) }} />
            suppress {(gateDistribution.suppress * 100).toFixed(0)}%
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-sm" style={{ background: "#f97316" }} />
            habituate {(gateDistribution.habituate * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Counter strip */}
      <div className="grid grid-cols-2 gap-1.5 text-[8px]">
        <div className="rounded p-1.5" style={{ background: c(0.06), border: `1px solid ${c(0.1)}` }}>
          <div className="uppercase tracking-wider" style={{ color: c(0.5) }}>turns</div>
          <div className="text-base font-mono" style={{ color: c(0.95) }}>{formatCount(totalTurns)}</div>
        </div>
        <div className="rounded p-1.5" style={{ background: c(0.06), border: `1px solid ${c(0.1)}` }}>
          <div className="uppercase tracking-wider" style={{ color: c(0.5) }}>thoughts</div>
          <div className="text-base font-mono" style={{ color: c(0.95) }}>{formatCount(totalThoughts)}</div>
        </div>
        <div className="rounded p-1.5" style={{ background: c(0.06), border: `1px solid ${c(0.1)}` }}>
          <div className="uppercase tracking-wider" style={{ color: c(0.5) }}>drift since checkpoint</div>
          <div className="text-base font-mono" style={{ color: c(0.85) }}>{formatNorm(driftSinceLastCheckpoint)}</div>
        </div>
        <div className="rounded p-1.5" style={{ background: c(0.06), border: `1px solid ${c(0.1)}` }}>
          <div className="uppercase tracking-wider" style={{ color: c(0.5) }}>last sleep</div>
          <div className="text-base font-mono" style={{ color: lastSleep ? "#a855f7" : c(0.4) }}>
            {lastSleep ? timeAgo(lastSleep.timestamp) : "—"}
          </div>
        </div>
      </div>

      {/* Last turn summary */}
      {lastTurn && (
        <div className="rounded p-1.5 text-[8px] font-mono" style={{ background: c(0.06), border: `1px solid ${c(0.1)}`, color: c(0.7) }}>
          <div className="flex items-center justify-between">
            <span style={{ color: c(0.5) }}>last turn</span>
            <span>{lastTurn.was_internal_thought ? "thought" : "external"}</span>
          </div>
          <div className="flex items-center justify-between mt-0.5">
            <span style={{ color: c(0.5) }}>|∇| / lr / elig</span>
            <span>
              {formatNorm(lastTurn.gradient_norm)} / {lastTurn.learning_rate_applied.toExponential(1)} / {lastTurn.plasticity_eligibility.toFixed(2)}
            </span>
          </div>
          {lastGate && (
            <div className="flex items-center justify-between mt-0.5">
              <span style={{ color: c(0.5) }}>gate</span>
              <span style={{ color: gateColor(lastGate.decision, c) }}>{lastGate.decision}</span>
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
