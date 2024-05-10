/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'background': "url('/src/images/background.jpeg')",
        'log': "url('/src/Images/bg2.gif')",
      }),
    },
  },
  plugins: [],
}

