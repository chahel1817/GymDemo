import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about } = siteConfig;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-white/10 bg-[var(--brand-bg)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Photograph Column */}
          <Reveal className="lg:col-span-6">
            <figure className="relative border border-white/10 bg-[var(--brand-elevated)] p-3">
              <div className="relative aspect-[4/3] overflow-hidden bg-black sm:aspect-[5/4]">
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  style={{ objectPosition: about.image.objectPosition }}
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#08090B]/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-white/10 pt-3 font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">
                <span>{about.image.caption}</span>
                <span className="text-[var(--brand-accent)]">FORGE STD.</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Editorial Brand Story Column */}
          <Reveal className="lg:col-span-6" delay={0.08}>
            <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-[var(--brand-accent)] uppercase">
              <span
                className="inline-block h-px w-6 bg-[var(--brand-accent)]"
                aria-hidden="true"
              />
              {about.eyebrow}
            </p>

            <h2
              id="about-heading"
              className="font-display text-4xl leading-[0.95] font-bold tracking-tight text-white uppercase sm:text-5xl"
            >
              {about.heading}
            </h2>

            <p className="mt-6 text-lg leading-relaxed font-medium text-white/90">
              {about.lead}
            </p>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Philosophy Pillars */}
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {about.pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="grid gap-1.5 py-4 sm:grid-cols-12 sm:gap-4"
                >
                  <dt className="font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-accent)] uppercase sm:col-span-4">
                    {pillar.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-white/85 sm:col-span-8">
                    {pillar.detail}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <a
                href={about.ctaHref}
                className="inline-flex min-h-12 items-center gap-3 border border-[var(--brand-accent)] bg-[var(--brand-accent)] px-6 py-3 font-mono text-xs font-semibold tracking-[0.15em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)]"
              >
                <span>{about.ctaLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

