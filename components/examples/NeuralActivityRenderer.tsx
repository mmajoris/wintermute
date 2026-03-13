"use client";

import { useRef, useEffect, useCallback } from "react";
import styles from "./NeuralActivityRenderer.module.css";

interface Bolt {
  paths: { x: number; y: number }[][];  // main + fork paths
  life: number;
  maxLife: number;
  flickerRate: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
}

const W = 300;
const H = 200;

// Fractal midpoint displacement -- produces realistic jagged lightning
function fractalLightning(
  x1: number, y1: number, x2: number, y2: number,
  generations: number, displacement: number
): { x: number; y: number }[] {
  let pts = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  for (let gen = 0; gen < generations; gen++) {
    const next: { x: number; y: number }[] = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const mx = (pts[i].x + pts[i + 1].x) / 2;
      const my = (pts[i].y + pts[i + 1].y) / 2;
      const dx = pts[i + 1].x - pts[i].x;
      const dy = pts[i + 1].y - pts[i].y;
      // Perpendicular displacement
      const px = -dy, py = dx;
      const len = Math.sqrt(px * px + py * py) || 1;
      const d = (Math.random() - 0.5) * displacement;
      next.push({ x: mx + (px / len) * d, y: my + (py / len) * d });
      next.push(pts[i + 1]);
    }
    pts = next;
    displacement *= 0.5;
  }
  return pts;
}

function useSparks(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  spawnQueueRef: React.MutableRefObject<number>,
  disableAmbient: boolean,
) {
  const boltsRef = useRef<Bolt[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const maskRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/api/assets/neuron-overlay.png";
    img.onload = () => { maskRef.current = img; };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let prev = 0;

    function spawnBolt() {
      const x1 = W * 0.1 + Math.random() * W * 0.8;
      const y1 = H * 0.1 + Math.random() * H * 0.8;
      const angle = Math.random() * Math.PI * 2;
      const dist = 20 + Math.random() * 60;
      const x2 = x1 + Math.cos(angle) * dist;
      const y2 = y1 + Math.sin(angle) * dist;

      const mainPath = fractalLightning(x1, y1, x2, y2, 5, dist * 0.3);
      const paths = [mainPath];

      // Fork branches off the main bolt
      const numForks = 1 + Math.floor(Math.random() * 3);
      for (let f = 0; f < numForks; f++) {
        const forkIdx = 2 + Math.floor(Math.random() * (mainPath.length - 4));
        const fp = mainPath[forkIdx];
        const fAngle = angle + (Math.random() - 0.5) * 2.0;
        const fLen = dist * (0.15 + Math.random() * 0.3);
        const fPath = fractalLightning(
          fp.x, fp.y,
          fp.x + Math.cos(fAngle) * fLen,
          fp.y + Math.sin(fAngle) * fLen,
          3, fLen * 0.35
        );
        paths.push(fPath);
      }

      // Emit particles at both endpoints
      const pts = particlesRef.current;
      for (let i = 0; i < 6; i++) {
        pts.push({ x: x1, y: y1, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, life: 1 });
        pts.push({ x: x2, y: y2, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, life: 1 });
      }

      boltsRef.current.push({
        paths,
        life: 0,
        maxLife: 0.3 + Math.random() * 0.5,
        flickerRate: 20 + Math.random() * 40,
      });
    }

    function drawPath(path: { x: number; y: number }[], alpha: number, lineWidth: number, color: string) {
      if (!ctx || path.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    const frame = (time: number) => {
      const t = time / 1000;
      const dt = prev ? t - prev : 0.016;
      prev = t;

      ctx.clearRect(0, 0, W, H);

      // Drain spawn queue (fed by onFire callback)
      if (spawnQueueRef.current > 0) {
        spawnBolt();
        spawnQueueRef.current--;
      }

      // Ambient random spawns only in standalone mode
      if (!disableAmbient && t - lastSpawnRef.current > 0.5 + Math.random() * 1.5) {
        spawnBolt();
        if (Math.random() < 0.25) spawnBolt();
        lastSpawnRef.current = t;
      }

      // Draw bolts
      const bolts = boltsRef.current;
      let bw = 0;
      for (let i = 0; i < bolts.length; i++) {
        const b = bolts[i];
        b.life += dt;
        if (b.life >= b.maxLife) continue;
        bolts[bw++] = b;

        const progress = b.life / b.maxLife;
        // Fast ramp-up, slow decay
        const fade = progress < 0.1 ? progress / 0.1 : (1 - progress) * (1 - progress);
        // Realistic flicker
        const flicker = Math.random() < 0.12 ? 0.2 : 1.0;
        const alpha = fade * flicker;

        for (let pi = 0; pi < b.paths.length; pi++) {
          const path = b.paths[pi];
          const isFork = pi > 0;
          const forkFade = isFork ? 0.5 : 1.0;

          // Outer glow
          ctx.shadowColor = `rgba(255,80,10,${alpha * forkFade})`;
          ctx.shadowBlur = 18;
          drawPath(path, alpha, (isFork ? 3 : 4.5) * fade, `rgba(255,100,15,${alpha * 0.5 * forkFade})`);

          // Bright core
          ctx.shadowColor = `rgba(255,180,50,${alpha * forkFade})`;
          ctx.shadowBlur = 8;
          drawPath(path, alpha, (isFork ? 1 : 1.8) * fade, `rgba(255,230,120,${alpha * 0.9 * forkFade})`);
        }

        // Flash glow at start/end of main path
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        const main = b.paths[0];
        for (const pt of [main[0], main[main.length - 1]]) {
          const flashR = 10 + Math.random() * 4;
          const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, flashR * alpha);
          g.addColorStop(0, `rgba(255,230,140,${alpha * 0.8})`);
          g.addColorStop(0.3, `rgba(255,160,50,${alpha * 0.4})`);
          g.addColorStop(1, "rgba(255,60,10,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, flashR * alpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      bolts.length = bw;

      // Update & draw particles
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      const pts = particlesRef.current;
      let pw = 0;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.life -= dt * 2.5;
        if (p.life <= 0) continue;
        pts[pw++] = p;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        const pa = p.life * p.life;
        ctx.fillStyle = `rgba(255,180,60,${pa * 0.9})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + pa, 0, Math.PI * 2);
        ctx.fill();
      }
      pts.length = pw;

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
  }, [canvasRef, spawnQueueRef, disableAmbient]);
}

export default function NeuralActivityRenderer({ onSubscribe }: { onSubscribe?: (fire: () => void) => (() => void) }) {
  const sparksCanvasRef = useRef<HTMLCanvasElement>(null);
  const spawnQueueRef = useRef(0);
  const disableAmbient = onSubscribe !== undefined;

  const fire = useCallback(() => {
    spawnQueueRef.current++;
  }, []);

  useEffect(() => {
    if (!onSubscribe) return;
    return onSubscribe(fire);
  }, [onSubscribe, fire]);

  useSparks(sparksCanvasRef, spawnQueueRef, disableAmbient);

  return (
    <div className={styles.container}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="neuron-warp">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={3} seed={2} result="noise">
              <animate attributeName="baseFrequency" values="0.014;0.018;0.012;0.016;0.014" dur="25s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="8;13;7;11;8" dur="18s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* Base image */}
      <div className={`${styles.layer} ${styles.sway}`} style={{ filter: "url(#neuron-warp) brightness(1.4)", opacity: 0.55, zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/api/assets/neuron-overlay.png" alt="" className={styles.img} />
      </div>

      {/* Orange sparks -- masked to neuron alpha */}
      <canvas ref={sparksCanvasRef} width={W} height={H} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} />

      {/* Drift layer */}
      <div className={`${styles.layer} ${styles.drift}`} style={{ opacity: 0.15, mixBlendMode: "screen", filter: "brightness(1.6)", zIndex: 3 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/api/assets/neuron-overlay.png" alt="" className={styles.img} />
      </div>

      {/* Breathe glow */}
      <div className={`${styles.layer} ${styles.breathe}`} style={{ opacity: 0.08, mixBlendMode: "screen", filter: "brightness(1.6)", zIndex: 4 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/api/assets/neuron-overlay.png" alt="" className={styles.imgBlur} />
      </div>

      {/* Vignette */}
      <div className={styles.vignette} style={{ zIndex: 5 }} />
    </div>
  );
}
