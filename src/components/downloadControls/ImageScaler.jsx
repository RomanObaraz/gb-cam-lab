import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useStore } from "../../stores/useStore";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../utils/constants";
import ArrowUpIcon from "../../assets/arrow_up.svg?react";
import ArrowDownIcon from "../../assets/arrow_down.svg?react";

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

    function handleIncrement() {
        setImageScale(Math.min(imageScale + 1, 99));
    }

    function handleDecrement() {
        setImageScale(Math.max(imageScale - 1, 1));
    }

    return (
        <div className="flex flex-row mt-0.6 items-center">
            <TextField
                className="w-[60px]"
                slotProps={{
                    htmlInput: { maxLength: 2 },
                    input: {
                        endAdornment: (
                            <InputAdornment className="absolute top-0.5 right-1.5" position="end">
                                <div className="flex flex-col">
                                    <IconButton
                                        className="p-0"
                                        size="small"
                                        onClick={handleIncrement}
                                        aria-label="increment"
                                    >
                                        <ArrowUpIcon className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        className="p-0"
                                        size="small"
                                        onClick={handleDecrement}
                                        aria-label="decrement"
                                    >
                                        <ArrowDownIcon className="size-4" />
                                    </IconButton>
                                </div>
                            </InputAdornment>
                        ),
                    },
                }}
                label="Scale"
                value={imageScale}
                onChange={handleScaleInputChange}
                onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
                onBlur={(e) => {
                    if (e.target.value === "") setImageScale(1);
                }}
            />
            <Typography className="w-36 text-left ml-2 font-medium">
                {` (${PHOTO_WIDTH * imageScale}x${PHOTO_HEIGHT * imageScale} px)`}
            </Typography>
        </div>
    );
}
