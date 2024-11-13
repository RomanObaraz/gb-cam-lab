import { createTheme } from "@mui/material";

const themeColors = {
    red: {
        main: "#ED2A3A",
    },
    blue: {
        main: "#232858",
    },
    beige: {
        main: "#F0DEC6",
        dark: "#E8CCA6",
    },
};

export const theme = createTheme({
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
                primary: themeColors.blue,
                secondary: themeColors.red,
                base: themeColors.beige,
                background: { default: themeColors.beige.main },
                action: {
                    hover: themeColors.beige.dark,
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: "#232858",
                },
                secondary: {
                    main: "#ED2A3A",
                },
                background: { default: "#22323F" },
                action: {
                    hover: "#E8CCA6",
                },
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
    },
});
