/* eslint-disable no-undef */
import colors from "tailwindcss/colors";
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['"Ubuntu"', ...defaultTheme.fontFamily.sans],
        roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans],
        josefin: ['"Josefin Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#B554D7",
        secondary: "#c476df",
        background: "#121D2B",
        ...colors,
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tailwind-scrollbar-hide"),
  ],
};
