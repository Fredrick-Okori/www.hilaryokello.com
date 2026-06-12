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
        sans: ["var(--font-google-sans)", "system-ui", "sans-serif"],
        mono: ["system-ui", "monospace"],
      },
      lineHeight: {
        relaxed: '1.75',
        loose: '2',
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '2.5rem',
      },
      colors: {
        /* 60-30-10 Color Palette - WCAG AA Compliant */
        black: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          lighter: '#404040',
          muted: '#0d0d0d',
        },
        gold: {
          DEFAULT: '#D4A04A',
          light: '#E8BA6A',
          dark: '#9d7a2a',
          muted: '#B8882A',
        },
        red: {
          DEFAULT: '#E63946',
          light: '#F1576C',
          dark: '#A4161A',
          muted: '#C41E3A',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;
