import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const mode = (form.get("mode") as string) || "NORMAL";
  const title = (form.get("title") as string) || null;
  const msg = (form.get("msg") as string) || null;

  await prisma.org.upsert({
    where: { slug: "city" },
    update: { 
      crisisMode: mode as "NORMAL" | "MANHUNT" | "EMERGENCY", 
      crisisTitle: title, 
      crisisMsg: msg 
    },
    create: { 
      slug: "city", 
      name: "City of Example", 
      crisisMode: mode as "NORMAL" | "MANHUNT" | "EMERGENCY", 
      crisisTitle: title, 
      crisisMsg: msg 
    }
  });

  return NextResponse.redirect(new URL("/admin/crisis", req.url));
}
