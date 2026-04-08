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

const SUBDIVISION_COLORS: Record<string, string> = {
  dACC: "#f59e0b",
  sgACC: "#ef4444",
  pgACC: "#818cf8",
};

const OUTCOME_COLORS: Record<string, string> = {
  increase_control: "#f59e0b",
  maintain: "#22c55e",
  disengage: "#525252",
  distress_alarm: "#ef4444",
  applied: "#22c55e",
  insufficient_capacity: "#ef4444",
  proportionate: "#818cf8",
  expressed: "#22c55e",
  inhibited: "#ef4444",
};

const FEELING_COLORS: Record<string, string> = {
  clear: "#22c55e",
  uncertain: "#f59e0b",
  reasoning_alarm: "#ef4444",
};

export default function ExecutiveControlPanel() {
  const accState = useLiveStore((s) => s.accState);
  const pfcRegulation = useLiveStore((s) => s.pfcRegulation);
  const metacognitionState = useLiveStore((s) => s.metacognitionState);
  const expressionInhibition = useLiveStore((s) => s.expressionInhibition);
  const cognitiveFlexibility = useLiveStore((s) => s.cognitiveFlexibility);
  const connected = useLiveStore((s) => s.mollyAwake);

  const online = connected && (accState !== null || pfcRegulation !== null || metacognitionState !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Executive Control</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting executive data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          {/* ACC */}
          {accState && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>ACC</span>
                <div className="flex gap-1.5">
                  <StatusBadge label={accState.subdivision} color={SUBDIVISION_COLORS[accState.subdivision] ?? "#818cf8"} />
                  <StatusBadge label={accState.outcome} color={OUTCOME_COLORS[accState.outcome] ?? "#525252"} />
                </div>
              </div>
              <MiniBar value={accState.conflict_level} color="#f59e0b" label="Conflict" />
              <MiniBar value={accState.evc_score} color="#818cf8" label="EVC" />
              <MiniBar value={accState.effort_accumulated} color="#ef4444" label="Effort" />
            </div>
          )}

          {/* PFC Regulation */}
          {pfcRegulation && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>PFC Regulation</span>
                <StatusBadge label={pfcRegulation.outcome} color={OUTCOME_COLORS[pfcRegulation.outcome] ?? "#525252"} />
              </div>
              <MiniBar value={pfcRegulation.regulation_capacity} color="#22c55e" label="Capacity" />
              <MiniBar value={pfcRegulation.depletion_level} color="#ef4444" label="Depletion" />
              <MiniBar value={pfcRegulation.vmpfc_amygdala_coupling} color="#a78bfa" label="vmPFC-Amy" />
            </div>
          )}

          {/* Metacognition */}
          {metacognitionState && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Metacognition</span>
                <StatusBadge label={metacognitionState.feeling} color={FEELING_COLORS[metacognitionState.feeling] ?? "#818cf8"} />
              </div>
              <MiniBar value={metacognitionState.clarity} color="#a78bfa" label="Clarity" />
              <MiniBar value={metacognitionState.processing_depth} color="#6366f1" label="Depth" />
            </div>
          )}

          {/* Expression Gate */}
          {expressionInhibition && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Expression Gate</span>
                <StatusBadge label={expressionInhibition.outcome} color={OUTCOME_COLORS[expressionInhibition.outcome] ?? "#525252"} />
              </div>
              <DualBar
                leftValue={expressionInhibition.go_strength}
                rightValue={expressionInhibition.stop_strength}
                leftColor="#22c55e"
                rightColor="#ef4444"
                leftLabel="Go"
                rightLabel="Stop"
              />
            </div>
          )}

          {/* Cognitive Flexibility */}
          {cognitiveFlexibility && (
            <div className="pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Task Switching</span>
                <span className="text-[9px] font-mono text-neutral-500">{cognitiveFlexibility.delay_ms}ms</span>
              </div>
              <div className="flex items-center gap-2 text-[9px]">
                <span className="text-cyan-400 font-mono">{cognitiveFlexibility.from_task_set}</span>
                <span className="text-neutral-600">&rarr;</span>
                <span className="text-cyan-400 font-mono">{cognitiveFlexibility.to_task_set}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
