"use client";

import { useState } from "react";
import {
  programCategories,
  programsData,
  type ProgramCategory,
} from "@/data/programs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Programs() {
  const [activeCategory, setActiveCategory] = useState<ProgramCategory>("All");

  const filteredPrograms =
    activeCategory === "All"
      ? programsData
      : programsData.filter((p) => p.category === activeCategory);

  const featuredPrograms =
    activeCategory === "All"
      ? filteredPrograms.filter((p) => p.featured)
      : [];
  const gridPrograms =
    activeCategory === "All"
      ? filteredPrograms.filter((p) => !p.featured)
      : filteredPrograms;

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="border-b border-white/10 bg-[var(--brand-bg)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="02 // TRAINING PROGRAMS"
            heading="STRUCTURED TRACKS FOR MEASURABLE OUTPUT."
            headingId="programs-heading"
            subheading="Choose your primary training discipline—or combine open strength work with coach-led conditioning sessions."
            rightSlot={
              <div
                role="tablist"
                aria-label="Filter training programs by category"
                className="flex flex-wrap gap-2"
              >
                {programCategories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "min-h-11 border px-4 py-2 font-mono text-xs tracking-[0.14em] uppercase transition-colors cursor-pointer",
                        isActive
                          ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] font-semibold text-[var(--brand-accent-ink)]"
                          : "border-white/15 bg-white/[0.02] text-white/75 hover:border-white/35 hover:text-white",
                      )}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            }
          />
        </Reveal>

        {/* Signature Spotlight Programs when viewing "All" */}
        {featuredPrograms.length > 0 ? (
          <div className="mt-12 space-y-6">
            {featuredPrograms.map((program) => (
              <Reveal key={program.id}>
                <ProgramCard program={program} variant="featured" />
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Editorial Multi-Column Grid */}
        <div
          className={cn(
            "grid gap-6 sm:grid-cols-2",
            activeCategory === "All" ? "mt-6 lg:grid-cols-2" : "mt-12 lg:grid-cols-2",
          )}
        >
          {gridPrograms.map((program, idx) => (
            <Reveal key={program.id} delay={idx * 0.05}>
              <ProgramCard program={program} variant="editorial" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
