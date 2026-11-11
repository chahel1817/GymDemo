"use client";

import Image from "next/image";
import { ArrowUpRight, Dumbbell, Users, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/site";

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
      className="relative overflow-hidden bg-[var(--brand-bg)] pt-20 lg:flex lg:min-h-[min(100svh,880px)] lg:items-center lg:pt-20"
    >
      {/* DESKTOP: Athlete positioned prominently on the RIGHT half */}
      <div className="pointer-events-none hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-[60%] xl:w-[57%]">
        <Image
          src={siteConfig.hero.image.src}
          alt={siteConfig.hero.image.alt}
          fill
          priority
          quality={90}
          sizes="(min-width: 1280px) 58vw, 60vw"
          style={{ objectPosition: siteConfig.hero.image.objectPositionDesktop }}
          className="object-cover"
        />
        {/* Subtle top seam feather under transparent navbar */}
        <div
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090B09] to-transparent"
          aria-hidden="true"
        />
        {/* Subtle left gradient edge fading naturally into dark left column without dimming athlete */}
        <div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#090B09] via-[#090B09]/70 to-transparent"
          aria-hidden="true"
        />
        {/* Subtle bottom fade into brand ticker */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090B09] via-[#090B09]/40 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Left Editorial Content Column (Desktop & Mobile Top) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-3 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-lg lg:max-w-xl">
          {/* Eyebrow */}
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

          {/* Monumental Italicised Athletic Headline */}
          <h1 className="font-display text-[clamp(3.75rem,13.5vw,7.75rem)] leading-[0.86] tracking-[0.015em] italic uppercase">
            <span className="block text-[var(--brand-text)]">
              {siteConfig.hero.headlineLine1}
            </span>
            <span className="block text-[var(--brand-accent)]">
              {siteConfig.hero.headlineLine2}
            </span>
          </h1>

          {/* Concise Supporting Copy */}
          <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-[#F5F5F0]/80 sm:mt-4 sm:text-base lg:mt-5 lg:text-lg">
            {siteConfig.hero.supportingText}
          </p>

          {/* Dual Pill CTAs */}
          <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-4 lg:mt-7">
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

          {/* Minimal Bottom-Left Pillars Strip */}
          <ul
            aria-label="Core club highlights"
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#F5F5F0]/10 pt-4 sm:mt-8 sm:gap-x-7 sm:pt-5 lg:mt-14 lg:pt-6"
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

      {/* MOBILE / TABLET: Athlete positioned cleanly BELOW headline & CTAs preserving full head, hands & lime lighting */}
      <div className="relative aspect-[1312/1199] w-full overflow-hidden lg:hidden">
        <Image
          src={siteConfig.hero.image.src}
          alt={siteConfig.hero.image.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectPosition: siteConfig.hero.image.objectPositionMobile }}
          className="object-cover"
        />
        <div
          className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#090B09] to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#090B09] to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
