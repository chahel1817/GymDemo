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
            background: "#14171D",
            color: "#F5F6F8",
            border: "1px solid rgba(200, 255, 0, 0.35)",
            borderRadius: "2px",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </MotionConfig>
  );
}

