import { saveAs } from "file-saver";
import JSZip from "jszip";
import { getScaledCanvas } from "../utils";

const imageCanvasClassName = "photoImage";
const fileName = "gb-cam-image";

export default function ImageDownloader({ imageScale }) {
    function downloadCurrent() {
        const canvas = document.getElementsByClassName(imageCanvasClassName)[0];

        if (!canvas) return;

        const scaledCanvas = getScaledCanvas(canvas, imageScale);
        scaledCanvas.toBlob((blob) => saveAs(blob, `${fileName}.png`), "image/png");
    }

    async function downloadAll() {
        const canvases = document.getElementsByClassName(imageCanvasClassName);

        if (!canvases) return;

        const zip = new JSZip();
        const zipPromises = [];

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
            <button onClick={downloadCurrent}>Download Current</button>
            <button onClick={downloadAll}>Download All</button>
        </div>
    );
}
