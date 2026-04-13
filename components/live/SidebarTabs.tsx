"use client";

import { useHudColor } from "@/components/ui/hud-theme";
import { TabIcon } from "@/components/live/SidebarTabIcons";
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
            className="relative group flex items-center justify-center w-7 h-7 rounded transition-all duration-200 shrink-0"
            style={
              isActive
                ? { background: c(0.06), color: c(0.85), boxShadow: `inset 0 -1px 0 ${c(0.3)}` }
                : { background: "transparent", color: "rgba(163, 163, 163, 0.5)" }
            }
          >
            <TabIcon name={tab.icon} />
            <span
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-medium opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50"
              style={{ background: c(0.12), color: c(0.85), border: `1px solid ${c(0.15)}` }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
