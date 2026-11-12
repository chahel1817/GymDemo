import { siteConfig } from "@/data/site";
import { normalizeIndianPhone } from "./utils";
import type { EnquiryFormValues } from "./validations";

export interface WhatsAppConfigValidation {
  valid: boolean;
  normalized: string;
  isPlaceholder: boolean;
  reason?: string;
}

export interface WhatsAppPayloadResult {
  url: string | null;
  formattedMessage: string;
  isDemoPreview: boolean;
  validationError?: string;
}

/**
 * Validates the configured business WhatsApp number in data/site.ts.
 * Rejects empty, malformed, or dummy repeated-digit numbers (e.g. 910000000000).
 */
export function validateConfiguredWhatsAppNumber(
  rawNumber: string,
  declaredPlaceholder: boolean,
): WhatsAppConfigValidation {
  const digits = rawNumber.replace(/\D/g, "");
  const isRepeatedDigits = digits.length > 0 && /^(\d)\1+$/.test(digits);
  const isDummyZeroTail =
    digits === "910000000000" || digits.endsWith("00000000");

  if (declaredPlaceholder || isRepeatedDigits || isDummyZeroTail) {
    return {
      valid: false,
      normalized: digits,
      isPlaceholder: true,
      reason:
        "A demo placeholder WhatsApp number is configured. Update data/site.ts before live enquiries.",
    };
  }

  // Standard Indian WhatsApp format: 91 + [6-9]XXXXXXXXX (12 digits)
  if (/^91[6-9]\d{9}$/.test(digits)) {
    return { valid: true, normalized: digits, isPlaceholder: false };
  }

  // Fallback general international E.164 digit length check (10-15 digits, non-zero start)
  if (/^[1-9]\d{9,14}$/.test(digits)) {
    return { valid: true, normalized: digits, isPlaceholder: false };
  }

  return {
    valid: false,
    normalized: digits,
    isPlaceholder: false,
    reason:
      "Configured WhatsApp number in data/site.ts is invalid. Expected format: 91XXXXXXXXXX.",
  };
}

export function buildWhatsAppEnquiry(
  values: EnquiryFormValues,
): WhatsAppPayloadResult {
  const cleanUserPhone = normalizeIndianPhone(values.phone);
  const lines = [
    `Hello ${siteConfig.brand.name} Team,`,
    "",
    "I would like to book a Free Trial / Membership Enquiry:",
    `- Name: ${values.fullName.trim()}`,
    `- Mobile: +91 ${cleanUserPhone}`,
    values.email.trim() ? `- Email: ${values.email.trim()}` : null,
    `- Preferred Program: ${values.preferredProgram}`,
    values.membershipInterest && values.membershipInterest !== "Not Decided Yet"
      ? `- Membership Plan Interest: ${values.membershipInterest}`
      : null,
    `- Preferred Date: ${values.preferredDate}`,
    values.message?.trim() ? `- Notes: ${values.message.trim()}` : null,
    "",
    siteConfig.isDemo
      ? "[Prepared via Demo Showcase Form]"
      : "[Prepared via Official Website Form]",
  ].filter((line): line is string => line !== null);

  const formattedMessage = lines.join("\n");
  const configCheck = validateConfiguredWhatsAppNumber(
    siteConfig.contact.whatsappNumber,
    siteConfig.contact.whatsappIsPlaceholder,
  );

  // Never silently route enquiries to a placeholder number
  if (configCheck.isPlaceholder) {
    return {
      url: null,
      formattedMessage,
      isDemoPreview: true,
    };
  }

  if (!configCheck.valid) {
    return {
      url: null,
      formattedMessage,
      isDemoPreview: false,
      validationError: configCheck.reason,
    };
  }

  const encodedText = encodeURIComponent(formattedMessage);
  return {
    url: `https://wa.me/${configCheck.normalized}?text=${encodedText}`,
    formattedMessage,
    isDemoPreview: false,
  };
}
