import { Typography } from "@mui/material";

export default function Title() {
    return (
        <Typography
            sx={{
                textShadow: `5px 5px var(--palette-primary-main)`,
                WebkitTextStroke: `2px var(--palette-base-main)`,
            }}
            className="
                text-[6rem]
                font-[Orbitron]
                font-black
                text-secondary-main
            "
        >
            GB Cam Lab
        </Typography>
    );
}
