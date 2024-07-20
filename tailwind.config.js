/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  
    './public/index.html'          
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '300px',
        'xs' : '425px',
        'xxl': '2560px',
      },
      fontFamily: {
        poppins:["poppins, sans-serif"],
        playwrite: ["Playwrite DE Grund, cursive"], 
      }
    },
  },
  plugins: [],
}

