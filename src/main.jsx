import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { App } from "./App.jsx";
import { theme } from "./Theme.js";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme} defaultMode="light">
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
);
