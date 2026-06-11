"use client";
import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/react"; // Import the Skeleton component

// Define the type for a single image item
interface ImageItem {
  url: string;
  caption: string;
}

interface ImageCarouselProps {
  images?: ImageItem[];
  botswana?: ImageItem[];
}

// Define the local data array
const defaultBotswana: ImageItem[] = [
  { url: "/harare/04cbaeee377f02f0494c389c69c3d98e.avif", caption: "Harare 1" },
  { url: "/harare/12d317ce22156a27704561fc77a1f764.avif", caption: "Harare 2" },
  { url: "/harare/2fa89869aeaaa4ceb232d91ffd90502b.avif", caption: "Harare 3" },
  { url: "/harare/3d0bf176f7af29f9899405aeca1b0cbd.avif", caption: "Harare 4" },
  { url: "/harare/4e7684c9ede317aeb1a93b5097ed46db.avif", caption: "Harare 5" },
  { url: "/harare/4ecae83f9e03691ad3d8d5601de7f0d5.avif", caption: "Harare 6" },
  { url: "/harare/a1c38ae750c359bee856d474a125f227.avif", caption: "Harare 7" },
  { url: "/harare/a8ebe61cede18ff1fb0d5ef1c28f4f54.avif", caption: "Harare 8" },
  { url: "/harare/b09a276db4645c44342e61e47bc86ee3.avif", caption: "Harare 9" },
  {
    url: "/harare/e0ae9f44d17f47586c3a5dd2aaf829dc.avif",
    caption: "Harare 10",
  },
  {
    url: "/harare/ec4dc4a37ef294e1f6410a1299013227.avif",
    caption: "Harare 11",
  },
  {
    url: "/harare/ef9444da75b91900d4485ace060648fc.avif",
    caption: "Harare 12",
  },
  {
    url: "/harare/fab58e92a17b915d2a67586ef87f1f57.avif",
    caption: "Harare 13",
  },
];

// The component can accept optional `images` or `botswana` props from parent
const Zambia: React.FC<ImageCarouselProps> = ({ images, botswana }) => {
  // Prefer parent-provided `images`, then `botswana`, otherwise fall back to default
  const imgs = images ?? botswana ?? defaultBotswana;
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef<number>(0);
  const [itemsPerView, setItemsPerView] = useState(3); // Default for large screens
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Dynamically adjust items per view based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Prepare looping carousel with cloned groups for seamless infinite scroll
  const realSlides = Math.ceil(imgs.length / itemsPerView);
  const firstGroup = imgs.slice(0, itemsPerView);
  const lastGroup = imgs.slice(-itemsPerView);
  const extendedImgs =
    imgs.length > itemsPerView ? [...lastGroup, ...imgs, ...firstGroup] : imgs;

  // Start at the first real slide (accounting for the prepended clone)
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Reset slide index when itemsPerView or imgs change
  useEffect(() => {
    if (imgs.length > itemsPerView) {
      setSlideIndex(1);
    } else {
      setSlideIndex(0);
    }
  }, [itemsPerView, imgs]);

  // Update carousel position on index or resize
  useEffect(() => {
    if (!carouselRef.current) return;

    // Only calculate width and apply transform if there are carousel children
    const containerWidth = carouselRef.current.offsetWidth;

    slideWidthRef.current = containerWidth / itemsPerView;
    const slideGroupWidth = slideWidthRef.current * itemsPerView;

    // Apply transition or remove it (used when snapping without animation)
    carouselRef.current.style.transition = transitionEnabled
      ? "transform 500ms ease-in-out"
      : "none";
    carouselRef.current.style.transform = `translateX(-${slideIndex * slideGroupWidth}px)`;
  }, [slideIndex, itemsPerView, transitionEnabled, imgs]);

  const handleTransitionEnd = () => {
    if (imgs.length <= itemsPerView) return;

    if (slideIndex === 0) {
      // Moved to clone at the start: jump to the last real slide
      setTransitionEnabled(false);
      setSlideIndex(realSlides);
    } else if (slideIndex === realSlides + 1) {
      // Moved to clone at the end: jump to the first real slide
      setTransitionEnabled(false);
      setSlideIndex(1);
    }
  };

  // Re-enable transition on the next frame after a snap
  useEffect(() => {
    if (!transitionEnabled) {
      const raf = requestAnimationFrame(() => setTransitionEnabled(true));

      return () => cancelAnimationFrame(raf);
    }
  }, [transitionEnabled]);

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  // Calculate the total number of viewable slides (groups of images)
  const totalSlides = Math.ceil(imgs.length / itemsPerView);

  const handleNext = () => {
    if (imgs.length <= itemsPerView) return;
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (imgs.length <= itemsPerView) return;
    setSlideIndex((prev) => prev - 1);
  };

  return (
    <>
      {/* Title and Button Section */}
      <div>
        <h4 className="text-left text-4xl text-white font-bold">
          State of Nation | Harare - Zimbabwe
        </h4>
        <Button
          className="rounded-full text-white px-4 py-2 mt-4"
          variant="bordered"
        >
          <Link href="/gallery">More from Zimbabwe</Link>
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="top-0 right-0 flex py-10 justify-end space-x-2 z-10">
        <Button
          aria-label="Previous slide"
          className="text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          disabled={isLoading || imgs.length <= itemsPerView}
          size="sm"
          variant="bordered"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </Button>
        <Button
          aria-label="Next slide"
          className="text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          disabled={isLoading || imgs.length <= itemsPerView}
          size="sm"
          variant="bordered"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex"
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImgs && extendedImgs.length > 0 ? (
            // Map through extended (with clones) images for looping
            extendedImgs.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-2"
                // Dynamically set width based on itemsPerView state
                style={{
                  width: `${100 / itemsPerView}%`,
                }}
              >
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                  {isLoading ? (
                    <Skeleton className="w-full h-full bg-default-200 rounded-2xl" />
                  ) : (
                    <>
                      <Image
                        fill
                        alt={`Carousel Image ${index + 1}: ${image.caption}`}
                        className="rounded-2xl object-cover"
                        priority={index < itemsPerView} // Prioritize first few images
                        quality={70}
                        src={encodeURI(image.url || "/placeholder.svg")}
                        // sizes are crucial for Next/Image performance
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Dark overlay to reduce image brightness */}
                      <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex-shrink-0 w-full p-2">
              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 flex items-center justify-center bg-gray-100 rounded-2xl">
                <p>No images available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Zambia;
