/** @type {import('tailwindcss').Config}  
   UnifrakturMaguntia cursive폰트 설정
   group-hover 적용을 위한 설정   
     */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      // font: ["Lobster", "cursive"],
      headerFont: ["UnifrakturMaguntia", "cursive"]
    }
  },
  plugins: [],
  variants: {
    extend: {
        display: ["group-hover"],
    },
},
}