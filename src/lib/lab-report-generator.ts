import fs from 'fs';
import path from 'path';

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

export function generateLabReport(data: LabReportData): string {
  const templatePath = path.join(process.cwd(), 'templates', 'lab-report.md');
  let template = fs.readFileSync(templatePath, 'utf8');

  // Simple template replacement (could use a proper templating engine)
  template = template.replace(/\{\{lab_title\}\}/g, data.lab_title);
  template = template.replace(/\{\{lab_type\}\}/g, data.lab_type);
  template = template.replace(/\{\{lab_organizer\}\}/g, data.lab_organizer);
  template = template.replace(/\{\{lab_opened\}\}/g, data.lab_opened);
  template = template.replace(/\{\{lab_closed\}\}/g, data.lab_closed);
  template = template.replace(/\{\{lab_purpose\}\}/g, data.lab_purpose);
  template = template.replace(/\{\{lab_id\}\}/g, data.lab_id);
  template = template.replace(/\{\{lab_tags\}\}/g, data.lab_tags);
  template = template.replace(/\{\{archive_path\}\}/g, data.archive_path);

  // Replace participants table
  const participantsTable = data.participants.map(p => 
    `| ${p.name} | ${p.role} | ${p.contributions} |`
  ).join('\n');
  template = template.replace(/\{\{#each participants\}\}[\s\S]*?\{\{\/each\}\}/g, participantsTable);

  // Replace highlights
  const highlightsList = data.highlights.map(h => `- ${h}`).join('\n');
  template = template.replace(/\{\{#each highlights\}\}[\s\S]*?\{\{\/each\}\}/g, highlightsList);

  // Replace accepted contributions
  const acceptedList = data.accepted.map(c => 
    `- **${c.title}** – submitted by ${c.author} – ${c.summary}`
  ).join('\n');
  template = template.replace(/\{\{#each accepted\}\}[\s\S]*?\{\{\/each\}\}/g, acceptedList);

  // Replace pending contributions
  const pendingList = data.pending.map(c => 
    `- **${c.title}** – submitted by ${c.author} – ${c.summary}`
  ).join('\n');
  template = template.replace(/\{\{#each pending\}\}[\s\S]*?\{\{\/each\}\}/g, pendingList);

  // Replace rejected contributions
  const rejectedList = data.rejected.map(c => 
    `- **${c.title}** – submitted by ${c.author} – ${c.reason}`
  ).join('\n');
  template = template.replace(/\{\{#each rejected\}\}[\s\S]*?\{\{\/each\}\}/g, rejectedList);

  // Replace decisions
  const decisionsList = data.decisions.map(d => `- ${d}`).join('\n');
  template = template.replace(/\{\{#each decisions\}\}[\s\S]*?\{\{\/each\}\}/g, decisionsList);

  // Replace next steps
  const nextStepsList = data.next_steps.map(s => `- ${s}`).join('\n');
  template = template.replace(/\{\{#each next_steps\}\}[\s\S]*?\{\{\/each\}\}/g, nextStepsList);

  return template;
}

export function saveLabReport(labId: string, reportContent: string): string {
  const archiveDir = path.join(process.cwd(), 'archive', labId);
  const reportPath = path.join(archiveDir, 'report.md');
  
  // Ensure archive directory exists
  fs.mkdirSync(archiveDir, { recursive: true });
  
  // Save the report
  fs.writeFileSync(reportPath, reportContent);
  
  return `/archive/${labId}/report.md`;
}
