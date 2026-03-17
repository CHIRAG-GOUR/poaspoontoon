/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: '#D2E8FE',
          green: '#E4F4D9',
          yellow: '#FFF4D2',
          pink: '#FFE4E8',
          orange: '#FFE8D6',
          purple: '#E8DAFF',
          mint: '#D5F5E3',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
