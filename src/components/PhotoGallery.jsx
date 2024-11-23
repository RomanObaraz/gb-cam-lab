import { useState } from "react";
import ImageFromByteArray from "./ImageFromByteArray";
import { useStore } from "../stores/useStore";
import { PHOTO_COUNT } from "../utils/constants";
import { Grid2 } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { twMerge } from "tailwind-merge";

export default function PhotoGallery({ fileData, paletteRGB }) {
    const imageScale = useStore((state) => state.imageScale);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const photoPreview = (
        <div
            className="
                    flex -mt-3
                    [&>canvas]:rounded-lg rounded-lg border-solid border-4 border-base-main
                    outline outline-4 outline-primary-main
                    shadow-[8px_8px_0_2px] shadow-primary-main
                "
        >
            <ImageFromByteArray
                byteArray={fileData}
                photoIndex={currentPhotoIndex}
                imageScale={imageScale}
                paletteRGB={paletteRGB}
            />
        </div>
    );

    const photoGrid = (
        <OverlayScrollbarsComponent
            id="bigOsScrollbar"
            className="w-[304px] h-[624px]
                [&>div[data-overlayscrollbars-viewport]]:snap-mandatory [&>div[data-overlayscrollbars-viewport]]:snap-y"
            options={{ overflow: { x: "hidden" } }}
            defer
        >
            <Grid2 className="p-1 pb-2" container columns={2} spacing={1}>
                {[...Array(PHOTO_COUNT)].map((_, index) => (
                    <div
                        key={`photo_${index}`}
                        className={twMerge(
                            `flex snap-center
                                border-2 border-solid border-primary-main
                                shadow-[2px_2px] shadow-primary-main
                                transition-transform hover:scale-105`,
                            index === currentPhotoIndex &&
                                "border-secondary-main shadow-secondary-main"
                        )}
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
    );

    return (
        <div className="flex items-center justify-center gap-7">
            {photoPreview}
            {photoGrid}
        </div>
    );
}
