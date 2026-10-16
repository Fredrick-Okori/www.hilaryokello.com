"use client";

import type React from "react";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ImageItem {
  url: string;
  caption: string;
}

interface ImageCarouselProps {
  images?: ImageItem[];
  botswana?: ImageItem[];
}

const defaultBotswana: ImageItem[] = [
  { url: "/Botswana/DSC_8883 2_1_11zon.webp", caption: "Botswana 1" },
  { url: "/Botswana/DSC_8941 2_2_11zon.webp", caption: "Botswana 2" },
  { url: "/Botswana/DSC_8991 2_4_11zon.webp", caption: "Botswana 4" },
  { url: "/Botswana/DSC_9023 2_5_11zon.webp", caption: "Botswana 5" },
  { url: "/Botswana/DSC_9042 2_6_11zon.webp", caption: "Botswana 6" },
  { url: "/Botswana/DSC_9047 2_7_11zon.webp", caption: "Botswana 7" },
  { url: "/Botswana/DSC_9052 2_9_11zon.webp", caption: "Botswana 9" },
  { url: "/Botswana/DSC_9053 2_10_11zon.webp", caption: "Botswana 10" },
  { url: "/Botswana/DSC_9055 2_11_11zon.webp", caption: "Botswana 11" },
  { url: "/Botswana/DSC_9066 2_14_11zon.webp", caption: "Botswana 14" },
  { url: "/Botswana/DSC_9072 2_15_11zon.webp", caption: "Botswana 15" },
  { url: "/Botswana/DSC_9082 2_16_11zon.webp", caption: "Botswana 18" },
];

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, botswana }) => {
  const imgs = images ?? botswana ?? defaultBotswana;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const section = sectionRef.current;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card", section);
      const desktop = window.matchMedia("(min-width: 768px)").matches;

      gsap.fromTo(
        cards,
        {
          y: (index) => (index % 2 === 0 ? 70 : -70),
          rotate: (index) => (index % 2 === 0 ? 3 : -3),
          scale: 0.94,
          opacity: 0.55,
        },
        {
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: desktop ? "top top+=72" : "top 80%",
            end: desktop ? "+=110%" : "bottom 35%",
            scrub: 0.8,
            pin: desktop,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gallery-title"
      className="w-full"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
            On the road
          </p>
          <h2
            className="text-3xl font-bold text-white md:text-4xl 4xl:text-5xl"
            id="gallery-title"
          >
            Gaborone, Botswana
          </h2>
        </div>
        <Link
          className="inline-flex min-h-11 items-center gap-2 self-start border-b border-amber-400/70 pb-1 text-sm font-medium text-white transition-colors hover:text-amber-300 sm:self-auto"
          href="/gallery"
        >
          More from the gallery <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="grid auto-rows-[112px] grid-cols-2 gap-3 sm:auto-rows-[150px] sm:gap-4 md:auto-rows-[170px] md:grid-cols-4 lg:auto-rows-[190px] 2xl:auto-rows-[210px] 2xl:gap-5 3xl:auto-rows-[240px] 4xl:auto-rows-[280px] 4xl:gap-6">
        {imgs.slice(0, 8).map((image, index) => {
          const tileLayout = [
            "col-span-2 row-span-2",
            "row-span-2",
            "row-span-1",
            "row-span-1",
            "col-span-2 row-span-2",
            "row-span-2",
            "row-span-1",
            "col-span-2 row-span-1",
          ][index];

          return (
            <figure
              key={`${image.url}-${index}`}
              className={`gallery-card group relative isolate overflow-hidden rounded-sm bg-zinc-900 ${tileLayout}`}
            >
              <Image
                fill
                alt={image.caption}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index < 2}
                quality={80}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 40vw, 25vw"
                src={encodeURI(image.url)}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
};

export default ImageCarousel;
