import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { GlobalStyles, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./Theme.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalStyles
                    styles={(theme) => ({
                        body: {
                            backgroundColor: theme.palette.background.default,
                            margin: 0,
                            color: theme.palette.text.primary,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            fontSize: "1rem",
                            lineHeight: 1.5,
                        },
                    })}
                />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>
    </StrictMode>
);
