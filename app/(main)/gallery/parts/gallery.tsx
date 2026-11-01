/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react";
import { Skeleton } from "@heroui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Group images into titled galleries
const galleries: Record<string, string[]> = {
  "2 Kings One Mic | Patrick Salvado & Dr. Hilary Okello": [
    "/gallery/two-kings-one-mic/NJJ_2833.avif",
    "/gallery/two-kings-one-mic/NJJ_3186.avif",
    "/gallery/two-kings-one-mic/NJJ_2763.avif",
    "/gallery/two-kings-one-mic/NJJ_3249.avif",
    "/gallery/two-kings-one-mic/NJJ_2828.avif",
    "/gallery/two-kings-one-mic/NJJ_3044.avif",
    "/gallery/two-kings-one-mic/NJJ_3192.avif",
    "/gallery/two-kings-one-mic/NJJ_2980.avif",
    "/gallery/two-kings-one-mic/NJJ_2653.avif",
    "/gallery/two-kings-one-mic/NJJ_2656.avif",
    "/gallery/two-kings-one-mic/NJJ_2658.avif",
    "/gallery/two-kings-one-mic/NJJ_2673.avif",
    "/gallery/two-kings-one-mic/NJJ_2743.avif",
    "/gallery/two-kings-one-mic/NJJ_2757.avif",
    "/gallery/two-kings-one-mic/NJJ_2761.avif",
    "/gallery/two-kings-one-mic/NJJ_2768.avif",
    "/gallery/two-kings-one-mic/NJJ_2780.avif",
    "/gallery/two-kings-one-mic/NJJ_2783.avif",
    "/gallery/two-kings-one-mic/NJJ_2788.avif",
    "/gallery/two-kings-one-mic/NJJ_2795.avif",
    "/gallery/two-kings-one-mic/NJJ_2812.avif",
    "/gallery/two-kings-one-mic/NJJ_2819.avif",
    "/gallery/two-kings-one-mic/NJJ_2852.avif",
    "/gallery/two-kings-one-mic/NJJ_2854.avif",
    "/gallery/two-kings-one-mic/NJJ_2857.avif",
    "/gallery/two-kings-one-mic/NJJ_2865.avif",
    "/gallery/two-kings-one-mic/NJJ_2897.avif",
    "/gallery/two-kings-one-mic/NJJ_2913.avif",
    "/gallery/two-kings-one-mic/NJJ_2922.avif",
    "/gallery/two-kings-one-mic/NJJ_2946.avif",
    "/gallery/two-kings-one-mic/NJJ_2952.avif",
    "/gallery/two-kings-one-mic/NJJ_2963.avif",
    "/gallery/two-kings-one-mic/NJJ_2966.avif",
    "/gallery/two-kings-one-mic/NJJ_2986.avif",
    "/gallery/two-kings-one-mic/NJJ_2987.avif",
    "/gallery/two-kings-one-mic/NJJ_3028.avif",
    "/gallery/two-kings-one-mic/NJJ_3062.avif",
    "/gallery/two-kings-one-mic/NJJ_3065.avif",
    "/gallery/two-kings-one-mic/NJJ_3072.avif",
    "/gallery/two-kings-one-mic/NJJ_3077.avif",
    "/gallery/two-kings-one-mic/NJJ_3085.avif",
    "/gallery/two-kings-one-mic/NJJ_3099.avif",
    "/gallery/two-kings-one-mic/NJJ_3109.avif",
    "/gallery/two-kings-one-mic/NJJ_3117.avif",
    "/gallery/two-kings-one-mic/NJJ_3160.avif",
    "/gallery/two-kings-one-mic/NJJ_3174.avif",
    "/gallery/two-kings-one-mic/NJJ_3189.avif",
    "/gallery/two-kings-one-mic/NJJ_3197.avif",
    "/gallery/two-kings-one-mic/NJJ_3205.avif",
    "/gallery/two-kings-one-mic/NJJ_3230.avif",
    "/gallery/two-kings-one-mic/NJJ_3236.avif",
    "/gallery/two-kings-one-mic/NJJ_3245.avif",
    "/gallery/two-kings-one-mic/NJJ_3256.avif",
    "/gallery/two-kings-one-mic/NJJ_3290.avif",
    "/gallery/two-kings-one-mic/NJJ_3294.avif",
    "/gallery/two-kings-one-mic/NJJ_3300.avif",
    "/gallery/two-kings-one-mic/NJJ_3307.avif",
    "/gallery/two-kings-one-mic/NJJ_3318.avif",
    "/gallery/two-kings-one-mic/NJJ_3335.avif",
    "/gallery/two-kings-one-mic/NJJ_3357.avif",
    "/gallery/two-kings-one-mic/NJJ_3413.avif",
  ],
  "State of Nation | Harare - Zimbabwe ": [
    "/harare/2fa89869aeaaa4ceb232d91ffd90502b.avif",
    "/harare/3d0bf176f7af29f9899405aeca1b0cbd.avif",
    "/harare/04cbaeee377f02f0494c389c69c3d98e.avif",
    "/harare/4e7684c9ede317aeb1a93b5097ed46db.avif",
    "/harare/4ecae83f9e03691ad3d8d5601de7f0d5.avif",
    "/harare/12d317ce22156a27704561fc77a1f764.avif",
    "/harare/a1c38ae750c359bee856d474a125f227.avif",
    "/harare/a8ebe61cede18ff1fb0d5ef1c28f4f54.avif",
  ],
  Botswana: [
    "/Botswana/DSC_8883 2_1_11zon.webp",
    "/Botswana/DSC_8941 2_2_11zon.webp",
    "/Botswana/DSC_8967 2_3_11zon.webp",
    "/Botswana/DSC_8991 2_4_11zon.webp",
    "/Botswana/DSC_9023 2_5_11zon.webp",
    "/Botswana/DSC_9042 2_6_11zon.webp",
    "/Botswana/DSC_9047 2_7_11zon.webp",
    "/Botswana/DSC_9048 2_8_11zon.webp",
    "/Botswana/DSC_9052 2_9_11zon.webp",
    "/Botswana/DSC_9053 2_10_11zon.webp",
    "/Botswana/DSC_9055 2_11_11zon.webp",
    "/Botswana/DSC_9060 2_12_11zon.webp",
    "/Botswana/DSC_9064 2_13_11zon.webp",
    "/Botswana/DSC_9066 2_14_11zon.webp",
    "/Botswana/DSC_9072 2_15_11zon.webp",
    "/Botswana/DSC_9082 2_16_11zon.webp",
    "/Botswana/DSC_9091 2_17_11zon.webp",
    "/Botswana/DSC_9098 2_18_11zon.webp",
    "/Botswana/DSC_9100 2_19_11zon.webp",
    "/Botswana/DSC_9104 2_20_11zon.webp",
  ],
};

// Flatten galleries for modal navigation
const groupEntries = Object.entries(galleries);
const groupStarts: number[] = [];
let _acc = 0;

for (const [, imgs] of groupEntries) {
  groupStarts.push(_acc);
  _acc += imgs.length;
}
const imagesFlat = groupEntries.flatMap(([_, imgs]) => imgs);

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Simulate image loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery || !isLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const groups = gsap.utils.toArray<HTMLElement>(
          "[data-gallery-group]",
          gallery,
        );

        groups.forEach((group) => {
          const heading = group.querySelector<HTMLElement>(
            "[data-gallery-heading]",
          );
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-gallery-card]",
            group,
          );
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              once: true,
            },
          });

          if (heading) {
            timeline.fromTo(
              heading,
              { y: 22, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
            );
          }

          if (cards.length > 0) {
            timeline.fromTo(
              cards,
              { y: 34, autoAlpha: 0, scale: 0.97 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.65,
                stagger: 0.06,
                ease: "power3.out",
              },
              heading ? "-=0.2" : 0,
            );
          }
        });
      });
    }, gallery);

    return () => {
      context.revert();
      media.revert();
    };
  }, [isLoaded]);

  useEffect(() => {
    if (selectedIndex !== null) {
      setFadeIn(true);
      document.body.style.overflow = "hidden";
    } else {
      setFadeIn(false);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  const handleNext = () => {
    if (selectedIndex === null) return;
    setFadeIn(false);
    setTimeout(() => {
      setSelectedIndex((prev) => {
        return prev !== null ? (prev + 1) % imagesFlat.length : 0;
      });

      setFadeIn(true);
    });
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setFadeIn(false);
    setTimeout(() => {
      setSelectedIndex((prev) => {
        const value = (prev === null ? 0 : prev) - 1 + imagesFlat.length;

        return value % imagesFlat.length;
      });
      setFadeIn(true);
    });
  };

  const closeModal = () => {
    setFadeIn(false);
    setTimeout(() => {
      setSelectedIndex(null);
    }, 300);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div ref={galleryRef} className="px-4 py-20 sm:px-6 lg:px-10 bg-cream min-h-screen">
      <h1 className="pt-10 text-left text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
        Gallery
      </h1>
      {/* Render each gallery group with a heading */}
      {groupEntries.map(([title, imgs], gIdx) => (
        <section key={title} data-gallery-group className="mb-12">
          <h2
            data-gallery-heading
            className="text-2xl text-left font-bold text-ink py-10"
          >
            {title}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 3xl:grid-cols-4">
            {imgs.map((src, idx) => {
              const globalIdx = groupStarts[gIdx] + idx;

              return (
                <div
                  key={globalIdx}
                  data-gallery-card
                  className={`relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg cursor-pointer group ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedIndex(globalIdx)}
                  onMouseEnter={() => setHoverIndex(globalIdx)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {!isLoaded && <Skeleton className="h-full w-full" />}
                  {isLoaded && (
                    <Image
                      fill
                      alt={`${title} image ${idx + 1}`}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      quality={70}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1919px) 33vw, 25vw"
                      src={encodeURI(src)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full flex justify-between items-center">
                      {hoverIndex === globalIdx && (
                        <Maximize className="text-white h-5 w-5" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          aria-label="Close modal"
          className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            ref={modalRef}
            className="relative max-w-6xl w-full h-[85vh] mx-auto px-4"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault(); // prevent scrolling with space
                e.stopPropagation();
              }
            }}
          >
            <div
              className={`relative h-full transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                fill
                priority
                alt={`Modal image ${selectedIndex + 1}`}
                className="object-contain  rounded-lg mx-auto"
                quality={70}
                sizes="(max-width: 1152px) 100vw, 1152px"
                src={encodeURI(imagesFlat[selectedIndex])}
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {selectedIndex + 1} / {imagesFlat.length}
            </div>

            {/* Close Button */}
            <button
              aria-label="Close gallery"
              className="absolute top-10 right-8 bg-black/30 hover:bg-black/60 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-300"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev Button */}
            <button
              aria-label="Previous image"
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              aria-label="Next image"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/60 backdrop-blur-sm p-3 rounded-full text-white transition-all duration-300"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </button>
        </div>
      )}
    </div>
  );
}
