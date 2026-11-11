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
        strokeWidth="1.8"
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
        strokeWidth="1.8"
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
      strokeWidth="1.8"
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
    <footer className="border-t border-[#F5F5F0]/10 bg-[#070907]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-3xl tracking-[0.06em] text-[var(--brand-text)] uppercase">
              {siteConfig.brand.wordmarkPrimary}{" "}
              <span className="text-[var(--brand-accent)]">
                {siteConfig.brand.wordmarkSecondary}
              </span>
            </p>
            <p className="mt-1 max-w-md text-xs text-[var(--brand-muted)]">
              {siteConfig.brand.shortStatement}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {siteConfig.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.08em] text-[var(--brand-muted)] uppercase transition-colors hover:text-[var(--brand-accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {siteConfig.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (Placeholder)`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F5F0]/15 text-[var(--brand-muted)] transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}

            <a
              href="#home"
              aria-label="Back to top"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#F5F5F0]/20 px-4 text-xs font-semibold tracking-[0.08em] text-[var(--brand-text)] uppercase transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            >
              <span>TOP</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-[#F5F5F0]/10 pt-6 text-[11px] text-[var(--brand-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.footer.copyrightHolder}. {siteConfig.brand.cityLabel}.
          </p>
          <p>{siteConfig.footer.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
