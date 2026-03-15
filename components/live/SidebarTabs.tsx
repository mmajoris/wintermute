"use client";

import { useHudColor } from "@/components/ui/hud-theme";

export interface Tab {
  id: string;
  label: string;
}

export default function SidebarTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  const c = useHudColor();

  return (
    <div className="flex items-center gap-1 shrink-0 mb-3">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="px-2.5 py-1 text-[10px] font-medium transition-all duration-200 rounded"
            style={
              isActive
                ? {
                    background: c(0.06),
                    color: c(0.85),
                    boxShadow: `inset 0 -1px 0 ${c(0.3)}`,
                  }
                : {
                    background: "transparent",
                    color: "rgba(163, 163, 163, 0.5)",
                  }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
