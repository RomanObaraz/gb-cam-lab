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
        <>
            <Stack direction="row">
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
        </>
    );
}
