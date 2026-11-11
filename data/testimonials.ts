export interface TestimonialItem {
  id: string;
  quote: string;
  memberLabel: string;
  programTag: string;
  isPlaceholder: boolean;
}

/**
 * White-label Testimonial Configuration.
 * Toggle `showSection` to false if you prefer hiding reviews until authentic
 * member quotes are collected, or replace the `items` array with real quotes.
 */
export const testimonialsConfig = {
  showSection: true,
  isDemoPlaceholderMode: true,
  eyebrow: "MEMBER STORIES // PREVIEW SLOT",
  heading: "READY FOR AUTHENTIC MEMBER STORIES.",
  notice:
    "NO FABRICATED REVIEWS — PLACEHOLDER LAYOUT SHOWN FOR DEMO PURPOSES. REPLACE WITH VERIFIED MEMBER QUOTES.",
  items: [
    {
      id: "placeholder-1",
      quote:
        "\"[Sample Member Story Slot] — Space reserved for a verified member's real experience with strength progression, coaching clarity, and club atmosphere.\"",
      memberLabel: "Verified Member Name (Placeholder)",
      programTag: "Strength & Conditioning",
      isPlaceholder: true,
    },
    {
      id: "placeholder-2",
      quote:
        "\"[Sample Member Story Slot] — Add authentic client quotes here once collected via Google Reviews or member check-ins—without fake ratings or inflated claims.\"",
      memberLabel: "Verified Member Name (Placeholder)",
      programTag: "Personal Training",
      isPlaceholder: true,
    },
  ] satisfies TestimonialItem[],
};

