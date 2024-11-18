import { Typography } from "@mui/material";

export default function Title() {
    return (
        <Typography
            className="
                text-[6rem]
                font-[Orbitron]
                font-black
                text-secondary-main
            "
            sx={{
                textShadow: `5px 5px var(--palette-primary-main)`,
                WebkitTextStroke: `2px var(--palette-base-main)`,
            }}
        >
            GB Cam Lab
        </Typography>
    );
}
