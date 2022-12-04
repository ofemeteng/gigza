/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    "./modules/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshiRegular: ["Satoshi-Regular"],
        satoshiMedium: ["Satoshi-Medium"],
        satoshiBold: ["Satoshi-Bold"],
      },
      colors: {
        primary: '#4F46E5',
        primary2: '#1C144C',
        b1: '#1B1C1E',
        b2: '#323335',
        b3: '#49494B',
        b4: '#5F6062',
        black1: '#2A333D',
        black3: '#615C66',
      }
    },
  },
  plugins: [],
}
