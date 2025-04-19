"use client";
import Image from "next/image";
import { Button } from "@heroui/button";

const UpcomingShows = () => {
  const imageDimension = 500;
  const today = new Date();

  // Date parsing function
  const parseDate = (dateString: string) => {
    return new Date(Date.parse(dateString));
  };

  // Ticket Info
  const ticketInfo1 = {
    dateLabel: "18th April 2025",
    date: parseDate("2025-04-18T19:30:00"),
    time: "7:30 PM - 10:30 PM",
    location: "Donels Bistro & Lounge",
    ticketsAvailable: "50 seats",
    ticketPrice: "25k",
    image: "/liveatthestork.webp",
    link: "https://karitickets.com/event/LIVE_AT_THE_STORK%3A_HILARY_OKELLO",
    description:
      "Join us for a night of live entertainment at the Stork. This show features the best performances and is not to be missed.",
  };

  const ticketInfo2 = {
    dateLabel: "30th May 2025",
    date: parseDate("2025-05-30T19:00:00"),
    time: "7:00 PM - Late",
    location: "Mikaela Events - Lusaka",
    ticketPrice: "K500",
    image: "/zambia_uganda.jpeg",
    link: "https://www.webtickets.co.zm/v2/Event.aspx?itemid=1463445131",
    description:
      "Zambia vs Uganda comedy show, a night of unstoppable laughter ft: Inspector Pamela, live music, explode band.",
  };

  const handleBookTickets = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8">
      {/* First Show */}
      {ticketInfo1.date > today && (
        <div>
          <h4 className="text-left text-3xl sm:text-4xl text-white font-bold">
            Upcoming Show: Live at the Stork
          </h4>
          <Button
            className="rounded-full text-white px-4 py-2 mt-4"
            variant="bordered"
            onClick={() => handleBookTickets(ticketInfo1.link)}
          >
            Buy Ticket Now
          </Button>

          <div className="flex flex-col lg:flex-row mt-10 gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <Image
                alt="Live at the Stork"
                className="w-full h-auto rounded-2xl object-cover"
                height={imageDimension}
                src={ticketInfo1.image}
                width={imageDimension}
              />
            </div>
            <div className="w-full lg:w-1/2 p-2 sm:p-4">
              <h5 className="text-left text-2xl text-white font-bold">
                Show Description
              </h5>
              <p className="text-left text-lg text-white mt-4">
                {ticketInfo1.description}
              </p>
              <h5 className="text-left text-2xl text-white font-bold mt-8">
                Ticket Information
              </h5>
              <p className="text-left text-lg text-white mt-4">
                {ticketInfo1.dateLabel} • {ticketInfo1.time} <br />
                Location: {ticketInfo1.location} <br />
                Tickets Available: {ticketInfo1.ticketsAvailable} <br />
                Price: {ticketInfo1.ticketPrice}
              </p>
              <Button
                className="rounded-full text-white px-4 py-2 mt-8"
                variant="bordered"
                onClick={() => handleBookTickets(ticketInfo1.link)}
              >
                Get Ticket Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Second Show */}
      {ticketInfo2.date > today && (
        <div className="mt-20">
          <h4 className="text-left text-3xl sm:text-4xl text-white font-bold">
            Upcoming Show: Mikaela Events - Lusaka
          </h4>
          <Button
            className="rounded-full text-white px-4 py-2 mt-4"
            variant="bordered"
            onClick={() => handleBookTickets(ticketInfo2.link)}
          >
            Buy Ticket Now
          </Button>

          <div className="flex flex-col lg:flex-row mt-10 gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <Image
                alt="Live at Central Park"
                className="rounded-2xl object-cover"
                height={200}
                src={ticketInfo2.image}
                width={400}
              />
            </div>
            <div className="w-full lg:w-1/2 p-2 sm:p-4">
              <h5 className="text-left text-2xl text-white font-bold">
                Show Description
              </h5>
              <p className="text-left text-lg text-white mt-4">
                {ticketInfo2.description}
              </p>
              <h5 className="text-left text-2xl text-white font-bold mt-8">
                Ticket Information
              </h5>
              <p className="text-left text-lg text-white mt-4">
                {ticketInfo2.dateLabel} • {ticketInfo2.time} <br />
                Location: {ticketInfo2.location} <br />
                Price: {ticketInfo2.ticketPrice}
              </p>
              <Button
                className="rounded-full text-white px-4 py-2 mt-8"
                variant="bordered"
                onClick={() => handleBookTickets(ticketInfo2.link)}
              >
                Get Ticket Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingShows;
