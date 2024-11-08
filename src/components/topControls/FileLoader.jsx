import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useStore } from "../../stores/useStore";
import { SAVE_FILE_SIZE } from "../../utils/constants";

registerPlugin(FilePondPluginFileValidateType);

export default function FileLoader() {
    const [errorMessage, setErrorMessage] = useState(null);
    const setFileData = useStore((state) => state.setFileData);

    function validateFileType(file, type) {
        return new Promise((resolve) => {
            if (!type) {
                type = "." + file.name.split(".").pop();
            }

            resolve(type);
        });
    }

    function validateFile(file) {
        // TODO: might need more thorough validation for file content
        // I can't test other game's .sav files now, so I assume this validation is enough to differ GB Camera saves
        if (file.size !== SAVE_FILE_SIZE) {
            setErrorMessage("Invalid save file. Ensure you load a Gameboy Camera .sav.");
            return false;
        }

        setErrorMessage(null);
        return true;
    }

    function handleFileChange(files) {
        const file = files[0]?.file;

        if (!file) {
            setFileData(null);
            setErrorMessage(null);
            return;
        }

        if (!validateFile(file)) {
            setFileData(null);
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const byteArray = new Uint8Array(arrayBuffer);
            setFileData(byteArray);
        };

        reader.readAsArrayBuffer(file);
    }

    return (
        <div>
            <FilePond
                labelIdle={
                    'Drag & Drop your .sav file or <span class="filepond--label-action"> Browse </span>'
                }
                acceptedFileTypes={[".sav"]}
                maxFiles={1}
                onupdatefiles={handleFileChange}
                fileValidateTypeDetectType={validateFileType}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}
