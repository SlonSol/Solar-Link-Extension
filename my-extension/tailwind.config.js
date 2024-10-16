// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-border': 'gradient-border 3s ease infinite',
      },
      keyframes: {
        'gradient-border': {
          '0%': { borderColor: '#FFD700' },
          '50%': { borderColor: '#FFA500' },
          '100%': { borderColor: '#FFD700' },
        },
      },
      borderColor: {
        'gold': '#FFD700',
        'dark-gold': '#FFA500',
      },
    },
  },
  plugins: [],
}
