"use client";

import { useLiveStore } from "@/lib/live-store";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

function GaugeRow({
  label,
  value,
  color,
  icon,
  invertWarning,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
  invertWarning?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, value * 100));
  const isWarning = invertWarning ? value > 0.6 : value < 0.3;
  const displayColor = isWarning ? "#ef4444" : color;

  return (
    <div className="flex items-center gap-2 py-0.5">
      <span className="text-[10px] w-3 text-center" style={{ color: displayColor }}>{icon}</span>
      <span className="text-[8px] w-20 truncate" style={{ color: `${displayColor}cc` }}>{label}</span>
      <div className="flex-1 h-2 rounded-sm overflow-hidden" style={{ background: "#ffffff06" }}>
        <div className="h-full rounded-sm transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${displayColor}40, ${displayColor}cc)`,
            boxShadow: isWarning ? `0 0 4px ${displayColor}30` : "none",
          }}
        />
      </div>
      <span className="text-[9px] font-mono w-8 text-right" style={{ color: `${displayColor}aa` }}>
        {pct.toFixed(0)}
      </span>
    </div>
  );
}

function ConsolidationStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="text-center">
      <div className="text-[14px] font-mono font-bold" style={{ color }}>{value}</div>
      <div className="text-[6px] uppercase tracking-wider mt-0.5" style={{ color: `${color}66` }}>{label}</div>
    </div>
  );
}

const VIGILANCE_COLORS: Record<string, string> = {
  engaged: "#22c55e",
  recovering: "#06b6d4",
};

const FATIGUE_COLORS: Record<string, string> = {
  engaged: "#22c55e",
  recovering: "#06b6d4",
};

const METAMEMORY_COLORS: Record<string, string> = {
  confident: "#22c55e",
  should_verify: "#fbbf24",
  tip_of_the_tongue: "#f59e0b",
};

export default function CognitivePanel() {
  const cortical = useLiveStore((s) => s.corticalModulation);
  const consolidation = useLiveStore((s) => s.consolidationStats);
  const drives = useLiveStore((s) => s.driveStates);
  const vigilanceState = useLiveStore((s) => s.vigilanceState);
  const cognitiveFatigue = useLiveStore((s) => s.cognitiveFatigue);
  const metamemoryState = useLiveStore((s) => s.metamemoryState);
  const connected = useLiveStore((s) => s.mollyAwake);

  const online = connected && (cortical !== null || consolidation !== null || drives !== null || vigilanceState !== null || cognitiveFatigue !== null);

  return (
    <BracketFrame variant="detail-3" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>Cognitive & Memory Assessment</HudSectionTitle>

      {!online ? (
        <div className="mt-3 text-[10px] text-neutral-600">
          {connected ? "Awaiting cognitive data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          {/* Cortical Modulation */}
          {cortical && (
            <div>
              <div className="text-[7px] uppercase tracking-wider mb-1" style={{ color: "#ffffff30" }}>
                Cortical Processing
              </div>
              <div className="space-y-0.5">
                <GaugeRow label="Processing Speed" value={cortical.processing_speed} color="#06b6d4" icon="⚡" />
                <GaugeRow label="Error Rate" value={cortical.error_rate} color="#ef4444" icon="⚠" invertWarning />
                <GaugeRow label="PFC Capacity" value={cortical.prefrontal_contribution} color="#6366f1" icon="◈" />
                <GaugeRow label="Regulation Cap." value={cortical.regulation_capacity} color="#8b5cf6" icon="◉" />
              </div>

              {/* Processing quality indicator */}
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[6px] uppercase tracking-wider" style={{ color: "#ffffff20" }}>
                  Overall Cognitive Status
                </span>
                {(() => {
                  const avgCapacity = (cortical.processing_speed + cortical.prefrontal_contribution + cortical.regulation_capacity) / 3;
                  const adjustedScore = avgCapacity * (1 - cortical.error_rate * 0.5);
                  const label = adjustedScore > 0.7 ? "OPTIMAL" : adjustedScore > 0.4 ? "ADEQUATE" : "IMPAIRED";
                  const color = adjustedScore > 0.7 ? "#22c55e" : adjustedScore > 0.4 ? "#fbbf24" : "#ef4444";
                  return (
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                      style={{ color, background: `${color}15` }}>
                      {label}
                    </span>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Memory Consolidation Stats */}
          {consolidation && (
            <div className="pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="text-[7px] uppercase tracking-wider mb-2" style={{ color: "#ffffff30" }}>
                Memory Health Panel
              </div>
              <div className="grid grid-cols-5 gap-1">
                <ConsolidationStat label="Consolidated" value={consolidation.consolidated} color="#22c55e" />
                <ConsolidationStat label="Replayed" value={consolidation.replay_boosted} color="#06b6d4" />
                <ConsolidationStat label="Decayed" value={consolidation.decayed} color="#fbbf24" />
                <ConsolidationStat label="Forgotten" value={consolidation.forgotten} color="#ef4444" />
                <div className="text-center">
                  <div className="text-[14px] font-mono font-bold" style={{ color: "#a78bfa" }}>
                    {(consolidation.neurogenesis_rate * 100).toFixed(0)}
                  </div>
                  <div className="text-[6px] uppercase tracking-wider mt-0.5" style={{ color: "#a78bfa66" }}>
                    Neurogenesis%
                  </div>
                </div>
              </div>

              {/* Consolidation ratio */}
              <div className="mt-2">
                {(() => {
                  const total = consolidation.consolidated + consolidation.decayed + consolidation.forgotten;
                  if (total === 0) return null;
                  const retentionRate = consolidation.consolidated / total;
                  return (
                    <div className="flex items-center gap-2">
                      <span className="text-[7px]" style={{ color: "#ffffff25" }}>Retention Rate</span>
                      <div className="flex-1 h-2 rounded-full overflow-hidden flex" style={{ background: "#ffffff06" }}>
                        <div className="h-full transition-all duration-1000"
                          style={{ width: `${(consolidation.consolidated / Math.max(total, 1)) * 100}%`, background: "#22c55e80" }} />
                        <div className="h-full transition-all duration-1000"
                          style={{ width: `${(consolidation.decayed / Math.max(total, 1)) * 100}%`, background: "#fbbf2460" }} />
                        <div className="h-full transition-all duration-1000"
                          style={{ width: `${(consolidation.forgotten / Math.max(total, 1)) * 100}%`, background: "#ef444460" }} />
                      </div>
                      <span className="text-[8px] font-mono"
                        style={{ color: retentionRate > 0.7 ? "#22c55e" : retentionRate > 0.4 ? "#fbbf24" : "#ef4444" }}>
                        {(retentionRate * 100).toFixed(0)}%
                      </span>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Drive States */}
          {drives && (
            <div className="pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="text-[7px] uppercase tracking-wider mb-1" style={{ color: "#ffffff30" }}>
                Motivational Assessment
              </div>
              <div className="space-y-0.5">
                <GaugeRow label="Social Drive" value={drives.social_drive} color="#ec4899" icon="♡" />
                <GaugeRow label="Seeking Drive" value={drives.seeking_drive} color="#06b6d4" icon="◎" />
                <GaugeRow label="Novelty Hunger" value={drives.novelty_hunger} color="#f59e0b" icon="✦" />
              </div>
            </div>
          )}

          {/* Vigilance & Fatigue */}
          {(vigilanceState || cognitiveFatigue) && (
            <div className="pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="text-[7px] uppercase tracking-wider mb-1" style={{ color: "#ffffff30" }}>
                Vigilance &amp; Fatigue
              </div>
              <div className="space-y-0.5">
                {vigilanceState && (
                  <>
                    <GaugeRow label="Vig Capacity" value={vigilanceState.vigilance_capacity} color="#fbbf24" icon="◉" />
                    <GaugeRow label="Vig Depletion" value={vigilanceState.vigilance_depletion} color="#ef4444" icon="▼" invertWarning />
                    <div className="flex items-center gap-2 py-0.5">
                      <span className="text-[8px] w-20" style={{ color: "#ffffff40" }}>State</span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          color: VIGILANCE_COLORS[vigilanceState.state] ?? "#818cf8",
                          background: `${VIGILANCE_COLORS[vigilanceState.state] ?? "#818cf8"}15`,
                        }}>
                        {vigilanceState.state}
                      </span>
                    </div>
                  </>
                )}
                {cognitiveFatigue && (
                  <>
                    <GaugeRow label="Cog Capacity" value={cognitiveFatigue.cognitive_capacity} color="#06b6d4" icon="◈" />
                    <GaugeRow label="Fatigue Load" value={cognitiveFatigue.fatigue_load} color="#ef4444" icon="■" invertWarning />
                    <div className="flex items-center gap-2 py-0.5">
                      <span className="text-[8px] w-20" style={{ color: "#ffffff40" }}>State</span>
                      <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          color: FATIGUE_COLORS[cognitiveFatigue.state] ?? "#818cf8",
                          background: `${FATIGUE_COLORS[cognitiveFatigue.state] ?? "#818cf8"}15`,
                        }}>
                        {cognitiveFatigue.state}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Metamemory */}
          {metamemoryState && (
            <div className="pt-2" style={{ borderTop: "1px solid #ffffff08" }}>
              <div className="text-[7px] uppercase tracking-wider mb-1" style={{ color: "#ffffff30" }}>
                Metamemory
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    color: METAMEMORY_COLORS[metamemoryState.feeling] ?? "#818cf8",
                    background: `${METAMEMORY_COLORS[metamemoryState.feeling] ?? "#818cf8"}15`,
                  }}>
                  {metamemoryState.feeling}
                </span>
                <span className="text-[8px] font-mono" style={{ color: "#ffffff50" }}>
                  conf: {(metamemoryState.confidence * 100).toFixed(0)}%
                </span>
                <span className="text-[8px] font-mono" style={{ color: "#ffffff30" }}>
                  fluency: {(metamemoryState.fluency * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </BracketFrame>
  );
}
