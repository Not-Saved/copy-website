/** @type {import('tailwindcss').Config} */

const designWidth = 1920
const designHeight = 1080

function getViewportWidthRelativeValue(value) {
    return `${((value * 4) / designWidth) * 100}vw`
}

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            sans: ['Slussen', 'sans-serif'],
        },
        fontSize: {
            sm: '0.8rem',
            'vw-18': getViewportWidthRelativeValue(4.5),
            xl: '1.25rem',
            '2xl': '1.563rem',
            '3xl': '1.953rem',
            '4xl': '2.441rem',
            '5xl': '3.052rem',
        },
        extend: {
            colors: {
                pink: '#ff98a2',
                grey: '#b0b0b0',
                white: '#efefef',
            },
            spacing: {
                'vw-1': getViewportWidthRelativeValue(1),
                'vw-4.5': getViewportWidthRelativeValue(4.5),
                'vw-10': getViewportWidthRelativeValue(10),
                'vw-13': getViewportWidthRelativeValue(13),
                'vw-16': getViewportWidthRelativeValue(16),
            },
        },
    },
    plugins: [],
}
