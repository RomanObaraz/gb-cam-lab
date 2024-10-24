import { useEffect, useMemo, useRef } from "react";
import { getImageDataFromPhoto, replaceImageDataColor } from "../utils/utils";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

export default function ImageFromByteArray({ byteArray, photoIndex, imageScale, paletteRGB }) {
    const canvasRef = useRef();
    const prevPaletteRef = useRef(paletteRGB);

    const imageData = useMemo(() => {
        // Extract one photo data
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        const photoData = new Uint8Array(byteArray).slice(photoStart, photoEnd);

        // Create imageData for canvas from photoData
        return getImageDataFromPhoto(photoData, paletteRGB);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [byteArray, photoIndex]);

    useEffect(() => {
        const updateCanvas = () => {
            const ctx = canvasRef.current.getContext("2d");
            ctx.imageSmoothingEnabled = false;

            paletteRGB.forEach((color, index) => {
                if (prevPaletteRef.current[index] !== color) {
                    //TODO: better to store imageData in useReducer and call actions to change it or use zustand?
                    replaceImageDataColor(imageData, index, color);
                }
            });

            // Draw imageData
            ctx.putImageData(imageData, 0, 0);

            // Update the ref to the current palette after processing changes
            prevPaletteRef.current = paletteRGB;
        };

        updateCanvas();
    }, [imageData, paletteRGB]);

    return (
        <canvas
            ref={canvasRef}
            className="photoImage"
            //TODO: use const
            width={128}
            height={112}
            style={{ width: 128 * imageScale, height: 112 * imageScale }}
        />
    );
}
