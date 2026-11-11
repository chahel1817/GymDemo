export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isDemoContent: boolean;
}

export const faqMeta = {
  eyebrow: "06 // QUESTIONS",
  heading: "FREQUENTLY ASKED QUESTIONS.",
  subheading:
    "Clear answers for prospective members. Sample details marked as demo placeholders can be updated in minutes with your verified studio policies.",
};

export const faqData: FAQItem[] = [
  {
    id: "membership-options",
    question: "What membership options are available?",
    answer:
      "We showcase three illustrative demo tiers—Starter (₹1,499/month), Performance (₹2,499/month), and Elite (₹3,999/month)—with Monthly, Quarterly, and Annual billing options. Please note these figures are sample placeholders for demo preview; your club owner can replace them with real plans and seasonal offers.",
    isDemoContent: true,
  },
  {
    id: "beginners-join",
    question: "Can beginners join?",
    answer:
      "Yes. Every new member starts with a baseline orientation covering equipment setup, safe lifting posture, and an approachable starting plan tailored to your current fitness level—no prior gym experience required.",
    isDemoContent: true,
  },
  {
    id: "personal-training",
    question: "Do you offer personal training?",
    answer:
      "Yes. Dedicated 1-on-1 coaching is available both as an inclusion within the illustrative Elite tier and as an add-on to Starter or Performance memberships. Coaching packages and session frequency can be customised to your goals during your trial consultation.",
    isDemoContent: true,
  },
  {
    id: "trial-session",
    question: "Can I book a trial session?",
    answer:
      "Yes. Use the Book a Free Trial form on this page to choose your preferred training program and date. Your enquiry prepares a direct WhatsApp message for the club reception desk to confirm an available slot.",
    isDemoContent: true,
  },
  {
    id: "opening-hours",
    question: "What are your opening hours?",
    answer:
      "Sample demo timings are set to Monday–Saturday from 05:30 AM to 10:30 PM, and Sunday from 07:00 AM to 02:00 PM. Replace these placeholder hours in the central site configuration with your gym's actual operating schedule.",
    isDemoContent: true,
  },
  {
    id: "gym-location",
    question: "Where is the gym located?",
    answer:
      "This demo showcase uses a sample placeholder location in Ahmedabad, Gujarat (near Sindhu Bhavan Road / SG Highway). Replace the address and Google Maps link in data/site.ts with your verified building name, landmark, and exact map pin.",
    isDemoContent: true,
  },
];

