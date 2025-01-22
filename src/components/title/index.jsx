import { Typography } from "@mui/material";

export const Title = () => {
    return (
        <Typography
            className="text-8xl max-sm:text-[44px] sm:max-lg:text-6xl mt-0 font-[Orbitron] font-black text-secondary-main"
            sx={(theme) => ({
                transitionProperty: "color, shadow-color, -webkit-text-stroke-color",
                textShadow: `5px 5px var(--palette-text-primary)`,
                WebkitTextStroke: `2px var(--palette-base-main)`,
                [theme.breakpoints.down("sm")]: {
                    textShadow: `2px 2px var(--palette-text-primary)`,
                    WebkitTextStroke: `1px var(--palette-base-main)`,
                },
                [theme.breakpoints.between("sm", "lg")]: {
                    textShadow: `4px 4px var(--palette-text-primary)`,
                    WebkitTextStroke: `2px var(--palette-base-main)`,
                },
            })}
        >
            GB Cam Lab
        </Typography>
    );
};
