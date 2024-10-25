import { useState } from "react";
import ImageFromByteArray from "./ImageFromByteArray";
import { useStore } from "../stores/useStore";
import { PHOTO_COUNT } from "../utils/constants";

export default function PhotoGallery({ fileData, paletteRGB }) {
    const imageScale = useStore((state) => state.imageScale);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    return (
        <div id="photoGallery">
            <ImageFromByteArray
                id="photoPreview"
                byteArray={fileData}
                photoIndex={currentPhotoIndex}
                imageScale={imageScale}
                paletteRGB={paletteRGB}
            />
            <div id="photoGrid">
                {[...Array(PHOTO_COUNT)].map((_, index) => (
                    <div
                        className={`photoHolder ${index === currentPhotoIndex ? "selected" : ""}`}
                        key={`photoHolder${index}`}
                        onClick={() => setCurrentPhotoIndex(index)}
                    >
                        <ImageFromByteArray
                            key={`photo_${index}`}
                            byteArray={fileData}
                            photoIndex={index}
                            imageScale={1}
                            paletteRGB={paletteRGB}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
