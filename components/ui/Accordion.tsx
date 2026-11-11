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
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="group">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--brand-accent)] cursor-pointer"
              >
                <span className="flex items-baseline gap-4 pr-2">
                  <span className="font-mono text-xs tracking-[0.18em] text-[var(--brand-accent)]">
                    0{idx + 1}
                  </span>
                  <span
                    className={cn(
                      "text-base font-semibold tracking-tight transition-colors sm:text-lg",
                      isOpen ? "text-[var(--brand-accent)]" : "text-[var(--brand-text)]",
                    )}
                  >
                    {item.question}
                  </span>
                </span>

                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center border transition-colors",
                    isOpen
                      ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-accent-ink)]"
                      : "border-white/15 text-white/75 group-hover:border-white/40",
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
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
                  initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-8 sm:pl-9">
                    <p className="max-w-2xl text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
                      {item.answer}
                    </p>
                    {item.isDemoContent ? (
                      <p className="mt-3 inline-block border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white/60 uppercase">
                        Editable Demo Answer — Customise in data/faq.ts
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

