"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { TrainerProfile } from "@/data/trainers";
import { useEnquirySelection } from "@/components/providers/EnquiryProvider";

interface TrainerCardProps {
  trainer: TrainerProfile;
  index: number;
}

export function TrainerCard({ trainer, index }: TrainerCardProps) {
  const { selectForEnquiry } = useEnquirySelection();

  const handleRequestCoach = () => {
    selectForEnquiry({
      program: "Personal Training",
      note: `Interested in a trial consultation with ${trainer.name} (${trainer.specialisation}).`,
    });
  };

  return (
    <article className="group flex flex-col justify-between border border-white/10 bg-[var(--brand-elevated)] transition-colors duration-300 hover:border-white/25">
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-black">
          <Image
            src={trainer.image.src}
            alt={trainer.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectPosition: trainer.image.objectPosition }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-black/30"
            aria-hidden="true"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 border border-white/15 bg-[#08090B]/85 px-2.5 py-1 backdrop-blur-sm">
            <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[var(--brand-accent)]">
              0{index + 1}
            </span>
            {trainer.isSampleProfile ? (
              <span className="font-mono text-[10px] tracking-[0.14em] text-white/80 uppercase">
                DEMO PROFILE
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-6">
          <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--brand-accent)] uppercase">
            {trainer.specialisation}
          </p>
          <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--brand-text)] uppercase">
            {trainer.name}
          </h3>
          <p className="mt-1 font-mono text-[11px] tracking-[0.12em] text-[var(--brand-muted)] uppercase">
            {trainer.role}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[var(--brand-muted)]">
            {trainer.bio}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Coaching focus areas">
            {trainer.focusAreas.map((area) => (
              <li
                key={area}
                className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-white/80 uppercase"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <button
          type="button"
          onClick={handleRequestCoach}
          className="inline-flex min-h-11 w-full items-center justify-between font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-text)] uppercase transition-colors hover:text-[var(--brand-accent)] cursor-pointer"
        >
          <span>BOOK CONSULTATION WITH {trainer.name.split(" ")[0]}</span>
          <ArrowUpRight className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

