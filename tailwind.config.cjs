/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "200px",
        smaller: "200px"
      },
      fontFamily: {
        "notable": "'Notable', sans-serif"
      },
      colors: {
        "dark-blue": "#170D35",
        "light-blue": "#4200FE",
        "gray-black": "#08001F",
        "orange-whitish": "#301A00",
        orange: "#FF8A00",
        grayish: "#808080"
      },
      animation: {
        "focus-image": "focus-image 5s ease-in infinite ",
        "loose-focus-image": "loose-focus-image 5s ease-in    infinite"
      },
      keyframes: {
        "focus-image": {
          "0%": {
            transform: "translateX(0px)"
          },
          "25%": {
            transform: "translateX(0px)"
          },
          "50%": {
            transform: "translateX(0px)"
          },
          "75%": {
            transform: "translateX(0px)"
          },
          "95%": {
            transform: "translateX(-150%)"
          },
          "100%": {
            transform: "translateX(0px)"
          }
        },
        "loose-focus-image": {
          "0%": {
            transform: "translateX(0px)"
          },
          "25%": {
            transform: "translateX(0px)"
          },
          "50%": {
            transform: "translateX(0px)"
          },
          "75%": {
            transform: "translateX(0px)"
          },
          "95%": {
            transform: "translateX(-150%)"
          },
          "100%": {
            transform: "translateX(0px)"
          }
        }
      }
    }
  },
  plugins: []
};
