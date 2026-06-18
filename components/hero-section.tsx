"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  const phoneNumber = "+256752734280";
  const message =
    "Hello Dr. Hilary Okello, I'm interested in your comedy shows!";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber.replace(
    /[^0-9]/g,
    "",
  )}?text=${encodedMessage}`;

  return (
    <section
      aria-label="Hero section"
      className="w-full h-screen overflow-hidden relative"
    >
      {/* Background image with priority for LCP optimization */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          filter: isDark
            ? "brightness(0.85) saturate(1.2)"
            : "brightness(0.85) saturate(1.1)",
        }}
      >
        <Image
          fill
          priority
          alt=""
          className="object-cover object-center"
          quality={80}
          sizes="100vw"
          src="/bg_hero_edited.webp"
        />
      </div>

      {/* CSS-only animated blobs for better performance */}
      <div aria-hidden="true" className="blob blob-1" />
      <div aria-hidden="true" className="blob blob-2" />

      {/* Content */}
      <div className="relative z-10 ml-12 flex flex-col items-start justify-center h-full px-4 md:px-8 text-left max-w-4xl mx-auto">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Dr. Hilary Okello
        </motion.h1>
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="text-black bg-yellow-500 rounded-t-lg py-3 px-4 text-xl mt-3 sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Jokes From Far Away 2026 World Tour
        </motion.h2>
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="text-black rounded-b-lg bg-yellow-500 py-3 px-4 text-xl mt-3 sm:text-2xl md:text-xl font-extrabold leading-tight tracking-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Africa&apos;s Doctor of Comedy
        </motion.h2>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-base sm:text-lg md:text-xl mt-6 max-w-2xl drop-shadow leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome! I’m glad you’re here. This is where the jokes travel and the
          laughter meets real life. Scroll down to see upcoming shows near you -
          and don’t forget to register your CITY below to be part of the new
          comedy tour: JOKES FROM FAR AWAY.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-base sm:text-lg rounded-full transition-all duration-200 hover:scale-105 drop-shadow-lg"
            href="https://wa.me/263788940077?text=Hi%2C%20I%27d%20like%20to%20join%20the%20waiting%20list%20for%20Dr.%20Hilary%20Okello%20Live%20in%20Zimbabwe"
            rel="noopener noreferrer"
            target="_blank"
          >
            Join Zimbabwe Waitinglist
          </a>
        </motion.div>
      </div>
    </section>
  );
}
