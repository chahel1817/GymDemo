"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#111411",
            color: "#F5F5F0",
            border: "1px solid rgba(184, 243, 74, 0.35)",
            borderRadius: "4px",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </MotionConfig>
  );
}
