import { useState } from "react";
import { registerPlugin } from "react-filepond";
import { renderToString } from "react-dom/server";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import { useStore } from "../../../stores/useStore";
import { SAVE_FILE_SIZE } from "../../../utils/constants";
import { MuiFilepond } from "./MuiFilepond";
import UploadIcon from "../../../assets/upload.svg?react";

registerPlugin(FilePondPluginFileValidateType);

const CustomLabelIdle = () => {
    return (
        <div className="flex flex-col items-center gap-1">
            <UploadIcon />
            <span>
                Drag & Drop your .sav file or <span className="filepond--label-action">Browse</span>
            </span>
        </div>
    );
};

const validateFileType = (file, type) => {
    return new Promise((resolve) => {
        if (!type) {
            type = "." + file.name.split(".").pop();
        }

        resolve(type);
    });
};

export const FileLoader = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [hasFile, setHasFile] = useState(false);
    const setFileData = useStore((state) => state.setFileData);

    const validateFile = (file) => {
        // TODO: might need more thorough validation for file content
        // I can't test other game's .sav files now, so I assume this validation is enough to differ GB Camera saves
        if (file.size !== SAVE_FILE_SIZE) {
            setErrorMessage("Invalid save file. Ensure you load a Gameboy Camera .sav.");
            return false;
        }

        setErrorMessage(null);
        return true;
    };

    const handleFileChange = (files) => {
        setHasFile(files?.length > 0);

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

            // If the first byte is 1, it means the loaded .sav is from an Analogue Pocket's corrupted save state
            // We can fix it by shifting all the bytes left by 1
            if (byteArray[0] === 0x01) {
                const newByte = 0x00;
                const fixedByteArray = new Uint8Array(byteArray.length);
                fixedByteArray.set(byteArray.subarray(1));
                fixedByteArray[fixedByteArray.length - 1] = newByte;

                setFileData(fixedByteArray);
            } else {
                setFileData(arrayBuffer);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="max-lg:-mb-3">
            <MuiFilepond
                className={hasFile && "hasFile"}
                labelIdle={renderToString(<CustomLabelIdle />)}
                acceptedFileTypes={[".sav"]}
                maxFiles={1}
                onupdatefiles={handleFileChange}
                fileValidateTypeDetectType={validateFileType}
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
};
