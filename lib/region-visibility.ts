/**
 * Maps pathway region IDs (which may be virtual cortical areas) to
 * the actual brain model IDs that are toggled in the layer system.
 *
 * Many pathway sources/targets are virtual regions (e.g. "prefrontal-cortex-L")
 * that don't have their own 3D model but are part of a larger structure
 * (e.g. "left-hemisphere"). This mapping lets us determine visibility.
 */

const REGION_TO_MODEL: Record<string, string> = {
  // Virtual cortical areas → hemisphere models
  "prefrontal-cortex-L": "left-hemisphere",
  "prefrontal-cortex-R": "right-hemisphere",
  "broca-area-L": "left-hemisphere",
  "broca-area-R": "right-hemisphere",
  "motor-cortex-L": "left-hemisphere",
  "motor-cortex-R": "right-hemisphere",
  "somatosensory-cortex-L": "left-hemisphere",
  "somatosensory-cortex-R": "right-hemisphere",
  "parietal-cortex-L": "left-hemisphere",
  "parietal-cortex-R": "right-hemisphere",
  "angular-gyrus-L": "left-hemisphere",
  "angular-gyrus-R": "right-hemisphere",
  "temporal-cortex-L": "left-hemisphere",
  "temporal-cortex-R": "right-hemisphere",
  "wernicke-area-L": "left-hemisphere",
  "wernicke-area-R": "right-hemisphere",
  "occipital-cortex-L": "left-hemisphere",
  "occipital-cortex-R": "right-hemisphere",
  "anterior-cingulate-L": "left-hemisphere",
  "anterior-cingulate-R": "right-hemisphere",
  "insular-cortex-L": "left-hemisphere",
  "insular-cortex-R": "right-hemisphere",
  "orbitofrontal-cortex-L": "left-hemisphere",
  "orbitofrontal-cortex-R": "right-hemisphere",

  // Brainstem nuclei → brainstem models
  "raphe-nuclei": "pons",
  "locus-coeruleus": "pons",
  "basal-forebrain": "left-hemisphere",

  // Direct mappings (region ID = model ID)
  "substantia-nigra": "substantia-nigra",
  "nucleus-accumbens": "nucleus-accumbens",
  "caudate-nucleus": "caudate-nucleus",
  "putamen": "putamen",
  "globus-pallidus": "globus-pallidus",
  "subthalamic-nucleus": "subthalamic-nucleus",
  "thalamus": "thalamus",
  "hypothalamus": "hypothalamus",
  "hippocampus": "hippocampus",
  "amygdala": "amygdala",
  "entorhinal-cortex": "entorhinal-cortex",
  "dentate-gyrus": "dentate-gyrus",
  "subiculum": "subiculum",
  "left-hemisphere": "left-hemisphere",
  "right-hemisphere": "right-hemisphere",
  "cerebellum": "cerebellum",
  "corpus-callosum": "corpus-callosum",
  "midbrain": "midbrain",
  "pons": "pons",
  "medulla": "medulla",
};

/**
 * Given a pathway region ID and a set of visible model IDs,
 * returns true if the region should be visible.
 */
export function getContainingRegion(
  regionId: string,
  visibleModelIds: Set<string>
): boolean {
  const modelId = REGION_TO_MODEL[regionId] ?? regionId;
  return visibleModelIds.has(modelId);
}
