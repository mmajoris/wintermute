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

const PHASE_COLORS: Record<string, string> = {
  prediction: "#06b6d4",
  learning: "#f59e0b",
  tick: "#525252",
};

const ATTRIBUTION_COLORS: Record<string, string> = {
  self_caused: "#22c55e",
  externally_caused: "#f59e0b",
};

const OUTCOME_COLORS: Record<string, string> = {
  match: "#22c55e",
  mismatch: "#ef4444",
};

export default function CerebellarPanel() {
  const cerebellarPrediction = useLiveStore((s) => s.cerebellarPrediction);
  const senseOfAgency = useLiveStore((s) => s.senseOfAgency);
  const actionMonitoring = useLiveStore((s) => s.actionMonitoring);
  const timePerception = useLiveStore((s) => s.timePerception);
  const connected = useLiveStore((s) => s.mollyAwake);

  const online = connected && (cerebellarPrediction !== null || senseOfAgency !== null || actionMonitoring !== null || timePerception !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Cerebellar System</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting cerebellar data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          {/* Prediction Engine */}
          {cerebellarPrediction && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Prediction</span>
                <div className="flex gap-1.5">
                  <StatusBadge label={cerebellarPrediction.phase} color={PHASE_COLORS[cerebellarPrediction.phase] ?? "#525252"} />
                  <span className="text-[9px] font-mono text-neutral-500">{cerebellarPrediction.tick_hz}Hz</span>
                </div>
              </div>
              <MiniBar value={cerebellarPrediction.aggregate_confidence} color="#34d399" label="Confid" />
              <MiniBar value={cerebellarPrediction.active_granule_fraction} color="#06b6d4" label="Granules" />
              {cerebellarPrediction.mean_absolute_error !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[7px] w-12 shrink-0 uppercase tracking-wider" style={{ color: "#f59e0b99" }}>MAE</span>
                  <span className="text-[9px] font-mono" style={{ color: "#f59e0bcc" }}>
                    {cerebellarPrediction.mean_absolute_error.toFixed(4)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Sense of Agency */}
          {senseOfAgency && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Agency</span>
                <StatusBadge
                  label={senseOfAgency.attribution}
                  color={ATTRIBUTION_COLORS[senseOfAgency.attribution] ?? "#818cf8"}
                />
              </div>
              <MiniBar value={senseOfAgency.agency_level} color="#818cf8" label="Level" />
              <MiniBar value={senseOfAgency.comparator_match} color="#22c55e" label="Comp" />
              <div className="flex items-center gap-1.5">
                <span className="text-[7px] w-12 shrink-0 uppercase tracking-wider" style={{ color: "#ef444499" }}>PE</span>
                <span className="text-[9px] font-mono" style={{ color: "#ef4444cc" }}>
                  {senseOfAgency.prediction_error.toFixed(3)}
                </span>
              </div>
            </div>
          )}

          {/* Action Monitoring */}
          {actionMonitoring && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Action Monitor</span>
                <StatusBadge
                  label={actionMonitoring.outcome}
                  color={OUTCOME_COLORS[actionMonitoring.outcome] ?? "#525252"}
                />
              </div>
              <MiniBar value={actionMonitoring.mismatch_magnitude} color="#ef4444" label="Mismatch" />
              <div className="flex gap-3 text-[8px] font-mono">
                <span style={{ color: "#f59e0b88" }}>surprise: {actionMonitoring.surprise_signal.toFixed(2)}</span>
                <span style={{ color: "#22c55e88" }}>confirm: {actionMonitoring.confirmation_signal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Time Perception */}
          {timePerception && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Time Perception</span>
                <StatusBadge label={timePerception.feeling} color="#06b6d4" />
              </div>
              <div className="flex gap-3 text-[8px] font-mono text-neutral-400">
                <span>rate: <span className="text-cyan-400">{timePerception.subjective_rate.toFixed(2)}x</span></span>
                <span>NE dil: {timePerception.norepinephrine_dilation.toFixed(2)}</span>
                <span>DA comp: {timePerception.dopamine_compression.toFixed(2)}</span>
              </div>
              <MiniBar value={timePerception.cerebellar_calibration_weight} color="#34d399" label="CB wt" />
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
