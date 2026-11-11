export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isDemoContent: boolean;
}

export const faqMeta = {
  eyebrow: "QUESTIONS",
  heading: "ESSENTIAL DETAILS.",
};

export const faqData: FAQItem[] = [
  {
    id: "membership-options",
    question: "What membership options are available?",
    answer:
      "Illustrative demo tiers include Starter (₹1,499/mo), Performance (₹2,499/mo), and Elite (₹3,999/mo) across Monthly, Quarterly, and Annual durations—all editable in data/memberships.ts.",
    isDemoContent: true,
  },
  {
    id: "beginners-join",
    question: "Can beginners join?",
    answer:
      "Yes. Every new member begins with a baseline movement orientation covering equipment setup, safe lifting mechanics, and an approachable starting plan.",
    isDemoContent: true,
  },
  {
    id: "personal-training",
    question: "Do you offer personal training?",
    answer:
      "Yes. Dedicated 1-on-1 coaching is included in the illustrative Elite tier and available as an upgrade for Starter and Performance members.",
    isDemoContent: true,
  },
  {
    id: "trial-session",
    question: "Can I book a trial session?",
    answer:
      "Yes. Submit the Book a Free Trial form below with your preferred program and date to generate a direct WhatsApp enquiry for the club desk.",
    isDemoContent: true,
  },
  {
    id: "opening-hours",
    question: "What are your opening hours?",
    answer:
      "Sample demo timings are Monday–Saturday 05:30 AM – 10:30 PM and Sunday 07:00 AM – 02:00 PM. Replace these in data/site.ts with real club timings.",
    isDemoContent: true,
  },
  {
    id: "gym-location",
    question: "Where is the gym located?",
    answer:
      "This demo uses a sample Ahmedabad placeholder location near Sindhu Bhavan Road / SG Highway. Replace with your verified address and map pin in data/site.ts.",
    isDemoContent: true,
  },
];
