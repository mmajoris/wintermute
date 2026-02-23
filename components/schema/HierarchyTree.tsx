"use client";

import { useState, useCallback, useEffect } from "react";
import type { BiologicalNode } from "@/lib/types";
import { useExplorerStore } from "@/lib/store";
import { CATEGORY_COLORS } from "@/lib/constants";
import { anatomyRoot } from "@/data/mappings";

function hasDescendant(node: BiologicalNode, targetId: string): boolean {
  for (const child of node.children) {
    if (child.id === targetId) return true;
    if (hasDescendant(child, targetId)) return true;
  }
  return false;
}

function TreeNode({
  node,
  depth = 0,
  selectedId,
}: {
  node: BiologicalNode;
  depth?: number;
  selectedId: string | null;
}) {
  const containsSelected = selectedId ? hasDescendant(node, selectedId) : false;
  const [expanded, setExpanded] = useState(depth < 1 || containsSelected);
  const { selectBioNode, drillInto } = useExplorerStore();
  const isSelected = selectedId === node.id;
  const hasChildren = node.children.length > 0;
  const categoryColor = CATEGORY_COLORS[node.category] ?? "#6366f1";

  useEffect(() => {
    if (containsSelected && !expanded) {
      setExpanded(true);
    }
    if (!selectedId && depth > 0 && expanded) {
      setExpanded(false);
    }
  }, [containsSelected, expanded, selectedId, depth]);

  const handleClick = useCallback(() => {
    selectBioNode(node.id);
  }, [selectBioNode, node.id]);

  const handleDoubleClick = useCallback(() => {
    if (hasChildren) {
      drillInto(node.id);
    }
  }, [drillInto, node.id, hasChildren]);

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer transition-colors text-xs group ${
          isSelected
            ? "bg-[var(--color-accent-blue)]/15"
            : containsSelected
              ? "bg-[var(--color-accent-blue)]/5"
              : "hover:bg-[var(--color-surface-2)]"
        }`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="w-4 h-4 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] flex-shrink-0"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className={`transition-transform ${expanded ? "rotate-90" : ""}`}
            >
              <path
                d="M3 1 L7 5 L3 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        ) : (
          <span className="w-4 flex-shrink-0" />
        )}

        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: categoryColor }}
        />

        <span
          className={`truncate ${
            isSelected
              ? "text-[var(--color-text)] font-medium"
              : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"
          }`}
        >
          {node.name}
        </span>

        {hasChildren && (
          <span className="text-[9px] text-[var(--color-text-muted)]/40 flex-shrink-0">
            ({node.children.length})
          </span>
        )}

        <span className="ml-auto text-[10px] text-[var(--color-text-muted)]/60 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
          {node.schemaMapping?.collection}
        </span>
      </div>

      {expanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function HierarchyTree() {
  const { selectedBioNodeId } = useExplorerStore();

  return (
    <div className="h-full overflow-y-auto py-1">
      {anatomyRoot.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={0}
          selectedId={selectedBioNodeId}
        />
      ))}
    </div>
  );
}
