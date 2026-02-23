"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { useExplorerStore } from "@/lib/store";
import { computationalModules, type ComputationalModule } from "@/data/schema/modules";
import { CATEGORY_COLORS } from "@/lib/constants";

const LAYER_LABELS: Record<number, string> = {
  7: "Consciousness",
  6: "Executive",
  5: "Integration",
  4: "Modulation",
  3: "Monitoring",
  2: "Regulation",
  1: "Survival",
};

const LAYER_ORDER = [7, 6, 5, 4, 3, 2, 1];

const BIO_TO_MODULE: Record<string, string> = {
  "frontal-lobe": "executive-controller",
  "prefrontal-cortex": "executive-controller",
  "primary-motor-cortex": "action-dispatcher",
  "thalamus": "signal-router",
  "hippocampus": "memory-writer",
  "amygdala": "emotional-modulator",
  "basal-ganglia": "action-gate",
  "caudate-nucleus": "action-gate",
  "putamen": "action-gate",
  "nucleus-accumbens": "reward-predictor",
  "substantia-nigra": "reward-predictor",
  "cerebellum": "error-corrector",
  "hypothalamus": "homeostatic-regulator",
  "midbrain": "alertness-controller",
  "pons": "alertness-controller",
  "medulla": "autonomic-manager",
  "entorhinal-cortex": "memory-retrieval",
  "dentate-gyrus": "memory-writer",
  "subiculum": "memory-retrieval",
  "auditory-cortex": "sensory-integrator",
  "cn-x": "autonomic-manager",
  "left-hemisphere": "narrative-engine",
  "right-hemisphere": "sensory-integrator",
  "corpus-callosum": "signal-router",
  "pituitary": "homeostatic-regulator",
  "ventricles": "body-state-monitor",
};

interface NodeLayout {
  module: ComputationalModule;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function ForceGraph() {
  const { selectedBioNodeId, selectBioNode } = useExplorerStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 500, height: 400 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 50 && height > 50) setDims({ width, height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const highlightedModuleId = selectedBioNodeId
    ? BIO_TO_MODULE[selectedBioNodeId] ?? null
    : null;

  const { nodes, layerYs } = useMemo(() => {
    const PAD_X = 12;
    const PAD_TOP = 8;
    const LABEL_H = 18;
    const CARD_GAP = 6;
    const layerCount = LAYER_ORDER.length;
    const rowH = (dims.height - PAD_TOP) / layerCount;
    const NODE_H = Math.min(44, rowH - LABEL_H - 4);
    const NODE_MIN_W = 140;

    const laid: NodeLayout[] = [];
    const yMap: Record<number, number> = {};

    LAYER_ORDER.forEach((layer, li) => {
      const rowTop = PAD_TOP + li * rowH;
      const cardY = rowTop + LABEL_H;
      yMap[layer] = rowTop;
      const modsInLayer = computationalModules.filter((m) => m.layer === layer);
      const totalGap = (modsInLayer.length - 1) * CARD_GAP;
      const nodeW = Math.max(
        NODE_MIN_W,
        (dims.width - PAD_X * 2 - totalGap) / Math.max(modsInLayer.length, 1)
      );

      modsInLayer.forEach((mod, mi) => {
        const x = PAD_X + mi * (nodeW + CARD_GAP);
        laid.push({ module: mod, x, y: cardY, w: nodeW, h: NODE_H });
      });
    });

    return { nodes: laid, layerYs: yMap };
  }, [dims]);

  const nodeMap = useMemo(() => {
    const m = new Map<string, NodeLayout>();
    nodes.forEach((n) => m.set(n.module.id, n));
    return m;
  }, [nodes]);

  const edges = useMemo(() => {
    const result: { from: NodeLayout; to: NodeLayout; highlighted: boolean }[] = [];
    nodes.forEach((node) => {
      node.module.outputTargets.forEach((targetId) => {
        const target = nodeMap.get(targetId);
        if (target) {
          const highlighted =
            highlightedModuleId === node.module.id ||
            highlightedModuleId === targetId;
          result.push({ from: node, to: target, highlighted });
        }
      });
    });
    return result;
  }, [nodes, nodeMap, highlightedModuleId]);

  const handleModuleClick = (moduleId: string) => {
    const bioId = Object.entries(BIO_TO_MODULE).find(
      ([, modId]) => modId === moduleId
    )?.[0];
    if (bioId) selectBioNode(bioId);
  };

  return (
    <div ref={containerRef} className="h-full w-full relative overflow-hidden bg-[var(--color-bg)]">
      <svg className="w-full h-full" style={{ minHeight: 300 }} onClick={() => selectBioNode(null)}>
        <defs>
          <filter id="card-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#334155" opacity="0.5" />
          </marker>
          <marker id="arrowhead-hl" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#818cf8" opacity="0.8" />
          </marker>
        </defs>

        {/* Layer rows — label + separator */}
        {LAYER_ORDER.map((layer, i) => {
          const rowY = layerYs[layer];
          if (rowY === undefined) return null;
          return (
            <g key={`layer-${layer}`}>
              {/* Separator line above (skip first) */}
              {i > 0 && (
                <line x1={0} y1={rowY - 1} x2={dims.width} y2={rowY - 1} stroke="#1a1a2e" strokeWidth="1" />
              )}
              {/* Label */}
              <text
                x={8} y={rowY + 13}
                fill="#555"
                fontSize="11"
                fontWeight="700"
                className="select-none pointer-events-none"
                letterSpacing="0.1em"
                textDecoration="none"
              >
                {LAYER_LABELS[layer]?.toUpperCase()} (L{layer})
              </text>
            </g>
          );
        })}

        {/* Connection edges */}
        {edges.map((edge, i) => {
          const fromCx = edge.from.x + edge.from.w / 2;
          const toCx = edge.to.x + edge.to.w / 2;
          const fromBottom = edge.from.y + edge.from.h;
          const toTop = edge.to.y;
          const fromTop = edge.from.y;
          const toBottom = edge.to.y + edge.to.h;

          const goingDown = edge.to.y > edge.from.y;
          const startY = goingDown ? fromBottom : fromTop;
          const endY = goingDown ? toTop : toBottom;
          const midY = (startY + endY) / 2;

          const d = `M ${fromCx} ${startY} C ${fromCx} ${midY}, ${toCx} ${midY}, ${toCx} ${endY}`;

          return (
            <path
              key={`e-${i}`}
              d={d}
              fill="none"
              stroke={edge.highlighted ? "#818cf8" : "#1e293b"}
              strokeWidth={edge.highlighted ? 1.5 : 0.6}
              opacity={edge.highlighted ? 0.6 : 0.12}
              markerEnd={edge.highlighted ? "url(#arrowhead-hl)" : "url(#arrowhead)"}
              className="pointer-events-none"
            />
          );
        })}

        {/* Module cards */}
        {nodes.map((node) => {
          const mod = node.module;
          const color = CATEGORY_COLORS[mod.category] ?? "#6366f1";
          const isHighlighted = highlightedModuleId === mod.id;
          const isConnected = edges.some(
            (e) => e.highlighted && (e.from.module.id === mod.id || e.to.module.id === mod.id)
          );
          const active = isHighlighted || isConnected;

          return (
            <g
              key={mod.id}
              onClick={(e) => { e.stopPropagation(); handleModuleClick(mod.id); }}
              className="cursor-pointer"
            >
              {isHighlighted && (
                <rect
                  x={node.x - 2} y={node.y - 2}
                  width={node.w + 4} height={node.h + 4}
                  rx={6} ry={6}
                  fill="none" stroke={color} strokeWidth="1.5"
                  opacity="0.5" filter="url(#card-glow)"
                />
              )}

              <rect
                x={node.x} y={node.y}
                width={node.w} height={node.h}
                rx={4} ry={4}
                fill={active ? `${color}15` : "#0d0d14"}
                stroke={active ? `${color}50` : "#1e293b"}
                strokeWidth={active ? 1.2 : 0.5}
              />

              {/* Color accent bar */}
              <rect
                x={node.x} y={node.y}
                width={3} height={node.h}
                rx={2} ry={0}
                fill={color}
                opacity={active ? 0.9 : 0.3}
              />

              {/* Module name */}
              <text
                x={node.x + 12} y={node.y + 18}
                fill={active ? "#fafafa" : "#a3a3a3"}
                fontSize="12"
                fontWeight="600"
                className="select-none pointer-events-none"
              >
                {mod.name.length > Math.floor(node.w / 7.5)
                  ? mod.name.slice(0, Math.floor(node.w / 7.5)) + "…"
                  : mod.name}
              </text>

              {/* Role subtitle */}
              <text
                x={node.x + 12} y={node.y + 33}
                fill={active ? "#737373" : "#3a3a3a"}
                fontSize="10"
                className="select-none pointer-events-none"
              >
                {mod.role.length > Math.floor(node.w / 6)
                  ? mod.role.slice(0, Math.floor(node.w / 6)) + "…"
                  : mod.role}
              </text>

              {/* Connection count badge */}
              <circle
                cx={node.x + node.w - 14}
                cy={node.y + node.h / 2}
                r={9}
                fill={active ? color : "#161622"}
                opacity={active ? 0.5 : 0.5}
                stroke={active ? "none" : "#1e293b"}
                strokeWidth={0.5}
              />
              <text
                x={node.x + node.w - 14}
                y={node.y + node.h / 2 + 4}
                textAnchor="middle"
                fill={active ? "#fff" : "#525252"}
                fontSize="10"
                fontWeight="bold"
                className="select-none pointer-events-none"
              >
                {mod.inputSources.length + mod.outputTargets.length}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
