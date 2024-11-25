import FileLoader from "./FileLoader";
import ColorPresetSelect from "./colorPresetSelect";
import ColorPalette from "./colorPalette";
import { twMerge } from "tailwind-merge";

export default function TopControls({
    isFileLoaded,
    palette,
    onPaletteColorChange,
    onPalettePresetSelect,
}) {
    const stackCenteredStyle = "absolute top-0 left-0 bottom-0 right-0 items-center";

    return (
        <div
            className={twMerge(
                "flex gap-12 mt-8 justify-center",
                isFileLoaded ? "" : stackCenteredStyle
            )}
        >
            <FileLoader />
            {isFileLoaded && (
                <>
                    <ColorPalette colors={palette.colors} onChange={onPaletteColorChange} />
                    <div className="flex -ml-6 gap-12">
                        <ColorPresetSelect
                            currentPalette={palette}
                            onPresetSelect={onPalettePresetSelect}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
