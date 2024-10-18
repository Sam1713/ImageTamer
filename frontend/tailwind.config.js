/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #000000, #1a1a1a, #333333, #4d4d4d)',
      },
    },
  },
  plugins: [],
}