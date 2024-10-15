import { useRef } from "react";
import { useFileStore } from "../stores/useFileStore";

export default function FileLoader() {
    const fileData = useFileStore((state) => state.fileData); // Access the global fileData state
    const setFileData = useFileStore((state) => state.setFileData); // Get the action to update state

    const inputRef = useRef();

    function onLoadClick() {
        inputRef.current.click();
    }

    function handleFileChange(event) {
        const file = event.target.files[0]; // Get the first selected file

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const arrayBuffer = e.target.result; // Get binary data
                const byteArray = new Uint8Array(arrayBuffer); // Convert to byte array
                setFileData(byteArray); // Store the binary data
            };

            // Read the file as an ArrayBuffer (binary)
            reader.readAsArrayBuffer(file);
        }
    }

    return (
        <div>
            <input type="file" hidden ref={inputRef} onChange={handleFileChange} />
            <button className="ui button" onClick={onLoadClick}>
                Load
            </button>
            {fileData && <p>File loaded! Length of binary data: {fileData.length} bytes</p>}
        </div>
    );
}
