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
  isDemo: boolean;
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
      objectPositionDesktop: string;
      objectPositionMobile: string;
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
     * DEMO PLACEHOLDER WHATSAPP NUMBER
     * Format: Country code + 10-digit number without '+' or spaces.
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

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://forge-athletics-demo.example.com";

export const siteConfig: SiteConfig = {
  isDemo: true,
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
    siteUrl: resolvedSiteUrl,
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
    ogImage: "/images/forge_athlete.png",
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
      src: "/images/forge_athlete.png",
      alt: "Muscular athlete wearing a Forge tank top clapping chalk on hands beneath dramatic lime-green gym lighting",
      objectPositionDesktop: "52% 14%",
      objectPositionMobile: "50% 8%",
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
      "No shortcuts or crowded gimmicks. Just structured progression, calibrated iron, and focused coaching built to make discipline your daily standard.",
    ctaLabel: "EXPLORE THE CLUB",
    ctaHref: "#experience",
    image: {
      src: "/images/luke-witter-k47w6BeapCs-unsplash.jpg",
      alt: "Athlete performing controlled dumbbell curl under warm directional lighting",
      objectPosition: "48% 22%",
    },
  },
  experience: {
    eyebrow: "03 // THE EXPERIENCE",
    heading: "ENGINEERED FOR DEEP WORK.",
    differentiators: [
      {
        title: "Calibrated Iron & Turf",
        detail: "Competition plates, open racks, and dedicated conditioning lanes.",
      },
      {
        title: "Coaching That Cues",
        detail: "Hands-on mechanics guidance without crowded studio chaos.",
      },
      {
        title: "Measured Progression",
        detail: "Structured weekly blocks replacing random fatigue workouts.",
      },
    ],
    ctaLabel: "BOOK A FREE TRIAL",
    ctaHref: "#contact",
    image: {
      src: "/images/salman-sidheek-iW79tgCbiMs-unsplash.jpg",
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
      src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.jpg",
      alt: "Athletes silhouetted against industrial gym windows before a conditioning session",
      objectPosition: "50% 45%",
    },
  },
  contact: {
    eyebrow: "07 // FREE TRIAL",
    heading: "BOOK YOUR VISIT.",
    subheading:
      "Reserve an introductory tour and trial session. Details send directly as a pre-filled WhatsApp enquiry.",
    whatsappNumber: "910000000000", // DEMO PLACEHOLDER
    whatsappIsPlaceholder: true,
    displayPhone: "+91 00000 00000 (Demo)",
    email: "hello@forgeathletics-demo.example",
    address: {
      label: "LOCATION (DEMO PLACEHOLDER)",
      line1: "Near Sindhu Bhavan Road / SG Highway",
      line2: "Bodakdev, Ahmedabad",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      isPlaceholder: true,
      note: "Sample Ahmedabad placeholder. Replace in data/site.ts.",
    },
    openingHours: {
      weekdaysLabel: "Mon – Sat",
      weekdaysTime: "05:30 AM – 10:30 PM (Sample)",
      weekendLabel: "Sunday",
      weekendTime: "07:00 AM – 02:00 PM (Sample)",
      isPlaceholder: true,
    },
    googleMaps: {
      label: "Open Google Maps (Demo Pin)",
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
    demoNote: "White-label fitness demo — editable via data/site.ts.",
  },
};
