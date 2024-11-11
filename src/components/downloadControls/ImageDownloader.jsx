import { Button } from "@mui/material";
import { useStore } from "../../stores/useStore";
import { downloadAll, downloadCurrent } from "../../utils/utils";

export default function ImageDownloader() {
    const imageScale = useStore((state) => state.imageScale);

    return (
        <div>
            <Button onClick={() => downloadCurrent(imageScale)}>Download one</Button>
            <Button onClick={() => downloadAll(imageScale)}>Download All</Button>
        </div>
    );
}
