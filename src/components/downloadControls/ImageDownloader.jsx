import { Button, Stack } from "@mui/material";
import { useStore } from "../../stores/useStore";
import { downloadAll, downloadCurrent } from "../../utils/utils";

export default function ImageDownloader() {
    const imageScale = useStore((state) => state.imageScale);

    return (
        <Stack direction={"row"} spacing={2.5}>
            <Button sx={{ width: "130px", padding: 0 }} onClick={() => downloadCurrent(imageScale)}>
                Download one
            </Button>
            <Button sx={{ width: "130px", padding: 0 }} onClick={() => downloadAll(imageScale)}>
                Download all
            </Button>
        </Stack>
    );
}
