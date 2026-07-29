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
    id: 26,
    title: "WESTLANDS: DR HILARY OKELLO LIVE - Aug 6th",
    dateLabel: "6th August, 2026",
    date: "2026-08-06T19:30:00",
    time: "7:30 PM",
    location: "Sauve Kitchen & Social Club",
    city: "Nairobi",
    country: "Kenya",
    ticketPrice: "",
    image: "/tour/sauve.jpg",
    link: "https://standupcollective.co.ke/buytickets?event=WESTLANDS%3A+DR+HILARY+OKELLO+LIVE+-+Aug+6th",
    description:
      "Dr. Hilary Okello performs live at Sauve Kitchen & Social Club, Westlands, on 6th August 2026. Grab your tickets early and come ready to laugh.",
    featured: false,
    badge: "Tickets Available",
  },
  {
    id: 24,
    title: "LAVINGTON: DR HILARY OKELLO LIVE - Aug 7th",
    dateLabel: "7th August, 2026",
    date: "2026-08-07T19:30:00",
    time: "7:30 PM - 9:30 PM",
    location: "Nairobi Laugh Bar",
    city: "Nairobi",
    country: "Kenya",
    ticketPrice: "",
    image: "/shows/IMG_0924_converted.avif",
    link: "https://standupcollective.co.ke/buytickets?event=LAVINGTON%3a%20DR%20HILARY%20OKELLO%20LIVE%20-%20Aug%207th",
    description:
      "Dr. Hilary Okello performs live at Nairobi Laugh Bar on 7th August 2026. Grab your tickets early and come ready to laugh.",
    featured: false,
    badge: "Tickets Available",
  },
  {
    id: 25,
    title: "WESTLANDS: DR HILARY OKELLO LIVE - Aug 8th",
    dateLabel: "8th August, 2026",
    date: "2026-08-08T19:30:00",
    time: "7:30 PM - 9:30 PM",
    location: "Sauve Kitchen & Social Club",
    city: "Nairobi",
    country: "Kenya",
    ticketPrice: "",
    image: "/shows/IMG_0925_converted.avif",
    link: "https://standupcollective.co.ke/buytickets?event=WESTLANDS%3a%20DR%20HILARY%20OKELLO%20LIVE%20-%20Aug%208th",
    description:
      "Dr. Hilary Okello performs live at Sauve Kitchen & Social Club, Westlands, on 8th August 2026. Grab your tickets early and come ready to laugh.",
    featured: false,
    badge: "Tickets Available",
  },

  {
    id: 22,
    title: "Dr. Hilary Okello Live in Zimbabwe",

    dateLabel: "12th July, 2026",
    date: "2026-07-12T19:30:00",
    time: "7:00 PM",
    location: "Harare, Zimbabwe",
    city: "Harare",
    country: "Zimbabwe",
    ticketPrice: "",
    image: "/tour/harare_zimbabwe.jpg",
    link: "https://hypenation.co.zw/tickets/unbothered-special-edition-dc--dr-hilary-okello--12-07-2026/019e97da-163a-70ba-aa80-39665911b779/01JJVDSR6AH5DRD109ZZKEVN4P",
    description:
      "Dr. Hilary Okello brings his Unbothered Special Edition show to Harare, Zimbabwe on 12th July 2026. Grab your tickets now and come ready to laugh!",
    featured: false,
    badge: "Showing now",
    contactNumber: "+263788940077",
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
