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
      className="border-b border-white/10 bg-[var(--brand-bg)] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={galleryMeta.eyebrow}
            heading={galleryMeta.heading}
            headingId="facilities-heading"
            subheading={galleryMeta.subheading}
            rightSlot={
              <p className="font-mono text-[11px] tracking-[0.16em] text-white/60 uppercase">
                CLICK ANY ZONE TO ENLARGE ({galleryData.length} ZONES)
              </p>
            }
          />
        </Reveal>

        {/* Asymmetric Editorial Facility Grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {galleryData.map((item, idx) => {
            // Alternate asymmetry smoothly across rows:
            // Row 1: 7 + 5 = 12
            // Row 2: 4 + 4 + 4 = 12 (or item 5 wide at bottom? Wait: items 0..5 -> 6 items!)
            // Let's map 6 items cleanly across 12 cols:
            // Item 0: col-span-7 (Row 1 left)
            // Item 1: col-span-5 (Row 1 right)
            // Item 2: col-span-4 (Row 2 left)
            // Item 3: col-span-4 (Row 2 mid)
            // Item 4: col-span-4 (Row 2 right)
            // Item 5: col-span-12 wide banner OR 5+7? Wait: 6 items -> 7+5, 4+4+4 = 5 items, or 7+5, 4+4+4, 12!
            // Actually even cleaner editorial asymmetry for 6 items on 12 cols:
            // Row 1: 7 + 5 = 12
            // Row 2: 4 + 8 = 12 (or 4 + 4 + 4 = 12? No, 7+5=12, 4+4+4=12 is 5 items, so 6 items would leave 1!).
            // Let's do: Row 1: 7 + 5 = 12; Row 2: 4 + 4 + 4 = 12? Wait: 2 + 3 = 5, 6th item can be Row 3? No, 6 items = 2+2+2 or 7+5, 5+7, 4+4+4? Wait: 7+5 (row 1), 4+8 (row 2), 6+6 (row 3) = 6 items with zero orphan gaps!!
            const layoutClass =
              idx === 0
                ? "min-w-0 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[330px] lg:h-[400px]"
                : idx === 1
                  ? "min-w-0 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[330px] lg:h-[400px]"
                  : idx === 2
                    ? "min-w-0 md:col-span-4 aspect-[16/10] md:aspect-auto md:h-[290px] lg:h-[350px]"
                    : idx === 3
                      ? "min-w-0 md:col-span-8 aspect-[16/10] md:aspect-auto md:h-[290px] lg:h-[350px]"
                      : idx === 4
                        ? "min-w-0 md:col-span-5 aspect-[16/10] md:aspect-auto md:h-[290px] lg:h-[350px]"
                        : "min-w-0 md:col-span-7 aspect-[16/10] md:aspect-auto md:h-[290px] lg:h-[350px]";

            return (
              <Reveal
                key={item.id}
                delay={idx * 0.04}
                className={layoutClass}
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Inspect ${item.title} in lightbox`}
                  className="group relative flex h-full w-full overflow-hidden border border-white/10 bg-black text-left focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    style={{ objectPosition: item.objectPosition }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#08090B]/92 via-[#08090B]/20 to-black/25 transition-opacity duration-300 group-hover:opacity-90"
                    aria-hidden="true"
                  />

                  {/* Top right expand cue */}
                  <span
                    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-white/20 bg-[#08090B]/80 text-white/80 backdrop-blur-sm transition-colors group-hover:border-[var(--brand-accent)] group-hover:text-[var(--brand-accent)]"
                    aria-hidden="true"
                  >
                    <Expand className="h-4 w-4" />
                  </span>

                  {/* Bottom caption */}
                  <div className="relative z-10 mt-auto w-full p-5 sm:p-6">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-[var(--brand-accent)] uppercase">
                      {item.zone}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
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
