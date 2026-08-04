import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        matte: {
          black: '#1A1A1A',
          gray: '#2D2D2D',
          light: '#F5F5F5',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;