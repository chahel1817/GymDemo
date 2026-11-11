import { trainersData, trainersMeta } from "@/data/trainers";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrainerCard } from "@/components/ui/TrainerCard";
import { Reveal } from "@/components/ui/Reveal";

export function Trainers() {
  return (
    <section
      id="trainers"
      aria-labelledby="trainers-heading"
      className="border-b border-white/10 bg-[var(--brand-elevated)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={trainersMeta.eyebrow}
            heading={trainersMeta.heading}
            headingId="trainers-heading"
            subheading={trainersMeta.subheading}
            rightSlot={
              <span className="inline-block border border-amber-400/35 bg-amber-400/10 px-3 py-2 font-mono text-[10px] tracking-[0.15em] text-amber-200 uppercase">
                {trainersMeta.demoBadge}
              </span>
            }
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainersData.map((trainer, index) => (
            <Reveal key={trainer.id} delay={index * 0.06}>
              <TrainerCard trainer={trainer} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
