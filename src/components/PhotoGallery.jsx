import { useState } from "react";
import ImageFromByteArray from "./ImageFromByteArray";

export default function PhotoGallery({ fileData, imageScale, palette }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // TODO: organize this better?
    return (
        <div id="photoGallery">
            <ImageFromByteArray
                id="photoPreview"
                byteArray={fileData}
                photoIndex={currentPhotoIndex}
                imageScale={imageScale}
                palette={palette}
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
                            palette={palette}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
