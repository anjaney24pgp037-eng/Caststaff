/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#0B1426',
          50: '#E8EDF2',
          100: '#D6DEE8',
          200: '#C3CDD9',
          300: '#A7B4C4',
          400: '#7A889E',
          500: '#4A5870',
          600: '#2E3A4F',
          700: '#1A2640',
          800: '#0F1A30',
          900: '#0A1230',
        },
        accent: {
          DEFAULT: '#2B3BFF',
          light: '#8EA0FF',
          dark: '#1A28CC',
        },
        mint: '#7CF0C8',
      },
      animation: {
        'flow': 'flow 1.4s linear infinite',
        'slide': 'slide 40s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        flow: {
          to: { strokeDashoffset: '-28' },
        },
        slide: {
          to: { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(142, 160, 255, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(142, 160, 255, 0.35)' },
        },
      },
    },
  },
  plugins: [],
};
