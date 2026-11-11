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
    id: "main-strength-floor",
    title: "Strength & Machine Floor",
    zone: "ZONE 01",
    caption: "Plate-loaded strength stations and dark architectural iron lanes.",
    src: "/images/salman-sidheek-iW79tgCbiMs-unsplash.jpg",
    alt: "Dark architectural gym floor with linear overhead ceiling light and strength machines",
    objectPosition: "50% 50%",
  },
  {
    id: "dumbbell-bay",
    title: "Free Weights Bay",
    zone: "ZONE 02",
    caption: "Full-run urethane dumbbell racks beside heavy adjustable benches.",
    src: "/images/palak-pitroda-8MCy6GeU490-unsplash.jpg",
    alt: "Tiered rack of black dumbbells beside free-weight benches",
    objectPosition: "50% 45%",
  },
  {
    id: "cardio-sprint-deck",
    title: "Sprint & Cardio Deck",
    zone: "ZONE 03",
    caption: "Curved non-motorised runners and daylight treadmills.",
    src: "/images/palak-pitroda-EC4mdytpvmk-unsplash.jpg",
    alt: "Curved sprint treadmill and modern endurance floor under geometric LED lights",
    objectPosition: "50% 45%",
  },
  {
    id: "conditioning-lane",
    title: "Turf & Ropes Lane",
    zone: "ZONE 04",
    caption: "Dedicated anaerobic conditioning floor for ropes and sleds.",
    src: "/images/scott-webb-U5kQvbQWoG0-unsplash.jpg",
    alt: "Athlete training with battle ropes against a concrete gym wall",
    objectPosition: "30% 35%",
  },
  {
    id: "treadmill-line",
    title: "Endurance Row",
    zone: "ZONE 05",
    caption: "Commercial treadmills and incline runners for Zone 2 and interval work.",
    src: "/images/pexels-mralpha-13211514.jpg",
    alt: "Two athletes jogging on commercial treadmills",
    objectPosition: "55% 25%",
  },
  {
    id: "group-hall",
    title: "Group Studio Hall",
    zone: "ZONE 06",
    caption: "Daylight-washed open training bay for coach-led cohorts.",
    src: "/images/marvin-meyer-VB5i6ZmXUoI-unsplash.jpg",
    alt: "Athletes gathered in silhouette inside a windowed training hall",
    objectPosition: "50% 45%",
  },
];
