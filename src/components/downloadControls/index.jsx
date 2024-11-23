import ImageDownloader from "./ImageDownloader";
import ImageScaler from "./ImageScaler";

export default function DownloadControls() {
    return (
        <div className="flex flex-row items-center gap-8">
            <ImageScaler />
            <ImageDownloader />
        </div>
    );
}
