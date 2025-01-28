import { useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Popover } from "@mui/material";
import { motion, AnimatePresence } from "motion/react";
import { twMerge } from "tailwind-merge";

import classes from "../../../styles/ColorPicker.module.css";

export const ColorPicker = ({ color, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const swatchRef = useRef();

    return (
        <>
            <div
                ref={swatchRef}
                className={twMerge(
                    `
                    relative w-24 h-10 max-sm:w-16 max-sm:h-8
                    rounded-lg border-solid border-2 border-base-main
                    outline outline-2 outline-primary-main 
                    shadow-[4px_4px_0_2px] shadow-primary-main
                    transition-all
                    hover:-translate-y-0.5 hover:outline-secondary-main hover:shadow-secondary-main
                    active:shadow-none active:translate-y-0.5 active:translate-x-0.5
                    cursor-pointer
                `,
                    isOpen && "-translate-y-0.5 outline-secondary-main shadow-secondary-main"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setIsOpen((prev) => !prev)}
            />
            <AnimatePresence>
                {isOpen && (
                    <Popover
                        className={classes.popover}
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        anchorEl={swatchRef.current}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        component={motion.div}
                        initial={{ opacity: 0, translateY: 0 }}
                        animate={{ opacity: 1, translateY: 12 }}
                        exit={{ opacity: 0, translateY: 0 }}
                    >
                        <HexColorPicker color={color} onChange={onChange} />
                        <HexColorInput
                            className={classes.colorInput}
                            color={color}
                            onChange={onChange}
                            onFocus={(e) => e.target.select()}
                        />
                    </Popover>
                )}
            </AnimatePresence>
        </>
    );
};
