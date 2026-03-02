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
    id: 1,
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
      "Get ready for a night of nonstop laughter as Jokes From Far Away lands in Zambia! This comedy showcase brings bold humor, relatable African stories, and cross-border punchlines that hit home—no matter where you're from.",
    featured: true,
  },
   {
    id: 2,
    title: "Friday | Lavington: Jokes From Far Away",
    dateLabel: "Apri 10, 2026",
    date: "2026-04-10T19:30:00",
    time: "7:30 PM",
    location: "Levels Hotel, Kingara Rd",
    city: "Friday - Nairobi",
    country: "Kenya",
    ticketPrice: "Early Bird JFFA - KES 1500",
   image: "/tour/jffa_nairobi_kenya.jpg",
    link: "https://standupcollective.co.ke/buytickets?event=LAVINGTON%3a%20JOKES%20FROM%20FAR%20AWAY%20-%20DR.%20Hilary%20Okello%20-%20Friday",
    description:
      "Jokes From Far Away is Dr. Hilary Okello’s global comedy tour, and Nairobi is next. After touring stages around the world, the Ugandan comedian brings his sharp observations, smart storytelling, and outsider-insider perspective to Nairobi for two nights only. Fresh, thoughtful, and very funny. Dr. Hilary in 6 short years has gone from administering medicine to administering laughter on stages all over the continent.",
    featured: false,
  },
   {
    id: 3,
    title: "Saturday | Lavington: Jokes From Far Away",
    dateLabel: "Apri 11, 2026",
    date: "2026-04-11T19:30:00",
    time: "7:30 PM",
    location: "Levels Hotel, Kingara Rd",
    city: " Saturday - Nairobi",
    country: "Kenya",
    ticketPrice: "Early Bird JFFA - KES 1500",
   image: "/tour/jffa_nairobi_kenya.jpg",
    link: "https://standupcollective.co.ke/buytickets?event=LAVINGTON%3a%20JOKES%20FROM%20FAR%20AWAY%20-%20DR.%20Hilary%20Okello%20-%20Saturday",
    description:
      "Jokes From Far Away is Dr. Hilary Okello’s global comedy tour, and Nairobi is next. After touring stages around the world, the Ugandan comedian brings his sharp observations, smart storytelling, and outsider-insider perspective to Nairobi for two nights only. Fresh, thoughtful, and very funny. Dr. Hilary in 6 short years has gone from administering medicine to administering laughter on stages all over the continent.",
    featured: false,
  },
   {
    id: 4,
    title: "THURSDAY | Dar es Salaam: Jokes From Far Away",
    dateLabel: "Apri 16, 2026",
    date: "2026-04-16T20:00:00",
    time: "8:00 PM",
    location: "The Punchline Comedy Club",
    city: " Thursday - Dar es Salaam",
    country: "Tanzania",
    ticketPrice: "",
   image: "/tour/Dar _converted.avif",
    link: "#",
    description:
      "Jokes From Far Away is Dr. Hilary Okello’s global comedy tour, and Nairobi is next. After touring stages around the world, the Ugandan comedian brings his sharp observations, smart storytelling, and outsider-insider perspective to Nairobi for two nights only. Fresh, thoughtful, and very funny. Dr. Hilary in 6 short years has gone from administering medicine to administering laughter on stages all over the continent.",
    featured: false,
    contactNumber: "+255654035555",
  },
   {
    id: 5,
    title: "Saturday | Arusha: Jokes From Far Away",
    dateLabel: "Apri 18, 2026",
    date: "2026-04-18T20:00:00",
    time: "8:00 PM",
    location: "Twiga Brewery, Aim Mall Arusha",
    city: " Saturday - Arusha",
    country: "Tanzania",
    ticketPrice: "",
   image: "/tour/Arusha_converted.avif",
    link: "#",
    description:
      "Jokes From Far Away is Dr. Hilary Okello’s global comedy tour, and Nairobi is next. After touring stages around the world, the Ugandan comedian brings his sharp observations, smart storytelling, and outsider-insider perspective to Nairobi for two nights only. Fresh, thoughtful, and very funny. Dr. Hilary in 6 short years has gone from administering medicine to administering laughter on stages all over the continent.",
    featured: false,
    contactNumber: "+255621383543",
  },
  {
    id: 6,
    title: "Holy Thursday | Lira",
    dateLabel: "Apr 02, 2026",
    date: "2026-04-02T19:00:00",
    time: "7:00 PM",
    location: "Lira Hotel",
    city: "Holy Thursday | Lira",
    country: "Uganda",
    ticketPrice: "Early Bird 20k | Gate 30k | VIP 50k",
    image: "/tour/lira.avif",
    link: "#",
    description:
      "West Nile & Northern Uganda tour kickoff in Lira. Venue and ticket details will be announced soon.",
    featured: false,
    contactNumber: "+256768202585",
  },
  {
    id: 7,
    title: "Good Friday | Koboko",
    dateLabel: "Apr 03, 2026",
    date: "2026-04-03T19:00:00",
    time: "7:00 PM",
    location: "Corporate Villa",
    city: "Good Friday | Koboko",
    country: "Uganda",
    ticketPrice: "Early Bird 20k | Gate 30k | VIP 50k | Table of 5 300k",
    image: "/tour/koboko.avif",
    link: "#",
    description:
      "West Nile & Northern Uganda tour continues in Koboko. Venue and ticket details will be announced soon.",
    featured: false,
    contactNumber: "+256775691441",
  },
  {
    id: 8,
    title: "Saturday | Arua",
    dateLabel: "Apr 04, 2026",
    date: "2026-04-04T19:00:00",
    time: "7:00 PM",
    location: "Tropical Suites",
    city: "Arua",
    country: "Uganda",
    ticketPrice: "Early Bird 20k | Gate 30k | VIP 50k | Silver 500k | Gold 500k | Platinum 1M",
    image: "/tour/arua.avif",
    link: "#",
    description:
      "West Nile & Northern Uganda tour stop in Arua. Venue and ticket details will be announced soon.",
    featured: false,
    contactNumber: "+256786314004",
  },
  {
    id: 9,
    title: "Easter Sunday | Soroti",
    dateLabel: "Apr 05, 2026",
    date: "2026-04-05T19:00:00",
    time: "7:00 PM",
    location: "Cloud 9",
    city: "Easter Sunday | Soroti",
    country: "Uganda",
    ticketPrice: "Early Bird 15k | Gate 20k | VIP 40k | Table of 8 500k | Table of 5 300k",
    image: "/tour/soroti.avif",
    link: "#",
    description:
      "Easter Sunday show in Soroti on the West Nile & Northern Uganda tour. Venue and ticket details will be announced soon.",
    featured: false,
    contactNumber: "+256774945737",
  },
  {
    id: 10,
    title: "Easter Monday | Gulu",
    dateLabel: "Apr 06, 2026",
    date: "2026-04-06T19:00:00",
    time: "7:00 PM",
    location: "Bomah Hotel",
    city: "Easter Monday | Gulu",
    country: "Uganda",
    ticketPrice: "TBA",
    image: "/tour/gulu.avif",
    link: "#",
    description:
      "Final show of the West Nile & Northern Uganda tour in Gulu. Venue and ticket details will be announced soon.",
    featured: false,
    contactNumber: "+256768202585",
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

// Phone number for WhatsApp bookings
const phoneNumber = "+211922064459"; // Replace with Dr. Hilary Okello's number

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
      className="group relative hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl focus-within:ring-2 focus-within:ring-gold"
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
          <div className="text-center min-w-[80px]">
            <div className="text-xs text-white/60 font-medium tracking-wider">
              {weekday}
            </div>
            <div className="text-3xl font-extrabold text-white">{day}</div>
            <div className="text-sm text-white/75 font-semibold">{month}</div>
          </div>

          {/* Show Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 truncate">
              {show.city}, {show.country}
            </h3>
            <p className="text-white/75 text-sm sm:text-base truncate">
              {show.location} • {show.time}
            </p>
            {show.featured && (
              <span className="inline-block mt-2 px-3 py-1 bg-gold text-black rounded-full text-xs font-bold">
                FEATURED EVENT
              </span>
            )}
          </div>
        </div>

        {/* Tickets Button */}
        <div className="flex justify-end sm:justify-start">
          {isTicketLinkAvailable ? (
            <CustomButton
              className="rounded-full bg-yellow-500 hover:bg-gold-light text-black font-bold px-6 py-2 text-sm transition-all min-w-[120px] w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gold"
              onClick={(e: React.MouseEvent) => onBookTickets(e, show.link)}
              aria-label={`Get tickets for ${show.title}`}
            >
              Get Tickets
              <ChevronRight className="ml-1 h-4 w-4" />
            </CustomButton>
          ) : (
            <CustomButton
              className="rounded-full bg-yellow-500 hover:bg-gold-light text-black font-bold px-6 py-2 text-sm transition-all min-w-[120px] w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gold"
              href={waLinkForShow}
              target="_blank"
              aria-label={`Contact via WhatsApp for ${show.title} tickets`}
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
    // Prevent scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedShow(null), 300);
  }, []);

  const handleBookTickets = useCallback((e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    if (link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  }, []);

  // --- Render List and Modal ---
  return (
    <div className="font-sans min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:pt-10 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-8 sm:mb-12 leading-tight">
          Upcoming Shows
        </h2>

         <div className="mt-12 mb-10 sm:mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-12 shadow-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/tour/DR-HILARY-BUGOLOBI-BLACK-VERSION_converted.avif"
                alt="World Tour Map"
                width={800}
                height={400}
                className="rounded-lg sm:rounded-xl w-full h-auto"
                quality={80}
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 text-white text-left leading-tight">
                Kampala | MoTIV Bugolobi
              </h2>
                 <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 text-white text-left leading-tight">
               Jokes from Far Away 
              </h2>
              <p className="text-base sm:text-lg text-white/75 mb-6 sm:mb-8 text-left leading-relaxed">
                The Kampala edition of &quot;Jokes From Far Away&quot; brings the global comedy tour home! Experience Dr. Hilary Okello&lsquo;s sharp wit, bold humor, and relatable African stories right here in Uganda's capital at MoTIV Bugolobi.
              </p>

              {/* Join Email List Button */}
              <div className="flex justify-start">
                <Button
                  as="a"
                  href="https://kayetickets.com/events/dr-hilary-okello-live-jokes-from-far-away-kampala/checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-gold-light text-black font-bold text-base sm:text-lg rounded-full transition-all transform hover:scale-105 focus-gold"
                >
                  Buy Tickets Now
                  <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-white/50 mt-6 text-left">
            Only 200 early bird tickets available. Get yours today.
              </p>
            </div>
          </div>
        </div>

        {upcomingShows.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {upcomingShows.map((show) => (
              <ShowItem
                key={show.id}
                show={show}
                onBookTickets={handleBookTickets}
                onShowClick={handleShowClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-white/70 bg-white/5 border border-white/10 rounded-xl p-8">
            No upcoming shows right now. Check back soon.
          </div>
        )}

        {/* Join Email List CTA Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl sm:rounded-2xl border border-white/10 p-6 sm:p-8 lg:p-12 shadow-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <Image
                src="/tour_countries.jpg"
                alt="World Tour Map"
                width={800}
                height={400}
                className="rounded-lg sm:rounded-xl w-full h-auto"
                quality={80}
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 text-white text-left leading-tight">
                Want Me to Perform in Your City?
              </h2>
              <p className="text-base sm:text-lg text-white/75 mb-6 sm:mb-8 text-left leading-relaxed">
                Join the &quot;Jokes From Far Away&quot; World Tour! Tell us where you
                want Dr. Okello to perform next. High-demand cities influence our
                tour planning!
              </p>

              {/* Join Email List Button */}
              <div className="flex justify-start">
                <Button
                  as="a"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfJtqtEE96Z7VMjrEWPMJnAuGV0ozURLy5iFvbsCImEw5VTGA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-gold-light text-black font-bold text-base sm:text-lg rounded-full transition-all transform hover:scale-105 focus-gold"
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

      {/* Modal - Render only when open for efficiency */}
      {isModalOpen && selectedShow && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
          }}
          role="presentation"
        >
          <div
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="bg-black border border-white/10 rounded-none sm:rounded-2xl max-w-4xl w-full h-full sm:max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ease-out focus:outline-none"
            tabIndex={-1}
          >
            {/* Modal Header with Image */}
            <div className="relative h-72 sm:h-80 w-full">
              <Image
                src={selectedShow.image}
                fill
                priority
                alt={`Show image for ${selectedShow.title}`}
                className="object-cover rounded-t-none sm:rounded-t-2xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent rounded-t-none sm:rounded-t-2xl" />

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-2 bg-gold hover:bg-gold-light text-black rounded-full transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6 z-10">
                <h3 id="modal-title" className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {selectedShow.title}
                </h3>
                {selectedShow.featured && (
                  <span className="inline-block px-3 py-1 bg-gold text-black rounded-full text-sm font-bold">
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
                  <Calendar className="h-5 w-5 text-gold mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-white/65 text-sm">Date</p>
                    <p className="text-white font-medium">
                      {selectedShow.dateLabel}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gold mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-white/65 text-sm">Time</p>
                    <p className="text-white font-medium">
                      {selectedShow.time}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-3 col-span-2 sm:col-span-1">
                  <MapPin className="h-5 w-5 text-gold mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-white/65 text-sm">Venue</p>
                    <p className="text-white font-medium">
                      {selectedShow.location}
                    </p>
                    <p className="text-white/75 text-sm">
                      {selectedShow.city}, {selectedShow.country}
                    </p>
                  </div>
                </div>

                {/* Tickets */}
                <div className="flex items-start gap-3">
                  <Ticket className="h-5 w-5 text-gold mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-white/65 text-sm">Tickets</p>
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
                <p id="modal-description" className="text-white/75 leading-relaxed">
                  {selectedShow.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sticky bottom-0 bg-black py-3 sm:static sm:bg-transparent sm:py-0 border-t sm:border-t-0 border-white/10">
                {selectedShow.link !== "#" ? (
                  <Button
                    as={Link}
                    className="flex bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-full transition-all w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                    href={selectedShow.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Tickets Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    as="a"
                    className="flex bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-full transition-all w-full"
                    href={`https://wa.me/${(selectedShow.contactNumber ?? phoneNumber).replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
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

