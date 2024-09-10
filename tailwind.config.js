/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customLightOrange: "#fff8f1",
        customOrange: "#e05d5d",
        customBlack: "#222222",
        customDark: "#474d56",
      },
    },
  },
  plugins: [],
};
