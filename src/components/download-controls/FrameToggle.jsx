import { Checkbox } from "@mui/material";

import { useStore } from "../../stores/useStore";

export const FrameToggle = () => {
    const { isFrameEnabled, setIsFrameEnabled } = useStore();

    return (
        <Checkbox
            label="frame"
            checked={isFrameEnabled}
            onChange={(event) => setIsFrameEnabled(event.target.checked)}
        />
    );
};
