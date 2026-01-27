"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import Partners from "@/components/partners";
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

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
          src="/hero_bg.webp"
          alt="Uganda Must Laugh - Comedy Special"
          layout="fill"
          quality={80}
          objectFit="cover"
          className="brightness-70"
        />
        <div className="absolute inset-0 flex flex-col items-left justify-left px-6 text-left ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
           
      {/* Contact Information */}
      <div className="max-w-xl mx-20 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-left"
        >
          <h2 className="text-4xl font-bold mb-10">For Bookings</h2>
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col p-8  justify-end">
              <h3 className="text-lg font-semibold mb-4 text-black">Booking Information</h3>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-black mb-3 flex items-center gap-2">
                  <FaPhone size={18} /> Phone Numbers
                </h4>
                <div className="flex items-center gap-3 mb-3">
                  <a href="https://wa.me/256752734280" className="hover:text-black transition-colors flex items-center gap-2">
                    <FaWhatsapp size={20} className="text-green-600" />
                    <span className="text-black">+256 752 734280</span>
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://wa.me/256784704143" className="hover:text-black transition-colors flex items-center gap-2">
                    <FaWhatsapp size={20} className="text-green-600" />
                    <span className="text-black">+256 784 704143</span>
                  </a>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-black mb-3 flex items-center gap-2">
                  <FaEnvelope size={18} /> Email
                </h4>
                <div className="flex items-center  text-black gap-3">
                  <a href="mailto:info@hilaryokello.com" className="hover:text-black transition-colors flex items-center gap-2">
                    
                    <span>info@hilaryokello.com</span>
                  </a>
                </div>
              </div>
           
            
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
