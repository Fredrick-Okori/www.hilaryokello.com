import React from "react";
import { FaTwitter, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex justify-center gap-5 items-center">
        <div className="flex space-x-4">
          <a
            href="https://twitter.com/DrHilaryOkello"
            rel="noopener noreferrer"
            target="_blank"
          >
            <BsTwitterX className="hover:text-blue-400" size={24} />
          </a>
          <a
            href="https://www.youtube.com/@drhilaryokello"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaYoutube className="hover:text-red-600" size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@drhilary_okello?_t=ZM-8vVQayDX5aZ&_r=1"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaTiktok className="hover:text-pink-600" size={24} />
          </a>
          <a
            href="https://www.instagram.com/drhilaryokello/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaInstagram className="hover:text-purple-600" size={24} />
          </a>
        </div>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Dr. Hilary Okello. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
