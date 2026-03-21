import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Panel Registry ─────────────────────────────────────────────────────────

export interface PanelDef {
  id: string;
  label: string;
}

export const PANEL_REGISTRY: PanelDef[] = [
  { id: "vitals", label: "System Vitals" },
  { id: "synaptic-activity", label: "Synaptic Activity" },
  { id: "cognitive-state", label: "Cognitive State" },
  { id: "regions", label: "Neural Regions" },
  { id: "radial", label: "NT Radial" },
  { id: "neurochemistry", label: "Neurochemistry" },
  { id: "traces", label: "Signal Traces" },
  { id: "events", label: "Event Stream" },
  { id: "eeg-display", label: "EEG Monitor" },
  { id: "brain-topo", label: "qEEG Topography" },
  { id: "hpa-stress", label: "HPA Axis & Stress" },
  { id: "affect-circuits", label: "Affect Circuits" },
  { id: "dopamine-system", label: "Dopamine System" },
  { id: "circadian-rhythm", label: "Circadian & Homeostasis" },
  { id: "cortical-cognitive", label: "Cognitive & Memory" },
  { id: "mri-viewer", label: "MRI Scan" },
  { id: "ct-scan", label: "CT Scan" },
  { id: "pet-scan", label: "PET Scan" },
  { id: "fmri-bold", label: "fMRI BOLD" },
];

export function getPanelLabel(id: string): string {
  return PANEL_REGISTRY.find((p) => p.id === id)?.label ?? id;
}

// ── Layout Types ───────────────────────────────────────────────────────────

export interface PanelTab {
  id: string;
  label: string;
  panels: string[];
}

export type Side = "left" | "right";

export interface SidebarLayout {
  left: PanelTab[];
  right: PanelTab[];
  activeLeft: string;
  activeRight: string;
}

const DEFAULT_LAYOUT: SidebarLayout = {
  left: [
    {
      id: "default",
      label: "Default",
      panels: ["vitals", "synaptic-activity", "cognitive-state", "regions"],
    },
    {
      id: "neuro",
      label: "Neuro",
      panels: ["affect-circuits", "hpa-stress", "dopamine-system"],
    },
    {
      id: "imaging",
      label: "Imaging",
      panels: ["mri-viewer", "ct-scan"],
    },
  ],
  right: [
    {
      id: "default",
      label: "Default",
      panels: ["radial", "neurochemistry", "traces", "events"],
    },
    {
      id: "eeg",
      label: "EEG",
      panels: ["eeg-display", "brain-topo"],
    },
    {
      id: "clinical",
      label: "Clinical",
      panels: ["circadian-rhythm", "cortical-cognitive"],
    },
    {
      id: "functional",
      label: "Functional",
      panels: ["pet-scan", "fmri-bold"],
    },
  ],
  activeLeft: "default",
  activeRight: "default",
};

// ── Zustand Store ──────────────────────────────────────────────────────────

interface PanelLayoutStore extends SidebarLayout {
  setActiveTab: (side: Side, tabId: string) => void;
  updateTabPanels: (side: Side, tabId: string, panels: string[]) => void;
  renameTab: (side: Side, tabId: string, label: string) => void;
  addTab: (side: Side, label: string) => void;
  removeTab: (side: Side, tabId: string) => void;
  movePanel: (side: Side, tabId: string, panelId: string, direction: "up" | "down") => void;
  resetToDefault: () => void;
}

export const usePanelLayout = create<PanelLayoutStore>()(
  persist(
    (set) => ({
      ...DEFAULT_LAYOUT,

      setActiveTab: (side, tabId) =>
        set((s) => (side === "left" ? { activeLeft: tabId } : { activeRight: tabId })),

      updateTabPanels: (side, tabId, panels) =>
        set((s) => ({
          [side]: s[side].map((t) => (t.id === tabId ? { ...t, panels } : t)),
        })),

      renameTab: (side, tabId, label) =>
        set((s) => ({
          [side]: s[side].map((t) => (t.id === tabId ? { ...t, label } : t)),
        })),

      addTab: (side, label) => {
        const id = `tab_${Date.now()}`;
        set((s) => ({
          [side]: [...s[side], { id, label, panels: [] }],
          ...(side === "left" ? { activeLeft: id } : { activeRight: id }),
        }));
      },

      removeTab: (side, tabId) =>
        set((s) => {
          if (tabId === "default") return s;
          const tabs = s[side].filter((t) => t.id !== tabId);
          if (tabs.length === 0) return s;
          const activeKey = side === "left" ? "activeLeft" : "activeRight";
          const currentActive = s[activeKey];
          return {
            [side]: tabs,
            [activeKey]: currentActive === tabId ? tabs[0].id : currentActive,
          };
        }),

      movePanel: (side, tabId, panelId, direction) =>
        set((s) => ({
          [side]: s[side].map((t) => {
            if (t.id !== tabId) return t;
            const idx = t.panels.indexOf(panelId);
            if (idx === -1) return t;
            const swapIdx = direction === "up" ? idx - 1 : idx + 1;
            if (swapIdx < 0 || swapIdx >= t.panels.length) return t;
            const panels = [...t.panels];
            [panels[idx], panels[swapIdx]] = [panels[swapIdx], panels[idx]];
            return { ...t, panels };
          }),
        })),

      resetToDefault: () => set(DEFAULT_LAYOUT),
    }),
    {
      name: "wintermute:panel-layout",
      version: 3,
      migrate: (persisted: unknown, version: number) => {
        if (version < 3) {
          return DEFAULT_LAYOUT;
        }
        return persisted as PanelLayoutStore;
      },
    },
  ),
);

// ── Helpers ────────────────────────────────────────────────────────────────

export function getActiveTabs(side: Side, state: SidebarLayout) {
  return side === "left" ? state.left : state.right;
}

export function getActiveTabId(side: Side, state: SidebarLayout) {
  return side === "left" ? state.activeLeft : state.activeRight;
}
