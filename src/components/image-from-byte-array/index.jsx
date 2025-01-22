import { useEffect, useRef, useState } from "react";

import { areArraysEqual, getImageDataFromPhoto, replaceImageDataColor } from "../../utils/utils";
import { IMAGE_CANVAS_CLASSNAME, PHOTO_HEIGHT, PHOTO_WIDTH } from "../../utils/constants";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

export const ImageFromByteArray = ({ byteArray, photoIndex, imageScale, paletteRGB }) => {
    const [imageData, setImageData] = useState(null);
    const canvasRef = useRef();
    const prevPaletteRef = useRef(paletteRGB);

    useEffect(() => {
        // Extract one photo data
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        const photoData = new Uint8Array(byteArray).slice(photoStart, photoEnd);

        // Create imageData for canvas from photoData
        const newImageData = getImageDataFromPhoto(photoData, paletteRGB);
        setImageData(newImageData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [byteArray, photoIndex]);

    useEffect(() => {
        const updateCanvas = () => {
            const ctx = canvasRef.current.getContext("2d");
            ctx.imageSmoothingEnabled = false;

            paletteRGB.forEach((color, index) => {
                if (!areArraysEqual(prevPaletteRef.current[index], color)) {
                    replaceImageDataColor(imageData, index, color);
                }
            });

            ctx.putImageData(imageData, 0, 0);
            prevPaletteRef.current = paletteRGB;
        };

        if (imageData) updateCanvas();
    }, [imageData, paletteRGB]);

    return (
        <canvas
            ref={canvasRef}
            className={IMAGE_CANVAS_CLASSNAME}
            width={PHOTO_WIDTH}
            height={PHOTO_HEIGHT}
            style={{ width: PHOTO_WIDTH * imageScale, height: PHOTO_HEIGHT * imageScale }}
        />
    );
};
