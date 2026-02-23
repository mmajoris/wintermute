"use client";

import { CATEGORY_COLORS } from "@/lib/constants";

interface ActivationIndicatorProps {
  category: string;
  activationState: number;
  label?: string;
}

export default function ActivationIndicator({
  category,
  activationState,
  label,
}: ActivationIndicatorProps) {
  const color = CATEGORY_COLORS[category] ?? "#6366f1";

  return (
    <div className="flex items-center gap-2">
      {label && (
        <span className="text-[10px] text-[var(--color-text-muted)]">
          {label}
        </span>
      )}
      <div className="flex-1 h-1.5 rounded-full bg-[var(--color-surface)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${activationState * 100}%`,
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
      <span className="text-[9px] text-[var(--color-text-muted)] font-mono tabular-nums min-w-[2.5rem] text-right">
        {(activationState * 100).toFixed(0)}%
      </span>
    </div>
  );
}
