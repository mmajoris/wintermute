#!/usr/bin/env python3
"""
Pre-processes MNI-ICBM152 NIfTI atlas volumes into optimized binary format for web delivery.

Input: Raw .nii files from the ICBM 2009c Nonlinear Asymmetric template
Output: Gzipped uint8 volumes with a minimal header, ready for browser loading

Binary format: [3 x uint16 LE: dimX, dimY, dimZ][uint8[dimX*dimY*dimZ]: voxel data]

Usage:
  python3 scripts/process-atlas.py /path/to/mni_icbm152_nlin_asym_09c/ public/atlas/
"""

import struct
import gzip
import sys
import os
import numpy as np

def read_nifti(path: str) -> tuple:
    """Read a NIfTI-1 .nii file, return (header_dict, 3D numpy array of scaled float values)."""
    with open(path, 'rb') as f:
        raw = f.read()

    # Parse header (348 bytes)
    dims = struct.unpack_from('<8h', raw, 40)
    ndim = dims[0]
    nx, ny, nz = dims[1], dims[2], dims[3]
    datatype = struct.unpack_from('<h', raw, 70)[0]
    bitpix = struct.unpack_from('<h', raw, 72)[0]
    pixdim = struct.unpack_from('<8f', raw, 76)
    vox_offset = int(struct.unpack_from('<f', raw, 108)[0])
    scl_slope = struct.unpack_from('<f', raw, 112)[0]
    scl_inter = struct.unpack_from('<f', raw, 116)[0]

    # Affine matrix (srow_x, srow_y, srow_z)
    srow_x = struct.unpack_from('<4f', raw, 280)
    srow_y = struct.unpack_from('<4f', raw, 296)
    srow_z = struct.unpack_from('<4f', raw, 312)

    header = {
        'dims': (nx, ny, nz),
        'pixdim': (pixdim[1], pixdim[2], pixdim[3]),
        'datatype': datatype,
        'bitpix': bitpix,
        'scl_slope': scl_slope,
        'scl_inter': scl_inter,
        'srow_x': srow_x,
        'srow_y': srow_y,
        'srow_z': srow_z,
    }

    # Read image data
    img_data = raw[vox_offset:]
    dtype_map = {2: np.uint8, 4: np.int16, 8: np.int32, 16: np.float32, 64: np.float64}
    dtype = dtype_map.get(datatype)
    if dtype is None:
        raise ValueError(f"Unsupported NIfTI datatype: {datatype}")

    volume = np.frombuffer(img_data, dtype=dtype).reshape((nz, ny, nx)).astype(np.float64)

    # Apply scaling
    if scl_slope != 0:
        volume = volume * scl_slope + scl_inter

    return header, volume


def to_uint8(volume: np.ndarray, percentile_clip: float = 99.8) -> np.ndarray:
    """Normalize a volume to uint8 [0, 255] with percentile clipping for robustness."""
    vmin = 0.0
    vmax = np.percentile(volume[volume > 0], percentile_clip) if np.any(volume > 0) else 1.0
    normalized = np.clip((volume - vmin) / (vmax - vmin), 0, 1)
    return (normalized * 255).astype(np.uint8)


def save_volume(volume_uint8: np.ndarray, output_path: str, header: dict):
    """Save a uint8 volume as gzipped binary with minimal header."""
    nx, ny, nz = header['dims']
    # Header: dims + pixdim + affine rows (for coordinate mapping)
    hdr = struct.pack('<3H', nx, ny, nz)
    hdr += struct.pack('<3f', *header['pixdim'])
    hdr += struct.pack('<4f', *header['srow_x'])
    hdr += struct.pack('<4f', *header['srow_y'])
    hdr += struct.pack('<4f', *header['srow_z'])

    # Volume data (stored as Z-fastest: data[x + y*nx + z*nx*ny])
    # NIfTI stores as (z, y, x) in numpy; flatten in that order
    data = volume_uint8.tobytes()

    with gzip.open(output_path, 'wb', compresslevel=9) as f:
        f.write(hdr)
        f.write(data)

    raw_size = len(hdr) + len(data)
    gz_size = os.path.getsize(output_path)
    print(f"  -> {output_path}: {nx}x{ny}x{nz} = {raw_size/1024/1024:.1f}MB raw, {gz_size/1024/1024:.1f}MB gzipped")


def process_atlas(input_dir: str, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)

    volumes = [
        ('mni_icbm152_t1_tal_nlin_asym_09c.nii', 't1.bin.gz', 'T1-weighted'),
        ('mni_icbm152_t2_tal_nlin_asym_09c.nii', 't2.bin.gz', 'T2-weighted'),
        ('mni_icbm152_gm_tal_nlin_asym_09c.nii', 'gm.bin.gz', 'Gray matter probability'),
        ('mni_icbm152_wm_tal_nlin_asym_09c.nii', 'wm.bin.gz', 'White matter probability'),
        ('mni_icbm152_csf_tal_nlin_asym_09c.nii', 'csf.bin.gz', 'CSF probability'),
        ('mni_icbm152_t1_tal_nlin_asym_09c_mask.nii', 'mask.bin.gz', 'Brain mask'),
    ]

    for nii_name, out_name, description in volumes:
        nii_path = os.path.join(input_dir, nii_name)
        out_path = os.path.join(output_dir, out_name)

        if not os.path.exists(nii_path):
            print(f"SKIP {nii_name} (not found)")
            continue

        print(f"Processing {description}: {nii_name}")
        header, volume = read_nifti(nii_path)
        print(f"  Dimensions: {header['dims']}, range: [{volume.min():.2f}, {volume.max():.2f}]")

        volume_u8 = to_uint8(volume)
        save_volume(volume_u8, out_path, header)

    # Save metadata JSON for the loader
    import json
    header, _ = read_nifti(os.path.join(input_dir, 'mni_icbm152_t1_tal_nlin_asym_09c.nii'))
    meta = {
        'dims': list(header['dims']),
        'pixdim': list(header['pixdim']),
        'srow_x': list(header['srow_x']),
        'srow_y': list(header['srow_y']),
        'srow_z': list(header['srow_z']),
        'volumes': {
            't1': {'file': 't1.bin.gz', 'description': 'T1-weighted MRI template'},
            't2': {'file': 't2.bin.gz', 'description': 'T2-weighted MRI template'},
            'gm': {'file': 'gm.bin.gz', 'description': 'Gray matter tissue probability'},
            'wm': {'file': 'wm.bin.gz', 'description': 'White matter tissue probability'},
            'csf': {'file': 'csf.bin.gz', 'description': 'CSF tissue probability'},
            'mask': {'file': 'mask.bin.gz', 'description': 'Brain mask'},
        },
        'source': 'ICBM 2009c Nonlinear Asymmetric',
        'citation': 'Fonov et al., NeuroImage 54(1), 2011',
    }
    meta_path = os.path.join(output_dir, 'atlas.json')
    with open(meta_path, 'w') as f:
        json.dump(meta, f, indent=2)
    print(f"\nMetadata saved to {meta_path}")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <input_nifti_dir> <output_dir>")
        sys.exit(1)
    process_atlas(sys.argv[1], sys.argv[2])
