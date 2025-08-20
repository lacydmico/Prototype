/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'proxima-regular': ['"Proxima Nova Regular"', 'sans-serif'],
        'proxima-semibold': ['"Proxima Nova SemiBold"', 'sans-serif'],
      },
      colors: {
        'streaming-bg': 'rgb(18, 18, 18)',
        'card-bg': 'rgb(0, 0, 0)',
      },
      boxShadow: {
        'card': '0px 5px 20px 0px rgba(0, 0, 0, 0.75)',
        'elevated': '0px 10px 30px 0px rgba(0, 0, 0, 0.8)',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
    },
  },
  plugins: [],
};
