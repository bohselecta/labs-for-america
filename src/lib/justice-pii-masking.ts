// PII Masking utility for JusticeLabs
export function maskPII(text: string): string {
  if (!text) return text;

  let masked = text;

  // Mask phone numbers (US format)
  masked = masked.replace(
    /\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/g,
    '[phone hidden]'
  );

  // Mask email addresses
  masked = masked.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    '[email hidden]'
  );

  // Mask addresses (basic US format)
  masked = masked.replace(
    /\b\d{1,5}\s+([A-Za-z0-9.\-]+\s){1,3}(St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl)\b/gi,
    '[address hidden]'
  );

  // Mask SSN (basic pattern)
  masked = masked.replace(
    /\b\d{3}-?\d{2}-?\d{4}\b/g,
    '[SSN hidden]'
  );

  // Mask credit card numbers (basic pattern)
  masked = masked.replace(
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    '[card number hidden]'
  );

  // Mask license plate numbers (basic US format)
  masked = masked.replace(
    /\b[A-Z]{1,3}\d{1,4}[A-Z]?\b/g,
    '[license plate hidden]'
  );

  return masked;
}

// Check if text contains PII
export function containsPII(text: string): boolean {
  if (!text) return false;

  const piiPatterns = [
    /\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/, // Phone
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, // Email
    /\b\d{1,5}\s+([A-Za-z0-9.\-]+\s){1,3}(St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl)\b/i, // Address
    /\b\d{3}-?\d{2}-?\d{4}\b/, // SSN
    /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/, // Credit card
    /\b[A-Z]{1,3}\d{1,4}[A-Z]?\b/ // License plate
  ];

  return piiPatterns.some(pattern => pattern.test(text));
}

// Get PII warnings for display
export function getPIIWarnings(text: string): string[] {
  if (!text) return [];

  const warnings: string[] = [];

  if (/\b(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})\b/.test(text)) {
    warnings.push('Phone number detected');
  }

  if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text)) {
    warnings.push('Email address detected');
  }

  if (/\b\d{1,5}\s+([A-Za-z0-9.\-]+\s){1,3}(St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Lane|Ln|Drive|Dr|Court|Ct|Place|Pl)\b/i.test(text)) {
    warnings.push('Address detected');
  }

  if (/\b\d{3}-?\d{2}-?\d{4}\b/.test(text)) {
    warnings.push('SSN detected');
  }

  if (/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/.test(text)) {
    warnings.push('Credit card number detected');
  }

  if (/\b[A-Z]{1,3}\d{1,4}[A-Z]?\b/.test(text)) {
    warnings.push('License plate detected');
  }

  return warnings;
}

// Create safe display version of text
export function createSafeDisplay(text: string): string {
  return maskPII(text);
}

// Validate text for public posting
export function validatePublicPost(text: string): {
  isValid: boolean;
  warnings: string[];
  maskedText: string;
} {
  const warnings = getPIIWarnings(text);
  const maskedText = maskPII(text);
  
  return {
    isValid: warnings.length === 0,
    warnings,
    maskedText
  };
}

// JusticeLabs specific PII patterns
export function maskJusticePII(text: string): string {
  let masked = maskPII(text);

  // Mask case numbers
  masked = masked.replace(
    /\b(Case|File|Report)\s*#?\s*\d{4,}\b/gi,
    '[case number hidden]'
  );

  // Mask badge numbers
  masked = masked.replace(
    /\b(Badge|Officer)\s*#?\s*\d{3,}\b/gi,
    '[badge number hidden]'
  );

  // Mask incident numbers
  masked = masked.replace(
    /\b(Incident|Report)\s*#?\s*\d{4,}\b/gi,
    '[incident number hidden]'
  );

  return masked;
}

// Check for JusticeLabs specific PII
export function containsJusticePII(text: string): boolean {
  if (!text) return false;

  const justicePatterns = [
    /\b(Case|File|Report)\s*#?\s*\d{4,}\b/i, // Case numbers
    /\b(Badge|Officer)\s*#?\s*\d{3,}\b/i, // Badge numbers
    /\b(Incident|Report)\s*#?\s*\d{4,}\b/i // Incident numbers
  ];

  return containsPII(text) || justicePatterns.some(pattern => pattern.test(text));
}

// Get comprehensive PII warnings for JusticeLabs
export function getJusticePIIWarnings(text: string): string[] {
  const standardWarnings = getPIIWarnings(text);
  const justiceWarnings: string[] = [];

  if (/\b(Case|File|Report)\s*#?\s*\d{4,}\b/i.test(text)) {
    justiceWarnings.push('Case number detected');
  }

  if (/\b(Badge|Officer)\s*#?\s*\d{3,}\b/i.test(text)) {
    justiceWarnings.push('Badge number detected');
  }

  if (/\b(Incident|Report)\s*#?\s*\d{4,}\b/i.test(text)) {
    justiceWarnings.push('Incident number detected');
  }

  return [...standardWarnings, ...justiceWarnings];
}
