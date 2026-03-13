"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLiveStore } from "@/lib/live-store";
import { CATEGORY_COLORS } from "@/lib/constants";
import { computationalModules } from "@/data/schema/modules";
import { useHudColor } from "@/components/ui/hud-theme";
import { HudSectionTitle } from "./BracketFrame";

const BIO_TO_MODULE: Record<string, string> = {
  "frontal-lobe": "executive-controller",
  "prefrontal-cortex": "executive-controller",
  "primary-motor-cortex": "action-dispatcher",
  "thalamus": "signal-router",
  "hippocampus": "memory-writer",
  "amygdala": "emotional-modulator",
  "basal-ganglia": "action-gate",
  "caudate-nucleus": "action-gate",
  "putamen": "action-gate",
  "nucleus-accumbens": "reward-predictor",
  "substantia-nigra": "reward-predictor",
  "cerebellum": "error-corrector",
  "hypothalamus": "homeostatic-regulator",
  "midbrain": "alertness-controller",
  "pons": "alertness-controller",
  "medulla": "autonomic-manager",
  "entorhinal-cortex": "memory-retrieval",
  "dentate-gyrus": "memory-writer",
  "subiculum": "memory-retrieval",
  "auditory-cortex": "sensory-integrator",
  "cn-x": "autonomic-manager",
  "left-hemisphere": "narrative-engine",
  "right-hemisphere": "sensory-integrator",
  "corpus-callosum": "signal-router",
  "pituitary": "homeostatic-regulator",
  "ventricles": "body-state-monitor",
};

const LAYER_LABELS: Record<number, string> = {
  7: "Consciousness",
  6: "Executive",
  5: "Integration",
  4: "Modulation",
  3: "Monitoring",
  2: "Regulation",
  1: "Survival",
};
const LAYER_ORDER = [7, 6, 5, 4, 3, 2, 1];

export default function ArchitectureSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const c = useHudColor();
  const { selectRegion, selectedRegionId } = useLiveStore();

  const highlightedModuleId = selectedRegionId ? BIO_TO_MODULE[selectedRegionId] ?? null : null;

  const handleModuleClick = (moduleId: string) => {
    const bioId = Object.entries(BIO_TO_MODULE).find(([, m]) => m === moduleId)?.[0];
    if (bioId) selectRegion(bioId);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 38 }}
          className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto"
          style={{ height: "45vh", maxHeight: 420 }}
        >
          <div
            className="h-full flex flex-col overflow-hidden"
            style={{
              background: "rgba(2, 4, 8, 0.95)",
              backdropFilter: "blur(16px)",
              borderTop: `1px solid ${c(0.15)}`,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 shrink-0" style={{ borderBottom: `1px solid ${c(0.08)}` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-0.5 rounded-full" style={{ background: c(0.2) }} />
                <HudSectionTitle>Computational Architecture</HudSectionTitle>
              </div>
              <button onClick={onClose} className="text-neutral-500 hover:text-neutral-300 transition-colors p-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Module grid */}
            <div className="flex-1 overflow-y-auto hud-scrollbar px-6 py-4 space-y-1">
              {LAYER_ORDER.map((layer) => {
                const mods = computationalModules.filter((m) => m.layer === layer);
                if (mods.length === 0) return null;
                return (
                  <div key={layer}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: c(0.3) }}>
                        {LAYER_LABELS[layer]}
                      </span>
                      <span className="text-[8px]" style={{ color: c(0.15) }}>L{layer}</span>
                      <div className="flex-1 h-px" style={{ background: c(0.06) }} />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                      {mods.map((mod) => {
                        const color = CATEGORY_COLORS[mod.category] ?? "#6366f1";
                        const isHighlighted = highlightedModuleId === mod.id;
                        return (
                          <button
                            key={mod.id}
                            onClick={() => handleModuleClick(mod.id)}
                            className="text-left p-3 transition-all duration-200 group"
                            style={{
                              background: isHighlighted ? `${color}12` : c(0.03),
                              border: `1px solid ${isHighlighted ? `${color}40` : c(0.08)}`,
                              boxShadow: isHighlighted ? `0 0 16px ${color}15` : "none",
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="w-2 h-2 rounded-full shrink-0 transition-all duration-200"
                                style={{
                                  backgroundColor: isHighlighted ? color : c(0.2),
                                  boxShadow: isHighlighted ? `0 0 8px ${color}60` : "none",
                                }}
                              />
                              <span className={`text-[10px] font-semibold truncate transition-colors ${isHighlighted ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"}`}>
                                {mod.name}
                              </span>
                            </div>
                            <p className={`text-[9px] leading-snug transition-colors ${isHighlighted ? "text-neutral-400" : "text-neutral-600 group-hover:text-neutral-500"}`}>
                              {mod.role}
                            </p>
                            <div className="flex items-center gap-1 mt-1.5">
                              <span className="text-[8px] text-emerald-600">{mod.inputSources.length} in</span>
                              <span className="text-[8px]" style={{ color: c(0.15) }}>/</span>
                              <span className="text-[8px] text-orange-600">{mod.outputTargets.length} out</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
