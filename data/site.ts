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

export interface TrustPillar {
  index: string;
  title: string;
  description: string;
  iconName: "Award" | "Dumbbell" | "Activity" | "SlidersHorizontal";
}

export interface SocialLink {
  label: string;
  href: string;
  platform: "instagram" | "youtube" | "facebook";
  isPlaceholder: boolean;
}

export interface SiteConfig {
  isDemo: boolean;
  demoNotice: string;
  brand: {
    name: string;
    wordmarkPrimary: string;
    wordmarkSecondary: string;
    tagline: string;
    shortStatement: string;
    metadataTags: readonly string[];
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
    backgroundImage: {
      src: string;
      alt: string;
      objectPosition: string;
    };
  };
  trustPillars: TrustPillar[];
  about: {
    eyebrow: string;
    heading: string;
    lead: string;
    paragraphs: string[];
    pillars: { label: string; detail: string }[];
    ctaLabel: string;
    ctaHref: string;
    image: {
      src: string;
      alt: string;
      caption: string;
      objectPosition: string;
    };
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    /**
     * DEMO PLACEHOLDER WHATSAPP NUMBER
     * Format: Country code + 10-digit number without '+' or spaces (e.g., "9198XXXXXXXX").
     * Replace before going live for a real club.
     */
    whatsappNumber: string;
    whatsappIsPlaceholder: boolean;
    /** Optional real API endpoint if a backend webhook/CRM is connected later. */
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
      note: string;
    };
  };
  socialLinks: SocialLink[];
  footer: {
    copyrightHolder: string;
    establishedLabel: string;
    demoNote: string;
  };
}

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://forge-athletics-demo.example.com";

export const siteConfig: SiteConfig = {
  isDemo: true,
  demoNotice:
    "Commercial Demo Website — All trainers, timings, pricing and contact details are illustrative placeholders ready for white-label customization.",
  brand: {
    name: "FORGE ATHLETICS",
    wordmarkPrimary: "FORGE",
    wordmarkSecondary: "ATHLETICS",
    tagline: "Performance-Driven Strength & Conditioning Club",
    shortStatement:
      "An architectural training floor built for disciplined strength, structured conditioning, and purposeful coaching in Ahmedabad.",
    metadataTags: ["PERFORMANCE", "STRENGTH", "COMMUNITY"],
    cityLabel: "AHMEDABAD, GUJARAT",
  },
  theme: {
    bgPrimary: "#08090B",
    bgElevated: "#0F1115",
    bgCard: "#14171D",
    accent: "#C8FF00",
    accentHover: "#D9FF4D",
    accentInk: "#08090B",
    textPrimary: "#F5F6F8",
    textMuted: "#9AA1AE",
    borderSubtle: "rgba(255, 255, 255, 0.10)",
  },
  seo: {
    siteUrl: resolvedSiteUrl,
    title: "FORGE ATHLETICS | Performance Strength & Conditioning Club — Ahmedabad",
    description:
      "Train with purpose at FORGE ATHLETICS. Explore structured strength & conditioning programs, personal coaching, functional turf zones, and flexible demo memberships in Ahmedabad.",
    keywords: [
      "FORGE ATHLETICS",
      "gym in Ahmedabad",
      "strength and conditioning Ahmedabad",
      "personal training Ahmedabad",
      "functional fitness club Gujarat",
      "premium fitness studio",
    ],
    ogImage: "/images/farkas-mario-YwK5YfOkqww-unsplash.jpg",
    locale: "en_IN",
  },
  navigation: {
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Programs", href: "#programs" },
      { label: "Trainers", href: "#trainers" },
      { label: "Membership", href: "#memberships" },
      { label: "Contact", href: "#contact" },
    ],
    ctaLabel: "BOOK A FREE TRIAL",
    ctaHref: "#contact",
  },
  hero: {
    eyebrow: "AHMEDABAD PERFORMANCE CLUB // DEMO SHOWCASE",
    headlineLine1: "BUILT BY DISCIPLINE.",
    headlineLine2: "DEFINED BY STRENGTH.",
    supportingText:
      "Train with purpose. Build strength. Become your strongest version.",
    primaryCtaLabel: "EXPLORE MEMBERSHIPS",
    primaryCtaHref: "#memberships",
    secondaryCtaLabel: "BOOK A FREE TRIAL",
    secondaryCtaHref: "#contact",
    backgroundImage: {
      src: "/images/farkas-mario-YwK5YfOkqww-unsplash.jpg",
      alt: "Athlete holding a heavy barbell across shoulders inside a dark concrete strength club",
      objectPosition: "62% 28%",
    },
  },
  trustPillars: [
    {
      index: "01",
      title: "Expert Coaching",
      description: "Structured floor guidance focused on biomechanics and safe progression.",
      iconName: "Award",
    },
    {
      index: "02",
      title: "Strength Training",
      description: "Calibrated free weights, competition racks, and progressive iron.",
      iconName: "Dumbbell",
    },
    {
      index: "03",
      title: "Functional Fitness",
      description: "Dedicated conditioning lanes for power, agility, and engine work.",
      iconName: "Activity",
    },
    {
      index: "04",
      title: "Personalised Programs",
      description: "Goal-aligned training blocks tailored to your schedule and baseline.",
      iconName: "SlidersHorizontal",
    },
  ],
  about: {
    eyebrow: "01 // PHILOSOPHY",
    heading: "A DISCIPLINED ENVIRONMENT ENGINEERED FOR REAL PROGRESS.",
    lead: "No gimmicks, no overcrowded floor layouts, and no aimless routines—just intentional coaching, commercial-grade iron, and measurable consistency.",
    paragraphs: [
      "FORGE ATHLETICS is designed around a straightforward principle: lasting physical transformation comes from structured training blocks, proper movement mechanics, and showing up week after week.",
      "Whether you are stepping onto a lifting platform for the first time or refining compound lifts under a coach, every zone of the club is laid out to help you focus, execute, and recover with purpose.",
    ],
    pillars: [
      {
        label: "DISCIPLINE FIRST",
        detail: "Clear weekly training cadence instead of random high-fatigue workouts.",
      },
      {
        label: "CONSISTENCY OVER INTENSITY",
        detail: "Sustainable progression tracked across strength, mobility, and conditioning.",
      },
      {
        label: "PERSONALISED COACHING",
        detail: "Movement screening and adaptable programming for every experience level.",
      },
    ],
    ctaLabel: "EXPLORE TRAINING PROGRAMS",
    ctaHref: "#programs",
    image: {
      src: "/images/luke-witter-k47w6BeapCs-unsplash.jpg",
      alt: "Focused athlete performing dumbbell strength work in dramatic low-key club lighting",
      caption: "DISCIPLINE // FREE WEIGHT PERFORMANCE BAY",
      objectPosition: "45% 25%",
    },
  },
  contact: {
    eyebrow: "07 // START YOUR TRAINING",
    heading: "BOOK YOUR FREE TRIAL SESSION.",
    subheading:
      "Leave your details below to reserve an introductory floor tour and consultation. Submissions open a pre-filled WhatsApp enquiry message ready to send directly to the club desk.",
    whatsappNumber: "910000000000", // DEMO PLACEHOLDER: Replace with real 91XXXXXXXXXX number
    whatsappIsPlaceholder: true,
    displayPhone: "+91 00000 00000 (Demo Placeholder)",
    email: "concierge@forgeathletics-demo.example",
    address: {
      label: "CLUB LOCATION (DEMO PLACEHOLDER)",
      line1: "Sample Studio Address — Near Sindhu Bhavan Road / SG Highway",
      line2: "Bodakdev / Thaltej District",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      isPlaceholder: true,
      note: "Replace with your verified club building name, floor, and landmark.",
    },
    openingHours: {
      weekdaysLabel: "Monday – Saturday",
      weekdaysTime: "05:30 AM – 10:30 PM (Sample)",
      weekendLabel: "Sunday",
      weekendTime: "07:00 AM – 02:00 PM (Sample)",
      isPlaceholder: true,
    },
    googleMaps: {
      label: "Open Ahmedabad Map Preview (Demo Link)",
      url: "https://www.google.com/maps/search/?api=1&query=Ahmedabad+Gujarat",
      isPlaceholder: true,
      note: "Replace with your exact Google Business Profile Maps link.",
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
    establishedLabel: "AHMEDABAD PERFORMANCE CLUB // WHITE-LABEL DEMO",
    demoNote:
      "Demo showcase built for fitness club owners. All branding, colours, photography, trainers, timings, and pricing are centrally editable.",
  },
};

