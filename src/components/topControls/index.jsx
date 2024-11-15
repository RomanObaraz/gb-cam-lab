import FileLoader from "./FileLoader";
import ColorPresetSelect from "./colorPresetSelect";
import ColorPalette from "./colorPalette";
import { Stack } from "@mui/material";

export default function TopControls({
    isFileLoaded,
    palette,
    onPaletteColorChange,
    onPalettePresetSelect,
}) {
    return (
        <Stack
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                justifyContent: "center",
                alignItems: "center",
            }}
            direction="row"
        >
            <FileLoader />
            {isFileLoaded && (
                <>
                    <ColorPalette colors={palette.colors} onChange={onPaletteColorChange} />
                    {/* <ColorPresetSelect
                            currentPalette={palette}
                            onPresetSelect={onPalettePresetSelect}
                        /> */}
                </>
            )}
        </Stack>
    );
}
