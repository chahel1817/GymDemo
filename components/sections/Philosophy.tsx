import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  const { philosophy } = siteConfig;

  return (
    <section
      id="about"
      aria-labelledby="philosophy-heading"
      className="bg-[var(--brand-bg)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Dominant Asymmetric Photograph */}
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <Image
                src={philosophy.image.src}
                alt={philosophy.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                style={{ objectPosition: philosophy.image.objectPosition }}
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#090B09]/50 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          {/* Editorial Headline & Single Concise Paragraph */}
          <Reveal className="lg:col-span-5" delay={0.06}>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
              {philosophy.eyebrow}
            </p>

            <h2
              id="philosophy-heading"
              className="mt-4 font-display text-[clamp(3rem,6.5vw,5.25rem)] leading-[0.88] text-[var(--brand-text)] uppercase"
            >
              <span className="block">{philosophy.headingLine1}</span>
              <span className="block text-[var(--brand-accent)]">
                {philosophy.headingLine2}
              </span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
              {philosophy.paragraph}
            </p>

            <a
              href={philosophy.ctaHref}
              className="mt-8 inline-flex min-h-11 items-center gap-2.5 border-b border-[var(--brand-accent)] pb-1 text-xs font-bold tracking-[0.14em] text-[var(--brand-text)] uppercase transition-colors hover:text-[var(--brand-accent)]"
            >
              <span>{philosophy.ctaLabel}</span>
              <ArrowRight className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

