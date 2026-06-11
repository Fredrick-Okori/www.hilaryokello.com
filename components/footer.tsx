import React from "react";
import { FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto flex flex-col gap-6 items-center">
        {/* Social Media Links */}
        <nav aria-label="Social media" className="flex space-x-6">
          <a
            aria-label="Visit Dr. Hilary Okello on Twitter"
            className="text-white hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black rounded-full p-2"
            href="https://twitter.com/DrHilaryOkello"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BsTwitterX className="hover:text-gold-light" size={24} />
          </a>
          <a
            aria-label="Visit Dr. Hilary Okello on YouTube"
            className="text-white hover:text-red transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black rounded-full p-2"
            href="https://www.youtube.com/@drhilaryokello"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaYoutube className="hover:text-red-light" size={24} />
          </a>
          <a
            aria-label="Visit Dr. Hilary Okello on TikTok"
            className="text-white hover:text-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black rounded-full p-2"
            href="https://www.tiktok.com/@drhilary_okello?_t=ZM-8vVQayDX5aZ&_r=1"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTiktok className="hover:text-pink-400" size={24} />
          </a>
          <a
            aria-label="Visit Dr. Hilary Okello on Instagram"
            className="text-white hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black rounded-full p-2"
            href="https://www.instagram.com/drhilaryokello/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaInstagram className="hover:text-purple-400" size={24} />
          </a>
        </nav>

        {/* Copyright and Attribution */}
        <div className="text-center text-sm space-y-2">
          <p>
            &copy; {new Date().getFullYear()} Dr. Hilary Okello. All rights
            reserved.
          </p>
          <p>
            <a
              className="text-gold hover:text-gold-light transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded px-1"
              href="https://www.kayetickets.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Powered by KayeTickets
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
