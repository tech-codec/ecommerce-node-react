/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
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
        '25p':'25%',
        '30p': '30%',
        '40p': '40%',
        '74p':'74%',
        '69p':'69%',
        '59p':'59%',
        '79p': '79%',
        '134p': '134%',
        '450px': '450px'
        // Ajoutez d'autres pourcentages si nécessaire
      },
      colors:{
        'plan-gray': ""
      },
      screens:{
        'cart-img-360':'360px',
        'banner_670':'670px',
        'banner_890':'890px',
        'visible_filter':'1001px',
        'lg': '1007px',
        'height-e':'1066px',
        'md-wrap': '1156px',
        'list_p_1179':'1179px',
        'rousel-height-1':'1230px',
        'cart-wrap':'1280px',
        'list_p_1406':'1406px',
        'xl':'1524px',
        'sc-1193': '1193px'
        
      },
      sizes:{
        "font-size": "24px"
      },
    },
  },
  plugins: [
    require('tw-elements/plugin.cjs'),
    flowbite.plugin(),
    require('flowbite/plugin')
  ],
}