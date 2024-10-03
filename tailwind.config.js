// tailwind.config.js

module.exports = {
  darkMode: 'class', // Enable class-based dark mode

  content: [
    './src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
    './public/**/*.html',
    './node_modules/flowbite/**/*.js', // Ensure Flowbite's JS files are included
  ],

  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      // For example, adding custom colors:
      // colors: {
      //   customBlue: '#1fb6ff',
      // },
    },
  },

  plugins: [
    require('flowbite/plugin'), // Integrate Flowbite's plugin
  ],
};
