import { Button } from "@mui/material";
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
        <div className="palettePreset">
            <Button variant="outlined" onClick={() => onSelect(palette)}>
                {palette.name}
            </Button>
            <div className="palettePreview">
                {palette.colors.map((color, index) => {
                    return (
                        <div
                            key={`colorPreview-${index}`}
                            className="colorPreview"
                            style={{ background: color }}
                            onClick={(e) => handleCopyToClipboard(e, color)}
                        >
                            <span className="colorPreviewTooltip">{color}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
