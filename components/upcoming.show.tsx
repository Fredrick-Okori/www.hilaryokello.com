'use client'
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';

const UpcomingShows = () => {
  const imageDimension = 500;

  // Example ticket booking information
  const ticketInfo = {
    date: '2023-12-25',
    time: '7:30 PM - 10:30 PM',
    location: 'Donels Bistro & Lounge',
    ticketsAvailable: "50 seats",
    ticketPrice: '25k',
  };

  // Function to open the ticket booking site in a new tab
  const handleBookTickets = () => {
    window.open('https://karitickets.com/event/LIVE_AT_THE_STORK%3A_HILARY_OKELLO', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8">
      <div>
        <h4 className='text-left text-3xl sm:text-4xl text-white font-bold'>
          Upcoming Show: Live at the Stork
        </h4>
        <Button variant='bordered'
          
          onClick={handleBookTickets}
        className='rounded-full text-white px-4 py-2 mt-4'>
          Buy Ticket Now
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row mt-10 gap-8 items-center">
        <div className="w-full lg:w-1/2">
          <Image 
            src='/liveatthestork.jpeg'
            alt='Live at the Stork'
            width={imageDimension} 
            height={imageDimension} 
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-2 sm:p-4">
          <h5 className='text-left text-2xl text-white font-bold'> Show Description </h5>
          <p className='text-left text-lg text-white mt-4'>
            Join us for a night of live entertainment at the Stork. This show features the best performances and is not to be missed.
          </p>
          <h5 className='text-left text-2xl text-white font-bold mt-8'> Ticket Information </h5>
          <p className='text-left text-lg text-white mt-4'>
            {ticketInfo.date} • {ticketInfo.time} <br />
            Location: {ticketInfo.location} <br />
            Tickets Available: {ticketInfo.ticketsAvailable} <br />
            Price: {ticketInfo.ticketPrice}
          </p>
          <Button 
            variant='bordered' 
            className='rounded-full text-white px-4 py-2 mt-8' 
            onClick={handleBookTickets}
          >
            Get Ticket Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingShows;
