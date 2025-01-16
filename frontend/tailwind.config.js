module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all relevant files are included
  ],
  theme: {
    extend: {
      fontFamily: {
        bricolage: ['Bricolage Grostesque', 'sans-serif'], // Define your font name here
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
