"use client";

import { useExplorerStore } from "@/lib/store";
import type { LayerType } from "@/lib/types";
import { LAYER_COLORS } from "@/lib/constants";

const LAYERS: { key: LayerType; label: string }[] = [
  { key: "nervous", label: "Nervous" },
  { key: "autonomic", label: "Autonomic" },
  { key: "vascular", label: "Vascular" },
  { key: "muscular", label: "Muscular" },
  { key: "skeletal", label: "Skeletal" },
  { key: "endocrine", label: "Endocrine" },
];

export default function ControlBar() {
  const {
    visibleLayers,
    toggleLayer,
    showConnections,
    setShowConnections,
    showSignalFlow,
    setShowSignalFlow,
    schemaViewMode,
    setSchemaViewMode,
  } = useExplorerStore();

  return (
    <div className="h-10 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center px-4 gap-4 text-xs flex-shrink-0">
      <span className="text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
        Layers
      </span>
      <div className="flex gap-1">
        {LAYERS.map(({ key, label }) => {
          const active = visibleLayers.has(key);
          return (
            <button
              key={key}
              onClick={() => toggleLayer(key)}
              className="px-2 py-1 rounded transition-all"
              style={{
                background: active ? LAYER_COLORS[key] + "30" : "transparent",
                color: active ? LAYER_COLORS[key] : "var(--color-text-muted)",
                border: `1px solid ${active ? LAYER_COLORS[key] + "60" : "transparent"}`,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="w-px h-5 bg-[var(--color-border)]" />

      <button
        onClick={() => setShowConnections(!showConnections)}
        className={`px-2 py-1 rounded transition-all ${
          showConnections
            ? "bg-[var(--color-accent-blue)]/20 text-[var(--color-accent-blue)] border border-[var(--color-accent-blue)]/40"
            : "text-[var(--color-text-muted)]"
        }`}
      >
        Connections
      </button>

      <button
        onClick={() => setShowSignalFlow(!showSignalFlow)}
        className={`px-2 py-1 rounded transition-all ${
          showSignalFlow
            ? "bg-[var(--color-accent-green)]/20 text-[var(--color-accent-green)] border border-[var(--color-accent-green)]/40"
            : "text-[var(--color-text-muted)]"
        }`}
      >
        Signal Flow
      </button>

      <div className="flex-1" />

      <span className="text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
        Schema View
      </span>
      <div className="flex gap-1">
        {(["graph", "tree", "split"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setSchemaViewMode(mode)}
            className={`px-2 py-1 rounded capitalize transition-all ${
              schemaViewMode === mode
                ? "bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] border border-[var(--color-accent-purple)]/40"
                : "text-[var(--color-text-muted)]"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
