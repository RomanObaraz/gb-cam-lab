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
        <Stack direction="row" alignItems="center">
            <Typography className="w-20 text-left text-xs font-medium text-primary-main">
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
                            onClick={(e) => handleCopyToClipboard(e, color)}
                        />
                    );
                })}
            </Stack>
        </Stack>
    );
}
