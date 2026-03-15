"use client";

import { useState, useCallback } from "react";
import { useLiveStore } from "@/lib/live-store";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import { BracketFrame, HudSectionTitle } from "./BracketFrame";
import LiveStatsPanel from "./LiveStatsPanel";
import NeuralActivityRenderer from "@/components/examples/NeuralActivityRenderer";
import SidebarTabs, { type Tab } from "./SidebarTabs";

const LEFT_TABS: Tab[] = [
  { id: "overview", label: "Overview" },
  { id: "regions", label: "Regions" },
  { id: "activity", label: "Activity" },
];

function CognitiveProcesses() {
  const { activeProcesses, lastThalamicGate, lastCascade } = useLiveStore();

  return (
    <>
      <HudSectionTitle>Cognitive State</HudSectionTitle>
      <div className="mt-2 space-y-1.5">
        {activeProcesses.length === 0 && !lastThalamicGate && !lastCascade && (
          <div className="text-[11px] text-neutral-600">No active processes</div>
        )}
        {activeProcesses.map((proc) => (
          <div key={proc.name} className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300">{proc.name}</span>
            {proc.tier && (
              <span className="text-neutral-600 text-[10px] ml-auto">{proc.tier}</span>
            )}
          </div>
        ))}
        {lastThalamicGate && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: lastThalamicGate.passed ? "#22c55e" : "#525252" }}
            />
            <span className="text-neutral-400">Thalamic gate</span>
            <span className={lastThalamicGate.passed ? "text-emerald-400 ml-auto" : "text-neutral-600 ml-auto"}>
              {lastThalamicGate.passed ? "open" : "closed"}
            </span>
          </div>
        )}
        {lastCascade && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-neutral-400">Hippocampal cascade</span>
            <span className="text-teal-400 ml-auto">{lastCascade.total_activated}</span>
          </div>
        )}
      </div>
    </>
  );
}

const MONITORED_REGIONS = [
  "thalamus", "hippocampus", "amygdala", "hypothalamus",
  "caudate-nucleus", "putamen", "nucleus-accumbens", "substantia-nigra",
  "midbrain", "pons", "medulla",
  "cerebellum", "left-hemisphere", "right-hemisphere",
];

function ActiveRegions() {
  const { regionActivity, selectRegion, selectedRegionId } = useLiveStore();

  return (
    <div className="flex flex-col h-full min-h-0">
      <HudSectionTitle>Neural Regions</HudSectionTitle>
      <div className="mt-2 flex-1 min-h-0 overflow-y-auto hud-scrollbar space-y-0.5">
        {MONITORED_REGIONS.map((regionId) => {
          const region = BRAIN_MODEL_REGISTRY.find(r => r.id === regionId);
          if (!region) return null;
          const activity = regionActivity.get(regionId);
          const intensity = activity?.intensity ?? 0;
          const isActive = intensity > 0.05;
          const isSelected = selectedRegionId === regionId;
          return (
            <button key={regionId}
              onClick={() => selectRegion(isSelected ? null : regionId)}
              className="w-full flex items-center gap-2 text-[11px] rounded px-1 py-0.5 transition-colors"
              style={{
                backgroundColor: isSelected ? `${region.color}15` : undefined,
                boxShadow: isSelected ? `inset 2px 0 0 ${region.color}` : undefined,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500"
                style={{
                  backgroundColor: isSelected ? region.color : isActive ? region.color : `${region.color}30`,
                  boxShadow: isSelected || isActive ? `0 0 6px ${region.color}80` : "none",
                }}
              />
              <span className="truncate transition-colors duration-500"
                style={{ color: isSelected ? "#ffffff" : isActive ? "#d4d4d4" : "#525252" }}
              >
                {region.name}
              </span>
              <div className="ml-auto w-10 h-1 rounded-full overflow-hidden shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(intensity * 100, 0)}%`,
                    backgroundColor: region.color,
                    opacity: isActive ? 1 : 0,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LiveLeftPanel() {
  const [activeTab, setActiveTab] = useState("overview");

  const subscribeFire = useCallback((fire: () => void) => {
    let prev = useLiveStore.getState().totalEventCount;
    return useLiveStore.subscribe((state) => {
      const curr = state.totalEventCount;
      if (curr !== prev) {
        const diff = curr - prev;
        prev = curr;
        for (let i = 0; i < diff; i++) fire();
      }
    });
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      <SidebarTabs tabs={LEFT_TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto hud-scrollbar">
          <LiveStatsPanel />
          <BracketFrame variant="detail-3" className="p-4 overflow-hidden shrink-0 flex flex-col">
            <CognitiveProcesses />
          </BracketFrame>
        </div>
      )}

      {activeTab === "regions" && (
        <BracketFrame variant="combo-d" className="p-4 overflow-hidden flex-1 min-h-0 flex flex-col">
          <ActiveRegions />
        </BracketFrame>
      )}

      {activeTab === "activity" && (
        <BracketFrame variant="detail-3" className="px-4 py-4 overflow-hidden flex-1 min-h-0 flex flex-col">
          <HudSectionTitle>Synaptic Activity</HudSectionTitle>
          <div className="relative -mx-4 flex-1 flex items-center justify-center">
            <NeuralActivityRenderer onSubscribe={subscribeFire} />
          </div>
        </BracketFrame>
      )}
    </div>
  );
}
