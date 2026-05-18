/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "Noto Sans", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Figtree", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#18181B",
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#3F3F46",
          foreground: "#FAFAFA",
        },
        cta: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
        },
        surface: {
          DEFAULT: "#FAFAFA",
          muted: "#F4F4F5",
        },
        ink: {
          DEFAULT: "#09090B",
          muted: "#3F3F46",
        },
        hero: {
          from: "#0f1419",
          via: "#18181B",
          to: "#27272a",
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 10px 24px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
