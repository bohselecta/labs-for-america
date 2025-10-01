import { prisma } from "@/lib/prisma";

export async function loadTheme(): Promise<string | null> {
  try {
    if (!prisma) {
      console.warn("Prisma client not available, skipping theme load");
      return null;
    }

    const org = await prisma.org.findFirst({
      where: { slug: "city" }
    });

    if (!org || !org.themeJson) {
      return null;
    }

    const themeData = JSON.parse(org.themeJson);
    return themeData.cssVars || null;
    
  } catch (error) {
    console.error("Failed to load theme:", error);
    return null;
  }
}
