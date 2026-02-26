"use client";

import React from "react";
import HudFrame from "@/components/ui/HudFrame";
import type { HudFrameVariant } from "@/components/ui/HudFrame";
import { useHudColor } from "@/components/ui/hud-theme";

export function BracketFrame({
  children,
  className = "",
  variant = "chamfered",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: HudFrameVariant;
  style?: React.CSSProperties;
}) {
  return (
    <HudFrame variant={variant} className={className} style={style}>
      {children}
    </HudFrame>
  );
}

export function HudDivider() {
  const c = useHudColor();
  return (
    <div
      className="h-px my-2"
      style={{
        background: `linear-gradient(90deg, ${c(0.3)} 0%, ${c(0.12)} 100%)`,
      }}
    />
  );
}

export function HudSectionTitle({ children }: { children: React.ReactNode }) {
  const c = useHudColor();
  return (
    <span
      className="text-[10px] uppercase tracking-[0.15em] font-medium flex items-center gap-1.5"
      style={{ color: c(0.75) }}
    >
      {children}
    </span>
  );
}
