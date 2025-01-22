import FileLoader from "./FileLoader";
import ColorPresetSelect from "./colorPresetSelect";
import ColorPalette from "./colorPalette";
import { twMerge } from "tailwind-merge";
import IndexedAnimatePresence from "../IndexedAnimatePresence";

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
                "flex gap-12 mt-8 justify-center max-lg:flex-col max-lg:items-center max-lg:gap-6",
                isFileLoaded ? "" : stackCenteredStyle
            )}
        >
            <FileLoader />
            {isFileLoaded && (
                <div className="flex max-md:flex-col max-md:items-center max-md:gap-6">
                    <IndexedAnimatePresence index={0}>
                        <ColorPalette colors={palette.colors} onChange={onPaletteColorChange} />
                    </IndexedAnimatePresence>
                    <IndexedAnimatePresence index={1}>
                        <div className="flex ml-4 gap-12 max-sm:ml-0">
                            <ColorPresetSelect
                                currentPalette={palette}
                                onPresetSelect={onPalettePresetSelect}
                            />
                        </div>
                    </IndexedAnimatePresence>
                </div>
            )}
        </div>
    );
}
