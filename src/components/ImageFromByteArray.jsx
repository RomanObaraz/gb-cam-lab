import { useEffect, useMemo, useRef } from "react";
import { getImageDataFromPhoto } from "../utils";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

// TODO: new approach
// create the imageData with a starting palette only ONCE
// on change palette - swap color in imageData then putImageData()
// on rescale - just change the css props
// on download - rescale properly with the tempCanvas and drawImage

export default function ImageFromByteArray({ byteArray, photoIndex, imageScale, palette }) {
    const canvas = useRef();

    const photoData = useMemo(() => {
        // Extract one photo data
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        return new Uint8Array(byteArray).slice(photoStart, photoEnd);
    }, [byteArray, photoIndex]);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "low";

        // Create a temporary canvas to draw the ImageData without scaling
        const tempCanvas = document.getElementById("tempCanvas");
        const tempCtx = tempCanvas.getContext("2d");

        const imageData = getImageDataFromPhoto(photoData, ctx, palette);

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
    }, [imageScale, palette]);

    return <canvas ref={canvas} width={128 * imageScale} height={112 * imageScale} />;
}
