import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export interface LabReportData {
  lab_title: string;
  lab_type: string;
  lab_organizer: string;
  lab_opened: string;
  lab_closed: string;
  lab_purpose: string;
  participants: Array<{
    name: string;
    role: string;
    contributions: string;
  }>;
  highlights: string[];
  accepted: Array<{
    title: string;
    author: string;
    summary: string;
  }>;
  pending: Array<{
    title: string;
    author: string;
    summary: string;
  }>;
  rejected: Array<{
    title: string;
    author: string;
    reason: string;
  }>;
  decisions: string[];
  next_steps: string[];
  lab_id: string;
  lab_tags: string;
  archive_path: string;
}

export async function generateLabReport(labId: string): Promise<string> {
  if (!prisma) {
    throw new Error("Database not available");
  }

  // Fetch lab and related data
  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    include: {
      org: true,
      contributions: {
        include: {
          votes: true
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!lab) {
    throw new Error("Lab not found");
  }

  // Generate participant summary
  const participants = lab.contributions.reduce((acc, contribution) => {
    const existing = acc.find(p => p.name === contribution.author);
    if (existing) {
      existing.contributions += `, ${contribution.type}`;
    } else {
      acc.push({
        name: contribution.author,
        role: "Community Member", // Could be enhanced with user roles
        contributions: contribution.type
      });
    }
    return acc;
  }, [] as Array<{ name: string; role: string; contributions: string }>);

  // Categorize contributions
  const accepted = lab.contributions
    .filter(c => c.status === "accepted")
    .map(c => ({
      title: c.title,
      author: c.author,
      summary: c.content.substring(0, 100) + (c.content.length > 100 ? "..." : "")
    }));

  const pending = lab.contributions
    .filter(c => c.status === "pending")
    .map(c => ({
      title: c.title,
      author: c.author,
      summary: c.content.substring(0, 100) + (c.content.length > 100 ? "..." : "")
    }));

  const rejected = lab.contributions
    .filter(c => c.status === "rejected")
    .map(c => ({
      title: c.title,
      author: c.author,
      reason: "Out of scope or duplicate"
    }));

  // Generate discussion highlights (simplified for now)
  const highlights = [
    `Lab received ${lab.contributions.length} total contributions`,
    `Most active contributor: ${participants[0]?.name || "N/A"}`,
    `Top contribution type: ${lab.contributions.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)}`
  ];

  // Prepare report data
  const reportData: LabReportData = {
    lab_title: lab.title,
    lab_type: lab.category,
    lab_organizer: lab.org.name,
    lab_opened: lab.createdAt.toLocaleDateString(),
    lab_closed: lab.closedAt?.toLocaleDateString() || new Date().toLocaleDateString(),
    lab_purpose: lab.summary,
    participants,
    highlights,
    accepted,
    pending,
    rejected,
    decisions: [
      "Contributions reviewed and categorized",
      "Next steps identified for implementation"
    ],
    next_steps: [
      "Follow up with accepted contributors",
      "Schedule implementation review"
    ],
    lab_id: lab.id,
    lab_tags: lab.category.toLowerCase(),
    archive_path: `/archive/${lab.id}/report.md`
  };

  // Load template
  const templatePath = path.join(process.cwd(), "templates", "lab-report.md");
  const template = fs.readFileSync(templatePath, "utf-8");

  // Simple template replacement (could use Handlebars for more complex templating)
  let report = template;
  
  // Replace basic fields
  Object.entries(reportData).forEach(([key, value]) => {
    if (typeof value === "string") {
      report = report.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
  });

  // Replace arrays (simplified)
  report = report.replace(/\{\{#each participants\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return participants.map(p => 
      template.replace(/\{\{name\}\}/g, p.name)
              .replace(/\{\{role\}\}/g, p.role)
              .replace(/\{\{contributions\}\}/g, p.contributions)
    ).join("");
  });

  report = report.replace(/\{\{#each highlights\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return highlights.map(h => template.replace(/\{\{this\}\}/g, h)).join("");
  });

  report = report.replace(/\{\{#each accepted\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return accepted.map(a => 
      template.replace(/\{\{title\}\}/g, a.title)
              .replace(/\{\{author\}\}/g, a.author)
              .replace(/\{\{summary\}\}/g, a.summary)
    ).join("");
  });

  report = report.replace(/\{\{#each pending\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return pending.map(p => 
      template.replace(/\{\{title\}\}/g, p.title)
              .replace(/\{\{author\}\}/g, p.author)
              .replace(/\{\{summary\}\}/g, p.summary)
    ).join("");
  });

  report = report.replace(/\{\{#each rejected\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return rejected.map(r => 
      template.replace(/\{\{title\}\}/g, r.title)
              .replace(/\{\{author\}\}/g, r.author)
              .replace(/\{\{reason\}\}/g, r.reason)
    ).join("");
  });

  report = report.replace(/\{\{#each decisions\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return reportData.decisions.map(d => template.replace(/\{\{this\}\}/g, d)).join("");
  });

  report = report.replace(/\{\{#each next_steps\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, template) => {
    return reportData.next_steps.map(n => template.replace(/\{\{this\}\}/g, n)).join("");
  });

  return report;
}

export async function saveLabReport(labId: string, reportContent: string): Promise<string> {
  const archiveDir = path.join(process.cwd(), "public", "archive", labId);
  const reportPath = path.join(archiveDir, "report.md");
  
  // Ensure directory exists
  fs.mkdirSync(archiveDir, { recursive: true });
  
  // Save report
  fs.writeFileSync(reportPath, reportContent);
  
  // Update lab with report path
  if (prisma) {
    await prisma.lab.update({
      where: { id: labId },
      data: { 
        reportPath: `/archive/${labId}/report.md`,
        closedAt: new Date(),
        status: "closed"
      }
    });
  }
  
  return `/archive/${labId}/report.md`;
}
