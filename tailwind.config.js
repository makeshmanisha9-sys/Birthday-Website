/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          darkest: '#050406',
          dark: '#0B090E',
          surface: '#120F17',
          card: '#181420',
          border: 'rgba(212, 175, 55, 0.18)',
          borderStrong: 'rgba(212, 175, 55, 0.35)',
        },
        burgundy: {
          950: '#1A060E',
          900: '#2A0B17',
          800: '#431024',
          700: '#5F1734',
          600: '#7E1F45',
        },
        champagne: {
          50: '#FDFBF7',
          100: '#F9F5EA',
          200: '#F3EACD',
          300: '#EBDCB0',
          400: '#E2CA88',
          500: '#D4AF37', // metallic gold
          600: '#BA9422',
          700: '#947214',
          800: '#6E520F',
          900: '#48350A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(212, 175, 55, 0.08)',
        'luxury-glow': '0 0 50px rgba(212, 175, 55, 0.25), 0 20px 40px rgba(0, 0, 0, 0.8)',
        'burgundy-glow': '0 0 60px rgba(126, 31, 69, 0.35)',
        'gold-glow': '0 0 35px rgba(229, 193, 88, 0.35)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FBF2D5 0%, #D4AF37 50%, #AA7C11 100%)',
        'gold-subtle': 'linear-gradient(135deg, rgba(253, 246, 226, 0.15) 0%, rgba(212, 175, 55, 0.15) 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(67, 16, 36, 0.35) 0%, rgba(11, 9, 14, 0.95) 70%, #050406 100%)',
        'velvet-gradient': 'linear-gradient(180deg, rgba(42, 11, 23, 0.7) 0%, rgba(11, 9, 14, 0.95) 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-gentle': 'floatGentle 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'rotate-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.7', filter: 'blur(28px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
