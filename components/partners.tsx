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
  const carouselRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(3);
  const autoScrollInterval = 3000; // Interval for auto-scrolling in milliseconds
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const maxSlideIndex = Math.max(0, Math.ceil(partnerLogos.length / itemsPerView) - 1);

  // Handle responsive itemsPerView
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
      
      // Update carousel width measurement
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.clientWidth);
      }
    };

    // Initial setup
    handleResize();
    
    // Set up event listener
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle auto-scrolling
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex > maxSlideIndex ? 0 : newIndex;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isAutoScrolling, maxSlideIndex, itemsPerView]);

  // Pause auto-scroll on hover
  const pauseAutoScroll = () => setIsAutoScrolling(false);
  const resumeAutoScroll = () => setIsAutoScrolling(true);

  // Navigation handlers
  const handleNext = () => {
    setIsAutoScrolling(false);
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex > maxSlideIndex ? 0 : newIndex;
    });
  };

  const handlePrev = () => {
    setIsAutoScrolling(false);
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? maxSlideIndex : newIndex;
    });
  };

  // Calculate item width based on items per view
  const getItemWidth = () => {
    return carouselWidth / itemsPerView;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h4 className="text-left text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-6 md:mb-8">
        Our Partners
      </h4>
      
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={resumeAutoScroll}
      >
        <div 
          ref={carouselRef}
          className="w-full" 
          style={{ position: 'relative' }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${slideIndex * getItemWidth() * itemsPerView}px)`,
              width: `${(partnerLogos.length * getItemWidth())}px`
            }}
          >
            {partnerLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center"
                style={{ width: `${getItemWidth()}px` }}
              >
                <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 w-full mx-2 sm:mx-4 md:mx-6">
                  <Image
                    fill
                    alt={`Partner Logo ${index + 1}`}
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    src={logo || "/placeholder.svg"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <Button
          className="rounded-full text-white hover:bg-white hover:text-gray-800 transition-colors"
          size="sm"
          variant="bordered"
          onClick={handlePrev}
          aria-label="Previous partners"
        >
          <FaArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <div className="flex space-x-2">
          {Array.from({ length: maxSlideIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === slideIndex ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => {
                setIsAutoScrolling(false);
                setSlideIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <Button
          className="rounded-full text-white hover:bg-white hover:text-gray-800 transition-colors"
          size="sm"
          variant="bordered"
          onClick={handleNext}
          aria-label="Next partners"
        >
          <FaArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
}