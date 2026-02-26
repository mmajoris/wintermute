"use client";

import React, { useRef, useState, useEffect } from "react";
import { useHudColor } from "./hud-theme";

function useDims(ref: React.RefObject<HTMLDivElement | null>) {
  const [dims, setDims] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setDims({ w: el.offsetWidth, h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return dims;
}

type C = (alpha: number) => string;
type SvgRenderer = (w: number, h: number, c: C) => React.ReactNode;

// ─── Variant renderers ──────────────────────────────────────────────

const chamfered: SvgRenderer = (w, h, c) => {
  const CH = 12, TL = 6;
  return <>
    <path d={`M ${CH},0 L ${w-CH},0 L ${w},${CH} L ${w},${h-CH} L ${w-CH},${h} L ${CH},${h} L 0,${h-CH} L 0,${CH} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    {[`M 0,${CH+TL} L 0,${CH} L ${CH},0 L ${CH+TL},0`,`M ${w-CH-TL},0 L ${w-CH},0 L ${w},${CH} L ${w},${CH+TL}`,`M ${w},${h-CH-TL} L ${w},${h-CH} L ${w-CH},${h} L ${w-CH-TL},${h}`,`M ${CH+TL},${h} L ${CH},${h} L 0,${h-CH} L 0,${h-CH-TL}`].map((d, i) => <path key={i} d={d} fill="none" stroke={c(0.55)} strokeWidth="1.5" strokeLinecap="square" />)}
  </>;
};

const notched: SvgRenderer = (w, h, c) => {
  const N = 6;
  return <>
    <path d={`M ${N},0 L ${w-N},0 L ${w-N},${N} L ${w},${N} L ${w},${h-N} L ${w-N},${h-N} L ${w-N},${h} L ${N},${h} L ${N},${h-N} L 0,${h-N} L 0,${N} L ${N},${N} Z`} fill="none" stroke={c(0.28)} strokeWidth="1" />
    {[`M ${N},0 L ${N},${N} L 0,${N}`,`M ${w-N},0 L ${w-N},${N} L ${w},${N}`,`M ${w},${h-N} L ${w-N},${h-N} L ${w-N},${h}`,`M 0,${h-N} L ${N},${h-N} L ${N},${h}`].map((d, i) => <path key={i} d={d} fill="none" stroke={c(0.6)} strokeWidth="1.5" />)}
  </>;
};

const stepped: SvgRenderer = (w, h, c) => {
  const B = 30;
  return <>
    <rect x="0.5" y="0.5" width={w-1} height={h-1} fill="none" stroke={c(0.1)} strokeWidth="1" />
    <line x1="0" y1="0.5" x2={B} y2="0.5" stroke={c(0.6)} strokeWidth="1.5" />
    <line x1="0.5" y1="0" x2="0.5" y2={B} stroke={c(0.6)} strokeWidth="1.5" />
    <line x1={w} y1="0.5" x2={w-B} y2="0.5" stroke={c(0.6)} strokeWidth="1.5" />
    <line x1={w-0.5} y1="0" x2={w-0.5} y2={B} stroke={c(0.6)} strokeWidth="1.5" />
    <line x1={w} y1={h-0.5} x2={w-B} y2={h-0.5} stroke={c(0.6)} strokeWidth="1.5" />
    <line x1={w-0.5} y1={h} x2={w-0.5} y2={h-B} stroke={c(0.6)} strokeWidth="1.5" />
    <line x1="0" y1={h-0.5} x2={B} y2={h-0.5} stroke={c(0.6)} strokeWidth="1.5" />
    <line x1="0.5" y1={h} x2="0.5" y2={h-B} stroke={c(0.6)} strokeWidth="1.5" />
    {[4,8].map(o => <React.Fragment key={o}><line x1={B-o} y1="0" x2={B-o} y2="3" stroke={c(0.35)} strokeWidth="0.5" /><line x1={w-B+o} y1="0" x2={w-B+o} y2="3" stroke={c(0.35)} strokeWidth="0.5" /><line x1={B-o} y1={h} x2={B-o} y2={h-3} stroke={c(0.35)} strokeWidth="0.5" /><line x1={w-B+o} y1={h} x2={w-B+o} y2={h-3} stroke={c(0.35)} strokeWidth="0.5" /></React.Fragment>)}
  </>;
};

const asymmetric: SvgRenderer = (w, h, c) => {
  const CH = 14;
  return <>
    <path d={`M ${CH},0 L ${w},0 L ${w},${h-CH} L ${w-CH},${h} L 0,${h} L 0,${CH} Z`} fill="none" stroke={c(0.25)} strokeWidth="1" />
    <path d={`M 0,${CH+8} L 0,${CH} L ${CH},0 L ${CH+8},0`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CH-8} L ${w},${h-CH} L ${w-CH},${h} L ${w-CH-8},${h}`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
  </>;
};

const gapBreaks: SvgRenderer = (w, h, c) => {
  const G = 20;
  return <>
    <line x1="0" y1="0.5" x2={w/2-G} y2="0.5" stroke={c(0.3)} strokeWidth="1" /><line x1={w/2+G} y1="0.5" x2={w} y2="0.5" stroke={c(0.3)} strokeWidth="1" />
    <line x1="0" y1={h-0.5} x2={w/2-G} y2={h-0.5} stroke={c(0.3)} strokeWidth="1" /><line x1={w/2+G} y1={h-0.5} x2={w} y2={h-0.5} stroke={c(0.3)} strokeWidth="1" />
    <line x1="0.5" y1="0" x2="0.5" y2={h/2-G} stroke={c(0.3)} strokeWidth="1" /><line x1="0.5" y1={h/2+G} x2="0.5" y2={h} stroke={c(0.3)} strokeWidth="1" />
    <line x1={w-0.5} y1="0" x2={w-0.5} y2={h/2-G} stroke={c(0.3)} strokeWidth="1" /><line x1={w-0.5} y1={h/2+G} x2={w-0.5} y2={h} stroke={c(0.3)} strokeWidth="1" />
    {[[2,2],[w-2,2],[w-2,h-2],[2,h-2]].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r="1.5" fill={c(0.5)} />)}
  </>;
};

const topAccent: SvgRenderer = (w, h, c) => <>
  <rect x="0.5" y="0.5" width={w-1} height={h-1} fill="none" stroke={c(0.15)} strokeWidth="1" />
  <line x1="0" y1="0" x2={w*0.4} y2="0" stroke={c(0.7)} strokeWidth="2" />
  <circle cx={w*0.4} cy="0" r="2" fill={c(0.7)} />
</>;

const hexagonal: SvgRenderer = (w, h, c) => {
  const S = 16;
  return <>
    <path d={`M ${S},0 L ${w-S},0 L ${w},${h/2} L ${w-S},${h} L ${S},${h} L 0,${h/2} Z`} fill="none" stroke={c(0.25)} strokeWidth="1" />
    <circle cx={0} cy={h/2} r="2" fill={c(0.5)} /><circle cx={w} cy={h/2} r="2" fill={c(0.5)} />
    <line x1={S} y1="0" x2={S+10} y2="0" stroke={c(0.5)} strokeWidth="1.5" /><line x1={w-S} y1="0" x2={w-S-10} y2="0" stroke={c(0.5)} strokeWidth="1.5" />
    <line x1={S} y1={h} x2={S+10} y2={h} stroke={c(0.5)} strokeWidth="1.5" /><line x1={w-S} y1={h} x2={w-S-10} y2={h} stroke={c(0.5)} strokeWidth="1.5" />
  </>;
};

const crosshair: SvgRenderer = (w, h, c) => {
  const S = 8;
  return <>
    <rect x="0.5" y="0.5" width={w-1} height={h-1} fill="none" stroke={c(0.12)} strokeWidth="1" />
    {[[0,0],[w,0],[w,h],[0,h]].map(([cx,cy], i) => <g key={i}><line x1={cx-S} y1={cy} x2={cx+S} y2={cy} stroke={c(0.55)} strokeWidth="1" /><line x1={cx} y1={cy-S} x2={cx} y2={cy+S} stroke={c(0.55)} strokeWidth="1" /></g>)}
  </>;
};

const heavyChamfer: SvgRenderer = (w, h, c) => {
  const CH = 18;
  return <>
    <path d={`M ${CH},0 L ${w-CH},0 L ${w},${CH} L ${w},${h-CH} L ${w-CH},${h} L ${CH},${h} L 0,${h-CH} L 0,${CH} Z`} fill="none" stroke={c(0.18)} strokeWidth="1" />
    <line x1="0" y1={CH} x2={CH} y2="0" stroke={c(0.7)} strokeWidth="2" /><line x1={w-CH} y1="0" x2={w} y2={CH} stroke={c(0.7)} strokeWidth="2" />
    <line x1={w} y1={h-CH} x2={w-CH} y2={h} stroke={c(0.7)} strokeWidth="2" /><line x1={CH} y1={h} x2="0" y2={h-CH} stroke={c(0.7)} strokeWidth="2" />
  </>;
};

const dashedSquares: SvgRenderer = (w, h, c) => {
  const S = 4;
  return <>
    <rect x="0.5" y="0.5" width={w-1} height={h-1} fill="none" stroke={c(0.2)} strokeWidth="1" strokeDasharray="4,3" />
    {[[0,0],[w-S,0],[w-S,h-S],[0,h-S]].map(([x,y], i) => <rect key={i} x={x} y={y} width={S} height={S} fill={c(0.45)} />)}
  </>;
};

const comboA: SvgRenderer = (w, h, c) => {
  const CH = 14, S = 4;
  return <>
    <path d={`M ${CH},0 L ${w},0 L ${w},${h-CH} L ${w-CH},${h} L 0,${h} L 0,${CH} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    <path d={`M 0,${CH+8} L 0,${CH} L ${CH},0 L ${CH+8},0`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CH-8} L ${w},${h-CH} L ${w-CH},${h} L ${w-CH-8},${h}`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <rect x="6" y="6" width={w-12} height={h-12} fill="none" stroke={c(0.1)} strokeWidth="0.5" strokeDasharray="3,4" />
    <circle cx={0} cy={h/2} r="2" fill={c(0.45)} /><circle cx={w} cy={h/2} r="2" fill={c(0.45)} />
    <rect x={w-S} y="0" width={S} height={S} fill={c(0.4)} /><rect x="0" y={h-S} width={S} height={S} fill={c(0.4)} />
  </>;
};

const comboB: SvgRenderer = (w, h, c) => {
  const CO = 14, CI = 8, M = 7, S = 4;
  return <>
    <path d={`M ${CO},0 L ${w},0 L ${w},${h-CO} L ${w-CO},${h} L 0,${h} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    <path d={`M 0,${CO+8} L 0,${CO} L ${CO},0 L ${CO+8},0`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CO-8} L ${w},${h-CO} L ${w-CO},${h} L ${w-CO-8},${h}`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${M+CI},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${M+CI} Z`} fill="none" stroke={c(0.1)} strokeWidth="0.5" />
    {[`M ${M},${M+CI+4} L ${M},${M+CI} L ${M+CI},${M} L ${M+CI+4},${M}`,`M ${w-M-CI-4},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${M+CI+4}`,`M ${w-M},${h-M-CI-4} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${w-M-CI-4},${h-M}`,`M ${M+CI+4},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${h-M-CI-4}`].map((d, i) => <path key={i} d={d} fill="none" stroke={c(0.35)} strokeWidth="0.5" />)}
    <line x1={CO+8} y1="0" x2={w*0.5} y2="0" stroke={c(0.55)} strokeWidth="2" /><circle cx={w*0.5} cy="0" r="1.5" fill={c(0.5)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    <rect x={w-S} y="0" width={S} height={S} fill={c(0.35)} /><rect x="0" y={h-S} width={S} height={S} fill={c(0.35)} />
  </>;
};

const comboC: SvgRenderer = (w, h, c) => {
  const CO = 12, CI = 8, M = 6, S = 4;
  return <>
    <path d={`M ${CO},0 L ${w-CO},0 L ${w},${CO} L ${w},${h-CO} L ${w-CO},${h} L ${CO},${h} L 0,${h-CO} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    {[`M 0,${CO+6} L 0,${CO} L ${CO},0 L ${CO+6},0`,`M ${w-CO-6},0 L ${w-CO},0 L ${w},${CO} L ${w},${CO+6}`,`M ${w},${h-CO-6} L ${w},${h-CO} L ${w-CO},${h} L ${w-CO-6},${h}`,`M ${CO+6},${h} L ${CO},${h} L 0,${h-CO} L 0,${h-CO-6}`].map((d, i) => <path key={i} d={d} fill="none" stroke={c(0.55)} strokeWidth="1.5" strokeLinecap="square" />)}
    <path d={`M ${M+CI},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${M+CI} Z`} fill="none" stroke={c(0.1)} strokeWidth="0.5" strokeDasharray="3,4" />
    {[[M+CI,M],[w-M-CI,M],[w-M,M+CI],[w-M,h-M-CI],[w-M-CI,h-M],[M+CI,h-M],[M,h-M-CI],[M,M+CI]].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r="1.5" fill={c(0.35)} />)}
    <line x1={CO+6} y1="0" x2={w*0.45} y2="0" stroke={c(0.5)} strokeWidth="2" /><circle cx={w*0.45} cy="0" r="1.5" fill={c(0.45)} />
    <line x1={w-CO-6} y1={h} x2={w*0.55} y2={h} stroke={c(0.4)} strokeWidth="1.5" /><circle cx={w*0.55} cy={h} r="1.5" fill={c(0.35)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    <rect x={M} y={M} width={S} height={S} fill={c(0.25)} /><rect x={w-M-S} y={M} width={S} height={S} fill={c(0.25)} />
    <rect x={w-M-S} y={h-M-S} width={S} height={S} fill={c(0.25)} /><rect x={M} y={h-M-S} width={S} height={S} fill={c(0.25)} />
  </>;
};

const comboD: SvgRenderer = (w, h, c) => {
  const CH = 12;
  return <>
    <path d={`M ${CH},0 L ${w-CH},0 L ${w},${CH} L ${w},${h-CH} L ${w-CH},${h} L ${CH},${h} L 0,${h-CH} L 0,${CH} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    {[`M 0,${CH+6} L 0,${CH} L ${CH},0 L ${CH+6},0`,`M ${w-CH-6},0 L ${w-CH},0 L ${w},${CH} L ${w},${CH+6}`,`M ${w},${h-CH-6} L ${w},${h-CH} L ${w-CH},${h} L ${w-CH-6},${h}`,`M ${CH+6},${h} L ${CH},${h} L 0,${h-CH} L 0,${h-CH-6}`].map((d, i) => <path key={i} d={d} fill="none" stroke={c(0.5)} strokeWidth="1.5" strokeLinecap="square" />)}
    <rect x="5" y="5" width={w-10} height={h-10} fill="none" stroke={c(0.08)} strokeWidth="0.5" />
    <rect x="8" y="8" width={w-16} height={h-16} fill="none" stroke={c(0.05)} strokeWidth="0.5" strokeDasharray="2,4" />
    {[[5,5],[w-5,5],[w-5,h-5],[5,h-5]].map(([cx,cy], i) => <circle key={i} cx={cx} cy={cy} r="1.5" fill={c(0.4)} />)}
  </>;
};

const comboE: SvgRenderer = (w, h, c) => {
  const CH = 14, S = 5, XH = 6;
  return <>
    <path d={`M ${CH},0 L ${w},0 L ${w},${h-CH} L ${w-CH},${h} L 0,${h} L 0,${CH} Z`} fill="none" stroke={c(0.2)} strokeWidth="1" />
    <path d={`M 0,${CH+8} L 0,${CH} L ${CH},0 L ${CH+8},0`} fill="none" stroke={c(0.55)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CH-8} L ${w},${h-CH} L ${w-CH},${h} L ${w-CH-8},${h}`} fill="none" stroke={c(0.55)} strokeWidth="1.5" />
    <line x1={CH+8} y1="0" x2={w*0.6} y2="0" stroke={c(0.6)} strokeWidth="2" /><circle cx={w*0.6} cy="0" r="1.5" fill={c(0.55)} />
    <line x1={w-CH-8} y1={h} x2={w*0.45} y2={h} stroke={c(0.5)} strokeWidth="1.5" /><circle cx={w*0.45} cy={h} r="1.5" fill={c(0.45)} />
    {[[w,0],[0,h]].map(([cx,cy], i) => <g key={i}><line x1={cx-XH} y1={cy} x2={cx+XH} y2={cy} stroke={c(0.35)} strokeWidth="0.5" /><line x1={cx} y1={cy-XH} x2={cx} y2={cy+XH} stroke={c(0.35)} strokeWidth="0.5" /></g>)}
    <rect x={w-S} y="0" width={S} height={S} fill={c(0.35)} /><rect x="0" y={h-S} width={S} height={S} fill={c(0.35)} />
  </>;
};

const detail1: SvgRenderer = (w, h, c) => {
  const CO = 14, CI = 8, M = 8, S = 4, XH = 5;
  return <>
    <path d={`M ${CO},0 L ${w},0 L ${w},${h-CO} L ${w-CO},${h} L 0,${h} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    <path d={`M 0,${CO+8} L 0,${CO} L ${CO},0 L ${CO+8},0`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CO-8} L ${w},${h-CO} L ${w-CO},${h} L ${w-CO-8},${h}`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${M+CI},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${M+CI} Z`} fill="none" stroke={c(0.1)} strokeWidth="0.5" />
    {[`M ${M},${M+CI+4} L ${M},${M+CI} L ${M+CI},${M} L ${M+CI+4},${M}`,`M ${w-M-CI-4},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${M+CI+4}`,`M ${w-M},${h-M-CI-4} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${w-M-CI-4},${h-M}`,`M ${M+CI+4},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${h-M-CI-4}`].map((d, i) => <path key={`it${i}`} d={d} fill="none" stroke={c(0.3)} strokeWidth="0.5" />)}
    <line x1={CO+8} y1="0" x2={w*0.55} y2="0" stroke={c(0.55)} strokeWidth="2" /><circle cx={w*0.55} cy="0" r="1.5" fill={c(0.5)} />
    <line x1={w-CO-8} y1={h} x2={w*0.5} y2={h} stroke={c(0.4)} strokeWidth="1.5" /><circle cx={w*0.5} cy={h} r="1.5" fill={c(0.35)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    {[[w,0],[0,h]].map(([cx,cy], i) => <g key={`xh${i}`}><line x1={cx-XH} y1={cy} x2={cx+XH} y2={cy} stroke={c(0.3)} strokeWidth="0.5" /><line x1={cx} y1={cy-XH} x2={cx} y2={cy+XH} stroke={c(0.3)} strokeWidth="0.5" /></g>)}
    <rect x={w-S} y="0" width={S} height={S} fill={c(0.35)} /><rect x="0" y={h-S} width={S} height={S} fill={c(0.35)} />
    {[[M,M+CI],[M+CI,M],[w-M-CI,M],[w-M,M+CI],[w-M,h-M-CI],[w-M-CI,h-M],[M+CI,h-M],[M,h-M-CI]].map(([cx,cy], i) => <circle key={`cd${i}`} cx={cx} cy={cy} r="1" fill={c(0.35)} />)}
    {[0.2,0.35,0.7,0.85].map(p => <line key={`t${p}`} x1={w*p} y1="0" x2={w*p} y2="3" stroke={c(0.2)} strokeWidth="0.5" />)}
  </>;
};

const detail2: SvgRenderer = (w, h, c) => {
  const CO = 12, CI = 6, M = 7, S = 4;
  return <>
    <path d={`M ${CO},0 L ${w-CO},0 L ${w},${CO} L ${w},${h-CO} L ${w-CO},${h} L ${CO},${h} L 0,${h-CO} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    {[`M 0,${CO} L ${CO},0`,`M ${w-CO},0 L ${w},${CO}`,`M ${w},${h-CO} L ${w-CO},${h}`,`M ${CO},${h} L 0,${h-CO}`].map((d, i) => <path key={`od${i}`} d={d} fill="none" stroke={c(0.6)} strokeWidth="1.5" />)}
    {[`M 0,${CO+6} L 0,${CO}`,`M ${CO},0 L ${CO+6},0`,`M ${w-CO-6},0 L ${w-CO},0`,`M ${w},${CO} L ${w},${CO+6}`,`M ${w},${h-CO-6} L ${w},${h-CO}`,`M ${w-CO},${h} L ${w-CO-6},${h}`,`M ${CO+6},${h} L ${CO},${h}`,`M 0,${h-CO} L 0,${h-CO-6}`].map((d, i) => <path key={`ot${i}`} d={d} fill="none" stroke={c(0.45)} strokeWidth="1" />)}
    <path d={`M ${M+CI},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${M+CI} Z`} fill="none" stroke={c(0.1)} strokeWidth="0.5" strokeDasharray="3,4" />
    {[[M+CI,M],[w-M-CI,M],[w-M,M+CI],[w-M,h-M-CI],[w-M-CI,h-M],[M+CI,h-M],[M,h-M-CI],[M,M+CI]].map(([cx,cy], i) => <circle key={`id${i}`} cx={cx} cy={cy} r="1.5" fill={c(0.35)} />)}
    <line x1={CO+6} y1="0" x2={w*0.5} y2="0" stroke={c(0.55)} strokeWidth="2" /><circle cx={w*0.5} cy="0" r="1.5" fill={c(0.5)} />
    <line x1={w-CO-6} y1={h} x2={w*0.55} y2={h} stroke={c(0.45)} strokeWidth="1.5" /><circle cx={w*0.55} cy={h} r="1.5" fill={c(0.4)} />
    <line x1="0" y1={CO+6} x2="0" y2={h*0.35} stroke={c(0.45)} strokeWidth="1.5" /><circle cx="0" cy={h*0.35} r="1.5" fill={c(0.4)} />
    <line x1={w} y1={h-CO-6} x2={w} y2={h*0.6} stroke={c(0.4)} strokeWidth="1.5" /><circle cx={w} cy={h*0.6} r="1.5" fill={c(0.35)} />
    <rect x={M} y={M} width={S} height={S} fill={c(0.25)} /><rect x={w-M-S} y={M} width={S} height={S} fill={c(0.25)} />
    <rect x={w-M-S} y={h-M-S} width={S} height={S} fill={c(0.25)} /><rect x={M} y={h-M-S} width={S} height={S} fill={c(0.25)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    <circle cx={w/2} cy="0" r="1" fill={c(0.25)} /><circle cx={w/2} cy={h} r="1" fill={c(0.25)} />
    {[0.25,0.75].map(p => <React.Fragment key={`e${p}`}><line x1={w*p} y1="0" x2={w*p} y2="3" stroke={c(0.2)} strokeWidth="0.5" /><line x1={w*p} y1={h} x2={w*p} y2={h-3} stroke={c(0.2)} strokeWidth="0.5" /><line x1="0" y1={h*p} x2="3" y2={h*p} stroke={c(0.2)} strokeWidth="0.5" /><line x1={w} y1={h*p} x2={w-3} y2={h*p} stroke={c(0.2)} strokeWidth="0.5" /></React.Fragment>)}
  </>;
};

const detail3: SvgRenderer = (w, h, c) => {
  const CO = 14, M1 = 6, M2 = 10, CI = 7, S = 4, XH = 5;
  return <>
    <path d={`M ${CO},0 L ${w},0 L ${w},${h-CO} L ${w-CO},${h} L 0,${h} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    <path d={`M 0,${CO+8} L 0,${CO} L ${CO},0 L ${CO+8},0`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CO-8} L ${w},${h-CO} L ${w-CO},${h} L ${w-CO-8},${h}`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <rect x={M1} y={M1} width={w-M1*2} height={h-M1*2} fill="none" stroke={c(0.08)} strokeWidth="0.5" />
    <path d={`M ${M2+CI},${M2} L ${w-M2-CI},${M2} L ${w-M2},${M2+CI} L ${w-M2},${h-M2-CI} L ${w-M2-CI},${h-M2} L ${M2+CI},${h-M2} L ${M2},${h-M2-CI} L ${M2},${M2+CI} Z`} fill="none" stroke={c(0.08)} strokeWidth="0.5" strokeDasharray="2,3" />
    {[[M2+CI,M2],[w-M2-CI,M2],[w-M2,M2+CI],[w-M2,h-M2-CI],[w-M2-CI,h-M2],[M2+CI,h-M2],[M2,h-M2-CI],[M2,M2+CI]].map(([cx,cy], i) => <circle key={`d${i}`} cx={cx} cy={cy} r="1" fill={c(0.3)} />)}
    <line x1={CO+8} y1="0" x2={w*0.6} y2="0" stroke={c(0.55)} strokeWidth="2" /><circle cx={w*0.6} cy="0" r="1.5" fill={c(0.5)} />
    <line x1={w-CO-8} y1={h} x2={w*0.45} y2={h} stroke={c(0.45)} strokeWidth="1.5" /><circle cx={w*0.45} cy={h} r="1.5" fill={c(0.4)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    {[[w,0],[0,h]].map(([cx,cy], i) => <g key={`x${i}`}><line x1={cx-XH} y1={cy} x2={cx+XH} y2={cy} stroke={c(0.3)} strokeWidth="0.5" /><line x1={cx} y1={cy-XH} x2={cx} y2={cy+XH} stroke={c(0.3)} strokeWidth="0.5" /></g>)}
    <rect x={w-S} y="0" width={S} height={S} fill={c(0.35)} /><rect x="0" y={h-S} width={S} height={S} fill={c(0.35)} />
    {[[M1,M1],[w-M1,M1],[w-M1,h-M1],[M1,h-M1]].map(([cx,cy], i) => <circle key={`c${i}`} cx={cx} cy={cy} r="1.5" fill={c(0.3)} />)}
    {[0.2,0.4,0.6,0.8].map(p => <React.Fragment key={`t${p}`}><line x1={w*p} y1="0" x2={w*p} y2="2.5" stroke={c(0.18)} strokeWidth="0.5" /><line x1={w*p} y1={h} x2={w*p} y2={h-2.5} stroke={c(0.18)} strokeWidth="0.5" /></React.Fragment>)}
    {[0.3,0.7].map(p => <React.Fragment key={`s${p}`}><line x1="0" y1={h*p} x2="2.5" y2={h*p} stroke={c(0.18)} strokeWidth="0.5" /><line x1={w} y1={h*p} x2={w-2.5} y2={h*p} stroke={c(0.18)} strokeWidth="0.5" /></React.Fragment>)}
  </>;
};

const detail4: SvgRenderer = (w, h, c) => {
  const CO = 12, CI = 8, M = 8, S = 4;
  return <>
    <path d={`M ${CO},0 L ${w-CO},0 L ${w},${CO} L ${w},${h-CO} L ${w-CO},${h} L ${CO},${h} L 0,${h-CO} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    <line x1="0" y1={CO} x2={CO} y2="0" stroke={c(0.65)} strokeWidth="2" /><line x1={w-CO} y1="0" x2={w} y2={CO} stroke={c(0.65)} strokeWidth="2" />
    <line x1={w} y1={h-CO} x2={w-CO} y2={h} stroke={c(0.65)} strokeWidth="2" /><line x1={CO} y1={h} x2="0" y2={h-CO} stroke={c(0.65)} strokeWidth="2" />
    {[`M 0,${CO+6} L 0,${CO}`,`M ${CO},0 L ${CO+6},0`,`M ${w-CO-6},0 L ${w-CO},0`,`M ${w},${CO} L ${w},${CO+6}`,`M ${w},${h-CO-6} L ${w},${h-CO}`,`M ${w-CO},${h} L ${w-CO-6},${h}`,`M ${CO+6},${h} L ${CO},${h}`,`M 0,${h-CO} L 0,${h-CO-6}`].map((d, i) => <path key={`ot${i}`} d={d} fill="none" stroke={c(0.45)} strokeWidth="1" />)}
    <path d={`M ${M+CI},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${M+CI} Z`} fill="none" stroke={c(0.1)} strokeWidth="0.5" />
    {[`M ${M},${M+CI+4} L ${M},${M+CI} L ${M+CI},${M} L ${M+CI+4},${M}`,`M ${w-M-CI-4},${M} L ${w-M-CI},${M} L ${w-M},${M+CI} L ${w-M},${M+CI+4}`,`M ${w-M},${h-M-CI-4} L ${w-M},${h-M-CI} L ${w-M-CI},${h-M} L ${w-M-CI-4},${h-M}`,`M ${M+CI+4},${h-M} L ${M+CI},${h-M} L ${M},${h-M-CI} L ${M},${h-M-CI-4}`].map((d, i) => <path key={`it${i}`} d={d} fill="none" stroke={c(0.3)} strokeWidth="0.5" />)}
    <line x1={CO+6} y1="0" x2={w*0.45} y2="0" stroke={c(0.5)} strokeWidth="2" /><circle cx={w*0.45} cy="0" r="1.5" fill={c(0.45)} />
    <line x1={w-CO-6} y1={h} x2={w*0.6} y2={h} stroke={c(0.4)} strokeWidth="1.5" /><circle cx={w*0.6} cy={h} r="1.5" fill={c(0.35)} />
    <line x1="0" y1={CO+6} x2="0" y2={h*0.4} stroke={c(0.4)} strokeWidth="1.5" /><circle cx="0" cy={h*0.4} r="1.5" fill={c(0.35)} />
    <line x1={w} y1={h-CO-6} x2={w} y2={h*0.55} stroke={c(0.35)} strokeWidth="1.5" /><circle cx={w} cy={h*0.55} r="1.5" fill={c(0.3)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    <circle cx={w/2} cy="0" r="1" fill={c(0.25)} /><circle cx={w/2} cy={h} r="1" fill={c(0.25)} />
    <rect x={M} y={M} width={S} height={S} fill={c(0.2)} /><rect x={w-M-S} y={M} width={S} height={S} fill={c(0.2)} />
    <rect x={w-M-S} y={h-M-S} width={S} height={S} fill={c(0.2)} /><rect x={M} y={h-M-S} width={S} height={S} fill={c(0.2)} />
    {[0.2,0.35,0.65,0.8].map(p => <React.Fragment key={`e${p}`}><line x1={w*p} y1="0" x2={w*p} y2="2.5" stroke={c(0.18)} strokeWidth="0.5" /><line x1={w*p} y1={h} x2={w*p} y2={h-2.5} stroke={c(0.18)} strokeWidth="0.5" /></React.Fragment>)}
    {[0.25,0.5,0.75].map(p => <React.Fragment key={`v${p}`}><line x1="0" y1={h*p} x2="2.5" y2={h*p} stroke={c(0.18)} strokeWidth="0.5" /><line x1={w} y1={h*p} x2={w-2.5} y2={h*p} stroke={c(0.18)} strokeWidth="0.5" /></React.Fragment>)}
  </>;
};

const detail5: SvgRenderer = (w, h, c) => {
  const CO = 14, M1 = 5, N = 5, M2 = 11, S = 4, XH = 5;
  return <>
    <path d={`M ${CO},0 L ${w},0 L ${w},${h-CO} L ${w-CO},${h} L 0,${h} L 0,${CO} Z`} fill="none" stroke={c(0.22)} strokeWidth="1" />
    <path d={`M 0,${CO+8} L 0,${CO} L ${CO},0 L ${CO+8},0`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${w},${h-CO-8} L ${w},${h-CO} L ${w-CO},${h} L ${w-CO-8},${h}`} fill="none" stroke={c(0.6)} strokeWidth="1.5" />
    <path d={`M ${N+M1},${M1} L ${w-N-M1},${M1} L ${w-N-M1},${N+M1} L ${w-M1},${N+M1} L ${w-M1},${h-N-M1} L ${w-N-M1},${h-N-M1} L ${w-N-M1},${h-M1} L ${N+M1},${h-M1} L ${N+M1},${h-N-M1} L ${M1},${h-N-M1} L ${M1},${N+M1} L ${N+M1},${N+M1} Z`} fill="none" stroke={c(0.09)} strokeWidth="0.5" />
    {[`M ${N+M1},${M1} L ${N+M1},${N+M1} L ${M1},${N+M1}`,`M ${w-N-M1},${M1} L ${w-N-M1},${N+M1} L ${w-M1},${N+M1}`,`M ${w-M1},${h-N-M1} L ${w-N-M1},${h-N-M1} L ${w-N-M1},${h-M1}`,`M ${M1},${h-N-M1} L ${N+M1},${h-N-M1} L ${N+M1},${h-M1}`].map((d, i) => <path key={`n${i}`} d={d} fill="none" stroke={c(0.25)} strokeWidth="0.5" />)}
    <rect x={M2} y={M2} width={w-M2*2} height={h-M2*2} fill="none" stroke={c(0.06)} strokeWidth="0.5" strokeDasharray="2,3" />
    <line x1={CO+8} y1="0" x2={w*0.55} y2="0" stroke={c(0.55)} strokeWidth="2" /><circle cx={w*0.55} cy="0" r="1.5" fill={c(0.5)} />
    <line x1={w-CO-8} y1={h} x2={w*0.4} y2={h} stroke={c(0.45)} strokeWidth="1.5" /><circle cx={w*0.4} cy={h} r="1.5" fill={c(0.4)} />
    <line x1="0" y1={CO+8} x2="0" y2={h*0.35} stroke={c(0.4)} strokeWidth="1.5" /><circle cx="0" cy={h*0.35} r="1.5" fill={c(0.35)} />
    <circle cx={0} cy={h/2} r="2" fill={c(0.4)} /><circle cx={w} cy={h/2} r="2" fill={c(0.4)} />
    {[[w,0],[0,h]].map(([cx,cy], i) => <g key={`x${i}`}><line x1={cx-XH} y1={cy} x2={cx+XH} y2={cy} stroke={c(0.3)} strokeWidth="0.5" /><line x1={cx} y1={cy-XH} x2={cx} y2={cy+XH} stroke={c(0.3)} strokeWidth="0.5" /></g>)}
    <rect x={w-S} y="0" width={S} height={S} fill={c(0.35)} /><rect x="0" y={h-S} width={S} height={S} fill={c(0.35)} />
    {[[M2,M2],[w-M2,M2],[w-M2,h-M2],[M2,h-M2]].map(([cx,cy], i) => <circle key={`cd${i}`} cx={cx} cy={cy} r="1" fill={c(0.25)} />)}
    {[0.15,0.3,0.5,0.7,0.85].map(p => <React.Fragment key={`t${p}`}><line x1={w*p} y1="0" x2={w*p} y2="2.5" stroke={c(0.18)} strokeWidth="0.5" /><line x1={w*p} y1={h} x2={w*p} y2={h-2.5} stroke={c(0.18)} strokeWidth="0.5" /></React.Fragment>)}
    {[0.2,0.5,0.8].map(p => <React.Fragment key={`s${p}`}><line x1="0" y1={h*p} x2="2.5" y2={h*p} stroke={c(0.18)} strokeWidth="0.5" /><line x1={w} y1={h*p} x2={w-2.5} y2={h*p} stroke={c(0.18)} strokeWidth="0.5" /></React.Fragment>)}
  </>;
};

// ─── Variant registry ───────────────────────────────────────────────

const VARIANTS: Record<string, { render: SvgRenderer; clip?: string; extraPadding?: string }> = {
  chamfered:      { render: chamfered,      clip: `polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)` },
  notched:        { render: notched,        clip: `polygon(6px 0,calc(100% - 6px) 0,calc(100% - 6px) 6px,100% 6px,100% calc(100% - 6px),calc(100% - 6px) calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,6px calc(100% - 6px),0 calc(100% - 6px),0 6px,6px 6px)` },
  stepped:        { render: stepped },
  asymmetric:     { render: asymmetric,     clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
  "gap-breaks":   { render: gapBreaks },
  "top-accent":   { render: topAccent },
  hexagonal:      { render: hexagonal,      clip: `polygon(16px 0,calc(100% - 16px) 0,100% 50%,calc(100% - 16px) 100%,16px 100%,0 50%)`, extraPadding: "px-8" },
  crosshair:      { render: crosshair },
  "heavy-chamfer":{ render: heavyChamfer,   clip: `polygon(18px 0,calc(100% - 18px) 0,100% 18px,100% calc(100% - 18px),calc(100% - 18px) 100%,18px 100%,0 calc(100% - 18px),0 18px)` },
  "dashed-squares":{ render: dashedSquares },
  "combo-a":      { render: comboA,         clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
  "combo-b":      { render: comboB,         clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
  "combo-c":      { render: comboC,         clip: `polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)` },
  "combo-d":      { render: comboD,         clip: `polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)` },
  "combo-e":      { render: comboE,         clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
  "detail-1":     { render: detail1,        clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
  "detail-2":     { render: detail2,        clip: `polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)` },
  "detail-3":     { render: detail3,        clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
  "detail-4":     { render: detail4,        clip: `polygon(12px 0,calc(100% - 12px) 0,100% 12px,100% calc(100% - 12px),calc(100% - 12px) 100%,12px 100%,0 calc(100% - 12px),0 12px)` },
  "detail-5":     { render: detail5,        clip: `polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)` },
};

export type HudFrameVariant = keyof typeof VARIANTS;

export const HUD_FRAME_VARIANTS = Object.keys(VARIANTS) as HudFrameVariant[];

// ─── Main component ─────────────────────────────────────────────────

export default function HudFrame({
  variant = "chamfered",
  children,
  className = "",
  style,
}: {
  variant?: HudFrameVariant;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const c = useHudColor();
  const ref = useRef<HTMLDivElement>(null);
  const { w, h } = useDims(ref);
  const ready = w > 0 && h > 0;
  const v = VARIANTS[variant] ?? VARIANTS.chamfered;

  return (
    <div
      ref={ref}
      className={`relative ${v.extraPadding ?? ""} ${className}`}
      style={style}
    >
      <div
        className="absolute inset-0"
        style={{
          ...(v.clip ? { clipPath: v.clip } : {}),
          background: "rgba(2, 4, 8, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      {ready && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
        >
          {v.render(w, h, c)}
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
