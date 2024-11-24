import { TextField, Typography } from "@mui/material";
import { useStore } from "../../stores/useStore";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../utils/constants";

export default function ImageScaler() {
    const { imageScale, setImageScale } = useStore();

    function handleScaleInputChange(e) {
        let inputValue = e.target.value;

        // Allow empty string so user can clear input
        if (inputValue === "") {
            setImageScale("");
        } else if (inputValue > 0) {
            // Remove leading zeros to prevent input like "01"
            inputValue = inputValue.replace(/^0+/, "");
            setImageScale(inputValue);
        }
    }

    return (
        <div className="flex flex-row items-center">
            <TextField
                className="w-[60px]"
                slotProps={{ htmlInput: { maxLength: 2 } }}
                label="Scale"
                value={imageScale}
                onChange={handleScaleInputChange}
                onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                onBlur={(e) => {
                    if (e.target.value === "") setImageScale(1);
                }}
            />
            <Typography className="ml-2 font-medium">{` (${PHOTO_WIDTH * imageScale}x${
                PHOTO_HEIGHT * imageScale
            } px)`}</Typography>
        </div>
    );
}
