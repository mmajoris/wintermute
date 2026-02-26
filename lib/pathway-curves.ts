import * as THREE from "three";
import {
  NEUROTRANSMITTER_PATHWAYS,
  CORTICAL_FIBER_TRACTS,
  REGION_CENTERS,
} from "./collection-mapping";

export interface PathwayCurve {
  key: string;
  pathway: string;
  source: string;
  target: string;
  color: THREE.Color;
  curve: THREE.CatmullRomCurve3;
}

let cachedCurves: PathwayCurve[] | null = null;

// Cortical surface areas live on the outer cortex — curves between them
// should arc outward so sparks hug the brain surface, not cut through air.
const CORTICAL_SURFACE_REGIONS = new Set([
  "prefrontal-cortex-L", "prefrontal-cortex-R",
  "broca-area-L", "broca-area-R",
  "motor-cortex-L", "motor-cortex-R",
  "somatosensory-cortex-L", "somatosensory-cortex-R",
  "parietal-cortex-L", "parietal-cortex-R",
  "angular-gyrus-L", "angular-gyrus-R",
  "temporal-cortex-L", "temporal-cortex-R",
  "wernicke-area-L", "wernicke-area-R",
  "occipital-cortex-L", "occipital-cortex-R",
  "anterior-cingulate-L", "anterior-cingulate-R",
  "insular-cortex-L", "insular-cortex-R",
  "orbitofrontal-cortex-L", "orbitofrontal-cortex-R",
]);

const BRAIN_CENTER = new THREE.Vector3(0, 9, 0);

// Approximate brain as an ellipsoid for clamping control points inside.
// Semi-axes: x=±6.5, y=3..16 (radius ~7 from center at y=9), z=±6.5
const BRAIN_SEMI_X = 6.5;
const BRAIN_SEMI_Y = 7.0;
const BRAIN_SEMI_Z = 6.5;

function clampToBrainInterior(point: THREE.Vector3): void {
  const dx = (point.x - BRAIN_CENTER.x) / BRAIN_SEMI_X;
  const dy = (point.y - BRAIN_CENTER.y) / BRAIN_SEMI_Y;
  const dz = (point.z - BRAIN_CENTER.z) / BRAIN_SEMI_Z;
  const r2 = dx * dx + dy * dy + dz * dz;
  if (r2 > 0.85) {
    // Pull inside to ~92% of the surface (white matter depth)
    const scale = Math.sqrt(0.85 / r2);
    point.x = BRAIN_CENTER.x + (point.x - BRAIN_CENTER.x) * scale;
    point.y = BRAIN_CENTER.y + (point.y - BRAIN_CENTER.y) * scale;
    point.z = BRAIN_CENTER.z + (point.z - BRAIN_CENTER.z) * scale;
  }
}

function isCorticalSurface(region: string): boolean {
  return CORTICAL_SURFACE_REGIONS.has(region);
}

function buildCurveForPair(
  src: THREE.Vector3,
  tgt: THREE.Vector3,
  sourceId: string,
  targetId: string,
  isCallosal: boolean
): THREE.CatmullRomCurve3 {
  const bothCortical = isCorticalSurface(sourceId) && isCorticalSurface(targetId);
  const eitherCortical = isCorticalSurface(sourceId) || isCorticalSurface(targetId);

  if (isCallosal) {
    // Cross-hemispheric: route through the corpus callosum body (x=0, y=10)
    // then fan out to the target cortical area
    const callosumEntry = new THREE.Vector3(
      src.x * 0.3, // pull toward midline
      Math.max(src.y, tgt.y) * 0.95,
      (src.z + tgt.z) * 0.5
    );
    const callosumExit = new THREE.Vector3(
      tgt.x * 0.3,
      Math.max(src.y, tgt.y) * 0.95,
      (src.z + tgt.z) * 0.5
    );
    clampToBrainInterior(callosumEntry);
    clampToBrainInterior(callosumExit);
    return new THREE.CatmullRomCurve3(
      [src, callosumEntry, callosumExit, tgt],
      false, "catmullrom", 0.5
    );
  }

  if (bothCortical) {
    // Both on cortex: route through white matter just beneath the surface.
    // Pull midpoints ~15-20% inward from the straight line toward brain center.
    const mid = new THREE.Vector3().lerpVectors(src, tgt, 0.5);
    const inward = new THREE.Vector3().subVectors(BRAIN_CENTER, mid).normalize();
    const dist = src.distanceTo(tgt);
    mid.addScaledVector(inward, dist * 0.12);
    clampToBrainInterior(mid);

    if (dist > 6) {
      const q1 = new THREE.Vector3().lerpVectors(src, tgt, 0.3);
      const in1 = new THREE.Vector3().subVectors(BRAIN_CENTER, q1).normalize();
      q1.addScaledVector(in1, dist * 0.08);
      clampToBrainInterior(q1);

      const q3 = new THREE.Vector3().lerpVectors(src, tgt, 0.7);
      const in3 = new THREE.Vector3().subVectors(BRAIN_CENTER, q3).normalize();
      q3.addScaledVector(in3, dist * 0.08);
      clampToBrainInterior(q3);

      return new THREE.CatmullRomCurve3(
        [src, q1, mid, q3, tgt],
        false, "catmullrom", 0.5
      );
    }

    return new THREE.CatmullRomCurve3([src, mid, tgt], false, "catmullrom", 0.5);
  }

  if (eitherCortical) {
    // One end is cortical, one is subcortical (e.g. thalamocortical radiation):
    // fairly direct path, slight inward pull to stay inside the volume
    const mid = new THREE.Vector3().lerpVectors(src, tgt, 0.5);
    const inward = new THREE.Vector3().subVectors(BRAIN_CENTER, mid).normalize();
    mid.addScaledVector(inward, 0.5);
    clampToBrainInterior(mid);
    return new THREE.CatmullRomCurve3([src, mid, tgt], false, "catmullrom", 0.5);
  }

  // Default: subcortical-to-subcortical, gentle arc
  const mid = new THREE.Vector3().lerpVectors(src, tgt, 0.5);
  mid.y += 1.0;
  clampToBrainInterior(mid);
  return new THREE.CatmullRomCurve3([src, mid, tgt], false, "catmullrom", 0.5);
}

export function buildPathwayCurves(): PathwayCurve[] {
  if (cachedCurves) return cachedCurves;

  const curves: PathwayCurve[] = [];
  const allPathways = {
    ...NEUROTRANSMITTER_PATHWAYS,
    ...CORTICAL_FIBER_TRACTS,
  };

  for (const [name, pathway] of Object.entries(allPathways)) {
    const sourceCenter = REGION_CENTERS[pathway.source];
    if (!sourceCenter) continue;

    const isCallosal = name.startsWith("callosal-");

    for (const target of pathway.targets) {
      const targetCenter = REGION_CENTERS[target];
      if (!targetCenter) continue;

      const src = new THREE.Vector3(...sourceCenter);
      const tgt = new THREE.Vector3(...targetCenter);

      const curve = buildCurveForPair(src, tgt, pathway.source, target, isCallosal);

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
