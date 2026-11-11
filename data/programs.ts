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
  secondaryHeading: "SPECIALISED TRACKS",
};

export const programsData: TrainingProgram[] = [
  {
    id: "strength",
    index: "01",
    title: "STRENGTH",
    shortLabel: "Strength & Conditioning",
    tier: "primary",
    summary:
      "Barbell periodisation and progressive overload engineered to build lasting force and muscle.",
    image: {
      src: "/images/pexels-grzegorz-2777274-5209197.jpg",
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
      "Battle ropes, sled turf, and anaerobic intervals built for athletic work capacity.",
    image: {
      src: "/images/scott-webb-U5kQvbQWoG0-unsplash.jpg",
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
      "1-on-1 coaching built around your movement assessment, schedule, and performance targets.",
    image: {
      src: "/images/pexels-silverkblack-39219675.jpg",
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
    summary:
      "Heart-rate guided aerobic capacity and threshold running sessions.",
    image: {
      src: "/images/pexels-mralpha-13211514.jpg",
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
      "Resistance-first body recomposition paired with sustainable metabolic work.",
    image: {
      src: "/images/palak-pitroda-EC4mdytpvmk-unsplash.jpg",
      alt: "Modern curved runner and cardio deck under geometric LED lighting",
      objectPosition: "50% 45%",
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
      src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.jpg",
      alt: "Small group of athletes preparing together inside a studio",
      objectPosition: "50% 45%",
    },
  },
];
