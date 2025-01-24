import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Collapse, IconButton, MenuItem } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { motion, AnimatePresence } from "motion/react";

import { ColorPalettePreset } from "./ColorPalettePreset";
import { defaultPalettePresets } from "../../../utils/constants";
import { getPalettePresetsFromStorage, updatePalettePresetStorage } from "../../../utils/utils";
import { SelectDivider } from "./SelectDivider";
import RemoveIcon from "../../../assets/remove.svg?react";
import UnfoldMoreIcon from "../../../assets/unfold_more.svg?react";
import UnfoldLessIcon from "../../../assets/unfold_less.svg?react";
import PaletteIcon from "../../../assets/palette.svg?react";

export const ColorPresetSelect = ({ currentPalette, onPresetSelect }) => {
    const [customPalettePresets, setCustomPalettePresets] = useState({});
    const [isListShown, setIsListShown] = useState(false);
    const [listHeightOffset, setListHeightOffset] = useState(0);
    const osRef = useRef();
    const scrollDivRef = useRef();
    const selectButtonRef = useRef();

    const isCurrentPaletteInPresets = useMemo(() => {
        return [
            ...Object.values(defaultPalettePresets),
            ...Object.values(customPalettePresets),
        ].some((preset) => preset.id === currentPalette.id);
    }, [customPalettePresets, currentPalette]);

    const handleSavePalettePreset = () => {
        const saveCurrentPalettePreset = () => {
            const presetCount = Object.values(customPalettePresets).length;
            const lastPreset = Object.values(customPalettePresets)[presetCount - 1];
            const newPresetId = lastPreset ? lastPreset.id + 1 : 0;

            const newPreset = {
                id: newPresetId,
                name: `Custom-${presetCount + 1}`,
                colors: [...currentPalette.colors],
            };

            const updatedPresets = { ...customPalettePresets, [newPresetId]: newPreset };
            setCustomPalettePresets(updatedPresets);
            updatePalettePresetStorage(updatedPresets);
            onPresetSelect(newPreset);
        };

        setIsListShown(true);

        setTimeout(() => {
            saveCurrentPalettePreset();

            setTimeout(() => {
                const hasOverflow = osRef.current.osInstance()?.state().hasOverflow.y;

                if (hasOverflow && scrollDivRef.current) {
                    scrollDivRef.current.style.display = "block";
                    scrollDivRef.current.scrollIntoView({ behavior: "auto" });
                    scrollDivRef.current.style.display = "none";
                }
            }, 300);
        }, 100);
    };

    const handleDeletePalettePreset = (paletteKey) => {
        const updatedPresets = { ...customPalettePresets };
        delete updatedPresets[paletteKey];

        // rename all remaining presets to retain naming order
        Object.values(updatedPresets).forEach((preset, i) => {
            preset.name = `Custom-${i + 1}`;
        });

        setCustomPalettePresets(updatedPresets);
        updatePalettePresetStorage(updatedPresets);

        // this updates current palette on select button
        if (updatedPresets[currentPalette.id]) {
            onPresetSelect(updatedPresets[currentPalette.id]);
        }
    };

    const handlePresetSelect = (palette) => {
        setIsListShown(false);
        onPresetSelect(palette);
    };

    const updateListHeightOffset = () => {
        if (selectButtonRef.current) {
            const rect = selectButtonRef.current.getBoundingClientRect();
            setListHeightOffset(rect.top + 80);
        }
    };

    const menuItemClassName = "w-fit h-7 px-1.5 ml-0.5 rounded-lg";

    const UnfoldIcon = isListShown ? UnfoldLessIcon : UnfoldMoreIcon;

    const selectButton = (
        <Button
            ref={selectButtonRef}
            className="w-48 px-0"
            onClick={() => setIsListShown(!isListShown)}
        >
            <div className="flex flex-row w-full">
                <div className="items-start pl-3">
                    {isCurrentPaletteInPresets ? (
                        <ColorPalettePreset palette={currentPalette} isHeader />
                    ) : (
                        "Select palette preset"
                    )}
                </div>

                <div className="absolute right-1 top-2">
                    <UnfoldIcon className="size-4" />
                </div>
            </div>
        </Button>
    );

    const defaultPalettes = Object.values(defaultPalettePresets).map((palette, i) => {
        return (
            <MenuItem
                key={`defaultPalette-${i}`}
                className={menuItemClassName}
                disableGutters
                onClick={() => handlePresetSelect(palette)}
            >
                <ColorPalettePreset palette={palette} />
            </MenuItem>
        );
    });

    const customPalettes = (
        <>
            <TransitionGroup>
                {Object.entries(customPalettePresets).map(([key, palette]) => {
                    return (
                        <Collapse key={key}>
                            <div className="flex">
                                <MenuItem
                                    className={menuItemClassName}
                                    disableGutters
                                    onClick={() => handlePresetSelect(palette)}
                                >
                                    <ColorPalettePreset palette={palette} />
                                </MenuItem>
                                <IconButton
                                    className="p-0.5 self-center"
                                    aria-label="remove"
                                    onClick={() => handleDeletePalettePreset(key)}
                                >
                                    <RemoveIcon className="size-4" />
                                </IconButton>
                            </div>
                        </Collapse>
                    );
                })}
            </TransitionGroup>
        </>
    );

    const presetList = (
        <motion.div
            className="absolute z-50"
            initial={{ opacity: 0, translateY: 0 }}
            animate={{ opacity: 1, translateY: 8 }}
            exit={{ opacity: 0, translateY: 0 }}
        >
            <OverlayScrollbarsComponent
                id="smallOsScrollbar"
                ref={osRef}
                className="absolute w-48 overflow-auto min-h-20
                           p-2 pl-0 bg-base-main rounded-md border-2 border-solid border-primary-main"
                style={{ maxHeight: `calc(100vh - ${listHeightOffset}px)` }}
                options={{ overflow: { x: "hidden" } }}
                defer
            >
                <SelectDivider label="Default" />
                {defaultPalettes}

                {!!Object.keys(customPalettePresets).length && (
                    <>
                        <SelectDivider label="Custom" />
                        {customPalettes}
                    </>
                )}

                <div ref={scrollDivRef} className="hidden h-7" />
            </OverlayScrollbarsComponent>
        </motion.div>
    );

    // read custom palettes from local storage
    useEffect(() => {
        const storedPalettePresets = getPalettePresetsFromStorage();

        if (storedPalettePresets) {
            setCustomPalettePresets(storedPalettePresets);
        }

        updateListHeightOffset();
        window.addEventListener("resize", updateListHeightOffset);

        return () => {
            window.removeEventListener("resize", updateListHeightOffset);
        };
    }, []);

    return (
        <>
            <Button className="px-2" endIcon={<PaletteIcon />} onClick={handleSavePalettePreset}>
                Save
            </Button>

            <div>
                {selectButton}

                <AnimatePresence>{isListShown && presetList}</AnimatePresence>
            </div>
        </>
    );
};
