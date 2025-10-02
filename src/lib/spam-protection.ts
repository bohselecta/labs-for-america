// Spam protection and content moderation utilities
export interface SpamCheckResult {
  isSpam: boolean;
  confidence: number; // 0-1 scale
  reasons: string[];
  action: 'allow' | 'flag' | 'block';
}

export interface SpamProtectionOptions {
  maxLength: number;
  minLength: number;
  maxLinks: number;
  maxCapsRatio: number;
  suspiciousWords: string[];
  bannedDomains: string[];
}

const DEFAULT_SPAM_OPTIONS: SpamProtectionOptions = {
  maxLength: 5000,
  minLength: 10,
  maxLinks: 3,
  maxCapsRatio: 0.5,
  suspiciousWords: [
    'click here', 'buy now', 'free money', 'make money', 'work from home',
    'guaranteed', 'no risk', 'limited time', 'act now', 'urgent',
    'congratulations', 'winner', 'prize', 'lottery', 'inheritance'
  ],
  bannedDomains: [
    'bit.ly', 'tinyurl.com', 'short.link', 'goo.gl', 't.co'
  ]
};

// Check for spam patterns
export function checkSpam(content: string, options: SpamProtectionOptions = DEFAULT_SPAM_OPTIONS): SpamCheckResult {
  const reasons: string[] = [];
  let spamScore = 0;

  // Length checks
  if (content.length > options.maxLength) {
    reasons.push(`Content too long (${content.length} > ${options.maxLength})`);
    spamScore += 0.3;
  }

  if (content.length < options.minLength) {
    reasons.push(`Content too short (${content.length} < ${options.minLength})`);
    spamScore += 0.2;
  }

  // Link checks
  const linkPattern = /https?:\/\/[^\s]+/g;
  const links = content.match(linkPattern) || [];
  
  if (links.length > options.maxLinks) {
    reasons.push(`Too many links (${links.length} > ${options.maxLinks})`);
    spamScore += 0.4;
  }

  // Check for suspicious domains
  const suspiciousDomains = links.filter(link => 
    options.bannedDomains.some(domain => link.includes(domain))
  );
  
  if (suspiciousDomains.length > 0) {
    reasons.push(`Contains suspicious domains: ${suspiciousDomains.join(', ')}`);
    spamScore += 0.6;
  }

  // Caps ratio check
  const capsCount = (content.match(/[A-Z]/g) || []).length;
  const capsRatio = capsCount / content.length;
  
  if (capsRatio > options.maxCapsRatio) {
    reasons.push(`Too many capital letters (${(capsRatio * 100).toFixed(1)}%)`);
    spamScore += 0.3;
  }

  // Suspicious words check
  const lowerContent = content.toLowerCase();
  const foundSuspiciousWords = options.suspiciousWords.filter(word => 
    lowerContent.includes(word.toLowerCase())
  );
  
  if (foundSuspiciousWords.length > 0) {
    reasons.push(`Contains suspicious words: ${foundSuspiciousWords.join(', ')}`);
    spamScore += foundSuspiciousWords.length * 0.2;
  }

  // Repetitive content check
  const words = content.toLowerCase().split(/\s+/);
  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const maxRepetition = Math.max(...Object.values(wordCounts));
  const repetitionRatio = maxRepetition / words.length;
  
  if (repetitionRatio > 0.3) {
    reasons.push('Content appears repetitive');
    spamScore += 0.4;
  }

  // Determine action
  let action: 'allow' | 'flag' | 'block';
  if (spamScore >= 0.8) {
    action = 'block';
  } else if (spamScore >= 0.5) {
    action = 'flag';
  } else {
    action = 'allow';
  }

  return {
    isSpam: spamScore >= 0.5,
    confidence: Math.min(spamScore, 1),
    reasons,
    action
  };
}

// Rate limiting for submissions
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

const submissionCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, maxSubmissions: number = 5, windowMs: number = 3600000): RateLimitResult {
  const now = Date.now();
  const key = identifier.toLowerCase();
  
  const current = submissionCounts.get(key);
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    submissionCounts.set(key, {
      count: 1,
      resetTime: now + windowMs
    });
    
    return {
      allowed: true,
      remaining: maxSubmissions - 1,
      resetTime: now + windowMs
    };
  }
  
  if (current.count >= maxSubmissions) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: current.resetTime
    };
  }
  
  // Increment count
  current.count++;
  submissionCounts.set(key, current);
  
  return {
    allowed: true,
    remaining: maxSubmissions - current.count,
    resetTime: current.resetTime
  };
}

// Content sanitization
export function sanitizeContent(content: string): string {
  // Remove potentially dangerous HTML
  const dangerousTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const sanitized = content.replace(dangerousTags, '');
  
  // Remove excessive whitespace
  return sanitized.replace(/\s+/g, ' ').trim();
}

// Generate moderation report
export async function generateModerationReport(content: string, author: string): Promise<{
  piiWarnings: string[];
  spamCheck: SpamCheckResult;
  sanitizedContent: string;
  recommendations: string[];
}> {
  const { getPIIWarnings } = await import('./pii-masking');
  
  const piiWarnings = getPIIWarnings(content);
  const spamCheck = checkSpam(content);
  const sanitizedContent = sanitizeContent(content);
  
  const recommendations: string[] = [];
  
  if (piiWarnings.length > 0) {
    recommendations.push('Consider removing or masking personal information');
  }
  
  if (spamCheck.isSpam) {
    recommendations.push('Content flagged for review - may need moderation');
  }
  
  if (content.length > 2000) {
    recommendations.push('Consider breaking into smaller, focused contributions');
  }
  
  return {
    piiWarnings,
    spamCheck,
    sanitizedContent,
    recommendations
  };
}
