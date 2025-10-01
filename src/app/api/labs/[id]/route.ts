import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const lab = await prisma.lab.findUnique({ 
    where: { id } 
  });
  
  if (!lab) {
    return new NextResponse("Not found", { status: 404 });
  }
  
  return NextResponse.json(lab);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  
  const lab = await prisma.lab.update({
    where: { id },
    data: {
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

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.lab.delete({ 
    where: { id } 
  });
  
  return NextResponse.json({ ok: true });
}
