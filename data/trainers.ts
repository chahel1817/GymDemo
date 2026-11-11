export interface TrainerProfile {
  id: string;
  name: string;
  specialisation: string;
  summary: string;
  isSampleProfile: boolean;
  image: {
    src: string;
    alt: string;
    objectPosition: string;
  };
}

export const trainersMeta = {
  eyebrow: "04 // COACHING TEAM",
  heading: "LED BY COACHES.",
  demoBadge: "Sample Demo Profiles",
};

export const trainersData: TrainerProfile[] = [
  {
    id: "aarav-mehta",
    name: "Aarav Mehta",
    specialisation: "Barbell Strength & Hypertrophy",
    summary:
      "Focuses on foundational compound lifts and progressive hypertrophy blocks for lifters at every stage.",
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
    specialisation: "Movement & Biomechanics",
    summary:
      "Coaches joint mobility, clean barbell technique, and sustainable strength for busy schedules.",
    isSampleProfile: true,
    image: {
      src: "/images/pexels-silverkblack-39219663.jpg",
      alt: "Sample portrait of movement coach in front of steel power racks",
      objectPosition: "50% 16%",
    },
  },
  {
    id: "kabir-shah",
    name: "Kabir Shah",
    specialisation: "Metabolic Conditioning",
    summary:
      "Designs high-output interval engines, turf circuits, and athletic stamina progressions.",
    isSampleProfile: true,
    image: {
      src: "/images/pexels-thisisengineering-3912516.jpg",
      alt: "Sample portrait of conditioning coach standing by boxing ring ropes",
      objectPosition: "50% 18%",
    },
  },
];
