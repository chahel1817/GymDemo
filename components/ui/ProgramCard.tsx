"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { TrainingProgram } from "@/data/programs";
import { useEnquirySelection } from "@/components/providers/EnquiryProvider";
import { cn } from "@/lib/utils";

interface ProgramCardProps {
  program: TrainingProgram;
  variant?: "featured" | "editorial";
}

export function ProgramCard({
  program,
  variant = "editorial",
}: ProgramCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { selectForEnquiry } = useEnquirySelection();
  const prefersReducedMotion = useReducedMotion();

  const handleBookClick = () => {
    selectForEnquiry({
      program: program.title,
      note: `Interested in ${program.title} (${program.focus}).`,
    });
  };

  if (variant === "featured") {
    return (
      <article className="group grid overflow-hidden border border-white/10 bg-[var(--brand-card)] transition-colors duration-300 hover:border-white/25 lg:grid-cols-12">
        <div className="relative aspect-[16/10] overflow-hidden bg-black lg:col-span-6 lg:aspect-auto lg:min-h-[340px]">
          <Image
            src={program.image.src}
            alt={program.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectPosition: program.image.objectPosition }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#08090B]/85 via-[#08090B]/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#14171D]/60"
            aria-hidden="true"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 border border-white/15 bg-[#08090B]/85 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[var(--brand-accent)]">
              {program.index}
            </span>
            <span className="text-white/25" aria-hidden="true">/</span>
            <span className="font-mono text-[11px] tracking-[0.16em] text-white/85 uppercase">
              {program.category}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--brand-accent)] uppercase">
                {program.duration}
              </span>
              <span className="font-mono text-[11px] tracking-[0.14em] text-[var(--brand-muted)] uppercase">
                SIGNATURE TRACK
              </span>
            </div>

            <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-[var(--brand-text)] uppercase sm:text-4xl">
              {program.title}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-[0.12em] text-white/70 uppercase">
              {program.focus}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
              {program.description}
            </p>

            <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
              {program.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-white/85"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-accent)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleBookClick}
              className="inline-flex min-h-11 items-center gap-2 border border-[var(--brand-accent)] bg-[var(--brand-accent)] px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)] cursor-pointer"
            >
              <span>SELECT FOR FREE TRIAL</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between overflow-hidden border border-white/10 bg-[var(--brand-elevated)] transition-colors duration-300 hover:border-white/25">
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <Image
            src={program.image.src}
            alt={program.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            style={{ objectPosition: program.image.objectPosition }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-[#08090B]/25 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-[var(--brand-accent)] uppercase">
              {program.index} {"//"} {program.category}
            </span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-white/75 uppercase">
              {program.duration}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--brand-text)] uppercase sm:text-3xl">
            {program.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-white/70 uppercase">
            {program.focus}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)]">
            {program.description}
          </p>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                id={`program-highlights-${program.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {program.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs leading-relaxed text-white/85"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--brand-accent)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-6 py-4">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`program-highlights-${program.id}`}
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex min-h-10 items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-[var(--brand-muted)] uppercase transition-colors hover:text-[var(--brand-text)] cursor-pointer"
        >
          <span>{expanded ? "HIDE DETAILS" : "PROGRAM DETAILS"}</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              expanded && "rotate-180 text-[var(--brand-accent)]",
            )}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={handleBookClick}
          className="inline-flex min-h-10 items-center gap-1.5 border border-white/20 px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-[var(--brand-text)] uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
        >
          <span>BOOK TRIAL</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

