"use client";
import { useState } from "react";
import { PRESETS, PresetKey } from "@/lib/theme-presets";
import { Icon } from "@/components/icons";
import { HoverLift, ScrollReveal, StaggeredReveal } from "@/components/micro-interactions";
import { generateTemplateMetadata } from "@/lib/seo-metadata";
import { StructuredData } from "@/components/StructuredData";
import { BreadcrumbStructuredData } from "@/components/StructuredData";
import { SoftwareApplicationStructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";

const templates = [
  {
    id: "civic",
    name: "CivicLabs",
    description: "For City Councils & Communities",
    icon: "🌳",
    preset: "CITY" as PresetKey,
    features: ["Community challenges", "Civic projects", "Open calls for ideas"]
  },
  {
    id: "justice", 
    name: "JusticeLabs",
    description: "For Police & Sheriff Departments",
    icon: "🚔",
    preset: "PD" as PresetKey,
    features: ["Cold case Labs", "Crisis modes", "Community reporting"]
  },
  {
    id: "edu",
    name: "EduLabs", 
    description: "For All School Types & Universities",
    icon: "🎓",
    preset: "CITY" as PresetKey,
    features: ["Student innovation", "Hackathons", "Research Labs"]
  },
  {
    id: "health",
    name: "HealthLabs",
    description: "For Hospitals & Health Agencies", 
    icon: "🏥",
    preset: "FIRE" as PresetKey,
    features: ["Health challenges", "Access improvement", "Community health"]
  }
];

import type { Metadata } from "next";

// Generate metadata for this page
export const metadata: Metadata = generateTemplateMetadata("civic", {
  name: "CivicLabs",
  description: "For City Councils & Communities",
  orgName: "City Government",
  features: ["Community challenges", "Civic projects", "Open calls for ideas"],
  preset: "CITY"
});

export default function TemplatesPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", f);
      const res = await fetch("/api/org/logo", { method: "POST", body: form });
      const data = await res.json();
      setLogoUrl(data.url);
      setPalette(data.palette);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  function onGenerate() {
    if (!selected.length) return alert("Pick at least one template!");
    if (!logoUrl) return alert("Upload a logo first!");
    
    // For now: only take the first one selected
    const url = `/api/download?id=${selected[0]}`;
    window.location.href = url;
  }

  function onDeploy() {
    if (!selected.length) return alert("Pick a template first!");
    
    const repoMap: Record<string, string> = {
      civic: "https://vercel.com/new/clone?repository-url=https://github.com/youruser/civic-template",
      justice: "https://vercel.com/new/clone?repository-url=https://github.com/youruser/justice-template", 
      edu: "https://vercel.com/new/clone?repository-url=https://github.com/youruser/edu-template",
      health: "https://vercel.com/new/clone?repository-url=https://github.com/youruser/health-template"
    };
    
    window.open(repoMap[selected[0]], "_blank");
  }

  const selectedTemplate = selected[0] ? templates.find(t => t.id === selected[0]) : null;
  const preset = selectedTemplate ? PRESETS[selectedTemplate.preset] : PRESETS.CITY;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Structured Data */}
      <BreadcrumbStructuredData items={[
        { name: 'Home', url: '/' },
        { name: 'Templates', url: '/templates' }
      ]} />
      
      {templates.map(template => (
        <SoftwareApplicationStructuredData
          key={template.id}
          name={template.name}
          description={template.description}
          applicationCategory="Civic Engagement Platform"
          operatingSystem="Web Browser"
          url={`/templates`}
          screenshot={`/images/screenshot-${template.id}.png`}
        />
      ))}
      
      {/* Hero */}
      <div className="text-center mb-12 hero-gradient py-16 rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/images/hero-civic-skyline.png" 
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4 font-headline">Free Civic Templates for Every Community</h1>
          <p className="text-xl text-gray-600 mb-6 font-body">
            Fork it, brand it, deploy it. No cost, no catch.
          </p>
          <p className="text-lg text-gray-500 font-body">
            Ready-made Labs platforms for cities, police, schools, and health systems.
          </p>
        </div>
      </div>

      {/* Template Selection */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 font-headline">Choose Your Template</h2>
        <StaggeredReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 grid-rhythm">
          {templates.map(template => (
            <HoverLift key={template.id}>
              <div
                className={`card card-enhanced p-6 cursor-pointer transition-all focus-enhanced ${
                  selected.includes(template.id)
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:shadow-lg"
                }`}
                onClick={() => {
                  setSelected(selected.includes(template.id)
                    ? selected.filter(id => id !== template.id)
                    : [...selected, template.id]
                  );
                }}
              >
                <div className="text-4xl mb-4">
                  <Icon 
                    name={`${template.id}-template` as any} 
                    size="xl" 
                    className="text-blue-600 icon-enhanced" 
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-headline text-balance">{template.name}</h3>
                <p className="text-sm text-gray-600 mb-4 font-body text-pretty">{template.description}</p>
                <ul className="text-xs text-gray-500 space-y-1 font-body">
                  {template.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2">
                      <Icon name="chevron-right" size="xs" className="text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-3">
                  <HoverLift>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/preview/${template.id}`, '_blank');
                      }}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 btn-enhanced focus-enhanced"
                    >
                      <Icon name="external-link" size="sm" className="inline mr-1" />
                      Preview Template
                    </button>
                  </HoverLift>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(template.id)}
                    onChange={() => {}}
                    className="accent-blue-600"
                  />
                  <span className="ml-2 text-sm font-medium">
                    {selected.includes(template.id) ? "Selected" : "Select"}
                  </span>
                </div>
              </div>
            </HoverLift>
          ))}
        </StaggeredReveal>
      </div>

      {/* Logo Upload */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Upload Your Logo</h2>
        <div className="card p-8">
          <div className="text-center">
            <div className="mb-6">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={onUpload}
                disabled={isUploading}
                aria-label="Upload organization logo"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              />
            </div>
            
            {isUploading && (
              <div className="text-blue-600 mb-4">Processing logo and extracting colors...</div>
            )}

            {logoUrl && (
              <div className="flex justify-center items-center gap-4 mb-4">
                <img src={logoUrl} className="h-16 rounded border" alt="Logo preview" />
                {palette && (
                  <div className="flex gap-2">
                    {palette.map(h => (
                      <div
                        key={h}
                        className="h-8 w-8 rounded border"
                        style={{ background: h }}
                        title={h}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live Preview */}
      {logoUrl && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Live Preview</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Brand Preview */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Brand Preview</h3>
              <div className="card p-6">
                <div className="flex gap-4 items-center mb-4">
                  <img src={logoUrl} className="h-16 rounded border" alt="Logo preview" />
                  {palette && (
                    <div className="flex gap-2">
                      {palette.map(h => (
                        <div
                          key={h}
                          className="h-8 w-8 rounded border"
                          style={{ background: h }}
                          title={h}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>Preset:</strong> {preset.name}</p>
                  <p><strong>Style:</strong> {preset.description}</p>
                  <p><strong>Border Radius:</strong> {preset.borderRadius}</p>
                </div>
              </div>
            </div>

            {/* Live Mini-Site Preview */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Site Preview</h3>
              <div className="border rounded-xl overflow-hidden bg-white shadow-lg">
                <div
                  className="px-4 py-3 font-bold text-white"
                  style={{ 
                    background: palette?.[0] || "#2563EB",
                    borderRadius: preset.borderRadius
                  }}
                >
                  {selectedTemplate ? `${selectedTemplate.name}` : "Your Lab"}
                </div>
                <div className="p-4 text-sm text-gray-700">
                  <p className="mb-3">Welcome to your new {selectedTemplate?.name || "Lab"} portal.</p>
                  
                  <div className="space-y-2">
                    <button
                      className="px-4 py-2 rounded-md text-white font-medium"
                      style={{ 
                        background: palette?.[1] || "#10B981",
                        borderRadius: preset.borderRadius
                      }}
                    >
                      Primary Action
                    </button>
                    
                    <div 
                      className="px-3 py-2 rounded-md text-sm"
                      style={{ 
                        background: palette?.[2] || "#F3F4F6",
                        color: "#111827",
                        borderRadius: preset.borderRadius
                      }}
                    >
                      Sample Card Content
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    ✨ This is a live preview with your brand colors and {preset.name.toLowerCase()} styling.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center">
        <div className="flex gap-4 justify-center">
          <button
            onClick={onGenerate}
            disabled={!selected.length || !logoUrl}
            className="px-8 py-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Launch Your Lab
          </button>
          
          <button
            onClick={onDeploy}
            disabled={!selected.length}
            className="px-8 py-4 btn-golden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⚡ Deploy to Vercel
          </button>
        </div>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>Download includes: Next.js starter, preset configuration, and your brand theme</p>
          <p>Deploy creates a live site in your Vercel account in under 2 minutes</p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="text-center">
          <div className="text-3xl mb-4">⚡</div>
          <h3 className="font-semibold mb-2">Instant Setup</h3>
          <p className="text-sm text-gray-600">
            Upload logo, select template, deploy. No coding required.
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-4">🎨</div>
          <h3 className="font-semibold mb-2">Auto-Branding</h3>
          <p className="text-sm text-gray-600">
            Logo-driven theming with agency-specific presets and styling.
          </p>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-4">🆓</div>
          <h3 className="font-semibold mb-2">Completely Free</h3>
          <p className="text-sm text-gray-600">
            Open source civic infrastructure. No cost, no catch, no vendor lock-in.
          </p>
        </div>
      </div>
    </main>
  );
}
