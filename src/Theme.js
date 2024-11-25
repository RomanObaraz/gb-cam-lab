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
                text: {
                    primary: "#232858",
                    secondary: "#ED2A3A",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: "#E7CAA0",
                },
                secondary: {
                    main: "#DBA54F",
                },
                base: {
                    main: "#22323F",
                    dark: "#324A5D",
                },
                background: { default: "#22323F" },
                action: {
                    hover: "#324A5D",
                },
                divider: "#E7CAA0",
                text: {
                    primary: "#E7CAA0",
                    secondary: "#DBA54F",
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
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 4,
                    color: theme.palette.primary.main,
                    "&:hover": {
                        backgroundColor: theme.palette.action.hover,
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
        MuiOutlinedInput: {
            defaultProps: {
                notched: false,
            },
            styleOverrides: {
                notchedOutline: ({ theme }) => ({
                    border: `2px solid ${theme.palette.secondary.main}`,
                    borderRadius: 8,
                }),
                root: ({ theme }) => ({
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${theme.palette.secondary.main}`,
                    },
                }),
                input: ({ theme }) => ({
                    paddingLeft: 8,
                    paddingRight: 0,
                    paddingTop: 8,
                    paddingBottom: 8,
                    color: `${theme.palette.primary.main}`,
                    fontSize: 14,
                    fontWeight: `${theme.typography.fontWeightBold}`,
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: ({ theme }) => ({
                    top: -20,
                    color: `${theme.palette.primary.main}`,
                    fontSize: 14,
                    fontWeight: `${theme.typography.fontWeightBold}`,
                    transform: "none",
                    transition: "none",
                }),
            },
        },
    },
});
