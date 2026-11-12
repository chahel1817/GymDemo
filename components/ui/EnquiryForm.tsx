"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
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

const fieldControlClass =
  "h-11 w-full rounded-[4px] border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 text-sm text-[#F5F5F0] placeholder:text-[#92988F]/55 transition-colors focus:border-[var(--brand-accent)] focus:outline-none";

export function EnquiryForm() {
  const { selection, clearSelection } = useEnquirySelection();
  const minDate = useClientLocalToday();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedPayload, setSubmittedPayload] =
    useState<SubmittedPayloadState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

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
    setCopiedMessage(false);

    try {
      if (siteConfig.contact.enquiryEndpoint) {
        const res = await fetch(siteConfig.contact.enquiryEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error(
            `Enquiry endpoint returned status ${res.status}. Please try again.`,
          );
        }
      }

      const whatsapp = buildWhatsAppEnquiry(values);

      if (whatsapp.validationError) {
        throw new Error(whatsapp.validationError);
      }

      let popupBlocked = false;

      if (!whatsapp.isDemoPreview && whatsapp.url && typeof window !== "undefined") {
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

      if (whatsapp.isDemoPreview) {
        toast.info("Demo enquiry message prepared", {
          description:
            "Placeholder WhatsApp number active — previewed locally without sending.",
        });
      } else if (popupBlocked) {
        toast.success("Enquiry message prepared", {
          description:
            "Popup blocked — click 'Open WhatsApp Message' below to send.",
        });
      } else {
        toast.success("WhatsApp opened with your enquiry", {
          description:
            "Send the prepared message inside WhatsApp to complete your request.",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to process your enquiry right now. Please try again.";
      setSubmissionError(errorMessage);
      toast.error("Enquiry could not be prepared", {
        description: errorMessage,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyPreview = async () => {
    if (!submittedPayload) return;
    try {
      await navigator.clipboard.writeText(
        submittedPayload.whatsapp.formattedMessage,
      );
      setCopiedMessage(true);
      toast.success("Enquiry message copied");
    } catch {
      toast.error("Copy unavailable — please select text from the preview box.");
    }
  };

  const handleReset = () => {
    setSubmittedPayload(null);
    setSubmissionError(null);
    setCopiedMessage(false);
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
    const isDemo = submittedPayload.whatsapp.isDemoPreview;
    const waUrl = submittedPayload.whatsapp.url;

    return (
      <div
        className="rounded-[4px] border border-[var(--brand-accent)]/35 bg-[var(--brand-elevated)] p-6 sm:p-8"
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
              {isDemo
                ? "DEMO ENQUIRY PREVIEW (NOT SENT)"
                : submittedPayload.popupBlocked
                  ? "WHATSAPP MESSAGE PREPARED"
                  : "WHATSAPP OPENED WITH MESSAGE"}
            </p>
            <h3 className="mt-1 font-display text-3xl text-white uppercase">
              THANK YOU, {submittedPayload.applicantName}.
            </h3>
            <p className="mt-1.5 text-sm text-[var(--brand-muted)]">
              {isDemo
                ? "Your formatted enquiry is previewed below. Because a demo placeholder WhatsApp number is active, no external message was sent to a gym."
                : submittedPayload.popupBlocked
                  ? "Your browser blocked automatic tab opening. Click below to open WhatsApp and send the prepared enquiry."
                  : "WhatsApp opened in a new tab with your prepared details. Send the message inside WhatsApp so the club desk receives your request."}
            </p>
          </div>
        </div>

        {isDemo ? (
          <p className="mt-4 rounded-[4px] border border-[#F5F5F0]/10 bg-[#090B09] px-3.5 py-2.5 text-xs text-[var(--brand-muted)]">
            Demo mode active (<code className="font-mono text-[#F5F5F0]">whatsappIsPlaceholder: true</code>). Configure a live WhatsApp number to enable external dispatch.
          </p>
        ) : null}

        <div className="mt-4 rounded-[4px] border border-[#F5F5F0]/10 bg-[#090B09] p-4">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#F5F5F0]/85">
            {submittedPayload.whatsapp.formattedMessage}
          </pre>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!isDemo && waUrl ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-2.5 text-xs font-bold tracking-[0.08em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)]"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span>OPEN WHATSAPP MESSAGE</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={handleCopyPreview}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-2.5 text-xs font-bold tracking-[0.08em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)] cursor-pointer"
            >
              {copiedMessage ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>COPIED PREVIEW</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>COPY ENQUIRY TEXT</span>
                </>
              )}
            </button>
          )}

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
      className="rounded-[4px] border border-[#F5F5F0]/10 bg-[var(--brand-elevated)] p-5 sm:p-7 lg:p-8"
      aria-label="Book a free trial enquiry form"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[#F5F5F0]/10 pb-4">
        <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--brand-accent)] uppercase">
          TRIAL VISIT FORM
        </p>
        <span className="font-mono text-[10px] tracking-[0.14em] text-[var(--brand-muted)] uppercase">
          {siteConfig.contact.whatsappIsPlaceholder
            ? "DEMO PREVIEW MODE"
            : "WHATSAPP HANDOFF"}
        </span>
      </div>

      {selection ? (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-[4px] border border-[var(--brand-accent)]/35 bg-[var(--brand-accent)]/10 px-4 py-2.5 text-xs text-white">
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
          className="mb-5 flex items-start gap-2.5 rounded-[4px] border border-red-500/40 bg-red-500/10 p-3.5 text-sm text-red-200"
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
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
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
            className={fieldControlClass}
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

        <div>
          <label
            htmlFor="enquiry-phone"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
          >
            Mobile (India){" "}
            <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <div className="flex">
            <span className="inline-flex h-11 items-center rounded-l-[4px] border border-r-0 border-[#F5F5F0]/15 bg-white/[0.04] px-3 font-mono text-xs text-[#F5F5F0]/75">
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
              className="h-11 w-full rounded-r-[4px] border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 text-sm text-[#F5F5F0] placeholder:text-[#92988F]/55 transition-colors focus:border-[var(--brand-accent)] focus:outline-none"
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

        <div>
          <label
            htmlFor="enquiry-email"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
          >
            Email <span className="text-[#92988F]">(Optional)</span>
          </label>
          <input
            id="enquiry-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={fieldControlClass}
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

        <div>
          <label
            htmlFor="enquiry-program"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
          >
            Program <span className="text-[var(--brand-accent)]">*</span>
          </label>
          <div className="relative">
            <select
              id="enquiry-program"
              aria-invalid={Boolean(errors.preferredProgram)}
              aria-describedby={
                errors.preferredProgram ? "error-program" : undefined
              }
              className={`${fieldControlClass} appearance-none pr-10 cursor-pointer`}
              {...register("preferredProgram")}
            >
              {programOptions.map((option) => (
                <option key={option} value={option} className="bg-[#111411]">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]"
              aria-hidden="true"
            />
          </div>
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

        <div>
          <label
            htmlFor="enquiry-date"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
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
            className={fieldControlClass}
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

        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-membership"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
          >
            Membership Plan <span className="text-[#92988F]">(Optional)</span>
          </label>
          <div className="relative">
            <select
              id="enquiry-membership"
              className={`${fieldControlClass} appearance-none pr-10 cursor-pointer`}
              {...register("membershipInterest")}
            >
              {membershipOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111411]">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="enquiry-message"
            className="mb-1.5 block font-mono text-[11px] tracking-[0.14em] text-[#F5F5F0]/85 uppercase"
          >
            Notes <span className="text-[#92988F]">(Optional)</span>
          </label>
          <textarea
            id="enquiry-message"
            rows={3}
            placeholder="Preferred morning/evening slot or training goals..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
            className="w-full resize-y rounded-[4px] border border-[#F5F5F0]/15 bg-[#090B09] px-3.5 py-2.5 text-sm text-[#F5F5F0] placeholder:text-[#92988F]/55 transition-colors focus:border-[var(--brand-accent)] focus:outline-none"
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

      <div className="mt-6 flex flex-col gap-3 border-t border-[#F5F5F0]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs text-[var(--brand-muted)]">
          {siteConfig.contact.whatsappIsPlaceholder
            ? "Demo mode · Prepares formatted enquiry preview locally"
            : "Prepares a WhatsApp enquiry message"}
        </span>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3 text-xs font-bold tracking-[0.1em] text-[var(--brand-accent-ink)] uppercase transition-colors hover:bg-[var(--brand-accent-hover)] disabled:opacity-50 sm:w-auto cursor-pointer"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>PREPARING...</span>
            </>
          ) : (
            <>
              <span>
                {siteConfig.contact.whatsappIsPlaceholder
                  ? "PREVIEW ENQUIRY"
                  : "PREPARE WHATSAPP ENQUIRY"}
              </span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
