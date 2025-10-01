import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // list
  const labs = await prisma.lab.findMany({ 
    include: { org: true } 
  });
  return NextResponse.json(labs);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  // for demo, ensure an Org exists
  const org = await prisma.org.upsert({
    where: { slug: "city" },
    update: {},
    create: { 
      slug: "city", 
      name: "City of Example", 
      logoUrl: "/logo.png" 
    }
  });
  
  const lab = await prisma.lab.create({
    data: {
      orgId: org.id,
      title: data.title,
      slug: data.slug,
      category: data.category,
      prize: data.prize,
      deadline: new Date(data.deadline),
      status: data.status,
      summary: data.summary,
      bodyMd: data.bodyMd,
      heroUrl: data.heroUrl || null
    }
  });
  
  return NextResponse.json(lab);
}
