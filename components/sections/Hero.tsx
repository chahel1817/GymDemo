"use client";

import Image from "next/image";
import { ArrowUpRight, Dumbbell, Users, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const heroMicroPillars = [
  { label: "Expert Coaching", icon: Dumbbell },
  { label: "Modern Equipment", icon: Zap },
  { label: "Personalised Training", icon: Users },
];

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex flex-col overflow-hidden bg-[var(--brand-bg)] pt-20 lg:block lg:min-h-[min(100svh,880px)] lg:pt-24"
    >
      {/* Left Editorial Content Column (Mobile top, Desktop left) */}
      <div className="relative z-10 order-1 mx-auto w-full max-w-7xl px-4 pb-3 sm:px-6 lg:flex lg:min-h-[calc(min(100svh,880px)-6rem)] lg:items-center lg:px-8 lg:py-12">
        <div className="max-w-lg lg:max-w-xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 flex items-center gap-3 lg:mb-4"
          >
            <span
              className="inline-block h-[2px] w-7 bg-[var(--brand-accent)]"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] font-medium tracking-[0.22em] text-[#F5F5F0]/80 uppercase">
              {siteConfig.hero.eyebrow}
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(3.75rem,13vw,7.75rem)] leading-[0.86] tracking-[0.015em] italic uppercase">
            <span className="block text-[var(--brand-text)]">
              {siteConfig.hero.headlineLine1}
            </span>
            <span className="block text-[var(--brand-accent)]">
              {siteConfig.hero.headlineLine2}
            </span>
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F5F5F0]/80 sm:text-base lg:mt-5 lg:text-lg">
            {siteConfig.hero.supportingText}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4 lg:mt-7">
            <a
              href={siteConfig.hero.primaryCtaHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-2.5 text-xs font-bold tracking-[0.06em] text-[var(--brand-accent-ink)] transition-colors hover:bg-[var(--brand-accent-hover)] sm:min-h-12 sm:px-7 sm:py-3"
            >
              <span>{siteConfig.hero.primaryCtaLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.hero.secondaryCtaHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#F5F5F0]/30 bg-[#090B09]/60 px-6 py-2.5 text-xs font-semibold tracking-[0.06em] text-[var(--brand-text)] backdrop-blur-sm transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] sm:min-h-12 sm:px-7 sm:py-3"
            >
              {siteConfig.hero.secondaryCtaLabel}
            </a>
          </div>

          <ul
            aria-label="Core club highlights"
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#F5F5F0]/10 pt-4 sm:mt-8 sm:gap-x-7 sm:pt-5 lg:mt-12 lg:pt-6"
          >
            {heroMicroPillars.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-2">
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-[var(--brand-accent)] sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-medium text-[#F5F5F0]/80 sm:text-xs">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Single Responsive Priority Hero Image (Below headline on mobile/tablet, Right half on desktop) */}
      <div className="pointer-events-none relative order-2 aspect-[1312/1199] w-full overflow-hidden lg:order-none lg:aspect-auto lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%] xl:w-[57%]">
        <Image
          src={siteConfig.hero.image.src}
          alt={siteConfig.hero.image.alt}
          fill
          priority
          quality={90}
          sizes="(max-width: 1023px) 100vw, (min-width: 1280px) 57vw, 60vw"
          className={cn(
            "object-cover",
            siteConfig.hero.image.objectPositionClass,
          )}
        />
        {/* Subtle top feather */}
        <div
          className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#090B09] to-transparent lg:h-24"
          aria-hidden="true"
        />
        {/* Desktop left gradient fading naturally into dark headline area */}
        <div
          className="hidden lg:block lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/3 lg:bg-gradient-to-r lg:from-[#090B09] lg:via-[#090B09]/70 lg:to-transparent"
          aria-hidden="true"
        />
        {/* Bottom fade into brand ticker */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090B09] to-transparent lg:h-28 lg:via-[#090B09]/35"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
