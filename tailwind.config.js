/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Harbal: ['"Nunito"','"sans-serif"'],
      },
    },
  },
  plugins: [],
}
