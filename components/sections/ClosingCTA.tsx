import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function ClosingCTA() {
  const { closingCta } = siteConfig;

  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative overflow-hidden border-y border-[#F5F5F0]/10 bg-[var(--brand-bg)] py-24 sm:py-32"
    >
      <Image
        src={closingCta.image.src}
        alt={closingCta.image.alt}
        fill
        sizes="100vw"
        style={{ objectPosition: closingCta.image.objectPosition }}
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-[#090B09]/78"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#090B09] via-transparent to-[#090B09]/85"
        aria-hidden="true"
      />

      <Reveal className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--brand-accent)] uppercase">
          {closingCta.eyebrow}
        </p>

        <h2
          id="closing-cta-heading"
          className="mt-4 font-display text-[clamp(3.25rem,9vw,7.25rem)] leading-[0.86] text-[var(--brand-text)] uppercase"
        >
          <span className="block">{closingCta.headingLine1}</span>
          <span className="block text-[var(--brand-accent)]">
            {closingCta.headingLine2}
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-md text-base text-[#F5F5F0]/85 sm:text-lg">
          {closingCta.supportingText}
        </p>

        <div className="mt-8">
          <a
            href={closingCta.ctaHref}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[var(--brand-accent)] px-8 py-4 text-xs font-bold tracking-[0.12em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)]"
          >
            <span>{closingCta.ctaLabel}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

