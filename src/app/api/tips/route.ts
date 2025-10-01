import { NextRequest, NextResponse } from "next/server";

// In a real app: authenticate reviewers, store privately, notify on-call, etc.
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const subject = form.get("subject") || "(no subject)";
  const body = form.get("body") || "";
  
  // TODO: store in secure table, email to LE inbox, etc.
  console.log("[CONFIDENTIAL TIP]", subject, body);
  
  return NextResponse.redirect(new URL("/tips?sent=1", req.url));
}
