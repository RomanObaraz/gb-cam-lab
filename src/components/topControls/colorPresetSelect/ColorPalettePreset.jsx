import { Typography } from "@mui/material";
import { twMerge } from "tailwind-merge";

export default function ColorPalettePreset({ palette, isHeader = false }) {
    return (
        <div className="flex items-center">
            <Typography
                className={twMerge(
                    "w-20 text-left text-xs font-medium",
                    isHeader && "w-fit pr-2 font-bold"
                )}
            >
                {palette.name}
            </Typography>
            <div className="flex border-2 border-solid border-primary-main rounded">
                {palette.colors.map((color, index) => {
                    return (
                        <div
                            key={`colorPreview-${index}`}
                            className="size-4"
                            style={{ backgroundColor: color }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
