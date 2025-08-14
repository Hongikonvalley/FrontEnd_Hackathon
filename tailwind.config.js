// @type {import('tailwindcss').Config}
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        head: ['Rammetto One', 'sans-serif'],
      },
      colors: {
        primary: '#FF9743',
        secondary: '#F76F00',
      },
    },
  },
  plugins: [],
};
