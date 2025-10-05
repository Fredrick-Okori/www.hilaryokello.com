"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

const UpcomingShows = () => {
  const imageDimension = 500;
  const today = new Date();

  // Date parsing function
  const parseDate = (dateString: string) => {
    return new Date(Date.parse(dateString));
  };

  // Ticket Info
  const ticketInfo1 = {
    dateLabel: "7th November 2025",
    date: parseDate("2025-11-07T19:30:00"),
    time: "7:30 PM - 10:30 PM",
    location: "Theatre La Bonita - Kampala",
    ticketPrice: "40K Single | 60K A Pair",
    image: "/gallery/Uganda-Must-Laugh-Grand-Finale---Dr.-Lighter-Frame.webp",
    link: "https://karitickets.com/event/UGANDA_MUST_LAUGH-_Grand_Finale",
    description:
      "After a year of unstoppable laughter, the biggest comedy movement in the land comes back for one last thunderous night! Dr Hilary Okello returns in this Grand Finale bringing together Uganda’s finest comedians, epic performances, and unforgettable moments of madness. It’s not just a show—it’s history in the making. Come ready to laugh, scream, and celebrate Ugandan comedy at its peak!",
  };

  const ticketInfo2 = {
    dateLabel: "30th May 2025",
    date: parseDate("2025-05-30T19:00:00"),
    time: "7:00 PM - Late",
    location: "Scream Night Club - Lusaka",
    ticketPrice: "VIP K500 | Standard K200 | Double K300",
    image: "/zambian_show.jpeg",
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
          <h2 className="text-left text-3xl sm:text-4xl text-white font-bold">
            Upcoming Show <ChevronRight className="inline-block ml-2" />
          </h2>
          <h4 className="text-left text-3xl sm:text-4xl text-white font-bold">
            Grand Finale - Uganda Must Laugh 
          </h4>
          <Button
            className="rounded-full text-white px-6 py-3 mt-4"
            variant="bordered"
            target="_blank"
            as={Link}
            href="https://karitickets.com/event/UGANDA_MUST_LAUGH-_Grand_Finale"
          >
            Buy Ticket Now
             <ChevronRight className="mr-2 h-5 w-5" />
          </Button>

          <div className="flex flex-col lg:flex-row mt-10 gap-8 items-center">
          <div className="relative w-full lg:w-1/2">
  <div className="absolute inset-0 z-0 rounded-2xl glow-border" />
  <Image
    alt="Uganda Must Laugh II"
    className="relative z-10 rounded-2xl object-cover"
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
              
                Tickets: {ticketInfo1.ticketPrice}
              </p>
              <Button
            className="rounded-full text-white mt-4"
            variant="bordered"
            as={Link}
            target="_blank"
            href="https://karitickets.com/event/UGANDA_MUST_LAUGH-_Grand_Finale"
          >
            Buy Tickets Now
             <ChevronRight className="mr-2 h-5 w-5" />
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
                Tickets: {ticketInfo2.ticketPrice}
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
