import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ColorPalettePreset({ palette, onSelect }) {
    const [timers, setTimers] = useState([]);

    function handleCopyToClipboard(e, color) {
        navigator.clipboard.writeText(color);

        const tooltipElement = e.currentTarget.children[0];
        const tooltipText = tooltipElement.innerText;

        if (tooltipElement.innerText !== "Copied") {
            tooltipElement.innerText = "Copied";
            const timer = setTimeout(() => (tooltipElement.innerText = tooltipText), 1500);
            setTimers((prev) => [...prev, timer]);
        }
    }

    useEffect(() => {
        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [timers]);

    return (
        <Stack
            className="w-full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography className="text-xs font-medium">{palette.name}</Typography>
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
                            onClick={(e) => handleCopyToClipboard(e, color)}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
}
