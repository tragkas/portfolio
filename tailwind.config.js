/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Custom Earthy Palette
                // Replacing standard grays/slates with these tones where appropriate
                // or using them as a primary brand palette
                earth: {
                    900: '#2A0800', // Darkest - Text, Dark Backgrounds
                    800: '#5C3A30', // Interpolated Dark
                    700: '#775144', // Dark - Secondary Text, Borders
                    600: '#9C7569', // Interpolated Medium-Dark
                    500: '#C09891', // Medium - Primary Accents, Buttons
                    400: '#D6B8B2', // Interpolated Light-Medium
                    300: '#BEA8A7', // Light - Subtle Backgrounds, Borders
                    200: '#DBCBC9', // Interpolated Light
                    100: '#F4DBD8', // Lightest - Main Backgrounds, Cards
                    50: '#FAF0EF',  // Very Light - Hover states
                },
                // Mapping common utility colors to our palette to auto-theme existing components
                gray: {
                    900: '#2A0800',
                    800: '#421C14', // Custom blend
                    700: '#5C3A30',
                    600: '#775144',
                    500: '#9C7569',
                    400: '#C09891',
                    300: '#D6B8B2',
                    200: '#BEA8A7',
                    100: '#F4DBD8',
                    50: '#FAF0EF',
                },
                slate: {
                    900: '#2A0800',
                    800: '#421C14',
                    700: '#5C3A30',
                    600: '#775144',
                    500: '#9C7569',
                    400: '#C09891',
                    300: '#D6B8B2',
                    200: '#BEA8A7',
                    100: '#F4DBD8',
                    50: '#FAF0EF',
                }
            },
        },
    },
    plugins: [],
}
