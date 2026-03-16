"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHudColor } from "@/components/ui/hud-theme";
import type { Side } from "@/lib/panel-layout";
import PanelSettingsDrawer from "./PanelSettingsDrawer";

export default function PanelEditTrigger({ side }: { side: Side }) {
  const c = useHudColor();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isLeft = side === "left";

  return (
    <>
      <div
        className="absolute z-20"
        style={{ top: 6, [isLeft ? "left" : "right"]: 4 }}
      >
        {/* Dot trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative w-3 h-3 flex items-center justify-center group"
        >
          <div
            className="w-[5px] h-[5px] rounded-full transition-all duration-300"
            style={{
              backgroundColor: open ? c(0.8) : c(0.15),
              boxShadow: open ? `0 0 8px ${c(0.5)}, 0 0 2px ${c(0.8)}` : "none",
            }}
          />
          {!open && (
            <div
              className="absolute w-[5px] h-[5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                backgroundColor: c(0.4),
                boxShadow: `0 0 6px ${c(0.3)}`,
              }}
            />
          )}
        </button>

        <AnimatePresence>
          {open && (
            <>
              {/* Horizontal line extending toward center */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0, transition: { delay: 0.15, duration: 0.12 } }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="absolute"
                style={{
                  top: 5,
                  [isLeft ? "left" : "right"]: 12,
                  width: 120,
                  height: 1,
                  background: `linear-gradient(${isLeft ? "to right" : "to left"}, ${c(0.6)}, ${c(0.15)})`,
                  transformOrigin: isLeft ? "left center" : "right center",
                  boxShadow: `0 0 4px ${c(0.2)}`,
                }}
              />

              {/* Junction dot at the end of the line */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.08 } }}
                transition={{ delay: 0.2, duration: 0.15 }}
                className="absolute"
                style={{
                  top: 2,
                  [isLeft ? "left" : "right"]: 128,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: c(0.5),
                  boxShadow: `0 0 6px ${c(0.4)}`,
                }}
              />

              {/* Vertical line dropping down */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0, transition: { delay: 0.08, duration: 0.1 } }}
                transition={{ delay: 0.3, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute"
                style={{
                  top: 9,
                  [isLeft ? "left" : "right"]: 131,
                  width: 1,
                  height: 16,
                  background: `linear-gradient(to bottom, ${c(0.5)}, ${c(0.2)})`,
                  transformOrigin: "top center",
                  boxShadow: `0 0 3px ${c(0.15)}`,
                }}
              />

              {/* Panel expanding from the junction */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0, scaleX: 0.3 }}
                animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleY: 0, scaleX: 0.3, transition: { duration: 0.12 } }}
                transition={{ delay: 0.45, duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute"
                style={{
                  top: 25,
                  [isLeft ? "left" : "right"]: 100,
                  transformOrigin: isLeft ? "top left" : "top right",
                  width: 130,
                  background: "rgba(2, 4, 8, 0.92)",
                  border: `1px solid ${c(0.15)}`,
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 0 12px rgba(0,0,0,0.5), inset 0 0 1px ${c(0.1)}`,
                }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2" style={{ borderTop: `1px solid ${c(0.45)}`, borderLeft: `1px solid ${c(0.45)}` }} />
                <div className="absolute top-0 right-0 w-2 h-2" style={{ borderTop: `1px solid ${c(0.45)}`, borderRight: `1px solid ${c(0.45)}` }} />
                <div className="absolute bottom-0 left-0 w-2 h-2" style={{ borderBottom: `1px solid ${c(0.45)}`, borderLeft: `1px solid ${c(0.45)}` }} />
                <div className="absolute bottom-0 right-0 w-2 h-2" style={{ borderBottom: `1px solid ${c(0.45)}`, borderRight: `1px solid ${c(0.45)}` }} />

                {/* Top accent line */}
                <div
                  className="absolute top-0 h-px"
                  style={{
                    [isLeft ? "left" : "right"]: 8,
                    width: 40,
                    background: c(0.4),
                    boxShadow: `0 0 4px ${c(0.2)}`,
                  }}
                />

                <div className="p-2.5 space-y-0.5">
                  <button
                    onClick={() => { setOpen(false); setSettingsOpen(true); }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[10px] transition-all"
                    style={{ color: c(0.6) }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = c(0.9);
                      e.currentTarget.style.background = c(0.06);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = c(0.6);
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    Edit {isLeft ? "Left" : "Right"} Layout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {settingsOpen && (
        <PanelSettingsDrawer side={side} onClose={() => setSettingsOpen(false)} />
      )}
    </>
  );
}
