"use client";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Mic, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTiktok } from "react-icons/fa";

export default function ComedianBio() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="relative h-[70vh] overflow-hidden">
        <div className="absolute bg-black" />
        <Image
          fill
          priority
          alt="Comedian on stage"
          className="object-cover"
          src="/gallerypage/DSC_9170.webp"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Uganda&apos;s Top Comedian
          </motion.h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mb-8 mt-4">
            Making the world laugh, one awkward truth at a time
          </p>
          <div className="flex gap-4">
            <Button
              as={Link}
              className=" text-white"
              href="/booking"
              size="lg"
              variant="bordered"
            >
              Book Now
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            fill="black"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 70C840 80 960 100 1080 100C1200 100 1320 80 1380 70L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="black"
            />
          </svg>
        </div>
      </header>

      {/* Bio Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden border-8 border-white shadow-xl">
              <Image
                fill
                alt="Alex Laughton"
                className="object-cover"
                src="/gallerypage/DSC_8976.webp"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-black rounded-full p-4 shadow-lg">
              <Mic className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-4xl text-left font-bold mb-6 text-white">
              About Dr. Hilary Okello
            </h2>
            <p className="text-lg text-white text-left mb-6">
              Dr. Hilary Okello is Uganda&apos;s finest stand-up comedian and
              Africa’s Doctor of Comedy. A former medical professional, Dr.
              Hilary traded his stethoscope for a microphone and has since made
              waves across the African comedy scene.
            </p>
            <p className="text-lg text-white text-left mb-6">
              Since launching his career in 2017, he’s lit up the stage at
              Uganda’s premier comedy shows, including Fun Factory, Comedy
              Store, and Africa Laughs. His breakthrough came in 2017 when he
              ranked among the top 5 in the Next Top Comedian competition at
              Theatre Labonita, earning him his first big stage appearance. This
              success continued with a semi-finalist position in the NBS The
              Comic competition in 2018, his TV debut, and a major career boost.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-black max-w-4xl mx-auto text-white px-4  py-16">
        <p className="text-white text-left">
          {" "}
          A true ambassador for Ugandan comedy, Dr. Hilary has represented
          Uganda on international stages. He performed at the Seka Live
          International Comedy Show in Kigali, Rwanda, alongside Anne Kansiime,
          and featured at the renowned Laugh Festival in Nairobi, Kenya. In
          2023, he took the stage at the Juba International Comedy Festival in
          South Sudan, and in 2024-2025, he showcased his talent at both the
          GenZ Comedy Festival in Kigali and the Kopala Comedy Show in Zambia.
        </p>

        <p className="text-white text-left mt-10">
          {" "}
          With three successful comedy specials recorded live at the Uganda
          National Theatre in just three years, Dr. Hilary has firmly planted
          his name in the Ugandan and African comedy scenes. He’s also made
          numerous TV appearances, including performances on Comedy Store NTV,
          Pablo Live, and The Salvador Show on Pearl Magic (Showmax). His
          writing credits include contributing to the first season of the Senkyu
          Boss comedy series on ShowMax.
        </p>

        <p className="text-white text-left mt-10">
          {" "}
          Recently expanding his horizons, Dr. Hilary ventured into acting with
          roles in POPI and Akatale Kange, both available on DSTV and ShowMax.
          Dr. Hilary&apos;s captivating persona and unmatched comedy style
          continue to draw crowds at his regular shows at the National Theatre
          in Kampala and across East Africa. He is also the proud co-founder of
          The Laughing Maraboustork, the hottest comedy club in Kampala,
          offering live shows three nights a week. For more info visit:{" "}
          <a
            className="text-yellow-600 hover:underline"
            href="https://www.laughingMaraboustork.com/"
            rel="noreferrer"
            target="_blank"
          >
            Laughing Maraboustork
          </a>
        </p>

        <p className="text-white text-left mt-10" />
      </section>
      {/* Contact */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Lets Connect</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            For bookings, press inquiries, or just to say hello, reach out
            through any of these channels.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://www.instagram.com/drhilaryokello/"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Instagram
            </Button>
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://twitter.com/DrHilaryOkello"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <Twitter className="mr-2 h-5 w-5" />
              Twitter
            </Button>
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://www.youtube.com/@drhilaryokello"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <Youtube className="mr-2 h-5 w-5" />
              YouTube
            </Button>
            <Button
              as={Link}
              className="border-white rounded-full text-white hover:bg-white hover:text-yellow-600"
              href="https://www.tiktok.com/@drhilaryokello"
              size="lg"
              target="_blank"
              variant="bordered"
            >
              <FaTiktok className="mr-2 h-5 w-5" />
              TikTok
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
