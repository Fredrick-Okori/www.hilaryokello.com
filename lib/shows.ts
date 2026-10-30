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
  soldOut?: boolean;
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
    id: 27,
    title: "WESTLANDS: DR HILARY OKELLO LIVE - Aug 9th",
    dateLabel: "9th August, 2026",
    date: "2026-08-09T19:30:00",
    time: "7:30 PM",
    location: "Sauve Kitchen & Social Club",
    city: "Nairobi",
    country: "Kenya",
    ticketPrice: "",
    image: "/tour/sauve.jpg",
    link: "https://standupcollective.co.ke/buytickets?event=DR.%20HILARY%20LIVE%20SUNDAY%20SHOW%20",
    description:
      "Dr. Hilary Okello performs live at Sauve Kitchen & Social Club, Westlands, on 9th August 2026. Grab your tickets early and come ready to laugh.",
    featured: true,
    badge: "Newly added show",
  },
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
    badge: "Tickets selling fast",
  },
  {
    id: 24,
    title: "LAVINGTON: DR HILARY OKELLO LIVE - Aug 7th",
    dateLabel: "7th August, 2026",
    date: "2026-08-07T19:30:00",
    time: "7:30 PM",
    location: "Nairobi Laugh Bar",
    city: "Nairobi",
    country: "Kenya",
    ticketPrice: "",
    image: "/shows/IMG_0924_converted.avif",
    link: "https://standupcollective.co.ke/buytickets?event=LAVINGTON%3a%20DR%20HILARY%20OKELLO%20LIVE%20-%20Aug%207th",
    description:
      "Dr. Hilary Okello performs live at Nairobi Laugh Bar on 7th August 2026. Grab your tickets early and come ready to laugh.",
    featured: false,
    badge: "Only 3 tickets available",
  },
  {
    id: 25,
    title: "WESTLANDS: DR HILARY OKELLO LIVE - Aug 8th",
    dateLabel: "8th August, 2026",
    date: "2026-08-08T19:30:00",
    time: "7:30 PM",
    location: "Sauve Kitchen & Social Club",
    city: "Nairobi",
    country: "Kenya",
    ticketPrice: "",
    image: "/shows/IMG_0925_converted.avif",
    link: "https://standupcollective.co.ke/buytickets?event=WESTLANDS%3a%20DR%20HILARY%20OKELLO%20LIVE%20-%20Aug%208th",
    description:
      "Dr. Hilary Okello performs live at Sauve Kitchen & Social Club, Westlands, on 8th August 2026. Grab your tickets early and come ready to laugh.",
    featured: false,
    badge: "Sold Out",
    soldOut: true,
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

// Row shape of the Supabase `shows` table (managed from the admin).
export type DbShow = {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  location: string;
  country: string;
  ticket_price: string;
  ticket_url: string | null;
  image: string;
  description: string;
  featured: boolean;
  badge: string | null;
  contact_number: string | null;
  published: boolean;
  published_at: string | null;
};

export function dbShowToShow(s: DbShow): Show {
  return {
    id: parseInt(s.id.replace(/-/g, "").slice(0, 8), 16),
    slug: `${toSlug(s.city)}-${toSlug(s.country)}-${s.id.slice(0, 8)}`,
    title: s.title,
    dateLabel: new Date(s.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    date: s.date,
    time: s.time,
    location: s.location,
    country: s.country,
    city: s.city,
    ticketPrice: s.ticket_price,
    image: s.image || "/tour/website_poster.png",
    link: s.ticket_url || "#",
    description: s.description,
    featured: s.featured,
    badge: s.badge ?? undefined,
    contactNumber: s.contact_number ?? undefined,
  };
}

// Stored as the ticket link for shows the organiser sells over WhatsApp
// rather than a ticketing platform.
export const WHATSAPP_BOOKING = "whatsapp";

export function booksViaWhatsApp(show: Show): boolean {
  return show.link === WHATSAPP_BOOKING;
}

export function whatsAppBookingUrl(show: Show): string {
  const contact = show.contactNumber ?? DEFAULT_CONTACT;

  return `https://wa.me/${contact.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello, I'm interested in tickets for ${show.title} in ${show.city}, ${show.country}`,
  )}`;
}

// A real ticketing link. Shows with neither this nor WhatsApp booking are
// confirmed but tickets aren't out yet: fans sign up instead.
export function hasTicketLink(show: Show): boolean {
  return show.link !== "#" && !booksViaWhatsApp(show);
}

export function signUpPath(slug: string): string {
  return `/shows/${slug}/sign-up`;
}

export const DEFAULT_CONTACT = "+211922064459";
