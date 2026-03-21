/**
 * Procedural 3D brain anatomy for medical imaging slice generation.
 *
 * Uses SDF-based cortical surface with noise-driven sulcal patterns,
 * realistic interhemispheric fissure, anatomical ventricle shapes,
 * and proper basal ganglia/deep structure modeling.
 *
 * Coordinate system (matches brain model viewer):
 *   Y = superior-inferior (brain from ~3 to ~19)
 *   X = left-right (±7)
 *   Z = posterior-anterior (posterior ~ -8, anterior ~ +6)
 *   Brain center approximately (0, 11, -0.5)
 */

export type TissueType =
  | "background"
  | "skull"
  | "scalp"
  | "csf"
  | "cortical_gray"
  | "white_matter"
  | "deep_gray"
  | "brainstem"
  | "cerebellum_gray"
  | "cerebellum_white";

export interface BrainRegion3D {
  id: string;
  center: [number, number, number];
  radii: [number, number, number];
  tissue: TissueType;
  priority: number;
  storeId?: string;
}

// Kept for PET/fMRI region-to-store mapping
export const BRAIN_REGIONS_3D: BrainRegion3D[] = [
  { id: "thalamus-L", center: [-1.2, 11, 0], radii: [1.3, 1.1, 1.4], tissue: "deep_gray", priority: 6, storeId: "thalamus" },
  { id: "thalamus-R", center: [1.2, 11, 0], radii: [1.3, 1.1, 1.4], tissue: "deep_gray", priority: 6, storeId: "thalamus" },
  { id: "caudate-L", center: [-1.5, 13, 1.2], radii: [0.6, 2, 0.7], tissue: "deep_gray", priority: 7, storeId: "caudate-nucleus" },
  { id: "caudate-R", center: [1.5, 13, 1.2], radii: [0.6, 2, 0.7], tissue: "deep_gray", priority: 7, storeId: "caudate-nucleus" },
  { id: "putamen-L", center: [-2.8, 11, 0.8], radii: [0.6, 1.4, 1.8], tissue: "deep_gray", priority: 7, storeId: "putamen" },
  { id: "putamen-R", center: [2.8, 11, 0.8], radii: [0.6, 1.4, 1.8], tissue: "deep_gray", priority: 7, storeId: "putamen" },
  { id: "globus-pallidus-L", center: [-2.2, 10.5, 0.5], radii: [0.4, 0.8, 1], tissue: "deep_gray", priority: 7, storeId: "globus-pallidus" },
  { id: "globus-pallidus-R", center: [2.2, 10.5, 0.5], radii: [0.4, 0.8, 1], tissue: "deep_gray", priority: 7, storeId: "globus-pallidus" },
  { id: "nac-L", center: [-1.5, 9.5, 2], radii: [0.4, 0.4, 0.4], tissue: "deep_gray", priority: 7, storeId: "nucleus-accumbens" },
  { id: "nac-R", center: [1.5, 9.5, 2], radii: [0.4, 0.4, 0.4], tissue: "deep_gray", priority: 7, storeId: "nucleus-accumbens" },
  { id: "hippo-L", center: [-2.5, 9, -1.5], radii: [0.5, 0.5, 1.8], tissue: "deep_gray", priority: 7, storeId: "hippocampus" },
  { id: "hippo-R", center: [2.5, 9, -1.5], radii: [0.5, 0.5, 1.8], tissue: "deep_gray", priority: 7, storeId: "hippocampus" },
  { id: "amygdala-L", center: [-3, 8.5, 1.5], radii: [0.6, 0.5, 0.5], tissue: "deep_gray", priority: 7, storeId: "amygdala" },
  { id: "amygdala-R", center: [3, 8.5, 1.5], radii: [0.6, 0.5, 0.5], tissue: "deep_gray", priority: 7, storeId: "amygdala" },
  { id: "hypothalamus", center: [0, 9, 1.5], radii: [0.8, 0.6, 0.6], tissue: "deep_gray", priority: 7, storeId: "hypothalamus" },
  { id: "midbrain", center: [0, 8, -2], radii: [1.2, 0.9, 1.2], tissue: "brainstem", priority: 5, storeId: "midbrain" },
  { id: "pons", center: [0, 6.5, -1.8], radii: [1.5, 1, 1.2], tissue: "brainstem", priority: 5, storeId: "pons" },
  { id: "medulla", center: [0, 4.5, -2.2], radii: [0.8, 1.2, 0.8], tissue: "brainstem", priority: 5, storeId: "medulla" },
];

// ── Noise ────────────────────────────────────────────────────────────────

function hash(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

export function smoothNoise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy), b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

export function fbmNoise(x: number, y: number, octaves = 4): number {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * smoothNoise(x * freq, y * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return val;
}

// ── Brain geometry primitives ───────────────────────────────────────────

function ellipsoidDist(
  px: number, py: number, pz: number,
  cx: number, cy: number, cz: number,
  rx: number, ry: number, rz: number,
): number {
  const dx = (px - cx) / rx;
  const dy = (py - cy) / ry;
  const dz = (pz - cz) / rz;
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Returns the brain's base radius at a given angle and normalized height.
 * Angle is measured in the X-Z plane from +Z (anterior).
 * yNorm is 0 at the bottom of the brain, 1 at the top.
 */
function brainBaseRadius(angle: number, yNorm: number): number {
  // Brain vanishes at very top and bottom
  const verticalProfile = Math.pow(Math.sin(Math.max(0.01, Math.min(0.99, yNorm)) * Math.PI), 0.7);

  // Asymmetric front/back: narrower frontally, wider occipitally
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  const rLat = 6.8; // lateral radius
  const rAnt = 5.2 + yNorm * 0.5; // anterior — slightly more at top
  const rPost = 6.0; // posterior
  const rAP = cosA > 0 ? rAnt : rPost;

  // Elliptical radius at this angle
  const r = (rLat * rAP) / Math.sqrt(rLat * rLat * cosA * cosA + rAP * rAP * sinA * sinA);

  // Temporal lobe bulge at lower heights
  if (yNorm < 0.45 && yNorm > 0.2) {
    const temporalAngle = Math.abs(angle) - Math.PI * 0.45;
    if (Math.abs(temporalAngle) < 0.6) {
      const bulge = (1 - Math.abs(temporalAngle) / 0.6) * 0.8 * (1 - (yNorm - 0.2) / 0.25);
      return (r + bulge) * verticalProfile;
    }
  }

  return r * verticalProfile;
}

/**
 * Sulcal pattern: returns the depth of cortical invagination at this surface point.
 * Creates realistic sulci at multiple scales.
 */
function sulcalDepth(angle: number, y: number): number {
  // Primary sulci — large folds, ~6-8 per hemisphere
  const p1 = smoothNoise(angle * 3.5 + 0.3, y * 0.4 + 2.1);
  const p2 = smoothNoise(angle * 3.5 + 17.3, y * 0.45 + 8.7);
  const primary = Math.max(p1, p2) * 1.1;

  // Secondary sulci — finer
  const s1 = smoothNoise(angle * 7.5 + 5.2, y * 0.7 + 13.4);
  const secondary = s1 * 0.5;

  // Tertiary sulci — finest
  const t1 = smoothNoise(angle * 15 + 11.1, y * 1.2 + 27.3);
  const tertiary = t1 * 0.2;

  // Sylvian fissure — deep lateral fissure at ~±90 degrees
  let sylvian = 0;
  const latAngle = Math.abs(angle) - Math.PI * 0.5;
  if (Math.abs(latAngle) < 0.25 && y > 8 && y < 14) {
    sylvian = (1 - Math.abs(latAngle) / 0.25) * 1.8 * Math.sin(((y - 8) / 6) * Math.PI);
  }

  return Math.max(0, primary + secondary + tertiary + sylvian - 0.3);
}

/**
 * Gray matter thickness varies across the cortex.
 * Thicker on gyral crowns, thinner in sulcal depths.
 */
function grayMatterThickness(sulcDepth: number): number {
  return 0.35 + Math.max(0, 0.5 - sulcDepth) * 0.25;
}

// ── Deep structure checks ───────────────────────────────────────────────

function isInLateralVentricle(x: number, y: number, z: number): boolean {
  const ax = Math.abs(x);
  // Frontal horn (y: 13-16, z: 0.5-3, lateral: 0.3-1.0)
  if (y > 12.5 && y < 16 && z > 0 && z < 3) {
    const d = ellipsoidDist(ax, y, z, 0.8, 14, 1.5, 0.6, 1.8, 1.5);
    if (d < 1) return true;
  }
  // Body (y: 13-16, z: -2 to 1, lateral: 0.5-1.5)
  if (y > 12.5 && y < 16 && z > -2.5 && z < 1.5) {
    const d = ellipsoidDist(ax, y, z, 1.0, 14.5, -0.5, 0.5, 1.5, 2.2);
    if (d < 1) return true;
  }
  // Atrium / trigone (y: 11-14, z: -3 to -1)
  if (y > 10.5 && y < 14 && z < -0.5 && z > -4) {
    const d = ellipsoidDist(ax, y, z, 1.2, 12.5, -2, 0.7, 1.2, 1.5);
    if (d < 1) return true;
  }
  // Occipital horn (y: 11-14, z: -5 to -2)
  if (y > 10.5 && y < 14.5 && z < -2 && z > -6) {
    const d = ellipsoidDist(ax, y, z, 0.8, 12.5, -4, 0.4, 1.2, 2);
    if (d < 1) return true;
  }
  // Temporal horn (y: 8-11, z: -1 to 2, more lateral)
  if (y > 7.5 && y < 11.5 && z > -2 && z < 2.5) {
    const d = ellipsoidDist(ax, y, z, 2.5, 9.5, 0.5, 0.5, 1, 1.5);
    if (d < 1) return true;
  }
  return false;
}

function isInThirdVentricle(x: number, y: number, z: number): boolean {
  return Math.abs(x) < 0.2 && y > 9.5 && y < 12.5 && z > -1 && z < 1.5;
}

function isInFourthVentricle(x: number, y: number, z: number): boolean {
  return ellipsoidDist(x, y, z, 0, 6.5, -3, 0.5, 0.7, 0.5) < 1;
}

function isInCorpusCallosum(x: number, y: number, z: number): boolean {
  if (Math.abs(x) > 1) return false;
  // Body — a horizontal band connecting the hemispheres
  if (y > 14.5 && y < 15.5 && z > -3.5 && z < 2.5) {
    const thickness = 0.5 - Math.abs(x) * 0.3;
    return y > 15 - thickness && y < 15 + thickness;
  }
  // Genu (anterior curve)
  if (z > 2 && z < 4 && y > 13 && y < 15.5) {
    const d = ellipsoidDist(x, y, z, 0, 14.5, 3, 0.6, 1.2, 1);
    return d < 1;
  }
  // Splenium (posterior curve)
  if (z > -5 && z < -3 && y > 13 && y < 15.5) {
    const d = ellipsoidDist(x, y, z, 0, 14.2, -4, 0.6, 1, 1);
    return d < 1;
  }
  return false;
}

type DeepResult = { tissue: TissueType; regionId: string | null } | null;

function checkDeepStructures(x: number, y: number, z: number): DeepResult {
  // Ventricles (highest priority in deep structures)
  if (isInLateralVentricle(x, y, z)) return { tissue: "csf", regionId: null };
  if (isInThirdVentricle(x, y, z)) return { tissue: "csf", regionId: null };
  if (isInFourthVentricle(x, y, z)) return { tissue: "csf", regionId: null };

  // Corpus callosum
  if (isInCorpusCallosum(x, y, z)) return { tissue: "white_matter", regionId: null };

  const ax = Math.abs(x);
  const side = x < 0 ? "L" : "R";

  // Thalamus
  if (ellipsoidDist(ax, y, z, 1.2, 11, 0, 1.4, 1.2, 1.5) < 1)
    return { tissue: "deep_gray", regionId: "thalamus" };

  // Caudate nucleus (head — adjacent to frontal horn)
  if (ellipsoidDist(ax, y, z, 1.3, 12.5, 1.5, 0.6, 1.8, 0.8) < 1)
    return { tissue: "deep_gray", regionId: "caudate-nucleus" };

  // Putamen
  if (ellipsoidDist(ax, y, z, 2.8, 11, 0.5, 0.7, 1.5, 1.8) < 1)
    return { tissue: "deep_gray", regionId: "putamen" };

  // Globus pallidus (medial to putamen)
  if (ellipsoidDist(ax, y, z, 2.1, 10.8, 0.3, 0.45, 1, 1.2) < 1)
    return { tissue: "deep_gray", regionId: "globus-pallidus" };

  // Internal capsule (V-shaped white matter between caudate/thalamus and lentiform nucleus)
  if (ax > 1.4 && ax < 2.2 && y > 9.5 && y < 13.5 && z > -1.5 && z < 2.5) {
    const icAngle = (ax - 1.4) / 0.8;
    const expectedZ = 0.5 + icAngle * 1.5;
    if (Math.abs(z - expectedZ) < 0.4) return { tissue: "white_matter", regionId: null };
  }

  // Hippocampus
  if (ellipsoidDist(ax, y, z, 2.5, 9, -1.5, 0.6, 0.5, 2) < 1)
    return { tissue: "deep_gray", regionId: "hippocampus" };

  // Amygdala
  if (ellipsoidDist(ax, y, z, 3, 8.5, 1.5, 0.6, 0.6, 0.6) < 1)
    return { tissue: "deep_gray", regionId: "amygdala" };

  // Hypothalamus
  if (ellipsoidDist(x, y, z, 0, 9.5, 1.5, 0.8, 0.7, 0.7) < 1)
    return { tissue: "deep_gray", regionId: "hypothalamus" };

  // Brainstem
  if (ellipsoidDist(x, y, z, 0, 8, -2, 1.2, 1, 1.2) < 1)
    return { tissue: "brainstem", regionId: "midbrain" };
  if (ellipsoidDist(x, y, z, 0, 6.5, -1.8, 1.5, 1, 1.3) < 1)
    return { tissue: "brainstem", regionId: "pons" };
  if (ellipsoidDist(x, y, z, 0, 4.5, -2.2, 0.8, 1.2, 0.8) < 1)
    return { tissue: "brainstem", regionId: "medulla" };

  // Cerebellum
  if (ax > 0.3 && y > 4 && y < 9 && z < -2) {
    const cd = ellipsoidDist(ax, y, z, 2.8, 6.5, -4.5, 3.2, 2.5, 3);
    if (cd < 1) {
      const innerD = ellipsoidDist(ax, y, z, 2.5, 6.5, -4.5, 2, 1.5, 2);
      if (innerD < 1) return { tissue: "cerebellum_white", regionId: null };
      // Cerebellar folia — fine folding
      const folia = smoothNoise(ax * 6 + z * 4, y * 5) * 0.5 + smoothNoise(ax * 12, y * 10 + z * 3) * 0.25;
      return { tissue: folia > 0.35 ? "cerebellum_gray" : "cerebellum_white", regionId: null };
    }
  }

  return null;
}

// ── Main classifier ─────────────────────────────────────────────────────

export interface ClassifiedPoint {
  tissue: TissueType;
  region: BrainRegion3D | null;
  edgeFactor: number;
}

export function classifyPoint(x: number, y: number, z: number): ClassifiedPoint {
  const brainCenterZ = -0.5;
  const dx = x;
  const dz = z - brainCenterZ;
  const dist = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  const yNorm = Math.max(0, Math.min(1, (y - 3) / 16));
  const baseR = brainBaseRadius(angle, yNorm);

  // Beyond any brain structure
  if (dist > baseR + 2 || baseR < 0.3) {
    return { tissue: "background", region: null, edgeFactor: 1 };
  }

  // Scalp (outer soft tissue)
  const skullOuter = baseR + 1.2;
  const skullInner = baseR + 0.4;
  if (dist > skullOuter) return { tissue: "background", region: null, edgeFactor: 1 };
  if (dist > skullOuter - 0.3) return { tissue: "scalp", region: null, edgeFactor: (dist - skullInner) / (skullOuter - skullInner) };

  // Skull (thin dense bone shell)
  if (dist > skullInner) return { tissue: "skull", region: null, edgeFactor: (dist - skullInner) / (skullOuter - skullInner) };

  // Subarachnoid CSF layer
  const csfOuter = baseR + 0.15;
  if (dist > csfOuter) return { tissue: "csf", region: null, edgeFactor: 0.9 };

  // ── Interhemispheric fissure ──
  // Runs front-to-back at x≈0, except where corpus callosum bridges
  if (Math.abs(x) < 0.25 && yNorm > 0.35) {
    // Fissure goes through unless corpus callosum connects hemispheres
    if (!isInCorpusCallosum(x, y, z)) {
      // Fissure depth depends on height — deeper at top, narrows near CC
      const fissureWidth = 0.25 - Math.abs(x);
      if (fissureWidth > 0) {
        return { tissue: "csf", region: null, edgeFactor: 0.5 };
      }
    }
  }

  // ── Cortical surface with sulci ──
  const sd = sulcalDepth(angle, y);
  const pialR = baseR - sd * 0.8; // pial surface (outer edge of gray matter)
  const gmThick = grayMatterThickness(sd);
  const wmSurface = pialR - gmThick; // white matter surface (inner edge of gray matter)

  // If outside the pial surface -> sulcal CSF
  if (dist > pialR) {
    // Still inside the brain envelope but in a sulcus
    return { tissue: "csf", region: null, edgeFactor: 0.7 };
  }

  // Gray matter (between pial surface and WM surface)
  if (dist > wmSurface) {
    const grayFactor = (dist - wmSurface) / gmThick;
    return { tissue: "cortical_gray", region: null, edgeFactor: grayFactor };
  }

  // ── Deep structures (inside white matter) ──
  const deep = checkDeepStructures(x, y, z);
  if (deep) {
    const matchedRegion = BRAIN_REGIONS_3D.find((r) => r.storeId === deep.regionId) ?? null;
    return { tissue: deep.tissue, region: matchedRegion, edgeFactor: 0.3 };
  }

  // ── White matter (default interior) ──
  return { tissue: "white_matter", region: null, edgeFactor: dist / wmSurface };
}

// ── Tissue contrast tables ──────────────────────────────────────────────

export const T1_CONTRAST: Record<TissueType, number> = {
  background: 0,
  scalp: 85,
  skull: 50,
  csf: 18,
  cortical_gray: 120,
  white_matter: 210,
  deep_gray: 130,
  brainstem: 140,
  cerebellum_gray: 115,
  cerebellum_white: 200,
};

export const T2_CONTRAST: Record<TissueType, number> = {
  background: 0,
  scalp: 75,
  skull: 25,
  csf: 245,
  cortical_gray: 160,
  white_matter: 90,
  deep_gray: 145,
  brainstem: 125,
  cerebellum_gray: 155,
  cerebellum_white: 85,
};

export const CT_HU: Record<TissueType, number> = {
  background: -1000,
  scalp: 25,
  skull: 800,
  csf: 5,
  cortical_gray: 37,
  white_matter: 30,
  deep_gray: 35,
  brainstem: 34,
  cerebellum_gray: 36,
  cerebellum_white: 29,
};

// ── Slice geometry ──────────────────────────────────────────────────────

export type SlicePlane = "axial" | "sagittal" | "coronal";

export interface SliceConfig {
  plane: SlicePlane;
  position: number;
}

export function sliceTo3D(
  u: number,
  v: number,
  config: SliceConfig,
): [number, number, number] {
  switch (config.plane) {
    case "axial":
      return [u * 18 - 9, config.position, v * 18 - 9.5];
    case "sagittal":
      return [config.position, v * 20 + 1, u * 18 - 9.5];
    case "coronal":
      return [u * 18 - 9, v * 20 + 1, config.position];
  }
}

export const SLICE_RANGES: Record<SlicePlane, { min: number; max: number; default: number; label: string }> = {
  axial: { min: 2, max: 20, default: 11, label: "Superior ← → Inferior" },
  sagittal: { min: -8, max: 8, default: 0, label: "Left ← → Right" },
  coronal: { min: -9, max: 7, default: -1, label: "Posterior ← → Anterior" },
};

export function getStoreIdsInSlice(
  plane: SlicePlane,
  position: number,
  tolerance = 3,
): string[] {
  const ids: string[] = [];
  for (const region of BRAIN_REGIONS_3D) {
    if (!region.storeId) continue;
    let axisVal: number;
    let axisRadius: number;
    switch (plane) {
      case "axial": axisVal = region.center[1]; axisRadius = region.radii[1]; break;
      case "sagittal": axisVal = region.center[0]; axisRadius = region.radii[0]; break;
      case "coronal": axisVal = region.center[2]; axisRadius = region.radii[2]; break;
    }
    if (Math.abs(axisVal - position) <= axisRadius + tolerance) {
      ids.push(region.storeId);
    }
  }
  return [...new Set(ids)];
}
