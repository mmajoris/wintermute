"use client";

import { useState } from "react";
import { usePanelLayout } from "@/lib/panel-layout";
import SidebarTabs from "./SidebarTabs";
import PanelRenderer from "./PanelRenderer";
import SidebarContextMenu from "./SidebarContextMenu";

export default function LiveLeftPanel() {
  const { left, activeLeft, setActiveTab } = usePanelLayout();
  const activeTab = left.find((t) => t.id === activeLeft) ?? left[0];
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="flex flex-col h-full min-h-0"
      onContextMenu={(e) => { e.preventDefault(); setMenuPos({ x: e.clientX, y: e.clientY }); }}
    >
      <SidebarTabs
        tabs={left}
        active={activeTab?.id ?? "default"}
        onChange={(id) => setActiveTab("left", id)}
      />
      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto hud-scrollbar">
        {activeTab && <PanelRenderer panels={activeTab.panels} />}
      </div>
      {menuPos && (
        <SidebarContextMenu side="left" pos={menuPos} onClose={() => setMenuPos(null)} />
      )}
    </div>
  );
}
