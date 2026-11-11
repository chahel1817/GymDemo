"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

/**
 * Progressive-enhancement scroll reveal:
 * - Always renders opacity: 1 in SSR HTML so essential content never depends on JS.
 * - On client hydration, elements strictly below the viewport animate subtly into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  yOffset = 18,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [shouldRevealOnScroll, setShouldRevealOnScroll] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.92) {
      setShouldRevealOnScroll(true);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !shouldRevealOnScroll) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

