import { Group } from "@mantine/core";
import FileLoader from "./FileLoader";
import ColorPresetSelect from "./colorPresetSelect";
import ColorPalette from "./colorPalette";

export default function TopControls({
    isFileLoaded,
    palette,
    onPaletteColorChange,
    onPalettePresetSelect,
}) {
    return (
        <>
            <Group>
                <FileLoader />
                {isFileLoaded && (
                    <>
                        <ColorPalette colors={palette.colors} onChange={onPaletteColorChange} />
                        <ColorPresetSelect
                            currentPalette={palette}
                            onPresetSelect={onPalettePresetSelect}
                        />
                    </>
                )}
            </Group>
        </>
    );
}
