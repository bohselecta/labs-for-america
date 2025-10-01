import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { contributionId, voterName, voterEmail } = await req.json();
    
    if (!contributionId || !voterName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (!prisma) {
      return new NextResponse("Database not available", { status: 500 });
    }

    // Check if contribution exists
    const contribution = await prisma.contribution.findUnique({
      where: { id: contributionId }
    });

    if (!contribution) {
      return new NextResponse("Contribution not found", { status: 404 });
    }

    // Check if user already voted
    const existingVote = await prisma.contributionVote.findUnique({
      where: {
        contributionId_voterEmail: {
          contributionId,
          voterEmail: voterEmail || ""
        }
      }
    });

    if (existingVote) {
      return new NextResponse("You have already voted on this contribution", { status: 400 });
    }

    // Create vote
    const vote = await prisma.contributionVote.create({
      data: {
        contributionId,
        voterName,
        voterEmail: voterEmail || null
      }
    });

    // Update contribution vote count
    await prisma.contribution.update({
      where: { id: contributionId },
      data: {
        voteCount: {
          increment: 1
        }
      }
    });

    return NextResponse.json({
      success: true,
      vote: {
        id: vote.id,
        voterName: vote.voterName,
        createdAt: vote.createdAt
      },
      message: "Vote recorded successfully"
    });

  } catch (error) {
    console.error("Failed to vote on contribution:", error);
    return new NextResponse("Failed to vote on contribution", { status: 500 });
  }
}
