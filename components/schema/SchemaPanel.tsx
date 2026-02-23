"use client";

import { useExplorerStore } from "@/lib/store";
import ForceGraph from "./ForceGraph";
import HierarchyTree from "./HierarchyTree";
import CollectionDetail from "./CollectionDetail";

export default function SchemaPanel() {
  const { schemaViewMode, selectedBioNodeId } = useExplorerStore();

  if (schemaViewMode === "graph") {
    return (
      <div className="h-full flex flex-col bg-[var(--color-surface)]">
        <div className="flex-1 min-h-0">
          <ForceGraph />
        </div>
        {selectedBioNodeId && (
          <div className="h-64 border-t border-[var(--color-border)] overflow-hidden flex-shrink-0">
            <CollectionDetail />
          </div>
        )}
      </div>
    );
  }

  if (schemaViewMode === "tree") {
    return (
      <div className="h-full flex flex-col bg-[var(--color-surface)]">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <HierarchyTree />
        </div>
        {selectedBioNodeId && (
          <div className="h-64 border-t border-[var(--color-border)] overflow-hidden flex-shrink-0">
            <CollectionDetail />
          </div>
        )}
      </div>
    );
  }

  // Split mode (default)
  return (
    <div className="h-full flex flex-col bg-[var(--color-surface)]">
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex-1 min-h-0 border-b border-[var(--color-border)]">
          <ForceGraph />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <HierarchyTree />
        </div>
      </div>
      {selectedBioNodeId && (
        <div className="h-72 border-t border-[var(--color-border)] overflow-hidden flex-shrink-0">
          <CollectionDetail />
        </div>
      )}
    </div>
  );
}
