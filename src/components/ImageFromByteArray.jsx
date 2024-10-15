import { useEffect, useMemo, useState } from "react";
import { getImageDataFromPhoto } from "../utils";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

// TODO: wrap in a function and call in useEffect [] or as in comments
// Canvas for creating an image
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.imageSmoothingQuality = "low";

// const getCanvas = () => {
//     const canvas = document.getElementById("canvas");
//     const ctx = canvas.getContext("2d");
//     return { canvas, ctx };
// };

// const { canvas, ctx } = getCanvas();
// Create a temporary canvas to draw the ImageData without scaling
const tempCanvas = document.getElementById("tempCanvas");
const tempCtx = tempCanvas.getContext("2d");

export default function ImageFromByteArray({ byteArray, photoIndex, imageScale, palette }) {
    const [imageSrc, setImageSrc] = useState("");

    const photoData = useMemo(() => {
        // Extract one photo data
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        return new Uint8Array(byteArray).slice(photoStart, photoEnd);
    }, [byteArray, photoIndex]);

    // Create imageData for canvas context
    const imageData = useMemo(() => {
        return getImageDataFromPhoto(photoData, ctx, palette);
    }, [photoData, palette]);

    useEffect(() => {
        // TODO: don't scale with drawImage() !!!

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);

        canvas.width = 128 * imageScale;
        canvas.height = 112 * imageScale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

        // Draw the ImageData at its original size on the temporary canvas
        tempCtx.putImageData(imageData, 0, 0);

        // Scale and draw the image from the temporary canvas onto the main canvas
        ctx.drawImage(
            tempCanvas,
            0,
            0,
            imageData.width,
            imageData.height,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const base64Image = canvas.toDataURL("image/png");
        setImageSrc(base64Image);
    }, [imageScale, palette]);

    return (
        <img
            src={imageSrc}
            alt="Byte Array"
            // width={128 * imageScale}
            // height={112 * imageScale}
        />
    );
}
