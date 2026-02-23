"use client";

import { useExplorerStore } from "@/lib/store";
import { findNodeById } from "@/data/mappings";
import { CATEGORY_COLORS } from "@/lib/constants";

export default function CollectionDetail() {
  const { selectedBioNodeId } = useExplorerStore();

  if (!selectedBioNodeId) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-[var(--color-text-muted)] text-xs text-center">
          Select a biological region to view its schema mapping
        </p>
      </div>
    );
  }

  const node = findNodeById(selectedBioNodeId);
  if (!node) return null;

  const schema = node.schemaMapping;
  const categoryColor = CATEGORY_COLORS[node.category] ?? "#6366f1";

  return (
    <div className="h-full overflow-y-auto p-3 space-y-3">
      {/* Header */}
      <div
        className="rounded-lg p-3 border-l-2"
        style={{
          borderLeftColor: categoryColor,
          background: `${categoryColor}10`,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: categoryColor }}
          />
          <span className="text-xs font-medium text-[var(--color-text)]">
            {node.name}
          </span>
        </div>
        <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
          {node.description}
        </p>
      </div>

      {/* Biological Functions */}
      <div>
        <h4 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
          Biological Functions
        </h4>
        <div className="flex flex-wrap gap-1">
          {node.functions.map((fn, i) => (
            <span
              key={i}
              className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-text-muted)]"
            >
              {fn}
            </span>
          ))}
        </div>
      </div>

      {/* Schema Mapping */}
      <div>
        <h4 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
          Schema Mapping
        </h4>
        <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-text-muted)]">
              Collection
            </span>
            <code className="text-[11px] text-[var(--color-accent-cyan)] font-mono">
              {schema.collection}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[var(--color-text-muted)]">
              Role
            </span>
            <span className="text-[11px] text-[var(--color-text)]">
              {schema.role}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--color-text-muted)]">
              {schema.description}
            </span>
          </div>
        </div>
      </div>

      {/* Schema Fields */}
      <div>
        <h4 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
          Fields ({schema.fields.length})
        </h4>
        <div className="space-y-1">
          {schema.fields.map((field, i) => (
            <div
              key={i}
              className="rounded bg-[var(--color-surface)] border border-[var(--color-border)] p-2"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <code className="text-[10px] font-mono text-[var(--color-accent-green)]">
                  {field.name}
                </code>
                <code className="text-[10px] font-mono text-[var(--color-accent-purple)]">
                  {field.type}
                </code>
              </div>
              <p className="text-[9px] text-[var(--color-text-muted)]">
                {field.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Linked Modules */}
      {schema.linkedModules.length > 0 && (
        <div>
          <h4 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
            Linked Modules ({schema.linkedModules.length})
          </h4>
          <div className="flex flex-wrap gap-1">
            {schema.linkedModules.map((mod, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-accent-blue)] font-mono cursor-pointer hover:bg-[var(--color-surface-2)] transition-colors"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Connections */}
      {node.connections.length > 0 && (
        <div>
          <h4 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
            Neural Connections ({node.connections.length})
          </h4>
          <div className="space-y-1">
            {node.connections.map((conn, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[10px] py-0.5"
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    conn.type === "excitatory"
                      ? "bg-green-500"
                      : conn.type === "inhibitory"
                        ? "bg-red-500"
                        : "bg-blue-500"
                  }`}
                />
                <span className="text-[var(--color-text-muted)]">
                  {conn.type}
                </span>
                <span className="text-[var(--color-text)]">
                  → {conn.targetId}
                </span>
                <span className="ml-auto text-[var(--color-text-muted)]">
                  {(conn.strength * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activation State */}
      <div>
        <h4 className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
          Activation State
        </h4>
        <div className="h-2 rounded-full bg-[var(--color-surface)] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${schema.activationState * 100}%`,
              background: `linear-gradient(90deg, ${categoryColor}60, ${categoryColor})`,
            }}
          />
        </div>
        <span className="text-[10px] text-[var(--color-text-muted)]">
          {(schema.activationState * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
