import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import getColors from "get-image-colors";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    
    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);

    // Normalize to PNG and rasterize SVG automatically
    const outName = `logo-${Date.now()}.png`;
    const outPath = path.join(uploadDir, outName);
    
    await sharp(buf)
      .png({ quality: 90 })
      .toFile(outPath);

    // Generate small sample for palette extraction
    const sample = await sharp(buf)
      .resize(240, 240, { fit: "inside" })
      .png()
      .toBuffer();
    
    // Extract color palette
    const palette = await getColors(sample, "image/png");
    
    // Convert to hex strings and limit to top 6 colors
    const hexes = palette
      .slice(0, 6)
      .map(c => c.hex().toUpperCase());

    return NextResponse.json({ 
      url: `/uploads/${outName}`, 
      palette: hexes 
    });
    
  } catch (error) {
    console.error("Logo upload error:", error);
    return new NextResponse("Upload failed", { status: 500 });
  }
}
