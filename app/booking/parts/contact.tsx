"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
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
    value: "+256 752 734280",
    href: "https://wa.me/256752734280",
    description: "Quick responses for booking inquiries",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp (Alt)",
    value: "+256 784 704143",
    href: "https://wa.me/256784704143",
    description: "Alternative booking line",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "info@hilaryokello.com",
    href: "mailto:info@hilaryokello.com",
    description: "For detailed proposals & contracts",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: FaPhone,
    label: "Call",
    value: "+256 752 734280",
    href: "tel:+256752734280",
    description: "Speak directly with the team",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
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



export default function BookingPage() {
  return (
    <section className="w-full bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[80vh] overflow-hidden">
        <Image
          fill
          priority
          alt="Book Dr. Hilary Okello - Uganda's Premier Comedian"
          className="object-cover brightness-[0.3]"
          quality={80}
          src="/hero_bg.webp"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-yellow-500 bg-yellow-500/10 rounded-full border border-yellow-500/20">
              Now Booking for 2026
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Book <span className="text-yellow-500">Dr. Hilary Okello</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Uganda&apos;s top stand-up comedian available for corporate
              events, private functions, festivals, and international tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <Button
                as="a"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-base rounded-full transition-all transform hover:scale-105"
                href="https://wa.me/256752734280?text=Hello%2C%20I%20would%20like%20to%20book%20Dr.%20Hilary%20Okello%20for%20an%20event."
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaWhatsapp size={20} />
                +256 752 734280
              </Button>
              <Button
                as="a"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-full transition-all transform hover:scale-105"
                href="https://wa.me/256784704143?text=Hello%2C%20I%20would%20like%20to%20book%20Dr.%20Hilary%20Okello%20for%20an%20event."
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaWhatsapp size={20} />
                +256 784 704143
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Get in <span className="text-yellow-500">Touch</span>
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Ready to make your event unforgettable? Reach out through any of
                these channels and our team will get back to you within 24
                hours.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                    href={method.href}
                    initial={{ opacity: 0, x: -20 }}
                    rel="noopener noreferrer"
                    target="_blank"
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <div
                      className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <method.icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/60">{method.label}</p>
                      <p className="font-semibold text-white truncate">
                        {method.value}
                      </p>
                      <p className="text-xs text-white/50 mt-0.5">
                        {method.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-yellow-500 transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-sm text-white/60 mb-4">Follow for updates</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      aria-label={social.label}
                      className="w-11 h-11 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 hover:text-black transition-all"
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

            {/* Right: Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  fill
                  alt="Dr. Hilary Okello performing"
                  className="object-cover"
                  quality={80}
                  src="/gallery/crowd.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <p className="text-sm text-white/80">
                      &quot;Dr. Hilary had our entire team in stitches! Best
                      corporate event we&apos;ve ever had.&quot;
                    </p>
                    <p className="text-xs text-yellow-500 mt-2 font-semibold">
                      — Corporate Client, Kampala
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Let&apos;s Make Your Event{" "}
            <span className="text-yellow-500">Legendary</span>
          </h2>
          <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
            Don&apos;t settle for ordinary entertainment. Book Dr. Hilary Okello
            and give your guests an experience they&apos;ll never forget.
          </p>
          <Button
            as="a"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg rounded-full transition-all transform hover:scale-105"
            href="https://wa.me/256752734280?text=Hello%2C%20I%20would%20like%20to%20discuss%20booking%20Dr.%20Hilary%20Okello%20for%20my%20event."
            rel="noopener noreferrer"
            target="_blank"
          >
            Start the Conversation
            <ChevronRight className="w-5 h-5" />
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
