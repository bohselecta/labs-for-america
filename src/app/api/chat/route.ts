import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// naive in-memory rate limit
const lastPostByIp = new Map<string, number>();

function sanitize(text: string) {
  // mask phone numbers & exact addresses (very basic patterns)
  let out = text.replace(/\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/g, "[phone hidden]");
  out = out.replace(/\b\d{1,5}\s+([A-Za-z0-9.\-]+\s){1,3}(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln)\b/gi, "[address hidden]");
  return out;
}

function anonIdFromIp(ip: string) {
  // tiny pseudo-id
  const n = Math.abs([...ip].reduce((a, c) => a + c.charCodeAt(0), 0)) % 9000 + 1000;
  return `User-${n}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel") || "public";
  
  const msgs = await prisma.chatMessage.findMany({
    where: { channel, approved: true },
    orderBy: { createdAt: "asc" },
    take: 200
  });
  
  return NextResponse.json(msgs);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "0.0.0.0";
  const now = Date.now();
  const last = lastPostByIp.get(ip) || 0;
  
  if (now - last < 5000) { // 5s cooldown
    return new NextResponse("You're sending messages too quickly. Please wait a moment.", { status: 429 });
  }
  
  lastPostByIp.set(ip, now);

  const body = await req.json();
  const channel = body.channel || "public";
  let text = (body.text || "").toString().slice(0, 1000); // hard cap
  text = sanitize(text);

  // org
  const org = await prisma.org.upsert({
    where: { slug: "city" },
    update: {},
    create: { slug: "city", name: "City of Example" }
  });

  // Enhanced safety: pre-moderation for JusticeLabs crisis modes
  const needsPreMod = org.crisisMode === "MANHUNT" || org.crisisMode === "EMERGENCY";
  
  const msg = await prisma.chatMessage.create({
    data: {
      orgId: org.id,
      channel,
      anonId: anonIdFromIp(ip),
      text,
      lat: typeof body.lat === "number" ? body.lat : null,
      lon: typeof body.lon === "number" ? body.lon : null,
      approved: !needsPreMod // Auto-approve for normal mode, pre-mod for crisis
    }
  });

  return NextResponse.json({ 
    ok: true, 
    id: msg.id,
    needsModeration: needsPreMod,
    message: needsPreMod ? "Message submitted for review. It will appear after moderation." : "Message posted successfully."
  });
}