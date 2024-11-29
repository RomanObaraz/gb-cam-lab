import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import classes from "../../../styles/ColorPicker.module.css";
import { ClickAwayListener } from "@mui/material";

export default function ColorPicker({ color, onChange }) {
    const [isOpen, toggle] = useState(false);

    return (
        <>
            <div
                className="
                    relative w-24 h-10 max-sm:w-16 max-sm:h-8
                    rounded-lg border-solid border-2 border-base-main
                    outline outline-2 outline-primary-main
                    shadow-[4px_4px_0_2px] shadow-primary-main
                    cursor-pointer
                "
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            >
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
            </div>
        </>
    );
}
