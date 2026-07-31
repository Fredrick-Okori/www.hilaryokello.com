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

// --- Show Card - Button always on right, content wraps on mobile ---
const ShowCard = ({ show, index }: { show: StaticShow; index: number }) => {
  const date = useMemo(() => parseDate(show.date), [show.date]);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
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
  const isWaitingList = show.badge === "Join Waiting List";
  const hasTickets = show.link !== "#";
  const ticketUrl = hasTickets ? show.link : waLink;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group relative flex items-start gap-3 sm:gap-4 px-3 sm:px-5 py-4 border-b border-white/[0.06] hover:border-yellow-400/20 hover:bg-yellow-400/[0.02] transition-all duration-300"
    >
      {/* Date Block */}
      <div 
        className="text-center shrink-0 min-w-[44px] sm:min-w-[56px] pt-0.5"
        aria-hidden="true"
      >
        <span className="block text-[28px] sm:text-3xl font-bold text-yellow-400 tabular-nums leading-none">
          {String(day).padStart(2, '0')}
        </span>
        <span className="block text-[10px] sm:text-[11px] font-semibold text-yellow-400/80 tracking-wider uppercase mt-0.5">
          {month}
        </span>
      </div>

      {/* Show Info - Wraps on mobile */}
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
          <h3 className="text-base sm:text-lg font-semibold text-white truncate">
            {show.city}
          </h3>
          {show.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-400 text-[9px] sm:text-[10px] font-bold tracking-wider border border-yellow-400/20 shrink-0">
              <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-yellow-400" />
              <span className="hidden sm:inline">FEATURED</span>
            </span>
          )}
          {show.badge && !show.featured && (
            <span className="px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400/90 text-[9px] sm:text-[10px] font-medium tracking-wider border border-yellow-400/15 shrink-0">
              {show.badge}
            </span>
          )}
        </div>
        
        {/* Location and Time - stack on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-3 gap-y-0.5">
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-[13px] text-white/40">
            <MapPin className="w-3 h-3 text-yellow-400/60 shrink-0" />
            <span className="truncate">{show.location}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-[13px] text-white/40">
            <Clock className="w-3 h-3 text-yellow-400/60 shrink-0" />
            {show.time}
          </span>
          <span className="hidden sm:inline text-white/15 text-[13px]">{show.country}</span>
        </div>

        {/* Mobile only: country, weekday, price */}
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-1 sm:hidden">
          <span className="text-[10px] text-white/20">{show.country}</span>
          <span className="text-[10px] text-white/20">•</span>
          <span className="text-[10px] text-white/20">{weekday}</span>
          {show.ticketPrice && (
            <>
              <span className="text-[10px] text-white/20">•</span>
              <span className="text-[10px] font-semibold text-yellow-400/70">{show.ticketPrice}</span>
            </>
          )}
        </div>

        {/* Selling fast indicator */}
        {show.soldOutPercentage !== undefined && show.soldOutPercentage > 70 && (
          <div className="mt-1.5">
            <span className="text-[9px] sm:text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
              🔥 SELLING FAST
            </span>
          </div>
        )}
      </div>

      {/* Ticket Button - Always on right, full size */}
      <div className="shrink-0 self-center sm:self-start sm:pt-0.5">
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${isWaitingList ? 'Join waiting list' : 'Get tickets'} for ${show.title} in ${show.city} on ${fullDate} at ${show.time}`}
          className={`group/btn inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 touch-manipulation ${
            isWaitingList
              ? "bg-white/10 hover:bg-white/15 text-white border border-white/10"
              : "bg-yellow-400 hover:bg-yellow-300 text-black shadow-lg shadow-yellow-400/10 hover:shadow-yellow-400/20"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {isWaitingList ? (
            <>
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Join List</span>
            </>
          ) : (
            <>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              <span>Get Tickets</span>
            </>
          )}
        </a>
        
        {/* Price on desktop */}
        {show.ticketPrice && (
          <p className="hidden sm:block text-[11px] text-yellow-400/60 text-center mt-1 font-medium">
            {show.ticketPrice}
          </p>
        )}
      </div>
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
      className="font-sans min-h-screen text-white bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16">
        {/* Section Header */}
        <header className="text-center mb-6 sm:mb-10">
          <span className="inline-block text-yellow-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-2 sm:mb-3">
            2026 World Tour
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-extrabold leading-tight">
            Upcoming Shows
          </h2>
          <p className="text-white/40 text-xs sm:text-sm mt-2 max-w-md mx-auto">
            Grab your tickets before they sell out
          </p>
        </header>

        {/* Shows List */}
        {loading ? (
          <div className="space-y-1 animate-pulse" role="status" aria-label="Loading shows">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-5 border-b border-white/[0.06]">
                <div className="w-[44px] h-[44px] bg-white/[0.03] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/[0.03] rounded w-2/3" />
                  <div className="h-3 bg-white/[0.02] rounded w-1/2" />
                </div>
                <div className="w-20 h-9 bg-white/[0.03] rounded-full" />
              </div>
            ))}
          </div>
        ) : upcomingShows.length > 0 ? (
          <nav 
            aria-label="Show listings"
            className="border-t border-white/[0.06]"
          >
            {upcomingShows.map((show, index) => (
              <ShowCard key={show.id} show={show} index={index} />
            ))}
          </nav>
        ) : (
          <div 
            role="status"
            className="text-center py-16 px-4"
          >
            <span className="text-4xl mb-4 block" aria-hidden="true">🎭</span>
            <p className="text-white/50 text-sm sm:text-base">
              No upcoming shows right now.
            </p>
            <p className="text-white/30 text-xs sm:text-sm mt-1">
              Check back soon or register your city below!
            </p>
          </div>
        )}

        {/* City Registration CTA */}
        <aside 
          aria-label="City registration"
          className="mt-10 sm:mt-14"
        >
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
              <div className="order-1 lg:order-1 relative aspect-[16/9] lg:aspect-auto lg:min-h-[400px]">
                <Image
                  alt="World tour destinations map"
                  className="object-cover"
                  fill
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src="/tour_countries.jpg"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/40" />
              </div>
              
              <div className="order-2 lg:order-2 p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Want Me to Perform in Your City?
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-5 sm:mb-6 leading-relaxed">
                  Join the &quot;Jokes From Far Away&quot; World Tour! Tell us
                  where you want Dr. Okello to perform next. High-demand cities
                  influence our tour planning!
                </p>
                <CityRegistrationForm />
                <p className="text-[11px] sm:text-xs text-white/40 mt-4 leading-relaxed">
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