import { Button, Stack } from "@mui/material";
import { useStore } from "../../stores/useStore";
import { downloadAll, downloadCurrent } from "../../utils/utils";

export default function ImageDownloader() {
    const imageScale = useStore((state) => state.imageScale);

    const buttonClassName = "w-32 p-0";

    return (
        <Stack direction={"row"} spacing={2.5}>
            <Button className={buttonClassName} onClick={() => downloadCurrent(imageScale)}>
                Download one
            </Button>
            <Button className={buttonClassName} onClick={() => downloadAll(imageScale)}>
                Download all
            </Button>
        </Stack>
    );
}
