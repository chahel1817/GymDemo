export interface TrainerProfile {
  id: string;
  name: string;
  role: string;
  specialisation: string;
  bio: string;
  focusAreas: string[];
  isSampleProfile: boolean;
  image: {
    src: string;
    alt: string;
    objectPosition: string;
  };
}

export const trainersMeta = {
  eyebrow: "03 // COACHING TEAM",
  heading: "GUIDED BY DISCIPLINED COACHES.",
  demoBadge: "SAMPLE DEMO ROSTER — REPLACE WITH YOUR REAL TRAINERS",
  subheading:
    "Illustrative coach profiles showing how your real training team, specialties, and coaching focus appear once onboarded.",
};

export const trainersData: TrainerProfile[] = [
  {
    id: "aarav-mehta",
    name: "Aarav Mehta",
    role: "Lead Strength Coach (Sample Profile)",
    specialisation: "Barbell Strength & Hypertrophy",
    bio: "Fictional demo profile illustrating your head strength coach. Focuses on foundational compound lifts, structured hypertrophy blocks, and building confident movement mechanics for beginners and lifters alike.",
    focusAreas: ["Compound Lifts", "Hypertrophy", "Movement Screening"],
    isSampleProfile: true,
    image: {
      src: "/images/pexels-rdne-8612491.jpg",
      alt: "Sample portrait of strength coach standing with crossed arms on the gym floor",
      objectPosition: "50% 18%",
    },
  },
  {
    id: "vikram-desai",
    name: "Vikram Desai",
    role: "Performance & Technique Coach (Sample Profile)",
    specialisation: "Functional Strength & Mobility",
    bio: "Fictional demo profile illustrating a technical movement specialist. Emphasises joint control, barbell efficiency, and progressive conditioning tailored to working professionals.",
    focusAreas: ["Functional Turf", "Mobility Prep", "1-on-1 Coaching"],
    isSampleProfile: true,
    image: {
      src: "/images/pexels-silverkblack-39219663.jpg",
      alt: "Sample portrait of performance coach in front of steel power racks",
      objectPosition: "50% 16%",
    },
  },
  {
    id: "kabir-shah",
    name: "Kabir Shah",
    role: "Conditioning Specialist (Sample Profile)",
    specialisation: "Metabolic Conditioning & Endurance",
    bio: "Fictional demo profile illustrating an athletic conditioning coach. Designs high-output interval sessions, combat-inspired cardio circuits, and sustainable fat-loss training blocks.",
    focusAreas: ["Engine Work", "Group Conditioning", "Athletic Stamina"],
    isSampleProfile: true,
    image: {
      src: "/images/pexels-thisisengineering-3912516.jpg",
      alt: "Sample portrait of conditioning coach leaning on boxing ring ropes inside a studio",
      objectPosition: "50% 18%",
    },
  },
];

