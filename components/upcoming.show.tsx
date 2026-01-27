"use client";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";
import { ChevronRight, X, MapPin, Calendar, Clock, Ticket } from "lucide-react";

// --- Type Definition ---
interface Show {
  id: number;
  title: string;
  dateLabel: string;
  date: Date;
  time: string;
  location: string;
  country: string;
  city: string;
  ticketPrice: string;
  image: string;
  link: string;
  description: string;
  featured: boolean;
  contactNumber?: string;
}

// --- Data Preparation (Optimized for performance) ---
const parseDate = (dateString: string) => new Date(Date.parse(dateString));
const TODAY = new Date();

// Raw data structured for easy reading
const RAW_SHOWS: (Omit<Show, "date"> & { date: string })[] = [
 
  {
    id: 2,
    title: "Jokes From Far Away | Lusaka, Zambia",
    dateLabel: "Mar 06, 2026",
    date: "2026-03-06T19:00:00",
    time: "7:00 PM",
    location: "Mikaela Gardens, Woodlands",
    city: "Lusaka",
    country: "Zambia",
    ticketPrice: "Singles K800 | Doubles K1,500",
    image: "/shows/lusaka_tour.jpg",
    link: "https://www.webtickets.co.zm/v2/Event.aspx?itemid=1463491291",
    description:
      "Get ready for a night of nonstop laughter as Jokes From Far Away lands in Zambia! This comedy showcase brings bold humor, relatable African stories, and cross-border punchlines that hit home—no matter where you’re from.",
    featured: true,
  },
  
];

// Final shows array with Date objects
const ALL_SHOWS: Show[] = RAW_SHOWS.map((show) => ({
  ...show,
  date: parseDate(show.date),
}));

const CustomButton = ({
  onClick,
  children,
  className = "",
  disabled = false,
  as,
  href,
  target,
}: any) => {
  const baseClasses =
    "flex items-center justify-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold disabled:opacity-50 disabled:cursor-not-allowed";

  const combinedClasses = `${baseClasses} ${className}`;

  if (as === "a" || href) {
    // Add safe rel when opening in a new tab
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;
    return (
      <a
        className={combinedClasses}
        href={href}
        rel={rel}
        target={target || "_self"}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
// --- Utility Functions ---

 const phoneNumber = "+211922064459"; // Replace with Dr. Hilary Okello's number
  const message =
    "Hello, I'm interested in booking tickets for the upcoming show";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber.replace(
    /[^0-9]/g,
    "",
  )}?text=${encodedMessage}`;

// Use a stable, performant date formatting function
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

// --- Show Item Component (Optimized for list rendering) ---
interface ShowItemProps {
  show: Show;
  onShowClick: (show: Show) => void;
  onBookTickets: (e: React.MouseEvent, link: string) => void;
}

const ShowItem = ({ show, onShowClick, onBookTickets }: ShowItemProps) => {
  const { weekday, month, day } = useMemo(
    () => formatDatePart(show.date),
    [show.date],
  );
  const isTicketLinkAvailable = show.link !== "#";

  const contactNumber = show.contactNumber ?? phoneNumber;
  const waLinkForShow = `https://wa.me/${contactNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello, I'm interested in tickets for ${show.title} in ${show.city}, show`,
  )}`;

  return (
    <div
      // Increased mobile padding for better touch target size
      className="group relative hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onShowClick(show);
      }}
      onClick={() => onShowClick(show)}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Date Section and Info */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-full sm:min-w-[50%]">
          {/* Fixed width date container for stable alignment */}
          <div className="text-center min-w-[80px]">
            <div className="text-xs text-white/50 font-medium tracking-wider">
              {weekday}
            </div>
            <div className="text-3xl font-extrabold text-white-400">{day}</div>
            <div className="text-sm text-white/70 font-semibold">{month}</div>
          </div>

          {/* Show Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 truncate">
              {show.city}, {show.country}
            </h3>
            <p className="text-white/70 text-sm sm:text-base truncate">
              {show.location} • {show.time}
            </p>
            {show.featured && (
              <span className="inline-block mt-2 px-3 py-1 bg-gold/30 text-gold-light rounded-full text-xs font-medium">
                FEATURED EVENT
              </span>
            )}
          </div>
        </div>

        {/* Tickets Button (Aligns right on desktop, stretches on mobile for touch) */}
        <div className="flex justify-end sm:justify-start">
          {isTicketLinkAvailable ? (
            <CustomButton
              className="rounded-full bg-gold hover:bg-gold-light text-black font-bold px-6 py-2 text-sm transition-all min-w-[120px] w-auto"
              onClick={(e: React.MouseEvent) => onBookTickets(e, show.link)}
            >
              Get Tickets
              <ChevronRight className="ml-1 h-4 w-4" />
            </CustomButton>
          ) : (
            <CustomButton
              className="rounded-full bg-gold hover:bg-gold-light text-black font-bold px-6 py-2 text-sm transition-all min-w-[120px] w-auto"
              href={waLinkForShow}
              target="_blank"
            >
              WhatsApp
              <ChevronRight className="ml-1 h-4 w-4" />
            </CustomButton>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const UpcomingShows = () => {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Performance: Filter and sort upcoming shows using useMemo
  const upcomingShows = useMemo(() => {
    return ALL_SHOWS.filter(
      (show) => show.date.getTime() > TODAY.getTime(),
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, []);

  // Performance: Stable function references using useCallback
  const handleShowClick = useCallback((show: Show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay setting selectedShow to null to allow for potential exit animations
    setTimeout(() => setSelectedShow(null), 300);
  }, []);

  const handleBookTickets = useCallback((e: React.MouseEvent, link: string) => {
    e.stopPropagation(); // Prevent opening the modal
    if (link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  }, []);

  // --- Render List and Modal ---
  return (
    <div className="font-sans min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-4xl sm:text-5xl text-white font-extrabold mb-12">
          Jokes From Far Away 2026 World Tour
        </h2>

        {/* Shows List or No Shows Message */}
        {upcomingShows.length === 0 ? (
          <div className="mb-16 text-center">
            <h3 className="text-2xl sm:text-3xl text-white font-bold mb-3">
              New Shows Coming Soon!
            </h3>
            <p className="text-lg text-white/70">
              Stay tuned for upcoming tour dates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingShows.map((show) => (
              <ShowItem
                key={show.id}
                show={show}
                onBookTickets={handleBookTickets}
                onShowClick={handleShowClick}
              />
            ))}
          </div>
        )}

        {/* Join Email List CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-white/10 p-8 sm:p-12 shadow-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-white">
            Want Me to Perform in Your City?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Join the &quot;Jokes From Far Away&quot; World Tour! Tell us where you want 
            Dr. Okello to perform next. High-demand cities influence our tour planning!
          </p>

          {/* Join Email List Button */}
          <Button
            as="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfJtqtEE96Z7VMjrEWPMJnAuGV0ozURLy5iFvbsCImEw5VTGA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-black font-bold text-lg rounded-full transition-all transform hover:scale-105"
          >
            Click to Register your City
            <ChevronRight className="h-5 w-5" />
          </Button>

          <p className="text-xs text-white/50 mt-6">
            We respect your privacy. Your information will only be used to plan tour locations.
          </p>
        </div>
      </div>

      {/* Modal - Render only when open for efficiency */}
      {isModalOpen && selectedShow && (
        <div
          // High responsiveness: Full screen on mobile, centered box on desktop
          className="fixed inset-0 bg-black backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            // Close only when overlay itself is clicked (not inner modal)
            if (e.target === e.currentTarget) closeModal();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "Escape")
              closeModal();
          }}
        >
          <div
            // Ensures full height on mobile (h-full), max height on desktop
            aria-modal="true"
            className="bg-black border border-white/10 rounded-none sm:rounded-2xl max-w-4xl w-full h-full sm:max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ease-out"
            role="dialog"
            tabIndex={-1}
          >
            {/* Modal Header with Image */}
            <div className="relative h-72 sm:h-80 w-full">
              {/* Performance: Prioritize loading the main modal image */}
              {/* eslint-disable-next-line react/jsx-sort-props */}
              <Image
                src={selectedShow.image}
                fill
                priority
                alt={selectedShow.title}
                className="object-cover rounded-t-none sm:rounded-t-2xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px" // Image optimization
              />
              {/* Gradient for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent rounded-t-none sm:rounded-t-2xl" />

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-2 bg-black hover:bg-black/70 rounded-full transition-colors z-10"
                onClick={closeModal}
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {selectedShow.title}
                </h3>
                {selectedShow.featured && (
                  <span className="inline-block px-3 py-1 bg-gold/20 text-gold-light rounded-full text-sm font-medium">
                    FEATURED SHOW
                  </span>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {/* Event Details Grid (Responsive) */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 mb-8">
                {/* Date */}
                <div className="flex items-start gap-3 col-span-2 sm:col-span-1">
                  <Calendar className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <p className="text-white/50 text-sm">Date</p>
                    <p className="text-white font-medium">
                      {selectedShow.dateLabel}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <p className="text-white/50 text-sm">Time</p>
                    <p className="text-white font-medium">
                      {selectedShow.time}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3 col-span-2 sm:col-span-1">
                  <MapPin className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <p className="text-white/50 text-sm">Venue</p>
                    <p className="text-white font-medium">
                      {selectedShow.location}
                    </p>
                    <p className="text-white/70 text-sm">
                      {selectedShow.city}, {selectedShow.country}
                    </p>
                  </div>
                </div>

                {/* Tickets */}
                <div className="flex items-start gap-3">
                  <Ticket className="h-5 w-5 text-gold mt-0.5" />
                  <div>
                    <p className="text-white/50 text-sm">Tickets</p>
                    <p className="text-white font-medium">
                      {selectedShow.ticketPrice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-3">
                  About This Show
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {selectedShow.description}
                </p>
              </div>

              {/* Action Buttons (Sticky footer on mobile for touch UX) */}
              <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-black py-3 sm:static sm:bg-transparent sm:py-0 border-t sm:border-t-0 border-white/5">
                {selectedShow.link !== "#" ? (
                  <Button
                    as={Link}
                    className="flex bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-full transition-all w-full"
                    href={selectedShow.link}
                    target="_blank"
                  >
                    Get Tickets Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    as="a"
                    className="flex bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-full transition-all w-full"
                    href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello, I'm interested in tickets for ${selectedShow.title} in ${selectedShow.city}, ${selectedShow.country}`,
                    )}`}
                    target="_blank"
                  >
                    Contact on WhatsApp
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                <Button
                  className="flex border-white/20 text-white hover:bg-white/10 font-medium py-3 px-6 rounded-full transition-all w-full"
                  variant="bordered"
                  onClick={closeModal}
                >
                  Close Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingShows;
