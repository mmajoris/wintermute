import type { BiologicalNode, SchemaNode } from "@/lib/types";
import { anatomyRoot } from "./anatomy";

export { anatomyRoot };

let nodeCache: Map<string, BiologicalNode> | null = null;
let schemaCache: Map<string, SchemaNode> | null = null;
let bioToSchemaCache: Map<string, string> | null = null;
let schemaToBioCache: Map<string, string> | null = null;

function buildCaches() {
  if (nodeCache) return;

  nodeCache = new Map();
  schemaCache = new Map();
  bioToSchemaCache = new Map();
  schemaToBioCache = new Map();

  function walk(node: BiologicalNode) {
    nodeCache!.set(node.id, node);
    if (node.schemaMapping) {
      schemaCache!.set(node.schemaMapping.id, node.schemaMapping);
      bioToSchemaCache!.set(node.id, node.schemaMapping.id);
      schemaToBioCache!.set(node.schemaMapping.id, node.id);
    }
    for (const child of node.children) {
      walk(child);
    }
  }

  walk(anatomyRoot);
}

export function findNodeById(id: string): BiologicalNode | undefined {
  buildCaches();
  return nodeCache!.get(id);
}

export function findSchemaById(id: string): SchemaNode | undefined {
  buildCaches();
  return schemaCache!.get(id);
}

export function findSchemaByBioId(bioId: string): string | null {
  buildCaches();
  return bioToSchemaCache!.get(bioId) ?? null;
}

export function findBioIdBySchemaId(schemaId: string): string | null {
  buildCaches();
  return schemaToBioCache!.get(schemaId) ?? null;
}

export function getAllBioNodes(): BiologicalNode[] {
  buildCaches();
  return Array.from(nodeCache!.values());
}

export function getAllSchemaNodes(): SchemaNode[] {
  buildCaches();
  return Array.from(schemaCache!.values());
}

export function getChildrenOf(id: string): BiologicalNode[] {
  const node = findNodeById(id);
  return node?.children ?? [];
}

export function flattenTree(node: BiologicalNode): BiologicalNode[] {
  const result: BiologicalNode[] = [node];
  for (const child of node.children) {
    result.push(...flattenTree(child));
  }
  return result;
}

export function searchNodes(query: string): BiologicalNode[] {
  buildCaches();
  const lower = query.toLowerCase();
  return Array.from(nodeCache!.values()).filter(
    (node) =>
      node.name.toLowerCase().includes(lower) ||
      node.description.toLowerCase().includes(lower) ||
      node.functions.some((f) => f.toLowerCase().includes(lower)) ||
      node.schemaMapping?.collection.toLowerCase().includes(lower) ||
      node.schemaMapping?.role.toLowerCase().includes(lower)
  );
}

export interface GraphData {
  nodes: { id: string; name: string; val: number; color: string; category: string }[];
  links: { source: string; target: string; type: string; strength: number }[];
}

export function buildSchemaGraph(): GraphData {
  buildCaches();
  const nodes: GraphData["nodes"] = [];
  const links: GraphData["links"] = [];
  const seen = new Set<string>();

  for (const schema of schemaCache!.values()) {
    if (!seen.has(schema.id)) {
      seen.add(schema.id);
      nodes.push({
        id: schema.id,
        name: schema.role,
        val: schema.fields.length + 1,
        color:
          schema.category in
          {
            cerebrum: 1,
            brainstem: 1,
            cerebellum: 1,
            limbic: 1,
            autonomic: 1,
            peripheral: 1,
            endocrine: 1,
            organ: 1,
            pathway: 1,
            cellular: 1,
          }
            ? getCategoryColor(schema.category)
            : "#6366f1",
        category: schema.category,
      });
    }

    for (const linkedId of schema.linkedModules) {
      if (schemaCache!.has(linkedId)) {
        links.push({
          source: schema.id,
          target: linkedId,
          type: "modulatory",
          strength: 0.5,
        });
      }
    }
  }

  return { nodes, links };
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
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
  return colors[category] ?? "#6366f1";
}
