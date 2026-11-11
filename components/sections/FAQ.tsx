import { faqData, faqMeta } from "@/data/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[var(--brand-bg)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
              {faqMeta.eyebrow}
            </p>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-4xl leading-[0.9] text-[var(--brand-text)] uppercase sm:text-5xl"
            >
              {faqMeta.heading}
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.05}>
            <Accordion items={faqData} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
