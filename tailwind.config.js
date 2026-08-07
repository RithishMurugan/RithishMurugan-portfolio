/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
          DEFAULT: "var(--color-cta)",
          hover: "var(--color-cta-hover)",
        },
        surface: {
          DEFAULT: "#FAFAFA",
          muted: "#F4F4F5",
        },
        ink: {
          DEFAULT: "#09090B",
          muted: "#3F3F46",
        },
        foreground: "var(--color-foreground)",
        background: "var(--color-background)",
        card: "var(--color-card)",
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        border: "var(--color-border)",
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
