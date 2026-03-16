"use client";

import { useHudColor } from "@/components/ui/hud-theme";
import type { PanelTab } from "@/lib/panel-layout";

export default function SidebarTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: PanelTab[];
  active: string;
  onChange: (id: string) => void;
}) {
  const c = useHudColor();

  if (tabs.length <= 1) return null;

  return (
    <div className="flex items-center gap-1 shrink-0 mb-2">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="px-2.5 py-1 text-[10px] font-medium transition-all duration-200 rounded truncate"
            style={
              isActive
                ? { background: c(0.06), color: c(0.85), boxShadow: `inset 0 -1px 0 ${c(0.3)}` }
                : { background: "transparent", color: "rgba(163, 163, 163, 0.5)" }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
