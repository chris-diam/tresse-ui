/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cormorant Garamond', 'serif'], // This makes it the default font
        cormorant: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}