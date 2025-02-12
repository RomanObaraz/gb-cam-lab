import { useState } from "react";
import { Grid2, useMediaQuery, useTheme } from "@mui/material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { twMerge } from "tailwind-merge";

import { PHOTO_COUNT } from "../../utils/constants";
import { ImageFromByteArray } from "../image-from-byte-array";
import { useStore } from "../../stores/useStore";

export const PhotoGallery = ({ fileData, paletteRGB }) => {
    const isFrameEnabled = useStore((state) => state.isFrameEnabled);
    const frameVariant = useStore((state) => state.frameVariant);
    const isPhotoBlank = useStore((state) => state.isPhotoBlank);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const theme = useTheme();
    const isSmallerPreview = useMediaQuery(theme.breakpoints.down("md"));

    const photoPreview = (
        <div
            className="
                    flex -mt-3
                    [&>canvas]:rounded-lg rounded-lg border-solid border-4 border-base-main
                    outline outline-4 outline-primary-main
                    shadow-[8px_8px_0_2px] shadow-primary-main
                    max-sm:hidden
                "
        >
            <ImageFromByteArray
                byteArray={fileData}
                photoIndex={currentPhotoIndex}
                imageScale={isSmallerPreview ? 2 : 3}
                isFrameEnabled={isFrameEnabled}
                frameVariant={frameVariant}
                paletteRGB={paletteRGB}
            />
        </div>
    );

    const photoGrid = (
        <OverlayScrollbarsComponent
            id="bigOsScrollbar"
            className="w-[304px] h-[622px] max-md:h-[374px] !z-0
                [&>div[data-overlayscrollbars-viewport]]:snap-mandatory [&>div[data-overlayscrollbars-viewport]]:snap-y"
            options={{ overflow: { x: "hidden" } }}
            defer
        >
            <Grid2 className="p-1 pb-2" container columns={2} spacing={1}>
                {[...Array(PHOTO_COUNT)].map((_, index) => {
                    // if (!isPhotoBlank[index])
                    return (
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
                                isFrameEnabled={isFrameEnabled}
                                frameVariant={frameVariant}
                                paletteRGB={paletteRGB}
                            />
                        </div>
                    );
                })}
            </Grid2>
        </OverlayScrollbarsComponent>
    );

    return (
        <div className="flex items-center justify-center gap-7">
            {photoPreview}
            {photoGrid}
        </div>
    );
};
