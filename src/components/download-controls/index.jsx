import { FrameToggle } from "./FrameToggle";
import { ImageDownloader } from "./ImageDownloader";
import { ImageScaler } from "./ImageScaler";

export const DownloadControls = () => {
    return (
        <div className="flex flex-col items-center mt-4 gap-4">
            <FrameToggle />
            <div className="flex flex-row items-center justify-center gap-2 max-sm:flex-col max-sm:gap-4">
                <ImageScaler />
                <ImageDownloader />
            </div>
        </div>
    );
};
