const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './index.html', 
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],      
    // darkMode: media,
    theme: {
        extend: {
            colors: {
                'ynwa': '#0A8983',
                'ynwa-orange': '#FFAE4E'
            },
            fontFamily: {
                header: ['Saira Extra Condensed', ...defaultTheme.fontFamily.sans],
                mono: [ 'Fira Code', ...defaultTheme.fontFamily.mono],
                sans: [ 'Hind', ...defaultTheme.fontFamily.sans],
            },
            screens: {
                '3xl': '1920px'
            },
        },
    }
}