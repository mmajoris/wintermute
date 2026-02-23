import { create } from "zustand";
import type { AnatomyLevel, ExplorerStore, LayerType } from "./types";
import { findNodeById, findSchemaByBioId, findBioIdBySchemaId } from "@/data/mappings";

export const useExplorerStore = create<ExplorerStore>((set) => ({
  selectedBioNodeId: null,
  selectedSchemaNodeId: null,
  hoveredBioNodeId: null,

  drillDownPath: [],
  currentLevel: "macro" as AnatomyLevel,

  visibleLayers: new Set<LayerType>(["nervous"]),
  showConnections: true,
  showSignalFlow: false,

  schemaViewMode: "split",

  selectBioNode: (id) => {
    const schemaId = id ? findSchemaByBioId(id) : null;
    set({ selectedBioNodeId: id, selectedSchemaNodeId: schemaId });
  },

  selectSchemaNode: (id) => {
    const bioId = id ? findBioIdBySchemaId(id) : null;
    set({ selectedSchemaNodeId: id, selectedBioNodeId: bioId });
  },

  hoverBioNode: (id) => set({ hoveredBioNodeId: id }),

  drillInto: (id) => {
    const node = findNodeById(id);
    if (!node) return;
    set((state) => ({
      drillDownPath: [...state.drillDownPath, id],
      currentLevel: node.level,
      selectedBioNodeId: id,
      selectedSchemaNodeId: findSchemaByBioId(id),
    }));
  },

  drillOut: () => {
    set((state) => {
      const newPath = [...state.drillDownPath];
      newPath.pop();
      const parentId = newPath[newPath.length - 1] || null;
      const parentNode = parentId ? findNodeById(parentId) : null;
      return {
        drillDownPath: newPath,
        currentLevel: parentNode?.level || ("macro" as AnatomyLevel),
        selectedBioNodeId: parentId,
        selectedSchemaNodeId: parentId ? findSchemaByBioId(parentId) : null,
      };
    });
  },

  drillToRoot: () => {
    set({
      drillDownPath: [],
      currentLevel: "macro" as AnatomyLevel,
      selectedBioNodeId: null,
      selectedSchemaNodeId: null,
    });
  },

  toggleLayer: (layer) => {
    set((state) => {
      const next = new Set(state.visibleLayers);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return { visibleLayers: next };
    });
  },

  setSchemaViewMode: (mode) => set({ schemaViewMode: mode }),
  setShowConnections: (show) => set({ showConnections: show }),
  setShowSignalFlow: (show) => set({ showSignalFlow: show }),
}));
