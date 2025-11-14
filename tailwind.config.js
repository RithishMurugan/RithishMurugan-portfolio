/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { inter: ["Inter", "sans-serif"] },
      colors: {
        dark: "#0a192f",
        primary: "#4f9ef8",
        accent: "#64ffda",
      },
      backgroundImage: {
        gradient: "linear-gradient(to bottom right, #0a192f, #132e63, #1e3a8a)",
      },
    },
  },
  plugins: [],
};
