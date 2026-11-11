import { siteConfig } from "@/data/site";
import { normalizeIndianPhone } from "./utils";
import type { EnquiryFormValues } from "./validations";

export interface WhatsAppPayloadResult {
  url: string;
  formattedMessage: string;
  isPlaceholderNumber: boolean;
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
    values.membershipInterest
      ? `- Membership Tier Interest: ${values.membershipInterest}`
      : null,
    `- Preferred Date: ${values.preferredDate}`,
    values.message?.trim() ? `- Notes: ${values.message.trim()}` : null,
    "",
    siteConfig.isDemo
      ? "[Sent via Demo Website Enquiry Form]"
      : "[Sent via Official Website]",
  ].filter((line): line is string => line !== null);

  const formattedMessage = lines.join("\n");
  const targetNumber = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  const encodedText = encodeURIComponent(formattedMessage);

  return {
    url: `https://wa.me/${targetNumber}?text=${encodedText}`,
    formattedMessage,
    isPlaceholderNumber: siteConfig.contact.whatsappIsPlaceholder,
  };
}

