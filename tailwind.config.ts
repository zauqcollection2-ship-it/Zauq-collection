/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#F9F3E8',
          100: '#F0E3CC',
          200: '#E1C799',
          300: '#D2AB66',
          400: '#C39133',
          500: '#C9A84C',
          600: '#B8973A',
          700: '#A7862A',
          800: '#96751A',
          900: '#85640A',
        },
      },
    },
  },
  plugins: [],
}