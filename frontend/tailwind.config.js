/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {
      spacing: {
        '3p':'3%',
        '5p':'5%',
        '10p': '10%',
        '10.5p': '10.5%',
        '15p': '15%',
        '20p': '20%',
        '30p': '30%',
        '134p': '134%',
        // Ajoutez d'autres pourcentages si nécessaire
      },
      colors:{
        'plan-gray': ""
      },
      screens:{
        'lg': '1007px',
        'height-e':'1066px',
        'md-wrap': '1156px',
        'rousel-height-1':'1230px',
        'xl':'1524px',
        
      },
      sizes:{
        "font-size": "24px"
      },
    },
  },
  plugins: [
    require('tw-elements/plugin.cjs'),
    require('flowbite/plugin')
  ],
}