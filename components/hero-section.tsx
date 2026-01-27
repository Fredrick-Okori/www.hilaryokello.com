"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

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
    <section className="w-full h-screen overflow-hidden relative">
      {/* Background image with priority for LCP optimization */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero_bg.webp')",
          filter: isDark
            ? "brightness(0.9) saturate(1.2)"
            : "brightness(0.9) saturate(1.1)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CSS-only animated blobs for better performance */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Content */}
      <div className="relative z-10 ml-12 flex flex-col items-start justify-center h-full px-4 md:px-8 text-left max-w-4xl mx-auto">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-black text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
        Dr. Hilary Okello 
        </motion.h1>
        <motion.h4
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-900 bg-gray-100/90 rounded-t-lg py-2 px-4 text-xl mt-3 sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
    Jokes From Far Away 2026 World Tour
        </motion.h4>
        <motion.h3
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-900 rounded-b-lg bg-gray-100/90 py-2 px-4 text-xl mt-3 sm:text-2xl md:text-xl font-extrabold leading-tight tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
       Africa&apos;s Doctor of Comedy 
        </motion.h3>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-base sm:text-lg md:text-xl mt-6 max-w-2xl drop-shadow"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
Welcome!
I’m glad you’re here. This is where the jokes travel and the laughter meets real life. Scroll down to see upcoming shows near you - and don’t forget to register your CITY below to be part of the new comedy tour: JOKES FROM FAR AWAY.
        </motion.p>
      </div>
    </section>
  );
}

