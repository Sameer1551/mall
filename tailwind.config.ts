import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './components/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bodoni: ['"Bodoni Moda"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8CC6A',
          dark: '#B8941E',
        },
        dark: {
          DEFAULT: '#050505',
          100: '#1A1A1A',
          200: '#111111',
          300: '#0D0D0D',
        },
        light: '#F5F5F5',
        glass: 'rgba(255,255,255,0.05)',
        'glass-border': 'rgba(255,255,255,0.1)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8CC6A 50%, #D4AF37 100%)',
        'dark-gradient': 'linear-gradient(180deg, #050505 0%, #1A1A1A 100%)',
      },
      animation: {
        'gold-shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'line-draw': 'lineDraw 2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212,175,55,0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineDraw: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212,175,55,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
