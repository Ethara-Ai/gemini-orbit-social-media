/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        orbit: {
          50: '#FFF8F1',
          100: '#FFEEDD',
          200: '#FFDDBB',
          300: '#FFC692',
          400: '#FFAA64',
          500: '#FF8833', // Primary Orange
          600: '#E66A1F',
          700: '#CC4E12',
          800: '#A6380E',
          900: '#852D0F',
        }
      }
    },
  },
  plugins: [],
}

