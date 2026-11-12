import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const { experience } = siteConfig;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-y border-[#F5F5F0]/10 bg-[var(--brand-elevated)]"
    >
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-12">
        {/* Left Edge-to-Edge Architectural Photo */}
        <div className="relative min-h-[300px] bg-black sm:min-h-[400px] lg:col-span-6 lg:min-h-[520px]">
          <Image
            src={experience.image.src}
            alt={experience.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectPosition: experience.image.objectPosition }}
            className="object-cover brightness-[1.04] contrast-[1.05]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#111411]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111411]/55"
            aria-hidden="true"
          />
        </div>

        {/* Right Split Content */}
        <Reveal className="flex flex-col justify-center px-4 py-12 sm:px-10 sm:py-16 lg:col-span-6 lg:px-16 lg:py-20">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
            {experience.eyebrow}
          </p>

          <h2
            id="experience-heading"
            className="mt-3 font-display text-5xl leading-[0.9] text-[var(--brand-text)] uppercase sm:text-6xl"
          >
            {experience.heading}
          </h2>

          <ul className="mt-8 divide-y divide-[#F5F5F0]/10 border-y border-[#F5F5F0]/10">
            {experience.differentiators.map((item, idx) => (
              <li
                key={item.title}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-[var(--brand-accent)]">
                    0{idx + 1}
                  </span>
                  <span className="text-base font-semibold text-[var(--brand-text)]">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm text-[var(--brand-muted)] sm:text-right">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <a
              href={experience.ctaHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3.5 text-xs font-bold tracking-[0.1em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)]"
            >
              <span>{experience.ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

