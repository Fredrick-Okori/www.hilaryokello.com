"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Home, Settings, Bell, User, Menu as MenuIcon, X } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
    icon: undefined
  },

  {
    label: "Biography",
    href: "/biography",
    gradient: "radial-gradient(circle, rgba(255,140,0,0.15) 0%, rgba(255,107,0,0.06) 50%, rgba(239,78,0,0) 100%)",
    iconColor: "text-yellow-500",
    icon: undefined
    },
  {
    label: "Gallery",
    href: "/gallery",
    gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
    icon: undefined
  },
  {
    label: "Contact",
    href: "/booking",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
    icon: undefined
  },
]

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

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
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function MenuBar() {
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50  backdrop-filter backdrop-blur-md  bg-transparent px-4 py-2"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? "via-blue-400/30 via-30% via-purple-400/30 via-60% via-red-400/30 via-90%"
            : "via-blue-400/20 via-30% via-purple-400/20 via-60% via-red-400/20 via-90%"
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo/Brand */}
        <a href="/" className="flex items-center gap-2">
         
          <span className="text-white font-semibold text-lg">Dr. Hilary Okello</span>
        </a>

        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-white" /> : <MenuIcon className="text-white" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center backdrop-blur-lg  border border-gray-800 rounded-full px-4 py-2 shadow-xl gap-2 ml-auto">
          {menuItems.map((item) => (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />
                <motion.a
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-muted-foreground group-hover:text-white transition-colors rounded-xl"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                  }}
                >
                  <span className={`transition-colors duration-300 group-hover:${item.iconColor} text-white`}>
                    {item.icon}
                  </span>
                  <span className="text-white">{item.label}</span>
                </motion.a>
                <motion.a
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent text-muted-foreground group-hover:text-white transition-colors rounded-xl"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    rotateX: 90,
                  }}
                >
                
                  <span>{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="sm:hidden mt-3 flex flex-col items-end gap-2">
          {menuItems.map((item) => (
            <li key={item.label} className="w-full">
              <a
                href={item.href}
                className="flex items-center justify-end gap-2 px-4 py-2 text-white rounded-xl bg-black/30 hover:bg-black/50 transition"
              >
               
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.nav>
  )
}
