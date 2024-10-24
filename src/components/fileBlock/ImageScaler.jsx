import { useStore } from "../../stores/useStore";

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
            <span>Scale: </span>
            <input
                type="number"
                pattern="\d*"
                min={1}
                max={10}
                value={imageScale}
                onChange={handleScaleInputChange}
                onKeyDown={(e) => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()}
            />
            <span>{` (${128 * imageScale}x${112 * imageScale} px)`}</span>
        </div>
    );
}
