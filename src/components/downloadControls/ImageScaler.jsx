import { TextField } from "@mui/material";
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
        } else {
            setImageScale(1);
        }
    }

    return (
        <div>
            <TextField
                type="number"
                label="Scale"
                min={1}
                max={10}
                value={imageScale}
                onChange={handleScaleInputChange}
                onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
            />
            <span>{` (${PHOTO_WIDTH * imageScale}x${PHOTO_HEIGHT * imageScale} px)`}</span>
        </div>
    );
}
