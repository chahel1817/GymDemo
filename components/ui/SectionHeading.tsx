import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  headingId?: string;
  subheading?: string;
  rightSlot?: ReactNode;
  className?: string;
  size?: "md" | "lg";
}

export function SectionHeading({
  eyebrow,
  heading,
  headingId,
  subheading,
  rightSlot,
  className,
  size = "lg",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--brand-accent)] uppercase">
          {eyebrow}
        </p>
        <h2
          id={headingId}
          className={cn(
            "mt-2 font-display leading-[0.9] text-[var(--brand-text)] uppercase",
            size === "lg"
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl lg:text-5xl",
          )}
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mt-3 max-w-xl text-sm text-[var(--brand-muted)] sm:text-base">
            {subheading}
          </p>
        ) : null}
      </div>

      {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
    </div>
  );
}
