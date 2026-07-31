"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";

export function HeroSection() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <section
      aria-label="Hero section"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image with overlay gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          fill
          priority
          alt=""
          className="object-cover object-[center_28%]"
          quality={85}
          sizes="100vw"
          src="/bg_hero_edited.webp"
        />
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Animated blobs with opacity for subtlety */}
      <div aria-hidden="true" className="blob blob-1 opacity-30" />
      <div aria-hidden="true" className="blob blob-2 opacity-20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Name with decorative element */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-block">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight">
                Dr. Hilary
                <br />
                <span className="text-yellow-400">Okello</span>
              </h1>
              <div className="h-1 w-24 bg-yellow-400 mt-4 rounded-full" />
            </div>
          </motion.div>

          {/* Tour title card */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4"
          >
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
              <div className="bg-yellow-400 text-black px-5 py-3 sm:py-4 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
                  Jokes From Far Away
                </h2>
              </div>
              <div className="bg-yellow-500 text-black px-5 py-2 sm:py-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none">
                <p className="text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase">
                  2026 World Tour
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-yellow-400/90 text-sm sm:text-base md:text-lg font-semibold tracking-wide uppercase mb-6"
          >
            Africa&apos;s Doctor of Comedy
          </motion.p>

          {/* Description */}
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
          >
            Welcome! I'm glad you're here. This is where the jokes travel and
            the laughter meets real life. Scroll down to see upcoming shows near
            you — and don't forget to register your city below to be part of the
            new comedy tour: JOKES FROM FAR AWAY.
          </motion.p>

          {/* CTA Buttons */}
         
        </div>
      </div>

  
    </section>
  );
}