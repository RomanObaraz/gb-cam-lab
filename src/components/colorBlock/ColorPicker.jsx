import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, onChange }) {
    const [isOpen, toggle] = useState(false);
    const popoverRef = useClickOutside(() => toggle(false));

    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popoverRef}>
                    <HexColorPicker color={color} onChange={onChange} />
                    <HexColorInput
                        className="colorInput"
                        color={color}
                        onChange={onChange}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
            )}
        </div>
    );
}
