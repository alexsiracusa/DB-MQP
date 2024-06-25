/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgP': '#E0EEFF',
        'bgS': '#BDE3FF',
        'bgT': '#F6F6F6',
        'txtP': '#000000',
        'txtS': '#FFFFFF',
        'accP': '#022F50',
        'accS': '#0D99FF',
        'accT': '#FF962C',
      },
      fontFamily: {
        Raleway: ['Raleway', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
