import { Typography } from "@mui/material";

export default function Title() {
    return (
        <Typography
            className="text-8xl max-sm:text-[44px] sm:max-lg:text-6xl mt-0 font-[Orbitron] font-black text-secondary-main"
            sx={{
                textShadow: `5px 5px var(--palette-text-primary)`,
                WebkitTextStroke: `2px var(--palette-base-main)`,
            }}
        >
            GB Cam Lab
        </Typography>
    );
}
