"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  MessageCircle,
  UserPlus,
} from "lucide-react";

import CityRegistrationForm from "@/components/city-registration-form";
import { supabase } from "@/lib/supabase";
import {
  SHOWS,
  booksViaWhatsApp,
  dbShowToShow,
  hasTicketLink,
  whatsAppBookingUrl,
  signUpPath,
  type DbShow,
  type Show as StaticShow,
} from "@/lib/shows";
import { useSectionReveal } from "@/components/use-section-reveal";

// --- Date helpers ---
const parseDate = (iso: string) => new Date(Date.parse(iso));

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

// --- Show Card — mobile-first tear-off event ticket ---
const ShowCard = ({ show }: { show: StaticShow }) => {
  const date = useMemo(() => parseDate(show.date), [show.date]);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const weekday = WEEKDAY_LABELS[date.getDay()];
  const fullDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const waLink = whatsAppBookingUrl(show);

  // Determine ticket action
  const isSoldOut = !!show.soldOut;
  const isWaitingList = show.badge === "Join Waiting List";
  const hasTickets = hasTicketLink(show);
  // Organiser sells tickets over WhatsApp instead of a ticketing platform.
  const isWhatsApp = !isWaitingList && booksViaWhatsApp(show);
  // Confirmed but tickets not out yet: collect sign-ups on our own page.
  const isSignUp = !isWaitingList && !isWhatsApp && !hasTickets;
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
        <span className="rounded-full border border-ink/15 bg-ink/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-ink/70">
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
        <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
          Selling Fast
        </span>
      )}
    </>
  );

  const cardClassName = `group relative flex flex-row items-stretch overflow-hidden rounded-2xl border bg-gradient-to-br transition-all duration-300 ${
    isSoldOut
      ? "cursor-not-allowed grayscale opacity-60 border-ink/5 from-white to-cream"
      : show.featured
        ? "border-yellow-400/25 from-yellow-400/[0.07] to-cream hover:border-yellow-400/45"
        : "border-ink/10 from-white to-cream hover:border-yellow-400/25"
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
      <div className="flex min-w-0 flex-1 items-center gap-3 py-4 pl-4 pr-3 sm:gap-4 sm:px-5 sm:py-5">
        {/* Date */}
        <div
          aria-hidden="true"
          className="min-w-[42px] shrink-0 text-center sm:min-w-[54px]"
        >
          <span
            className={`block text-2xl font-black leading-none tabular-nums sm:text-3xl ${isSoldOut ? "text-ink/40" : "text-yellow-400"}`}
          >
            {String(day).padStart(2, "0")}
          </span>
          <span
            className={`mt-1 block text-[11px] font-bold uppercase tracking-wider ${isSoldOut ? "text-ink/45" : "text-yellow-400/80"}`}
          >
            {month}
          </span>
          <span className="mt-0.5 block text-[10px] text-ink/50">
            {weekday}
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          {/* Title — city + country (country shows on the meta line for desktop) */}
          <div className="mb-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h3 className="min-w-0 text-[15px] font-bold leading-snug text-ink sm:truncate sm:text-lg 2xl:text-xl 4xl:text-2xl">
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
            <span className="inline-flex items-center gap-1.5 text-xs text-ink/50 sm:text-[13px] sm:text-ink/45">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-yellow-400/60 sm:h-3 sm:w-3" />
              <span className="truncate">{show.location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink/50 sm:text-[13px] sm:text-ink/45">
              <Clock className="h-3.5 w-3.5 shrink-0 text-yellow-400/60 sm:h-3 sm:w-3" />
              {show.time}
            </span>
            <span className="hidden text-[13px] text-ink/45 sm:inline">
              {show.country}
            </span>
          </div>

          {/* Mobile: badges last, after all details */}
          {hasBadges && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:hidden">
              {badges}
            </div>
          )}
        </div>
      </div>

      {/* ── Perforation (tear line) ── */}
      <div className="relative shrink-0 border-l-2 border-dashed border-ink/15">
        {/* Notches (left border, top/bottom) */}
        <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-cream" />
        <span className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full bg-cream" />
      </div>

      {/* ── Stub (the tear-off portion) ── */}
      <div className="flex shrink-0 flex-col items-center justify-center gap-2 px-3 py-4 sm:min-w-[152px] sm:gap-2.5 sm:px-5">
        {show.ticketPrice && !isSoldOut && (
          <span className="text-xs font-bold text-yellow-400 sm:text-sm">
            {show.ticketPrice}
          </span>
        )}

        <span
          aria-hidden="true"
          className={`group/btn inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-bold sm:gap-1.5 sm:px-5 sm:py-2.5 sm:text-sm ${
            isSoldOut
              ? "border border-ink/10 bg-ink/5 text-ink/40"
              : isWaitingList
                ? "touch-manipulation border border-ink/10 bg-ink/10 text-ink transition-all duration-300 group-active:scale-[0.97] group-hover:bg-ink/15"
                : "touch-manipulation bg-yellow-500 text-white shadow-lg shadow-yellow-400/10 transition-all duration-300 group-active:scale-[0.97] group-hover:bg-yellow-300 group-hover:shadow-yellow-400/20"
          }`}
        >
          {isSoldOut ? (
            <span>Sold Out</span>
          ) : isWaitingList ? (
            <>
              <span>Join List</span>
              <MessageCircle className="h-3.5 w-3.5" />
            </>
          ) : isSignUp ? (
            <>
              <span>Sign Up Now</span>
              <UserPlus className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              <span>Get Tickets</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </>
          )}
        </span>
      </div>
    </>
  );

  return (
    <article data-show-card>
      {isSoldOut ? (
        <div
          aria-disabled="true"
          aria-label={`${show.title} in ${show.city} — sold out`}
          className={cardClassName}
          role="group"
        >
          {cardContent}
        </div>
      ) : isSignUp ? (
        <Link
          aria-label={`Sign up for ${show.title} in ${show.city} on ${fullDate} at ${show.time}`}
          className={cardClassName}
          href={signUpPath(show.slug)}
        >
          {cardContent}
        </Link>
      ) : (
        <a
          aria-label={`${isWaitingList ? "Join waiting list" : isWhatsApp ? "Get tickets on WhatsApp" : "Get tickets"} for ${show.title} in ${show.city} on ${fullDate} at ${show.time}`}
          className={cardClassName}
          href={ticketUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {cardContent}
        </a>
      )}
    </article>
  );
};

// --- Main Component ---
const UpcomingShows = () => {
  const sectionRef = useRef<HTMLElement>(null);
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
            setDbShows((data as DbShow[]).map(dbShowToShow));
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

  // Group the (already sorted) shows by calendar month
  const showsByMonth = useMemo(() => {
    const groups: { key: string; label: string; shows: StaticShow[] }[] = [];

    for (const show of upcomingShows) {
      const date = parseDate(show.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      let group = groups[groups.length - 1];

      if (!group || group.key !== key) {
        group = {
          key,
          label: date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          shows: [],
        };
        groups.push(group);
      }
      group.shows.push(show);
    }

    return groups;
  }, [upcomingShows]);

  useSectionReveal(sectionRef, `${loading}:${upcomingShows.length}`);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || loading || upcomingShows.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-show-card]",
        section,
      );

      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 28, autoAlpha: 0, scale: 0.98 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    return () => media.revert();
  }, [loading, upcomingShows]);

  return (
    <section
      ref={sectionRef}
      aria-label="Upcoming Shows"
      className="min-h-screen bg-cream font-sans text-ink"
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 2xl:max-w-[1440px] 2xl:pb-20 2xl:pt-16 3xl:max-w-[1680px] 3xl:pb-24 3xl:pt-20 4xl:max-w-[2400px] 4xl:pb-28 4xl:pt-24">
        {/* Section Header */}
        <header data-scroll-reveal-item className="mb-6 text-center sm:mb-10">
          <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 sm:mb-3 sm:text-xs">
            Hilarious World Tour 2027
          </span>
          <h2 className="text-4xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl">
            Upcoming Shows
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs text-ink/40 sm:text-sm">
            Grab your tickets before they sell out
          </p>
        </header>

        {/* Shows List */}
        {loading ? (
          <div
            data-scroll-reveal-item
            aria-label="Loading shows"
            className="animate-pulse space-y-3 sm:space-y-4"
            role="status"
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-row items-stretch overflow-hidden rounded-2xl border border-ink/10 bg-white/60"
              >
                <div className="flex flex-1 items-center gap-4 px-4 py-4 sm:px-5 sm:py-5">
                  <div className="h-12 w-12 shrink-0 rounded-lg bg-ink/[0.04]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-ink/[0.04]" />
                    <div className="h-3 w-1/2 rounded bg-ink/[0.03]" />
                  </div>
                </div>
                <div className="border-l-2 border-dashed border-ink/10" />
                <div className="flex flex-col items-center justify-center px-3 py-4 sm:min-w-[152px] sm:px-5">
                  <div className="h-8 w-24 rounded-full bg-ink/[0.04] sm:h-9" />
                </div>
              </div>
            ))}
          </div>
        ) : upcomingShows.length > 0 ? (
          <nav
            data-scroll-reveal-item
            aria-label="Show listings"
            className="space-y-8 sm:space-y-12"
          >
            {showsByMonth.map((group) => (
              <section
                key={group.key}
                aria-labelledby={`shows-month-${group.key}`}
              >
                <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
                  <h3
                    className="shrink-0 text-sm font-extrabold uppercase tracking-[0.18em] text-yellow-400 sm:text-base 2xl:text-lg"
                    id={`shows-month-${group.key}`}
                  >
                    {group.label}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-gradient-to-r from-yellow-400/30 to-transparent"
                  />
                  <span className="shrink-0 text-[11px] font-medium text-ink/40 sm:text-xs">
                    {group.shows.length}{" "}
                    {group.shows.length === 1 ? "show" : "shows"}
                  </span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {group.shows.map((show) => (
                    <ShowCard key={show.id} show={show} />
                  ))}
                </div>
              </section>
            ))}
          </nav>
        ) : (
          <div
            data-scroll-reveal-item
            className="px-4 py-16 text-center"
            role="status"
          >
            <p className="text-sm text-ink/50 sm:text-base">
              No upcoming shows right now.
            </p>
            <p className="mt-1 text-xs text-ink/30 sm:text-sm">
              Check back soon or register your city below!
            </p>
          </div>
        )}

        {/* City Registration CTA */}
        <aside
          data-scroll-reveal-item
          aria-label="City registration"
          className="mt-10 sm:mt-14"
        >
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-white via-cream to-white">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-2 lg:gap-8">
              <div className="relative order-1 aspect-[16/9] lg:order-1 lg:aspect-auto lg:min-h-[400px]">
                <Image
                  fill
                  alt="World tour destinations map"
                  className="object-cover"
                  priority={false}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/tour_countries.webp"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
              </div>

              <div className="order-2 flex flex-col justify-center p-5 sm:p-8 lg:order-2 lg:p-10">
                <h3 className="mb-3 text-xl font-extrabold leading-tight text-ink sm:text-2xl lg:text-3xl">
                  Want Me to Perform in Your City?
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-ink/70 sm:mb-6 sm:text-base">
                  Join the Hilarious World Tour! Tell us where you want Dr.
                  Okello to perform next. High-demand cities influence our tour
                  planning!
                </p>
                <CityRegistrationForm />
                <p className="mt-4 text-[11px] leading-relaxed text-ink/40 sm:text-xs">
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
