import { useState } from "react";
import ImageFromByteArray from "./ImageFromByteArray";
import { useStore } from "../stores/useStore";
import { PHOTO_COUNT } from "../utils/constants";
import { Grid2 } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function PhotoGallery({ fileData, paletteRGB }) {
    const imageScale = useStore((state) => state.imageScale);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    return (
        <div className="self-center">
            <ImageFromByteArray
                id="photoPreview"
                byteArray={fileData}
                photoIndex={currentPhotoIndex}
                imageScale={imageScale}
                paletteRGB={paletteRGB}
            />
            <OverlayScrollbarsComponent
                id="bigOsScrollbar"
                className="w-[300px] h-[620px]
                [&>div[data-overlayscrollbars-viewport]]:snap-mandatory [&>div[data-overlayscrollbars-viewport]]:snap-y"
                options={{ overflow: { x: "hidden" } }}
                defer
            >
                <Grid2 container columns={2} spacing={1}>
                    {[...Array(PHOTO_COUNT)].map((_, index) => (
                        <div
                            key={`photo_${index}`}
                            className="flex border-2 border-solid border-primary-main shadow-[2px_2px] shadow-primary-main snap-center"
                            onClick={() => setCurrentPhotoIndex(index)}
                        >
                            <ImageFromByteArray
                                byteArray={fileData}
                                photoIndex={index}
                                imageScale={1}
                                paletteRGB={paletteRGB}
                            />
                        </div>
                    ))}
                </Grid2>
            </OverlayScrollbarsComponent>
        </div>
    );
}
