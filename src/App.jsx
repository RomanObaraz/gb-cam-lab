import "./styles/App.css";
import FileLoader from "./components/FileLoader";
import { useFileStore } from "./stores/useFileStore";
import { useMemo, useState } from "react";
import ColorPalette from "./components/ColorPalette";
import { hexToRgb } from "./utils/utils";
import PhotoGallery from "./components/PhotoGallery";
import ImageDownloader from "./components/ImageDownloader";
import ColorPalettePresetsBlock from "./components/ColorPalettePresetsBlock";
import { defaultPalettePresets } from "./utils/defaultPalettes";

export default function App() {
    const fileData = useFileStore((state) => state.fileData);
    const [imageScale, setImageScale] = useState(3);
    const [palette, setPalette] = useState(structuredClone(defaultPalettePresets.blackAndWhite));

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

    function handleScaleInputChange(e) {
        let inputValue = e.target.value;

        // Allow empty string so user can clear input
        if (inputValue === "") {
            setImageScale("");
        } else if (inputValue > 0) {
            // Remove leading zeros to prevent input like "01"
            inputValue = inputValue.replace(/^0+/, "");
            setImageScale(inputValue);
        } else {
            setImageScale(1);
        }
    }

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
            {/* Top block (all controls) */}
            {/* //TODO: move to control block folder */}
            <div id="controlBlock">
                {/* Left block (file loader, scale input, image downloader) */}
                {/* //TODO: move to file block folder */}
                <div id="fileBlock">
                    <FileLoader />
                    {fileData && (
                        <>
                            {/* //TODO: move to separate component */}
                            <div>
                                <span>Scale: </span>
                                <input
                                    type="number"
                                    pattern="\d*"
                                    min={1}
                                    max={10}
                                    value={imageScale}
                                    onChange={handleScaleInputChange}
                                    onKeyDown={(e) =>
                                        ["e", "E", "+", "-", "."].includes(e.key) &&
                                        e.preventDefault()
                                    }
                                />
                                <span>{` (${128 * imageScale}x${112 * imageScale} px)`}</span>
                            </div>
                            <ImageDownloader imageScale={imageScale} />
                        </>
                    )}
                </div>
                {/* Right block (color palette, presets) */}
                {/* //TODO: move to color block folder */}
                <div id="colorBlock">
                    <ColorPalette colors={palette.colors} onChange={handlePaletteColorChange} />
                    <ColorPalettePresetsBlock
                        currentPalette={palette}
                        onPresetSelect={handlePalettePresetSelect}
                    />
                </div>
            </div>
            {/* Bottom block (gallery) */}
            {fileData && (
                <PhotoGallery fileData={fileData} imageScale={imageScale} paletteRGB={paletteRGB} />
            )}
        </>
    );
}
