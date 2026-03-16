"use client";

import { useLiveStore } from "@/lib/live-store";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import { getCollectionsForRegion } from "@/lib/collection-mapping";
import { useState } from "react";
import { BracketFrame, HudSectionTitle } from "./BracketFrame";
import { usePanelLayout } from "@/lib/panel-layout";
import SidebarTabs from "./SidebarTabs";
import PanelRenderer from "./PanelRenderer";
import SidebarContextMenu from "./SidebarContextMenu";

function formatDuration(ms: number): string {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

export default function LiveProcessPanel() {
  const { activeWorkers, selectedRegionId, selectRegion } = useLiveStore();
  const { right, activeRight, setActiveTab } = usePanelLayout();
  const activeTab = right.find((t) => t.id === activeRight) ?? right[0];
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  const selectedRegion = selectedRegionId
    ? BRAIN_MODEL_REGISTRY.find((r) => r.id === selectedRegionId)
    : null;

  const collections = selectedRegionId
    ? getCollectionsForRegion(selectedRegionId)
    : [];

  return (
    <div
      className="flex flex-col gap-3 overflow-hidden min-h-0 flex-1"
      onContextMenu={(e) => { e.preventDefault(); setMenuPos({ x: e.clientX, y: e.clientY }); }}
    >
      {/* Contextual panels -- always visible when present */}
      {selectedRegion && (
        <BracketFrame variant="combo-a" className="pointer-events-auto overflow-hidden shrink-0">
          <div className="h-px w-full"
            style={{ background: `linear-gradient(90deg, ${selectedRegion.color}, ${selectedRegion.color}00)` }}
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedRegion.color, boxShadow: `0 0 8px ${selectedRegion.color}60` }}
                />
                <span className="text-sm font-semibold text-white">{selectedRegion.name}</span>
              </div>
              <button onClick={() => selectRegion(null)}
                className="text-neutral-500 hover:text-neutral-300 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {collections.length > 0 && (
              <div className="mt-2">
                <HudSectionTitle>Collections ({collections.length})</HudSectionTitle>
                <div className="flex flex-wrap gap-1 mt-1">
                  {collections.slice(0, 6).map((col) => (
                    <span key={col}
                      className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                      {col}
                    </span>
                  ))}
                  {collections.length > 6 && (
                    <span className="text-[10px] text-neutral-600">+{collections.length - 6}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </BracketFrame>
      )}

      {activeWorkers.size > 0 && (
        <BracketFrame variant="crosshair" className="pointer-events-auto p-4 shrink-0">
          <HudSectionTitle>Active Workers ({activeWorkers.size})</HudSectionTitle>
          <div className="mt-2 space-y-1.5">
            {Array.from(activeWorkers.values()).slice(0, 5).map((worker) => (
              <div key={worker.jobId} className="flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-amber-400">{worker.worker}</span>
                <span className="text-neutral-600 font-mono text-[10px] ml-auto">
                  {formatDuration(Date.now() - worker.startedAt)}
                </span>
              </div>
            ))}
          </div>
        </BracketFrame>
      )}

      {/* Tab bar + configurable panels */}
      <SidebarTabs
        tabs={right}
        active={activeTab?.id ?? "default"}
        onChange={(id) => setActiveTab("right", id)}
      />
      <div className="flex flex-col gap-3 flex-1 min-h-0">
        {activeTab && <PanelRenderer panels={activeTab.panels} />}
      </div>
      {menuPos && (
        <SidebarContextMenu side="right" pos={menuPos} onClose={() => setMenuPos(null)} />
      )}
    </div>
  );
}
