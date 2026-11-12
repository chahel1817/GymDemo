export interface ThemeTokens {
  bgPrimary: string;
  bgElevated: string;
  bgCard: string;
  accent: string;
  accentHover: string;
  accentInk: string;
  textPrimary: string;
  textMuted: string;
  borderSubtle: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  platform: "instagram" | "youtube" | "facebook";
  isPlaceholder: boolean;
}

export interface SiteConfig {
  /**
   * Toggle between demo showcase mode and verified live gym production mode.
   * LocalBusiness / SportsActivityLocation structured data and live WhatsApp sending
   * only activate when `isDemo` is false AND `isVerifiedBusiness` is true.
   */
  isDemo: boolean;
  isVerifiedBusiness: boolean;
  brand: {
    name: string;
    shortName: string;
    wordmarkPrimary: string;
    wordmarkSecondary: string;
    tagline: string;
    shortStatement: string;
    cityLabel: string;
    logoImageSrc?: string;
  };
  theme: ThemeTokens;
  seo: {
    siteUrl: string;
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    locale: string;
  };
  navigation: {
    links: NavItem[];
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    supportingText: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    image: {
      src: string;
      alt: string;
      objectPositionClass: string;
    };
  };
  tickerItems: readonly string[];
  philosophy: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    paragraph: string;
    ctaLabel: string;
    ctaHref: string;
    image: {
      src: string;
      alt: string;
      objectPosition: string;
    };
  };
  experience: {
    eyebrow: string;
    heading: string;
    differentiators: {
      title: string;
      detail: string;
    }[];
    ctaLabel: string;
    ctaHref: string;
    image: {
      src: string;
      alt: string;
      objectPosition: string;
    };
  };
  closingCta: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    supportingText: string;
    ctaLabel: string;
    ctaHref: string;
    image: {
      src: string;
      alt: string;
      objectPosition: string;
    };
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    /**
     * Configure a verified WhatsApp number (`91XXXXXXXXXX`) and set
     * `whatsappIsPlaceholder: false` to enable live wa.me handoff.
     */
    whatsappNumber: string;
    whatsappIsPlaceholder: boolean;
    enquiryEndpoint?: string;
    displayPhone: string;
    email: string;
    address: {
      label: string;
      line1: string;
      line2: string;
      city: string;
      state: string;
      postalCode?: string;
      country: string;
      isPlaceholder: boolean;
      note: string;
    };
    openingHours: {
      weekdaysLabel: string;
      weekdaysTime: string;
      weekendLabel: string;
      weekendTime: string;
      isPlaceholder: boolean;
    };
    googleMaps: {
      label: string;
      url: string;
      isPlaceholder: boolean;
    };
  };
  socialLinks: SocialLink[];
  footer: {
    copyrightHolder: string;
    demoNote: string;
  };
}

function resolveProductionSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(
      /^https?:\/\//,
      "",
    ).replace(/\/+$/, "");
    return `https://${prodUrl}`;
  }
  if (process.env.VERCEL_URL) {
    const previewUrl = process.env.VERCEL_URL.replace(
      /^https?:\/\//,
      "",
    ).replace(/\/+$/, "");
    return `https://${previewUrl}`;
  }
  return "https://gym-demo-three-lilac.vercel.app";
}

export const siteConfig: SiteConfig = {
  isDemo: true,
  isVerifiedBusiness: false,
  brand: {
    name: "FORGE ATHLETICS",
    shortName: "FORGE",
    wordmarkPrimary: "FORGE",
    wordmarkSecondary: "ATHLETICS",
    tagline: "Editorial Performance Club — Ahmedabad",
    shortStatement:
      "Performance strength & conditioning club built for disciplined training.",
    cityLabel: "AHMEDABAD, GUJARAT",
  },
  theme: {
    bgPrimary: "#090B09",
    bgElevated: "#111411",
    bgCard: "#161A16",
    accent: "#B8F34A",
    accentHover: "#C9F76E",
    accentInk: "#090B09",
    textPrimary: "#F5F5F0",
    textMuted: "#92988F",
    borderSubtle: "rgba(245, 245, 240, 0.10)",
  },
  seo: {
    siteUrl: resolveProductionSiteUrl(),
    title: "FORGE ATHLETICS | Performance Strength & Conditioning Club — Ahmedabad",
    description:
      "Build strength and own your journey at FORGE ATHLETICS. Explore structured strength, conditioning, personal coaching, and demo memberships in Ahmedabad.",
    keywords: [
      "FORGE ATHLETICS",
      "gym in Ahmedabad",
      "strength and conditioning Ahmedabad",
      "personal training Ahmedabad",
      "performance fitness club Gujarat",
    ],
    ogImage: "/images/forge_athlete.webp",
    locale: "en_IN",
  },
  navigation: {
    links: [
      { label: "Home", href: "#home" },
      { label: "Programs", href: "#programs" },
      { label: "Trainers", href: "#trainers" },
      { label: "Membership", href: "#memberships" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "Book a Free Trial",
    ctaHref: "#contact",
  },
  hero: {
    eyebrow: "TRAIN / PERFORM / EVOLVE",
    headlineLine1: "EARN YOUR",
    headlineLine2: "STRONG.",
    supportingText: "Train with purpose. Build strength. Become a stronger you.",
    primaryCtaLabel: "Book a Free Trial",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "Explore Programs",
    secondaryCtaHref: "#programs",
    image: {
      src: "/images/forge_athlete.webp",
      alt: "Muscular athlete wearing a Forge tank top clapping chalk on hands beneath dramatic lime-green gym lighting",
      objectPositionClass: "object-[50%_10%] lg:object-[52%_14%]",
    },
  },
  tickerItems: [
    "STRENGTH",
    "DISCIPLINE",
    "PERFORMANCE",
    "PROGRESS",
    "CONSISTENCY",
  ],
  philosophy: {
    eyebrow: "01 // PHILOSOPHY",
    headingLine1: "THE WORK",
    headingLine2: "CHANGES YOU.",
    paragraph:
      "No shortcuts. Structured progression, calibrated iron, and focused coaching built to make discipline your daily standard.",
    ctaLabel: "EXPLORE THE CLUB",
    ctaHref: "#experience",
    image: {
      src: "/images/luke-witter-k47w6BeapCs-unsplash.webp",
      alt: "Athlete performing controlled dumbbell work under warm directional gym lighting",
      objectPosition: "48% 22%",
    },
  },
  experience: {
    eyebrow: "03 // THE EXPERIENCE",
    heading: "ENGINEERED FOR DEEP WORK.",
    differentiators: [
      {
        title: "Calibrated Iron & Turf",
        detail: "Competition plates and open sprint lanes.",
      },
      {
        title: "Coaching That Cues",
        detail: "Mechanics guidance without studio chaos.",
      },
      {
        title: "Measured Progression",
        detail: "Structured blocks replacing random fatigue.",
      },
    ],
    ctaLabel: "BOOK A FREE TRIAL",
    ctaHref: "#contact",
    image: {
      src: "/images/salman-sidheek-iW79tgCbiMs-unsplash.webp",
      alt: "Minimalist dark architectural gym floor with linear overhead ceiling light",
      objectPosition: "50% 50%",
    },
  },
  closingCta: {
    eyebrow: "START TODAY",
    headingLine1: "YOUR NEXT CHAPTER",
    headingLine2: "STARTS HERE.",
    supportingText: "Show up. Put in the work. Become stronger.",
    ctaLabel: "BOOK YOUR FREE TRIAL",
    ctaHref: "#contact",
    image: {
      src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.webp",
      alt: "Athletes silhouetted against industrial gym windows before a conditioning session",
      objectPosition: "50% 45%",
    },
  },
  contact: {
    eyebrow: "07 // FREE TRIAL",
    heading: "BOOK YOUR VISIT.",
    subheading:
      "Prepare an introductory visit enquiry below. In demo mode, your formatted message is previewed without contacting an external phone line.",
    whatsappNumber: "910000000000", // DEMO PLACEHOLDER — set a real 91XXXXXXXXXX number and whatsappIsPlaceholder: false for live launch
    whatsappIsPlaceholder: true,
    displayPhone: "+91 00000 00000 (Demo Placeholder)",
    email: "demo-placeholder@forge-club.local",
    address: {
      label: "LOCATION (DEMO PLACEHOLDER)",
      line1: "Sample Club Area — Sindhu Bhavan Road / SG Highway",
      line2: "Bodakdev, Ahmedabad",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      isPlaceholder: true,
      note: "Illustrative Ahmedabad placeholder. Replace in data/site.ts before production launch.",
    },
    openingHours: {
      weekdaysLabel: "Mon – Sat",
      weekdaysTime: "05:30 AM – 10:30 PM (Sample)",
      weekendLabel: "Sunday",
      weekendTime: "07:00 AM – 02:00 PM (Sample)",
      isPlaceholder: true,
    },
    googleMaps: {
      label: "Open Google Maps (Ahmedabad Demo)",
      url: "https://www.google.com/maps/search/?api=1&query=Ahmedabad+Gujarat",
      isPlaceholder: true,
    },
  },
  socialLinks: [
    {
      label: "Instagram",
      href: "https://instagram.com",
      platform: "instagram",
      isPlaceholder: true,
    },
    {
      label: "YouTube",
      href: "https://youtube.com",
      platform: "youtube",
      isPlaceholder: true,
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      platform: "facebook",
      isPlaceholder: true,
    },
  ],
  footer: {
    copyrightHolder: "FORGE ATHLETICS",
    demoNote: "White-label demo showcase — configure all details in data/site.ts.",
  },
};
