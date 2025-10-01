import { NextRequest, NextResponse } from "next/server";

// Template blob URLs (these would be uploaded to Vercel Blob Storage)
const templateBlobs: Record<string, string> = {
  civic: "https://yourproj.public.blob.vercel-storage.com/civic.zip",
  justice: "https://yourproj.public.blob.vercel-storage.com/justice.zip", 
  edu: "https://yourproj.public.blob.vercel-storage.com/edu.zip",
  health: "https://yourproj.public.blob.vercel-storage.com/health.zip"
};

// Fallback: redirect to GitHub releases for now
const githubReleases: Record<string, string> = {
  civic: "https://github.com/youruser/civic-template/releases/latest/download/civic-template.zip",
  justice: "https://github.com/youruser/justice-template/releases/latest/download/justice-template.zip",
  edu: "https://github.com/youruser/edu-template/releases/latest/download/edu-template.zip", 
  health: "https://github.com/youruser/health-template/releases/latest/download/health-template.zip"
};

// Dynamic template map URL (uploaded by publish script)
const TEMPLATE_MAP_URL = "https://yourproj.public.blob.vercel-storage.com/template-map.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return new NextResponse("Template ID required", { status: 400 });
  }

  try {
    // Try to fetch dynamic template map first
    const mapResponse = await fetch(TEMPLATE_MAP_URL, { 
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (mapResponse.ok) {
      const templateMap = await mapResponse.json();
      if (templateMap.templates && templateMap.templates[id]) {
        return NextResponse.redirect(templateMap.templates[id]);
      }
    }
  } catch (error) {
    console.log("Failed to fetch dynamic template map, falling back to static URLs");
  }

  // Fallback to static URLs
  const downloadUrl = templateBlobs[id] || githubReleases[id];
  
  if (!downloadUrl) {
    return new NextResponse("Template not found", { status: 404 });
  }
  
  return NextResponse.redirect(downloadUrl);
}

// Optional: Track download analytics
export async function POST(req: NextRequest) {
  try {
    const { templateId, userAgent, timestamp } = await req.json();
    
    // Log download for analytics
    console.log(`Template download: ${templateId} at ${timestamp}`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to track download" }, { status: 500 });
  }
}
