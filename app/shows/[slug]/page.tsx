import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Clock, Ticket } from "lucide-react";

import { SHOWS, getShowBySlug, DEFAULT_CONTACT } from "@/lib/shows";

// Pre-render a page for every known show at build time
export function generateStaticParams() {
  return SHOWS.map((show) => ({ slug: show.slug }));
}

// Per-page SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = getShowBySlug(slug);
  if (!show) return { title: "Show Not Found" };

  const title = `${show.title} — Dr. Hilary Okello`;
  const description = show.description.slice(0, 155);
  const imageUrl = `https://www.hilaryokello.com${show.image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: show.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ShowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = getShowBySlug(slug);
  if (!show) notFound();

  const contact = show.contactNumber ?? DEFAULT_CONTACT;
  const waLink = `https://wa.me/${contact.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello, I'm interested in tickets for ${show.title} in ${show.city}, ${show.country}`,
  )}`;

  const hasTicketLink = show.link !== "#";

  // Find adjacent shows for prev/next navigation
  const allSlugs = SHOWS.map((s) => s.slug);
  const currentIndex = allSlugs.indexOf(slug);
  const prevShow = currentIndex > 0 ? SHOWS[currentIndex - 1] : null;
  const nextShow =
    currentIndex < SHOWS.length - 1 ? SHOWS[currentIndex + 1] : null;

  return (
    <main className="text-white">
      {/* Hero */}
      <div className="relative h-[55vh] sm:h-[65vh] w-full">
        <Image
          fill
          priority
          alt={show.title}
          className="object-cover"
          quality={85}
          sizes="100vw"
          src={show.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Back link */}
        <Link
          href="/#shows"
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm font-medium z-10"
        >
          <ChevronLeft className="h-4 w-4" />
          All Shows
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-10">
          {show.featured && (
            <span className="inline-block mb-3 px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-bold tracking-wide">
              FEATURED SHOW
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            {show.title}
          </h1>
          <p className="mt-2 text-white/75 text-base sm:text-lg">
            {show.city}, {show.country}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        {/* Two-column layout: details left, description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10">
          {/* Left — event details */}
          <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-white/50 text-xs mb-1">Date</p>
                <p className="text-white font-semibold">{show.dateLabel}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-white/50 text-xs mb-1">Time</p>
                <p className="text-white font-semibold">{show.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-white/50 text-xs mb-1">Venue</p>
                <p className="text-white font-semibold">{show.location}</p>
                <p className="text-white/60 text-sm mt-0.5">
                  {show.city}, {show.country}
                </p>
              </div>
            </div>

            {show.ticketPrice && (
              <div className="flex items-start gap-4">
                <Ticket className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/50 text-xs mb-1">Tickets</p>
                  <p className="text-white font-semibold">{show.ticketPrice}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right — description + CTAs */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              About This Show
            </h2>
            <p className="text-white/75 leading-relaxed text-base sm:text-lg mb-8">
              {show.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              {hasTicketLink ? (
                <a
                  href={show.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base rounded-full transition-all hover:scale-105"
                >
                  Get Tickets Now
                  <ChevronRight className="h-5 w-5" />
                </a>
              ) : (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base rounded-full transition-all hover:scale-105"
                >
                  Book via WhatsApp
                  <ChevronRight className="h-5 w-5" />
                </a>
              )}

              <Link
                href="/#shows"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-medium text-base rounded-full transition-all"
              >
                View All Shows
              </Link>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(prevShow || nextShow) && (
          <nav className="mt-14 pt-8 border-t border-white/10 flex justify-between gap-4">
            {prevShow ? (
              <Link
                href={`/shows/${prevShow.slug}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm max-w-[45%]"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">{prevShow.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextShow ? (
              <Link
                href={`/shows/${nextShow.slug}`}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm max-w-[45%] text-right"
              >
                <span className="truncate">{nextShow.title}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
