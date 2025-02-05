import { FrameToggle } from "./FrameToggle";
import { ImageDownloader } from "./ImageDownloader";
import { ImageScaler } from "./ImageScaler";

export const DownloadControls = () => {
    return (
        <div className="flex flex-row mt-8 items-center justify-center gap-2 max-sm:flex-col max-sm:gap-4">
            <ImageScaler />
            <FrameToggle />
            <ImageDownloader />
        </div>
    );
};
