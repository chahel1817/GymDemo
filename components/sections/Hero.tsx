"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/site";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[var(--brand-bg)] pt-24 pb-12 sm:pb-16 lg:items-center lg:pt-20 lg:pb-12"
    >
      {/* Desktop Dominant Right-Stage Photography (unobstructed athlete) */}
      <div className="pointer-events-none absolute inset-0 lg:left-[28%]">
        {/* Mobile & Tablet framing */}
        <Image
          src={siteConfig.hero.image.src}
          alt={siteConfig.hero.image.alt}
          fill
          priority
          quality={85}
          sizes="(max-width: 1024px) 100vw, 72vw"
          style={{ objectPosition: siteConfig.hero.image.objectPositionMobile }}
          className="object-cover lg:hidden"
        />
        {/* Desktop framing */}
        <Image
          src={siteConfig.hero.image.src}
          alt={siteConfig.hero.image.alt}
          fill
          priority
          quality={85}
          sizes="72vw"
          style={{ objectPosition: siteConfig.hero.image.objectPositionDesktop }}
          className="hidden object-cover lg:block"
        />

        {/* Smooth edge vignettes keeping athlete bright & clear */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#090B09] via-[#090B09]/70 via-42% to-[#090B09]/25 lg:hidden"
          aria-hidden="true"
        />
        <div
          className="hidden lg:block lg:absolute lg:inset-0 lg:bg-gradient-to-r lg:from-[#090B09] lg:via-[#090B09]/45 lg:via-32% lg:to-transparent"
          aria-hidden="true"
        />
        <div
          className="hidden lg:block lg:absolute lg:inset-0 lg:bg-gradient-to-t lg:from-[#090B09]/90 lg:via-transparent lg:to-[#090B09]/35"
          aria-hidden="true"
        />
      </div>

      {/* Editorial Left / Lower Typography */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-mono text-[11px] tracking-[0.22em] text-[var(--brand-accent)] uppercase"
          >
            {siteConfig.hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-[clamp(4.1rem,15vw,8.75rem)] leading-[0.86] tracking-[0.015em] text-[var(--brand-text)] uppercase">
            <span className="block">{siteConfig.hero.headlineLine1}</span>
            <span className="block text-[var(--brand-accent)]">
              {siteConfig.hero.headlineLine2}
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base font-medium text-[#F5F5F0]/85 sm:text-lg">
            {siteConfig.hero.supportingText}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={siteConfig.hero.primaryCtaHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3.5 text-xs font-bold tracking-[0.1em] text-[var(--brand-accent-ink)] uppercase transition-all duration-200 hover:bg-[var(--brand-accent-hover)]"
            >
              <span>{siteConfig.hero.primaryCtaLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.hero.secondaryCtaHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#F5F5F0]/25 bg-[#090B09]/55 px-7 py-3.5 text-xs font-semibold tracking-[0.1em] text-[var(--brand-text)] uppercase backdrop-blur-sm transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            >
              <span>{siteConfig.hero.secondaryCtaLabel}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
