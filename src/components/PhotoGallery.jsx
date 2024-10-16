import { useState } from "react";
import ImageFromByteArray from "./ImageFromByteArray";

export default function PhotoGallery({ fileData, palette }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [imageScale, setImageScale] = useState(3);

    function handleScaleInputChange(e) {
        setImageScale(Number(e.target.value));
    }

    // TODO: organize this better?
    return (
        <>
            <div>
                Zoom:{" "}
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={imageScale}
                    onChange={handleScaleInputChange}
                />
            </div>
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
                            className={`photoHolder ${
                                index === currentPhotoIndex ? "selected" : ""
                            }`}
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
        </>
    );
}
