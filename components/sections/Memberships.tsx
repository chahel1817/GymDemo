"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import {
  billingDurations,
  membershipsData,
  membershipsMeta,
  type BillingDurationId,
  type MembershipPlan,
} from "@/data/memberships";
import { useEnquirySelection } from "@/components/providers/EnquiryProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatINR } from "@/lib/utils";

export function Memberships() {
  const [durationId, setDurationId] = useState<BillingDurationId>("monthly");
  const { selectForEnquiry } = useEnquirySelection();

  const selectedDuration =
    billingDurations.find((d) => d.id === durationId) ?? billingDurations[0];

  const handlePlanEnquiry = (plan: MembershipPlan) => {
    const activePrice = plan.pricing[durationId];
    selectForEnquiry({
      program: "General Club Tour / Membership Consultation",
      membership: plan.name,
      note: `Interested in ${plan.name} plan (${selectedDuration.label} — ${formatINR(activePrice.totalPrice)} illustrative demo rate).`,
    });
  };

  return (
    <section
      id="memberships"
      aria-labelledby="memberships-heading"
      className="bg-[var(--brand-bg)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={membershipsMeta.eyebrow}
            heading={membershipsMeta.heading}
            headingId="memberships-heading"
            subheading={membershipsMeta.demoNotice}
            rightSlot={
              <div
                role="radiogroup"
                aria-label="Select membership duration"
                className="inline-flex rounded-full border border-[#F5F5F0]/15 bg-[var(--brand-elevated)] p-1"
              >
                {billingDurations.map((option) => {
                  const isActive = option.id === durationId;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setDurationId(option.id)}
                      className={cn(
                        "inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.06em] uppercase transition-colors cursor-pointer sm:px-4",
                        isActive
                          ? "bg-[var(--brand-accent)] text-[var(--brand-accent-ink)]"
                          : "text-[var(--brand-muted)] hover:text-[var(--brand-text)]",
                      )}
                    >
                      <span>{option.label}</span>
                      {option.badge ? (
                        <span
                          className={cn(
                            "text-[10px]",
                            isActive
                              ? "text-[#090B09]/80"
                              : "text-[var(--brand-accent)]",
                          )}
                        >
                          {option.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            }
          />
        </Reveal>

        <div className="mt-10 grid items-stretch divide-y divide-[#F5F5F0]/10 border border-[#F5F5F0]/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {membershipsData.map((plan) => {
            const activePricing = plan.pricing[durationId];
            const isRecommended = Boolean(plan.recommended);

            return (
              <article
                key={plan.id}
                className={cn(
                  "flex h-full flex-col justify-between p-6 sm:p-8 lg:p-9",
                  isRecommended
                    ? "border-t-2 border-t-[var(--brand-accent)] bg-[#141914] ring-1 ring-inset ring-[var(--brand-accent)]/20"
                    : "bg-[var(--brand-bg)]",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--brand-muted)]">
                      {plan.code}
                    </span>
                    {isRecommended ? (
                      <span className="rounded-full bg-[var(--brand-accent)] px-3 py-0.5 font-mono text-[10px] font-bold tracking-[0.12em] text-[var(--brand-accent-ink)] uppercase">
                        RECOMMENDED
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--brand-muted)] uppercase">
                        DEMO PLAN
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-4xl text-[var(--brand-text)] uppercase">
                    {plan.name}
                  </h3>
                  <p className="mt-1 min-h-[2.75rem] text-sm text-[var(--brand-muted)]">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 border-y border-[#F5F5F0]/10 py-5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="font-display text-5xl leading-none text-[var(--brand-text)] tabular-nums sm:text-6xl"
                        aria-live="polite"
                      >
                        {formatINR(activePricing.totalPrice)}
                      </span>
                      <span className="font-mono text-xs text-[var(--brand-muted)]">
                        / {selectedDuration.months}{" "}
                        {selectedDuration.months === 1 ? "mo" : "mos"}
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-[11px] text-[var(--brand-muted)]">
                      {selectedDuration.months > 1
                        ? `≈ ${formatINR(activePricing.perMonthEquivalent)}/mo · ${activePricing.savingsLabel}`
                        : "Sample monthly demo rate"}
                    </p>
                  </div>

                  <ul
                    className="mt-6 space-y-2.5"
                    aria-label={`${plan.name} inclusions`}
                  >
                    {plan.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#F5F5F0]/85"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent)]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-2">
                  <button
                    type="button"
                    onClick={() => handlePlanEnquiry(plan)}
                    className={cn(
                      "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-xs font-bold tracking-[0.1em] uppercase transition-colors cursor-pointer",
                      isRecommended
                        ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-accent-ink)] hover:bg-[var(--brand-accent-hover)]"
                        : "border-[#F5F5F0]/20 text-[var(--brand-text)] hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]",
                    )}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
