/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    fontFamily: {
      sans: [`Ubuntu Mono`, `monospace`],
      mono: [`Ubuntu Mono`, `monospace`],
    },
    colors: {
      current: `currentColor`,
      neutral: {
        0: `#ffffff`,
        200: `#cccccc`,
        300: `#b3b3b3`,
        350: `#a7a7a7`,
        500: `#808080`,
        600: `#666666`,
        800: `#333333`,
        900: `#1a1a1a`,
        1000: `#000000`,
      },
      info: {
        500: `#16c60c`,
      },
      log: {
        500: `#3b78ff`,
      },
    },
    extend: {},
  },
  plugins: [`prettier-plugin-tailwindcss`],
};
