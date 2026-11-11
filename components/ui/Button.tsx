import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--brand-accent)] text-[var(--brand-accent-ink)] border border-[var(--brand-accent)] hover:bg-[var(--brand-accent-hover)] hover:border-[var(--brand-accent-hover)] active:translate-y-px",
  secondary:
    "bg-transparent text-[var(--brand-text)] border border-white/25 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] active:translate-y-px",
  ghost:
    "bg-transparent text-[var(--brand-muted)] border border-transparent hover:text-[var(--brand-text)] hover:bg-white/5",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-xs tracking-[0.14em]",
  lg: "min-h-12 px-7 py-3.5 text-xs sm:text-sm tracking-[0.14em]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2.5 rounded-[2px] font-mono font-semibold uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--brand-accent)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  type = "button",
  ...rest
}: SharedProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(baseClasses, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: SharedProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(baseClasses, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}

