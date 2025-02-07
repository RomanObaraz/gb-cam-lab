import { useEffect, useRef, useState } from "react";

import {
    areArraysEqual,
    createImageDataShadeMap,
    getFrameIndex,
    getImageDataFromPhoto,
    replaceImageDataColor,
} from "../../utils/utils";
import {
    FRAME_HEIGHT,
    FRAME_WIDTH,
    IMAGE_CANVAS_CLASSNAME,
    PHOTO_HEIGHT,
    PHOTO_WIDTH,
} from "../../utils/constants";
import { getFrame } from "../../utils/frameLoader";

// Photos start at 0x2000 with an interval of 0x1000 per photo
const photoStartOffset = 0x2000;
const photoByteLength = 0x1000;

// TODO: ignore empty photos in all processes (recolor, frame, download)

export const ImageFromByteArray = ({
    byteArray,
    photoIndex,
    imageScale,
    isFrameEnabled,
    paletteRGB,
}) => {
    const [imageData, setImageData] = useState(null);
    const [frameData, setFrameData] = useState(null);
    const [frameIndex, setFrameIndex] = useState(0);
    const canvasRef = useRef();
    const prevPaletteRef = useRef(paletteRGB);

    const updateCanvas = () => {
        if (!imageData) return;

        const ctx = canvasRef.current.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        paletteRGB.forEach((color, index) => {
            if (!areArraysEqual(prevPaletteRef.current[index], color)) {
                replaceImageDataColor(imageData, index, color);
                if (frameData) {
                    replaceImageDataColor(frameData, index, color);
                }
            }
        });

        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // draw frame first if enabled
        if (isFrameEnabled && frameData) {
            ctx.putImageData(frameData, 0, 0);
        }

        // draw photo image
        ctx.putImageData(imageData, isFrameEnabled ? 16 : 0, isFrameEnabled ? 16 : 0);

        prevPaletteRef.current = paletteRGB;
    };

    const createFrameData = () => {
        const img = getFrame(frameIndex);
        if (!img) {
            console.error(`Frame at index ${frameIndex} not found or not loaded.`);
            return;
        }

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const tempCtx = tempCanvas.getContext("2d");
        tempCtx.drawImage(img, 0, 0);

        const frameImageData = tempCtx.getImageData(0, 0, img.width, img.height);
        frameImageData.shadeMap = createImageDataShadeMap(frameImageData);

        paletteRGB.forEach((color, index) => {
            replaceImageDataColor(frameImageData, index, color);
        });

        setFrameData(frameImageData);

        if (isFrameEnabled) {
            canvasRef.current.width = FRAME_WIDTH;
            canvasRef.current.height = FRAME_HEIGHT;
        }
    };

    useEffect(() => {
        const photoStart = photoStartOffset + photoByteLength * photoIndex;
        const photoEnd = photoStart + photoByteLength;
        const photoData = new Uint8Array(byteArray).slice(photoStart, photoEnd);

        setFrameIndex(getFrameIndex(photoData));

        const newImageData = getImageDataFromPhoto(photoData, paletteRGB);
        setImageData(newImageData);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [byteArray, photoIndex]);

    useEffect(() => {
        if (!isFrameEnabled) {
            canvasRef.current.width = PHOTO_WIDTH;
            canvasRef.current.height = PHOTO_HEIGHT;
            updateCanvas();
            return;
        }

        if (frameData) {
            canvasRef.current.width = FRAME_WIDTH;
            canvasRef.current.height = FRAME_HEIGHT;
            updateCanvas();
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFrameEnabled]);

    useEffect(() => {
        createFrameData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameIndex]);

    useEffect(() => {
        updateCanvas();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageData, frameData, paletteRGB]);

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
