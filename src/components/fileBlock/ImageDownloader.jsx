import { saveAs } from "file-saver";
import JSZip from "jszip";
import { getScaledCanvas } from "../../utils/utils";
import { useStore } from "../../stores/useStore";

//TODO: move to const and use this const everywhere in other places
const imageCanvasClassName = "photoImage";
const fileName = "gb-cam-image";

export default function ImageDownloader() {
    const imageScale = useStore((state) => state.imageScale);

    //TODO: move downloads to utils
    function downloadCurrent() {
        const canvas = document.getElementsByClassName(imageCanvasClassName)?.[0];

        if (!canvas) return;

        const scaledCanvas = getScaledCanvas(canvas, imageScale);
        scaledCanvas.toBlob((blob) => saveAs(blob, `${fileName}.png`), "image/png");
    }

    async function downloadAll() {
        const canvases = document.getElementsByClassName(imageCanvasClassName);

        if (!canvases) return;

        const zip = new JSZip();
        const zipPromises = [];

        //TODO: 30 to const
        for (let i = 1; i <= 30; i++) {
            const promise = new Promise((resolve) => {
                const scaledCanvas = getScaledCanvas(canvases[i], imageScale);
                scaledCanvas.toBlob((blob) => {
                    zip.file(`${fileName}-${i - 1}.png`, blob);
                    resolve();
                }, "image/png");
            });

            zipPromises.push(promise);
        }

        await Promise.all(zipPromises);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, `${fileName}s.zip`);
    }

    return (
        <div>
            <button className="downloadButton" onClick={downloadCurrent}>
                Download Current
            </button>
            <button className="downloadButton" onClick={downloadAll}>
                Download All
            </button>
        </div>
    );
}
