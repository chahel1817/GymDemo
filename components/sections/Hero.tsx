"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/site";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Hero showcase"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b border-white/10 bg-[#08090B] pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pb-20"
    >
      {/* Background Cinematic Photography */}
      <div className="absolute inset-0">
        <Image
          src={siteConfig.hero.backgroundImage.src}
          alt={siteConfig.hero.backgroundImage.alt}
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{ objectPosition: siteConfig.hero.backgroundImage.objectPosition }}
          className="object-cover"
        />
        {/* Deliberate Dual-Axis Editorial Overlay for High Contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#08090B]/92 via-[#08090B]/52 to-[#08090B]/15"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/20 to-[#08090B]/40"
          aria-hidden="true"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow + Architectural Rule */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <span
              className="inline-block h-px w-8 bg-[var(--brand-accent)]"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-[var(--brand-accent)] uppercase sm:text-xs">
              {siteConfig.hero.eyebrow}
            </span>
          </motion.div>

          {/* Monumental Editorial H1 — never opacity: 0 on first paint for instant LCP */}
          <h1 className="font-display text-[clamp(2.45rem,7.2vw,6.15rem)] leading-[0.9] font-extrabold tracking-[-0.015em] text-white uppercase">
            <span className="block">{siteConfig.hero.headlineLine1}</span>
            <span className="mt-1 block text-[var(--brand-accent)]">
              {siteConfig.hero.headlineLine2}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
            {siteConfig.hero.supportingText}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href={siteConfig.hero.primaryCtaHref}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-[var(--brand-accent)] bg-[var(--brand-accent)] px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.15em] text-[var(--brand-accent-ink)] uppercase transition-all duration-200 hover:bg-[var(--brand-accent-hover)] sm:text-sm"
            >
              <span>{siteConfig.hero.primaryCtaLabel}</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.hero.secondaryCtaHref}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-white/30 bg-[#08090B]/55 px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.15em] text-white uppercase backdrop-blur-sm transition-all duration-200 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] sm:text-sm"
            >
              <span>{siteConfig.hero.secondaryCtaLabel}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Metadata Rail */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.22em] text-white/80 uppercase sm:text-xs"
            aria-label="Core club pillars"
          >
            {siteConfig.brand.metadataTags.map((tag, idx) => (
              <span key={tag} className="inline-flex items-center gap-4">
                <span>{tag}</span>
                {idx < siteConfig.brand.metadataTags.length - 1 ? (
                  <span
                    className="text-[var(--brand-accent)]"
                    aria-hidden="true"
                  >
                    /
                  </span>
                ) : null}
              </span>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-[0.18em] text-white/60 uppercase">
            {siteConfig.brand.cityLabel}
          </p>
        </div>
      </div>
    </section>
  );
}

