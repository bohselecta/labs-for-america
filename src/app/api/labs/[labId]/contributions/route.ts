import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkSpam, checkRateLimit, sanitizeContent } from "@/lib/spam-protection";
import { getPIIWarnings } from "@/lib/pii-masking";

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

    // Rate limiting check
    const rateLimitKey = `${author}:${authorEmail || 'anonymous'}`;
    const rateLimit = checkRateLimit(rateLimitKey, 5, 3600000); // 5 submissions per hour
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded", 
          resetTime: rateLimit.resetTime,
          message: "Too many submissions. Please wait before submitting again."
        },
        { status: 429 }
      );
    }

    // Spam protection
    const spamCheck = checkSpam(content);
    if (spamCheck.action === 'block') {
      return NextResponse.json(
        { 
          error: "Content blocked", 
          reasons: spamCheck.reasons,
          message: "Your contribution was flagged as spam and cannot be submitted."
        },
        { status: 400 }
      );
    }

    // PII detection
    const piiWarnings = getPIIWarnings(content);
    
    // Sanitize content
    const sanitizedContent = sanitizeContent(content);

    // Create contribution
    const contribution = await prisma.contribution.create({
      data: {
        labId,
        title: sanitizeContent(title),
        content: sanitizedContent,
        type,
        author: sanitizeContent(author),
        authorEmail: authorEmail ? sanitizeContent(authorEmail) : null,
        tags: tags || [],
        fileUrl: fileUrl || null,
        status: spamCheck.action === 'flag' ? 'pending' : 'pending' // Flagged content goes to pending for review
      }
    });

    // Log moderation info
    console.log(`Contribution ${contribution.id} created:`, {
      spamCheck: spamCheck.isSpam,
      piiWarnings: piiWarnings.length,
      rateLimitRemaining: rateLimit.remaining
    });

    return NextResponse.json({ 
      contribution,
      moderation: {
        spamCheck: spamCheck.isSpam,
        piiWarnings: piiWarnings.length > 0,
        flagged: spamCheck.action === 'flag'
      }
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating contribution:", error);
    return NextResponse.json(
      { error: "Failed to create contribution" },
      { status: 500 }
    );
  }
}
