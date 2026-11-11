"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { trainersData, trainersMeta } from "@/data/trainers";
import { useEnquirySelection } from "@/components/providers/EnquiryProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Trainers() {
  const { selectForEnquiry } = useEnquirySelection();

  return (
    <section
      id="trainers"
      aria-labelledby="trainers-heading"
      className="bg-[var(--brand-bg)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={trainersMeta.eyebrow}
            heading={trainersMeta.heading}
            headingId="trainers-heading"
            size="md"
            rightSlot={
              <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--brand-muted)] uppercase">
                {trainersMeta.demoBadge}
              </span>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trainersData.map((trainer, idx) => (
            <Reveal key={trainer.id} delay={idx * 0.05}>
              <article className="group flex flex-col">
                <div className="relative aspect-[5/4] overflow-hidden bg-black">
                  <Image
                    src={trainer.image.src}
                    alt={trainer.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectPosition: trainer.image.objectPosition }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#090B09]/70 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  {trainer.isSampleProfile ? (
                    <span className="absolute top-3 left-3 bg-[#090B09]/75 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#F5F5F0]/75 uppercase backdrop-blur-sm">
                      SAMPLE
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-3xl text-[var(--brand-text)] uppercase">
                    {trainer.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      selectForEnquiry({
                        program: "Personal Training",
                        note: `Interested in coaching consultation with ${trainer.name} (${trainer.specialisation}).`,
                      })
                    }
                    className="inline-flex min-h-9 items-center gap-1 font-mono text-[11px] font-semibold tracking-[0.12em] text-[var(--brand-accent)] uppercase hover:underline cursor-pointer"
                  >
                    <span>BOOK</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>

                <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--brand-accent)] uppercase">
                  {trainer.specialisation}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
                  {trainer.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
