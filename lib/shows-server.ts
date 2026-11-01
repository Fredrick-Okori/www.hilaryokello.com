// Server-side show lookups for metadata, the sitemap and structured data.
// Shows hard-coded in lib/shows.ts come first; shows added from the admin
// live in Supabase.

import { createClient } from "@supabase/supabase-js";

import { COUNTRIES } from "@/lib/countries";
import {
  type DbShow,
  type Show,
  SHOWS,
  booksViaWhatsApp,
  dbShowToShow,
  getShowBySlug,
  hasTicketLink,
  whatsAppBookingUrl,
} from "@/lib/shows";

export const SITE_URL = "https://www.hilaryokello.com";

export async function getPublishedDbShows(): Promise<Show[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return [];

  const { data } = await createClient(url, key, {
    auth: { persistSession: false },
  })
    .from("shows")
    .select("*")
    .eq("published", true);

  return ((data ?? []) as DbShow[]).map(dbShowToShow);
}

export async function findShow(slug: string): Promise<Show | undefined> {
  return (
    getShowBySlug(slug) ??
    (await getPublishedDbShows()).find((s) => s.slug === slug)
  );
}

export function isStaticShow(slug: string): boolean {
  return SHOWS.some((s) => s.slug === slug);
}

// "2026-08-09T19:30:00" stays as is; a date-only value ("2026-11-14") gets
// the show's "7:30 PM"-style time. No offset: Google then uses the venue's
// local time zone.
function startDate(show: Show): string {
  if (show.date.includes("T")) return show.date;
  const m = show.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

  if (!m) return show.date;
  let hour = Number(m[1]) % 12;

  if (m[3].toUpperCase() === "PM") hour += 12;

  return `${show.date}T${String(hour).padStart(2, "0")}:${m[2]}:00`;
}

export function showEventJsonLd(show: Show, pageUrl: string) {
  const iso2 = COUNTRIES.find(
    (c) => c.name.toLowerCase() === show.country.toLowerCase(),
  )?.iso2;
  const ticketUrl = hasTicketLink(show)
    ? show.link
    : booksViaWhatsApp(show)
      ? whatsAppBookingUrl(show)
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "ComedyEvent",
    name: show.title,
    description: show.description || undefined,
    url: pageUrl,
    startDate: startDate(show),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: show.image
      ? [show.image.startsWith("http") ? show.image : SITE_URL + show.image]
      : undefined,
    location: {
      "@type": "Place",
      name: show.location || show.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: show.city,
        addressCountry: iso2 ?? show.country,
      },
    },
    performer: { "@type": "Person", name: "Dr. Hilary Okello" },
    organizer: { "@type": "Person", name: "Dr. Hilary Okello", url: SITE_URL },
    // Shows without a ticket link aren't on sale yet, so no Offer.
    ...(ticketUrl && {
      offers: {
        "@type": "Offer",
        url: ticketUrl,
        availability: show.soldOut
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      },
    }),
  };
}

// Escapes "<" so show text can't close the <script> tag early.
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
