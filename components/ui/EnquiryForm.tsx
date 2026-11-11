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

const programOptions = [
  ...programsData.map((p) => p.shortLabel),
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

  useEffect(() => {
    if (minDate && !getValues("preferredDate")) {
      setValue("preferredDate", minDate, { shouldValidate: false });
    }
  }, [minDate, getValues, setValue]);

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
          ? "Click 'Open WhatsApp Message' below to send."
          : "WhatsApp opened with your enquiry details.",
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
        className="border border-[var(--brand-accent)]/35 bg-[var(--brand-elevated)] p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2
            className="mt-1 h-5 w-5 shrink-0 text-[var(--brand-accent)]"
            aria-hidden="true"
          />
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--brand-accent)] uppercase">
              WHATSAPP ENQUIRY READY
            </p>
            <h3 className="mt-1 font-display text-3xl text-white uppercase">
              THANK YOU, {submittedPayload.applicantName}.
            </h3>
            <p className="mt-1.5 text-sm text-[var(--brand-muted)]">
              {submittedPayload.popupBlocked
                ? "Click below to launch WhatsApp with your enquiry details."
                : "Your pre-filled WhatsApp enquiry opened in a new tab."}
            </p>
          </div>
        </div>

        {submittedPayload.whatsapp.isPlaceholderNumber ? (
          <p className="mt-4 border border-[#F5F5F0]/10 bg-[#090B09] px-3.5 py-2.5 text-xs text-[var(--brand-muted)]">
            Demo number active (+{siteConfig.contact.whatsappNumber}). Update{" "}
            <code className="font-mono text-[#F5F5F0]">whatsappNumber</code> in{" "}
            <code className="font-mono text-[#F5F5F0]">data/site.ts</code>.
          </p>
        ) : null}

        <div className="mt-4 border border-[#F5F5F0]/10 bg-[#090B09] p-4">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#F5F5F0]/85">
            {submittedPayload.whatsapp.formattedMessage}
          </pre>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={submittedPayload.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-2.5 text-xs font-bold tracking-[0.08em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)]"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            <span>OPEN WHATSAPP MESSAGE</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#F5F5F0]/20 px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-[var(--brand-text)] uppercase transition-colors hover:border-[var(--brand-accent)] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>NEW ENQUIRY</span>
          </button>
        </div>
      </div>
    );
  }

  const busy = isSubmitting || isProcessing;

  return (
    <form
      onSubmit={handleSubmit(processEnquiry)}
      noValidate
      className="border border-[#F5F5F0]/10 bg-[var(--brand-elevated)] p-6 sm:p-8"
      aria-label="Book a free trial enquiry form"
    >
      {selection ? (
        <div className="mb-5 flex items-center justify-between gap-3 border border-[var(--brand-accent)]/35 bg-[var(--brand-accent)]/10 px-4 py-2.5 text-xs text-white">
          <div>
            <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--brand-accent)] uppercase">
              SELECTED:
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
          className="mb-5 flex items-start gap-2.5 border border-red-500/40 bg-red-500/10 p-3.5 text-sm text-red-200"
        >
          <AlertCircle
            className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
            aria-hidden="true"
          />
          <span>{submissionError}</span>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-full-name"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
          >
            Full Name <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <input
            id="enquiry-full-name"
            type="text"
            autoComplete="name"
            placeholder="Rohan Patel"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "error-full-name" : undefined}
            className="min-h-11 w-full border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p
              id="error-full-name"
              role="alert"
              className="mt-1 text-xs text-red-400"
            >
              {errors.fullName.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="enquiry-phone"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
          >
            Mobile (India){" "}
            <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex min-h-11 items-center border border-r-0 border-[#F5F5F0]/15 bg-white/[0.04] px-3 font-mono text-xs text-[#F5F5F0]/75">
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
              className="min-h-11 w-full border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-accent)] focus:outline-none"
              {...register("phone")}
            />
          </div>
          {errors.phone ? (
            <p
              id="error-phone"
              role="alert"
              className="mt-1 text-xs text-red-400"
            >
              {errors.phone.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="enquiry-email"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
          >
            Email <span className="text-white/40">(Optional)</span>
          </label>
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className="min-h-11 w-full border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("email")}
          />
          {errors.email ? (
            <p
              id="error-email"
              role="alert"
              className="mt-1 text-xs text-red-400"
            >
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="enquiry-program"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
          >
            Program <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <select
            id="enquiry-program"
            aria-invalid={Boolean(errors.preferredProgram)}
            aria-describedby={
              errors.preferredProgram ? "error-program" : undefined
            }
            className="min-h-11 w-full border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("preferredProgram")}
          >
            {programOptions.map((option) => (
              <option key={option} value={option} className="bg-[#111411]">
                {option}
              </option>
            ))}
          </select>
          {errors.preferredProgram ? (
            <p
              id="error-program"
              role="alert"
              className="mt-1 text-xs text-red-400"
            >
              {errors.preferredProgram.message}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="enquiry-date"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
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
            className="min-h-11 w-full border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("preferredDate")}
          />
          {errors.preferredDate ? (
            <p
              id="error-date"
              role="alert"
              className="mt-1 text-xs text-red-400"
            >
              {errors.preferredDate.message}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-membership"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
          >
            Membership Plan <span className="text-white/40">(Optional)</span>
          </label>
          <select
            id="enquiry-membership"
            className="min-h-11 w-full border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("membershipInterest")}
          >
            {membershipOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#111411]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-message"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/80 uppercase"
          >
            Notes <span className="text-white/40">(Optional)</span>
          </label>
          <textarea
            id="enquiry-message"
            rows={2}
            placeholder="Preferred morning/evening slot or goals..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            className="w-full resize-y border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[var(--brand-accent)] focus:outline-none"
            {...register("message")}
          />
          {errors.message ? (
            <p
              id="error-message"
              role="alert"
              className="mt-1 text-xs text-red-400"
            >
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-[var(--brand-muted)]">
          Direct WhatsApp enquiry · Demo placeholder number
        </span>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3 text-xs font-bold tracking-[0.1em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)] disabled:opacity-50 cursor-pointer"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>PREPARING...</span>
            </>
          ) : (
            <>
              <span>SEND VIA WHATSAPP</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
