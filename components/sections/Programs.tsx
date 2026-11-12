"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { programsData, programsMeta } from "@/data/programs";
import { useEnquirySelection } from "@/components/providers/EnquiryProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Programs() {
  const [showSecondary, setShowSecondary] = useState(false);
  const { selectForEnquiry } = useEnquirySelection();

  const primaryPrograms = programsData.filter((p) => p.tier === "primary");
  const secondaryPrograms = programsData.filter((p) => p.tier === "secondary");

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="border-t border-[#F5F5F0]/8 bg-[var(--brand-bg)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={programsMeta.eyebrow}
            heading={programsMeta.heading}
            headingId="programs-heading"
          />
        </Reveal>

        {/* Three Major Photography-Led Program Pillars */}
        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3">
          {primaryPrograms.map((program, idx) => (
            <Reveal key={program.id} delay={idx * 0.05}>
              <article className="group relative flex aspect-[4/4.3] flex-col justify-end overflow-hidden bg-black">
                <Image
                  src={program.image.src}
                  alt={program.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  style={{ objectPosition: program.image.objectPosition }}
                  className="object-cover brightness-[0.88] contrast-[1.06] saturate-[0.88] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.95]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#090B09] via-[#090B09]/55 via-48% to-[#090B09]/15"
                  aria-hidden="true"
                />

                <div className="relative z-10 p-6 sm:p-7">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--brand-accent)]">
                    {program.index}
                  </span>
                  <h3 className="mt-1 font-display text-4xl leading-none text-[var(--brand-text)] uppercase sm:text-5xl">
                    {program.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-snug text-[#F5F5F0]/80">
                    {program.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      selectForEnquiry({
                        program: program.shortLabel,
                        note: `Interested in ${program.shortLabel} trial session.`,
                      })
                    }
                    className="mt-5 inline-flex min-h-10 items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[var(--brand-accent)] uppercase transition-opacity hover:opacity-80 cursor-pointer"
                  >
                    <span>EXPLORE TRACK</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Compact Secondary Specialised Disciplines (Collapsed by default) */}
        <div className="mt-8 border-t border-[#F5F5F0]/10 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-mono text-xs tracking-[0.18em] text-[var(--brand-muted)] uppercase">
              {programsMeta.secondaryHeading} ({secondaryPrograms.length})
            </h3>
            <button
              type="button"
              aria-expanded={showSecondary}
              aria-controls="secondary-program-tracks"
              onClick={() => setShowSecondary((prev) => !prev)}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#F5F5F0]/15 px-4 font-mono text-[11px] tracking-[0.12em] text-[var(--brand-text)] uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
            >
              <span>
                {showSecondary ? "HIDE ADDITIONAL TRACKS" : "VIEW ADDITIONAL TRACKS"}
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  showSecondary && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
          </div>

          {showSecondary ? (
            <div
              id="secondary-program-tracks"
              className="mt-5 grid gap-4 md:grid-cols-3"
            >
              {secondaryPrograms.map((program) => (
                <article
                  key={program.id}
                  className="group flex items-center gap-4 border border-[#F5F5F0]/10 bg-[var(--brand-elevated)] p-3.5 transition-colors hover:border-[#F5F5F0]/25"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-black">
                    <Image
                      src={program.image.src}
                      alt={program.image.alt}
                      fill
                      sizes="96px"
                      style={{ objectPosition: program.image.objectPosition }}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-2xl leading-none text-[var(--brand-text)] uppercase">
                      {program.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--brand-muted)]">
                      {program.summary}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        selectForEnquiry({
                          program: program.shortLabel,
                          note: `Interested in ${program.shortLabel}.`,
                        })
                      }
                      className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-[var(--brand-accent)] uppercase hover:underline cursor-pointer"
                    >
                      <span>SELECT</span>
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
