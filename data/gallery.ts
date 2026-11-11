export interface GalleryItem {
  id: string;
  title: string;
  zone: string;
  caption: string;
  src: string;
  alt: string;
  objectPosition: string;
  layoutSpan: "hero" | "wide" | "tall" | "standard";
}

export const galleryMeta = {
  eyebrow: "04 // FACILITIES",
  heading: "BUILT FOR FOCUS. ZONED FOR PERFORMANCE.",
  subheading:
    "Explore the training floor zones—click any photograph to inspect in full detail.",
};

export const galleryData: GalleryItem[] = [
  {
    id: "main-strength-floor",
    title: "Signature Strength & Machine Floor",
    zone: "ZONE 01 // MAIN IRON",
    caption:
      "Architectural dark-lit training floor lined with plate-loaded strength stations and dedicated lifting lanes.",
    src: "/images/salman-sidheek-iW79tgCbiMs-unsplash.jpg",
    alt: "Dark architectural gym interior with linear overhead lighting and black strength machines",
    objectPosition: "50% 50%",
    layoutSpan: "hero",
  },
  {
    id: "dumbbell-bay",
    title: "Free Weights & Dumbbell Bay",
    zone: "ZONE 02 // FREE WEIGHTS",
    caption:
      "Full-run urethane dumbbell racks paired with heavy-duty adjustable benches for hypertrophy and accessory work.",
    src: "/images/palak-pitroda-8MCy6GeU490-unsplash.jpg",
    alt: "Row of heavy black dumbbells on a tiered gym rack beside adjustable training benches",
    objectPosition: "50% 45%",
    layoutSpan: "wide",
  },
  {
    id: "cardio-sprint-deck",
    title: "Cardio & Curved Sprint Deck",
    zone: "ZONE 03 // ENGINE ZONE",
    caption:
      "Non-motorised sprint runners, commercial treadmills, and upright ergometers overlooking natural daylight.",
    src: "/images/palak-pitroda-EC4mdytpvmk-unsplash.jpg",
    alt: "Curved sprint treadmill and modern cardio machines under geometric LED ceiling lights",
    objectPosition: "50% 45%",
    layoutSpan: "standard",
  },
  {
    id: "turf-conditioning",
    title: "Turf & Conditioning Lane",
    zone: "ZONE 04 // CONDITIONING",
    caption:
      "Open high-durability turf space equipped for battle ropes, sled pushes, and anaerobic interval finishers.",
    src: "/images/scott-webb-U5kQvbQWoG0-unsplash.jpg",
    alt: "Athlete performing heavy battle rope waves against a concrete wall",
    objectPosition: "30% 35%",
    layoutSpan: "standard",
  },
  {
    id: "lifting-platforms",
    title: "Barbell & Olympic Platforms",
    zone: "ZONE 05 // PLATFORMS",
    caption:
      "Shock-absorbent lifting flooring with calibrated competition bumper plates for deadlifts, cleans, and squats.",
    src: "/images/pexels-grzegorz-2777274-5209197.jpg",
    alt: "Lifter gripping a barbell with red bumper plates on a gym platform",
    objectPosition: "50% 35%",
    layoutSpan: "standard",
  },
  {
    id: "group-studio",
    title: "Group Performance Studio",
    zone: "ZONE 06 // STUDIO BAY",
    caption:
      "Spacious daylight-washed training bay structured for coach-led group conditioning and mobility sessions.",
    src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.jpg",
    alt: "Athletes gathered in silhouette inside a windowed functional training hall",
    objectPosition: "50% 45%",
    layoutSpan: "wide",
  },
];

