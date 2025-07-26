import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      dropShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        glass: 'rgba(255, 255, 255, 0.05)',
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
