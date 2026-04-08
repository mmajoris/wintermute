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

function VADMiniBar({ valence, arousal, dominance }: { valence: number; arousal: number; dominance: number }) {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1">
        <span className="text-[6px] w-3 font-bold text-emerald-500/60">V</span>
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(0, Math.min(100, (valence + 1) * 50))}%`, background: "#34d399", opacity: 0.6 }} />
        </div>
        <span className="text-[7px] font-mono w-6 text-right text-emerald-500/50">{valence.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[6px] w-3 font-bold text-amber-500/60">A</span>
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(0, Math.min(100, arousal * 100))}%`, background: "#f59e0b", opacity: 0.6 }} />
        </div>
        <span className="text-[7px] font-mono w-6 text-right text-amber-500/50">{arousal.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[6px] w-3 font-bold text-indigo-500/60">D</span>
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "#ffffff08" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${Math.max(0, Math.min(100, dominance * 100))}%`, background: "#6366f1", opacity: 0.6 }} />
        </div>
        <span className="text-[7px] font-mono w-6 text-right text-indigo-500/50">{dominance.toFixed(2)}</span>
      </div>
    </div>
  );
}

const PHASE_COLORS: Record<string, string> = {
  knowledge_updated: "#22c55e",
  belief_updated: "#818cf8",
  intention_updated: "#f59e0b",
  knowledge_gap_detected: "#ef4444",
  observation: "#06b6d4",
  integration: "#22c55e",
};

const CIRCUIT_COLORS: Record<string, string> = {
  seeking: "#06b6d4",
  rage: "#ef4444",
  fear: "#8b5cf6",
  lust: "#ec4899",
  care: "#f97316",
  panic_grief: "#3b82f6",
  play: "#22c55e",
};

export default function SocialBrainPanel() {
  const theoryOfMind = useLiveStore((s) => s.theoryOfMind);
  const cognitiveEmpathy = useLiveStore((s) => s.cognitiveEmpathy);
  const selfPresentation = useLiveStore((s) => s.selfPresentation);
  const socialLearning = useLiveStore((s) => s.socialLearning);
  const connected = useLiveStore((s) => s.mollyAwake);

  const online = connected && (theoryOfMind !== null || cognitiveEmpathy !== null || selfPresentation !== null || socialLearning !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Social Brain</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting social data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          {/* Theory of Mind */}
          {theoryOfMind && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Theory of Mind</span>
                <StatusBadge label={theoryOfMind.phase} color={PHASE_COLORS[theoryOfMind.phase] ?? "#818cf8"} />
              </div>
              <div className="text-[9px] text-pink-400">{theoryOfMind.person}</div>
              <MiniBar value={theoryOfMind.model_confidence} color="#ec4899" label="Model" />
              <div className="flex gap-3 text-[8px] font-mono text-neutral-500">
                <span>K:{theoryOfMind.knowledge_count}</span>
                <span>B:{theoryOfMind.belief_count}</span>
                <span>I:{theoryOfMind.intention_count}</span>
              </div>
            </div>
          )}

          {/* Cognitive Empathy */}
          {cognitiveEmpathy && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Empathy</span>
                <StatusBadge
                  label={cognitiveEmpathy.dominant_circuit}
                  color={CIRCUIT_COLORS[cognitiveEmpathy.dominant_circuit] ?? "#ec4899"}
                />
              </div>
              <div className="text-[9px] text-pink-400">{cognitiveEmpathy.person}</div>
              <VADMiniBar
                valence={cognitiveEmpathy.simulated_valence}
                arousal={cognitiveEmpathy.simulated_arousal}
                dominance={cognitiveEmpathy.simulated_dominance}
              />
              <MiniBar value={cognitiveEmpathy.confidence} color="#ec4899" label="Confid" />
            </div>
          )}

          {/* Self-Presentation */}
          {selfPresentation && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Self-Presentation</span>
                <StatusBadge
                  label={selfPresentation.feedback_valence}
                  color={selfPresentation.feedback_valence === "affirming" ? "#22c55e" : "#ef4444"}
                />
              </div>
              <div className="text-[9px]">
                <span className="text-neutral-500">Trait:</span>{" "}
                <span className="text-pink-400 font-mono">{selfPresentation.trait}</span>
              </div>
              <MiniBar value={selfPresentation.favorability} color="#ec4899" label="Favor" />
            </div>
          )}

          {/* Social Learning */}
          {socialLearning && (
            <div className="pt-2 space-y-1.5" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-wider" style={{ color: "#ffffff30" }}>Social Learning</span>
                <StatusBadge label={socialLearning.phase} color={PHASE_COLORS[socialLearning.phase] ?? "#06b6d4"} />
              </div>
              <div className="text-[9px]">
                <span className="text-neutral-500">From:</span>{" "}
                <span className="text-pink-400">{socialLearning.person}</span>
                <span className="text-neutral-600 ml-2">{socialLearning.strategy_label}</span>
              </div>
              <MiniBar value={socialLearning.confidence} color="#06b6d4" label="Confid" />
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
