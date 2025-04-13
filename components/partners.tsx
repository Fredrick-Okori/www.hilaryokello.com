"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@heroui/button";

// Example partner logos - moved outside component to prevent unnecessary re-renders
const partnerLogos = [
  "/partners/ciu-logo.png",
  "/partners/images.jpeg",
  "/partners/jico_league.jpg",
  "/partners/kbadge.jpg",
  "/partners/laughing_maraboustork.webp",
  "/partners/logo-top.png",
  "/partners/uganda_comedians_association.jpg",
];

export default function Partners() {
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const slideWidthRef = useRef<number>(0);
  const itemsPerView = 3; // Number of partner logos per view
  const autoScrollInterval = 3000; // Interval for auto-scrolling in milliseconds

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current && carouselRef.current.children[0]) {
        // Type assertion to HTMLElement
        const firstChild = carouselRef.current.children[0] as HTMLElement;

        slideWidthRef.current = firstChild.offsetWidth;
        carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidthRef.current * itemsPerView}px)`;
      }
    };

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);

    // Auto-scrolling functionality
    const interval = setInterval(() => {
      setSlideIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(partnerLogos.length / itemsPerView),
      );
    }, autoScrollInterval);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [slideIndex]);

  const handleNext = () => {
    setSlideIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(partnerLogos.length / itemsPerView),
    );
  };

  const handlePrev = () => {
    setSlideIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(partnerLogos.length / itemsPerView)) %
        Math.ceil(partnerLogos.length / itemsPerView),
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h4 className="text-left text-3xl sm:text-4xl text-white font-bold mb-4">
        Our Partners
      </h4>
      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="whitespace-nowrap transition-transform duration-500 ease-in-out flex"
          style={{
            transform: `translateX(-${slideIndex * (slideWidthRef.current || 0) * itemsPerView}px)`,
          }}
        >
          {partnerLogos.map((logo, index) => (
            <div key={index} className="inline-block w-1/3 p-4">
              <div className="relative h-[100px] w-[150px] mx-auto">
                <Image
                  fill
                  alt={`Partner Logo ${index + 1}`}
                  className="object-contain"
                  sizes="150px"
                  src={logo || "/placeholder.svg"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <Button
          className="rounded-full text-white"
          size="sm"
          variant="bordered"
          onClick={handlePrev}
        >
          <FaArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          className="rounded-full text-white"
          size="sm"
          variant="bordered"
          onClick={handleNext}
        >
          <FaArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
