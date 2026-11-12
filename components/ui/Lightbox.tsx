"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { GalleryItem } from "@/data/gallery";

interface LightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const isOpen =
    activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const current = isOpen ? items[activeIndex] : null;

  // Keep latest callbacks & activeIndex in refs so keyboard listener never resets focus on slide change
  const stateRef = useRef({ activeIndex, itemsLength: items.length, onClose, onNavigate });
  useEffect(() => {
    stateRef.current = {
      activeIndex,
      itemsLength: items.length,
      onClose,
      onNavigate,
    };
  }, [activeIndex, items.length, onClose, onNavigate]);

  // Capture/restore focus & scroll lock strictly on open/close transitions
  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      const { activeIndex: idx, itemsLength, onClose: closeFn, onNavigate: navFn } =
        stateRef.current;

      if (e.key === "Escape") {
        e.preventDefault();
        closeFn();
        return;
      }
      if (e.key === "ArrowLeft" && idx !== null) {
        e.preventDefault();
        navFn((idx - 1 + itemsLength) % itemsLength);
        return;
      }
      if (e.key === "ArrowRight" && idx !== null) {
        e.preventDefault();
        navFn((idx + 1) % itemsLength);
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!dialogRef.current.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
          return;
        }

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && current && activeIndex !== null ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Facility preview: ${current.title}`}
          tabIndex={-1}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#060806]/95 p-4 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <div
            className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-[#F5F5F0]/10 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-[var(--brand-accent)]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <span className="hidden font-mono text-xs tracking-[0.14em] text-[#F5F5F0]/70 uppercase sm:inline">
                {current.zone}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery lightbox"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F5F5F0]/20 bg-white/5 text-white transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative mx-auto my-4 flex w-full max-w-6xl flex-1 items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[52vh] w-full overflow-hidden border border-[#F5F5F0]/10 bg-black sm:h-[66vh]">
              <Image
                key={current.id}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 100vw, 90vw"
                style={{ objectPosition: current.objectPosition }}
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate((activeIndex - 1 + items.length) % items.length)
              }
              aria-label="Previous facility photograph"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F5F5F0]/25 bg-[#090B09]/85 text-white transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] sm:left-4 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate((activeIndex + 1) % items.length)}
              aria-label="Next facility photograph"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F5F5F0]/25 bg-[#090B09]/85 text-white transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] sm:right-4 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="mx-auto flex w-full max-w-6xl flex-col gap-1 border-t border-[#F5F5F0]/10 pt-4 sm:flex-row sm:items-center sm:justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-display text-3xl text-white uppercase">
                {current.title}
              </h3>
              <p className="text-sm text-[var(--brand-muted)]">
                {current.caption}
              </p>
            </div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/50 uppercase">
              ESC TO CLOSE · ← / → · TAB TO CYCLE
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
