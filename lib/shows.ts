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
    id: 21,
    title: "Dr. Hilary Okello presents Night of Laughters",
    dateLabel: "July 4, 2026",
    date: "2026-07-04T19:30:00",
    time: "7:30 PM & 9:30 PM",
    location: "Numax Cinemas, Victoria Mall",
    city: "Saturday | Entebbe",
    country: "Uganda",
    ticketPrice:
      "Early Bird: 30K | VIP Early Bird: 50K | Gate: 50K | Gate VIP: 60K",
    image: "/tour/website_poster.png",
    link: "https://kayetickets.com/events/a-night-of-laughter-ft-dr-hilary/checkout",
    description:
      "Dr. Hilary Okello brings the Night of Laughters to Numax Cinemas at Victoria Mall, Entebbe! Featuring Cotilda, Dough Mutai (Kenya), and other comedians. Two shows on the night — 7:30 PM and 9:30 PM. Select your preferred time when booking tickets.",
    featured: true,
    badge: "Tickets Available",
    contactNumber: "+256784704143",
  },
  {
    id: 22,
    title: "Dr. Hilary Okello Live in Zimbabwe",
    dateLabel: "12th July, 2026",
    date: "2026-07-12T19:30:00",
    time: "7:30 PM",
    location: "Harare, Zimbabwe",
    city: "Harare",
    country: "Zimbabwe",
    ticketPrice: "",
    image: "/tour_countries.jpg",

    link: "#",
    description:
      "Join the waiting list to be the first to hear about tickets, show updates, and venue confirmation for Dr. Hilary Okello’s live show in Harare, Zimbabwe.",
    featured: false,
    badge: "Join Waiting List",
    contactNumber: "+263000000000",
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
