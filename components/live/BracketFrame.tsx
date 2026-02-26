"use client";

import React from "react";

const BORDER = "rgba(0, 180, 220, 0.2)";
const ACCENT = "rgba(0, 180, 220, 0.5)";
const ARM = 10;

function CornerBracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const t = pos[0] === "t";
  const l = pos[1] === "l";
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: ARM,
        height: ARM,
        top: t ? -1 : undefined,
        bottom: t ? undefined : -1,
        left: l ? -1 : undefined,
        right: l ? undefined : -1,
        borderTop: t ? `1.5px solid ${ACCENT}` : "none",
        borderBottom: t ? "none" : `1.5px solid ${ACCENT}`,
        borderLeft: l ? `1.5px solid ${ACCENT}` : "none",
        borderRight: l ? "none" : `1.5px solid ${ACCENT}`,
      }}
    />
  );
}

export function BracketFrame({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
      background: "rgba(2, 4, 8, 0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: `1px solid ${BORDER}`,
      boxShadow: `
        0 0 20px rgba(0, 180, 220, 0.08),
        inset 1px 1px 0 rgba(255,255,255,0.035)
      `,
        ...style,
      }}
    >
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />
      {children}
    </div>
  );
}

export function HudDivider() {
  return (
    <div
      className="h-px my-2"
      style={{
        background:
          "linear-gradient(90deg, rgba(0,200,220,0.3) 0%, rgba(0,200,220,0.12) 100%)",
      }}
    />
  );
}

export function HudSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] uppercase tracking-[0.15em] font-medium flex items-center gap-1.5"
      style={{ color: "rgba(0, 200, 220, 0.75)" }}
    >
      {children}
    </span>
  );
}
