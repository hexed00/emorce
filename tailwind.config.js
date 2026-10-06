/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0e0e10',
        card: '#141416',
        field: '#1a1a1e',
        line: '#26262c',
        text: '#f5f5f7',
        muted: '#9696a0',
        faint: '#64646e',
        good: '#34d399',
        bad: '#ef5a5a',
        accent: '#a78bfa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
