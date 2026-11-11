"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface EnquirySelection {
  program?: string;
  membership?: string;
  note?: string;
  updatedAt: number;
}

interface EnquiryContextValue {
  selection: EnquirySelection | null;
  selectForEnquiry: (payload: Omit<EnquirySelection, "updatedAt">) => void;
  clearSelection: () => void;
}

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<EnquirySelection | null>(null);

  const selectForEnquiry = useCallback(
    (payload: Omit<EnquirySelection, "updatedAt">) => {
      setSelection({
        ...payload,
        updatedAt: Date.now(),
      });

      if (typeof document !== "undefined") {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        // Shift keyboard focus gently toward the form name input after scroll starts
        window.setTimeout(() => {
          const nameInput = document.getElementById("enquiry-full-name");
          if (nameInput instanceof HTMLInputElement) {
            nameInput.focus({ preventScroll: true });
          }
        }, 450);
      }
    },
    [],
  );

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  return (
    <EnquiryContext.Provider
      value={{ selection, selectForEnquiry, clearSelection }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquirySelection() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquirySelection must be used inside EnquiryProvider");
  }
  return ctx;
}

