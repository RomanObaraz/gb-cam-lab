import "filepond/dist/filepond.min.css";
import "./styles/App.css";
// import "./styles/ColorBlock.css";
// import "./styles/FileBlock.css";
import "./styles/PhotoGallery.css";
import "overlayscrollbars/overlayscrollbars.css";

import { useMemo, useState } from "react";
import { hexToRgb } from "./utils/utils";
import PhotoGallery from "./components/PhotoGallery";
import { useStore } from "./stores/useStore";
import { defaultPalettePresets } from "./utils/constants";
import TopControls from "./components/topControls";
import DownloadControls from "./components/downloadControls";
import { useThrottledCallback } from "use-debounce";
import ColorSchemeSwitch from "./components/ColorSchemeSwitch";
import Title from "./components/Title";
import { useColorScheme } from "@mui/material";

export default function App() {
    const { mode, setMode } = useColorScheme();

    const fileData = useStore((state) => state.fileData);
    const [palette, setPalette] = useState(structuredClone(defaultPalettePresets.blackAndWhite));

    const paletteRGB = useMemo(() => palette.colors.map((color) => hexToRgb(color)), [palette]);

    const handlePaletteColorChange = useThrottledCallback((index, colorValue) => {
        const newPalette = { ...palette };
        newPalette.colors[index] = colorValue;
        newPalette.name = "Custom";
        setPalette(newPalette);
    }, 50);

    function handlePalettePresetSelect(newPalette) {
        // clone preset data so that we don't change the preset itself
        setPalette(structuredClone(newPalette));
    }

    if (!mode) return null;

    return (
        <>
            <ColorSchemeSwitch colorScheme={mode} onSwitch={setMode} />
            <Title />
            <TopControls
                isFileLoaded={!!fileData}
                palette={palette}
                onPaletteColorChange={handlePaletteColorChange}
                onPalettePresetSelect={handlePalettePresetSelect}
            />

            {fileData && (
                <>
                    {/* <PhotoGallery fileData={fileData} paletteRGB={paletteRGB} /> */}
                    {/* <DownloadControls /> */}
                </>
            )}
        </>
    );
}
