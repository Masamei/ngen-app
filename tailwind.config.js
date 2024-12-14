module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all JavaScript and TypeScript files
    './public/index.html',        // Include HTML files if needed
  ],
  theme: {
    colors: {
      white: '#ffffff',
      customBackground: '#232833',
      grey: '#7e8a8a',
      green: '#5eba47',
      silver: '#c4cee1',
      red: 'red',
    },
  },
  fontFamily: {
    sans: ['Roboto', 'sans-serif'],
  },
  plugins: [],
}
