"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MessageSquare,
  RotateCcw,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { programsData } from "@/data/programs";
import { membershipsData } from "@/data/memberships";
import { siteConfig } from "@/data/site";
import { useEnquirySelection } from "@/components/providers/EnquiryProvider";
import { enquirySchema, type EnquiryFormValues } from "@/lib/validations";
import { buildWhatsAppEnquiry, type WhatsAppPayloadResult } from "@/lib/whatsapp";
import { getLocalTodayISO } from "@/lib/utils";
import { Button } from "./Button";

const programOptions = [
  ...programsData.map((p) => p.title),
  "General Club Tour / Membership Consultation",
];

const membershipOptions = [
  "Not Decided Yet",
  ...membershipsData.map((m) => m.name),
];

const emptySubscribe = () => () => {};

function useClientLocalToday(): string {
  return useSyncExternalStore(
    emptySubscribe,
    () => getLocalTodayISO(),
    () => "",
  );
}

interface SubmittedPayloadState {
  whatsapp: WhatsAppPayloadResult;
  popupBlocked: boolean;
  applicantName: string;
  atSelectionTimestamp: number;
}

export function EnquiryForm() {
  const { selection, clearSelection } = useEnquirySelection();
  const minDate = useClientLocalToday();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedPayload, setSubmittedPayload] =
    useState<SubmittedPayloadState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      preferredProgram: programOptions[0],
      preferredDate: "",
      membershipInterest: "Not Decided Yet",
      message: "",
    },
  });

  // Populate initial date once hydrated if empty
  useEffect(() => {
    if (minDate && !getValues("preferredDate")) {
      setValue("preferredDate", minDate, { shouldValidate: false });
    }
  }, [minDate, getValues, setValue]);

  // Synchronise pre-filled context from Program / Trainer / Membership CTAs
  useEffect(() => {
    if (!selection) return;
    if (selection.program) {
      setValue("preferredProgram", selection.program, { shouldValidate: true });
    }
    if (selection.membership) {
      setValue("membershipInterest", selection.membership, {
        shouldValidate: true,
      });
    }
    if (selection.note) {
      setValue("message", selection.note, { shouldValidate: false });
    }
  }, [selection, setValue]);

  const showSuccessPanel =
    submittedPayload !== null &&
    (!selection ||
      selection.updatedAt <= submittedPayload.atSelectionTimestamp);

  const processEnquiry = async (values: EnquiryFormValues) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSubmissionError(null);

    try {
      // If a real backend endpoint is configured in data/site.ts, deliver to it first.
      if (siteConfig.contact.enquiryEndpoint) {
        const res = await fetch(siteConfig.contact.enquiryEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error(
            `Submission endpoint responded with status ${res.status}.`,
          );
        }
      }

      const whatsapp = buildWhatsAppEnquiry(values);
      let popupBlocked = false;

      if (typeof window !== "undefined") {
        const openedWindow = window.open(
          whatsapp.url,
          "_blank",
          "noopener,noreferrer",
        );
        if (!openedWindow) {
          popupBlocked = true;
        }
      }

      setSubmittedPayload({
        whatsapp,
        popupBlocked,
        applicantName: values.fullName.trim(),
        atSelectionTimestamp: selection?.updatedAt ?? 0,
      });

      toast.success("Enquiry prepared for WhatsApp", {
        description: popupBlocked
          ? "Click the 'Open WhatsApp Message' button in the confirmation panel to send."
          : "WhatsApp opened in a new tab with your enquiry details.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to process your enquiry right now. Please try again.";
      setSubmissionError(errorMessage);
      toast.error("Enquiry could not be submitted", {
        description: errorMessage,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setSubmissionError(null);
    clearSelection();
    reset({
      fullName: "",
      phone: "",
      email: "",
      preferredProgram: programOptions[0],
      preferredDate: getLocalTodayISO(),
      membershipInterest: "Not Decided Yet",
      message: "",
    });
  };

  if (showSuccessPanel && submittedPayload) {
    return (
      <div
        className="border border-[var(--brand-accent)]/40 bg-[var(--brand-card)] p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-0.5 h-6 w-6 shrink-0 text-[var(--brand-accent)]"
            aria-hidden="true"
          />
          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-[var(--brand-accent)] uppercase">
              WHATSAPP ENQUIRY READY
            </p>
            <h3 className="mt-1 font-display text-3xl font-bold text-white uppercase">
              THANK YOU, {submittedPayload.applicantName}.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--brand-muted)]">
              {submittedPayload.popupBlocked
                ? "Your browser blocked the automatic WhatsApp window. Use the button below to launch WhatsApp with your pre-filled enquiry."
                : "Your pre-filled WhatsApp message has been generated and launched in a new tab."}
            </p>
          </div>
        </div>

        {submittedPayload.whatsapp.isPlaceholderNumber ? (
          <div className="mt-5 border border-amber-400/30 bg-amber-400/10 p-3.5 text-xs leading-relaxed text-amber-200">
            <span className="font-mono font-semibold uppercase">
              DEMO NOTICE:
            </span>{" "}
            This demo uses a placeholder WhatsApp number (
            <code className="font-mono">
              +{siteConfig.contact.whatsappNumber}
            </code>
            ). Update <code className="font-mono">contact.whatsappNumber</code> in{" "}
            <code className="font-mono">data/site.ts</code> to route live leads
            to your club desk.
          </div>
        ) : null}

        <div className="mt-5 border border-white/10 bg-[#08090B] p-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-white/50 uppercase">
            GENERATED WHATSAPP MESSAGE PREVIEW
          </p>
          <pre className="mt-2 whitespace-pre-wrap font-mono text-xs leading-relaxed text-white/85">
            {submittedPayload.whatsapp.formattedMessage}
          </pre>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={submittedPayload.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-[var(--brand-accent)] bg-[var(--brand-accent)] px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.14em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)]"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span>OPEN WHATSAPP MESSAGE</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <Button type="button" variant="secondary" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>SEND ANOTHER ENQUIRY</span>
          </Button>
        </div>
      </div>
    );
  }

  const busy = isSubmitting || isProcessing;

  return (
    <form
      onSubmit={handleSubmit(processEnquiry)}
      noValidate
      className="border border-white/10 bg-[var(--brand-card)] p-6 sm:p-8"
      aria-label="Book a free trial enquiry form"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--brand-accent)] uppercase">
            TRIAL & MEMBERSHIP ENQUIRY
          </p>
          <p className="mt-1 text-xs text-[var(--brand-muted)]">
            Takes under 30 seconds · Connects directly via WhatsApp
          </p>
        </div>
        <span className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white/65 uppercase">
          DEMO INTEGRATION
        </span>
      </div>

      {selection ? (
        <div className="mb-6 flex items-center justify-between gap-3 border border-[var(--brand-accent)]/35 bg-[var(--brand-accent)]/10 px-4 py-3 text-xs text-white">
          <div>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[var(--brand-accent)] uppercase">
              PRE-SELECTED CONTEXT:
            </span>{" "}
            <span className="font-medium">
              {[selection.membership, selection.program]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>
          <button
            type="button"
            onClick={clearSelection}
            aria-label="Clear selected context"
            className="flex h-7 w-7 shrink-0 items-center justify-center text-white/70 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {submissionError ? (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <span>{submissionError}</span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-full-name"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Full Name <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <input
            id="enquiry-full-name"
            type="text"
            autoComplete="name"
            placeholder="e.g., Rohan Patel"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "error-full-name" : undefined}
            className="min-h-12 w-full border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p
              id="error-full-name"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        {/* Indian Mobile Number */}
        <div>
          <label
            htmlFor="enquiry-phone"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Mobile Number (India){" "}
            <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex min-h-12 items-center border border-r-0 border-white/15 bg-white/[0.04] px-3 font-mono text-xs text-white/75">
              +91
            </span>
            <input
              id="enquiry-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              className="min-h-12 w-full border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--brand-accent)] focus:outline-none"
              {...register("phone")}
            />
          </div>
          {errors.phone ? (
            <p
              id="error-phone"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        {/* Email (Optional) */}
        <div>
          <label
            htmlFor="enquiry-email"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Email <span className="text-white/45">(Optional)</span>
          </label>
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className="min-h-12 w-full border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="error-email"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        {/* Preferred Training Program */}
        <div>
          <label
            htmlFor="enquiry-program"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Preferred Program{" "}
            <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <select
            id="enquiry-program"
            aria-invalid={Boolean(errors.preferredProgram)}
            aria-describedby={
              errors.preferredProgram ? "error-program" : undefined
            }
            className="min-h-12 w-full border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("preferredProgram")}
          >
            {programOptions.map((option) => (
              <option key={option} value={option} className="bg-[#0F1115]">
                {option}
              </option>
            ))}
          </select>
          {errors.preferredProgram ? (
            <p
              id="error-program"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.preferredProgram.message}
            </p>
          ) : null}
        </div>

        {/* Preferred Date */}
        <div>
          <label
            htmlFor="enquiry-date"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Preferred Date{" "}
            <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <input
            id="enquiry-date"
            type="date"
            min={minDate || undefined}
            aria-invalid={Boolean(errors.preferredDate)}
            aria-describedby={errors.preferredDate ? "error-date" : undefined}
            className="min-h-12 w-full border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("preferredDate")}
          />
          {errors.preferredDate ? (
            <p
              id="error-date"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.preferredDate.message}
            </p>
          ) : null}
        </div>

        {/* Membership Tier Interest */}
        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-membership"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Membership Plan Interest{" "}
            <span className="text-white/45">(Optional)</span>
          </label>
          <select
            id="enquiry-membership"
            className="min-h-12 w-full border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("membershipInterest")}
          >
            {membershipOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0F1115]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-message"
            className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-white/85 uppercase"
          >
            Training Goals or Questions{" "}
            <span className="text-white/45">(Optional)</span>
          </label>
          <textarea
            id="enquiry-message"
            rows={3}
            placeholder="Share your fitness goals, preferred morning/evening slot, or injury considerations..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            className="w-full resize-y border border-white/15 bg-[#08090B] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("message")}
          />
          {errors.message ? (
            <p
              id="error-message"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[var(--brand-muted)]">
          Prepares a direct WhatsApp enquiry for{" "}
          <span className="text-white/85">{siteConfig.brand.name}</span>.
        </p>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={busy}
          className="w-full sm:w-auto"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>PREPARING ENQUIRY...</span>
            </>
          ) : (
            <>
              <span>SEND ENQUIRY ON WHATSAPP</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
