"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 20);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:border focus:border-[var(--brand-accent)] focus:bg-[#090B09] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-[var(--brand-accent)]"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border px-4 transition-all duration-300 sm:px-5",
            scrolled
              ? "border-[#F5F5F0]/15 bg-[#090B09]/88 shadow-2xl shadow-black/60 backdrop-blur-xl"
              : "border-[#F5F5F0]/10 bg-[#090B09]/65 backdrop-blur-md",
          )}
        >
          {/* Logo */}
          <a
            href="#home"
            aria-label={`${siteConfig.brand.name} — Home`}
            className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]"
          >
            {siteConfig.brand.logoImageSrc ? (
              <Image
                src={siteConfig.brand.logoImageSrc}
                alt={siteConfig.brand.name}
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            ) : (
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-accent)] font-display text-lg leading-none text-[var(--brand-accent-ink)]"
                aria-hidden="true"
              >
                {siteConfig.brand.shortName.charAt(0)}
              </span>
            )}
            <span className="font-display text-2xl tracking-[0.06em] text-[var(--brand-text)] uppercase">
              {siteConfig.brand.shortName}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {siteConfig.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.08em] text-[#F5F5F0]/75 uppercase transition-colors hover:text-[var(--brand-accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTA + Mobile Trigger */}
          <div className="flex items-center gap-2">
            <a
              href={siteConfig.navigation.ctaHref}
              className="hidden min-h-10 items-center gap-1.5 rounded-full bg-[var(--brand-accent)] px-4 py-2 text-xs font-bold tracking-[0.06em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)] sm:inline-flex"
            >
              <span>{siteConfig.navigation.ctaLabel}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <button
              ref={toggleBtnRef}
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F5F0]/15 bg-[#111411] text-[var(--brand-text)] transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] lg:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Slide Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#090B09]/98 p-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl tracking-[0.08em] text-[var(--brand-text)] uppercase">
                {siteConfig.brand.name}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  toggleBtnRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F5F0]/20 text-[var(--brand-text)] transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile sections" className="my-auto py-8">
              <ul className="divide-y divide-[#F5F5F0]/10 border-y border-[#F5F5F0]/10">
                {siteConfig.navigation.links.map((link, idx) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-14 items-center justify-between py-2 font-display text-4xl tracking-wide text-[var(--brand-text)] uppercase transition-colors hover:text-[var(--brand-accent)]"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-[var(--brand-accent)]">
                        0{idx + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-4">
              <a
                href={siteConfig.navigation.ctaHref}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-3.5 text-xs font-bold tracking-[0.1em] text-[var(--brand-accent-ink)] uppercase"
              >
                <span>{siteConfig.navigation.ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-center text-xs text-[var(--brand-muted)]">
                {siteConfig.brand.cityLabel}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
