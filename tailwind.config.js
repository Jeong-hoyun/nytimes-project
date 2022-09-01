/** @type {import('tailwindcss').Config} */ 
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