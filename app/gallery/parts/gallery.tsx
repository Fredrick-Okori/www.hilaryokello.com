/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react";




import { Skeleton } from "@heroui/react";
import { Metadata } from "next";

const images = [
  "/bg_hero.webp",
  "/gallery/crowd.png",
  "/gallerypage/DSC_0808.webp",
  "/gallerypage/DSC_0809.webp",
  "/gallerypage/DSC_0854.webp",
  "/gallerypage/DSC_0913.webp",
  "/gallerypage/DSC_0934.webp",
  "/gallerypage/DSC_1041.webp",
  "/gallerypage/DSC_9107.webp",
  "/gallerypage/DSC_9137.webp",
  "/gallerypage/DSC_9161.webp",
  "/gallerypage/DSC_9170.webp",
  "/gallerypage/DSC_9173.webp",
  "/gallerypage/DSC_8796.webp",
  "/gallerypage/DSC_8799.webp",
  "/gallerypage/DSC_8883.webp",
  "/gallerypage/DSC_8976.webp",
  "/gallerypage/DSC_9022.webp",
  "/gallerypage/DSC_9060.webp",
  "/gallerypage/DSC_1439.webp",
  "/gallerypage/DSC_1443.webp",
  "/gallerypage/DSC_1462.webp",
  "/gallerypage/DSC_1499.webp",
  "/gallerypage/DSC_9178.webp",
  "/gallerypage/DSC_9186.webp",
  "/gallerypage/DSC_9197.webp",
  "/gallerypage/DSC_9202.webp",
  "/gallerypage/DSC_9205.webp",
  "/gallerypage/DSC_9210.webp",
  "/gallerypage/DSC_9264.webp",
  "/gallerypage/DSC_9291.webp",
  "/gallerypage/DSC_9304.webp",
  "/gallerypage/DSC_9316.webp",
  "/gallerypage/DSC_1501.webp",
  "/gallerypage/DSC_1536.webp",
  "/gallerypage/DSC_2131.webp",
  "/gallerypage/DSC_2132.webp",
  "/gallerypage/DSC_2137.webp",
  "/gallerypage/DSC_2148.webp",
  "/gallerypage/DSC_2151.webp",
  "/gallerypage/DSC_5225.webp",
  "/gallerypage/DSC_5228.webp",
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const modalRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Simulate image loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : 0,
      );

      setFadeIn(true);
    });
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setFadeIn(false);
    setTimeout(() => {
      setSelectedIndex(
        (prev) =>
          ((prev === null ? 0 : prev) - 1 + images.length) % images.length,
      );
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
    const handleKeyDown = (e: { key: string; }) => {
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
    const handleClickOutside = (event: { target: any; }) => {
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
    <div className="px-6 py-20 max-w-7xl mx-auto bg-black min-h-screen">
      <h1
        className={`text-5xl font-bold text-left mb-12 text-white transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        Viewing Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transition-all duration-500 transform ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            role="button"
            style={{
              transitionDelay: `${idx * 50}ms`,
              height: "300px",
              width: "400px",
            }}
            tabIndex={0}
            onClick={() => setSelectedIndex(idx)}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {!isLoaded && (
              <Skeleton className="h-full w-full" />
            )}
            {isLoaded && (
              <Image
                fill
                alt={`Gallery image ${idx + 1}`}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                src={src}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-4 w-full flex justify-between items-center">
                {hoverIndex === idx && (
                  <Maximize className="text-white h-5 w-5" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                className="object-contain"
                quality={70}
                src={images[selectedIndex]}
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {selectedIndex + 1} / {images.length}
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
