import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { labId, title, content, type, author, authorEmail } = await req.json();
    
    if (!labId || !title || !content || !author) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!prisma) {
      return new NextResponse("Database not available", { status: 500 });
    }

    // Check if lab exists and is open
    const lab = await prisma.lab.findUnique({
      where: { id: labId }
    });

    if (!lab) {
      return new NextResponse("Lab not found", { status: 404 });
    }

    if (lab.status === "closed") {
      return new NextResponse("Lab is closed for contributions", { status: 400 });
    }

    // Create contribution
    const contribution = await prisma.contribution.create({
      data: {
        labId,
        title,
        content,
        type: type || "proposal",
        author,
        authorEmail: authorEmail || null,
        status: "pending"
      }
    });

    return NextResponse.json({
      success: true,
      contribution: {
        id: contribution.id,
        title: contribution.title,
        author: contribution.author,
        type: contribution.type,
        status: contribution.status,
        createdAt: contribution.createdAt
      },
      message: "Contribution submitted successfully"
    });

  } catch (error) {
    console.error("Failed to submit contribution:", error);
    return new NextResponse("Failed to submit contribution", { status: 500 });
  }
}
