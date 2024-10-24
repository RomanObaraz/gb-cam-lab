import { useStore } from "../../stores/useStore";
import FileLoader from "./FileLoader";
import ImageDownloader from "./ImageDownloader";
import ImageScaler from "./ImageScaler";

export default function FileBlock() {
    const isFileLoaded = !!useStore((state) => state.fileData);

    return (
        <div id="fileBlock">
            <FileLoader />
            {isFileLoaded && (
                <>
                    <ImageScaler />
                    <ImageDownloader />
                </>
            )}
        </div>
    );
}
