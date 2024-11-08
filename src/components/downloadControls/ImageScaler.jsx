import { NumberInput } from "@mantine/core";
import { useStore } from "../../stores/useStore";
import { PHOTO_HEIGHT, PHOTO_WIDTH } from "../../utils/constants";

export default function ImageScaler() {
    const { imageScale, setImageScale } = useStore();

    function handleScaleInputChange(inputValue) {
        switch (inputValue) {
            case "":
                // do nothing
                break;
            case 0:
                setImageScale(1);
                break;
            default:
                setImageScale(inputValue);
                break;
        }
    }

    return (
        <>
            <NumberInput
                label="Scale"
                allowDecimal={false}
                allowNegative={false}
                min={1}
                max={10}
                value={imageScale}
                onChange={handleScaleInputChange}
            />
            <span>{` (${PHOTO_WIDTH * imageScale}x${PHOTO_HEIGHT * imageScale} px)`}</span>
        </>
    );
}
