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

// TODO
// * make scale input better
// * preview resulting resolution for scale input
// * save file validation
// * color palette shifting

export default function App() {
    const fileData = useFileStore((state) => state.fileData);
    const [imageScale, setImageScale] = useState(3);
    const [palette, setPalette] = useState(structuredClone(defaultPalettePresets.blackAndWhite));

    const paletteRGB = useMemo(
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

        // Parse to integer to remove leading zeros
        if (inputValue !== "" && inputValue > 0) {
            inputValue = inputValue.replace(/^0+/, "") || "0"; // Remove leading zeros to prevent input like "01"
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
            <FileLoader />
            <ColorPalette colors={palette.colors} onChange={handlePaletteColorChange} />
            <ColorPalettePresetsBlock
                currentPalette={palette}
                onPresetSelect={handlePalettePresetSelect}
            />

            {fileData && (
                <>
                    <div>
                        Scale:{" "}
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={imageScale}
                            onChange={handleScaleInputChange}
                        />
                    </div>
                    <ImageDownloader imageScale={imageScale} />
                    <PhotoGallery
                        fileData={fileData}
                        imageScale={imageScale}
                        paletteRGB={paletteRGB}
                    />
                </>
            )}
        </>
    );
}
