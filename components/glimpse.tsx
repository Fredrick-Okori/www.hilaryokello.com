"use client";
import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/react"; // Import the Skeleton component

// Define the type for the images array elements
interface ImageType {
  url: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: ImageType[];
}

const CountryGlimpse: React.FC<ImageCarouselProps> = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef<number>(0);
  const [itemsPerView, setItemsPerView] = useState(2); // Default for larger screens
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
        setItemsPerView(3); // Optional for large screens
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Update carousel position on index or resize
  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children[0]) {
      // Cast the element to HTMLElement to access offsetWidth
      const firstChild = carouselRef.current.children[0] as HTMLElement;

      slideWidthRef.current = firstChild.offsetWidth;
      carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidthRef.current}px)`;
    }
  }, [slideIndex, itemsPerView]);

  // Simulate image loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    setSlideIndex(
      (prev) => (prev + 1) % Math.ceil(images.length / itemsPerView),
    );
  };

  const handlePrev = () => {
    setSlideIndex(
      (prev) =>
        (prev - 1 + Math.ceil(images.length / itemsPerView)) %
        Math.ceil(images.length / itemsPerView),
    );
  };

  return (
    <>
      <div>
        <h4 className="text-left text-4xl text-white font-bold">
          Gen-Z Comedy Show: Rwanda
        </h4>
        <Button
          className="rounded-full text-white px-4 py-2 mt-4"
          variant="bordered"
        >
          <Link href="/gallery">More from Rwanda</Link>
        </Button>
      </div>

      <div className="top-0 right-0 flex py-10 justify-end space-x-2 z-10">
        <Button
          aria-label="Previous slide"
          className="text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          disabled={isLoading}
          size="sm"
          variant="bordered"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </Button>
        <Button
          aria-label="Next slide"
          className="text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
          disabled={isLoading}
          size="sm"
          variant="bordered"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${slideIndex * slideWidthRef.current}px)`,
          }}
        >
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2"
              >
                <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                  {isLoading ? (
                    <Skeleton className="w-full h-full bg-default-200 rounded-2xl" />
                  ) : (
                    <Image
                      fill
                      alt={`Carousel Image ${index + 1}`}
                      className="rounded-2xl object-cover"
                      priority={index === 0}
                      quality={70}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={image.url || "/placeholder.svg"}
                    />
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

export default CountryGlimpse;
