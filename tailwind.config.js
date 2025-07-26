
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glassLight: 'rgba(255, 255, 255, 0.75)',
        glassDark: 'rgba(30, 30, 30, 0.75)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
