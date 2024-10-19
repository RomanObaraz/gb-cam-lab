import { useState } from "react";
import ImageFromByteArray from "./ImageFromByteArray";

export default function PhotoGallery({ fileData, imageScale, paletteRGB }) {
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
                {[...Array(30)].map((value, index) => (
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
