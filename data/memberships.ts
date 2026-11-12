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
  { id: "monthly", label: "Monthly", months: 1 },
  { id: "quarterly", label: "Quarterly", months: 3, badge: "-10%" },
  { id: "annual", label: "Annual", months: 12, badge: "-20%" },
];

export const membershipsMeta = {
  eyebrow: "06 // MEMBERSHIPS",
  heading: "CHOOSE YOUR COMMITMENT.",
  demoNotice: "Illustrative demo pricing — switch durations to preview sample totals.",
};

export const membershipsData: MembershipPlan[] = [
  {
    id: "starter",
    code: "01",
    name: "STARTER",
    tagline: "Full independent floor access.",
    pricing: {
      monthly: { totalPrice: 1499, perMonthEquivalent: 1499 },
      quarterly: {
        totalPrice: 4047,
        perMonthEquivalent: 1349,
        savingsLabel: "10% quarterly demo rate",
      },
      annual: {
        totalPrice: 14390,
        perMonthEquivalent: 1199,
        savingsLabel: "20% annual demo rate",
      },
    },
    inclusions: [
      "Full strength & cardio floor access",
      "Equipment orientation session",
      "Locker & shower access",
      "General floor guidance",
    ],
    ctaLabel: "ENQUIRE — STARTER",
  },
  {
    id: "performance",
    code: "02",
    name: "PERFORMANCE",
    tagline: "Floor access + structured group conditioning.",
    recommended: true,
    pricing: {
      monthly: { totalPrice: 2499, perMonthEquivalent: 2499 },
      quarterly: {
        totalPrice: 6747,
        perMonthEquivalent: 2249,
        savingsLabel: "10% quarterly demo rate",
      },
      annual: {
        totalPrice: 23990,
        perMonthEquivalent: 1999,
        savingsLabel: "20% annual demo rate",
      },
    },
    inclusions: [
      "All Starter floor privileges",
      "Coach-led conditioning cohorts",
      "Monthly strength reassessment",
      "4-week structured training split",
    ],
    ctaLabel: "ENQUIRE — PERFORMANCE",
  },
  {
    id: "elite",
    code: "03",
    name: "ELITE",
    tagline: "Dedicated 1-on-1 coaching & custom blocks.",
    pricing: {
      monthly: { totalPrice: 3999, perMonthEquivalent: 3999 },
      quarterly: {
        totalPrice: 10797,
        perMonthEquivalent: 3599,
        savingsLabel: "10% quarterly demo rate",
      },
      annual: {
        totalPrice: 38390,
        perMonthEquivalent: 3199,
        savingsLabel: "20% annual demo rate",
      },
    },
    inclusions: [
      "All Performance privileges",
      "Dedicated 1-on-1 coaching sessions",
      "Bespoke periodised programming",
      "Bi-weekly progress check-ins",
    ],
    ctaLabel: "ENQUIRE — ELITE",
  },
];
