"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  MessageCircle,
  UserPlus,
} from "lucide-react";

import CityRegistrationForm from "@/components/city-registration-form";
import { COUNTRIES } from "@/lib/countries";
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

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ISO2_BY_COUNTRY = new Map(
  COUNTRIES.map((c) => [c.name.toLowerCase(), c.iso2.toLowerCase()]),
);

// Image flags rather than emoji: Windows renders flag emoji as letters.
const Flag = ({
  country,
  className = "",
}: {
  country: string;
  className?: string;
}) => {
  const iso2 = ISO2_BY_COUNTRY.get(country.trim().toLowerCase());

  if (!iso2) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className={`inline-block h-3 w-[18px] shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(31,26,23,0.08)] ${className}`}
      height={12}
      loading="lazy"
      src={`https://flagcdn.com/w40/${iso2}.png`}
      width={18}
    />
  );
};

// Admin badges like "Sign up now" just repeat the button, so don't show them.
const REDUNDANT_BADGE = /^(get|buy) tickets?( now)?$|^sign ?up( now)?$/i;

// Empty, "TBA" or city-only venues read as missing info; say so plainly.
function venueLabel(show: StaticShow): string {
  const venue = show.location.trim();

  return !venue || /^tba$/i.test(venue) ? "Venue to be announced" : venue;
}

// --- Show Card — mobile-first tear-off event ticket ---
const ShowCard = ({
  show,
  isNext = false,
  daysToGo = null,
}: {
  show: StaticShow;
  isNext?: boolean;
  daysToGo?: number | null;
}) => {
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
    !!show.badge &&
    !show.featured &&
    !isWaitingList &&
    !isSoldOut &&
    !REDUNDANT_BADGE.test(show.badge.trim());
  const showNext = isNext && !isSoldOut;
  const hasBadges =
    showNext || isSoldOut || show.featured || sellingFast || showCustomBadge;

  const statusLabel = isSoldOut
    ? null
    : isWaitingList
      ? "Waiting list"
      : isSignUp
        ? "Early access"
        : isWhatsApp
          ? "Via WhatsApp"
          : "On sale now";

  // Rendered inline (desktop) and as a bottom row (mobile)
  const badges = (
    <>
      {showNext && (
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Next up
          {daysToGo !== null && daysToGo > 0 && (
            <span className="font-medium normal-case tracking-normal text-white/85">
              · {daysToGo} {daysToGo === 1 ? "day" : "days"}
            </span>
          )}
        </span>
      )}
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

  const cardClassName = `group relative flex flex-row items-stretch overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 active:scale-[0.985] ${
    isSoldOut
      ? "cursor-not-allowed grayscale opacity-60 border-ink/5"
      : showNext || show.featured
        ? "border-yellow-500/30 shadow-lg shadow-yellow-500/[0.08] hover:border-yellow-500/50 hover:shadow-xl hover:shadow-yellow-500/10"
        : "border-ink/10 shadow-sm shadow-ink/[0.03] hover:border-yellow-500/30 hover:shadow-lg hover:shadow-ink/[0.06]"
  }`;

  const cardContent = (
    <>
      {/* Featured accent rail */}
      {(show.featured || showNext) && !isSoldOut && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 z-10 h-full w-1 bg-yellow-500"
        />
      )}

      {/* ── Main body (the "keep" portion) ── */}
      <div className="flex min-w-0 flex-1 items-center gap-3 py-4 pl-4 pr-3 sm:gap-4 sm:px-5 sm:py-5">
        {/* Date */}
        <div
          aria-hidden="true"
          className={`flex w-14 shrink-0 flex-col items-center justify-center rounded-xl py-2 text-center transition-colors duration-300 sm:w-16 sm:py-2.5 ${
            isSoldOut
              ? "bg-ink/5 text-ink/40"
              : "bg-[#391314] text-cream group-hover:bg-yellow-500"
          }`}
          data-anim="date"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-75">
            {month}
          </span>
          <span className="text-2xl font-black leading-none tabular-nums sm:text-[28px]">
            {String(day).padStart(2, "0")}
          </span>
          <span className="mt-0.5 text-[10px] font-medium opacity-70">
            {weekday}
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          {/* Country eyebrow, then the city as the headline */}
          <p
            className="mb-0.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-ink/45 sm:text-[11px]"
            data-anim="info"
          >
            <Flag country={show.country} />
            <span className="truncate">{show.country}</span>
          </p>
          <div
            className="mb-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2.5"
            data-anim="info"
          >
            <h3 className="min-w-0 text-lg font-extrabold leading-tight text-ink sm:truncate sm:text-xl 2xl:text-2xl 4xl:text-3xl">
              {show.city.trim()}
            </h3>
            {/* Desktop: badges inline next to the city */}
            {hasBadges && (
              <span className="hidden items-center gap-2 sm:flex">
                {badges}
              </span>
            )}
          </div>

          {/* Location + time */}
          <div
            className="flex flex-col gap-y-1 sm:flex-row sm:items-center sm:gap-x-3"
            data-anim="info"
          >
            <span className="inline-flex min-w-0 items-start gap-1.5 text-xs text-ink/60 sm:items-center sm:text-[13px]">
              <MapPin className="mt-px h-3.5 w-3.5 shrink-0 text-yellow-500/70 sm:mt-0" />
              <span className="line-clamp-2 sm:truncate">
                {venueLabel(show)}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink/60 sm:text-[13px]">
              <Clock className="h-3.5 w-3.5 shrink-0 text-yellow-500/70" />
              {show.time}
            </span>
          </div>

          {/* Mobile: badges last, after all details */}
          {hasBadges && (
            <div
              className="mt-2 flex flex-wrap items-center gap-1.5 sm:hidden"
              data-anim="info"
            >
              {badges}
            </div>
          )}
        </div>
      </div>

      {/* ── Perforation (tear line) ── */}
      <div
        className="relative shrink-0 border-l-2 border-dashed border-ink/10"
        data-anim="perf"
      >
        {/* Notches (left border, top/bottom) */}
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full border border-ink/10 bg-cream" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border border-ink/10 bg-cream" />
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
                ? "touch-manipulation border border-ink/10 bg-ink/10 text-ink transition-colors duration-300 group-hover:bg-ink/15"
                : "touch-manipulation bg-yellow-500 text-white shadow-lg shadow-yellow-400/10 transition-[background-color,box-shadow] duration-300 group-hover:bg-yellow-300 group-hover:shadow-yellow-400/20"
          }`}
          data-anim="cta"
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

        {statusLabel && (
          <span
            className="hidden text-[11px] font-medium text-ink/45 sm:block"
            data-anim="status"
          >
            {statusLabel}
          </span>
        )}
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
          data-card-surface
          aria-label={`Sign up for ${show.title} in ${show.city} on ${fullDate} at ${show.time}`}
          className={cardClassName}
          href={signUpPath(show.slug)}
        >
          {cardContent}
        </Link>
      ) : (
        <a
          data-card-surface
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
  const [daysToNext, setDaysToNext] = useState<number | null>(null);

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

  const nextShow = upcomingShows[0];

  // After mount, so server and client markup match.
  useEffect(() => {
    if (!nextShow) return;
    const start = parseDate(nextShow.date);

    start.setHours(0, 0, 0, 0);
    setDaysToNext(
      Math.round((start.getTime() - todayStart.getTime()) / 86_400_000),
    );
  }, [nextShow, todayStart]);

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

  useGSAP(
    () => {
      if (loading || upcomingShows.length === 0) return;

      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (ctx) => {
          const { motion, finePointer } = ctx.conditions as {
            motion: boolean;
            finePointer: boolean;
          };

          if (!motion) return;

          const q = gsap.utils.selector(sectionRef);
          const cards = q("[data-show-card]") as HTMLElement[];
          const headers = q("[data-month-header]") as HTMLElement[];

          // ── Month headers: label rises, rule draws left → right ──
          gsap.set(q("[data-anim='month-label'], [data-anim='month-count']"), {
            autoAlpha: 0,
            y: 14,
          });
          gsap.set(q("[data-anim='month-line']"), { scaleX: 0 });

          ScrollTrigger.batch(headers, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              batch.forEach((header) => {
                const pick = (sel: string) =>
                  header.querySelector(`[data-anim='${sel}']`);

                gsap
                  .timeline()
                  .to(pick("month-label"), {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                  })
                  .to(
                    pick("month-line"),
                    { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
                    0.1,
                  )
                  .to(
                    pick("month-count"),
                    { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
                    0.35,
                  );
              }),
          });

          // ── Cards: flip up from below, then their contents build in ──
          gsap.set(cards, {
            autoAlpha: 0,
            y: 56,
            rotationX: -14,
            transformPerspective: 1000,
            transformOrigin: "50% 0%",
          });

          const revealCard = (card: HTMLElement, delay: number) => {
            const pick = (sel: string) =>
              card.querySelectorAll(`[data-anim='${sel}']`);

            gsap
              .timeline({ delay })
              .to(card, {
                autoAlpha: 1,
                y: 0,
                rotationX: 0,
                duration: 0.85,
                ease: "power3.out",
                clearProps: "transform",
              })
              .from(
                pick("date"),
                {
                  autoAlpha: 0,
                  scale: 0.4,
                  rotation: -12,
                  duration: 0.65,
                  ease: "back.out(2.2)",
                  clearProps: "transform",
                },
                0.15,
              )
              .from(
                pick("info"),
                {
                  autoAlpha: 0,
                  x: -22,
                  duration: 0.5,
                  stagger: 0.07,
                  ease: "power2.out",
                  clearProps: "transform",
                },
                0.25,
              )
              .from(
                pick("perf"),
                {
                  scaleY: 0,
                  transformOrigin: "50% 0%",
                  duration: 0.55,
                  ease: "power2.inOut",
                  clearProps: "transform",
                },
                0.3,
              )
              .from(
                pick("cta"),
                {
                  autoAlpha: 0,
                  scale: 0.5,
                  duration: 0.6,
                  ease: "back.out(2.5)",
                  clearProps: "transform",
                },
                0.42,
              )
              .from(
                pick("status"),
                { autoAlpha: 0, y: 6, duration: 0.4, ease: "power2.out" },
                0.6,
              );
          };

          ScrollTrigger.batch(cards, {
            start: "top 92%",
            once: true,
            onEnter: (batch) =>
              batch.forEach((card, i) =>
                revealCard(card as HTMLElement, i * 0.12),
              ),
          });

          if (!finePointer) return;

          // ── Desktop hover: tilt toward the cursor, lift, pop the date ──
          const cleanups = cards.map((card) => {
            const surface = card.querySelector<HTMLElement>(
              "[data-card-surface]",
            );

            if (!surface) return () => {};
            const date = surface.querySelector("[data-anim='date']");
            const cta = surface.querySelector("[data-anim='cta']");

            gsap.set(surface, { transformPerspective: 900 });
            const tiltX = gsap.quickTo(surface, "rotationX", {
              duration: 0.5,
              ease: "power3.out",
            });
            const tiltY = gsap.quickTo(surface, "rotationY", {
              duration: 0.5,
              ease: "power3.out",
            });

            const onEnter = () => {
              gsap.to(surface, { y: -5, duration: 0.4, ease: "power3.out" });
              gsap.to(date, {
                scale: 1.08,
                rotation: -4,
                duration: 0.45,
                ease: "back.out(3)",
              });
              gsap.to(cta, { x: 4, duration: 0.35, ease: "power2.out" });
            };
            const onMove = (e: PointerEvent) => {
              const r = surface.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;

              tiltY(px * 5);
              tiltX(-py * 7);
            };
            const onLeave = () => {
              tiltX(0);
              tiltY(0);
              gsap.to(surface, {
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.55)",
              });
              gsap.to(date, {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)",
              });
              gsap.to(cta, { x: 0, duration: 0.5, ease: "power3.out" });
            };
            const onDown = () =>
              gsap.to(surface, { scale: 0.985, duration: 0.12 });
            const onUp = () =>
              gsap.to(surface, {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
              });

            surface.addEventListener("pointerenter", onEnter);
            surface.addEventListener("pointermove", onMove);
            surface.addEventListener("pointerleave", onLeave);
            surface.addEventListener("pointerdown", onDown);
            surface.addEventListener("pointerup", onUp);

            return () => {
              surface.removeEventListener("pointerenter", onEnter);
              surface.removeEventListener("pointermove", onMove);
              surface.removeEventListener("pointerleave", onLeave);
              surface.removeEventListener("pointerdown", onDown);
              surface.removeEventListener("pointerup", onUp);
            };
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [loading, upcomingShows] },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Upcoming Shows"
      className="bg-cream font-sans text-ink"
    >
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-12 lg:px-8 2xl:max-w-[1440px] 2xl:pb-10 2xl:pt-16 3xl:max-w-[1680px] 3xl:pb-12 3xl:pt-20 4xl:max-w-[2400px] 4xl:pb-16 4xl:pt-24">
        {/* Section Header */}
        <header data-scroll-reveal-item className="mb-6 text-center sm:mb-10">
          <span className="mb-2 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 sm:mb-3 sm:text-xs">
            Hilarious World Tour 2027
          </span>
          <h2 className="text-4xl font-extrabold leading-tight text-ink sm:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl">
            Upcoming Shows
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/55 sm:text-base">
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
          <nav aria-label="Show listings" className="space-y-8 sm:space-y-12">
            {showsByMonth.map((group) => (
              <section
                key={group.key}
                aria-labelledby={`shows-month-${group.key}`}
              >
                <div
                  data-month-header
                  className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4"
                >
                  <h3
                    className="shrink-0 text-sm font-extrabold uppercase tracking-[0.18em] text-[#391314] sm:text-base 2xl:text-lg"
                    data-anim="month-label"
                    id={`shows-month-${group.key}`}
                  >
                    {group.label}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 origin-left bg-gradient-to-r from-[#391314]/25 to-transparent"
                    data-anim="month-line"
                  />
                  <span
                    className="shrink-0 text-[11px] font-medium text-ink/40 sm:text-xs"
                    data-anim="month-count"
                  >
                    {group.shows.length}{" "}
                    {group.shows.length === 1 ? "show" : "shows"}
                  </span>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {group.shows.map((show) => (
                    <ShowCard
                      key={show.id}
                      daysToGo={show === nextShow ? daysToNext : null}
                      isNext={show === nextShow}
                      show={show}
                    />
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
