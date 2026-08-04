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
      <div aria-hidden="true" className="absolute inset-0 bg-black">
        {/* Mobile background — full-bleed crop */}
        <Image
          fill
          priority
          alt=""
          className="object-cover object-[center_28%] sm:hidden"
          quality={85}
          sizes="100vw"
          src="/mobile_converted.avif"
        />
        {/* Desktop/tablet background — whole image visible, letterboxed */}
        <Image
          fill
          priority
          alt=""
          className="hidden object-contain sm:block"
          quality={85}
          sizes="100vw"
          src="/desktop_hero_converted.avif"
        />
        {/* Letterbox edge gradients (desktop/tablet only) so the full image reads as intentional, not empty */}
        <div className="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-black to-transparent sm:block" />
        <div className="absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-black to-transparent sm:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black to-transparent sm:block" />
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
          className={`${goldman.className} flicker-text text-[12vw] font-bold leading-[0.92] tracking-tight text-white sm:text-6xl md:text-6xl lg:text-8xl xl:text-9xl`}
          style={{ scale: headlineScale }}
          variants={item}
        >
          DR. HILARY OKELLO
        </motion.h1>

        <motion.h2
          className={`${goldman.className} mt-1 whitespace-nowrap text-[5.2vw] leading-tight tracking-normal text-yellow-500 sm:mt-2 sm:text-2xl sm:tracking-wide md:text-3xl lg:text-4xl`}
          style={{ scale: headlineScale }}
          variants={item}
        >
          Checkout World Tour Updates 2026
        </motion.h2>

       
      </motion.div>

      {/* Ambient blobs */}
      <div aria-hidden="true" className="blob blob-1 opacity-30" />
      <div aria-hidden="true" className="blob blob-2 opacity-20" />
    </section>
  );
}
