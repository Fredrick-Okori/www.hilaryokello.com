"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import PropTypes from "prop-types";

const ImageCarousel = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef(null);
  const slideWidthRef = useRef(0);
  const [itemsPerView, setItemsPerView] = useState(2); // Default for larger screens

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
      slideWidthRef.current = carouselRef.current.children[0].offsetWidth;
      carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidthRef.current}px)`;
    }
  }, [slideIndex, itemsPerView]);

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

  // Define PropTypes to match the type of images array elements
  ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    ).isRequired,
  };

  return (
    <>
      <div>
        <h4 className="text-left text-4xl text-white font-bold">
          From the Lenses
        </h4>
        <Button
          as={Link}
          className="rounded-full text-white px-4 py-2 mt-4"
          href="/gallery"
          variant="bordered"
        >
          More Pictures
        </Button>
      </div>

      <div className="top-0 right-0 flex py-10 justify-end space-x-2 z-10">
        <Button
          className="text-white rounded-full"
          size="md"
          variant="bordered"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </Button>
        <Button
          className="text-white rounded-full"
          size="md"
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
            transform: `translateX(-${slideIndex * (slideWidthRef.current || 0)}px)`,
          }}
        >
          {images.map((image: string | StaticImport, index: number) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2"
            >
              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                <Image
                  fill
                  alt={`Carousel Image ${index + 1}`}
                  className="rounded-2xl"
                  src={image}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageCarousel;
