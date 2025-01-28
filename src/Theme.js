import { alpha, createTheme } from "@mui/material";

export const theme = createTheme({
    cssVariables: {
        cssVarPrefix: "",
        colorSchemeSelector: "class",
    },
    breakpoints: {
        values: {
            sm: 640,
            md: 840,
            lg: 1180,
        },
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
                    main: "#29A197",
                },
                secondary: {
                    main: "#DBA54F",
                },
                base: {
                    main: "#22323F",
                    dark: "#354450",
                },
                background: { default: "#22323F" },
                action: {
                    hover: "#354450",
                },
                divider: "#29A197",
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
                    height: 40,
                    color: `${theme.palette.text.primary}`,
                    borderWidth: 2,
                    borderRadius: 8,
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
                        transform: "translate(2px, 2px)",
                    },
                    "&.Mui-disabled": {
                        borderWidth: 2,
                        borderColor: alpha(theme.palette.secondary.main, 0.3),
                        boxShadow: `2px 2px ${alpha(theme.palette.secondary.main, 0.3)}`,
                    },
                }),
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 4,
                    color: theme.palette.text.primary,
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
                    color: `${theme.palette.text.primary}`,
                    fontSize: 14,
                    fontWeight: `${theme.typography.fontWeightBold}`,
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: ({ theme }) => ({
                    top: -20,
                    color: `${theme.palette.text.primary}`,
                    fontSize: 14,
                    fontWeight: `${theme.typography.fontWeightBold}`,
                    transform: "none",
                    transition: "none",
                }),
            },
        },
    },
});
