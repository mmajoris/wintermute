"use client";

import { useExplorerStore } from "@/lib/store";
import { findNodeById } from "@/data/mappings";

export default function Breadcrumb() {
  const { drillDownPath, drillToRoot, drillInto } = useExplorerStore();

  if (drillDownPath.length === 0) return null;

  const crumbs = drillDownPath.map((id) => {
    const node = findNodeById(id);
    return { id, name: node?.name ?? id };
  });

  return (
    <div className="h-8 bg-[var(--color-surface)]/80 backdrop-blur border-b border-[var(--color-border)] flex items-center px-4 gap-1 text-xs flex-shrink-0">
      <button
        onClick={drillToRoot}
        className="text-[var(--color-accent-blue)] hover:underline"
      >
        Root
      </button>
      {crumbs.map((crumb, i) => (
        <span key={crumb.id} className="flex items-center gap-1">
          <span className="text-[var(--color-text-muted)]">/</span>
          {i < crumbs.length - 1 ? (
            <button
              onClick={() => {
                const targetPath = drillDownPath.slice(0, i + 1);
                drillToRoot();
                targetPath.forEach((id) => drillInto(id));
              }}
              className="text-[var(--color-accent-blue)] hover:underline"
            >
              {crumb.name}
            </button>
          ) : (
            <span className="text-[var(--color-text)]">{crumb.name}</span>
          )}
        </span>
      ))}
    </div>
  );
}
