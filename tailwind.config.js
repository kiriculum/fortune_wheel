/** @type {import('tailwindcss').Config} */
export default {
  content: [
    /* Process all JavaScript files in fortune. */
    'fortune/**/*.{js,jsx,ts,tsx,vue}',
    'fortune/**/templates/**/*.html',
    'fortune/**/*.py',

    /* Ignore any JavaScript in node_modules folder. */
    '!**/node_modules',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

