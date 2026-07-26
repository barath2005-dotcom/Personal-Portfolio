/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#08080a',
          card: '#0e0e12',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#E5C158',
          dark: '#9A7B38',
          glow: 'rgba(197, 160, 89, 0.25)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E5C158 0%, #C5A059 50%, #9A7B38 100%)',
        'glass-card': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(229, 193, 88, 0.4)',
      },
    },
  },
  plugins: [],
}
