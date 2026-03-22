"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useLiveStore } from "@/lib/live-store";
import {
  loadVolume,
  loadAtlasMeta,
  extractSlice,
  getSliceRange,
  type SlicePlane,
  type AtlasMeta,
  type LoadedVolume,
} from "@/lib/volume-atlas";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";
import ClinicalImageViewer, { ExpandButton } from "./ClinicalImageViewer";

type Tracer = "FDG" | "DaT" | "5-HT" | "Amyloid";

const TRACER_INFO: Record<Tracer, { label: string; description: string; color: string }> = {
  FDG: { label: "\u00B9\u2078F-FDG", description: "Glucose metabolism", color: "#f59e0b" },
  DaT: { label: "\u00B9\u00B2\u00B3I-FP-CIT", description: "Dopamine transporter", color: "#6366f1" },
  "5-HT": { label: "\u00B9\u00B9C-WAY", description: "5-HT\u2081\u2090 receptor", color: "#14b8a6" },
  Amyloid: { label: "\u00B9\u2078F-Florbetapir", description: "Amyloid plaque", color: "#ec4899" },
};

function hotColormap(t: number): [number, number, number] {
  const v = Math.max(0, Math.min(1, t));
  if (v < 0.33) return [Math.round((v / 0.33) * 180), 0, Math.round((v / 0.33) * 40)];
  if (v < 0.66) {
    const s = (v - 0.33) / 0.33;
    return [180 + Math.round(s * 75), Math.round(s * 180), Math.round(40 - s * 40)];
  }
  const s = (v - 0.66) / 0.34;
  return [255, 180 + Math.round(s * 75), Math.round(s * 255)];
}

function computeUptake(gm: number, wm: number, csf: number, tracer: Tracer): number {
  const total = gm + wm + csf;
  if (total < 10) return 0;
  const gmN = gm / 255, wmN = wm / 255, csfN = csf / 255;
  switch (tracer) {
    case "FDG": return gmN * 0.85 + wmN * 0.3 + csfN * 0.02;
    case "DaT": return gmN * 0.15 + wmN * 0.05;
    case "5-HT": return gmN * 0.55 + wmN * 0.15;
    case "Amyloid": return gmN * 0.25 + wmN * 0.15 + csfN * 0.01;
  }
}

export default function PETScanViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plane, setPlane] = useState<SlicePlane>("axial");
  const [sliceIdx, setSliceIdx] = useState<number | null>(null);
  const [tracer, setTracer] = useState<Tracer>("FDG");
  const [overlayOpacity, setOverlayOpacity] = useState(0.75);
  const [loading, setLoading] = useState(true);
  const [clinicalOpen, setClinicalOpen] = useState(false);

  const metaRef = useRef<AtlasMeta | null>(null);
  const volsRef = useRef<{ t1: LoadedVolume; gm: LoadedVolume; wm: LoadedVolume; csf: LoadedVolume } | null>(null);
  const connected = useLiveStore((s) => s.mollyAwake);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadAtlasMeta(), loadVolume("t1"), loadVolume("gm"), loadVolume("wm"), loadVolume("csf")])
      .then(([meta, t1, gm, wm, csf]) => {
        metaRef.current = meta;
        volsRef.current = { t1, gm, wm, csf };
        setLoading(false);
        setSliceIdx((prev) => prev ?? getSliceRange(meta, plane).default);
      });
  }, [plane]);

  useEffect(() => {
    if (metaRef.current) setSliceIdx(getSliceRange(metaRef.current, plane).default);
  }, [plane]);

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

    for (let i = 0; i < t1Slice.pixels.length; i++) {
      const bgI = t1Slice.pixels[i] * 0.3;
      const uptake = computeUptake(gmSlice.pixels[i], wmSlice.pixels[i], csfSlice.pixels[i], tracer);
      const [hr, hg, hb] = hotColormap(uptake);
      const alpha = uptake > 0.02 ? overlayOpacity : 0;

      const idx = i * 4;
      imgData.data[idx] = Math.round(bgI * (1 - alpha) + hr * alpha);
      imgData.data[idx + 1] = Math.round(bgI * (1 - alpha) + hg * alpha);
      imgData.data[idx + 2] = Math.round(bgI * (1 - alpha) + hb * alpha);
      imgData.data[idx + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
  }, [plane, sliceIdx, tracer, overlayOpacity]);

  useEffect(() => {
    if (!loading) renderSlice();
  }, [loading, renderSlice]);

  const meta = metaRef.current;
  const range = meta ? getSliceRange(meta, plane) : { min: 0, max: 192, default: 96 };
  const currentSlice = sliceIdx ?? range.default;
  const tracerInfo = TRACER_INFO[tracer];

  return (
    <BracketFrame variant="detail-5" className="p-3 flex flex-col overflow-hidden">
      <HudSectionTitle>
        PET Scan — {tracerInfo.label}
        <span className="ml-auto flex items-center gap-2">
          <span className="text-[7px] font-normal" style={{ color: connected ? "#34d399" : "#525252" }}>{connected ? "LIVE" : "STATIC"}</span>
          <ExpandButton onClick={() => setClinicalOpen(true)} />
        </span>
      </HudSectionTitle>
      <ClinicalImageViewer open={clinicalOpen} onClose={() => setClinicalOpen(false)} initialModality="PET" />

      <div className="flex items-center gap-1.5 mt-2 mb-1 flex-wrap">
        {(["axial", "sagittal", "coronal"] as const).map((p) => (
          <button key={p} onClick={() => setPlane(p)}
            className="text-[8px] uppercase px-1.5 py-0.5 rounded transition-colors"
            style={{ color: plane === p ? tracerInfo.color : "#525252", background: plane === p ? `${tracerInfo.color}15` : "transparent" }}>
            {p}
          </button>
        ))}
        <div className="w-px h-3 bg-white/8" />
        {(Object.keys(TRACER_INFO) as Tracer[]).map((t) => (
          <button key={t} onClick={() => setTracer(t)}
            className="text-[7px] px-1.5 py-0.5 rounded transition-colors"
            style={{ color: tracer === t ? TRACER_INFO[t].color : "#525252", background: tracer === t ? `${TRACER_INFO[t].color}12` : "transparent" }}>
            {t}
          </button>
        ))}
      </div>

      <div className="text-[6px] mb-1" style={{ color: `${tracerInfo.color}66` }}>{tracerInfo.description}</div>

      <div className="relative flex-1 flex items-center justify-center bg-black rounded overflow-hidden"
        style={{ minHeight: 260 }}>
        {loading ? (
          <div className="text-[10px] text-neutral-600 animate-pulse">Loading atlas volumes...</div>
        ) : (
          <canvas ref={canvasRef} className="max-w-full max-h-full"
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        )}
        {!loading && (
          <>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: `${tracerInfo.color}12` }} />
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: `${tracerInfo.color}12` }} />
            </div>
            <div className="absolute right-2 top-2 bottom-8 w-3 rounded overflow-hidden flex flex-col">
              {Array.from({ length: 20 }, (_, i) => {
                const [r, g, b] = hotColormap(1 - i / 19);
                return <div key={i} className="flex-1" style={{ background: `rgb(${r},${g},${b})` }} />;
              })}
            </div>
          </>
        )}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[7px] text-neutral-600 w-8">{range.min}</span>
        <input type="range" min={range.min} max={range.max} step={1} value={currentSlice}
          onChange={(e) => setSliceIdx(parseInt(e.target.value))}
          className="flex-1 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer accent-orange-500" />
        <span className="text-[7px] text-neutral-600 w-8 text-right">{range.max}</span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-[7px] text-neutral-600 w-8">Overlay</span>
        <input type="range" min={0} max={1} step={0.05} value={overlayOpacity}
          onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
          className="flex-1 h-1 appearance-none bg-neutral-800 rounded-full cursor-pointer accent-orange-500" />
        <span className="text-[7px] text-neutral-600 w-8 text-right">{(overlayOpacity * 100).toFixed(0)}%</span>
      </div>
    </BracketFrame>
  );
}
