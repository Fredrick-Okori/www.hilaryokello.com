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
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
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
        cream: '#fff7e5',
        ink: '#1f1a17',
        yellow: {
          50: '#fbeae6',
          100: '#f4c7bc',
          200: '#e07a63',
          300: '#b8361b',
          400: '#9b2912',
          500: '#9b2912',
          600: '#83220f',
          700: '#6a1c0c',
          800: '#521509',
          900: '#3a0f06',
          950: '#220904',
        },
        black: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          lighter: '#404040',
          muted: '#0d0d0d',
        },
        gold: {
          DEFAULT: '#9b2912',
          light: '#b8361b',
          dark: '#83220f',
          muted: '#9b2912',
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
