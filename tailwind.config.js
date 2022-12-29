const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./partials/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        default: "var(--color-background)",
        element: "var(--color-elements)",
      },
      colors: {
        primary: {
          main: "var(--color-primary-main)",
          shadow: "var(--color-primary-shadow)",
          light: "var(--color-primary-light)",
        },
        "neutral-light": "var(--color-neutral-light)",
      },
      textColor: {
        main: "var(--color-text-default)",
        muted: "var(--color-text-muted)",
        light: "var(--color-text-light)",
        inverted: "var(--color-text-inverted)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
