import "./styles/App.css";
import FileLoader from "./components/FileLoader";
import { useFileStore } from "./stores/useFileStore";
import { useMemo, useState } from "react";
import ColorPalette from "./components/ColorPalette";
import { hexToRgb } from "./utils/utils";
import PhotoGallery from "./components/PhotoGallery";
import ImageDownloader from "./components/ImageDownloader";
import ColorPalettePreset from "./components/ColorPalettePreset";
import * as palettes from "./utils/palettes.json";

export default function App() {
    const fileData = useFileStore((state) => state.fileData);
    const [imageScale, setImageScale] = useState(3);
    const [palette, setPalette] = useState(structuredClone(palettes.blackAndWhite));

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
        setImageScale(Number(e.target.value));
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
            <ColorPalettePreset
                palette={palettes.blackAndWhite}
                onSelect={handlePalettePresetSelect}
            />
            <ColorPalettePreset palette={palettes.gameboy} onSelect={handlePalettePresetSelect} />
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
