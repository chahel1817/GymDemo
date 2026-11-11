import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";

function SocialIcon({
  platform,
}: {
  platform: "instagram" | "youtube" | "facebook";
}) {
  if (platform === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }
  if (platform === "youtube") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3v6Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060709]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[11px] tracking-[0.18em] text-[var(--brand-accent)] uppercase">
              {siteConfig.footer.establishedLabel}
            </p>
            <p className="mt-3 font-display text-4xl font-bold tracking-[0.04em] text-white uppercase sm:text-5xl">
              {siteConfig.brand.wordmarkPrimary}{" "}
              <span className="text-[var(--brand-accent)]">
                {siteConfig.brand.wordmarkSecondary}
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--brand-muted)]">
              {siteConfig.brand.shortStatement}
            </p>
          </div>

          <a
            href="#home"
            className="inline-flex min-h-11 items-center gap-2.5 self-start border border-white/20 px-4 py-2.5 font-mono text-xs tracking-[0.15em] text-white uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)] lg:self-end"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Middle Row: Columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Quick Navigation */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase">
              NAVIGATION
            </h2>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.navigation.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-sm text-[var(--brand-muted)] transition-colors hover:text-[var(--brand-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Address */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase">
              LOCATION (DEMO)
            </h2>
            <address className="mt-4 space-y-1.5 text-sm leading-relaxed text-[var(--brand-muted)] not-italic">
              <p className="text-white/85">{siteConfig.contact.address.line1}</p>
              <p>{siteConfig.contact.address.line2}</p>
              <p>
                {siteConfig.contact.address.city},{" "}
                {siteConfig.contact.address.state},{" "}
                {siteConfig.contact.address.country}
              </p>
            </address>
            <a
              href={siteConfig.contact.googleMaps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[11px] tracking-[0.14em] text-[var(--brand-accent)] uppercase hover:underline"
            >
              {siteConfig.contact.googleMaps.label} →
            </a>
          </div>

          {/* Demo Hours & Contact */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase">
              HOURS & DESK (DEMO)
            </h2>
            <div className="mt-4 space-y-2 text-sm text-[var(--brand-muted)]">
              <p>
                <span className="block text-xs text-white/60">
                  {siteConfig.contact.openingHours.weekdaysLabel}
                </span>
                {siteConfig.contact.openingHours.weekdaysTime}
              </p>
              <p>
                <span className="block text-xs text-white/60">
                  {siteConfig.contact.openingHours.weekendLabel}
                </span>
                {siteConfig.contact.openingHours.weekendTime}
              </p>
              <p className="pt-2 text-white/85">
                {siteConfig.contact.displayPhone}
              </p>
              <p className="text-xs">{siteConfig.contact.email}</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-white uppercase">
              SOCIAL (PLACEHOLDERS)
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-[var(--brand-muted)]">
              Connect your official club social profiles inside{" "}
              <code className="font-mono text-white/80">data/site.ts</code>.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {siteConfig.socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (Placeholder link)`}
                    className="inline-flex h-11 items-center gap-2 border border-white/15 bg-white/[0.02] px-3.5 font-mono text-[11px] tracking-[0.12em] text-white/80 uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                  >
                    <SocialIcon platform={social.platform} />
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Demo Notice */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-[var(--brand-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.footer.copyrightHolder}. All rights reserved.
          </p>
          <p className="max-w-xl text-white/55">
            {siteConfig.footer.demoNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
