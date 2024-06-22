/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#022F50',
        'light-blue': '#BDE3FF',
        'baby-blue': '#0D99FF',
      },
    }
  },
  plugins: [],
}
