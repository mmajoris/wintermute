export type AnatomyLevel =
  | "macro"
  | "system"
  | "region"
  | "subregion"
  | "circuit"
  | "cellular";

export type SystemCategory =
  | "cerebrum"
  | "brainstem"
  | "cerebellum"
  | "limbic"
  | "autonomic"
  | "peripheral"
  | "endocrine"
  | "organ"
  | "pathway"
  | "cellular";

export type SignalType = "electrical" | "chemical" | "hormonal" | "mechanical";

export interface SchemaField {
  name: string;
  type: string;
  description: string;
}

export interface SchemaNode {
  id: string;
  collection: string;
  role: string;
  description: string;
  fields: SchemaField[];
  activationState: number;
  linkedModules: string[];
  category: SystemCategory;
}

export interface Connection {
  targetId: string;
  type: "excitatory" | "inhibitory" | "modulatory" | "structural";
  strength: number;
  signalType: SignalType;
  label?: string;
}

export interface PathwayPoint {
  position: [number, number, number];
  radius?: number;
}

export interface BiologicalNode {
  id: string;
  name: string;
  level: AnatomyLevel;
  category: SystemCategory;
  description: string;
  functions: string[];
  children: BiologicalNode[];
  position3D: [number, number, number];
  scale3D?: [number, number, number];
  color: string;
  schemaMapping: SchemaNode;
  connections: Connection[];
  signalType: SignalType;
  pathway?: PathwayPoint[];
}

export type LayerType =
  | "skeletal"
  | "muscular"
  | "vascular"
  | "nervous"
  | "autonomic"
  | "endocrine";

export interface ExplorerStore {
  selectedBioNodeId: string | null;
  selectedSchemaNodeId: string | null;
  hoveredBioNodeId: string | null;

  drillDownPath: string[];
  currentLevel: AnatomyLevel;

  visibleLayers: Set<LayerType>;
  showConnections: boolean;
  showSignalFlow: boolean;

  schemaViewMode: "graph" | "tree" | "split";

  selectBioNode: (id: string | null) => void;
  selectSchemaNode: (id: string | null) => void;
  hoverBioNode: (id: string | null) => void;
  drillInto: (id: string) => void;
  drillOut: () => void;
  drillToRoot: () => void;
  toggleLayer: (layer: LayerType) => void;
  setSchemaViewMode: (mode: "graph" | "tree" | "split") => void;
  setShowConnections: (show: boolean) => void;
  setShowSignalFlow: (show: boolean) => void;
}
