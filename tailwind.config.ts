import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0B",
          surface: "#141416",
          raised: "#1C1C1F",
          border: "rgba(255,255,255,0.08)",
        },
        signal: {
          DEFAULT: "#E50914",
          dim: "#A30710",
          glow: "rgba(229,9,20,0.35)",
        },
        paper: "#FFFFFF",
        muted: "#8A8A93",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "signal-radial":
          "radial-gradient(circle at 50% 0%, rgba(229,9,20,0.25) 0%, rgba(11,11,11,0) 60%)",
        "grain": "url('/noise.png')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
