"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

interface MenuItem {
  label: string;
  href: string;
  gradient: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Shows",
    href: "/#shows",
    gradient: "radial-gradient(circle, rgba(255,252,0,0.15), transparent)",
  },
  {
    label: "Watch & Listen",
    href: "/watch",
    gradient: "radial-gradient(circle, rgba(255,252,0,0.15), transparent)",
  },
  {
    label: "Gallery",
    href: "/gallery",
    gradient: "radial-gradient(circle, rgba(255,252,0,0.15), transparent)",
  },
  {
    label: "About",
    href: "/biography",
    gradient: "radial-gradient(circle, rgba(255,252,0,0.15), transparent)",
  },
];

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

export function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const islandText = isScrolled ? "text-black" : "text-white";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const panel = menuRef.current;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timeline = gsap.timeline();

    timeline.fromTo(
      panel,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: "power4.out",
      },
    );

    if (!prefersReducedMotion) {
      timeline
        .fromTo(
          panel.querySelector(".mobile-menu-header"),
          { y: -18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45, ease: "power3.out" },
          "-=0.48",
        )
        .fromTo(
          panel.querySelectorAll(".mobile-menu-link"),
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.52,
            stagger: 0.075,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          panel.querySelector(".mobile-menu-footer"),
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4, ease: "power2.out" },
          "-=0.22",
        );
    }

    return () => {
      timeline.kill();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closeMenu = () => {
    if (!menuRef.current) {
      setIsOpen(false);

      return;
    }

    gsap.to(menuRef.current, {
      yPercent: -100,
      duration: 0.58,
      ease: "power3.inOut",
      onComplete: () => setIsOpen(false),
    });
  };

  return (
    <motion.nav
      className={`fixed z-50 px-4 py-2 transition-[top,left,right,width,transform] duration-500 ease-out ${
        isScrolled
          ? "left-1/2 right-auto top-3 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-full border border-yellow-200 bg-yellow-400 text-black shadow-2xl shadow-black/30 backdrop-blur-xl"
          : "left-0 right-0 top-0 bg-transparent"
      }`}
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`pointer-events-none absolute -inset-2 z-0 rounded-3xl bg-gradient-radial from-transparent via-yellow-400/20 to-transparent ${isScrolled ? "opacity-60" : ""}`}
        variants={navGlowVariants}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between 2xl:max-w-[1440px] 3xl:max-w-[1680px] 4xl:max-w-[2400px]">
        <Link className="flex items-center gap-2" href="/">
          <span className={`${islandText} text-lg font-semibold`}>
            Dr. Hilary Okello
          </span>
        </Link>

        <div className="sm:hidden">
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`${islandText} rounded-full p-2`}
            onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        <ul className="ml-auto hidden items-center gap-2 rounded-full border border-gray-800 px-4 py-2 shadow-xl sm:flex">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="group relative block overflow-visible"
                initial="initial"
                style={{ perspective: "600px" }}
                whileHover="hover"
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                  variants={glowVariants}
                />
                <motion.a
                  className={`relative z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 transition-colors ${isScrolled ? "text-black group-hover:text-black" : "text-muted-foreground group-hover:text-white"}`}
                  href={item.href}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                  }}
                  transition={sharedTransition}
                  variants={itemVariants}
                >
                  <span className={isScrolled ? "text-black" : "text-white"}>
                    {item.label}
                  </span>
                </motion.a>
                <motion.a
                  className={`absolute inset-0 z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 transition-colors ${isScrolled ? "text-black group-hover:text-black" : "text-muted-foreground group-hover:text-white"}`}
                  href={item.href}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    rotateX: 90,
                  }}
                  transition={sharedTransition}
                  variants={backVariants}
                >
                  <span className={isScrolled ? "text-black" : "text-white"}>
                    {item.label}
                  </span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            aria-label="Main navigation"
            aria-modal="true"
            className="fixed inset-0 z-[60] min-h-[100dvh] overflow-y-auto bg-black text-white sm:hidden"
            role="dialog"
          >
            <div className="mx-auto flex min-h-[100dvh] w-full max-w-3xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
              <div className="mobile-menu-header mb-7 flex items-center justify-between gap-2">
                <Link
                  className="whitespace-nowrap text-[18px] font-extrabold leading-none text-yellow-400 sm:text-[22px]"
                  href="/"
                  onClick={() => setIsOpen(false)}
                >
                  Hilary Okello
                </Link>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    className="inline-flex h-11 items-center justify-center rounded-full bg-yellow-400 px-3 text-xs font-semibold text-black transition-transform active:scale-95 sm:px-5 sm:text-sm"
                    href="https://momoticketing.com/events/2-kings-one-mic"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Get Tickets
                  </a>
                  <button
                    aria-label="Close menu"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black transition-transform active:scale-95"
                    type="button"
                    onClick={closeMenu}
                  >
                    <X aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <nav aria-label="Main" className="flex flex-col gap-1.5">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.label}
                    className="mobile-menu-link flex min-h-[82px] items-center gap-5 rounded-full bg-white/10 px-7 transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="w-7 shrink-0 text-[15px] font-semibold tabular-nums text-white/50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-[30px] font-bold leading-none tracking-normal sm:text-5xl">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="mobile-menu-footer mt-auto pt-7">
                <nav aria-label="Social media" className="mb-5 flex gap-2.5">
                  {[
                    {
                      label: "Instagram",
                      href: "https://www.instagram.com/drhilaryokello/",
                      icon: <FaInstagram aria-hidden="true" />,
                    },
                    {
                      label: "X",
                      href: "https://twitter.com/DrHilaryOkello",
                      icon: <BsTwitterX aria-hidden="true" />,
                    },
                    {
                      label: "YouTube",
                      href: "https://www.youtube.com/@drhilaryokello",
                      icon: <FaYoutube aria-hidden="true" />,
                    },
                    {
                      label: "TikTok",
                      href: "https://www.tiktok.com/@drhilary_okello",
                      icon: <FaTiktok aria-hidden="true" />,
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg text-white transition-colors hover:bg-white/10"
                      href={social.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {social.icon}
                    </a>
                  ))}
                </nav>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm leading-relaxed text-white/50">
                  <span>© Dr. Hilary Okello {new Date().getFullYear()}</span>
                  <a href="https://www.kayetickets.com/">
                    Powered by KayeTickets
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </motion.nav>
  );
}
