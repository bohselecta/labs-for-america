import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ contributionId: string }> }
) {
  try {
    const { contributionId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Validate status
    const validStatuses = ["pending", "in-review", "accepted", "rejected"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update contribution status
    const contribution = await prisma.contribution.update({
      where: { id: contributionId },
      data: { status }
    });

    return NextResponse.json({ contribution });

  } catch (error) {
    console.error("Error updating contribution status:", error);
    return NextResponse.json(
      { error: "Failed to update contribution status" },
      { status: 500 }
    );
  }
}
