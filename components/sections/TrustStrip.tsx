import {
  Activity,
  Award,
  Dumbbell,
  SlidersHorizontal,
} from "lucide-react";
import { siteConfig, type TrustPillar } from "@/data/site";

function PillarIcon({ iconName }: { iconName: TrustPillar["iconName"] }) {
  const iconClass = "h-5 w-5 text-[var(--brand-accent)]";
  switch (iconName) {
    case "Award":
      return <Award className={iconClass} aria-hidden="true" />;
    case "Dumbbell":
      return <Dumbbell className={iconClass} aria-hidden="true" />;
    case "Activity":
      return <Activity className={iconClass} aria-hidden="true" />;
    case "SlidersHorizontal":
      return <SlidersHorizontal className={iconClass} aria-hidden="true" />;
  }
}

export function TrustStrip() {
  return (
    <section
      aria-label="Brand differentiators"
      className="border-b border-white/10 bg-[var(--brand-elevated)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {siteConfig.trustPillars.map((pillar, idx) => (
            <div
              key={pillar.index}
              className={`flex flex-col justify-between gap-4 py-7 sm:px-6 lg:px-7 ${
                idx === 0 ? "sm:pl-0" : ""
              } ${idx === siteConfig.trustPillars.length - 1 ? "lg:pr-0" : ""} ${
                idx < 2 ? "sm:border-b sm:border-white/10 lg:border-b-0" : ""
              } ${idx % 2 === 1 ? "sm:border-l sm:border-white/10" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.2em] text-white/45">
                  {pillar.index}
                </span>
                <PillarIcon iconName={pillar.iconName} />
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
                  {pillar.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--brand-muted)]">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

