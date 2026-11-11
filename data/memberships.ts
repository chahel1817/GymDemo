export type BillingDurationId = "monthly" | "quarterly" | "annual";

export interface BillingDurationOption {
  id: BillingDurationId;
  label: string;
  months: number;
  badge?: string;
}

export interface MembershipPlan {
  id: string;
  code: string;
  name: string;
  tagline: string;
  recommended?: boolean;
  /** Illustrative demo pricing configured centrally for each duration */
  pricing: Record<
    BillingDurationId,
    {
      totalPrice: number;
      perMonthEquivalent: number;
      savingsLabel?: string;
    }
  >;
  inclusions: string[];
  ctaLabel: string;
}

export const billingDurations: BillingDurationOption[] = [
  {
    id: "monthly",
    label: "Monthly",
    months: 1,
  },
  {
    id: "quarterly",
    label: "Quarterly",
    months: 3,
    badge: "SAVE 10%",
  },
  {
    id: "annual",
    label: "Annual",
    months: 12,
    badge: "SAVE 20%",
  },
];

export const membershipsMeta = {
  eyebrow: "05 // MEMBERSHIPS",
  heading: "FLEXIBLE PLANS BUILT FOR COMMITMENT.",
  demoNotice:
    "ILLUSTRATIVE DEMO PRICING — ALL RATES ARE SAMPLE PLACEHOLDERS CONFIGURABLE IN DATA/MEMBERSHIPS.TS",
  subheading:
    "Compare access tiers across billing durations. Switch between Monthly, Quarterly, and Annual commitments to preview total illustrative pricing.",
};

export const membershipsData: MembershipPlan[] = [
  {
    id: "starter",
    code: "TIER 01",
    name: "STARTER",
    tagline: "Essential open-floor access for consistent independent training.",
    pricing: {
      monthly: {
        totalPrice: 1499,
        perMonthEquivalent: 1499,
      },
      quarterly: {
        totalPrice: 4047,
        perMonthEquivalent: 1349,
        savingsLabel: "Illustrative 10% quarterly reduction",
      },
      annual: {
        totalPrice: 14390,
        perMonthEquivalent: 1199,
        savingsLabel: "Illustrative 20% annual reduction",
      },
    },
    inclusions: [
      "Full access to strength & cardio floor",
      "Initial equipment orientation session",
      "Locker room & shower facilities",
      "Standard floor coach assistance",
    ],
    ctaLabel: "ENQUIRE — STARTER",
  },
  {
    id: "performance",
    code: "TIER 02",
    name: "PERFORMANCE",
    tagline: "Our recommended balance of floor freedom, group conditioning, and structured guidance.",
    recommended: true,
    pricing: {
      monthly: {
        totalPrice: 2499,
        perMonthEquivalent: 2499,
      },
      quarterly: {
        totalPrice: 6747,
        perMonthEquivalent: 2249,
        savingsLabel: "Illustrative 10% quarterly reduction",
      },
      annual: {
        totalPrice: 23990,
        perMonthEquivalent: 1999,
        savingsLabel: "Illustrative 20% annual reduction",
      },
    },
    inclusions: [
      "Everything in Starter membership",
      "Scheduled small-group conditioning classes",
      "Monthly movement & strength reassessment",
      "Customised 4-week training template",
      "Priority trial pass for one training partner",
    ],
    ctaLabel: "ENQUIRE — PERFORMANCE",
  },
  {
    id: "elite",
    code: "TIER 03",
    name: "ELITE",
    tagline: "High-touch coaching architecture for dedicated transformation and accountability.",
    pricing: {
      monthly: {
        totalPrice: 3999,
        perMonthEquivalent: 3999,
      },
      quarterly: {
        totalPrice: 10797,
        perMonthEquivalent: 3599,
        savingsLabel: "Illustrative 10% quarterly reduction",
      },
      annual: {
        totalPrice: 38390,
        perMonthEquivalent: 3199,
        savingsLabel: "Illustrative 20% annual reduction",
      },
    },
    inclusions: [
      "Everything in Performance membership",
      "Dedicated 1-on-1 personal coaching sessions",
      "Individualised periodised strength & cardio plan",
      "Bi-weekly progress & body-composition check-ins",
      "Priority booking across all studio batches",
    ],
    ctaLabel: "ENQUIRE — ELITE",
  },
];

