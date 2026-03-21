"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  loadVolume,
  loadAtlasMeta,
  extractSlice,
  getSliceRange,
  voxelToMni,
  type SlicePlane,
  type AtlasMeta,
  type LoadedVolume,
} from "@/lib/volume-atlas";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";
import ClinicalImageViewer, { ExpandButton } from "./ClinicalImageViewer";

interface CTWindow {
  label: string;
  center: number;
  width: number;
}

const CT_WINDOWS: CTWindow[] = [
  { label: "Brain", center: 40, width: 80 },
  { label: "Bone", center: 400, width: 1800 },
  { label: "Subdural", center: 75, width: 215 },
  { label: "Stroke", center: 32, width: 8 },
];

function tissueToHU(gmProb: number, wmProb: number, csfProb: number, t1Val: number): number {
  if (t1Val < 3) return -1000; // air
  const total = gmProb + wmProb + csfProb;
  if (total < 10) {
    // Outside brain — check if it's skull (high T1 around brain edge) or scalp
    return t1Val > 50 ? 800 : t1Val > 15 ? 25 : -1000;
  }
  const gm = gmProb / 255;
  const wm = wmProb / 255;
  const csf = csfProb / 255;
  return gm * 37 + wm * 30 + csf * 5;
}

export default function CTScanViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plane, setPlane] = useState<SlicePlane>("axial");
  const [sliceIdx, setSliceIdx] = useState<number | null>(null);
  const [windowIdx, setWindowIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [clinicalOpen, setClinicalOpen] = useState(false);

  const metaRef = useRef<AtlasMeta | null>(null);
  const volsRef = useRef<{ t1: LoadedVolume; gm: LoadedVolume; wm: LoadedVolume; csf: LoadedVolume } | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      loadAtlasMeta(),
      loadVolume("t1"),
      loadVolume("gm"),
      loadVolume("wm"),
      loadVolume("csf"),
    ]).then(([meta, t1, gm, wm, csf]) => {
      metaRef.current = meta;
      volsRef.current = { t1, gm, wm, csf };
      setLoading(false);
      setSliceIdx((prev) => prev ?? getSliceRange(meta, plane).default);
    });
  }, [plane]);

  useEffect(() => {
    if (metaRef.current) setSliceIdx(getSliceRange(metaRef.current, plane).default);
  }, [plane]);

  const ctWindow = CT_WINDOWS[windowIdx];

  const renderSlice = useCallback(() => {
    const canvas = canvasRef.current;
    const vols = volsRef.current;
    if (!canvas || !vols || sliceIdx === null) return;

    const t1Slice = extractSlice(vols.t1, plane, sliceIdx);
    const gmSlice = extractSlice(vols.gm, plane, sliceIdx);
    const wmSlice = extractSlice(vols.wm, plane, sliceIdx);
    const csfSlice = extractSlice(vols.csf, plane, sliceIdx);

    const { width, height } = t1Slice;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(width, height);
    const low = ctWindow.center - ctWindow.width / 2;
    const high = ctWindow.center + ctWindow.width / 2;
    const range = high - low;

    for (let i = 0; i < t1Slice.pixels.length; i++) {
      const hu = tissueToHU(gmSlice.pixels[i], wmSlice.pixels[i], csfSlice.pixels[i], t1Slice.pixels[i]);
      const v = Math.max(0, Math.min(255, ((hu - low) / range) * 255));
      const idx = i * 4;
      imgData.data[idx] = v;
      imgData.data[idx + 1] = v;
      imgData.data[idx + 2] = v;
      imgData.data[idx + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }, [plane, sliceIdx, ctWindow]);

  useEffect(() => {
    if (!loading) renderSlice();
  }, [loading, renderSlice]);

  const meta = metaRef.current;
  const range = meta ? getSliceRange(meta, plane) : { min: 0, max: 192, default: 96 };
  const currentSlice = sliceIdx ?? range.default;

  let mniLabel = "";
  if (meta && sliceIdx !== null) {
    const [mx, my, mz] = (() => {
      switch (plane) {
        case "axial": return voxelToMni(96, 114, sliceIdx, meta);
        case "sagittal": return voxelToMni(sliceIdx, 114, 96, meta);
        case "coronal": return voxelToMni(96, sliceIdx, 96, meta);
      }
    })();
    const coord = plane === "axial" ? `Z=${mz.toFixed(0)}` : plane === "sagittal" ? `X=${mx.toFixed(0)}` : `Y=${my.toFixed(0)}`;
    mniLabel = coord;
  }

  return (
    <BracketFrame variant="detail-5" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>
        CT Scan — {ctWindow.label} Window
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[7px] font-normal" style={{ color: "#ffffff40" }}>W:{ctWindow.width} L:{ctWindow.center} · {mniLabel}</span>
          <ExpandButton onClick={() => setClinicalOpen(true)} />
        </span>
      </HudSectionTitle>
      <ClinicalImageViewer open={clinicalOpen} onClose={() => setClinicalOpen(false)} initialModality="CT" />

      <div className="flex items-center gap-1.5 mt-2 mb-1 flex-wrap">
        {(["axial", "sagittal", "coronal"] as const).map((p) => (
          <button key={p} onClick={() => setPlane(p)}
            className="text-[8px] uppercase px-1.5 py-0.5 rounded transition-colors"
            style={{ color: plane === p ? "#f59e0b" : "#525252", background: plane === p ? "#f59e0b15" : "transparent" }}>
            {p}
          </button>
        ))}
        <div className="w-px h-3 bg-white/8" />
        {CT_WINDOWS.map((w, i) => (
          <button key={w.label} onClick={() => setWindowIdx(i)}
            className="text-[7px] px-1.5 py-0.5 rounded transition-colors"
            style={{ color: windowIdx === i ? "#f59e0b" : "#525252", background: windowIdx === i ? "#f59e0b12" : "transparent" }}>
            {w.label}
          </button>
        ))}
      </div>

      <div className="relative flex-1 flex items-center justify-center bg-black rounded overflow-hidden mt-1"
        style={{ minHeight: 260 }}>
        {loading ? (
          <div className="text-[10px] text-neutral-600 animate-pulse">Loading atlas volumes...</div>
        ) : (
          <canvas ref={canvasRef} className="max-w-full max-h-full"
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        )}
        {!loading && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "#f59e0b10" }} />
            <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "#f59e0b10" }} />
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "axial" ? "A" : "S"}
            </span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "axial" ? "P" : "I"}
            </span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "sagittal" ? "P" : "R"}
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[7px] font-mono" style={{ color: "#ffffff25" }}>
              {plane === "sagittal" ? "A" : "L"}
            </span>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[7px] text-neutral-600 w-8">{range.min}</span>
        <input type="range" min={range.min} max={range.max} step={1} value={currentSlice}
          onChange={(e) => setSliceIdx(parseInt(e.target.value))}
          className="flex-1 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer accent-amber-600" />
        <span className="text-[7px] text-neutral-600 w-8 text-right">{range.max}</span>
      </div>
    </BracketFrame>
  );
}
