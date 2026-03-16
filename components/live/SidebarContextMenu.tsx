"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useHudColor } from "@/components/ui/hud-theme";
import type { Side } from "@/lib/panel-layout";
import PanelSettingsDrawer from "./PanelSettingsDrawer";

export default function SidebarContextMenu({
  side,
  pos,
  onClose,
}: {
  side: Side;
  pos: { x: number; y: number };
  onClose: () => void;
}) {
  const c = useHudColor();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", handler);
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("mousedown", handler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [onClose]);

  if (settingsOpen) {
    return <PanelSettingsDrawer side={side} onClose={onClose} />;
  }

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className="fixed z-50"
      style={{
        top: pos.y,
        left: pos.x,
        background: "rgba(2, 4, 8, 0.95)",
        border: `1px solid ${c(0.15)}`,
        borderRadius: 4,
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 16px rgba(0,0,0,0.6), 0 0 1px ${c(0.1)}`,
      }}
    >
      <div className="py-1">
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-full flex items-center gap-2 px-3.5 py-1.5 text-[10px] transition-colors whitespace-nowrap"
          style={{ color: c(0.6) }}
          onMouseEnter={(e) => { e.currentTarget.style.color = c(0.9); e.currentTarget.style.background = c(0.06); }}
          onMouseLeave={(e) => { e.currentTarget.style.color = c(0.6); e.currentTarget.style.background = "transparent"; }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          Edit Panels
        </button>
      </div>
    </motion.div>
  );
}
