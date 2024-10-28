import { useCallback, useRef, useState } from "react";
import useClickOutside from "../../utils/useClickOutside";
import { HexColorInput, HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, onChange }) {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover}>
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
