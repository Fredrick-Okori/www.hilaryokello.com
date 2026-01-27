import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-viga)", "system-ui", "sans-serif"],
        mono: ["system-ui", "monospace"],
      },
      colors: {
        /* 60-30-10 Color Palette */
        black: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          lighter: '#2a2a2a',
          muted: '#0a0a0a',
        },
        gold: {
          DEFAULT: '#C89021',
          light: '#D4A04A',
          dark: '#A67818',
          muted: '#8B6914',
        },
        red: {
          DEFAULT: '#FF0000',
          light: '#FF3333',
          dark: '#CC0000',
          muted: '#990000',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;
