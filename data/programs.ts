export type ProgramTier = "primary" | "secondary";

export interface TrainingProgram {
  id: string;
  index: string;
  title: string;
  shortLabel: string;
  tier: ProgramTier;
  summary: string;
  image: {
    src: string;
    alt: string;
    objectPosition: string;
  };
}

export const programsMeta = {
  eyebrow: "02 // TRAINING PROGRAMS",
  heading: "THREE PILLARS. ZERO FLUFF.",
  secondaryHeading: "ADDITIONAL SPECIALISED TRACKS",
};

export const programsData: TrainingProgram[] = [
  {
    id: "strength",
    index: "01",
    title: "STRENGTH",
    shortLabel: "Strength & Conditioning",
    tier: "primary",
    summary:
      "Barbell periodisation and progressive overload built for lasting force and muscle.",
    image: {
      src: "/images/pexels-grzegorz-2777274-5209197.webp",
      alt: "Athlete setting up a heavy barbell deadlift with red competition plates",
      objectPosition: "50% 32%",
    },
  },
  {
    id: "conditioning",
    index: "02",
    title: "CONDITIONING",
    shortLabel: "Functional Fitness",
    tier: "primary",
    summary:
      "Battle ropes, sled turf, and anaerobic intervals for real athletic stamina.",
    image: {
      src: "/images/scott-webb-U5kQvbQWoG0-unsplash.webp",
      alt: "Athlete slamming heavy battle ropes in dramatic spotlighting",
      objectPosition: "28% 30%",
    },
  },
  {
    id: "personal-training",
    index: "03",
    title: "PERSONAL TRAINING",
    shortLabel: "Personal Training",
    tier: "primary",
    summary:
      "1-on-1 coaching tailored to your movement baseline, goals, and schedule.",
    image: {
      src: "/images/pexels-silverkblack-39219675.webp",
      alt: "Coach observing and cueing an athlete during a barbell deadlift",
      objectPosition: "50% 25%",
    },
  },
  {
    id: "cardio-endurance",
    index: "04",
    title: "CARDIO & ENDURANCE",
    shortLabel: "Cardio & Endurance",
    tier: "secondary",
    summary: "Heart-rate guided aerobic capacity and threshold running sessions.",
    image: {
      src: "/images/pexels-mralpha-13211514.webp",
      alt: "Athletes running on commercial cardio treadmills",
      objectPosition: "58% 25%",
    },
  },
  {
    id: "weight-management",
    index: "05",
    title: "WEIGHT MANAGEMENT",
    shortLabel: "Weight Management",
    tier: "secondary",
    summary:
      "Resistance-first body recomposition paired with sustainable conditioning.",
    image: {
      src: "/images/farkas-mario-YwK5YfOkqww-unsplash.webp",
      alt: "Athlete holding a loaded Olympic barbell across shoulders in a dark training bay",
      objectPosition: "50% 30%",
    },
  },
  {
    id: "group-training",
    index: "06",
    title: "GROUP TRAINING",
    shortLabel: "Group Training",
    tier: "secondary",
    summary:
      "Small capped cohorts uniting collective pace with attentive coaching.",
    image: {
      src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.webp",
      alt: "Small group of athletes preparing together inside a studio",
      objectPosition: "50% 45%",
    },
  },
];
