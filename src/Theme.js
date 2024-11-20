import { createTheme } from "@mui/material";

export const theme = createTheme({
    cssVariables: {
        cssVarPrefix: "",
        colorSchemeSelector: "class",
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        button: {
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: "bold",
        },
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#232858",
                },
                secondary: {
                    main: "#ED2A3A",
                },
                base: {
                    main: "#F0DEC6",
                    dark: "#E8CCA6",
                },
                background: { default: "#F0DEC6" },
                action: {
                    hover: "#E8CCA6",
                },
                divider: "#232858",
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
                base: {
                    main: "#22323F",
                    dark: "#0f161c",
                },
                background: { default: "#22323F" },
                action: {
                    hover: "#0f161c",
                },
                divider: "#ED2A3A",
            },
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "outlined",
                disableRipple: true,
            },
            styleOverrides: {
                outlined: ({ theme }) => ({
                    height: "40px",
                    color: `${theme.palette.primary.main}`,
                    borderWidth: "2px",
                    borderRadius: "8px",
                    borderColor: `${theme.palette.secondary.main}`,
                    boxShadow: `2px 2px ${theme.palette.secondary.main}`,
                    transition: `${theme.transitions.create(
                        ["background-color", "box-shadow", "border-color", "color", "transform"],
                        {
                            duration: "100ms",
                            easing: theme.transitions.easing.easeInOut,
                        }
                    )}`,
                    "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                    },
                    "&:active": {
                        boxShadow: `0 0 ${theme.palette.secondary.main}`,
                        transform: "translateY(2px)",
                    },
                }),
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    opacity: 0.6,
                },
            },
        },
    },
});
