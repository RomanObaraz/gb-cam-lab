import { useState } from "react";
import { registerPlugin } from "react-filepond";
import { renderToString } from "react-dom/server";
import { Typography } from "@mui/material";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import { useStore } from "../../../stores/useStore";
import { SAVE_FILE_SIZE } from "../../../utils/constants";
import { MuiFilepond } from "./MuiFilepond";
import UploadIcon from "../../../assets/upload.svg?react";

registerPlugin(FilePondPluginFileValidateType);
registerPlugin(FilePondPluginFileValidateSize);

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

    const handleFileChange = (files) => {
        setHasFile(files?.length > 0);

        // Status 8 means file load error
        if (files[0]?.status === 8) {
            setFileData(null);
            setErrorMessage("Invalid file. Ensure you load a Gameboy Camera save (.sav)!");
            return;
        }

        setErrorMessage(null);

        const file = files[0]?.file;
        console.log();

        if (!file) {
            setFileData(null);
            setErrorMessage(null);
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

    // TODO: might need more thorough validation for file content that just type and size
    return (
        <div className="flex flex-col items-center max-lg:-mb-3">
            <MuiFilepond
                className={hasFile && "hasFile"}
                labelIdle={renderToString(<CustomLabelIdle />)}
                acceptedFileTypes={[".sav"]}
                maxFiles={1}
                onupdatefiles={handleFileChange}
                fileValidateTypeDetectType={validateFileType}
                minFileSize={SAVE_FILE_SIZE}
                maxFileSize={SAVE_FILE_SIZE}
            />
            {errorMessage && (
                <Typography className="text-lg text-secondary-main font-medium">
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};
