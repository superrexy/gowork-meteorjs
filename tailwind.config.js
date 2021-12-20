module.exports = {
  content: [
    "./imports/ui/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#48494e",
          100: "#3e3f44",
          200: "#34353a",
          300: "#2a2b30",
          400: "#202126",
          500: "#16171c",
          600: "#0c0d12",
          700: "#020308",
          800: "#000000",
          900: "#000000",
        },
        secondary: {
          50: "#66e5ff",
          100: "#5cdbff",
          200: "#52d1ff",
          300: "#48c7ff",
          400: "#3ebdff",
          500: "#34b3ff",
          600: "#2aa9f5",
          700: "#209feb",
          800: "#1695e1",
          900: "#0c8bd7",
        },
      },
      container: {
        center: "true",
        padding: "2rem",
      },
      backgroundSize: {
        "50%": "50%",
      },
      height: {
        "section-image": "30rem",
      },
      fontFamily: {
        poppins: [
          'Poppins',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  plugins: [],
}
