import { useState } from "react";
import { registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { useStore } from "../../stores/useStore";
import { SAVE_FILE_SIZE } from "../../utils/constants";
import MuiFilepond from "./MuiFilepond";
import IconUpload from "../../assets/iconComponents/IconUpload";
import { renderToString } from "react-dom/server";

registerPlugin(FilePondPluginFileValidateType);

export default function FileLoader() {
    const [errorMessage, setErrorMessage] = useState(null);
    const setFileData = useStore((state) => state.setFileData);
    const [hasFile, setHasFile] = useState(false);

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

        setHasFile(!!file);

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
            <MuiFilepond
                className={hasFile && "hasFile"}
                labelIdle={renderToString(<CustomLabelIdle />)}
                acceptedFileTypes={[".sav"]}
                maxFiles={1}
                onupdatefiles={handleFileChange}
                fileValidateTypeDetectType={validateFileType}
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}

export function CustomLabelIdle() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <IconUpload />
            <span>
                Drag & Drop your .sav file or <span className="filepond--label-action">Browse</span>
            </span>
        </div>
    );
}
