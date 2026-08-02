"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Orbitron, Goldman } from "next/font/google";

// Bold display face for the headline
const orbitron = Orbitron({
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const goldman = Goldman({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll down zooms the headline out; scrolling back up zooms it back in,
  // since scale is derived directly from scroll position.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero section"
      className="relative w-full h-screen flex items-end overflow-hidden"
    >
      {/* Background image + readability gradients */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Mobile background */}
        <Image
          fill
          priority
          alt=""
          className="object-cover object-[center_28%] sm:hidden"
          quality={85}
          sizes="100vw"
          src="/bg_hero_edited.webp"
        />
        {/* Desktop background */}
        <Image
          fill
          priority
          alt=""
          className="hidden object-cover object-[center_28%] sm:block"
          quality={85}
          sizes="100vw"
          src="/bg_hero_edited.webp"
        />
        {/* Blue duotone tint */}
        <div className="absolute inset-0 bg-blue-950/40 mix-blend-multiply" />
        {/* Bottom-heavy gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
      </div>

      {/* Content */}
      <motion.div
        animate="show"
        className="relative z-10 w-full px-5 pb-10 text-center sm:px-8 sm:pb-14 lg:px-16 lg:pb-20"
        initial="hidden"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
      >
        <motion.h1
          className={`${goldman.className} text-[13vw] font-bold leading-[0.92] tracking-tight text-yellow-400 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl`}
          style={{ scale: headlineScale }}
          variants={item}
        >
          DR. HILARY OKELLO
        </motion.h1>

        <motion.h2
          className={`${orbitron.className} mt-1 whitespace-nowrap text-[5.2vw] leading-tight tracking-normal text-white sm:mt-2 sm:text-2xl sm:tracking-wide md:text-3xl lg:text-4xl`}
          style={{ scale: headlineScale }}
          variants={item}
        >
          World Tour Updates 2026
        </motion.h2>

        <motion.a
          className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/90 transition hover:text-yellow-400 sm:mt-6 sm:text-sm"
          href="#tour-dates"
          variants={item}
        >
          Check Upcoming Shows
        </motion.a>
      </motion.div>

      {/* Ambient blobs */}
      <div aria-hidden="true" className="blob blob-1 opacity-30" />
      <div aria-hidden="true" className="blob blob-2 opacity-20" />
    </section>
  );
}
