import { saveAs } from "file-saver";
import JSZip from "jszip";

export default function ImageDownloader() {
    function downloadCurrent() {
        const canvas = document.getElementsByClassName("photoImage")[0];

        if (!canvas) return;

        canvas.toBlob((blob) => saveAs(blob, "canvas-image.png"), "image/png");
    }

    async function downloadAll() {
        const canvases = document.getElementsByClassName("photoImage");

        if (!canvases) return;

        const zip = new JSZip();
        const zipPromises = [];

        for (let i = 1; i <= 3; i++) {
            const promise = new Promise((resolve) => {
                canvases[i].toBlob((blob) => {
                    zip.file(`canvas-image-${i}.png`, blob);
                    resolve();
                }, "image/png");
            });

            zipPromises.push(promise);
        }

        await Promise.all(zipPromises);
        const zipBlob = await zip.generateAsync({ type: "blob" });
        saveAs(zipBlob, "canvas-images.zip");
    }

    return (
        <div>
            <button onClick={downloadCurrent}>Download Current</button>
            <button onClick={downloadAll}>Download All</button>
        </div>
    );
}
