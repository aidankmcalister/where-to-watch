import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#B554D7",
      secondary: "#c476df",
      background: "#121D2B",
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
