"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { ChevronRight, Play } from "lucide-react";
import { TicketCheck } from "lucide-react";
import { Button } from "@heroui/button";
import Link from "next/link";

export function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const phoneNumber = "+256752734280"; // Replace with Dr. Hilary Okello's number
  const message =
    "Hello Dr. Hilary Okello, I'm interested in your comedy shows!";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber.replace(
    /[^0-9]/g,
    "",
  )}?text=${encodedMessage}`;

  return (
    <section className="w-full h-screen overflow-hidden relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg_hero_edited.webp')",
          filter: isDark
            ? "brightness(0.4) saturate(1.2)"
            : "brightness(0.8) saturate(1.1)",
          backgroundSize: "cover", // Ensures the image covers the entire screen
          backgroundPosition: "center", // Center the image
        }}
      />

      {/* Content */}
      <div className="relative z-10 ml-12 flex flex-col items-start justify-center h-full px-4 md:px-8 text-left max-w-4xl mx-auto">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
        Dr. Hilary Okello 
        </motion.h1>
        <motion.h4
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-900 bg-gray-100 py-2 px-4  text-xl mt-3 sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
    Africa&apos;s Doctor of Comedy
        </motion.h4>
          <motion.h3
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-900 bg-gray-100 py-2 px-4  text-xl mt-3 sm:text-2xl md:text-xl font-extrabold leading-tight tracking-tight drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
       Upcoming Shows
        </motion.h3>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-white/90 text-base sm:text-lg md:text-xl mt-6 max-w-2xl drop-shadow"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to the official website of Dr. Hilary Okello - Uganda’s finest stand-up comedian and Africa’s Doctor of Comedy.
Here, you can stay updated on my latest news, explore my work, and most importantly, check out all upcoming shows happening across Africa and beyond.

Have a laugh, look around, and see where we meet next! 
           
        </motion.p>

        {/* <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
           as={Link}
            className="text-white rounded-full"
        href="https://www.quicket.co.za/events/317886-dr-hilary-okello-live-in-johannesburg/#/"
            size="lg"
            target="_blank"
            variant="bordered"
          >
             Single R200 <ChevronRight className="mr-2 h-5 w-5" />
          </Button>
          <Button
           as={Link}
            className="text-white rounded-full"
           href="https://www.quicket.co.za/events/317886-dr-hilary-okello-live-in-johannesburg/#/"
            size="lg"
            variant="bordered"
            target="_blank"
          >
             Couple R300
             <ChevronRight className="mr-2 h-5 w-5" />
          </Button>
        </motion.div> */}
      </div>

      {/* Glowing floating blobs */}
      <motion.div
        animate={{ opacity: 0.6 }}
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/30 blur-3xl"
        initial={{ opacity: 0 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        animate={{ opacity: 0.5 }}
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-500/30 blur-3xl"
        initial={{ opacity: 0 }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
      />
    </section>
  );
}
