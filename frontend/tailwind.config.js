module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F766E',
        secondary: '#0D9488',
        accent: '#F59E0B',
        dark: '#1F2937',
        light: '#F9FAFB',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      spacing: {
        'hero': '600px',
        'section': '100px',
      }
    },
  },
  plugins: [],
}
