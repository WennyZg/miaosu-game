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
        midnight: {
          DEFAULT: "#0a0e27",
          light: "#141852",
          lighter: "#1e2a78",
        },
        stardust: {
          DEFAULT: "#c8d6e5",
          bright: "#f0f4ff",
        },
      },
      animation: {
        twinkle: "twinkle var(--twinkle-duration, 3s) ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 2s infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "fade-slide-in": "fadeSlideIn 0.6s ease-out both",
        "shooting-star": "shootingStar 1.2s ease-out forwards",
        "moon-glow": "moonGlow 4s ease-in-out infinite",
        "nebula-pulse": "nebulaPulse 2s ease-in-out infinite",
        "nebula-expand": "nebulaExpand 1.5s ease-out forwards",
        "cat-appear": "catAppear 0.6s ease-out both",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.7), 0 0 60px rgba(59, 130, 246, 0.4)" },
        },
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shootingStar: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
          "100%": { transform: "translateX(-300px) translateY(300px)", opacity: "0" },
        },
        moonGlow: {
          "0%, 100%": { boxShadow: "0 0 40px rgba(255, 236, 179, 0.3), 0 0 80px rgba(255, 236, 179, 0.1)" },
          "50%": { boxShadow: "0 0 60px rgba(255, 236, 179, 0.5), 0 0 120px rgba(255, 236, 179, 0.2)" },
        },
        nebulaPulse: {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.05)", filter: "brightness(1.2)" },
        },
        nebulaExpand: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.5)" },
          "100%": { opacity: "0", transform: "scale(2.5)" },
        },
        catAppear: {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.8)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
