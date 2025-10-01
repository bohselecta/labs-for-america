import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { themeToCssVars } from "@/lib/theme-gen";

export async function POST(req: NextRequest) {
  try {
    const { logoUrl, palette, theme, preset = "CITY" } = await req.json();

    // Generate CSS variables from theme with preset
    const cssVars = themeToCssVars(theme, preset);

    // Update organization with theme data
    const org = await prisma.org.upsert({
      where: { slug: "city" },
      update: { 
        logoUrl, 
        primaryHex: theme.brand,
                preset: preset as "CITY" | "PD" | "FIRE" | "COUNTY",
        themeJson: JSON.stringify({
          palette,
          theme,
          preset,
          cssVars,
          generatedAt: new Date().toISOString()
        })
      },
      create: { 
        slug: "city", 
        name: "City of Example", 
        logoUrl, 
        primaryHex: theme.brand,
                preset: preset as "CITY" | "PD" | "FIRE" | "COUNTY",
        themeJson: JSON.stringify({
          palette,
          theme,
          preset,
          cssVars,
          generatedAt: new Date().toISOString()
        })
      }
    });

    return NextResponse.json({ 
      ok: true, 
      orgId: org.id,
      message: "Theme saved successfully"
    });
    
  } catch (error) {
    console.error("Theme save error:", error);
    return new NextResponse("Failed to save theme", { status: 500 });
  }
}

export async function GET() {
  try {
    const org = await prisma.org.findFirst({
      where: { slug: "city" }
    });

    if (!org || !org.themeJson) {
      return NextResponse.json({ theme: null });
    }

    const themeData = JSON.parse(org.themeJson);
    return NextResponse.json({
      logoUrl: org.logoUrl,
      primaryHex: org.primaryHex,
      ...themeData
    });
    
  } catch (error) {
    console.error("Theme load error:", error);
    return new NextResponse("Failed to load theme", { status: 500 });
  }
}
