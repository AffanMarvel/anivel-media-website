import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#EEEEEE",
        crimson: {
          DEFAULT: "#CB2957",
          50: "#FDF2F4",
          100: "#FCE7EC",
          200: "#F8C4CF",
          300: "#F294AA",
          400: "#E65A7F",
          500: "#CB2957",
          600: "#B31C45",
          700: "#911436",
          800: "#75132D",
          900: "#450A19",
          glow: "rgba(203, 41, 87, 0.35)",
        },
        surface: {
          DEFAULT: "#08080A",
          elevated: "#101014",
          card: "#0C0C0F",
          border: "rgba(255, 255, 255, 0.08)",
          "border-crimson": "rgba(203, 41, 87, 0.3)",
        },
        secondaryText: "#DDDDDD",
        mutedText: "#88888E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        glow: {
          "0%": { opacity: "0.4", filter: "blur(20px)" },
          "100%": { opacity: "0.85", filter: "blur(32px)" },
        },
      },
      boxShadow: {
        "crimson-glow": "0 0 25px -5px rgba(203, 41, 87, 0.35)",
        "crimson-lg": "0 0 50px -10px rgba(203, 41, 87, 0.4)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};
export default config;
