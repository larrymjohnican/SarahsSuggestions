const flowbite = require("flowbite-react/tailwind");
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', // Ensure the patterns match your files
    flowbite.content(),
  ],
  plugins: [
    flowbite.plugin(),
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        'navy': '#0f1729',
        'navy-light': '#1a2744',
        'indigo-night': '#1e1b4b',
        'gold': '#c9a227',
        'gold-light': '#e8c96a',
        'cream': '#f5f0e8',
        'parchment': '#d9c9a8',
        'ember': '#b87333',
        // keep legacy colors
        'midnight': '#121063',
        'metal': '#565584',
      },
      fontFamily: {
        sans: ['Lora', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        'card-enter': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'moon-float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'star-pop': { '0%': { transform: 'scale(0)' }, '70%': { transform: 'scale(1.25)' }, '100%': { transform: 'scale(1)' } },
        'page-fade': { from: { opacity: '0' }, to: { opacity: '1' } },
        'sparkle-twinkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'card-enter': 'card-enter 0.45s ease-out both',
        'moon-float': 'moon-float 2s ease-in-out infinite',
        'star-pop': 'star-pop 0.3s ease-out both',
        'page-fade': 'page-fade 0.25s ease-out both',
        'sparkle-twinkle': 'sparkle-twinkle 1.4s ease-in-out infinite',
      },
    }
  }
};
