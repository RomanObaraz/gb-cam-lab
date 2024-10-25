import { useStore } from "../../stores/useStore";
import { downloadAll, downloadCurrent } from "../../utils/utils";

export default function ImageDownloader() {
    const imageScale = useStore((state) => state.imageScale);

    return (
        <div>
            <button className="downloadButton" onClick={() => downloadCurrent(imageScale)}>
                Download Current
            </button>
            <button className="downloadButton" onClick={() => downloadAll(imageScale)}>
                Download All
            </button>
        </div>
    );
}
