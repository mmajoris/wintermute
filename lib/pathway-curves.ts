import * as THREE from "three";
import { NEUROTRANSMITTER_PATHWAYS, REGION_CENTERS } from "./collection-mapping";

export interface PathwayCurve {
  key: string;
  pathway: string;
  source: string;
  target: string;
  color: THREE.Color;
  curve: THREE.CatmullRomCurve3;
}

let cachedCurves: PathwayCurve[] | null = null;

export function buildPathwayCurves(): PathwayCurve[] {
  if (cachedCurves) return cachedCurves;

  const curves: PathwayCurve[] = [];

  for (const [name, pathway] of Object.entries(NEUROTRANSMITTER_PATHWAYS)) {
    const sourceCenter = REGION_CENTERS[pathway.source];
    if (!sourceCenter) continue;

    for (const target of pathway.targets) {
      const targetCenter = REGION_CENTERS[target];
      if (!targetCenter) continue;

      const src = new THREE.Vector3(...sourceCenter);
      const tgt = new THREE.Vector3(...targetCenter);
      const mid = new THREE.Vector3().lerpVectors(src, tgt, 0.5);
      mid.y += 1.5;
      mid.z += 0.5;

      const curve = new THREE.CatmullRomCurve3(
        [src, mid, tgt],
        false,
        "catmullrom",
        0.5
      );

      curves.push({
        key: `${name}-${target}`,
        pathway: name,
        source: pathway.source,
        target,
        color: new THREE.Color(pathway.color),
        curve,
      });
    }
  }

  cachedCurves = curves;
  return curves;
}

export function getCurvesForPathway(pathwayName: string): PathwayCurve[] {
  return buildPathwayCurves().filter((c) => c.pathway === pathwayName);
}
