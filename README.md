# FORGE ATHLETICS — Performance Fitness Club Website

A production-ready, white-label fitness club website built with Next.js App Router, TypeScript, Tailwind CSS, and Motion for React. Designed with an **Editorial Performance** visual identity (`#090B09` deep obsidian, `#111411` elevated charcoal, `#F5F5F0` warm white, `#B8F34A` electric lime) tailored for conversion-focused gym showcases.

## Features

- **Editorial Hero & Brand Ticker**: Single-image priority hero composition (`/images/forge_athlete.webp`) with breakpoint-tuned framing, left-side readability, and a reduced-motion-safe marquee strip.
- **Programs & Coaching**: Three photography-led primary tracks (`STRENGTH`, `CONDITIONING`, `PERSONAL TRAINING`), collapsible additional tracks, and sample coach profiles that pre-fill the trial form.
- **Asymmetric Gallery & Accessible Lightbox**: Non-repetitive facility photography with hover zoom, keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`), full focus trapping, and focus restoration.
- **Interactive Memberships**: Monthly, Quarterly, and Annual billing duration selector updating illustrative INR totals in real time.
- **Honest Lead Capture & WhatsApp Handoff**: React Hook Form + Zod validation (Indian `+91` mobile numbers and future/today visit dates), duplicate-submission prevention, optional API webhook support, popup-blocked fallback, and safe demo-preview mode when placeholder numbers are active.
- **Technical SEO & Accessibility**: Dynamic canonical/OG/Twitter metadata, `sitemap.xml`, `robots.txt`, web manifest, conditional `SportsActivityLocation` structured data (emitted only when verified business mode is enabled), `FAQPage` JSON-LD, semantic landmarks, and `prefers-reduced-motion` support.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, `cacheComponents`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + `next/font/google` (`Bebas Neue`, `Manrope`)
- **Animations**: Motion for React (`motion/react`)
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`
- **Notifications**: Sonner

## Installation & Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL used for `<link rel="canonical">`, Open Graph URLs, `robots.txt`, and `sitemap.xml`. | Falls back to `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, or `https://gym-demo-three-lilac.vercel.app`. |

## Production Build & Deployment

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

When deploying to Vercel, configure `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables to match your final custom domain or Vercel production domain.

## White-Label Customisation

Every brand and business value lives in `data/`:

- [`data/site.ts`](data/site.ts): Brand name, wordmark, logo image path, theme colours (`#090B09`, `#B8F34A`, etc.), hero headline & image, philosophy & experience sections, contact details, WhatsApp number, address, opening hours, social links, and SEO metadata.
- [`data/programs.ts`](data/programs.ts): Primary and secondary training tracks.
- [`data/trainers.ts`](data/trainers.ts): Coaching roster profiles.
- [`data/gallery.ts`](data/gallery.ts): Facility zone images and captions.
- [`data/memberships.ts`](data/memberships.ts): Tier names, billing durations, pricing, and inclusions.
- [`data/faq.ts`](data/faq.ts): FAQ questions and answers.

## Replacing Demo Business Information Before Going Live

Before launching for a real gym client, update [`data/site.ts`](data/site.ts) and the other `data/*` files:

1. Set `isDemo: false` and `isVerifiedBusiness: true` in `data/site.ts` (enables valid `SportsActivityLocation` structured data).
2. Replace `contact.whatsappNumber` with a verified number (`91XXXXXXXXXX`) and set `contact.whatsappIsPlaceholder: false` to enable live `wa.me` handoff.
3. Replace `contact.displayPhone`, `contact.email`, `contact.address`, `contact.openingHours`, `contact.googleMaps.url`, and `socialLinks`.
4. Replace sample trainer profiles (`data/trainers.ts`), membership rates (`data/memberships.ts`), FAQ answers (`data/faq.ts`), and local WebP images in `public/images/`.
5. Set `NEXT_PUBLIC_SITE_URL` to the client's verified production domain.
