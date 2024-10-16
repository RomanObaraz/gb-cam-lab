import "./styles/App.css";
import FileLoader from "./components/FileLoader";
import { useFileStore } from "./stores/useFileStore";
import { useMemo, useState } from "react";
import ColorPalette from "./components/ColorPalette";
import { hexToRgb } from "./utils";
import PhotoGallery from "./components/PhotoGallery";

export default function App() {
    const fileData = useFileStore((state) => state.fileData);
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

    return (
        <>
            <FileLoader />
            <ColorPalette colors={palette} onChange={handlePaletteChange} />
            {fileData && <PhotoGallery fileData={fileData} palette={paletteRgb} />}
        </>
    );
}
