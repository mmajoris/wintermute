# HUD Frame UI Library

Sci-fi panel frames for the Wintermute brain visualization. 20 variants, global theming via React context, brightness + color control.

## Quick Start

```tsx
import HudFrame from "@/components/ui/HudFrame";
import { HudThemeProvider } from "@/components/ui/hud-theme";

// Wrap your app (or page) in the theme provider
<HudThemeProvider r={0} g={200} b={220} brightness={1}>
  <HudFrame variant="chamfered" className="p-4">
    Your content here
  </HudFrame>
</HudThemeProvider>
```

## Files

| File | Purpose |
|------|---------|
| `components/ui/HudFrame.tsx` | Main frame component with all 20 variants |
| `components/ui/hud-theme.tsx` | Theme context, provider, and `useHudColor` hook |
| `components/live/BracketFrame.tsx` | Thin wrapper (legacy compat) + `HudDivider` + `HudSectionTitle` |
| `app/examples/page.tsx` | Live preview of all variants with brightness/hue sliders |

## HudFrame Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `HudFrameVariant` | `"chamfered"` | Which frame style to render |
| `children` | `ReactNode` | — | Content inside the frame |
| `className` | `string` | `""` | Additional CSS classes (use for padding, e.g. `p-4`) |
| `style` | `CSSProperties` | — | Inline styles |

## Variants

### Base (10)

| Variant | Description |
|---------|-------------|
| `chamfered` | 45° corner cuts with tick accents at each chamfer vertex |
| `notched` | Small square bites at each corner with bright notch marks |
| `stepped` | Faint border + bright bars extending from corners + tick marks |
| `asymmetric` | Chamfered top-left and bottom-right only |
| `gap-breaks` | Border with gaps at midpoints + corner dots |
| `top-accent` | Thin border + bright bar across top-left with dot terminus |
| `hexagonal` | Pointed left/right sides + vertex dots + edge accents |
| `crosshair` | Thin border + crosshair marks at each corner |
| `heavy-chamfer` | Large 18px chamfers with thick bright diagonal lines |
| `dashed-squares` | Dashed border + filled squares at each corner |

### Combos (5)

| Variant | Description |
|---------|-------------|
| `combo-a` | Asymmetric outer + dashed inner rect + side dots + corner squares |
| `combo-b` | Asymmetric outer + chamfered inner + tick accents + top bar + dots + squares |
| `combo-c` | Full chamfer outer + dashed chamfer inner + corner dots + top/bottom bars + squares |
| `combo-d` | Full chamfer outer + double inner rects (solid + dashed) + corner dots |
| `combo-e` | Asymmetric outer + top/bottom accent bars + crosshairs + corner squares |

### Detailed (5)

| Variant | Description |
|---------|-------------|
| `detail-1` | Asymmetric outer + chamfered inner + bars + crosshairs + dots + squares + edge ticks |
| `detail-2` | Full chamfer outer with diagonals + dashed inner + accent bars all 4 sides + dots + squares + ticks |
| `detail-3` | Asymmetric outer + solid rect inner + dashed chamfer inner + bars + crosshairs + dots + squares + ticks |
| `detail-4` | Full chamfer outer + thick diags + chamfered inner + bars all 4 sides + dots + squares + ticks |
| `detail-5` | Asymmetric outer + notched inner + dashed rect 3rd frame + bars + crosshairs + dots + squares + ticks |

## Theming

### HudThemeProvider

Wrap your component tree to control color and brightness globally:

```tsx
<HudThemeProvider
  r={0}           // 0-255
  g={200}         // 0-255
  b={220}         // 0-255
  brightness={1}  // 0.1 = dim, 1 = normal, 2.5 = blown out
>
  {children}
</HudThemeProvider>
```

All `HudFrame` instances inside the provider respond to these values. No props needed on individual frames.

### useHudColor Hook

For building custom components that match the theme:

```tsx
import { useHudColor } from "@/components/ui/hud-theme";

function MyComponent() {
  const c = useHudColor();
  // c(alpha) returns an rgba string scaled by brightness
  return <div style={{ color: c(0.75), borderColor: c(0.2) }}>...</div>;
}
```

The `c()` function takes an alpha value (0-1) and returns `rgba(r, g, b, alpha * brightness)`.

## Helper Components

From `components/live/BracketFrame.tsx`:

```tsx
import { HudDivider, HudSectionTitle } from "@/components/live/BracketFrame";

<HudSectionTitle>System Vitals</HudSectionTitle>
<HudDivider />
```

- **HudSectionTitle** — Small uppercase label in the theme color
- **HudDivider** — Horizontal gradient line separator

Both use `useHudColor()` and respond to the theme provider.

## How It Works

Each frame variant is a pure SVG render function: `(width, height, colorFn) => JSX`. The `HudFrame` component:

1. Uses `ResizeObserver` to get the container's pixel dimensions
2. Renders an absolutely-positioned SVG at those exact dimensions
3. Draws borders, accents, dots, ticks etc. at pixel-accurate coordinates
4. Uses `clip-path` on a background div for chamfered/shaped panels
5. Content sits in a `relative z-10` div above the frame layers

This approach means chamfers are always the same pixel size regardless of box dimensions (unlike the old SVG viewBox scaling approach that distorted corners).

## Examples Page

Visit `/examples` to see all 20 variants side by side with live brightness and hue sliders.
