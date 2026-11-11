"use client";

import { useState } from "react";
import { Clock, ExternalLink, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [showMapEmbed, setShowMapEmbed] = useState(false);
  const { contact } = siteConfig;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${contact.address.city}, ${contact.address.state}`,
  )}&t=&z=12&ie=UTF8&iwloc=&output=embed`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-[#F5F5F0]/10 bg-[var(--brand-bg)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={contact.eyebrow}
            heading={contact.heading}
            headingId="contact-heading"
            subheading={contact.subheading}
          />
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Compact Club Info */}
          <Reveal className="space-y-4 lg:col-span-5">
            <div className="border border-[#F5F5F0]/10 bg-[var(--brand-elevated)] p-6">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-[var(--brand-accent)] uppercase">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{contact.address.label}</span>
              </div>
              <address className="mt-3 space-y-0.5 text-sm text-[var(--brand-text)] not-italic">
                <p>{contact.address.line1}</p>
                <p className="text-[var(--brand-muted)]">
                  {contact.address.line2}, {contact.address.city},{" "}
                  {contact.address.state}
                </p>
              </address>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowMapEmbed((prev) => !prev)}
                  className="inline-flex min-h-9 items-center rounded-full border border-[#F5F5F0]/20 px-4 text-[11px] font-semibold tracking-[0.1em] text-[var(--brand-text)] uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
                >
                  {showMapEmbed ? "HIDE MAP" : "MAP PREVIEW"}
                </button>
                <a
                  href={contact.googleMaps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] text-[var(--brand-accent)] uppercase hover:underline"
                >
                  <span>{contact.googleMaps.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              {showMapEmbed ? (
                <div className="mt-4 overflow-hidden border border-[#F5F5F0]/15 bg-black">
                  <iframe
                    title="Ahmedabad Demo Map Preview"
                    src={mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-48 w-full border-0 grayscale contrast-125"
                  />
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="border border-[#F5F5F0]/10 bg-[var(--brand-elevated)] p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-[var(--brand-accent)] uppercase">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>SAMPLE HOURS</span>
                </div>
                <p className="mt-2.5 text-sm text-[var(--brand-text)]">
                  {contact.openingHours.weekdaysLabel}:{" "}
                  <span className="text-[var(--brand-muted)]">
                    {contact.openingHours.weekdaysTime}
                  </span>
                </p>
                <p className="mt-1 text-sm text-[var(--brand-text)]">
                  {contact.openingHours.weekendLabel}:{" "}
                  <span className="text-[var(--brand-muted)]">
                    {contact.openingHours.weekendTime}
                  </span>
                </p>
              </div>

              <div className="border border-[#F5F5F0]/10 bg-[var(--brand-elevated)] p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-[var(--brand-accent)] uppercase">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>DEMO CONTACT</span>
                </div>
                <p className="mt-2.5 text-sm text-[var(--brand-text)]">
                  {contact.displayPhone}
                </p>
                <p className="mt-0.5 text-xs text-[var(--brand-muted)]">
                  {contact.email}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right Form */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
