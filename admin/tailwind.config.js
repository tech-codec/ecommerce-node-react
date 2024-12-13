/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '15p': '15%',
        '85p': '85%',
        '550px': '550px',
        '1400px': '1400px',
      },
      screens: {
        '299bp':"299px",
        '400m': '400px',
        '545bp': '545px',
        '1400m': '1400px'
      },
    },
  },
  plugins: [],
}