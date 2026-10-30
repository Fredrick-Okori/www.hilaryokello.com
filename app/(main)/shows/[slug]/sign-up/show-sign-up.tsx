"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Goldman } from "next/font/google";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  Clock,
  Hourglass,
  MapPin,
} from "lucide-react";

import SignUpForm from "./sign-up-form";

import { supabase } from "@/lib/supabase";
import {
  dbShowToShow,
  getShowBySlug,
  booksViaWhatsApp,
  hasTicketLink,
  whatsAppBookingUrl,
  type DbShow,
  type Show,
} from "@/lib/shows";

const goldman = Goldman({ weight: "700", subsets: ["latin"], display: "swap" });

type Status = "loading" | "ready" | "missing";

// Venue, city and country, skipping empty parts and anything the admin-entered
// venue already includes (e.g. "Dembesh Hotel, Juba").
function placeLabel(show: Show): string {
  const venue = show.location.trim();
  const has = (part: string) =>
    venue.toLowerCase().includes(part.trim().toLowerCase());

  return [
    venue,
    has(show.city) ? "" : show.city,
    has(show.country) ? "" : show.country,
  ]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ");
}

function DetailChip({
  icon: Icon,
  children,
  accent = false,
}: {
  icon: typeof Calendar;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
        accent
          ? "bg-yellow-500 text-white"
          : "bg-white text-ink ring-1 ring-ink/10"
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 ${accent ? "text-white" : "text-yellow-500"}`}
      />
      {children}
    </span>
  );
}

export default function ShowSignUp({
  slug,
  initialShow,
}: {
  slug: string;
  initialShow: Show | null;
}) {
  const [show, setShow] = useState<Show | null>(initialShow);
  const [status, setStatus] = useState<Status>(
    initialShow ? "ready" : "loading",
  );
  const [daysToGo, setDaysToGo] = useState<number | null>(null);

  useEffect(() => {
    if (initialShow) return;

    supabase
      .from("shows")
      .select("*")
      .eq("published", true)
      .then(
        ({ data }) => {
          const match = ((data ?? []) as DbShow[])
            .map(dbShowToShow)
            .find((s) => s.slug === slug);

          setShow(match ?? null);
          setStatus(match ? "ready" : "missing");
        },
        () => setStatus("missing"),
      );
  }, [initialShow, slug]);

  // Computed after mount so server and client render the same markup.
  useEffect(() => {
    if (!show) return;
    const days = Math.ceil((Date.parse(show.date) - Date.now()) / 86_400_000);

    setDaysToGo(days > 0 ? days : null);
  }, [show]);

  // Only hard-coded shows have a detail page; admin-added ones live on the
  // home page list.
  const backHref = getShowBySlug(slug) ? `/shows/${slug}` : "/#shows";

  return (
    <main className="relative min-h-screen overflow-hidden text-ink">
      {/* Faint brand pattern behind the header, fading into the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[url('/texture-tile.webp')] bg-[length:360px_auto] bg-repeat opacity-[0.07] [mask-image:linear-gradient(to_bottom,black,transparent)] md:bg-[length:560px_auto]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
        <Link
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink"
          href={backHref}
        >
          <ChevronLeft className="h-4 w-4" />
          {backHref === "/#shows" ? "All Shows" : "Back to Show"}
        </Link>

        {status === "loading" && (
          <div
            aria-busy="true"
            aria-label="Loading show"
            className="animate-pulse"
          >
            <div className="h-6 w-56 rounded-full bg-ink/10" />
            <div className="mt-5 h-12 w-3/4 max-w-xl rounded-xl bg-ink/10" />
            <div className="mt-6 flex gap-3">
              <div className="h-9 w-40 rounded-full bg-ink/10" />
              <div className="h-9 w-28 rounded-full bg-ink/10" />
            </div>
            <div className="mt-10 h-[420px] rounded-3xl bg-ink/10" />
          </div>
        )}

        {status === "missing" && (
          <div className="mx-auto max-w-md rounded-3xl bg-white px-6 py-14 text-center shadow-xl ring-1 ring-ink/5">
            <h1 className={`${goldman.className} text-3xl text-ink`}>
              Show not found
            </h1>
            <p className="mt-3 text-ink/60">
              This show may have been moved or removed.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-500 px-7 py-3 font-bold text-white transition-colors hover:bg-yellow-600"
              href="/#shows"
            >
              See all shows
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {status === "ready" && show && (
          <>
            {/* Header */}
            <header className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-600">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                Show confirmed · Tickets coming soon
              </span>
              <h1
                className={`${goldman.className} mt-5 text-4xl leading-[1.05] text-[#391314] sm:text-5xl lg:text-6xl`}
              >
                Hilarious live in{" "}
                <span className="text-yellow-500">{show.city.trim()}</span>
              </h1>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <DetailChip icon={Calendar}>{show.dateLabel}</DetailChip>
                <DetailChip icon={Clock}>{show.time}</DetailChip>
                <DetailChip icon={MapPin}>{placeLabel(show)}</DetailChip>
                {daysToGo !== null && (
                  <DetailChip accent icon={Hourglass}>
                    {daysToGo} {daysToGo === 1 ? "day" : "days"} to go
                  </DetailChip>
                )}
              </div>
            </header>

            {/* Poster + sign-up card */}
            <div className="mt-10 grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-ink/10 ring-1 ring-ink/5 lg:grid-cols-2">
              {/* On desktop the form is taller than the square poster: pin the
                  poster to the top uncropped and fill below with its own
                  bottom-band colour, so the band reads as continuing. */}
              <div className="relative aspect-square bg-[#391312] lg:aspect-auto lg:min-h-full">
                {/* Same "be the first to know" poster on every sign-up page,
                    rather than the show's own artwork. generic_sm.avif is a
                    1200px copy of generic.avif (3375px). */}
                <Image
                  fill
                  priority
                  alt="Dr Hilary Okello, Hilarious world tour: be the first to know when tickets are out"
                  className="object-cover lg:object-contain lg:object-top"
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src="/generic_sm.avif"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                {booksViaWhatsApp(show) ? (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                      Tickets are on sale!
                    </h2>
                    <p className="text-ink/70">
                      Tickets for this show are sold directly over WhatsApp.
                      Message us to reserve your seats.
                    </p>
                    <a
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-yellow-600 sm:w-auto"
                      href={whatsAppBookingUrl(show)}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Get Tickets Now
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                ) : hasTicketLink(show) ? (
                  <div className="space-y-5">
                    <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                      Tickets are on sale!
                    </h2>
                    <p className="text-ink/70">
                      Good news: you no longer need to sign up. Grab your seats
                      before they&apos;re gone.
                    </p>
                    <a
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-yellow-600 sm:w-auto"
                      href={show.link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Get Tickets Now
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                ) : (
                  <SignUpForm show={show} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
