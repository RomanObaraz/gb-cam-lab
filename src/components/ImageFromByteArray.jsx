import { useEffect, useMemo, useRef } from "react";
import { getImageDataFromPhoto, replaceImageDataColor } from "../utils/utils";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

export default function ImageFromByteArray({ byteArray, photoIndex, imageScale, paletteRGB }) {
    const canvas = useRef();
    const prevPaletteRef = useRef(paletteRGB);

    const imageData = useMemo(() => {
        // Extract one photo data
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        const photoData = new Uint8Array(byteArray).slice(photoStart, photoEnd);

        // Create imageData for canvas from, photoData
        return getImageDataFromPhoto(photoData, paletteRGB);
    }, [byteArray, photoIndex]);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        paletteRGB.forEach((color, index) => {
            if (prevPaletteRef.current[index] !== color) {
                replaceImageDataColor(imageData, index, color);
            }
        });

        // Draw imageData
        ctx.putImageData(imageData, 0, 0);

        // Update the ref to the current palette after processing changes
        prevPaletteRef.current = paletteRGB;
    }, [imageData, paletteRGB]);

    return (
        <canvas
            ref={canvas}
            className="photoImage"
            width={128}
            height={112}
            style={{ width: 128 * imageScale + "px", height: 112 * imageScale + "px" }}
        />
    );
}
