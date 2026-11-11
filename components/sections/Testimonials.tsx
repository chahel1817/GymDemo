import { MessageSquareQuote } from "lucide-react";
import { testimonialsConfig } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  if (!testimonialsConfig.showSection) {
    return null;
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-b border-white/10 bg-[var(--brand-bg)] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={testimonialsConfig.eyebrow}
            heading={testimonialsConfig.heading}
            headingId="testimonials-heading"
            rightSlot={
              testimonialsConfig.isDemoPlaceholderMode ? (
                <span className="inline-block border border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase">
                  PLACEHOLDER REVIEW SLOTS
                </span>
              ) : null
            }
          />
        </Reveal>

        {testimonialsConfig.isDemoPlaceholderMode ? (
          <p className="mt-6 border border-white/10 bg-[var(--brand-elevated)] px-4 py-3 font-mono text-[11px] tracking-[0.12em] text-white/70 uppercase">
            {testimonialsConfig.notice}
          </p>
        ) : null}

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonialsConfig.items.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.06}>
              <figure className="flex h-full flex-col justify-between border border-dashed border-white/20 bg-[var(--brand-elevated)] p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <MessageSquareQuote
                      className="h-5 w-5 text-[var(--brand-accent)]"
                      aria-hidden="true"
                    />
                    {item.isPlaceholder ? (
                      <span className="font-mono text-[10px] tracking-[0.16em] text-white/50 uppercase">
                        DEMO SLOT 0{idx + 1}
                      </span>
                    ) : null}
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
                    {item.quote}
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
                  <span className="font-mono text-xs font-semibold tracking-[0.12em] text-white uppercase">
                    {item.memberLabel}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--brand-accent)] uppercase">
                    {item.programTag}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
