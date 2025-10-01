import chroma from "chroma-js";
import { PRESETS, PresetKey } from "./theme-presets";

export type Theme = {
  brand: string;
  brandInk: string;
  surface: string;
  surfaceInk: string;
  canvas: string;
  canvasInk: string;
  muted: string;
  mutedInk: string;
  accent: string;
  accentInk: string;
};

function bestContrastText(bg: string): string {
  const white = chroma.contrast(bg, "#FFFFFF");
  const black = chroma.contrast(bg, "#111827"); // near-black
  return white >= black ? "#FFFFFF" : "#111827";
}

function ensureContrast(bg: string, fg: string, min = 4.5): string {
  let fgColor = chroma(fg);
  let i = 0;
  
  while (chroma.contrast(bg, fgColor) < min && i < 10) {
    // Nudge in LCH space for more perceptual consistency
    const [l, c, h] = chroma(fgColor).lch();
    fgColor = chroma.lch(
      l + (l > 50 ? 6 : -6), 
      Math.max(c - 5, 0), 
      h
    );
    i++;
  }
  
  return fgColor.hex();
}

export function generateTheme(hexes: string[]): Theme {
  const primary = hexes[0] || "#2563EB";
  const accent = hexes[1] || "#10B981";
  const neutral = hexes.find(h => chroma(h).luminance() > 0.85) || "#FAFBFD";

  const brand = chroma(primary).saturate(0.2).hex();
  const brandInk = ensureContrast(brand, bestContrastText(brand));

  const surface = "#FFFFFF";
  const surfaceInk = "#111827";

  const canvas = neutral;
  const canvasInk = ensureContrast(canvas, "#111827");

  const muted = chroma(primary).desaturate(2).brighten(2).hex(); // subtle grayish from brand
  const mutedInk = ensureContrast(muted, "#111827");

  const accentC = chroma(accent).saturate(0.2).hex();
  const accentInk = ensureContrast(accentC, bestContrastText(accentC));

  return { 
    brand, 
    brandInk, 
    surface, 
    surfaceInk, 
    canvas, 
    canvasInk, 
    muted, 
    mutedInk, 
    accent: accentC, 
    accentInk 
  };
}

export function themeToCssVars(t: Theme, preset: PresetKey = "CITY"): string {
  const p = PRESETS[preset];
  return `
:root{
  --brand:${t.brand};
  --brand-ink:${t.brandInk};
  --surface:${t.surface};
  --surface-ink:${t.surfaceInk};
  --canvas:${t.canvas};
  --canvas-ink:${t.canvasInk};
  --muted:${t.muted};
  --muted-ink:${t.mutedInk};
  --accent:${t.accent};
  --accent-ink:${t.accentInk};
  --border-radius:${p.borderRadius};
  --border-color:${p.borderColor};
  --shadow:${p.shadow};
}
`.trim();
}
