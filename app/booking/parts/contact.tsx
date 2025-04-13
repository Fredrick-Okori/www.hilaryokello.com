"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import Partners from "@/components/partners";

export default function BookingPage() {
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef(0);
  const itemsPerView = 1;

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current?.children[0]) {
        slideWidthRef.current = carouselRef.current.children[0].clientWidth;
        carouselRef.current.style.transform = `translateX(-${
          slideIndex * slideWidthRef.current * itemsPerView
        }px)`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slideIndex, itemsPerView]);

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % Math.ceil(images.length / itemsPerView));
  };

  const handlePrev = () => {
    setSlideIndex((prev) =>
      (prev - 1 + Math.ceil(images.length / itemsPerView)) %
      Math.ceil(images.length / itemsPerView)
    );
  };

  const images = [
    "/gallery/crowd.png",
    "/gallery/uganda_must_laugh-1.jpg",
    "/gallery/bg_booking.webp",
    "/bg_hero.webp",
    "/bg_hero.webp",
  ];

  return (
    <section className="w-full bg-black text-white">
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src="/gallery/bg_booking.webp"
          alt="Uganda Must Laugh - Comedy Special"
          layout="fill"
          quality={80}
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
           
      {/* Contact Information */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-10">For Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone Numbers</h3>
              <p>+256 752 734280</p>
              <p>+256 784 704143 </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>
                <a href="mailto:info@example.com" className="hover:underline">
                  info@hilaryokello.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p>Kampala, Uganda</p>
            </div>
         
          </div>
        </motion.div>
      </div>
          </motion.div>
        </div>
      </div>

      {/* Partners Section */}
      <div className=" py-12">
        <Partners />
      </div>

     

    </section>
  );
}
