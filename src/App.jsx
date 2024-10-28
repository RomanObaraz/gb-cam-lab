import "./styles/App.css";
import "./styles/ColorPicker.css";
import "filepond/dist/filepond.min.css";
import "./styles/Filepond.css";
import "./styles/ColorBlock.css";
import "./styles/FileBlock.css";
import "./styles/PhotoGallery.css";

import { useMemo, useState } from "react";
import { hexToRgb } from "./utils/utils";
import PhotoGallery from "./components/PhotoGallery";
import { useStore } from "./stores/useStore";
import FileBlock from "./components/fileBlock";
import ColorBlock from "./components/colorBlock";
import { defaultPalettePresets } from "./utils/constants";
import { useThrottledCallback } from "use-debounce";

export default function App() {
    const fileData = useStore((state) => state.fileData);
    const [palette, setPalette] = useState(structuredClone(defaultPalettePresets.blackAndWhite));

    const paletteRGB = useMemo(() => palette.colors.map((color) => hexToRgb(color)), [palette]);

    const handlePaletteColorChange = useThrottledCallback((index, colorValue) => {
        const newPalette = { ...palette };
        newPalette.colors[index] = colorValue;
        setPalette(newPalette);
    }, 50);

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
