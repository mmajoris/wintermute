"use client";

import { useRef, useEffect, useCallback, useState, type WheelEvent as ReactWheelEvent, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import {
  loadVolume,
  loadAtlasMeta,
  extractSlice,
  getSliceRange,
  voxelToMni,
  volVoxelToMni,
  getVolumeSliceRange,
  type SlicePlane,
  type AtlasMeta,
  type LoadedVolume,
} from "@/lib/volume-atlas";

// ── Types ────────────────────────────────────────────────────────────────

type Modality = "MRI" | "CT" | "PET" | "fMRI";

type MRISequence = "T1" | "T2" | "FLAIR" | "DWI" | "ADC";

interface CTWindowPreset {
  label: string;
  center: number;
  width: number;
}

const CT_PRESETS: CTWindowPreset[] = [
  { label: "Brain", center: 40, width: 80 },
  { label: "Bone", center: 400, width: 1800 },
  { label: "Subdural", center: 75, width: 215 },
  { label: "Stroke", center: 32, width: 8 },
  { label: "Soft Tissue", center: 50, width: 350 },
];

const SEQUENCE_TO_KEY: Record<MRISequence, string> = {
  T1: "t1_hd", T2: "t2_hd", FLAIR: "flair", DWI: "dwi", ADC: "adc",
};

const SEQUENCE_PARAMS: Record<MRISequence, { tr: string; te: string; ti?: string; flip: string; thick: string }> = {
  T1:    { tr: "2200ms", te: "2.96ms", ti: "900ms", flip: "9°", thick: "1.0mm" },
  T2:    { tr: "3200ms", te: "80ms", flip: "120°", thick: "1.0mm" },
  FLAIR: { tr: "9000ms", te: "81ms", ti: "2500ms", flip: "150°", thick: "1.0mm" },
  DWI:   { tr: "5000ms", te: "89ms", flip: "90°", thick: "1.0mm" },
  ADC:   { tr: "5000ms", te: "89ms", flip: "90°", thick: "1.0mm" },
};

interface MeasurementPoint { x: number; y: number }

interface Measurement {
  type: "distance";
  points: MeasurementPoint[];
  valueMm: number;
}

// ── Hot colormap for PET ─────────────────────────────────────────────────

function hotCmap(t: number): [number, number, number] {
  const v = Math.max(0, Math.min(1, t));
  if (v < 0.33) return [Math.round((v / 0.33) * 180), 0, Math.round((v / 0.33) * 40)];
  if (v < 0.66) { const s = (v - 0.33) / 0.33; return [180 + Math.round(s * 75), Math.round(s * 180), 0]; }
  const s = (v - 0.66) / 0.34;
  return [255, 180 + Math.round(s * 75), Math.round(s * 255)];
}

// ── Clinical Image Viewer (fullscreen) ──────────────────────────────────

interface ClinicalImageViewerProps {
  open: boolean;
  onClose: () => void;
  initialModality?: Modality;
}

export default function ClinicalImageViewer({ open, onClose, initialModality = "MRI" }: ClinicalImageViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // State
  const [modality, setModality] = useState<Modality>(initialModality);
  const [sequence, setSequence] = useState<MRISequence>("T1");
  const [plane, setPlane] = useState<SlicePlane>("axial");
  const [sliceIdx, setSliceIdx] = useState<number | null>(null);
  const [windowCenter, setWindowCenter] = useState(128);
  const [windowWidth, setWindowWidth] = useState(256);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);
  const [tool, setTool] = useState<"scroll" | "window" | "zoom" | "measure">("scroll");
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [pendingMeasure, setPendingMeasure] = useState<MeasurementPoint | null>(null);
  const [ctPresetIdx, setCtPresetIdx] = useState(0);

  const metaRef = useRef<AtlasMeta | null>(null);
  const volumesRef = useRef<Map<string, LoadedVolume>>(new Map());
  const isDragging = useRef(false);
  const lastDragPos = useRef({ x: 0, y: 0 });

  // Reset state when modality changes
  useEffect(() => {
    setModality(initialModality);
  }, [initialModality]);

  // Load volumes
  useEffect(() => {
    if (!open) return;
    setLoading(true);

    const keysNeeded: string[] = [];
    if (modality === "MRI") keysNeeded.push(SEQUENCE_TO_KEY[sequence]);
    else if (modality === "CT") keysNeeded.push("t1", "gm", "wm", "csf");
    else if (modality === "PET") keysNeeded.push("t1", "gm", "wm", "csf");
    else if (modality === "fMRI") keysNeeded.push("t1", "mask");

    Promise.all([
      loadAtlasMeta(),
      ...keysNeeded.map((k) => loadVolume(k).then((v) => ({ key: k, vol: v }))),
    ]).then(([meta, ...results]) => {
      metaRef.current = meta as AtlasMeta;
      for (const r of results as { key: string; vol: LoadedVolume }[]) {
        volumesRef.current.set(r.key, r.vol);
      }
      setLoading(false);
      setSliceIdx((prev) => prev ?? getSliceRange(meta as AtlasMeta, plane).default);
    });
  }, [open, modality, sequence, plane]);

  useEffect(() => {
    if (metaRef.current) setSliceIdx(getSliceRange(metaRef.current, plane).default);
    setMeasurements([]);
    setPendingMeasure(null);
  }, [plane]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // ── Render ──────────────────────────────────────────────────────────

  const renderSlice = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || loading || sliceIdx === null) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let sliceData: { pixels: Uint8Array; width: number; height: number } | null = null;

    if (modality === "MRI") {
      const vol = volumesRef.current.get(SEQUENCE_TO_KEY[sequence]);
      if (!vol) return;
      sliceData = extractSlice(vol, plane, sliceIdx);
    } else if (modality === "CT") {
      const t1 = volumesRef.current.get("t1");
      const gm = volumesRef.current.get("gm");
      const wm = volumesRef.current.get("wm");
      const csf = volumesRef.current.get("csf");
      if (!t1 || !gm || !wm || !csf) return;
      const t1s = extractSlice(t1, plane, sliceIdx);
      const gms = extractSlice(gm, plane, sliceIdx);
      const wms = extractSlice(wm, plane, sliceIdx);
      const csfs = extractSlice(csf, plane, sliceIdx);
      const pixels = new Uint8Array(t1s.pixels.length);
      const preset = CT_PRESETS[ctPresetIdx];
      const low = preset.center - preset.width / 2;
      const range = preset.width;
      for (let i = 0; i < pixels.length; i++) {
        const total = gms.pixels[i] + wms.pixels[i] + csfs.pixels[i];
        let hu: number;
        if (t1s.pixels[i] < 3) hu = -1000;
        else if (total < 10) hu = t1s.pixels[i] > 50 ? 800 : t1s.pixels[i] > 15 ? 25 : -1000;
        else hu = (gms.pixels[i] / 255) * 37 + (wms.pixels[i] / 255) * 30 + (csfs.pixels[i] / 255) * 5;
        pixels[i] = Math.max(0, Math.min(255, ((hu - low) / range) * 255));
      }
      sliceData = { pixels, width: t1s.width, height: t1s.height };
    } else if (modality === "PET") {
      const t1 = volumesRef.current.get("t1");
      const gm = volumesRef.current.get("gm");
      const wm = volumesRef.current.get("wm");
      if (!t1 || !gm || !wm) return;
      const t1s = extractSlice(t1, plane, sliceIdx);
      const gms = extractSlice(gm, plane, sliceIdx);
      const wms = extractSlice(wm, plane, sliceIdx);
      sliceData = t1s; // will be overridden below with color
    } else {
      const t1 = volumesRef.current.get("t1");
      if (!t1) return;
      sliceData = extractSlice(t1, plane, sliceIdx);
    }

    if (!sliceData) return;
    const { width, height } = sliceData;
    canvas.width = width;
    canvas.height = height;

    const imgData = ctx.createImageData(width, height);

    if (modality === "PET") {
      const t1s = extractSlice(volumesRef.current.get("t1")!, plane, sliceIdx);
      const gms = extractSlice(volumesRef.current.get("gm")!, plane, sliceIdx);
      const wms = extractSlice(volumesRef.current.get("wm")!, plane, sliceIdx);
      for (let i = 0; i < t1s.pixels.length; i++) {
        const bg = t1s.pixels[i] * 0.3;
        const uptake = (gms.pixels[i] / 255) * 0.85 + (wms.pixels[i] / 255) * 0.3;
        const [hr, hg, hb] = hotCmap(uptake);
        const a = uptake > 0.02 ? 0.75 : 0;
        const idx = i * 4;
        imgData.data[idx] = Math.round(bg * (1 - a) + hr * a);
        imgData.data[idx + 1] = Math.round(bg * (1 - a) + hg * a);
        imgData.data[idx + 2] = Math.round(bg * (1 - a) + hb * a);
        imgData.data[idx + 3] = 255;
      }
    } else {
      // Apply window/level
      const wl = windowCenter - windowWidth / 2;
      const wh = windowCenter + windowWidth / 2;
      for (let i = 0; i < sliceData.pixels.length; i++) {
        const raw = sliceData.pixels[i];
        const v = Math.max(0, Math.min(255, ((raw - wl) / (wh - wl)) * 255));
        const idx = i * 4;
        imgData.data[idx] = v;
        imgData.data[idx + 1] = v;
        imgData.data[idx + 2] = v;
        imgData.data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [plane, sliceIdx, modality, sequence, windowCenter, windowWidth, loading, ctPresetIdx]);

  useEffect(() => {
    if (!loading) renderSlice();
  }, [loading, renderSlice]);

  // ── Mouse interactions ──────────────────────────────────────────────

  const handleWheel = useCallback((e: ReactWheelEvent) => {
    e.preventDefault();
    if (tool === "scroll" || tool === "window") {
      setSliceIdx((prev) => {
        if (prev === null || !metaRef.current) return prev;
        const range = getSliceRange(metaRef.current, plane);
        const delta = e.deltaY > 0 ? -1 : 1;
        return Math.max(range.min, Math.min(range.max, prev + delta));
      });
    } else if (tool === "zoom") {
      setZoom((z) => Math.max(0.5, Math.min(5, z + (e.deltaY > 0 ? -0.1 : 0.1))));
    }
  }, [tool, plane]);

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    if (tool === "measure") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      if (pendingMeasure) {
        const dx = (x - pendingMeasure.x);
        const dy = (y - pendingMeasure.y);
        const distPx = Math.sqrt(dx * dx + dy * dy);
        setMeasurements((prev) => [...prev, { type: "distance", points: [pendingMeasure, { x, y }], valueMm: distPx }]);
        setPendingMeasure(null);
      } else {
        setPendingMeasure({ x, y });
      }
      return;
    }
    isDragging.current = true;
    lastDragPos.current = { x: e.clientX, y: e.clientY };
  }, [tool, pendingMeasure]);

  const handleMouseMove = useCallback((e: ReactMouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastDragPos.current.x;
    const dy = e.clientY - lastDragPos.current.y;
    lastDragPos.current = { x: e.clientX, y: e.clientY };

    if (tool === "window") {
      setWindowCenter((c) => Math.max(0, Math.min(255, c + dy * 0.5)));
      setWindowWidth((w) => Math.max(1, Math.min(512, w + dx)));
    } else if (tool === "zoom") {
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    } else if (tool === "scroll") {
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  }, [tool]);

  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

  // ── Slice range and MNI (uses primary display volume for HD-aware ranges) ──

  const meta = metaRef.current;
  const primaryVol = (() => {
    if (modality === "MRI") return volumesRef.current.get(SEQUENCE_TO_KEY[sequence]);
    if (modality === "CT") return volumesRef.current.get("t1");
    if (modality === "PET") return volumesRef.current.get("t1");
    return volumesRef.current.get("t1");
  })();
  const range = primaryVol
    ? getVolumeSliceRange(primaryVol, plane)
    : meta ? getSliceRange(meta, plane) : { min: 0, max: 192, default: 96 };

  let mniStr = "";
  if (primaryVol && sliceIdx !== null) {
    const mid = [Math.round(primaryVol.dimX / 2), Math.round(primaryVol.dimY / 2), Math.round(primaryVol.dimZ / 2)];
    const [mx, my, mz] = (() => {
      switch (plane) {
        case "axial": return volVoxelToMni(mid[0], mid[1], sliceIdx, primaryVol);
        case "sagittal": return volVoxelToMni(sliceIdx, mid[1], mid[2], primaryVol);
        case "coronal": return volVoxelToMni(mid[0], sliceIdx, mid[2], primaryVol);
      }
    })();
    mniStr = `X:${mx.toFixed(0)} Y:${my.toFixed(0)} Z:${mz.toFixed(0)}`;
  } else if (meta && sliceIdx !== null) {
    const mid = [Math.round(meta.dims[0] / 2), Math.round(meta.dims[1] / 2), Math.round(meta.dims[2] / 2)];
    const [mx, my, mz] = (() => {
      switch (plane) {
        case "axial": return voxelToMni(mid[0], mid[1], sliceIdx, meta);
        case "sagittal": return voxelToMni(sliceIdx, mid[1], mid[2], meta);
        case "coronal": return voxelToMni(mid[0], sliceIdx, mid[2], meta);
      }
    })();
    mniStr = `X:${mx.toFixed(0)} Y:${my.toFixed(0)} Z:${mz.toFixed(0)}`;
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" });
  const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

  if (!open) return null;

  const seqParams = modality === "MRI" ? SEQUENCE_PARAMS[sequence] : null;

  const content = (
    <div className="fixed inset-0 z-9999 bg-black flex flex-col" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Top toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border-b border-[#1a1a1a]">
        {/* Modality */}
        <div className="flex gap-1">
          {(["MRI", "CT", "PET", "fMRI"] as Modality[]).map((m) => (
            <button key={m} onClick={() => setModality(m)}
              className="text-[10px] px-3 py-1 rounded transition-colors"
              style={{
                color: modality === m ? "#00c8dc" : "#444",
                background: modality === m ? "#00c8dc12" : "transparent",
                border: modality === m ? "1px solid #00c8dc30" : "1px solid transparent",
              }}>
              {m}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[#222]" />

        {/* Sequence / CT window */}
        {modality === "MRI" && (
          <div className="flex gap-1">
            {(["T1", "T2", "FLAIR", "DWI", "ADC"] as MRISequence[]).map((s) => (
              <button key={s} onClick={() => setSequence(s)}
                className="text-[10px] px-2 py-1 rounded transition-colors"
                style={{
                  color: sequence === s ? "#f59e0b" : "#444",
                  background: sequence === s ? "#f59e0b12" : "transparent",
                }}>
                {s}
              </button>
            ))}
          </div>
        )}
        {modality === "CT" && (
          <div className="flex gap-1">
            {CT_PRESETS.map((p, i) => (
              <button key={p.label} onClick={() => setCtPresetIdx(i)}
                className="text-[10px] px-2 py-1 rounded transition-colors"
                style={{ color: ctPresetIdx === i ? "#f59e0b" : "#444", background: ctPresetIdx === i ? "#f59e0b12" : "transparent" }}>
                {p.label}
              </button>
            ))}
          </div>
        )}

        <div className="w-px h-5 bg-[#222]" />

        {/* Plane */}
        <div className="flex gap-1">
          {(["axial", "sagittal", "coronal"] as SlicePlane[]).map((p) => (
            <button key={p} onClick={() => setPlane(p)}
              className="text-[10px] uppercase px-2 py-1 rounded transition-colors"
              style={{ color: plane === p ? "#06b6d4" : "#444", background: plane === p ? "#06b6d412" : "transparent" }}>
              {p}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-[#222]" />

        {/* Tools */}
        <div className="flex gap-1">
          {([
            { id: "scroll" as const, label: "Scroll", icon: "⇕" },
            { id: "window" as const, label: "W/L", icon: "◐" },
            { id: "zoom" as const, label: "Pan", icon: "⊞" },
            { id: "measure" as const, label: "Measure", icon: "⌇" },
          ]).map((t) => (
            <button key={t.id} onClick={() => { setTool(t.id); setPendingMeasure(null); }}
              className="text-[10px] px-2 py-1 rounded transition-colors flex items-center gap-1"
              style={{ color: tool === t.id ? "#22c55e" : "#444", background: tool === t.id ? "#22c55e12" : "transparent" }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
          {measurements.length > 0 && (
            <button onClick={() => setMeasurements([])}
              className="text-[10px] px-2 py-1 text-[#444] hover:text-red-500 transition-colors">
              Clear
            </button>
          )}
        </div>

        <div className="flex-1" />

        {/* W/L display */}
        <span className="text-[9px] text-[#555]">
          W:{windowWidth.toFixed(0)} L:{windowCenter.toFixed(0)}
        </span>

        <div className="w-px h-5 bg-[#222]" />

        <button onClick={onClose} className="text-[11px] text-[#555] hover:text-white px-3 py-1 transition-colors">
          ESC
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: tool === "window" ? "crosshair" : tool === "zoom" ? "grab" : tool === "measure" ? "crosshair" : "default" }}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-[12px] text-[#333] animate-pulse">
            Loading volume data...
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
            <canvas ref={canvasRef} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
        )}

        {/* Cross-hairs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "#00c8dc08" }} />
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "#00c8dc08" }} />
        </div>

        {/* Orientation labels */}
        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold" style={{ color: "#ffffff35" }}>
          {plane === "axial" ? "A" : "S"}
        </span>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-bold" style={{ color: "#ffffff35" }}>
          {plane === "axial" ? "P" : "I"}
        </span>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold" style={{ color: "#ffffff35" }}>
          {plane === "sagittal" ? "P" : "R"}
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold" style={{ color: "#ffffff35" }}>
          {plane === "sagittal" ? "A" : "L"}
        </span>

        {/* ── DICOM-style metadata overlays ── */}

        {/* Top-left: Patient info */}
        <div className="absolute top-3 left-3 pointer-events-none" style={{ color: "#ffffff55", fontSize: 10, lineHeight: "14px" }}>
          <div style={{ color: "#ffffffaa" }}>MOLLY</div>
          <div>Synthetic Neural Architecture</div>
          <div>DOB: 2024-01-15</div>
          <div>ID: MOLLY-001</div>
        </div>

        {/* Top-right: Scan info */}
        <div className="absolute top-3 right-3 text-right pointer-events-none" style={{ color: "#ffffff55", fontSize: 10, lineHeight: "14px" }}>
          <div>nulltruth neuroimaging</div>
          <div>{dateStr} {timeStr}</div>
          <div>{modality}{modality === "MRI" ? ` ${sequence}` : modality === "CT" ? ` ${CT_PRESETS[ctPresetIdx].label}` : ""}</div>
          <div>{plane.toUpperCase()} · Slice {sliceIdx ?? "—"}/{range.max}</div>
        </div>

        {/* Bottom-left: Sequence parameters */}
        <div className="absolute bottom-3 left-3 pointer-events-none" style={{ color: "#ffffff40", fontSize: 9, lineHeight: "13px" }}>
          {seqParams && (
            <>
              <div>TR: {seqParams.tr} · TE: {seqParams.te}</div>
              {seqParams.ti && <div>TI: {seqParams.ti}</div>}
              <div>Flip: {seqParams.flip} · Thick: {seqParams.thick}</div>
            </>
          )}
          {modality === "CT" && <div>W:{CT_PRESETS[ctPresetIdx].width} L:{CT_PRESETS[ctPresetIdx].center} · 120kVp · 250mAs</div>}
          <div>FOV: {primaryVol ? `${primaryVol.dimX}×${primaryVol.dimY}` : "193×229"}mm · Matrix: {primaryVol ? `${primaryVol.dimX}×${primaryVol.dimY}` : "193×229"} · {primaryVol ? `${primaryVol.pixdim[0].toFixed(1)}mm iso` : "1.0mm iso"}</div>
          <div>MNI: {mniStr}</div>
        </div>

        {/* Bottom-right: Scale bar */}
        <div className="absolute bottom-3 right-3 pointer-events-none flex flex-col items-end">
          <div className="flex items-end gap-1">
            <div style={{ width: 50, height: 2, background: "#ffffff55" }} />
            <span style={{ color: "#ffffff55", fontSize: 9 }}>50mm</span>
          </div>
          <div className="mt-1" style={{ color: "#ffffff30", fontSize: 8 }}>
            ICBM-152 {primaryVol && primaryVol.pixdim[0] < 0.6 ? "2009b" : "2009c"} · {primaryVol ? `${primaryVol.pixdim[0].toFixed(1)}×${primaryVol.pixdim[1].toFixed(1)}×${primaryVol.pixdim[2].toFixed(1)}mm` : "1×1×1mm"}
          </div>
        </div>

        {/* Measurement overlays */}
        {measurements.length > 0 && (
          <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
            {measurements.map((m, idx) => {
              const canvas = canvasRef.current;
              if (!canvas || m.points.length < 2) return null;
              const rect = canvas.getBoundingClientRect();
              const parentRect = canvas.parentElement?.parentElement?.getBoundingClientRect();
              if (!parentRect) return null;
              const scaleX = rect.width / canvas.width;
              const scaleY = rect.height / canvas.height;
              const offsetX = rect.left - parentRect.left;
              const offsetY = rect.top - parentRect.top;

              const x1 = m.points[0].x * scaleX + offsetX;
              const y1 = m.points[0].y * scaleY + offsetY;
              const x2 = m.points[1].x * scaleX + offsetX;
              const y2 = m.points[1].y * scaleY + offsetY;
              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              return (
                <g key={idx}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22c55e" strokeWidth="1.5" />
                  <circle cx={x1} cy={y1} r="3" fill="#22c55e" />
                  <circle cx={x2} cy={y2} r="3" fill="#22c55e" />
                  <text x={midX + 5} y={midY - 5} fill="#22c55e" fontSize="11" fontFamily="'IBM Plex Mono', monospace">
                    {m.valueMm.toFixed(1)}mm
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* Bottom scrub bar */}
      <div className="px-4 py-2 bg-[#0a0a0a] border-t border-[#1a1a1a] flex items-center gap-3">
        <span className="text-[9px] text-[#444] w-6">{range.min}</span>
        <input type="range" min={range.min} max={range.max} step={1} value={sliceIdx ?? range.default}
          onChange={(e) => setSliceIdx(parseInt(e.target.value))}
          className="flex-1 h-1 appearance-none bg-[#1a1a1a] rounded-full cursor-pointer accent-cyan-600"
        />
        <span className="text-[9px] text-[#444] w-6 text-right">{range.max}</span>
        <div className="w-px h-4 bg-[#222]" />
        <span className="text-[9px] text-[#444]">Zoom: {(zoom * 100).toFixed(0)}%</span>
        <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="text-[9px] text-[#444] hover:text-white transition-colors">Reset</button>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

// ── Panel expand button ─────────────────────────────────────────────────

export function ExpandButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="text-[9px] px-1.5 py-0.5 rounded transition-colors hover:bg-white/5"
      style={{ color: "#ffffff30" }}
      title="Open clinical viewer">
      ⛶
    </button>
  );
}
