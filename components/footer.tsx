import React from 'react';
import { FaTwitter, FaYoutube, FaTiktok, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto flex justify-center gap-5 items-center">
                <div className="flex space-x-4">
                    <a href="https://twitter.com/DrHilaryOkello" target="_blank" rel="noopener noreferrer">
                        <FaTwitter size={24} className="hover:text-blue-400" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCDrHilaryOkello" target="_blank" rel="noopener noreferrer">
                        <FaYoutube size={24} className="hover:text-red-600" />
                    </a>
                    <a href="https://www.tiktok.com/@drhilaryokello" target="_blank" rel="noopener noreferrer">
                        <FaTiktok size={24} className="hover:text-pink-600" />
                    </a>
                    <a href="https://www.instagram.com/drhilaryokello/" target="_blank" rel="noopener noreferrer">
                        <FaInstagram size={24} className="hover:text-purple-600" />
                    </a>
                </div>
                <div className="text-center text-sm">
                    &copy; {new Date().getFullYear()} Dr. Hilary Okello. All rights reserved. 
                </div>
            </div>
        </footer>
    );
}
