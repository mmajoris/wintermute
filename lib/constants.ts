export const CATEGORY_COLORS: Record<string, string> = {
  cerebrum: "#6366f1",
  cerebellum: "#8b5cf6",
  brainstem: "#ec4899",
  limbic: "#f97316",
  autonomic: "#22c55e",
  peripheral: "#eab308",
  endocrine: "#f59e0b",
  organ: "#ef4444",
  pathway: "#06b6d4",
  cellular: "#a78bfa",
};

export const LAYER_COLORS: Record<string, string> = {
  skeletal: "#d4d4d8",
  muscular: "#ef4444",
  vascular: "#dc2626",
  nervous: "#facc15",
  autonomic: "#22c55e",
  endocrine: "#f59e0b",
};

export const SIGNAL_COLORS: Record<string, string> = {
  electrical: "#60a5fa",
  chemical: "#34d399",
  hormonal: "#fbbf24",
  mechanical: "#f87171",
};

export const CAMERA_POSITIONS = {
  fullBody: { position: [0, 0, 8] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  brain: { position: [0, 3.5, 3] as [number, number, number], target: [0, 3.2, 0] as [number, number, number] },
  brainstem: { position: [0, 2.5, 2.5] as [number, number, number], target: [0, 2.3, 0] as [number, number, number] },
  torso: { position: [0, 0.5, 4] as [number, number, number], target: [0, 0.5, 0] as [number, number, number] },
  micro: { position: [0, 0, 2] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
};
