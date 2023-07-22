/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "night"],
    darkTheme: "night",
  },
}
