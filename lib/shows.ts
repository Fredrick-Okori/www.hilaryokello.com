// Shared show data — single source of truth used by the listing and detail pages.

export interface Show {
  id: number;
  slug: string;
  title: string;
  dateLabel: string;
  date: string; // ISO string
  time: string;
  location: string;
  country: string;
  city: string;
  ticketPrice: string;
  image: string;
  link: string;
  description: string;
  featured: boolean;
  badge?: string;
  soldOutPercentage?: number;
  soldOutLabel?: string;
  contactNumber?: string;
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeSlug(city: string, country: string, id: number): string {
  return `${toSlug(city)}-${toSlug(country)}-${id}`;
}

const RAW: Omit<Show, "slug">[] = [
  {
    id: 11,
    title: "Entebbe | Jokes From Far Away",
    dateLabel: "Apr 25, 2026",
    date: "2026-04-25T19:00:00",
    time: "7:30 PM",
    location: "Numax Cinemas",
    city: "Saturday | Entebbe",
    country: "Uganda",
    ticketPrice: "Gate: 50K",
    image: "/tour/Dr-Hilary-Okello-Entebbe_converted.avif",
    link: "#",
    description:
      "Before your next flight, there's comedy to catch. Jokes From Far Away lands at Numax Cinemas in Entebbe for one unmissable night of laughter. Dr. Hilary Okello performs right by the lake — a world-class show in the gateway city of Uganda.",
    featured: false,
    badge: "Open for 9:30 PM show only",
    soldOutPercentage: 90,
    soldOutLabel: "Open for 9:30 PM show only",
    contactNumber: "+256784704143"
  },
  {
    id: 12,
    title: "Cape Town | Jokes From Far Away",
    dateLabel: "May 30, 2026",
    date: "2026-05-30T19:00:00",
    time: "7:30 PM",
    location: "Homecoming Center",
    city: "Saturday | Cape Town",
    country: "South Africa",
    ticketPrice: "From R250",
    image: "/tour/capetown_south_africa.avif",
    link: "https://www.quicket.co.za/events/355018-dr-hilary-okello-jokes-from-far-away-cape-town/#/",
    description:
      "Jokes From Far Away lands in the Mother City! Dr. Hilary Okello brings his continent-spanning comedy tour to Cape Town — sharp observations, bold African storytelling, and punchlines that travel as far as Table Mountain's shadow. An unmissable night of laughter at the Homecoming Centre.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 13,
    title: "Mbabane | Eswatini",
    dateLabel: "May 28, 2026",
    date: "2026-05-28T19:00:00",
    time: "7:30 PM",
    location: "Mbabane Theatre Club",
    city: "Thursday | Mbabane",
    country: "Eswatini",
    ticketPrice: "Early Bird: E100 | Standard: E200",
    image: "/tour/mbabane_eswatini.avif",
    link: "https://m.mojaticket.com/#/event/19090",
    description:
      "The Kingdom of Eswatini, welcome! Jokes From Far Away makes a royal stop in Mbabane as Dr. Hilary Okello brings fresh, cross-continental comedy to the Mbabane Theatre Club. Expect hilarious stories from the road, sharp cultural observations, and a night of laughter that's fit for a kingdom.",
    featured: false,
    contactNumber: "+27637677212",
  },
  {
    id: 14,
    title: "Johannesburg | Jokes From Far Away",
    dateLabel: "May 29, 2026",
    date: "2026-05-29T19:00:00",
    time: "7:30 PM",
    location: "Victory Theatre",
    city: "Friday | Johannesburg",
    country: "South Africa",
    ticketPrice: "Early Bird: R250 | Standard: R300 | VIP: R600",
    image: "/tour/johannesburg.avif",
    link: "https://www.quicket.co.za/events/368566-dr-hilary-okello-jokes-from-far-away-johannesburg/",
    description:
      "Johannesburg, the City of Gold — get ready for a night of pure comedy gold! Dr. Hilary Okello brings Jokes From Far Away to Joburg, performing at the Victory Theatre. From Kampala to Joburg, the jokes travel far and hit hard. This is African comedy at its sharpest — don't miss it.",
    featured: false,
    contactNumber: "+27637677212",
  },
];

export const SHOWS: Show[] = RAW.map((show) => ({
  ...show,
  slug: makeSlug(show.city, show.country, show.id),
}));

export function getShowBySlug(slug: string): Show | undefined {
  return SHOWS.find((s) => s.slug === slug);
}

export const DEFAULT_CONTACT = "+211922064459";
