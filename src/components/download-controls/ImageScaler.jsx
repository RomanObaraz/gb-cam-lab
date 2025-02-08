import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";

import { useStore } from "../../stores/useStore";
import { FRAME_HEIGHT, FRAME_WIDTH, PHOTO_HEIGHT, PHOTO_WIDTH } from "../../utils/constants";
import ArrowUpIcon from "../../assets/icons/arrow_up.svg?react";
import ArrowDownIcon from "../../assets/icons/arrow_down.svg?react";

export const ImageScaler = () => {
    const { isFrameEnabled, imageScale, setImageScale } = useStore();

    const handleScaleInputChange = (e) => {
        let inputValue = e.target.value;

        // Allow empty string so user can clear input
        if (inputValue === "") {
            setImageScale("");
        } else if (inputValue > 0) {
            // Remove leading zeros to prevent input like "01"
            inputValue = inputValue.replace(/^0+/, "");
            setImageScale(Number(inputValue));
        }
    };

    const handleIncrement = () => {
        setImageScale(Math.min(imageScale + 1, 30));
    };

    const handleDecrement = () => {
        setImageScale(Math.max(imageScale - 1, 1));
    };

    return (
        <div className="flex flex-row mt-0.5 items-center max-sm:ml-10">
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
                {isFrameEnabled
                    ? ` (${FRAME_WIDTH * imageScale}x${FRAME_HEIGHT * imageScale} px)`
                    : ` (${PHOTO_WIDTH * imageScale}x${PHOTO_HEIGHT * imageScale} px)`}
            </Typography>
        </div>
    );
};
