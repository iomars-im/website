/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CHANGED: Updated from #396EA3 to #57a7f8 (brighter blue)
        // ORIGINAL: 'iom-blue': '#396EA3',
        'iom-blue': '#57a7f8',        // Primary bright blue
        'iom-blue-dark': '#2D5680',   // Darker ocean blue
        'iom-blue-light': '#5A90C2',  // Light ocean blue
        // Legacy aliases for backwards compatibility
        // CHANGED: Updated from #396EA3 to #57a7f8
        // ORIGINAL: 'iom-red': '#396EA3',
        'iom-red': '#57a7f8',
        'iom-red-dark': '#2D5680',
        'iom-yellow': '#5A90C2',
      },
    },
  },
  plugins: [],
}
