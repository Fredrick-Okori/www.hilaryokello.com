"use client";
import Image from "next/image";
import { Button } from "@heroui/button";

const UpcomingShows = () => {
  const imageDimension = 500;

  // Example ticket booking information for the first show
  const ticketInfo1 = {
    date: "2023-12-25",
    time: "7:30 PM - 10:30 PM",
    location: "Donels Bistro & Lounge",
    ticketsAvailable: "50 seats",
    ticketPrice: "25k",
  };

  // Example ticket booking information for the second show
  const ticketInfo2 = {
    date: "30th May 2025",
    time: "19:00 PM - Late",
    location: "Mikaela Events - Lusaka",
    ticketPrice: "K500",
  };

  // Function to open the ticket booking site for the first show in a new tab
  const handleBookTickets1 = () => {
    window.open(
      "https://karitickets.com/event/LIVE_AT_THE_STORK%3A_HILARY_OKELLO",
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Function to open the ticket booking site for the second show in a new tab
  const handleBookTickets2 = () => {
    window.open(
      "https://www.webtickets.co.zm/v2/Event.aspx?itemid=1463445131",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8">
      <div>
        <h4 className="text-left text-3xl sm:text-4xl text-white font-bold">
          Upcoming Show: Live at the Stork
        </h4>
        <Button
          className="rounded-full text-white px-4 py-2 mt-4"
          variant="bordered"
          onClick={handleBookTickets1}
        >
          Buy Ticket Now
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <Image
            alt="Live at the Stork"
            className="w-full h-auto rounded-2xl object-cover"
            height={imageDimension}
            src="/liveatthestork.jpeg"
            width={imageDimension}
          />
        </div>
        <div className="w-full lg:w-1/2 p-2 sm:p-4">
          <h5 className="text-left text-2xl text-white font-bold">
            {" "}
            Show Description{" "}
          </h5>
          <p className="text-left text-lg text-white mt-4">
            Join us for a night of live entertainment at the Stork. This show
            features the best performances and is not to be missed.
          </p>
          <h5 className="text-left text-2xl text-white font-bold mt-8">
            {" "}
            Ticket Information{" "}
          </h5>
          <p className="text-left text-lg text-white mt-4">
            {ticketInfo1.date} • {ticketInfo1.time} <br />
            Location: {ticketInfo1.location} <br />
            Tickets Available: {ticketInfo1.ticketsAvailable} <br />
            Price: {ticketInfo1.ticketPrice}
          </p>
          <Button
            className="rounded-full text-white px-4 py-2 mt-8"
            variant="bordered"
            onClick={handleBookTickets1}
          >
            Get Ticket Now
          </Button>
        </div>
      </div>

      {/* Second Show Section */}
      <div className="mt-20">
        <div>
          <h4 className="text-left text-3xl sm:text-4xl text-white font-bold">
            Upcoming Show: Mikaela Events - Lusaka
          </h4>
          <Button
            className="rounded-full text-white px-4 py-2 mt-4"
            variant="bordered"
            onClick={handleBookTickets2}
          >
            Buy Ticket Now
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row mt-10 gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <Image
              alt="Live at Central Park"
              className=" rounded-2xl object-cover"
              height={200}
              src="/zambia_uganda.jpeg"
              width={400}
            />
          </div>
          <div className="w-full lg:w-1/2 p-2 sm:p-4">
            <h5 className="text-left text-2xl text-white font-bold">
              {" "}
              Show Description{" "}
            </h5>
            <p className="text-left text-lg text-white mt-4">
              Zambia vs Uganda comedy show, a night of unstoppable laughter
              ft: Inspector Pamela, live music, explode band
            </p>
            <h5 className="text-left text-2xl text-white font-bold mt-8">
              {" "}
              Ticket Information{" "}
            </h5>
            <p className="text-left text-lg text-white mt-4">
              {ticketInfo2.date} • {ticketInfo2.time} <br />
              Location: {ticketInfo2.location} <br />
              Price: {ticketInfo2.ticketPrice}
            </p>
            <Button
              className="rounded-full text-white px-4 py-2 mt-8"
              variant="bordered"
              onClick={handleBookTickets2}
            >
              Get Ticket Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingShows;
