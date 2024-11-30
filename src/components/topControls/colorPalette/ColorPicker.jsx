import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import classes from "../../../styles/ColorPicker.module.css";

export default function ColorPicker({ color, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleSwatchClick() {
        setIsOpen((prev) => !prev);
    }

    function handlePopoverClick(e) {
        e.stopPropagation();
    }

    function handleBackdropClick(e) {
        setIsOpen(false);
        e.stopPropagation();
    }

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
                onClick={handleSwatchClick}
            >
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10 cursor-auto"
                            onClick={(e) => handleBackdropClick(e)}
                        />
                        <div className={classes.popover} onClick={(e) => handlePopoverClick(e)}>
                            <HexColorPicker color={color} onChange={onChange} />
                            <HexColorInput
                                className={classes.colorInput}
                                color={color}
                                onChange={onChange}
                                onFocus={(e) => e.target.select()}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
