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

const WORKSPACE_MODE_COLORS: Record<string, string> = {
  idle: "#525252",
  conversation: "#22c55e",
  reflection: "#818cf8",
  sleep: "#3b82f6",
};

export default function GlobalWorkspacePanel() {
  const phenomenalBinding = useLiveStore((s) => s.phenomenalBinding);
  const networkSwitch = useLiveStore((s) => s.networkSwitch);
  const salienceEvaluation = useLiveStore((s) => s.salienceEvaluation);
  const connected = useLiveStore((s) => s.mollyAwake);

  const online = connected && (phenomenalBinding !== null || networkSwitch !== null || salienceEvaluation !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Global Workspace &amp; Salience</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting workspace data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          {/* Workspace Binding */}
          {phenomenalBinding && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Workspace</span>
                <StatusBadge
                  label={phenomenalBinding.workspace_mode}
                  color={WORKSPACE_MODE_COLORS[phenomenalBinding.workspace_mode] ?? "#818cf8"}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px]" style={{ color: "#ffffff30" }}>Rule:</span>
                <span className="text-[9px] font-mono text-neutral-400">{phenomenalBinding.binding_rule}</span>
                <span className="ml-auto">
                  <StatusBadge
                    label={phenomenalBinding.content_admitted ? "admitted" : "filtered"}
                    color={phenomenalBinding.content_admitted ? "#22c55e" : "#ef4444"}
                  />
                </span>
              </div>
              <MiniBar value={phenomenalBinding.global_coherence} color="#818cf8" label="Coherence" />
              <MiniBar value={phenomenalBinding.inclusion_strength} color="#a78bfa" label="Inclusion" />
              {phenomenalBinding.bound_populations.length > 0 && (
                <div className="text-[8px] text-neutral-500">
                  Bound: {phenomenalBinding.bound_populations.slice(0, 4).join(", ")}
                  {phenomenalBinding.bound_populations.length > 4 && ` +${phenomenalBinding.bound_populations.length - 4}`}
                </div>
              )}
            </div>
          )}

          {/* Network Switch */}
          {networkSwitch && (
            <div className="pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Network Toggle</span>
                <span className="text-[9px] font-mono text-neutral-400">{networkSwitch.trigger}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge label={networkSwitch.from_network} color={networkSwitch.from_network === "DMN" ? "#818cf8" : "#22c55e"} />
                <span className="text-neutral-600">&rarr;</span>
                <StatusBadge label={networkSwitch.to_network} color={networkSwitch.to_network === "DMN" ? "#818cf8" : "#22c55e"} />
              </div>
              <div className="mt-1.5">
                <MiniBar value={networkSwitch.anti_correlation_strength} color="#f59e0b" label="Anti-corr" />
              </div>
            </div>
          )}

          {/* Salience */}
          {salienceEvaluation && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Salience</span>
                <StatusBadge
                  label={salienceEvaluation.outcome}
                  color={salienceEvaluation.outcome === "pass" ? "#22c55e" : "#525252"}
                />
              </div>
              <MiniBar value={salienceEvaluation.salience_score} color="#f97316" label="Score" />
              <MiniBar value={salienceEvaluation.dimensions.emotional_valence} color="#ec4899" label="Valence" />
              <MiniBar value={salienceEvaluation.dimensions.personal_relevance} color="#6366f1" label="Relevance" />
              <MiniBar value={salienceEvaluation.dimensions.novelty} color="#06b6d4" label="Novelty" />
              <MiniBar value={salienceEvaluation.dimensions.prediction_error} color="#f59e0b" label="PE" />
              <MiniBar value={salienceEvaluation.dimensions.temporal_urgency} color="#ef4444" label="Urgency" />
              <MiniBar value={salienceEvaluation.ne_modulation} color="#34d399" label="NE mod" />
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
