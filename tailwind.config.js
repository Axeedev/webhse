/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3b82f6',
                secondary: '#f59e0b',
                danger: '#ef4444',
                success: '#10b981',
                background: '#f3f4f6',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
            }
        },
    },
    plugins: [],
}
