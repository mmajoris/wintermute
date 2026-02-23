"use client";

import { useExplorerStore } from "@/lib/store";
import { findNodeById } from "@/data/mappings";
import { CATEGORY_COLORS } from "@/lib/constants";

export default function Tooltip() {
  const { hoveredBioNodeId } = useExplorerStore();

  if (!hoveredBioNodeId) return null;

  const node = findNodeById(hoveredBioNodeId);
  if (!node) return null;

  const color = CATEGORY_COLORS[node.category] ?? "#6366f1";

  return (
    <div className="absolute top-4 left-4 z-30 pointer-events-none max-w-xs">
      <div
        className="bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-border)] rounded-lg p-3 shadow-xl"
        style={{ borderLeftColor: color, borderLeftWidth: "3px" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-medium text-[var(--color-text)]">
            {node.name}
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)] capitalize ml-auto">
            {node.level}
          </span>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed mb-2">
          {node.description.length > 120
            ? node.description.slice(0, 120) + "..."
            : node.description}
        </p>
        <div className="flex items-center gap-2 text-[9px]">
          <code className="font-mono text-[var(--color-accent-cyan)]">
            {node.schemaMapping?.collection}
          </code>
          <span className="text-[var(--color-text-muted)]">→</span>
          <span className="text-[var(--color-accent-purple)]">
            {node.schemaMapping?.role}
          </span>
        </div>
        {node.children.length > 0 && (
          <div className="mt-1.5 pt-1.5 border-t border-[var(--color-border)]">
            <span className="text-[9px] text-[var(--color-text-muted)]">
              Click to select, click again to drill into {node.children.length}{" "}
              sub-structures
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
