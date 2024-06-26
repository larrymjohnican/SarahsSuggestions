const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // Extend or override Material Tailwind's default theme here
            colors: {
                primary: '#1E40AF',
                secondary: '#EC4899',
                // Add more colors as needed
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            // Add more theme customizations as required
        },
        // Add any other Tailwind CSS configurations or plugins here
        plugins: [],
    },
});
