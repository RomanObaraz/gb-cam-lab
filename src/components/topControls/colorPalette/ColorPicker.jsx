import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import classes from "../../../styles/ColorPicker.module.css";

export default function ColorPicker({ color, onChange }) {
    const [isOpen, toggle] = useState(false);
    const popoverRef = useClickOutside(() => toggle(false));

    return (
        <>
            <div
                className={classes.swatch}
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className={classes.popover} ref={popoverRef}>
                    <HexColorPicker color={color} onChange={onChange} />
                    <HexColorInput
                        className={classes.colorInput}
                        color={color}
                        onChange={onChange}
                        onFocus={(e) => e.target.select()}
                    />
                </div>
            )}
        </>
    );
}
