import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ labId: string }> }
) {
  try {
    const { labId } = await params;

    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    const contributions = await prisma.contribution.findMany({
      where: { labId },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ contributions });

  } catch (error) {
    console.error("Error fetching contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ labId: string }> }
) {
  try {
    const { labId } = await params;
    const body = await request.json();
    const { title, content, type, author, authorEmail, tags, fileUrl } = body;

    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Validate required fields
    if (!title || !content || !type || !author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create contribution
    const contribution = await prisma.contribution.create({
      data: {
        labId,
        title,
        content,
        type,
        author,
        authorEmail: authorEmail || null,
        tags: tags || [],
        fileUrl: fileUrl || null,
        status: "pending"
      }
    });

    return NextResponse.json({ contribution }, { status: 201 });

  } catch (error) {
    console.error("Error creating contribution:", error);
    return NextResponse.json(
      { error: "Failed to create contribution" },
      { status: 500 }
    );
  }
}
