/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // Brand accent
        brand: {
          DEFAULT: "#1D9E75",
          light: "#E1F5EE",
          dark: "#0F6E56",
        },
        // Member colors — top-border accent + avatar bg
        member: {
          teal:   { bg: "#E1F5EE", text: "#0F6E56", border: "#1D9E75" },
          purple: { bg: "#EEEDFE", text: "#3C3489", border: "#7F77DD" },
          coral:  { bg: "#FAECE7", text: "#712B13", border: "#D85A30" },
          blue:   { bg: "#E6F1FB", text: "#0C447C", border: "#378ADD" },
          amber:  { bg: "#FAEEDA", text: "#633806", border: "#BA7517" },
        },
      },
    },
  },
  plugins: [],
};
