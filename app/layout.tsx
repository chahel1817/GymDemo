import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import type { CSSProperties } from "react";
import { siteConfig } from "@/data/site";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: siteConfig.theme.bgPrimary,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: "/",
    siteName: siteConfig.brand.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 800,
        alt: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeStyle = {
    "--brand-bg": siteConfig.theme.bgPrimary,
    "--brand-elevated": siteConfig.theme.bgElevated,
    "--brand-card": siteConfig.theme.bgCard,
    "--brand-accent": siteConfig.theme.accent,
    "--brand-accent-hover": siteConfig.theme.accentHover,
    "--brand-accent-ink": siteConfig.theme.accentInk,
    "--brand-text": siteConfig.theme.textPrimary,
    "--brand-muted": siteConfig.theme.textMuted,
    "--brand-border": siteConfig.theme.borderSubtle,
  } as CSSProperties;

  return (
    <html
      lang="en"
      style={themeStyle}
      className={`${bebasNeue.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--brand-bg)] font-sans text-[var(--brand-text)]">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
