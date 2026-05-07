"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/button";
import { ChevronRight } from "lucide-react";

import { SHOWS, DEFAULT_CONTACT, type Show } from "@/lib/shows";

// --- Constants ---
const TODAY = new Date();

// --- Date helpers ---
const parseDate = (iso: string) => new Date(Date.parse(iso));

const formatDatePart = (date: Date) => {
  const weekday = date
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
  const day = date.getDate();

  return { weekday, month, day };
};

// --- Show Item ---
interface ShowItemProps {
  show: Show;
}

const ShowItem = ({ show }: ShowItemProps) => {
  const date = useMemo(() => parseDate(show.date), [show.date]);
  const { weekday, month, day } = useMemo(() => formatDatePart(date), [date]);

  const contact = show.contactNumber ?? DEFAULT_CONTACT;
  const waLink = `https://wa.me/${contact.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello, I'm interested in tickets for ${show.title} in ${show.city}, ${show.country}`,
  )}`;

  const borderClass =
    show.badge && show.id !== 16 ? "border-red-600" : "border-white/10";

  return (
    <Link
      className={`group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/10 backdrop-blur-sm border rounded-xl p-5 sm:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl focus-within:ring-2 focus-within:ring-yellow-500 ${borderClass}`}
      href={`/shows/${show.slug}`}
    >
      {/* Date + Info */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-full sm:min-w-[50%]">
        <div className="text-center min-w-[80px]">
          <div className="text-xs text-white/60 font-medium tracking-wider">
            {weekday}
          </div>
          <div className="text-3xl font-extrabold text-white">{day}</div>
          <div className="text-sm text-white/75 font-semibold">{month}</div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-1 truncate">
            {show.city}, {show.country}
          </h3>
          <p className="text-white/75 text-sm sm:text-base truncate">
            {show.location} • {show.time}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {show.featured && (
              <span className="inline-block px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-bold">
                FEATURED EVENT
              </span>
            )}
            {show.badge && (
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${show.id === 16 ? "bg-white/20 text-white" : "bg-red-600 text-white"}`}
              >
                {show.badge}
              </span>
            )}
          </div>
          {show.soldOutPercentage !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white/60">
                  {show.soldOutLabel ?? "Tickets sold"}
                </span>
                <span className="text-xs font-bold text-red-400">
                  {show.soldOutPercentage}%
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${show.soldOutPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ticket / WhatsApp button */}
      <div className="flex justify-end sm:justify-start shrink-0">
        {show.link !== "#" ? (
          <button
            aria-label={`Get tickets for ${show.title}`}
            className="flex items-center rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 text-sm transition-all min-w-[120px] justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(show.link, "_blank", "noopener,noreferrer");
            }}
          >
            Get Tickets
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        ) : (
          <button
            aria-label={`Contact via WhatsApp for ${show.title}`}
            className="flex items-center rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 text-sm transition-all min-w-[120px] justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-yellow-500"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(waLink, "_blank", "noopener,noreferrer");
            }}
          >
            WhatsApp
            <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
      </div>
    </Link>
  );
};

// --- Main Component ---
const UpcomingShows = () => {
  const upcomingShows = useMemo(() => {
    return SHOWS.filter(
      (show) => parseDate(show.date).getTime() > TODAY.getTime(),
    ).sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
  }, []);

  return (
    <div className="font-sans min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:pt-10 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-8 sm:mb-12 leading-tight">
          Upcoming Shows
        </h2>

        {/* Show list */}
        {upcomingShows.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {upcomingShows.map((show) => (
              <ShowItem key={show.id} show={show} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/70 bg-white/5 border border-white/10 rounded-xl p-8">
            No upcoming shows right now. Check back soon.
          </div>
        )}

        {/* City registration CTA */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-12 shadow-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image
                alt="World Tour Map"
                className="rounded-lg sm:rounded-xl w-full h-auto"
                height={400}
                quality={80}
                sizes="(max-width: 1024px) 100vw, 50vw"
                src="/tour_countries.jpg"
                width={800}
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 text-white text-left leading-tight">
                Want Me to Perform in Your City?
              </h2>
              <p className="text-base sm:text-lg text-white/75 mb-6 sm:mb-8 text-left leading-relaxed">
                Join the &quot;Jokes From Far Away&quot; World Tour! Tell us
                where you want Dr. Okello to perform next. High-demand cities
                influence our tour planning!
              </p>
              <div className="flex justify-start">
                <Button
                  as="a"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base sm:text-lg rounded-full transition-all transform hover:scale-105"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfJtqtEE96Z7VMjrEWPMJnAuGV0ozURLy5iFvbsCImEw5VTGA/viewform"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Register your City
                  <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-white/50 mt-6 text-left">
                We respect your privacy. Your information will only be used to
                plan tour locations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingShows;
