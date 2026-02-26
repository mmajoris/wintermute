"use client";

import { useRef, useEffect } from "react";
import styles from "./NeuralActivityRenderer.module.css";

interface Spark {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  branches: { dx: number; dy: number; len: number }[];
}

const W = 300;
const H = 200;

function useSparks(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const sparksRef = useRef<Spark[]>([]);
  const lastSpawnRef = useRef(0);
  const maskRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/neuron-overlay.png";
    img.onload = () => { maskRef.current = img; };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let prev = 0;

    const frame = (time: number) => {
      const t = time / 1000;
      const dt = prev ? t - prev : 0.016;
      prev = t;

      ctx.clearRect(0, 0, W, H);

      // Spawn
      if (t - lastSpawnRef.current > 0.3 + Math.random() * 0.8) {
        for (let n = 0; n < 1 + Math.floor(Math.random() * 3); n++) {
          const x = W * 0.1 + Math.random() * W * 0.8;
          const y = H * 0.1 + Math.random() * H * 0.8;
          const bc = 3 + Math.floor(Math.random() * 5);
          const branches: Spark["branches"] = [];
          for (let i = 0; i < bc; i++) {
            const a = Math.random() * Math.PI * 2;
            branches.push({ dx: Math.cos(a), dy: Math.sin(a), len: 12 + Math.random() * 30 });
          }
          sparksRef.current.push({ x, y, life: 0, maxLife: 0.25 + Math.random() * 0.4, branches });
        }
        lastSpawnRef.current = t;
      }

      // Draw sparks
      const sparks = sparksRef.current;
      let w = 0;
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.maxLife) continue;
        sparks[w++] = s;

        const p = s.life / s.maxLife;
        const alpha = Math.min(1, p * 10) * (1 - p * p);

        for (const b of s.branches) {
          const segs = 4;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          for (let seg = 1; seg <= segs; seg++) {
            const f = seg / segs;
            ctx.lineTo(
              s.x + b.dx * b.len * f + (Math.random() - 0.5) * (1 - f) * 6,
              s.y + b.dy * b.len * f + (Math.random() - 0.5) * (1 - f) * 6
            );
          }

          // Glow
          ctx.shadowColor = `rgba(255,100,10,${alpha})`;
          ctx.shadowBlur = 20;
          ctx.strokeStyle = `rgba(255,120,20,${alpha * 0.5})`;
          ctx.lineWidth = 4 * (1 - p);
          ctx.stroke();

          // Core
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(255,200,60,${alpha})`;
          ctx.strokeStyle = `rgba(255,220,100,${alpha * 0.9})`;
          ctx.lineWidth = 1.5 * (1 - p);
          ctx.stroke();
        }

        // Center glow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        const r = 8 + Math.random() * 6;
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * alpha);
        g.addColorStop(0, `rgba(255,230,130,${alpha * 0.8})`);
        g.addColorStop(0.4, `rgba(255,150,40,${alpha * 0.4})`);
        g.addColorStop(1, "rgba(255,60,10,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * alpha, 0, Math.PI * 2);
        ctx.fill();
      }
      sparks.length = w;

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Mask to neuron shape
      if (maskRef.current) {
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(maskRef.current, 0, 0, W, H);
        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [canvasRef]);
}

export default function NeuralActivityRenderer() {
  const sparksCanvasRef = useRef<HTMLCanvasElement>(null);
  useSparks(sparksCanvasRef);

  return (
    <div className={styles.container}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="neuron-warp">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={3} seed={2} result="noise">
              <animate attributeName="baseFrequency" values="0.015;0.02;0.012;0.018;0.015" dur="30s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="10;16;8;14;10" dur="20s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* Base image */}
      <div className={styles.layer} style={{ filter: "url(#neuron-warp)", zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/neuron-overlay.png" alt="" className={styles.img} />
      </div>

      {/* Orange sparks -- masked to neuron alpha */}
      <canvas ref={sparksCanvasRef} width={W} height={H} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} />

      {/* Drift layer */}
      <div className={`${styles.layer} ${styles.drift}`} style={{ opacity: 0.25, mixBlendMode: "screen", zIndex: 3 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/neuron-overlay.png" alt="" className={styles.img} />
      </div>

      {/* Breathe glow */}
      <div className={`${styles.layer} ${styles.breathe}`} style={{ opacity: 0.12, mixBlendMode: "screen", zIndex: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/neuron-overlay.png" alt="" className={styles.imgBlur} />
      </div>

      {/* Vignette */}
      <div className={styles.vignette} style={{ zIndex: 5 }} />
    </div>
  );
}
