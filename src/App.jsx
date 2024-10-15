import "./styles/App.css";
import FileLoader from "./components/FileLoader";
import ImageFromByteArray from "./components/ImageFromByteArray";
import { useFileStore } from "./stores/useFileStore";
import { useMemo, useState } from "react";
import ColorPalette from "./components/ColorPalette";
import { hexToRgb } from "./utils";

// TODO: fix performance and remove this
const paletteRgb = [
    hexToRgb("#ffffff"),
    hexToRgb("#c0c0c0"),
    hexToRgb("#606060"),
    hexToRgb("#000000"),
];

export default function App() {
    const fileData = useFileStore((state) => state.fileData);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [imageScale, setImageScale] = useState(3);
    const [palette, setPalette] = useState({
        color0: "#ffffff",
        color1: "#c0c0c0",
        color2: "#606060",
        color3: "#000000",
    });

    // TODO: maybe use debounce for picking colors

    const paletteRgb2 = [
        useMemo(() => hexToRgb(palette.color0), [palette.color0]),
        useMemo(() => hexToRgb(palette.color1), [palette.color1]),
        useMemo(() => hexToRgb(palette.color2), [palette.color2]),
        useMemo(() => hexToRgb(palette.color3), [palette.color3]),
    ];

    function handleScaleInputChange(e) {
        setImageScale(Number(e.target.value));
    }

    function handlePaletteChange(colorName, colorValue) {
        setPalette((prev) => ({ ...prev, [colorName]: colorValue }));
    }

    return (
        <>
            <FileLoader />
            <ColorPalette colors={palette} onChange={handlePaletteChange} />
            {fileData && (
                <>
                    <div>
                        Zoom:{" "}
                        <input
                            type="number"
                            min={1}
                            max={10}
                            value={imageScale}
                            onChange={handleScaleInputChange}
                        />
                    </div>
                    <div id="photoGallery">
                        <ImageFromByteArray
                            id="photoPreview"
                            byteArray={fileData}
                            photoIndex={currentPhotoIndex}
                            imageScale={imageScale}
                            palette={paletteRgb2}
                        />
                        <div id="photoGrid">
                            {[...Array(30)].map((value, index) => (
                                <div
                                    className={`photoHolder ${
                                        index === currentPhotoIndex ? "selected" : ""
                                    }`}
                                    key={`photoHolder${index}`}
                                    onClick={() => setCurrentPhotoIndex(index)}
                                >
                                    <ImageFromByteArray
                                        key={`photo_${index}`}
                                        byteArray={fileData}
                                        photoIndex={index}
                                        imageScale={1}
                                        palette={paletteRgb2}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
