/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    important: "#root",
    theme: {
        extend: {
            colors: {
                primary: {
                    main: "var(--palette-primary-main)",
                },
                secondary: {
                    main: "var(--palette-secondary-main)",
                },
                base: {
                    main: "var(--palette-base-main)",
                    dark: "var(--palette-base-dark)",
                },
            },
        },
        screens: {
            sm: "640px",
            md: "840px",
            lg: "1180px",
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
