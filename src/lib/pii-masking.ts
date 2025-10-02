// PII (Personally Identifiable Information) masking utilities
export interface PIIMaskingOptions {
  maskEmails?: boolean;
  maskPhones?: boolean;
  maskSSNs?: boolean;
  maskAddresses?: boolean;
  maskNames?: boolean;
  customPatterns?: RegExp[];
}

const DEFAULT_OPTIONS: PIIMaskingOptions = {
  maskEmails: true,
  maskPhones: true,
  maskSSNs: true,
  maskAddresses: true,
  maskNames: false, // Usually we want to keep names for attribution
  customPatterns: []
};

// Common PII patterns
const EMAIL_PATTERN = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const PHONE_PATTERN = /\b(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/g;
const SSN_PATTERN = /\b\d{3}-?\d{2}-?\d{4}\b/g;
const ADDRESS_PATTERN = /\b\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Circle|Cir|Court|Ct)\b/gi;

export function maskPII(text: string, options: PIIMaskingOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let maskedText = text;

  // Mask emails
  if (opts.maskEmails) {
    maskedText = maskedText.replace(EMAIL_PATTERN, (match) => {
      const [localPart, domain] = match.split('@');
      const maskedLocal = localPart.length > 2 
        ? localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
        : '*'.repeat(localPart.length);
      return `${maskedLocal}@${domain}`;
    });
  }

  // Mask phone numbers
  if (opts.maskPhones) {
    maskedText = maskedText.replace(PHONE_PATTERN, (match) => {
      const digits = match.replace(/\D/g, '');
      if (digits.length >= 10) {
        return `***-***-${digits.slice(-4)}`;
      }
      return '***-***-****';
    });
  }

  // Mask SSNs
  if (opts.maskSSNs) {
    maskedText = maskedText.replace(SSN_PATTERN, '***-**-****');
  }

  // Mask addresses
  if (opts.maskAddresses) {
    maskedText = maskedText.replace(ADDRESS_PATTERN, (match) => {
      const parts = match.split(' ');
      if (parts.length >= 2) {
        return `${'*'.repeat(parts[0].length)} ${parts.slice(1).join(' ')}`;
      }
      return '*'.repeat(match.length);
    });
  }

  // Apply custom patterns
  opts.customPatterns?.forEach(pattern => {
    maskedText = maskedText.replace(pattern, '*'.repeat(8));
  });

  return maskedText;
}

// Safe display for public content
export function createSafeDisplay(text: string, options?: PIIMaskingOptions): string {
  return maskPII(text, options);
}

// Check if content contains PII
export function containsPII(text: string): boolean {
  return EMAIL_PATTERN.test(text) || 
         PHONE_PATTERN.test(text) || 
         SSN_PATTERN.test(text) || 
         ADDRESS_PATTERN.test(text);
}

// Get PII warnings for moderation
export function getPIIWarnings(text: string): string[] {
  const warnings: string[] = [];
  
  if (EMAIL_PATTERN.test(text)) warnings.push('Contains email addresses');
  if (PHONE_PATTERN.test(text)) warnings.push('Contains phone numbers');
  if (SSN_PATTERN.test(text)) warnings.push('Contains SSN-like patterns');
  if (ADDRESS_PATTERN.test(text)) warnings.push('Contains street addresses');
  
  return warnings;
}
