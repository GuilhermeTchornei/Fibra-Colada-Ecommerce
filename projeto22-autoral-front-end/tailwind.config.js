/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#f27a28',
        'dark-orange': '#c05b18',
        'green': '#00a390'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        max: '1480px',
      },
      keyframes: {
        'fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '100'}
        }
      },
      animation: {
        'fade-in': 'fade 100ms ease-in-out'
      }
    },
  },
  plugins: [],
}
