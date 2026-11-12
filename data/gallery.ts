export interface GalleryItem {
  id: string;
  title: string;
  zone: string;
  caption: string;
  src: string;
  alt: string;
  objectPosition: string;
}

export const galleryMeta = {
  eyebrow: "05 // FACILITIES",
  heading: "INSIDE THE CLUB.",
};

export const galleryData: GalleryItem[] = [
  {
    id: "dumbbell-bay",
    title: "Free Weights Bay",
    zone: "ZONE 01",
    caption: "Full-run urethane dumbbell racks beside heavy adjustable benches.",
    src: "/images/palak-pitroda-8MCy6GeU490-unsplash.webp",
    alt: "Tiered rack of black dumbbells beside free-weight benches",
    objectPosition: "50% 45%",
  },
  {
    id: "cardio-sprint-deck",
    title: "Sprint & Cardio Deck",
    zone: "ZONE 02",
    caption: "Curved non-motorised runners and daylight treadmills.",
    src: "/images/palak-pitroda-EC4mdytpvmk-unsplash.webp",
    alt: "Curved sprint treadmill and modern endurance floor under geometric LED lights",
    objectPosition: "50% 45%",
  },
  {
    id: "treadmill-line",
    title: "Endurance Row",
    zone: "ZONE 03",
    caption: "Commercial treadmills and incline runners for Zone 2 and interval work.",
    src: "/images/pexels-mralpha-13211514.webp",
    alt: "Two athletes jogging on commercial treadmills",
    objectPosition: "55% 25%",
  },
  {
    id: "barbell-strength-bay",
    title: "Olympic Barbell Zone",
    zone: "ZONE 04",
    caption: "Dedicated lifting racks and calibrated plates for compound strength blocks.",
    src: "/images/farkas-mario-YwK5YfOkqww-unsplash.webp",
    alt: "Athlete holding a heavy Olympic barbell across shoulders inside a dark concrete lifting bay",
    objectPosition: "50% 35%",
  },
];
