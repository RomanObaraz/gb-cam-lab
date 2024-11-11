import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#ED2A3A",
                },
                secondary: {
                    main: "#232858",
                },
                background: { default: "#F0DEC6" },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: "#ED2A3A",
                },
                secondary: {
                    main: "#232858",
                },
                background: { default: "#22323F" },
            },
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                outlined: ({ theme }) => ({
                    color: `${theme.palette.secondary.main}`,
                    borderWidth: "2px",
                    borderRadius: "8px",
                    borderColor: `${theme.palette.primary.main}`,
                    boxShadow: `2px 2px ${theme.palette.primary.main}`,
                }),
            },
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
);
