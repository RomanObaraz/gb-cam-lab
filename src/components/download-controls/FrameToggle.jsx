import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { useStore } from "../../stores/useStore";

export const FrameToggle = () => {
    const { isFrameEnabled, setIsFrameEnabled } = useStore();
    const { frameVariant, setFrameVariant } = useStore();

    return (
        <div className="flex flex-row">
            <FormControlLabel
                control={
                    <Checkbox
                        checked={isFrameEnabled}
                        onChange={(event) => setIsFrameEnabled(event.target.checked)}
                    />
                }
                label="Frames"
            />
            <RadioGroup
                className="flex flex-col"
                value={frameVariant}
                onChange={(event) => setFrameVariant(event.target.value)}
            >
                <FormControlLabel
                    value="international"
                    control={<Radio />}
                    label="International"
                    disabled={!isFrameEnabled}
                />
                <FormControlLabel
                    value="japanese"
                    control={<Radio />}
                    label="Japanese"
                    disabled={!isFrameEnabled}
                />
            </RadioGroup>
        </div>
    );
};
