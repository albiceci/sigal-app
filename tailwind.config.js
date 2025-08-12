/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "rgba(5,93,169,255)",
      primarysub: "rgba(1, 79, 138, 1)",
      primarysubalt: "rgba(0, 120, 211, 255)",
      presetgray: "rgb(60, 60, 60)",
      sapphire: "hsl(210 66% 53%)",
      cyan: colors.cyan,
      orange: colors.orange,
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      red: colors.red,
      blue: colors.blue,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },
    fontFamily: {
      regularFamily: ["Proxima Nova Regular", "sans-serif"],
      boldFamily: ["Proxima Nova Bold", "sans-serif"],
    },
    extend: {
      height: {},
      width: {},
      scale: {},
      boxShadow: {
        navbar: "0 5px 5px rgba(209, 208, 208, 0.5)",
      },
      keyframes: {
        bounce2: {
          "0%, 20%, 40%, 55%, 80%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(-5px)" },
        },
        bounceHorizontal: {
          "0%, 20%, 40%, 55%, 80%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateX(-10px)" },
          "60%": { transform: "translateX(-5px)" },
        },
        fadein: {
          from: { opacity: "0%" },
          to: { opacity: "100%" },
        },
      },
    },
  },
  plugins: [],
};
