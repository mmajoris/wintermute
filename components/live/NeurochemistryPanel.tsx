"use client";

import { useLiveStore } from "@/lib/live-store";
import { useHudColor } from "@/components/ui/hud-theme";
import { BracketFrame, HudSectionTitle } from "./BracketFrame";

interface Molecule {
  key: string;
  label: string;
  abbr: string;
  color: string;
  getValue: (s: ReturnType<typeof useLiveStore.getState>["neurochemistryState"]) => number;
}

const MOLECULES: Molecule[] = [
  { key: "cortisol", label: "Cortisol", abbr: "CORT", color: "#ef4444", getValue: (s) => s?.cortisol ?? 0 },
  { key: "dopamine", label: "Dopamine", abbr: "DA", color: "#6366f1", getValue: (s) => s?.cortisol !== undefined ? (useLiveStore.getState().dopamineLevel ?? 0.5) : 0 },
  { key: "serotonin", label: "Serotonin", abbr: "5-HT", color: "#14b8a6", getValue: (s) => s?.serotonin ?? 0 },
  { key: "norepinephrine", label: "Norepinephrine", abbr: "NE", color: "#3b82f6", getValue: (s) => s?.norepinephrine_tonic ?? 0 },
  { key: "acetylcholine", label: "Acetylcholine", abbr: "ACh", color: "#22c55e", getValue: (s) => s?.acetylcholine ?? 0 },
  { key: "oxytocin", label: "Oxytocin", abbr: "OXT", color: "#ec4899", getValue: (s) => s?.oxytocin ?? 0 },
  { key: "endorphin", label: "Endorphin", abbr: "END", color: "#f59e0b", getValue: (s) => s?.endorphin ?? 0 },
];

function MoleculeBar({
  mol,
  value,
  extra,
}: {
  mol: Molecule;
  value: number;
  extra?: string;
}) {
  const c = useHudColor();
  const pct = Math.min(value * 100, 100);

  return (
    <div className="flex items-center gap-2 py-1.5">
      <div className="w-10 shrink-0 text-right">
        <div className="text-[10px] font-semibold" style={{ color: mol.color }}>
          {mol.abbr}
        </div>
      </div>
      <div className="flex-1 h-2 rounded-sm overflow-hidden" style={{ background: c(0.05) }}>
        <div
          className="h-full rounded-sm"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${mol.color}30, ${mol.color}90)`,
            boxShadow: `0 0 6px ${mol.color}40`,
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
      <div className="w-10 shrink-0 text-right">
        <span className="text-[10px] font-mono" style={{ color: `${mol.color}99` }}>
          {(value * 100).toFixed(0)}
        </span>
      </div>
      {extra && (
        <span className="text-[8px] shrink-0" style={{ color: "rgba(163,163,163,0.4)" }}>
          {extra}
        </span>
      )}
    </div>
  );
}

export default function NeurochemistryPanel() {
  const { neurochemistryState, dopamineLevel, mollyAwake: online } = useLiveStore();

  return (
    <BracketFrame variant="detail-3" className="p-4 flex-1 min-h-0 overflow-y-auto hud-scrollbar">
      <HudSectionTitle>Neurochemistry</HudSectionTitle>

      {!online || !neurochemistryState ? (
        <div className="mt-4 text-[11px] text-neutral-600">
          {online ? "Waiting for neurochemistry data..." : "Offline"}
        </div>
      ) : (
        <div className="mt-2">
          {MOLECULES.map((mol) => {
            let value: number;
            if (mol.key === "dopamine") {
              value = dopamineLevel;
            } else {
              value = mol.getValue(neurochemistryState);
            }

            let extra: string | undefined;
            if (mol.key === "norepinephrine") {
              const mode = neurochemistryState.norepinephrine_mode;
              if (mode) {
                extra = mode === "low_tonic" ? "tonic" : mode === "phasic_ready" ? "phasic" : "high";
              }
              const phasic = neurochemistryState.norepinephrine_phasic ?? 0;
              if (phasic > 0.1) {
                extra = `${extra ?? ""} +${(phasic * 100).toFixed(0)}p`;
              }
            }

            return (
              <MoleculeBar
                key={mol.key}
                mol={mol}
                value={online ? value : 0}
                extra={extra}
              />
            );
          })}

          <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="text-[9px] text-neutral-600">
              Source: {neurochemistryState.source_region?.replace(/_/g, " ") ?? "unknown"}
            </div>
            <div className="text-[9px] text-neutral-700 mt-0.5">
              Updated: {new Date(neurochemistryState.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
          </div>
        </div>
      )}
    </BracketFrame>
  );
}
