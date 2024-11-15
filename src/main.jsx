import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "./Theme.js";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
                styles={(theme) => ({
                    body: { backgroundColor: theme.palette.background.default },
                })}
            />
            <App />
        </ThemeProvider>
    </StrictMode>
);
