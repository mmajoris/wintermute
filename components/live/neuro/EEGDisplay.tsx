"use client";

import { useRef, useEffect, useCallback } from "react";
import { useLiveStore } from "@/lib/live-store";
import type { OscillationPopulation } from "@/lib/brain-events";
import { BracketFrame, HudSectionTitle } from "../BracketFrame";

const MONTAGE: {
  id: string;
  label: string;
  color: string;
  baseFreq: number;
  baseAmp: number;
  y: number;
}[] = [
  { id: "Fp1", label: "Fp1", color: "#6ee7b7", baseFreq: 18, baseAmp: 0.25, y: 0 },
  { id: "Fp2", label: "Fp2", color: "#6ee7b7", baseFreq: 18, baseAmp: 0.25, y: 1 },
  { id: "F7",  label: "F7",  color: "#93c5fd", baseFreq: 14, baseAmp: 0.3,  y: 2 },
  { id: "F3",  label: "F3",  color: "#93c5fd", baseFreq: 15, baseAmp: 0.28, y: 3 },
  { id: "Fz",  label: "Fz",  color: "#93c5fd", baseFreq: 16, baseAmp: 0.26, y: 4 },
  { id: "F4",  label: "F4",  color: "#93c5fd", baseFreq: 15, baseAmp: 0.28, y: 5 },
  { id: "F8",  label: "F8",  color: "#93c5fd", baseFreq: 14, baseAmp: 0.3,  y: 6 },
  { id: "T3",  label: "T3",  color: "#fbbf24", baseFreq: 6,  baseAmp: 0.35, y: 7 },
  { id: "C3",  label: "C3",  color: "#c4b5fd", baseFreq: 10, baseAmp: 0.35, y: 8 },
  { id: "Cz",  label: "Cz",  color: "#c4b5fd", baseFreq: 10, baseAmp: 0.32, y: 9 },
  { id: "C4",  label: "C4",  color: "#c4b5fd", baseFreq: 10, baseAmp: 0.35, y: 10 },
  { id: "T4",  label: "T4",  color: "#fbbf24", baseFreq: 6,  baseAmp: 0.35, y: 11 },
  { id: "T5",  label: "T5",  color: "#fbbf24", baseFreq: 7,  baseAmp: 0.32, y: 12 },
  { id: "P3",  label: "P3",  color: "#f9a8d4", baseFreq: 10, baseAmp: 0.4,  y: 13 },
  { id: "Pz",  label: "Pz",  color: "#f9a8d4", baseFreq: 10, baseAmp: 0.38, y: 14 },
  { id: "P4",  label: "P4",  color: "#f9a8d4", baseFreq: 10, baseAmp: 0.4,  y: 15 },
  { id: "T6",  label: "T6",  color: "#fbbf24", baseFreq: 7,  baseAmp: 0.32, y: 16 },
  { id: "O1",  label: "O1",  color: "#34d399", baseFreq: 10, baseAmp: 0.5,  y: 17 },
  { id: "Oz",  label: "Oz",  color: "#34d399", baseFreq: 10, baseAmp: 0.48, y: 18 },
  { id: "O2",  label: "O2",  color: "#34d399", baseFreq: 10, baseAmp: 0.5,  y: 19 },
];

const CHANNEL_COUNT = MONTAGE.length;
const SAMPLES = 300;
const CHANNEL_H = 24;
const LABEL_W = 30;

const buffers: Float32Array[] = MONTAGE.map(() => new Float32Array(SAMPLES));
const phases: Float32Array = new Float32Array(CHANNEL_COUNT);

function getPopulationParams(
  populations: OscillationPopulation[] | undefined,
  channelId: string,
  fallback: { freq: number; amp: number },
): { freq: number; amp: number; ei: number; coh: number } {
  if (!populations) return { freq: fallback.freq, amp: fallback.amp, ei: 1, coh: 0.5 };
  const pop = populations.find((p) => p.id === channelId);
  if (!pop) return { freq: fallback.freq, amp: fallback.amp, ei: 1, coh: 0.5 };
  return { freq: pop.frequency, amp: pop.amplitude, ei: pop.ei_ratio, coh: pop.coherence };
}

function generateSample(freq: number, amp: number, phase: number): number {
  const primary = Math.sin(phase * freq * 0.1) * amp * 0.6;
  const harmonic = Math.sin(phase * freq * 0.2 + 0.7) * amp * 0.15;
  const subHarmonic = Math.sin(phase * freq * 0.05 + 1.3) * amp * 0.1;
  const noise = (Math.random() - 0.5) * amp * 0.3;
  const slowDrift = Math.sin(phase * 0.003) * amp * 0.08;
  return primary + harmonic + subHarmonic + noise + slowDrift;
}

export default function EEGDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const oscState = useLiveStore((s) => s.oscillationState);
  const oscRef = useRef(oscState);
  oscRef.current = oscState;

  const connected = useLiveStore((s) => s.eventsPerSecond > 0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#050608";
    ctx.fillRect(0, 0, w, h);

    const traceW = w - LABEL_W - 8;
    const channelH = Math.min(CHANNEL_H, (h - 30) / CHANNEL_COUNT);

    const populations = oscRef.current?.populations;

    for (let ch = 0; ch < CHANNEL_COUNT; ch++) {
      const m = MONTAGE[ch];
      const { freq, amp } = getPopulationParams(populations, m.id, { freq: m.baseFreq, amp: m.baseAmp });

      phases[ch] += 0.15;
      const sample = generateSample(freq, amp, phases[ch]);

      const buf = buffers[ch];
      buf.copyWithin(0, 1);
      buf[SAMPLES - 1] = sample;

      const yCenter = 16 + ch * channelH + channelH / 2;

      ctx.fillStyle = m.color;
      ctx.font = "bold 8px 'IBM Plex Mono', monospace";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.globalAlpha = 0.7;
      ctx.fillText(m.label, LABEL_W - 4, yCenter);
      ctx.globalAlpha = 1;

      ctx.strokeStyle = `${m.color}12`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(LABEL_W, yCenter);
      ctx.lineTo(w - 4, yCenter);
      ctx.stroke();

      ctx.beginPath();
      const halfH = channelH * 0.4;
      for (let i = 0; i < SAMPLES; i++) {
        const x = LABEL_W + (i / (SAMPLES - 1)) * traceW;
        const y = yCenter + buf[i] * halfH * 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `${m.color}18`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = connected ? m.color : `${m.color}44`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    ctx.fillStyle = "#ffffff08";
    ctx.font = "7px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const timeH = 16 + CHANNEL_COUNT * channelH + 2;
    for (let s = 0; s <= 10; s++) {
      const x = LABEL_W + (s / 10) * traceW;
      ctx.fillStyle = "#ffffff08";
      ctx.fillRect(x, 16, 0.5, CHANNEL_COUNT * channelH);
      ctx.fillStyle = "#ffffff30";
      ctx.fillText(`${s}s`, x, timeH);
    }

    const bandY = 4;
    const bands = [
      { label: "δ 0.5-4", color: "#ef444460" },
      { label: "θ 4-8", color: "#fbbf2460" },
      { label: "α 8-13", color: "#34d39960" },
      { label: "β 13-30", color: "#6366f160" },
      { label: "γ 30-100", color: "#ec489960" },
    ];
    ctx.font = "bold 7px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    let bx = LABEL_W;
    for (const band of bands) {
      ctx.fillStyle = band.color;
      ctx.fillRect(bx, bandY, 4, 4);
      ctx.fillStyle = "#ffffff40";
      ctx.fillText(band.label, bx + 6, bandY + 3);
      bx += 52;
    }

    if (!connected) {
      ctx.fillStyle = "#ffffff15";
      ctx.font = "10px 'IBM Plex Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText("AWAITING SIGNAL", w / 2, h / 2);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [connected]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <BracketFrame variant="detail-5" className="p-2 flex flex-col overflow-hidden" style={{ minHeight: 520 }}>
      <HudSectionTitle>
        EEG Monitor — {CHANNEL_COUNT}ch
        <span className="ml-auto text-[8px] font-normal" style={{ color: connected ? "#34d399" : "#525252" }}>
          {connected ? "LIVE" : "OFFLINE"}
        </span>
      </HudSectionTitle>
      <canvas
        ref={canvasRef}
        className="flex-1 w-full mt-1"
        style={{ imageRendering: "auto" }}
      />
    </BracketFrame>
  );
}
