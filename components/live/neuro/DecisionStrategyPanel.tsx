"use client";

import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

function StatusBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
      style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function MiniBar({ value, color, label }: { value: number; color: string; label: string }) {
  const pct = Math.max(0, Math.min(100, value * 100));
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[7px] w-12 shrink-0 uppercase tracking-wider" style={{ color: `${color}99` }}>{label}</span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color, opacity: 0.7 }}
        />
      </div>
      <span className="text-[8px] font-mono w-7 text-right shrink-0" style={{ color: `${color}88` }}>
        {(value * 100).toFixed(0)}%
      </span>
    </div>
  );
}

function DualBar({ leftValue, rightValue, leftColor, rightColor, leftLabel, rightLabel }: {
  leftValue: number; rightValue: number; leftColor: string; rightColor: string; leftLabel: string; rightLabel: string;
}) {
  const leftPct = Math.max(0, Math.min(50, leftValue * 50));
  const rightPct = Math.max(0, Math.min(50, rightValue * 50));
  return (
    <div>
      <div className="flex justify-between text-[7px] uppercase tracking-wider mb-0.5">
        <span style={{ color: leftColor }}>{leftLabel} {(leftValue * 100).toFixed(0)}%</span>
        <span style={{ color: rightColor }}>{rightLabel} {(rightValue * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden flex" style={{ background: "#ffffff08" }}>
        <div className="h-full" style={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
          <div className="h-full rounded-l-full transition-all duration-700"
            style={{ width: `${leftPct * 2}%`, background: leftColor, opacity: 0.7 }} />
        </div>
        <div className="h-full" style={{ width: "50%" }}>
          <div className="h-full rounded-r-full transition-all duration-700"
            style={{ width: `${rightPct * 2}%`, background: rightColor, opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );
}

const LOCUS_COLORS: Record<string, string> = {
  ventral_striatum: "#ec4899",
  dorsal_striatum: "#818cf8",
};

const ROUTE_COLORS: Record<string, string> = {
  emotional: "#ef4444",
  deliberative: "#818cf8",
  balanced: "#22c55e",
};

export default function DecisionStrategyPanel() {
  const basalGangliaStrategy = useLiveStore((s) => s.basalGangliaStrategy);
  const valueComparison = useLiveStore((s) => s.valueComparison);
  const moralReasoning = useLiveStore((s) => s.moralReasoning);
  const connected = useLiveStore((s) => s.mollyAwake);

  const online = connected && (basalGangliaStrategy !== null || valueComparison !== null || moralReasoning !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Decision &amp; Strategy</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting decision data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          {/* Basal Ganglia */}
          {basalGangliaStrategy && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Basal Ganglia</span>
                <div className="flex gap-1.5">
                  <StatusBadge label={basalGangliaStrategy.phase} color="#f472b6" />
                  {basalGangliaStrategy.control_locus && (
                    <StatusBadge
                      label={basalGangliaStrategy.control_locus}
                      color={LOCUS_COLORS[basalGangliaStrategy.control_locus] ?? "#818cf8"}
                    />
                  )}
                </div>
              </div>
              <DualBar
                leftValue={basalGangliaStrategy.go_drive}
                rightValue={basalGangliaStrategy.no_go_drive}
                leftColor="#22c55e"
                rightColor="#ef4444"
                leftLabel="Go"
                rightLabel="NoGo"
              />
              <MiniBar value={basalGangliaStrategy.gpi_tonic_inhibition} color="#f59e0b" label="GPi inhib" />
              <MiniBar value={basalGangliaStrategy.selection_strength} color="#a78bfa" label="Sel str" />
              {basalGangliaStrategy.strategy_label && (
                <div className="text-[9px] text-neutral-400">
                  Strategy: <span className="text-pink-400 font-mono">{basalGangliaStrategy.strategy_label}</span>
                </div>
              )}
            </div>
          )}

          {/* Value Comparison */}
          {valueComparison && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Value Comparison</span>
                <span className="text-[9px] font-mono text-neutral-500">{valueComparison.option_count} opts</span>
              </div>
              <div className="flex items-center gap-2 text-[9px]">
                <span className="text-amber-400 font-mono">{valueComparison.winning_option_label}</span>
                <span className="text-[8px] text-neutral-600">v:{valueComparison.winning_value.toFixed(2)}</span>
                {valueComparison.runner_up_option_label && (
                  <>
                    <span className="text-neutral-600">vs</span>
                    <span className="text-neutral-500 font-mono">{valueComparison.runner_up_option_label}</span>
                  </>
                )}
              </div>
              <MiniBar value={valueComparison.decision_confidence} color="#22c55e" label="Confid" />
              <MiniBar value={valueComparison.deliberation_difficulty} color="#ef4444" label="Diff" />
            </div>
          )}

          {/* Moral Reasoning */}
          {moralReasoning && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Moral Reasoning</span>
                <StatusBadge label={moralReasoning.dominant_route} color={ROUTE_COLORS[moralReasoning.dominant_route] ?? "#818cf8"} />
              </div>
              <DualBar
                leftValue={moralReasoning.emotional_signal}
                rightValue={moralReasoning.deliberative_signal}
                leftColor="#ef4444"
                rightColor="#818cf8"
                leftLabel="Emotional"
                rightLabel="Deliber"
              />
              <MiniBar value={moralReasoning.moral_conflict} color="#a78bfa" label="Conflict" />
              <MiniBar value={moralReasoning.empathic_cost} color="#ec4899" label="Empathic" />
              <MiniBar value={moralReasoning.acc_conflict_level} color="#f59e0b" label="ACC conf" />
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
