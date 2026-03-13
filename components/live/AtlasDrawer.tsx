"use client";

import { useMemo } from "react";
import { useLiveStore } from "@/lib/live-store";
import { findNodeById } from "@/data/mappings";
import { CATEGORY_COLORS } from "@/lib/constants";
import { computationalModules } from "@/data/schema/modules";
import { useHudColor } from "@/components/ui/hud-theme";
import { BracketFrame, HudSectionTitle, HudDivider } from "./BracketFrame";

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

export default function AtlasDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const c = useHudColor();
  const { selectedRegionId } = useLiveStore();

  const node = useMemo(
    () => (selectedRegionId ? findNodeById(selectedRegionId) : undefined),
    [selectedRegionId],
  );

  const moduleId = selectedRegionId ? BIO_TO_MODULE[selectedRegionId] : undefined;
  const compModule = moduleId ? computationalModules.find((m) => m.id === moduleId) : undefined;

  const color = node ? (CATEGORY_COLORS[node.category] ?? "#6366f1") : "#6366f1";
  const moduleColor = compModule ? (CATEGORY_COLORS[compModule.category] ?? "#6366f1") : color;

  if (!open) return null;

  return (
    <div className="flex flex-col h-full min-h-0">
            {/* Header */}
            <BracketFrame variant="combo-e" className="px-4 py-3 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c(0.8), boxShadow: `0 0 6px ${c(0.5)}` }} />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-medium" style={{ color: c(0.75) }}>
                    Neural Atlas
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </BracketFrame>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-y-auto hud-scrollbar p-3 space-y-3">
              {!node ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: c(0.3) }}>
                    No Region Selected
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: c(0.2) }}>
                    Click a brain region in the 3D view to explore its anatomy, schema mapping, and computational module.
                  </p>
                </div>
              ) : (
                <>
                  {/* Bio info card */}
                  <BracketFrame variant="combo-a" className="overflow-hidden">
                    <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}00)` }} />
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }} />
                        <span className="text-sm font-semibold text-white">{node.name}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-semibold" style={{ color: `${color}99` }}>
                        {node.category} · {node.level}
                      </span>
                      <p className="text-[11px] text-neutral-400 leading-relaxed mt-2">{node.description}</p>

                      {node.functions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {node.functions.slice(0, 5).map((fn, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 border" style={{ borderColor: `${color}30`, color, background: `${color}08` }}>
                              {fn}
                            </span>
                          ))}
                          {node.functions.length > 5 && (
                            <span className="text-[9px]" style={{ color: c(0.3) }}>+{node.functions.length - 5}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </BracketFrame>

                  {/* Schema mapping card */}
                  {node.schemaMapping && (
                    <BracketFrame variant="notched" className="p-4">
                      <HudSectionTitle>Schema Mapping</HudSectionTitle>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px]" style={{ color: c(0.4) }}>Collection</span>
                          <code className="text-[11px] font-mono" style={{ color: c(0.9) }}>{node.schemaMapping.collection}</code>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px]" style={{ color: c(0.4) }}>Role</span>
                          <span className="text-[11px] text-white">{node.schemaMapping.role}</span>
                        </div>
                      </div>

                      <HudDivider />

                      <div className="space-y-1.5">
                        <span className="text-[9px] uppercase tracking-wider" style={{ color: c(0.4) }}>Fields</span>
                        {node.schemaMapping.fields.map((field, i) => (
                          <div key={i} className="flex items-start gap-2 py-1 border-b border-white/3 last:border-0">
                            <code className="text-[9px] font-mono text-emerald-400 shrink-0">{field.name}</code>
                            <code className="text-[9px] font-mono text-purple-400 shrink-0">{field.type}</code>
                            <span className="text-[9px] ml-auto text-right" style={{ color: c(0.3) }}>{field.description}</span>
                          </div>
                        ))}
                      </div>
                    </BracketFrame>
                  )}

                  {/* Computational module card */}
                  {compModule && (
                    <BracketFrame variant="detail-3" className="p-4">
                      <HudSectionTitle>Computational Module</HudSectionTitle>
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: moduleColor, boxShadow: `0 0 6px ${moduleColor}60` }} />
                          <span className="text-xs font-semibold text-white">{compModule.name}</span>
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: `${moduleColor}99` }}>{compModule.role}</p>
                        <p className="text-[11px] text-neutral-400 leading-relaxed mt-2">{compModule.description}</p>
                      </div>

                      <HudDivider />

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider" style={{ color: c(0.4) }}>Inputs</span>
                          <div className="mt-1 space-y-0.5">
                            {compModule.inputSources.map((src, i) => (
                              <div key={i} className="text-[9px] font-mono flex items-center gap-1" style={{ color: "rgba(52, 211, 153, 0.7)" }}>
                                <span className="text-emerald-500">←</span> {src}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-wider" style={{ color: c(0.4) }}>Outputs</span>
                          <div className="mt-1 space-y-0.5">
                            {compModule.outputTargets.map((tgt, i) => (
                              <div key={i} className="text-[9px] font-mono flex items-center gap-1" style={{ color: "rgba(251, 146, 60, 0.7)" }}>
                                <span className="text-orange-500">→</span> {tgt}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </BracketFrame>
                  )}

                  {/* Neural connections */}
                  {node.connections.length > 0 && (
                    <BracketFrame variant="crosshair" className="p-4">
                      <HudSectionTitle>Neural Connections ({node.connections.length})</HudSectionTitle>
                      <div className="mt-2 space-y-1">
                        {node.connections.slice(0, 10).map((conn, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px]">
                            <span className={`w-1.5 h-1.5 rounded-full ${conn.type === "excitatory" ? "bg-emerald-500" : conn.type === "inhibitory" ? "bg-red-500" : "bg-blue-500"}`} />
                            <span style={{ color: c(0.4) }}>{conn.type}</span>
                            <span style={{ color: c(0.6) }}>→ {conn.targetId}</span>
                            <span className="ml-auto" style={{ color: c(0.3) }}>{(conn.strength * 100).toFixed(0)}%</span>
                          </div>
                        ))}
                        {node.connections.length > 10 && (
                          <div className="text-[9px]" style={{ color: c(0.3) }}>+{node.connections.length - 10} more</div>
                        )}
                      </div>
                    </BracketFrame>
                  )}
                </>
              )}
            </div>
    </div>
  );
}
