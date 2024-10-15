import { useEffect, useMemo, useRef } from "react";
import { getImageDataFromPhoto } from "../utils";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

// TODO: new approach
// - create the photoData with a starting palette only ONCE
// - create the imageData with a starting palette only ONCE
// * on change palette - swap color in imageData then putImageData()
// - on rescale - just change the css props
// * on download - rescale properly with the tempCanvas and drawImage
// *** preview should be just a scaled copy of an image, but not the separate image

export default function ImageFromByteArray({ byteArray, photoIndex, imageScale, palette }) {
    const canvas = useRef();

    const imageData = useMemo(() => {
        // Extract one photo data
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        const photoData = new Uint8Array(byteArray).slice(photoStart, photoEnd);

        // Create imageData for canvas from, photoData
        return getImageDataFromPhoto(photoData, palette);
    }, [byteArray, photoIndex]);

    useEffect(() => {
        const ctx = canvas.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "low";

        // const imageData = getImageDataFromPhoto(photoData, ctx, palette);

        ctx.putImageData(imageData, 0, 0);
    }, [imageScale, palette]);

    return (
        <canvas
            ref={canvas}
            width={128}
            height={112}
            style={{ width: 128 * imageScale + "px", height: 112 * imageScale + "px" }}
        />
    );
}
