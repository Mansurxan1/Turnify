/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter, sans-serif"],
      },
      screens: {
        'phone': '450px',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(44.57deg, #0061FF 0.37%, #52DAFF 99.63%)',
      },
    },
  },
  plugins: [],
};
