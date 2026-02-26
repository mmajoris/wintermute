"use client";

import { useMemo } from "react";
import { Html, Line } from "@react-three/drei";
import { useLiveStore } from "@/lib/live-store";
import { REGION_CENTERS } from "@/lib/collection-mapping";
import { BRAIN_MODEL_REGISTRY } from "@/lib/brain-model-loader";
import * as THREE from "three";

const MAX_LABELS = 5;
const ACTIVITY_THRESHOLD = 0.25;
const LEADER_OFFSET = 2.2;

export default function HudRegionLabels() {
  const regionActivity = useLiveStore((s) => s.regionActivity);

  const topRegions = useMemo(() => {
    const entries = Array.from(regionActivity.entries())
      .filter(([id, a]) => a.intensity > ACTIVITY_THRESHOLD && REGION_CENTERS[id])
      .sort((a, b) => b[1].intensity - a[1].intensity)
      .slice(0, MAX_LABELS);

    return entries.map(([id, activity]) => {
      const center = REGION_CENTERS[id];
      const reg = BRAIN_MODEL_REGISTRY.find((r) => r.id === id);
      const pos = new THREE.Vector3(center[0], center[1], center[2]);
      const dir = pos.clone().normalize();
      const labelPos = pos.clone().add(dir.multiplyScalar(LEADER_OFFSET));

      return {
        id,
        name: reg?.name ?? id,
        color: reg?.color ?? "#00e5ff",
        intensity: activity.intensity,
        pos: [center[0], center[1], center[2]] as [number, number, number],
        labelPos: [labelPos.x, labelPos.y, labelPos.z] as [number, number, number],
      };
    });
  }, [regionActivity]);

  if (topRegions.length === 0) return null;

  return (
    <group>
      {topRegions.map((region) => (
        <group key={region.id}>
          <Line
            points={[region.pos, region.labelPos]}
            color={region.color}
            lineWidth={0.5}
            transparent
            opacity={Math.min(region.intensity * 0.6, 0.4)}
          />
          <Html
            position={region.labelPos}
            center
            distanceFactor={25}
            style={{ pointerEvents: "none" }}
          >
            <div
              className="whitespace-nowrap select-none"
              style={{
                padding: "2px 6px",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                border: `1px solid ${region.color}30`,
                fontSize: 9,
                fontFamily: "monospace",
                color: region.color,
                opacity: Math.min(region.intensity, 0.85),
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ color: "rgba(0,229,255,0.3)", marginRight: 3 }}>&gt;</span>
              {region.name}
              <span
                style={{
                  marginLeft: 6,
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 8,
                }}
              >
                {(region.intensity * 100).toFixed(0)}%
              </span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
