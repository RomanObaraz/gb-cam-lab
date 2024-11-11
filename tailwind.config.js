/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {},
    },
    important: "#root",
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
