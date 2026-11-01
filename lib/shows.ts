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

// Shows are managed from the admin (Supabase). Add a show here only if it
// can't go through the admin; remove it once it has taken place.
const RAW: Omit<Show, "slug">[] = [];

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
