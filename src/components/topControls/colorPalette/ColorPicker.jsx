import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import classes from "../../../styles/ColorPicker.module.css";
import { ClickAwayListener } from "@mui/material";

export default function ColorPicker({ color, onChange }) {
    const [isOpen, toggle] = useState(false);

    return (
        <>
            <div
                className={classes.swatch}
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <ClickAwayListener onClickAway={() => toggle(false)}>
                    <div className={classes.popover}>
                        <HexColorPicker color={color} onChange={onChange} />
                        <HexColorInput
                            className={classes.colorInput}
                            color={color}
                            onChange={onChange}
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                </ClickAwayListener>
            )}
        </>
    );
}
