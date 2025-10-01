"use client";
import { useState } from "react";
import { themeToCssVars, generateTheme } from "@/lib/theme-gen";
import { PRESETS, PresetKey } from "@/lib/theme-presets";

export default function OrgPage() {
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  const [palette, setPalette] = useState<string[] | null>(null);
  const [preset, setPreset] = useState<PresetKey>("CITY");
  const [isUploading, setIsUploading] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    
    setIsUploading(true);
    
    try {
      const form = new FormData();
      form.append("file", f);
      
      const res = await fetch("/api/org/logo", { 
        method: "POST", 
        body: form 
      });
      
      const data = await res.json();
      setLogoUrl(data.url);
      setPalette(data.palette);
      
      // Live preview
      const theme = generateTheme(data.palette);
      const newCssVars = themeToCssVars(theme, preset);
      
      // Inject into page
      const styleId = "org-theme-preview";
      let el = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!el) { 
        el = document.createElement("style"); 
        el.id = styleId; 
        document.head.appendChild(el); 
      }
      el.innerHTML = newCssVars;
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  async function onSave() {
    if (!palette) return alert("Upload a logo first.");
    
    try {
      const theme = generateTheme(palette);
      const res = await fetch("/api/org/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl, palette, theme, preset })
      });
      
      if (res.ok) {
        alert("Theme saved successfully!");
        // Remove preview styles
        const previewEl = document.getElementById("org-theme-preview");
        if (previewEl) previewEl.remove();
      } else {
        alert(await res.text());
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed. Please try again.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Organization Branding</h1>
      <p className="text-sm text-gray-600 mt-1">
        Upload your logo to automatically generate a custom theme with proper contrast and accessibility.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Logo Upload Section */}
        <div className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-4">Logo Upload</div>
          
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={logoUrl} 
              alt="logo" 
              className="h-16 w-16 object-contain border border-gray-200 rounded-lg" 
            />
            <div>
              <div className="text-sm font-medium">Current Logo</div>
              <div className="text-xs text-gray-500">PNG, JPG, SVG supported</div>
            </div>
          </div>
          
          <input 
            type="file" 
            accept=".png,.jpg,.jpeg,.svg" 
            onChange={onUpload}
            disabled={isUploading}
            aria-label="Upload logo file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50" 
          />
          
          {isUploading && (
            <div className="mt-2 text-sm text-blue-600">Processing logo and extracting colors...</div>
          )}
          
          {palette && (
            <div className="mt-6">
              <div className="text-sm text-gray-600 mb-3">Extracted Color Palette</div>
              <div className="flex gap-2 flex-wrap">
                {palette.map((h: string) => (
                  <div 
                    key={h} 
                    className="h-10 w-10 rounded-lg border-2 border-gray-200 shadow-sm" 
                    style={{ background: h }} 
                    title={h}
                  />
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Colors will be used to generate your custom theme
              </div>
            </div>
          )}

          {/* Preset Selector */}
          <div className="mt-6">
            <label className="block text-sm text-gray-700 mb-2">Agency Preset</label>
            <select
              value={preset}
              onChange={(e) => {
                const newPreset = e.target.value as PresetKey;
                setPreset(newPreset);
                if (palette) {
                  const theme = generateTheme(palette);
                  const newCssVars = themeToCssVars(theme, newPreset);
                  setCssVars(newCssVars);
                  const styleId = "org-theme-preview";
                  const el = document.getElementById(styleId) as HTMLStyleElement | null;
                  if (el) {
                    el.innerHTML = newCssVars;
                  }
                }
              }}
              className="w-full border border-gray-300 rounded-md p-2"
              aria-label="Select agency preset"
            >
              {Object.entries(PRESETS).map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset.name} - {preset.description}
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-gray-500">
              Choose the style that best matches your agency type
            </div>
          </div>
        </div>

        {/* Theme Preview Section */}
        <div className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-4">Theme Preview</div>
          
          <div 
            className="rounded-lg border-2 border-dashed border-gray-300 p-6" 
            style={{ 
              background: "var(--canvas)", 
              color: "var(--canvas-ink)" 
            }}
          >
            <h3 className="font-semibold mb-4">Live Preview</h3>
            
            {/* Buttons */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Buttons</div>
              <div className="flex gap-3">
                <button className="btn-primary px-4 py-2 rounded-md font-medium">
                  Primary Button
                </button>
                <button 
                  className="px-4 py-2 rounded-md font-medium" 
                  style={{ 
                    background: "var(--accent)", 
                    color: "var(--accent-ink)" 
                  }}
                >
                  Accent Button
                </button>
              </div>
            </div>
            
            {/* Cards */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Cards</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="card rounded-lg p-3">
                  <div className="font-medium">Sample Card</div>
                  <div className="text-sm opacity-75">With content</div>
                </div>
                <div className="card rounded-lg p-3">
                  <div className="font-medium">Another Card</div>
                  <div className="text-sm opacity-75">More content</div>
                </div>
              </div>
            </div>
            
            {/* Text Colors */}
            <div>
              <div className="text-sm font-medium mb-2">Text Colors</div>
              <div className="space-y-1 text-sm">
                <div style={{ color: "var(--brand)" }}>Brand text color</div>
                <div style={{ color: "var(--accent)" }}>Accent text color</div>
                <div style={{ color: "var(--muted-ink)" }}>Muted text color</div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onSave} 
            disabled={!palette}
            className="mt-6 w-full px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {palette ? "Save Theme" : "Upload a logo first"}
          </button>
          
          {palette && (
            <div className="mt-3 text-xs text-gray-500">
              ✓ Contrast ratios checked for accessibility<br/>
              ✓ Colors optimized for readability<br/>
              ✓ Theme will be applied site-wide
            </div>
          )}
        </div>
      </div>
    </main>
  );
}