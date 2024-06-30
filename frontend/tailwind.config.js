module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      'frontend/node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    theme: {
      extend: {},
    },
    plugins: [require('flowbite/plugin')

    ],
  }