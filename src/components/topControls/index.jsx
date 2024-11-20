import FileLoader from "./FileLoader";
import ColorPresetSelect from "./colorPresetSelect";
import ColorPalette from "./colorPalette";
import { Stack } from "@mui/material";
import { twMerge } from "tailwind-merge";

export default function TopControls({
    isFileLoaded,
    palette,
    onPaletteColorChange,
    onPalettePresetSelect,
}) {
    const stackCenteredStyle = "absolute top-0 left-0 bottom-0 right-0 items-center";

    return (
        <Stack
            className={twMerge(isFileLoaded ? "" : stackCenteredStyle, "justify-center mt-3")}
            direction="row"
            spacing={6}
        >
            <FileLoader />
            {isFileLoaded && (
                <>
                    <ColorPalette colors={palette.colors} onChange={onPaletteColorChange} />
                    <Stack className="ml-6" direction="row" spacing={6}>
                        <ColorPresetSelect
                            currentPalette={palette}
                            onPresetSelect={onPalettePresetSelect}
                        />
                    </Stack>
                </>
            )}
        </Stack>
    );
}
