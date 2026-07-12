"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { ChevronRight } from "lucide-react";

import Partners from "@/components/partners";

const contactMethods = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+256 784 704143",
    href: "https://wa.me/256784704143",
    description: "Quick responses for booking inquiries",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp (Alt)",
    value: "+256 752 734280",
    href: "https://wa.me/256752734280",
    description: "Alternative booking line",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://instagram.com/drhilaryokello",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com/drhilaryokello",
    label: "Twitter",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com/@drhilaryokello",
    label: "YouTube",
  },
  {
    icon: FaTiktok,
    href: "https://tiktok.com/@drhilaryokello",
    label: "TikTok",
  },
];

const bookingHighlights = [
  {
    title: "Corporate events",
    text: "From keynote-style sets to high-energy entertainment that keeps the room engaged.",
  },
  {
    title: "Private functions",
    text: "Perfect for weddings, birthdays, and intimate celebrations with a polished edge.",
  },
  {
    title: "Festivals & tours",
    text: "Built for large stages, audiences, and unforgettable headline moments.",
  },
];

export default function BookingPage() {
  return (
    <section className="w-full bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[80vh] overflow-hidden">
        {/* Decorative network visualization */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <Image
            fill
            alt=""
            className="object-cover"
            quality={60}
            src="/download.png"
          />
        </div>
        <Image
          fill
          priority
          alt="Book Dr. Hilary Okello - Uganda's Premier Comedian"
          className="object-cover brightness-[0.28]"
          quality={80}
          src="/6417a8348314497a428acf03_Chips-Header-Background.jpg"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.16),_transparent_45%),linear-gradient(135deg,rgba(0,0,0,0.9),rgba(0,0,0,0.45),rgba(0,0,0,0.8))]" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-10"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-yellow-400 bg-yellow-500/10 rounded-full border border-yellow-500/20">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              Now Booking for 2026
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Book <span className="text-yellow-500">Dr. Hilary Okello</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Uganda&apos;s top stand-up comedian is available for corporate
              events, private functions, festivals, and international tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <Button
                as="a"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20"
                href="https://wa.me/256784704143"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaWhatsapp size={20} />
                +256 784 704143
              </Button>
              <Button
                as="a"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-full border border-white/15 transition-all duration-200 transform hover:scale-[1.02]"
                href="https://wa.me/256752734280"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaWhatsapp size={20} />
                +256 752 734280
              </Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 text-left">
              {bookingHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/70">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.08),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#0f0f0f_100%)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-400">
                Book with ease
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold mb-4">
                Get in <span className="text-yellow-500">Touch</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg leading-relaxed">
                Ready to make your event unforgettable? Reach out through any of
                these channels and our team will get back to you within 24
                hours.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-yellow-500/30 hover:bg-white/10"
                    href={method.href}
                    initial={{ opacity: 0, x: -20 }}
                    rel="noopener noreferrer"
                    target="_blank"
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <div
                      className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${method.bgColor}`}
                    >
                      <method.icon className={`h-6 w-6 ${method.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white/60">{method.label}</p>
                      <p className="font-semibold text-white truncate">
                        {method.value}
                      </p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {method.description}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-yellow-500" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-transparent p-5">
                <p className="text-sm text-white/60 mb-4">Follow for updates</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
                      href={social.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/40">
                <Image
                  fill
                  alt="Dr. Hilary Okello performing"
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src="/harare/e0ae9f44d17f47586c3a5dd2aaf829dc.avif"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-yellow-500/15 via-black/70 to-black/90 p-8 text-center shadow-2xl shadow-yellow-500/10 sm:p-10"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Let&apos;s Make Your Event{" "}
            <span className="text-yellow-500">Legendary</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
            Don&apos;t settle for ordinary entertainment. Book Dr. Hilary Okello
            and give your guests an experience they&apos;ll never forget.
          </p>
          <Button
            as="a"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-10 py-5 text-lg font-bold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-yellow-400"
            href="https://wa.me/256784704143"
            rel="noopener noreferrer"
            target="_blank"
          >
            Start the Conversation
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Partners Section */}
      <div className="py-12 sm:py-16 bg-black border-t border-white/10">
        <Partners />
      </div>
    </section>
  );
}
