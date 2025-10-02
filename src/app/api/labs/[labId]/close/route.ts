import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateLabReport, saveLabReport, LabReportData } from "@/lib/lab-report-generator";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ labId: string }> }
) {
  try {
    const { labId } = await params;
    const body = await request.json();
    const { decisions, nextSteps, highlights } = body;

    if (!prisma) {
      return NextResponse.json({ error: "Database not available" }, { status: 500 });
    }

    // Get lab data
    const lab = await prisma.lab.findUnique({
      where: { id: labId },
      include: {
        contributions: {
          include: {
            votes: true
          }
        },
        org: true
      }
    });

    if (!lab) {
      return NextResponse.json({ error: "Lab not found" }, { status: 404 });
    }

    // Get all contributors
    const contributors = await prisma.contribution.findMany({
      where: { labId },
      select: {
        author: true,
        authorEmail: true,
        title: true,
        status: true,
        content: true,
        voteCount: true
      }
    });

    // Group contributions by status
    const accepted = contributors.filter(c => c.status === "accepted");
    const pending = contributors.filter(c => c.status === "pending" || c.status === "in-review");
    const rejected = contributors.filter(c => c.status === "rejected");

    // Create participants list
    const participants = contributors.map(c => ({
      name: c.author,
      role: "Contributor",
      contributions: c.title
    }));

    // Generate report data
    const reportData: LabReportData = {
      lab_title: lab.title,
      lab_type: lab.category,
      lab_organizer: lab.org.name,
      lab_opened: lab.createdAt.toISOString().split('T')[0],
      lab_closed: new Date().toISOString().split('T')[0],
      lab_purpose: lab.summary,
      participants,
      highlights: highlights || [],
      accepted: accepted.map(c => ({
        title: c.title,
        author: c.author,
        summary: c.content.substring(0, 100) + "..."
      })),
      pending: pending.map(c => ({
        title: c.title,
        author: c.author,
        summary: c.content.substring(0, 100) + "..."
      })),
      rejected: rejected.map(c => ({
        title: c.title,
        author: c.author,
        reason: "Not selected for implementation"
      })),
      decisions: decisions || [],
      next_steps: nextSteps || [],
      lab_id: labId,
      lab_tags: lab.category,
      archive_path: `/archive/${labId}/report.md`
    };

    // Generate and save report
    const reportContent = generateLabReport(reportData);
    const reportPath = saveLabReport(labId, reportContent);

    // Update lab status
    await prisma.lab.update({
      where: { id: labId },
      data: {
        status: "closed",
        closedAt: new Date(),
        reportPath
      }
    });

    return NextResponse.json({
      success: true,
      reportPath,
      message: "Lab closed successfully and report generated"
    });

  } catch (error) {
    console.error("Error closing lab:", error);
    return NextResponse.json(
      { error: "Failed to close lab" },
      { status: 500 }
    );
  }
}
