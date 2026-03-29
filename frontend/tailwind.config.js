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
      }
    }
  }
};
