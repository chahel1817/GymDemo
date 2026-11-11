import { ArrowDownRight } from "lucide-react";
import { faqData, faqMeta } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-white/10 bg-[var(--brand-elevated)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Sticky Editorial Intro */}
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-[var(--brand-accent)] uppercase">
                <span
                  className="inline-block h-px w-6 bg-[var(--brand-accent)]"
                  aria-hidden="true"
                />
                {faqMeta.eyebrow}
              </p>

              <h2
                id="faq-heading"
                className="font-display text-4xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-5xl"
              >
                {faqMeta.heading}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
                {faqMeta.subheading}
              </p>

              <div className="mt-8 border border-white/10 bg-[#08090B] p-5">
                <p className="font-mono text-[11px] tracking-[0.16em] text-white/75 uppercase">
                  HAVE A SPECIFIC QUESTION?
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[var(--brand-muted)]">
                  Ask our coaching desk about schedules, trial availability, or
                  onboarding during your free consultation.
                </p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex min-h-10 items-center gap-2 font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-accent)] uppercase hover:underline"
                >
                  <span>BOOK A FREE TRIAL</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Accessible Accordion */}
          <Reveal className="lg:col-span-8" delay={0.06}>
            <Accordion items={faqData} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

