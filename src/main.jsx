import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "./styles/index.css";
import { Button, createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
        red: [
            "#ffe8eb",
            "#ffd1d5",
            "#faa2aa",
            "#f4707b",
            "#ef4553",
            "#ed2a3a",
            "#ed1a2d",
            "#d30a20",
            "#bd001b",
            "#a60015",
        ],
        blue: [
            "#e6e7ee",
            "#ced0dd",
            "#b6bacc",
            "#9ea3bb",
            "#888eaa",
            "#727899",
            "#5c6489",
            "#484f78",
            "#353c68",
            "#232858",
        ],
        beige: [
            "#fbf5ee",
            "#f5e8d7",
            "#f0dec6",
            "#d1c1ac",
            "#b2a592",
            "#95897a",
            "#786f62",
            "#5d554b",
            "#433d35",
            "#2a2621",
        ],
    },
    primaryColor: "blue",
    primaryShade: 9,
    components: {
        Button: Button.extend({
            defaultProps: {
                variant: "outline",
                bd: "2px solid red.5",
                radius: 8,
            },
        }),
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MantineProvider theme={theme} defaultColorScheme="light">
            <App />
        </MantineProvider>
    </StrictMode>
);
