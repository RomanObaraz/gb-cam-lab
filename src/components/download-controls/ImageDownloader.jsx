import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import { useStore } from "../../stores/useStore";
import { downloadAll, downloadCurrent } from "../../utils/utils";

export const ImageDownloader = () => {
    const imageScale = useStore((state) => state.imageScale);
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async (downloadFunction) => {
        setIsLoading(true);

        try {
            await downloadFunction(imageScale);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonClassName = "w-32 p-0";

    return (
        <div className="flex gap-5">
            <Button
                className={buttonClassName}
                onClick={() => handleDownload(downloadCurrent)}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={12} /> : null}
            >
                Download one
            </Button>
            <Button
                className={buttonClassName}
                onClick={() => handleDownload(downloadAll)}
                disabled={isLoading}
                endIcon={isLoading ? <CircularProgress size={12} /> : null}
            >
                Download all
            </Button>
        </div>
    );
};
