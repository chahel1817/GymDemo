"use client";

import { useState } from "react";
import { Clock, ExternalLink, MapPin, Phone, Map } from "lucide-react";
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
      className="bg-[var(--brand-bg)] py-20 sm:py-24 lg:py-28"
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

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Club Info, Hours & Configurable Map Preview */}
          <Reveal className="space-y-6 lg:col-span-5">
            {/* Address Block */}
            <div className="border border-white/10 bg-[var(--brand-elevated)] p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.16em] text-[var(--brand-accent)] uppercase">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>{contact.address.label}</span>
                </span>
              </div>

              <address className="mt-4 space-y-1 text-sm leading-relaxed text-white/90 not-italic">
                <p className="font-medium">{contact.address.line1}</p>
                <p className="text-[var(--brand-muted)]">
                  {contact.address.line2}
                </p>
                <p className="text-[var(--brand-muted)]">
                  {contact.address.city}, {contact.address.state},{" "}
                  {contact.address.country}
                </p>
              </address>

              {contact.address.isPlaceholder ? (
                <p className="mt-3 text-xs text-amber-200/80">
                  {contact.address.note}
                </p>
              ) : null}
            </div>

            {/* Opening Hours & Direct Desk */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="border border-white/10 bg-[var(--brand-elevated)] p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--brand-accent)] uppercase">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>OPENING HOURS</span>
                </div>
                <dl className="mt-3 space-y-2 text-xs">
                  <div>
                    <dt className="text-white/55">
                      {contact.openingHours.weekdaysLabel}
                    </dt>
                    <dd className="mt-0.5 font-medium text-white/90">
                      {contact.openingHours.weekdaysTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-white/55">
                      {contact.openingHours.weekendLabel}
                    </dt>
                    <dd className="mt-0.5 font-medium text-white/90">
                      {contact.openingHours.weekendTime}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-white/10 bg-[var(--brand-elevated)] p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.15em] text-[var(--brand-accent)] uppercase">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>CLUB DESK (DEMO)</span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <p className="font-medium text-white/90">
                    {contact.displayPhone}
                  </p>
                  <p className="break-all text-[var(--brand-muted)]">
                    {contact.email}
                  </p>
                  <p className="pt-1 text-[11px] text-amber-200/80">
                    Replace placeholder phone & WhatsApp number in{" "}
                    <code className="font-mono">data/site.ts</code>.
                  </p>
                </div>
              </div>
            </div>

            {/* Configurable Google Maps Preview */}
            <div className="border border-white/10 bg-[var(--brand-elevated)] p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.15em] text-white uppercase">
                  <Map className="h-4 w-4 text-[var(--brand-accent)]" aria-hidden="true" />
                  <span>GOOGLE MAPS INTEGRATION</span>
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-white/50 uppercase">
                  CITY-LEVEL DEMO PIN
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-[var(--brand-muted)]">
                {contact.googleMaps.note}
              </p>

              {showMapEmbed ? (
                <div className="mt-4 overflow-hidden border border-white/15 bg-black">
                  <iframe
                    title="Ahmedabad Gujarat Demo Map Preview"
                    src={mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-56 w-full border-0 grayscale contrast-125"
                  />
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowMapEmbed((prev) => !prev)}
                  className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] cursor-pointer"
                >
                  <span>
                    {showMapEmbed
                      ? "HIDE MAP EMBED"
                      : "PREVIEW AHMEDABAD MAP"}
                  </span>
                </button>

                <a
                  href={contact.googleMaps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-white/15 bg-white/[0.03] px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-[var(--brand-accent)] uppercase transition-colors hover:border-[var(--brand-accent)]"
                >
                  <span>{contact.googleMaps.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Trial Enquiry Form */}
          <Reveal className="lg:col-span-7" delay={0.08}>
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
