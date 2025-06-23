/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {

      colors:{
        primary:"E72929",
        secondary:"FFE2E2",
        tertiary:"B43929",
        accent:"#000000"

      }
    },
  },
  plugins: [],
}