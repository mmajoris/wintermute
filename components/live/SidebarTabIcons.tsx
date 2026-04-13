import type { JSX } from "react";

const svgProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<string, JSX.Element> = {
  grid: (
    <svg {...svgProps}>
      <rect x="2" y="2" width="5" height="5" rx="0.5" />
      <rect x="9" y="2" width="5" height="5" rx="0.5" />
      <rect x="2" y="9" width="5" height="5" rx="0.5" />
      <rect x="9" y="9" width="5" height="5" rx="0.5" />
    </svg>
  ),

  waveform: (
    <svg {...svgProps}>
      <polyline points="1,8 3,4 5,12 7,3 9,13 11,5 13,11 15,8" />
    </svg>
  ),

  medical: (
    <svg {...svgProps}>
      <rect x="3" y="2" width="10" height="12" rx="1" />
      <line x1="8" y1="5" x2="8" y2="11" />
      <line x1="5" y1="8" x2="11" y2="8" />
    </svg>
  ),

  crosshair: (
    <svg {...svgProps}>
      <circle cx="8" cy="8" r="5" />
      <line x1="8" y1="1" x2="8" y2="4" />
      <line x1="8" y1="12" x2="8" y2="15" />
      <line x1="1" y1="8" x2="4" y2="8" />
      <line x1="12" y1="8" x2="15" y2="8" />
    </svg>
  ),

  network: (
    <svg {...svgProps}>
      <circle cx="8" cy="3" r="1.5" />
      <circle cx="3" cy="13" r="1.5" />
      <circle cx="13" cy="13" r="1.5" />
      <line x1="8" y1="4.5" x2="3" y2="11.5" />
      <line x1="8" y1="4.5" x2="13" y2="11.5" />
      <line x1="4.5" y1="13" x2="11.5" y2="13" />
    </svg>
  ),

  document: (
    <svg {...svgProps}>
      <path d="M4,2 L10,2 L13,5 L13,14 L4,14 Z" />
      <polyline points="10,2 10,5 13,5" />
      <line x1="6" y1="8" x2="11" y2="8" />
      <line x1="6" y1="11" x2="11" y2="11" />
    </svg>
  ),

  brain: (
    <svg {...svgProps}>
      <path d="M8,14 L8,5" />
      <path d="M8,5 C8,2.5 5,1.5 3.5,3 C2,4.5 2,6 3,7 C1.5,7.5 1.5,10 3,11 C4,11.8 6,12 8,14" />
      <path d="M8,5 C8,2.5 11,1.5 12.5,3 C14,4.5 14,6 13,7 C14.5,7.5 14.5,10 13,11 C12,11.8 10,12 8,14" />
    </svg>
  ),

  hierarchy: (
    <svg {...svgProps}>
      <rect x="5.5" y="1" width="5" height="3.5" rx="0.5" />
      <rect x="1" y="11.5" width="5" height="3.5" rx="0.5" />
      <rect x="10" y="11.5" width="5" height="3.5" rx="0.5" />
      <line x1="8" y1="4.5" x2="8" y2="7.5" />
      <line x1="3.5" y1="7.5" x2="12.5" y2="7.5" />
      <line x1="3.5" y1="7.5" x2="3.5" y2="11.5" />
      <line x1="12.5" y1="7.5" x2="12.5" y2="11.5" />
    </svg>
  ),

  layers: (
    <svg {...svgProps}>
      <polygon points="8,1.5 14.5,5.5 8,9.5 1.5,5.5" />
      <polyline points="1.5,8.5 8,12.5 14.5,8.5" />
    </svg>
  ),
};

export function TabIcon({ name }: { name?: string }) {
  if (name && ICONS[name]) return ICONS[name];
  return ICONS.grid;
}
