import { Box, Stack, Typography } from "@mui/material";
import { twMerge } from "tailwind-merge";

export default function ColorPalettePreset({ palette, isHeader = false }) {
    return (
        <Stack direction="row" alignItems="center">
            <Typography
                className={twMerge(
                    "w-20 text-left text-xs font-medium text-primary-main",
                    isHeader && "w-fit pr-2 font-bold"
                )}
            >
                {palette.name}
            </Typography>
            <Stack
                className="border-2 border-solid border-primary-main rounded-[4px]"
                direction="row"
            >
                {palette.colors.map((color, index) => {
                    return (
                        <Box
                            key={`colorPreview-${index}`}
                            className="size-4 min-w-4 min-h-4"
                            style={{ backgroundColor: color }}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
}
