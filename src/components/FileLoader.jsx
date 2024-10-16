import { useRef } from "react";
import { useFileStore } from "../stores/useFileStore";

export default function FileLoader() {
    const fileData = useFileStore((state) => state.fileData);
    const setFileData = useFileStore((state) => state.setFileData);

    const inputRef = useRef();

    function onLoadClick() {
        inputRef.current.click();
    }

    function handleFileChange(event) {
        const file = event.target.files[0]; // Get the first selected file

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const byteArray = new Uint8Array(arrayBuffer);
                setFileData(byteArray);
            };

            reader.readAsArrayBuffer(file);
        }
    }

    return (
        <div>
            <input type="file" hidden ref={inputRef} onChange={handleFileChange} />
            <button onClick={onLoadClick}>Load</button>
            {fileData && <p>File loaded! Length of binary data: {fileData.length} bytes</p>}
        </div>
    );
}
