/**
 * Volume Atlas — loads and slices ICBM-152 brain atlas volumes.
 *
 * Binary format: [3×uint16 LE dims][3×float32 LE pixdim][3×4×float32 LE srow]{uint8[] voxels}
 * Volumes are gzip-compressed. Decompressed in the browser via DecompressionStream.
 *
 * Voxel ordering: data[x + y*dimX + z*dimX*dimY] (NIfTI standard, Z-slowest)
 * Affine: MNI_x = srow_x . [i,j,k,1]  (but since srow is identity + offset,
 *         MNI_x = i + offsetX, MNI_y = j + offsetY, MNI_z = k + offsetZ)
 */

export interface AtlasMeta {
  dims: [number, number, number];
  pixdim: [number, number, number];
  srow_x: [number, number, number, number];
  srow_y: [number, number, number, number];
  srow_z: [number, number, number, number];
  volumes: Record<string, { file: string; description: string }>;
}

export interface LoadedVolume {
  data: Uint8Array;
  dimX: number;
  dimY: number;
  dimZ: number;
  pixdim: [number, number, number];
  srow_x: [number, number, number, number];
  srow_y: [number, number, number, number];
  srow_z: [number, number, number, number];
}

export type SlicePlane = "axial" | "sagittal" | "coronal";

const HEADER_SIZE = 6 + 12 + 48; // 3×uint16 + 3×float32 + 3×4×float32 = 66 bytes

let metaCache: AtlasMeta | null = null;
const volumeCache = new Map<string, LoadedVolume>();

export async function loadAtlasMeta(): Promise<AtlasMeta> {
  if (metaCache) return metaCache;
  const res = await fetch("/atlas/atlas.json");
  metaCache = await res.json() as AtlasMeta;
  return metaCache;
}

async function decompressGzip(buffer: ArrayBuffer): Promise<ArrayBuffer> {
  if (typeof DecompressionStream !== "undefined") {
    const ds = new DecompressionStream("gzip");
    const writer = ds.writable.getWriter();
    writer.write(new Uint8Array(buffer));
    writer.close();
    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    let totalLen = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      totalLen += value.byteLength;
    }
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return result.buffer;
  }
  throw new Error("DecompressionStream not available");
}

export async function loadVolume(volumeKey: string): Promise<LoadedVolume> {
  const cached = volumeCache.get(volumeKey);
  if (cached) return cached;

  const meta = await loadAtlasMeta();
  const volInfo = meta.volumes[volumeKey];
  if (!volInfo) throw new Error(`Unknown volume: ${volumeKey}`);

  const res = await fetch(`/atlas/${volInfo.file}`);
  const compressed = await res.arrayBuffer();
  const raw = await decompressGzip(compressed);

  const view = new DataView(raw);
  const dimX = view.getUint16(0, true);
  const dimY = view.getUint16(2, true);
  const dimZ = view.getUint16(4, true);
  const pixdim: [number, number, number] = [
    view.getFloat32(6, true), view.getFloat32(10, true), view.getFloat32(14, true),
  ];
  const srow_x: [number, number, number, number] = [
    view.getFloat32(18, true), view.getFloat32(22, true), view.getFloat32(26, true), view.getFloat32(30, true),
  ];
  const srow_y: [number, number, number, number] = [
    view.getFloat32(34, true), view.getFloat32(38, true), view.getFloat32(42, true), view.getFloat32(46, true),
  ];
  const srow_z: [number, number, number, number] = [
    view.getFloat32(50, true), view.getFloat32(54, true), view.getFloat32(58, true), view.getFloat32(62, true),
  ];

  const data = new Uint8Array(raw, HEADER_SIZE);
  const volume: LoadedVolume = { data, dimX, dimY, dimZ, pixdim, srow_x, srow_y, srow_z };
  volumeCache.set(volumeKey, volume);
  return volume;
}

/**
 * Sample a voxel at integer coordinates. Returns 0 for out-of-bounds.
 */
export function sampleVoxel(vol: LoadedVolume, ix: number, iy: number, iz: number): number {
  if (ix < 0 || ix >= vol.dimX || iy < 0 || iy >= vol.dimY || iz < 0 || iz >= vol.dimZ) return 0;
  return vol.data[ix + iy * vol.dimX + iz * vol.dimX * vol.dimY];
}

/**
 * Extract a 2D slice from a volume. Returns a Uint8Array of width×height pixels.
 */
export function extractSlice(
  vol: LoadedVolume,
  plane: SlicePlane,
  sliceIndex: number,
): { pixels: Uint8Array; width: number; height: number } {
  const { dimX, dimY, dimZ, data } = vol;

  switch (plane) {
    case "axial": {
      const iz = Math.max(0, Math.min(dimZ - 1, Math.round(sliceIndex)));
      const w = dimX, h = dimY;
      const pixels = new Uint8Array(w * h);
      for (let iy = 0; iy < h; iy++) {
        const base = iy * dimX + iz * dimX * dimY;
        for (let ix = 0; ix < w; ix++) {
          pixels[ix + (h - 1 - iy) * w] = data[base + ix];
        }
      }
      return { pixels, width: w, height: h };
    }
    case "sagittal": {
      const ix = Math.max(0, Math.min(dimX - 1, Math.round(sliceIndex)));
      const w = dimY, h = dimZ;
      const pixels = new Uint8Array(w * h);
      for (let iz = 0; iz < h; iz++) {
        for (let iy = 0; iy < w; iy++) {
          pixels[iy + (h - 1 - iz) * w] = data[ix + iy * dimX + iz * dimX * dimY];
        }
      }
      return { pixels, width: w, height: h };
    }
    case "coronal": {
      const iy = Math.max(0, Math.min(dimY - 1, Math.round(sliceIndex)));
      const w = dimX, h = dimZ;
      const pixels = new Uint8Array(w * h);
      for (let iz = 0; iz < h; iz++) {
        for (let ix = 0; ix < w; ix++) {
          pixels[ix + (h - 1 - iz) * w] = data[ix + iy * dimX + iz * dimX * dimY];
        }
      }
      return { pixels, width: w, height: h };
    }
  }
}

/**
 * Convert MNI coordinate (mm) to voxel index using atlas-level affine.
 */
export function mniToVoxel(
  mniX: number, mniY: number, mniZ: number,
  meta: AtlasMeta,
): [number, number, number] {
  return [
    Math.round(mniX - meta.srow_x[3]),
    Math.round(mniY - meta.srow_y[3]),
    Math.round(mniZ - meta.srow_z[3]),
  ];
}

export function voxelToMni(
  ix: number, iy: number, iz: number,
  meta: AtlasMeta,
): [number, number, number] {
  return [
    ix + meta.srow_x[3],
    iy + meta.srow_y[3],
    iz + meta.srow_z[3],
  ];
}

/** Per-volume coordinate conversion using the volume's own affine. */
export function volVoxelToMni(
  ix: number, iy: number, iz: number,
  vol: LoadedVolume,
): [number, number, number] {
  return [
    ix * vol.srow_x[0] + iy * vol.srow_x[1] + iz * vol.srow_x[2] + vol.srow_x[3],
    ix * vol.srow_y[0] + iy * vol.srow_y[1] + iz * vol.srow_y[2] + vol.srow_y[3],
    ix * vol.srow_z[0] + iy * vol.srow_z[1] + iz * vol.srow_z[2] + vol.srow_z[3],
  ];
}

/** Get slice range for a volume (using per-volume dims). */
export function getVolumeSliceRange(
  vol: LoadedVolume,
  plane: SlicePlane,
): { min: number; max: number; default: number } {
  switch (plane) {
    case "axial": return { min: 0, max: vol.dimZ - 1, default: Math.round(vol.dimZ / 2) };
    case "sagittal": return { min: 0, max: vol.dimX - 1, default: Math.round(vol.dimX / 2) };
    case "coronal": return { min: 0, max: vol.dimY - 1, default: Math.round(vol.dimY / 2) };
  }
}

/**
 * Slice ranges in voxel indices for each plane.
 */
export function getSliceRange(
  meta: AtlasMeta,
  plane: SlicePlane,
): { min: number; max: number; default: number } {
  switch (plane) {
    case "axial":
      return { min: 0, max: meta.dims[2] - 1, default: Math.round(meta.dims[2] / 2) };
    case "sagittal":
      return { min: 0, max: meta.dims[0] - 1, default: Math.round(meta.dims[0] / 2) };
    case "coronal":
      return { min: 0, max: meta.dims[1] - 1, default: Math.round(meta.dims[1] / 2) };
  }
}
