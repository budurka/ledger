
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glassLight: "rgba(255, 255, 255, 0.6)",
        glassDark: "rgba(18, 18, 18, 0.6)",
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
