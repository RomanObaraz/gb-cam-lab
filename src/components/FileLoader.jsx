import { useRef, useState } from "react";
import { useFileStore } from "../stores/useFileStore";

export default function FileLoader() {
    const [errorMessage, setErrorMessage] = useState(null);

    const fileData = useFileStore((state) => state.fileData);
    const setFileData = useFileStore((state) => state.setFileData);

    const inputRef = useRef();

    function validateFile(file) {
        // TODO: might need more thorough validation for file content
        // Gameboy Camera .sav file should always be 131072 bytes (right?)
        // I can't test other game's .sav files now, so I assume this validation is enough to differ GB Camera saves
        if (file.size !== 131072) {
            setErrorMessage("Invalid save file. Ensure you load a Gameboy Camera .sav.");
            return false;
        }

        setErrorMessage(null);
        return true;
    }

    function handleFileChange(event) {
        const file = event.target.files[0]; // Get the first selected file

        if (file && validateFile(file)) {
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
            <input type="file" hidden ref={inputRef} accept=".sav" onChange={handleFileChange} />
            <button onClick={() => inputRef.current.click()}>Load</button>
            {fileData && <p>File loaded! Length of binary data: {fileData.length} bytes</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}
