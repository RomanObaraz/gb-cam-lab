import "./styles/App.css";
import { useMemo, useState } from "react";
import { hexToRgb } from "./utils/utils";
import PhotoGallery from "./components/PhotoGallery";
import { useStore } from "./stores/useStore";
import FileBlock from "./components/fileBlock";
import ColorBlock from "./components/colorBlock";
import { defaultPalettePresets } from "./utils/defaultPalettes";

export default function App() {
    const fileData = useStore((state) => state.fileData);
    const [palette, setPalette] = useState(structuredClone(defaultPalettePresets.blackAndWhite));

    // const paletteRGB = useMemo(() => palette.colors.map((color) => hexToRgb(color)), [palette]);
    const paletteRGB = useMemo(
        //TODO: use map
        () => [
            hexToRgb(palette.colors[0]),
            hexToRgb(palette.colors[1]),
            hexToRgb(palette.colors[2]),
            hexToRgb(palette.colors[3]),
        ],
        [palette]
    );

    function handlePaletteColorChange(index, colorValue) {
        const newPalette = { ...palette };
        newPalette.colors[index] = colorValue;
        setPalette(newPalette);
    }

    function handlePalettePresetSelect(newPalette) {
        // clone preset data so that we don't change the preset itself
        setPalette(structuredClone(newPalette));
    }

    return (
        <>
            <div id="controlsBlock">
                <FileBlock />
                <ColorBlock
                    palette={palette}
                    onPaletteColorChange={handlePaletteColorChange}
                    onPalettePresetSelect={handlePalettePresetSelect}
                />
            </div>
            {fileData && <PhotoGallery fileData={fileData} paletteRGB={paletteRGB} />}
        </>
    );
}
