import { useEffect, useMemo, useState } from "react";
import { useThrottledCallback } from "use-debounce";
import { useColorScheme } from "@mui/material";
import { OverlayScrollbars } from "overlayscrollbars";
import { isMobile } from "react-device-detect";

import { hexToRgb } from "./utils/utils";
import { PhotoGallery } from "./components/photo-gallery";
import { useStore } from "./stores/useStore";
import { CUSTOM_PALETTE_PRESET_NAME, defaultPalettePresets } from "./utils/constants";
import { TopControls } from "./components/top-controls";
import { DownloadControls } from "./components/download-controls";
import { ColorSchemeSwitch } from "./components/color-scheme-switch";
import { Title } from "./components/title";
import { IndexedAnimatePresence } from "./components/indexed-animated-presence";
import { Footer } from "./components/footer";
import "filepond/dist/filepond.min.css";
import "overlayscrollbars/overlayscrollbars.css";

export const App = () => {
    const { mode, setMode } = useColorScheme();

    const fileData = useStore((state) => state.fileData);
    const [palette, setPalette] = useState(structuredClone(defaultPalettePresets.blackAndWhite));

    const paletteRGB = useMemo(() => palette.colors.map((color) => hexToRgb(color)), [palette]);

    const handlePaletteColorChange = useThrottledCallback((index, colorValue) => {
        const newPalette = { ...palette };
        newPalette.id = "custom";
        newPalette.name = CUSTOM_PALETTE_PRESET_NAME;
        newPalette.colors[index] = colorValue;
        setPalette(newPalette);
    }, 50);

    const handlePalettePresetSelect = (newPalette) => {
        // clone preset data so that we don't change the preset itself
        setPalette(structuredClone(newPalette));
    };

    useEffect(() => {
        if (!isMobile) {
            OverlayScrollbars(document.body, {
                scrollbars: { autoHide: "never" },
            });

            return () => {
                OverlayScrollbars(document.body)?.destroy();
            };
        }
    }, []);

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
                    <div className="-mt-8 max-lg:mt-6">
                        <IndexedAnimatePresence index={2}>
                            <PhotoGallery fileData={fileData} paletteRGB={paletteRGB} />
                        </IndexedAnimatePresence>
                        <IndexedAnimatePresence index={3}>
                            <DownloadControls />
                        </IndexedAnimatePresence>
                        <IndexedAnimatePresence index={4}>
                            <Footer />
                        </IndexedAnimatePresence>
                    </div>
                </>
            )}
        </>
    );
};
