"use server";

// Public form submissions. Each one is validated here, then written with the service-role client, so the tables don't need
// to accept inserts from the public (anon) key.

import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendBookingConfirmation } from "@/lib/whatsapp";
import { BOOKING_AUDIENCE_SIZES, BOOKING_EVENT_TYPES } from "@/lib/booking";
import { COUNTRIES } from "@/lib/countries";
import { dbShowToShow, getShowBySlug, type DbShow } from "@/lib/shows";

export type FormResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "We couldn't save your details. Please try again.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function dialCodeFor(country: string): string | undefined {
  return COUNTRIES.find((c) => c.name === country)?.dialCode;
}

function validPhone(phone: string): boolean {
  return (
    /^\+?[0-9 ()-]{6,20}$/.test(phone) && phone.replace(/\D/g, "").length >= 6
  );
}

export async function submitShowSignUp(input: {
  slug: string;
  fullName: string;
  email: string;
  phoneCountry: string;
  phone: string;
}): Promise<FormResult> {
  const slug = clean(input.slug, 200);
  const fullName = clean(input.fullName, 120);
  const email = clean(input.email, 254);
  const phone = clean(input.phone, 20);
  const dialCode = dialCodeFor(clean(input.phoneCountry, 80));

  if (
    fullName.length < 2 ||
    !EMAIL_RE.test(email) ||
    !dialCode ||
    !validPhone(phone)
  ) {
    return { ok: false, error: "Please check your details and try again." };
  }

  try {
    const db = supabaseAdmin();

    // Resolve the show on the server so the saved show details can't be
    // tampered with by the client.
    let show = getShowBySlug(slug);

    if (!show) {
      const { data } = await db.from("shows").select("*").eq("published", true);

      show = ((data ?? []) as DbShow[])
        .map(dbShowToShow)
        .find((s) => s.slug === slug);
    }
    if (!show) return { ok: false, error: "This show is no longer available." };

    const { error } = await db.from("waiting_list_entries").insert({
      show_slug: show.slug,
      // Many shows share a title ("The Hilarious Tour"), so record which one.
      show_title: `${show.title} — ${show.city.trim()}, ${show.country} · ${show.dateLabel}`,
      username: fullName,
      email,
      phone: `${dialCode} ${phone}`,
    });

    if (error) console.error("[show sign-up] insert failed:", error.message);

    return error ? { ok: false, error: GENERIC_ERROR } : { ok: true };
  } catch (err) {
    console.error("[show sign-up]", err instanceof Error ? err.message : err);

    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function submitCityRequest(input: {
  name: string;
  email: string;
  country: string;
  phone: string;
  city: string;
}): Promise<FormResult> {
  const name = clean(input.name, 120);
  const email = clean(input.email, 254);
  const country = clean(input.country, 80);
  const phone = clean(input.phone, 20);
  const city = clean(input.city, 100);
  const dialCode = dialCodeFor(country);

  if (
    name.length < 2 ||
    !EMAIL_RE.test(email) ||
    !dialCode ||
    !validPhone(phone) ||
    city.length < 2
  ) {
    return { ok: false, error: "Please check your details and try again." };
  }

  try {
    const { error } = await supabaseAdmin()
      .from("show_requests")
      .insert({ name, email, country, city, phone: `${dialCode} ${phone}` });

    if (error) console.error("[city request] insert failed:", error.message);

    return error ? { ok: false, error: GENERIC_ERROR } : { ok: true };
  } catch (err) {
    console.error("[city request]", err instanceof Error ? err.message : err);

    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function submitBookingRequest(input: {
  name: string;
  organisation: string;
  email: string;
  phoneCountry: string;
  phone: string;
  eventType: string;
  date: string;
  location: string;
  audience: string;
  details: string;
}): Promise<
  { ok: true; whatsappSent: boolean } | { ok: false; error: string }
> {
  const name = clean(input.name, 120);
  const organisation = clean(input.organisation, 160);
  const email = clean(input.email, 254);
  const phone = clean(input.phone, 20);
  const dialCode = dialCodeFor(clean(input.phoneCountry, 80));
  const eventType = clean(input.eventType, 60);
  const date = clean(input.date, 10);
  const location = clean(input.location, 160);
  const audience = clean(input.audience, 40);
  const details = clean(input.details, 2000);

  if (
    name.length < 2 ||
    (email && !EMAIL_RE.test(email)) ||
    !dialCode ||
    !validPhone(phone) ||
    !BOOKING_EVENT_TYPES.includes(eventType) ||
    (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) ||
    location.length < 2 ||
    (audience && !BOOKING_AUDIENCE_SIZES.includes(audience))
  ) {
    return { ok: false, error: "Please check your details and try again." };
  }

  // A local number typed with its leading 0 (e.g. 0772…) drops the 0.
  const fullPhone = `${dialCode}${phone.replace(/\D/g, "").replace(/^0+/, "")}`;

  try {
    const db = supabaseAdmin();
    const { data, error } = await db
      .from("booking_requests")
      .insert({
        name,
        organisation,
        email,
        phone: fullPhone,
        event_type: eventType,
        event_date: date || null,
        location,
        audience,
        details,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[booking] insert failed:", error.message);

      return { ok: false, error: GENERIC_ERROR };
    }

    const dateLabel = date
      ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : "a date to be confirmed";
    const whatsapp = await sendBookingConfirmation(fullPhone, {
      name: name.split(/\s+/)[0],
      eventType: eventType.toLowerCase(),
      date: dateLabel,
    });

    if (whatsapp.startsWith("failed")) {
      console.error("[booking] WhatsApp confirmation", whatsapp);
    }
    await db
      .from("booking_requests")
      .update({ whatsapp_status: whatsapp })
      .eq("id", data.id);

    return { ok: true, whatsappSent: whatsapp === "sent" };
  } catch (err) {
    console.error("[booking]", err instanceof Error ? err.message : err);

    return { ok: false, error: GENERIC_ERROR };
  }
}
