import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  headingId?: string;
  subheading?: string;
  rightSlot?: ReactNode;
  className?: string;
  headingAs?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  heading,
  headingId,
  subheading,
  rightSlot,
  className,
  headingAs = "h2",
}: SectionHeadingProps) {
  const HeadingTag = headingAs;

  return (
    <div
      className={cn(
        "flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <p className="mb-3 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-[var(--brand-accent)] uppercase">
          <span className="inline-block h-px w-6 bg-[var(--brand-accent)]" aria-hidden="true" />
          {eyebrow}
        </p>
        <HeadingTag
          id={headingId}
          className="font-display text-4xl leading-[0.95] font-bold tracking-tight text-[var(--brand-text)] uppercase sm:text-5xl lg:text-6xl"
        >
          {heading}
        </HeadingTag>
        {subheading ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
            {subheading}
          </p>
        ) : null}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}
