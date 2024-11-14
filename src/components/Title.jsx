import { Typography, useTheme } from "@mui/material";

export default function Title() {
    const theme = useTheme();

    return (
        <Typography
            sx={{
                fontSize: "6rem",
                fontFamily: "Orbitron",
                fontWeight: 900,
                color: theme.palette.secondary.main,
                textShadow: `5px 5px ${theme.palette.primary.main}`,
                WebkitTextStroke: `2px ${theme.palette.base.main}`,
            }}
        >
            GB Cam Lab
        </Typography>
    );
}
