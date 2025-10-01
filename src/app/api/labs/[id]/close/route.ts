import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateLabReport, saveLabReport } from "@/lib/lab-report";

export async function POST(req: NextRequest) {
  try {
    const { labId } = await req.json();
    
    if (!labId) {
      return new NextResponse("Lab ID required", { status: 400 });
    }

    if (!prisma) {
      return new NextResponse("Database not available", { status: 500 });
    }

    // Check if lab exists and is open
    const lab = await prisma.lab.findUnique({
      where: { id: labId },
      include: { contributions: true }
    });

    if (!lab) {
      return new NextResponse("Lab not found", { status: 404 });
    }

    if (lab.status === "closed") {
      return new NextResponse("Lab is already closed", { status: 400 });
    }

    // Generate and save report
    const reportContent = await generateLabReport(labId);
    const reportPath = await saveLabReport(labId, reportContent);

    return NextResponse.json({
      success: true,
      reportPath,
      message: "Lab closed and report generated successfully"
    });

  } catch (error) {
    console.error("Failed to close lab:", error);
    return new NextResponse("Failed to close lab", { status: 500 });
  }
}
