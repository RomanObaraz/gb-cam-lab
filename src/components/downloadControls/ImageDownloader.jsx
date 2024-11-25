import { Button } from "@mui/material";
import { useStore } from "../../stores/useStore";
import { downloadAll, downloadCurrent } from "../../utils/utils";

export default function ImageDownloader() {
    const imageScale = useStore((state) => state.imageScale);

    const buttonClassName = "w-32 p-0";

    return (
        <div className="flex gap-5">
            <Button className={buttonClassName} onClick={() => downloadCurrent(imageScale)}>
                Download one
            </Button>
            <Button className={buttonClassName} onClick={() => downloadAll(imageScale)}>
                Download all
            </Button>
        </div>
    );
}
