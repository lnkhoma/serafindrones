import type { Config } from "tailwindcss";

/**
 * Brand tokens sampled directly from /public/logo.png.
 *  - teal-brand  (#194649): wordmark & drone body. Dominant: nav, headers, footer.
 *  - green-brand (#4AA44C): the "eye" / lens and letter accents. Accent only:
 *    CTAs, icons, active states.
 *
 * Accessibility note: white text on green-brand is below WCAG AA (≈3:1), so
 * green buttons use dark teal text (`text-teal-brand-950`, ≈5.3:1). Use
 * `text-green-brand-700` when green *text* sits on a white background.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "teal-brand": {
          DEFAULT: "#194649",
          50: "#EEF5F5",
          100: "#D4E5E5",
          200: "#AACBCC",
          300: "#7BACAE",
          400: "#4D898C",
          500: "#2D6A6D",
          600: "#22575A",
          700: "#194649",
          800: "#14393C",
          900: "#0F2D2F",
          950: "#0A2022",
        },
        "green-brand": {
          DEFAULT: "#4AA44C",
          50: "#EFF8EF",
          100: "#DAF0DB",
          200: "#B6E0B7",
          300: "#8ACB8B",
          400: "#66B868",
          500: "#4AA44C",
          600: "#3B873D",
          700: "#2F6B31",
          800: "#285629",
          900: "#214723",
        },
        "off-white": "#F7F9F8",
        body: "#4B5563",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        heading: "-0.015em",
        eyebrow: "0.16em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,32,34,0.04), 0 8px 24px -8px rgba(10,32,34,0.12)",
        lift: "0 2px 4px rgba(10,32,34,0.06), 0 20px 40px -12px rgba(10,32,34,0.25)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        scan: "scan 6s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.2,0.6,0.4,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
