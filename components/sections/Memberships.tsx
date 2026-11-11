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
      note: `Interested in ${plan.name} membership (${selectedDuration.label} — ${formatINR(activePrice.totalPrice)} illustrative demo rate).`,
    });
  };

  return (
    <section
      id="memberships"
      aria-labelledby="memberships-heading"
      className="border-b border-white/10 bg-[var(--brand-elevated)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={membershipsMeta.eyebrow}
            heading={membershipsMeta.heading}
            headingId="memberships-heading"
            subheading={membershipsMeta.subheading}
            rightSlot={
              /* Billing Duration Selector */
              <div
                role="radiogroup"
                aria-label="Select membership commitment duration"
                className="inline-flex flex-wrap border border-white/15 bg-[#08090B] p-1"
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
                        "inline-flex min-h-10 items-center gap-2 px-3.5 py-2 font-mono text-xs tracking-[0.12em] uppercase transition-colors cursor-pointer sm:px-4",
                        isActive
                          ? "bg-[var(--brand-accent)] font-semibold text-[var(--brand-accent-ink)]"
                          : "text-white/75 hover:text-white",
                      )}
                    >
                      <span>{option.label}</span>
                      {option.badge ? (
                        <span
                          className={cn(
                            "px-1.5 py-0.5 text-[10px]",
                            isActive
                              ? "bg-[#08090B]/15 text-[#08090B]"
                              : "bg-white/10 text-[var(--brand-accent)]",
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

        {/* Explicit Demo Pricing Disclaimer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-xs text-amber-100">
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase">
            {membershipsMeta.demoNotice}
          </p>
          <p className="font-mono text-[11px] text-white/70">
            Showing {selectedDuration.label} ({selectedDuration.months}{" "}
            {selectedDuration.months === 1 ? "month" : "months"}) totals
          </p>
        </div>

        {/* Architectural Tier Matrix — Connected hairline frame instead of generic floating SaaS cards */}
        <div className="mt-8 grid divide-y divide-white/10 border border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {membershipsData.map((plan) => {
            const activePricing = plan.pricing[durationId];
            const isRecommended = Boolean(plan.recommended);

            return (
              <article
                key={plan.id}
                className={cn(
                  "relative flex flex-col justify-between p-6 sm:p-8 lg:p-9",
                  isRecommended
                    ? "bg-[var(--brand-card)] border-t-2 border-t-[var(--brand-accent)] lg:border-t-2"
                    : "bg-[#0B0D11]",
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-white/55 uppercase">
                      {plan.code}
                    </span>
                    {isRecommended ? (
                      <span className="border border-[var(--brand-accent)]/40 bg-[var(--brand-accent)]/15 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] text-[var(--brand-accent)] uppercase">
                        RECOMMENDED
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] tracking-[0.14em] text-white/45 uppercase">
                        DEMO TIER
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-white uppercase">
                    {plan.name}
                  </h3>
                  <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-[var(--brand-muted)]">
                    {plan.tagline}
                  </p>

                  {/* Dynamic Price Block */}
                  <div className="mt-6 border-y border-white/10 py-6">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">
                      ILLUSTRATIVE {selectedDuration.label.toUpperCase()} TOTAL
                    </p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
                      <span
                        className="font-display text-5xl font-extrabold tracking-tight text-white tabular-nums"
                        aria-live="polite"
                      >
                        {formatINR(activePricing.totalPrice)}
                      </span>
                      <span className="font-mono text-xs text-[var(--brand-muted)]">
                        / {selectedDuration.months}{" "}
                        {selectedDuration.months === 1 ? "mo" : "mos"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      {selectedDuration.months > 1 ? (
                        <span className="font-mono text-white/80 tabular-nums">
                          ≈ {formatINR(activePricing.perMonthEquivalent)}/month
                          equivalent
                        </span>
                      ) : (
                        <span className="font-mono text-white/60">
                          Standard monthly demo rate
                        </span>
                      )}

                      {activePricing.savingsLabel ? (
                        <span className="font-mono text-[11px] text-[var(--brand-accent)]">
                          · {activePricing.savingsLabel}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Inclusions */}
                  <ul
                    className="mt-6 space-y-3"
                    aria-label={`${plan.name} plan inclusions`}
                  >
                    {plan.inclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-white/85"
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

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => handlePlanEnquiry(plan)}
                    className={cn(
                      "inline-flex min-h-12 w-full items-center justify-center gap-2 border px-5 py-3 font-mono text-xs font-semibold tracking-[0.14em] uppercase transition-colors cursor-pointer",
                      isRecommended
                        ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-accent-ink)] hover:bg-[var(--brand-accent-hover)]"
                        : "border-white/25 bg-transparent text-white hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]",
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
