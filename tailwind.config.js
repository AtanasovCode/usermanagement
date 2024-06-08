/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'text': '#e4fcf2',
        'background': '#0b1511',
        'primary': '#2fc58f',
        'secondary': '#0b265f',
        'accent': '#3328dc',
       },            
    },
  },
  plugins: [],
}

