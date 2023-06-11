/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FDCEDF",
        secondary: "#F2BED1",
        tertiary: "#F8E8EE",
        background: "#F9F5F6",
        charcoal: "#36454F",
      },
    },
  },
  plugins: [],
};
