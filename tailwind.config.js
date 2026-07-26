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
          DEFAULT: '#050608',
          surface: '#0a0b0e',
          card: '#0e0f14',
          border: 'rgba(255, 255, 255, 0.06)',
        },
        gold: {
          DEFAULT: '#E8C48E',
          light: '#F0D4A8',
          medium: '#D4B878',
          dark: '#C5A059',
          muted: '#9A7B38',
          glow: 'rgba(232, 196, 142, 0.25)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8C48E 0%, #D4B878 50%, #C5A059 100%)',
        'glass-surface': 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'glass-border': 'linear-gradient(135deg, rgba(232, 196, 142, 0.15) 0%, rgba(232, 196, 142, 0.05) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(232, 196, 142, 0.2)',
        'gold-glow-lg': '0 0 50px rgba(232, 196, 142, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(232, 196, 142, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      borderRadius: {
        'glass': '24px',
        'glass-lg': '32px',
      },
      backdropBlur: {
        'glass': '24px',
        'glass-heavy': '40px',
      },
    },
  },
  plugins: [],
}
