"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { galleryData, galleryMeta } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="facilities"
      aria-labelledby="facilities-heading"
      className="border-t border-[#F5F5F0]/10 bg-[var(--brand-elevated)] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={galleryMeta.eyebrow}
            heading={galleryMeta.heading}
            headingId="facilities-heading"
            size="md"
            rightSlot={
              <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--brand-muted)] uppercase">
                CLICK TO INSPECT ({galleryData.length} ZONES)
              </span>
            }
          />
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 md:grid-cols-12">
          {galleryData.map((item, idx) => {
            const layoutClass =
              idx === 0
                ? "min-w-0 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[340px] lg:h-[400px]"
                : idx === 1
                  ? "min-w-0 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[340px] lg:h-[400px]"
                  : idx === 2
                    ? "min-w-0 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[290px] lg:h-[340px]"
                    : "min-w-0 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[290px] lg:h-[340px]";

            return (
              <Reveal key={item.id} delay={idx * 0.04} className={layoutClass}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Open ${item.title} in lightbox`}
                  className="group relative flex h-full w-full overflow-hidden bg-black text-left focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    style={{ objectPosition: item.objectPosition }}
                    className="object-cover brightness-[0.88] contrast-[1.08] saturate-[0.76] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-[0.96] group-hover:saturate-[0.9]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#090B09]/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95"
                    aria-hidden="true"
                  />

                  <span
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#090B09]/70 text-white/80 backdrop-blur-sm transition-colors group-hover:bg-[var(--brand-accent)] group-hover:text-[var(--brand-accent-ink)]"
                    aria-hidden="true"
                  >
                    <Expand className="h-3.5 w-3.5" />
                  </span>

                  <div className="relative z-10 mt-auto p-5">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--brand-accent)] uppercase">
                      {item.zone}
                    </span>
                    <h3 className="font-display text-2xl text-[var(--brand-text)] uppercase sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Lightbox
        items={galleryData}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(nextIdx) => setActiveIndex(nextIdx)}
      />
    </section>
  );
}
