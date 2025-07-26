import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        card: "rgba(255, 255, 255, 0.1)",
        border: "rgba(255, 255, 255, 0.3)"
      },
      backdropBlur: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
