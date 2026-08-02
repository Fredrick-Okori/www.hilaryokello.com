"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, ArrowUpRight, MessageCircle } from "lucide-react";

import CityRegistrationForm from "@/components/city-registration-form";
import { supabase } from "@/lib/supabase";
import { SHOWS, DEFAULT_CONTACT, type Show as StaticShow } from "@/lib/shows";

// Row shape returned from Supabase
type DbShow = {
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

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function dbShowToStaticShape(s: DbShow): StaticShow {
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

// --- Date helpers ---
const parseDate = (iso: string) => new Date(Date.parse(iso));

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

// --- Show Card — mobile-first tear-off event ticket ---
const ShowCard = ({ show, index }: { show: StaticShow; index: number }) => {
  const date = useMemo(() => parseDate(show.date), [show.date]);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const weekday = WEEKDAY_LABELS[date.getDay()];
  const fullDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const contact = show.contactNumber ?? DEFAULT_CONTACT;
  const waLink = `https://wa.me/${contact.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello, I'm interested in tickets for ${show.title} in ${show.city}, ${show.country}`,
  )}`;

  // Determine ticket action
  const isSoldOut = !!show.soldOut;
  const isWaitingList = show.badge === "Join Waiting List";
  const hasTickets = show.link !== "#";
  const ticketUrl = hasTickets ? show.link : waLink;
  const sellingFast =
    !isSoldOut &&
    show.soldOutPercentage !== undefined &&
    show.soldOutPercentage > 70;

  const showCustomBadge =
    !!show.badge && !show.featured && !isWaitingList && !isSoldOut;
  const hasBadges =
    isSoldOut || show.featured || sellingFast || showCustomBadge;

  // Rendered inline (desktop) and as a bottom row (mobile)
  const badges = (
    <>
      {isSoldOut && (
        <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white/70">
          SOLD OUT
        </span>
      )}
      {show.featured && (
        <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/20 bg-yellow-400/15 px-2 py-0.5 text-[10px] font-bold tracking-wider text-yellow-400">
          <Star className="h-2.5 w-2.5 fill-yellow-400" />
          FEATURED
        </span>
      )}
      {showCustomBadge && (
        <span className="rounded-full border border-yellow-400/15 bg-yellow-400/10 px-2 py-0.5 text-[10px] font-medium tracking-wider text-yellow-400/90">
          {show.badge}
        </span>
      )}
      {sellingFast && (
        <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-400">
          Selling Fast
        </span>
      )}
    </>
  );

  const cardClassName = `group relative flex flex-col overflow-hidden rounded-2xl border bg-gradient-to-br transition-all duration-300 sm:flex-row sm:items-stretch ${
    isSoldOut
      ? "cursor-not-allowed grayscale opacity-60 border-white/5 from-zinc-900/40 to-black/60"
      : show.featured
        ? "border-yellow-400/25 from-yellow-400/[0.07] to-black hover:border-yellow-400/45"
        : "border-white/10 from-zinc-900/80 to-black hover:border-yellow-400/25"
  }`;

  const cardContent = (
    <>
      {/* Featured accent rail */}
      {show.featured && !isSoldOut && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 z-10 h-full w-1 bg-yellow-400"
        />
      )}

      {/* ── Main body (the "keep" portion) ── */}
      <div className="flex flex-1 items-center gap-3.5 px-4 pb-3 pt-4 sm:gap-4 sm:px-5 sm:py-5">
        {/* Date */}
        <div
          aria-hidden="true"
          className="min-w-[48px] shrink-0 text-center sm:min-w-[54px]"
        >
          <span
            className={`block text-[28px] font-black leading-none tabular-nums sm:text-3xl ${isSoldOut ? "text-white/40" : "text-yellow-400"}`}
          >
            {String(day).padStart(2, "0")}
          </span>
          <span
            className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${isSoldOut ? "text-white/30" : "text-yellow-400/80"}`}
          >
            {month}
          </span>
          <span className="mt-0.5 block text-[10px] text-white/35">
            {weekday}
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          {/* Title — city + country (country shows on the meta line for desktop) */}
          <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="min-w-0 text-[17px] font-bold leading-snug text-white sm:truncate sm:text-lg">
              {weekday}, {show.city} - {show.country}
            </h3>
            {/* Desktop: badges inline next to the city */}
            {hasBadges && (
              <span className="hidden items-center gap-2 sm:flex">
                {badges}
              </span>
            )}
          </div>

          {/* Location + time */}
          <div className="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50 sm:text-[13px] sm:text-white/45">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-yellow-400/60 sm:h-3 sm:w-3" />
              <span className="truncate">{show.location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/50 sm:text-[13px] sm:text-white/45">
              <Clock className="h-3.5 w-3.5 shrink-0 text-yellow-400/60 sm:h-3 sm:w-3" />
              {show.time}
            </span>
            <span className="hidden text-[13px] text-white/25 sm:inline">
              {show.country}
            </span>
          </div>

          {/* Mobile: price */}
          {show.ticketPrice && !isSoldOut && (
            <p className="mt-1 text-xs font-bold text-yellow-400 sm:hidden">
              {show.ticketPrice}
            </p>
          )}

          {/* Mobile: badges last, after all details */}
          {hasBadges && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:hidden">
              {badges}
            </div>
          )}
        </div>
      </div>

      {/* ── Perforation (tear line) ── */}
      <div className="relative shrink-0 border-t-2 border-dashed border-white/15 sm:border-l-2 sm:border-t-0">
        {/* Mobile notches (top edge, left/right) */}
        <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-black sm:hidden" />
        <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-black sm:hidden" />
        {/* Desktop notches (left border, top/bottom) */}
        <span className="absolute -left-1.5 -top-1.5 hidden h-3 w-3 rounded-full bg-black sm:block" />
        <span className="absolute -bottom-1.5 -left-1.5 hidden h-3 w-3 rounded-full bg-black sm:block" />
      </div>

      {/* ── Stub (the tear-off portion) ── */}
      <div className="px-4 pb-4 pt-3 sm:flex sm:min-w-[152px] sm:flex-col sm:items-center sm:justify-center sm:gap-2.5 sm:px-5 sm:py-4 sm:pt-4">
        {/* Desktop-only price / label */}
        <div className="hidden sm:flex sm:flex-col sm:items-center">
          {show.ticketPrice && !isSoldOut && (
            <span className="text-sm font-bold text-yellow-400">
              {show.ticketPrice}
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          className={`group/btn inline-flex min-h-[46px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-5 text-[15px] font-bold sm:min-h-0 sm:w-auto sm:py-2.5 sm:text-sm ${
            isSoldOut
              ? "border border-white/10 bg-white/5 text-white/40"
              : isWaitingList
                ? "touch-manipulation border border-white/10 bg-white/10 text-white transition-all duration-300 group-active:scale-[0.97] group-hover:bg-white/15"
                : "touch-manipulation bg-yellow-500 text-black shadow-lg shadow-yellow-400/10 transition-all duration-300 group-active:scale-[0.97] group-hover:bg-yellow-300 group-hover:shadow-yellow-400/20"
          }`}
        >
          {isSoldOut ? (
            <span>Sold Out</span>
          ) : isWaitingList ? (
            <>
              <MessageCircle className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
              <span>Join List</span>
            </>
          ) : (
            <>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              <span>Get Tickets</span>
            </>
          )}
        </span>
      </div>
    </>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      viewport={{ once: true, margin: "-20px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {isSoldOut ? (
        <div
          aria-disabled="true"
          aria-label={`${show.title} in ${show.city} — sold out`}
          className={cardClassName}
          role="group"
        >
          {cardContent}
        </div>
      ) : (
        <a
          aria-label={`${isWaitingList ? "Join waiting list" : "Get tickets"} for ${show.title} in ${show.city} on ${fullDate} at ${show.time}`}
          className={cardClassName}
          href={ticketUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {cardContent}
        </a>
      )}
    </motion.article>
  );
};

// --- Main Component ---
const UpcomingShows = () => {
  const today = useMemo(() => new Date(), []);
  const todayStart = useMemo(() => {
    const start = new Date(today);

    start.setHours(0, 0, 0, 0);

    return start;
  }, [today]);
  const [dbShows, setDbShows] = useState<StaticShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("shows")
      .select("*")
      .eq("published", true)
      .gte("date", today.toISOString().slice(0, 10))
      .order("date", { ascending: true })
      .then(
        ({ data }) => {
          if (data && data.length > 0) {
            setDbShows((data as DbShow[]).map(dbShowToStaticShape));
          }
          setLoading(false);
        },
        () => setLoading(false),
      );
  }, [today]);

  const upcomingShows = useMemo(() => {
    const staticUpcoming = SHOWS.filter(
      (s) => parseDate(s.date).getTime() >= todayStart.getTime(),
    );

    const dbKeys = new Set(
      dbShows.map((s) => `${s.date}-${s.country}-${s.city}`),
    );
    const filteredStatic = staticUpcoming.filter(
      (s) => !dbKeys.has(`${s.date.slice(0, 10)}-${s.country}-${s.city}`),
    );

    return [...dbShows, ...filteredStatic].sort(
      (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
    );
  }, [dbShows, todayStart]);

  return (
    <section
      aria-label="Upcoming Shows"
      className="min-h-screen bg-black font-sans text-white"
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
        {/* Section Header */}
        <header className="mb-6 text-center sm:mb-10">
          <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 sm:mb-3 sm:text-xs">
            2026 World Tour
          </span>
          <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            Upcoming Shows
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs text-white/40 sm:text-sm">
            Grab your tickets before they sell out
          </p>
        </header>

        {/* Shows List */}
        {loading ? (
          <div
            aria-label="Loading shows"
            className="animate-pulse space-y-3 sm:space-y-4"
            role="status"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 sm:flex-row sm:items-stretch"
              >
                <div className="flex flex-1 items-center gap-4 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-white/[0.04]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-white/[0.04]" />
                    <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
                  </div>
                </div>
                <div className="border-t-2 border-dashed border-white/10 sm:border-l-2 sm:border-t-0" />
                <div className="px-4 pb-4 pt-3 sm:flex sm:min-w-[152px] sm:flex-col sm:items-center sm:justify-center sm:px-5 sm:py-4">
                  <div className="h-[46px] w-full rounded-full bg-white/[0.04] sm:h-9 sm:w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : upcomingShows.length > 0 ? (
          <nav aria-label="Show listings" className="space-y-3 sm:space-y-4">
            {upcomingShows.map((show, index) => (
              <ShowCard key={show.id} index={index} show={show} />
            ))}
          </nav>
        ) : (
          <div className="px-4 py-16 text-center" role="status">
            <p className="text-sm text-white/50 sm:text-base">
              No upcoming shows right now.
            </p>
            <p className="mt-1 text-xs text-white/30 sm:text-sm">
              Check back soon or register your city below!
            </p>
          </div>
        )}

        {/* City Registration CTA */}
        <aside aria-label="City registration" className="mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-8">
              <div className="relative order-1 aspect-[16/9] lg:order-1 lg:aspect-auto lg:min-h-[400px]">
                <Image
                  fill
                  alt="World tour destinations map"
                  className="object-cover"
                  priority={false}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/tour_countries.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
              </div>

              <div className="order-2 flex flex-col justify-center p-5 sm:p-8 lg:order-2 lg:p-10">
                <h3 className="mb-3 text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-3xl">
                  Want Me to Perform in Your City?
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-white/70 sm:mb-6 sm:text-base">
                  Join the &quot;Jokes From Far Away&quot; World Tour! Tell us
                  where you want Dr. Okello to perform next. High-demand cities
                  influence our tour planning!
                </p>
                <CityRegistrationForm />
                <p className="mt-4 text-[11px] leading-relaxed text-white/40 sm:text-xs">
                  We respect your privacy. Your information will only be used to
                  plan tour locations.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default UpcomingShows;
