import { Container } from "@mantine/core";
import { useStore } from "../../stores/useStore";
import FileLoader from "../topControls/FileLoader";
import ImageDownloader from "../downloadControls/ImageDownloader";
import ImageScaler from "../downloadControls/ImageScaler";

export default function FileBlock() {
    const isFileLoaded = !!useStore((state) => state.fileData);

    return (
        // <div id="fileBlock">
        <Container miw={350}>
            <FileLoader />
            {isFileLoaded && (
                <>
                    {/* <ImageScaler /> */}
                    {/* <ImageDownloader /> */}
                </>
            )}
        </Container>
        // </div>
    );
}
