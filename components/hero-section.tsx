"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getImageProps } from "next/image";
import { Goldman } from "next/font/google";

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

// Art direction: one <img>, two sources, so each device downloads only the
// image it shows.
const heroCommon = {
  alt: "",
  fetchPriority: "high",
  fill: true,
  loading: "eager",
  quality: 85,
} as const;
const { props: desktopImg } = getImageProps({
  ...heroCommon,
  sizes: "(orientation: portrait) 220vw, 200vh",
  src: "/hilarious_tour_converted.avif",
});
const { props: mobileImg } = getImageProps({
  ...heroCommon,
  sizes: "100vw",
  // 1400×2100 downscale of render_mobile.avif (6105×9156): sharp at 3× DPR,
  // but ~1/19th the pixels to decode, so it paints without a visible delay.
  src: "/render_mobile_sm.avif",
});
const desktopSrcSet = desktopImg.srcSet ?? desktopImg.src;
const mobileSrcSet = mobileImg.srcSet ?? mobileImg.src;
const heroImgProps = { ...mobileImg, srcSet: undefined };

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
      {/* <picture> sources aren't preloaded automatically; React hoists these
          into <head> so each device fetches only its own hero image early. */}
      <link
        as="image"
        fetchPriority="high"
        href={mobileSrcSet}
        media="(max-width: 767px)"
        rel="preload"
        type="image/avif"
      />
      <link
        as="image"
        fetchPriority="high"
        href={desktopSrcSet}
        media="(min-width: 768px)"
        rel="preload"
        type="image/avif"
      />

      {/* Background image + readability gradients */}
      <div aria-hidden="true" className="absolute inset-0 bg-cream">
        {/* texture-tile.webp is Texture.png mirrored into a 2×2 tile, so the
            repeat has no visible seams. */}
        <div className="absolute inset-0 bg-[url('/texture-tile.webp')] bg-[length:360px_auto] bg-center bg-repeat opacity-15 md:bg-[length:560px_auto]" />
        {/* Fades the texture into plain cream at the bottom, matching the
            image's own fade, so the headline sits on a clean background. */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-cream via-cream/80 to-transparent md:h-[50%]" />
        {/* Transparent cut-out group shot. The figures occupy x 6–87% and
            y 16–76% of the canvas, so the wrapper is pushed down by the empty
            bottom band (24.3% of its height = 19.17% of its width) and shifted
            so the figures, not the canvas, are centred. The mask fades the
            lower part of the figures into the page instead of a hard cut, and
            is near-transparent where the headline sits.
            Portrait screens: larger, centred on the middle figure, and lifted
            so the group sits mid-screen above the headline. */}
        {/* Phones (< md) get a dedicated single-figure portrait render
            (2:3, transparent top band, face centred ~40% across). It is
            sized by screen height so it fills most of the viewport on every
            phone, bottom-anchored, and the face is centred horizontally. */}
        <div
          className="absolute left-1/2 aspect-[6105/9156] -translate-x-[40%] [--hero-bottom:8svh] [--hero-mask:linear-gradient(to_top,transparent_4%,rgba(0,0,0,0.25)_12%,black_26%)] [--hero-w:max(min(100vw,85svh),68svh)] md:aspect-[13323/10512] md:[--hero-mask:linear-gradient(to_top,transparent_30%,rgba(0,0,0,0.25)_45%,black_62%)] md:-translate-x-[46.7%] md:[--hero-bottom:calc(var(--hero-w)*-0.1917)] md:[--hero-w:min(200vh,135vw)] md:portrait:-translate-x-[53%] md:portrait:[--hero-bottom:calc(var(--hero-w)*-0.1917+12svh)] md:portrait:[--hero-w:min(220vw,120svh)]"
          style={{
            width: "var(--hero-w)",
            bottom: "var(--hero-bottom)",
            maskImage: "var(--hero-mask)",
            WebkitMaskImage: "var(--hero-mask)",
          }}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
            <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img {...heroImgProps} className="object-contain" />
          </picture>
        </div>
      </div>

      {/* Content */}
      <motion.div
        animate="show"
        className="relative z-10 w-full px-5 pb-10 text-center sm:px-8 sm:pb-14 lg:px-16 lg:pb-20 2xl:pb-24 3xl:pb-28 4xl:pb-32"
        initial="hidden"
        transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
      >
        <motion.h1
          className={`${goldman.className} flicker-text whitespace-nowrap text-[7.6vw] font-bold leading-[0.92] tracking-tight text-[#391314]`}
          style={{ scale: headlineScale }}
          variants={item}
        >
          DR. HILARY OKELLO
        </motion.h1>

        <motion.h2
          className={`${goldman.className} mt-1 whitespace-nowrap text-[5.2vw] leading-tight tracking-normal text-yellow-500 sm:mt-2 sm:text-2xl sm:tracking-wide md:text-3xl lg:text-4xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl`}
          style={{ scale: headlineScale }}
          variants={item}
        >
          Hilarious World Tour 2027
        </motion.h2>
      </motion.div>

      {/* Ambient blobs */}
      <div aria-hidden="true" className="blob blob-1 opacity-30" />
      <div aria-hidden="true" className="blob blob-2 opacity-20" />
    </section>
  );
}
