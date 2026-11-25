/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bliv: {
          bg: '#F7F8F5',
          surface: '#FFFFFF',
          'surface-secondary': '#F0F3EE',
          dark: '#26372F',
          green: '#668775',
          sage: '#DDE8DF',
          'sage-muted': '#A8B9AA',
          'warm-neutral': '#EDEAE3',
          'text-primary': '#27332D',
          'text-secondary': '#78847C',
          border: '#E7EBE5',
          success: '#648B70',
          warning: '#C69B60',
          error: '#B86D67',
          info: '#718DA5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        'bliv': '12px',
        'bliv-lg': '16px',
        'bliv-sm': '8px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(39, 51, 45, 0.04), 0 1px 2px -1px rgba(39, 51, 45, 0.04)',
        'card': '0 4px 12px 0 rgba(39, 51, 45, 0.04), 0 1px 3px 0 rgba(39, 51, 45, 0.02)',
        'float': '0 12px 28px -4px rgba(39, 51, 45, 0.08), 0 4px 10px -2px rgba(39, 51, 45, 0.03)',
      }
    },
  },
  plugins: [],
}
