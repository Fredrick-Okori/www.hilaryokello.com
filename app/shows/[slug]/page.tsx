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
    <main className="text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-14">

        {/* Back link */}
        <Link
          href="/#shows"
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm font-medium mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          All Shows
        </Link>

        {/* Title + date header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-10">
          <div>
            {show.featured && (
              <span className="inline-block mb-3 px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-bold tracking-wide">
                FEATURED SHOW
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {show.title}
            </h1>
            <p className="mt-2 text-white/60 text-base">
              {show.city}, {show.country}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-yellow-500">
              {show.dateLabel}
            </span>
            <span className="text-white/60 text-sm">{show.time}</span>
          </div>
        </div>

        {/* Side-by-side: image left, details right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left — image */}
          <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              priority
              alt={show.title}
              className="w-full h-auto block"
              height={900}
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={show.image}
              width={600}
            />
          </div>

          {/* Right — details + description + CTAs */}
          <div className="flex flex-col gap-6">

            {/* Event details card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-5">
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

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-white mb-2">About This Show</h2>
              <p className="text-white/70 leading-relaxed text-base">
                {show.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
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
