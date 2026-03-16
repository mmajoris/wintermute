"use client";

import { useState, useEffect } from "react";
import { useHudColor } from "@/components/ui/hud-theme";
import HudFrame from "@/components/ui/HudFrame";
import { usePanelLayout, PANEL_REGISTRY, getPanelLabel, type Side } from "@/lib/panel-layout";

export default function PanelSettingsDrawer({
  side,
  onClose,
}: {
  side: Side;
  onClose: () => void;
}) {
  const c = useHudColor();
  const layout = usePanelLayout();
  const tabs = side === "left" ? layout.left : layout.right;
  const [newTabName, setNewTabName] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const togglePanel = (tabId: string, panelId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab) return;
    const has = tab.panels.includes(panelId);
    const panels = has
      ? tab.panels.filter((p) => p !== panelId)
      : [...tab.panels, panelId];
    layout.updateTabPanels(side, tabId, panels);
  };

  const handleAddTab = () => {
    const name = newTabName.trim();
    if (!name) return;
    layout.addTab(side, name);
    setNewTabName("");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <HudFrame variant="detail-3" className="relative w-full max-w-sm mx-4 p-0 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0" style={{ borderBottom: `1px solid ${c(0.1)}` }}>
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: c(0.8) }}>
            {side === "left" ? "Left" : "Right"} Panel Layout
          </span>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-300 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tab list */}
        <div className="flex-1 min-h-0 overflow-y-auto hud-scrollbar px-5 py-4 space-y-5">
          {tabs.map((tab) => (
            <div key={tab.id}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium" style={{ color: c(0.7) }}>
                  {tab.label}
                </span>
                {tab.id !== "default" && (
                  <button
                    onClick={() => layout.removeTab(side, tab.id)}
                    className="text-[9px] text-red-400/50 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="space-y-0.5">
                {PANEL_REGISTRY.map((panel) => {
                  const checked = tab.panels.includes(panel.id);
                  const idx = tab.panels.indexOf(panel.id);
                  return (
                    <div key={panel.id} className="flex items-center gap-2 py-1">
                      <button
                        onClick={() => togglePanel(tab.id, panel.id)}
                        className="w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 transition-all"
                        style={{
                          borderColor: checked ? c(0.5) : "rgba(255,255,255,0.1)",
                          background: checked ? c(0.1) : "transparent",
                        }}
                      >
                        {checked && (
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={c(0.9)} strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                      <span
                        className="text-[11px] flex-1"
                        style={{ color: checked ? "rgba(250,250,250,0.8)" : "rgba(163,163,163,0.4)" }}
                      >
                        {panel.label}
                      </span>
                      {checked && (
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            onClick={() => layout.movePanel(side, tab.id, panel.id, "up")}
                            disabled={idx === 0}
                            className="text-[10px] w-5 h-5 flex items-center justify-center rounded transition-colors disabled:opacity-20"
                            style={{ color: c(0.5) }}
                          >
                            &uarr;
                          </button>
                          <button
                            onClick={() => layout.movePanel(side, tab.id, panel.id, "down")}
                            disabled={idx === tab.panels.length - 1}
                            className="text-[10px] w-5 h-5 flex items-center justify-center rounded transition-colors disabled:opacity-20"
                            style={{ color: c(0.5) }}
                          >
                            &darr;
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Add tab */}
          <div className="pt-3" style={{ borderTop: `1px solid ${c(0.08)}` }}>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAddTab(); }}
                placeholder="New tab name..."
                className="flex-1 px-2 py-1.5 text-[11px] bg-transparent rounded outline-none"
                style={{ border: `1px solid ${c(0.1)}`, color: "rgba(200,210,220,0.8)" }}
              />
              <button
                onClick={handleAddTab}
                disabled={!newTabName.trim()}
                className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded transition-all disabled:opacity-30"
                style={{ background: c(0.08), color: c(0.7), border: `1px solid ${c(0.15)}` }}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 shrink-0" style={{ borderTop: `1px solid ${c(0.1)}` }}>
          <button
            onClick={() => { layout.resetToDefault(); onClose(); }}
            className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors"
          >
            Reset to Default
          </button>
        </div>
      </HudFrame>
    </div>
  );
}
