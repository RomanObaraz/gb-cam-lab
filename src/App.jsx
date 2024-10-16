import "./styles/App.css";
import FileLoader from "./components/FileLoader";
import { useFileStore } from "./stores/useFileStore";
import { useMemo, useState } from "react";
import ColorPalette from "./components/ColorPalette";
import { hexToRgb } from "./utils";
import PhotoGallery from "./components/PhotoGallery";
import ImageDownloader from "./components/ImageDownloader";

export default function App() {
    const fileData = useFileStore((state) => state.fileData);
    const [imageScale, setImageScale] = useState(3);
    const [palette, setPalette] = useState({
        color0: "#ffffff",
        color1: "#c0c0c0",
        color2: "#606060",
        color3: "#000000",
    });

    // TODO: this is bad, cuz array re-inits every App render
    const paletteRgb = [
        useMemo(() => hexToRgb(palette.color0), [palette.color0]),
        useMemo(() => hexToRgb(palette.color1), [palette.color1]),
        useMemo(() => hexToRgb(palette.color2), [palette.color2]),
        useMemo(() => hexToRgb(palette.color3), [palette.color3]),
    ];

    function handlePaletteChange(colorName, colorValue) {
        setPalette((prev) => ({ ...prev, [colorName]: colorValue }));
    }

    function handleScaleInputChange(e) {
        setImageScale(Number(e.target.value));
    }

    return (
        <>
            <FileLoader />
            <ColorPalette colors={palette} onChange={handlePaletteChange} />
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
                        palette={paletteRgb}
                    />
                </>
            )}
        </>
    );
}
