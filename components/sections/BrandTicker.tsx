import { siteConfig } from "@/data/site";

export function BrandTicker() {
  const repeatedTrack = [
    ...siteConfig.tickerItems,
    ...siteConfig.tickerItems,
    ...siteConfig.tickerItems,
    ...siteConfig.tickerItems,
  ];

  return (
    <div
      aria-label="Core athletic values"
      className="overflow-hidden border-y border-[#F5F5F0]/10 bg-[var(--brand-elevated)] py-3.5"
    >
      <div className="animate-forge-ticker items-center">
        {repeatedTrack.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            aria-hidden={idx >= siteConfig.tickerItems.length}
            className="inline-flex items-center whitespace-nowrap font-display text-xl tracking-[0.14em] text-[var(--brand-text)] uppercase sm:text-2xl"
          >
            <span className="px-5 sm:px-7">{word}</span>
            <span className="text-[var(--brand-accent)]" aria-hidden="true">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

