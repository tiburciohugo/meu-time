/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#DF5656",
        secondary: "#F2C94C",
        tertiary: "#F2994A",
        quaternary: "#219653",
        quinary: "#56CCF2",
        senary: "#2F80ED",
        septenary: "#9B51E0",
        octonary: "#BB6BD9",
        nonary: "#EB5757",
        denary: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
