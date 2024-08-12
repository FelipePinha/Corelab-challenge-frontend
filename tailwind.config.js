/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#BAE2FF',
        'light-green': '#B9FFDD',
        'light-yellow': '#FFE8AC',
        'peach-pink': '#FFCAB9',
        'pale-pink': '#F99494',
        'sky-blue': '#9DD6FF',
        'lavender-pink': '#ECA1FF',
        'lemon-green': '#DAFF8B',
        'light-orange': '#FFA285',
        'light-silver': '#CDCDCD',
        'neutral-gray': '#979797',
        'sandy-brown': '#A99A7C'
      },
      fontFamily: {
        sans: 'Inter'
      }
    },
  },
  plugins: [],
}

