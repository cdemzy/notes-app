/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '730px', // Default value for sm:
        'md': '768px', // Custom value for md:
        'lg': '1186px', // Default value for lg:
        'xl': '1280px', // Default value for xl:
      },
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
      },
    },
  },
  plugins: [],
}

