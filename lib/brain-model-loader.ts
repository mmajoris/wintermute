import * as THREE from "three";

interface BrainModelJSON {
  model: {
    vertices: number[];
    normals: number[];
    faces: number[];
    uvs: number[][];
    name: string;
  };
}

/**
 * Parses a brainfacts.org JSON brain model into a Three.js BufferGeometry.
 * The format uses a flag-based face array:
 *   flag & 1  = isQuad (4 verts) vs triangle (3 verts)
 *   flag & 8  = hasFaceVertexUv
 *   flag & 32 = hasFaceVertexNormal
 */
export function parseBrainModel(json: BrainModelJSON): THREE.BufferGeometry {
  const { vertices, normals, faces } = json.model;

  const srcPositions = vertices;
  const srcNormals = normals;

  const outPositions: number[] = [];
  const outNormals: number[] = [];

  let i = 0;
  while (i < faces.length) {
    const flag = faces[i++];
    const isQuad = !!(flag & 1);
    const hasMaterial = !!(flag & 2);
    const hasFaceVertexUv = !!(flag & 8);
    const hasFaceVertexNormal = !!(flag & 32);
    const hasFaceVertexColor = !!(flag & 128);

    const nVerts = isQuad ? 4 : 3;
    const vertIndices: number[] = [];
    for (let v = 0; v < nVerts; v++) vertIndices.push(faces[i++]);

    if (hasMaterial) i++;
    const normalIndices: number[] = [];

    if (hasFaceVertexUv) i += nVerts;

    if (hasFaceVertexNormal) {
      for (let v = 0; v < nVerts; v++) normalIndices.push(faces[i++]);
    }

    if (hasFaceVertexColor) i += nVerts;

    // Emit triangle(s)
    const triSets = isQuad
      ? [[0, 1, 2], [0, 2, 3]]
      : [[0, 1, 2]];

    for (const tri of triSets) {
      for (const t of tri) {
        const vi = vertIndices[t];
        outPositions.push(
          srcPositions[vi * 3],
          srcPositions[vi * 3 + 1],
          srcPositions[vi * 3 + 2]
        );

        if (normalIndices.length > 0) {
          const ni = normalIndices[t];
          outNormals.push(
            srcNormals[ni * 3],
            srcNormals[ni * 3 + 1],
            srcNormals[ni * 3 + 2]
          );
        } else {
          outNormals.push(
            srcNormals[vi * 3],
            srcNormals[vi * 3 + 1],
            srcNormals[vi * 3 + 2]
          );
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(outPositions, 3)
  );
  geometry.setAttribute(
    "normal",
    new THREE.Float32BufferAttribute(outNormals, 3)
  );

  return geometry;
}

export interface BrainModelEntry {
  id: string;
  name: string;
  file: string;
  parent: string | null;
  color: string;
  opacity: number;
  category: string;
}

export const BRAIN_MODEL_REGISTRY: BrainModelEntry[] = [
  // Cerebral hemispheres
  { id: "left-hemisphere", name: "Left Hemisphere", file: "Brain-cerebral_hemisphere-left.json", parent: null, color: "#6366f1", opacity: 0.3, category: "cerebrum" },
  { id: "right-hemisphere", name: "Right Hemisphere", file: "Brain-cerebral_hemisphere-right.json", parent: null, color: "#818cf8", opacity: 0.3, category: "cerebrum" },

  // Cerebellum
  { id: "cerebellum", name: "Cerebellum", file: "Brain-cerebellum.json", parent: null, color: "#8b5cf6", opacity: 0.55, category: "cerebellum" },

  // Brainstem
  { id: "midbrain", name: "Midbrain", file: "Brain-brain_stem-midbrain.json", parent: null, color: "#ec4899", opacity: 0.6, category: "brainstem" },
  { id: "pons", name: "Pons", file: "Brain-brain_stem-pons.json", parent: null, color: "#f472b6", opacity: 0.6, category: "brainstem" },
  { id: "medulla", name: "Medulla Oblongata", file: "Brain-brain_stem-medulla_oblongata.json", parent: null, color: "#db2777", opacity: 0.6, category: "brainstem" },

  // Limbic system
  { id: "hippocampus", name: "Hippocampus", file: "Brain-limbic_system-hippocampus-hippocampus.json", parent: null, color: "#f97316", opacity: 0.75, category: "limbic" },
  { id: "amygdala", name: "Amygdala", file: "Brain-limbic_system-amygdala.json", parent: null, color: "#ef4444", opacity: 0.75, category: "limbic" },
  { id: "hypothalamus", name: "Hypothalamus", file: "Brain-limbic_system-hypothalamus.json", parent: null, color: "#f59e0b", opacity: 0.75, category: "limbic" },
  { id: "entorhinal-cortex", name: "Entorhinal Cortex", file: "Brain-limbic_system-entorhinal_cortex.json", parent: null, color: "#fb923c", opacity: 0.7, category: "limbic" },
  { id: "dentate-gyrus", name: "Dentate Gyrus", file: "Brain-limbic_system-hippocampus-dentate_gyrus.json", parent: null, color: "#fdba74", opacity: 0.7, category: "limbic" },
  { id: "subiculum", name: "Subiculum", file: "Brain-limbic_system-hippocampus-subiculum.json", parent: null, color: "#fed7aa", opacity: 0.65, category: "limbic" },

  // Thalamus & related
  { id: "thalamus", name: "Thalamus", file: "Brain-thalamus.json", parent: null, color: "#f97316", opacity: 0.65, category: "limbic" },
  { id: "corpus-callosum", name: "Corpus Callosum", file: "Brain-corpus_callosum.json", parent: null, color: "#e2e8f0", opacity: 0.4, category: "cerebrum" },
  { id: "ventricles", name: "Ventricles", file: "Brain-ventricles.json", parent: null, color: "#38bdf8", opacity: 0.3, category: "organ" },
  { id: "pituitary", name: "Pituitary Gland", file: "Brain-pituitary_gland.json", parent: null, color: "#fbbf24", opacity: 0.7, category: "endocrine" },
  { id: "olfactory-bulb", name: "Olfactory Bulb", file: "Brain-olfactory_bulb.json", parent: null, color: "#a3e635", opacity: 0.65, category: "peripheral" },
  { id: "auditory-cortex", name: "Primary Auditory Cortex", file: "Brain-primary_auditory_cortex.json", parent: null, color: "#2dd4bf", opacity: 0.65, category: "cerebrum" },

  // Basal ganglia
  { id: "caudate-nucleus", name: "Caudate Nucleus", file: "Brain-basal_ganglia-caudate_nucleus.json", parent: null, color: "#fb923c", opacity: 0.7, category: "limbic" },
  { id: "putamen", name: "Putamen", file: "Brain-basal_ganglia-putamen.json", parent: null, color: "#f97316", opacity: 0.65, category: "limbic" },
  { id: "globus-pallidus", name: "Globus Pallidus", file: "Brain-basal_ganglia-globus_pallidus.json", parent: null, color: "#ea580c", opacity: 0.65, category: "limbic" },
  { id: "nucleus-accumbens", name: "Nucleus Accumbens", file: "Brain-basal_ganglia-nucleus_accumbens.json", parent: null, color: "#c2410c", opacity: 0.7, category: "limbic" },
  { id: "substantia-nigra", name: "Substantia Nigra", file: "Brain-basal_ganglia-substantia_nigra.json", parent: null, color: "#9a3412", opacity: 0.7, category: "brainstem" },
  { id: "subthalamic-nucleus", name: "Subthalamic Nucleus", file: "Brain-basal_ganglia-subthalamic_nucleus.json", parent: null, color: "#7c2d12", opacity: 0.7, category: "limbic" },

  // Cranial nerves
  { id: "cn-i", name: "CN I — Olfactory", file: "Brain-cranial_nerves-cranial_nerve_I_olfactory.json", parent: null, color: "#a3e635", opacity: 0.6, category: "peripheral" },
  { id: "cn-ii", name: "CN II — Optic", file: "Brain-cranial_nerves-cranial_nerve_II_optic.json", parent: null, color: "#60a5fa", opacity: 0.6, category: "peripheral" },
  { id: "cn-iii", name: "CN III — Oculomotor", file: "Brain-cranial_nerves-cranial_nerve_III_oculomotor.json", parent: null, color: "#f97316", opacity: 0.55, category: "peripheral" },
  { id: "cn-iv", name: "CN IV — Trochlear", file: "Brain-cranial_nerves-cranial_nerve_IV_trochlear.json", parent: null, color: "#f97316", opacity: 0.55, category: "peripheral" },
  { id: "cn-v", name: "CN V — Trigeminal", file: "Brain-cranial_nerves-cranial_nerve_V_trigeminal.json", parent: null, color: "#e879f9", opacity: 0.6, category: "peripheral" },
  { id: "cn-vi", name: "CN VI — Abducens", file: "Brain-cranial_nerves-cranial_nerve_VI_abducens.json", parent: null, color: "#f97316", opacity: 0.55, category: "peripheral" },
  { id: "cn-vii", name: "CN VII — Facial", file: "Brain-cranial_nerves-cranial_nerve_VII_facial.json", parent: null, color: "#fbbf24", opacity: 0.6, category: "peripheral" },
  { id: "cn-viii", name: "CN VIII — Vestibulocochlear", file: "Brain-cranial_nerves-cranial_nerve_VIII_vestibulocochlear.json", parent: null, color: "#2dd4bf", opacity: 0.6, category: "peripheral" },
  { id: "cn-ix", name: "CN IX — Glossopharyngeal", file: "Brain-cranial_nerves-cranial_nerve_IX_glossopharyngeal.json", parent: null, color: "#fb923c", opacity: 0.55, category: "peripheral" },
  { id: "cn-x", name: "CN X — Vagus", file: "Brain-cranial_nerves-cranial_nerve_X_vagus.json", parent: null, color: "#22c55e", opacity: 0.65, category: "peripheral" },
  { id: "cn-xi", name: "CN XI — Accessory", file: "Brain-cranial_nerves-cranial_nerve_XI_accessory.json", parent: null, color: "#f87171", opacity: 0.55, category: "peripheral" },
  { id: "cn-xii", name: "CN XII — Hypoglossal", file: "Brain-cranial_nerves-cranial_nerve_XII_hypoglossal.json", parent: null, color: "#c084fc", opacity: 0.55, category: "peripheral" },
];

// Which models to show in which layer groups
export const LAYER_GROUPS = {
  hemispheres: ["left-hemisphere", "right-hemisphere", "corpus-callosum", "auditory-cortex", "olfactory-bulb"],
  cerebellum: ["cerebellum"],
  brainstem: ["midbrain", "pons", "medulla", "substantia-nigra"],
  limbic: ["hippocampus", "amygdala", "hypothalamus", "entorhinal-cortex", "dentate-gyrus", "subiculum", "thalamus"],
  deepStructures: ["ventricles", "pituitary"],
  basalGanglia: ["caudate-nucleus", "putamen", "globus-pallidus", "nucleus-accumbens", "subthalamic-nucleus"],
  cranialNerves: ["cn-i", "cn-ii", "cn-iii", "cn-iv", "cn-v", "cn-vi", "cn-vii", "cn-viii", "cn-ix", "cn-x", "cn-xi", "cn-xii"],
};

// Default visibility — show hemispheres transparent + key structures
export const DEFAULT_VISIBLE = new Set([
  "left-hemisphere", "right-hemisphere",
  "cerebellum",
  "midbrain", "pons", "medulla",
  "thalamus", "corpus-callosum",
]);
