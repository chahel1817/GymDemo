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

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-[var(--brand-accent)] focus:bg-[#08090B] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:text-[var(--brand-accent)]"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-[#08090B]/92 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-[#08090B]/90 via-[#08090B]/55 to-transparent",
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)]"
            aria-label={`${siteConfig.brand.name} — Back to top`}
          >
            {siteConfig.brand.logoImageSrc ? (
              <Image
                src={siteConfig.brand.logoImageSrc}
                alt={siteConfig.brand.name}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <span
                className="flex h-8 w-8 items-center justify-center border border-[var(--brand-accent)] bg-[#08090B] font-display text-lg font-extrabold text-[var(--brand-accent)] transition-colors group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-accent-ink)]"
                aria-hidden="true"
              >
                {siteConfig.brand.wordmarkPrimary.charAt(0)}
              </span>
            )}
            <span className="flex items-baseline gap-1.5 font-display text-xl font-bold tracking-[0.06em] text-white uppercase sm:text-2xl">
              <span>{siteConfig.brand.wordmarkPrimary}</span>
              <span className="text-[var(--brand-accent)]">
                {siteConfig.brand.wordmarkSecondary}
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {siteConfig.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-2 font-mono text-xs font-medium tracking-[0.14em] text-white/80 uppercase transition-colors hover:text-[var(--brand-accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.navigation.ctaHref}
              className="hidden min-h-11 items-center gap-2 border border-[var(--brand-accent)] bg-[var(--brand-accent)] px-4 py-2.5 font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)] sm:inline-flex"
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
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-[#0F1115]/90 text-white transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] lg:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
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
            className="fixed inset-0 z-50 flex flex-col bg-[#08090B]/98 backdrop-blur-md lg:hidden"
          >
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-4 sm:px-6">
              <span className="font-display text-xl font-bold tracking-[0.06em] text-white uppercase">
                {siteConfig.brand.wordmarkPrimary}{" "}
                <span className="text-[var(--brand-accent)]">
                  {siteConfig.brand.wordmarkSecondary}
                </span>
              </span>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  toggleBtnRef.current?.focus();
                }}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile sections"
              className="flex flex-1 flex-col justify-between overflow-y-auto px-4 py-8 sm:px-6"
            >
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {siteConfig.navigation.links.map((link, idx) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNavClick}
                      className="flex min-h-14 items-center justify-between py-3 font-display text-3xl font-bold tracking-tight text-white uppercase transition-colors hover:text-[var(--brand-accent)]"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs tracking-[0.18em] text-[var(--brand-accent)]">
                        0{idx + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-5">
                <a
                  href={siteConfig.navigation.ctaHref}
                  onClick={handleNavClick}
                  className="flex min-h-12 w-full items-center justify-center gap-2 border border-[var(--brand-accent)] bg-[var(--brand-accent)] px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-accent-ink)] uppercase"
                >
                  <span>{siteConfig.navigation.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <div className="border-t border-white/10 pt-5 text-xs text-[var(--brand-muted)]">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
                    {siteConfig.contact.address.label}
                  </p>
                  <p className="mt-1">{siteConfig.contact.address.line1}</p>
                  <p className="mt-1">{siteConfig.contact.displayPhone}</p>
                </div>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

