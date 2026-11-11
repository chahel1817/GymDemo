"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { FAQItem } from "@/data/faq";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: FAQItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="divide-y divide-[#F5F5F0]/10 border-y border-[#F5F5F0]/10">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-[var(--brand-accent)] cursor-pointer"
              >
                <span className="flex items-baseline gap-3.5 pr-2">
                  <span className="font-mono text-xs text-[var(--brand-accent)]">
                    0{idx + 1}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold sm:text-base",
                      isOpen
                        ? "text-[var(--brand-accent)]"
                        : "text-[var(--brand-text)]",
                    )}
                  >
                    {item.question}
                  </span>
                </span>

                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isOpen
                      ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-accent-ink)]"
                      : "border-[#F5F5F0]/20 text-[var(--brand-muted)]",
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, height: 0 }
                  }
                  animate={{ opacity: 1, height: "auto" }}
                  exit={
                    prefersReducedMotion ? undefined : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pl-7 text-sm leading-relaxed text-[var(--brand-muted)]">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
