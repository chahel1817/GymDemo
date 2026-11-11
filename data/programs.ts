export type ProgramCategory = "All" | "Strength" | "Conditioning" | "Coaching";

export interface TrainingProgram {
  id: string;
  index: string;
  title: string;
  category: Exclude<ProgramCategory, "All">;
  featured?: boolean;
  duration: string;
  focus: string;
  description: string;
  highlights: string[];
  image: {
    src: string;
    alt: string;
    objectPosition: string;
  };
}

export const programCategories: ProgramCategory[] = [
  "All",
  "Strength",
  "Conditioning",
  "Coaching",
];

export const programsData: TrainingProgram[] = [
  {
    id: "strength-conditioning",
    index: "01",
    title: "Strength & Conditioning",
    category: "Strength",
    featured: true,
    duration: "60 MIN SESSIONS",
    focus: "Compound Lifts & Structural Power",
    description:
      "Foundational barbell mechanics paired with progressive overload and athletic conditioning to build resilient muscle, joint stability, and raw force output.",
    highlights: [
      "Squat, hinge, press & pull periodisation",
      "Calibrated bumper plates & competition racks",
      "Objective strength benchmarks across cycles",
    ],
    image: {
      src: "/images/pexels-grzegorz-2777274-5209197.jpg",
      alt: "Athlete preparing to deadlift a barbell loaded with red competition bumper plates",
      objectPosition: "50% 35%",
    },
  },
  {
    id: "personal-training",
    index: "02",
    title: "Personal Training",
    category: "Coaching",
    featured: true,
    duration: "1-ON-1 COACHING",
    focus: "Bespoke Programming & Technique",
    description:
      "Dedicated coaching engineered around your movement assessment, training history, work schedule, and performance targets with live cueing every rep.",
    highlights: [
      "Initial posture & mobility baseline screen",
      "Customised weekly training split & progression",
      "Direct accountability & form refinement",
    ],
    image: {
      src: "/images/pexels-silverkblack-39219675.jpg",
      alt: "Personal trainer observing and coaching a member during a barbell deadlift setup",
      objectPosition: "50% 25%",
    },
  },
  {
    id: "functional-fitness",
    index: "03",
    title: "Functional Fitness",
    category: "Conditioning",
    duration: "50 MIN BLOCKS",
    focus: "Battle Ropes, Turf & Multi-Planar Power",
    description:
      "High-output athletic circuits combining sled work, battle ropes, kettlebells, and core stability so your strength translates seamlessly outside the gym.",
    highlights: [
      "Rotational core & explosive hip power",
      "Turf conditioning & battle rope intervals",
      "Scalable intensity for all fitness levels",
    ],
    image: {
      src: "/images/scott-webb-U5kQvbQWoG0-unsplash.jpg",
      alt: "Female athlete driving heavy battle ropes against a concrete gym wall",
      objectPosition: "28% 30%",
    },
  },
  {
    id: "cardio-endurance",
    index: "04",
    title: "Cardio & Endurance",
    category: "Conditioning",
    duration: "45 MIN ENGINE",
    focus: "Aerobic Capacity & VO2 Conditioning",
    description:
      "Structured Zone 2 aerobic base building and anaerobic threshold intervals designed to improve stamina, recovery speed, and cardiovascular longevity.",
    highlights: [
      "Commercial treadmills & low-impact ergs",
      "Heart-rate guided aerobic & sprint intervals",
      "Improved work capacity between heavy sets",
    ],
    image: {
      src: "/images/pexels-mralpha-13211514.jpg",
      alt: "Two athletes running on commercial treadmills inside a conditioning studio",
      objectPosition: "58% 25%",
    },
  },
  {
    id: "weight-management",
    index: "05",
    title: "Weight Management",
    category: "Coaching",
    duration: "STRUCTURED PHASES",
    focus: "Body Recomposition & Sustainable Habits",
    description:
      "A disciplined blend of resistance training and metabolic conditioning focused on preserving lean muscle while steadily reducing excess body fat.",
    highlights: [
      "Resistance-first fat loss methodology",
      "Metabolic conditioning on curved runners",
      "Sustainable lifestyle & consistency check-ins",
    ],
    image: {
      src: "/images/palak-pitroda-EC4mdytpvmk-unsplash.jpg",
      alt: "Curved sprint treadmill and modern endurance deck with geometric ceiling lighting",
      objectPosition: "50% 45%",
    },
  },
  {
    id: "group-training",
    index: "06",
    title: "Group Training",
    category: "Conditioning",
    duration: "SMALL BATCHES",
    focus: "Coach-Led Energy & Collective Pace",
    description:
      "Focused small-group sessions that combine team camaraderie with structured programming—giving you shared momentum without sacrificing coaching standards.",
    highlights: [
      "Capped cohort sizes for attentive coaching",
      "Synchronised warm-ups, strength & finishers",
      "Morning and evening batch options",
    ],
    image: {
      src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.jpg",
      alt: "Small group of athletes preparing together inside a sunlit functional studio",
      objectPosition: "50% 45%",
    },
  },
];

