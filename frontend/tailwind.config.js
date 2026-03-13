/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'amaris-brown': "var(--amaris-brown)",
        'amaris-brown-light': "var(--amaris-brown-light)",
        'amaris-gold': "var(--amaris-gold)",
        'amaris-gold-hover': "var(--amaris-gold-hover)",
        'amaris-offwhite': "var(--amaris-offwhite)",
        // Keep these for potential existing references
        cream: "var(--amaris-offwhite)",
        brownDark: "var(--amaris-brown)",
        brownLight: "var(--amaris-brown-light)",
        gold: "var(--amaris-gold)",
        goldHover: "var(--amaris-gold-hover)"
      }
    }
  },
  plugins: []
}
