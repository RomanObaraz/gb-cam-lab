import { useEffect, useRef, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../../../utils/constants";
import { getPalettePresetsFromStorage, updatePalettePresetStorage } from "../../../utils/utils";
import {
    Button,
    ClickAwayListener,
    Collapse,
    Divider,
    IconButton,
    MenuItem,
    Stack,
} from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import RemoveIcon from "../../../assets/remove.svg?react";
import UnfoldMoreIcon from "../../../assets/unfold_more.svg?react";
import UnfoldLessIcon from "../../../assets/unfold_less.svg?react";
import PaletteIcon from "../../../assets/palette.svg?react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { twMerge } from "tailwind-merge";

export default function ColorPresetSelect({ currentPalette, onPresetSelect }) {
    const [customPalettePresets, setCustomPalettePresets] = useState({});
    const [isListShown, setIsListShown] = useState(false);
    const [isScrollDivVisible, setIsScrollDivVisible] = useState(false);
    const osRef = useRef();
    const scrollDivRef = useRef();

    // read custom palettes from local storage
    useEffect(() => {
        const storedPalettePresets = getPalettePresetsFromStorage();

        if (storedPalettePresets) {
            setCustomPalettePresets(storedPalettePresets);
        }
    }, []);

    function handleSavePalettePreset() {
        setIsListShown(true);
        setIsScrollDivVisible(true);

        setTimeout(() => {
            scrollDivRef.current.scrollIntoView({ behavior: "auto" });

            setTimeout(() => {
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

                setTimeout(() => setIsScrollDivVisible(false), 500);
            }, 100);
        }, 100);
    }

    function handleDeletePalettePreset(paletteKey) {
        const updatedPresets = { ...customPalettePresets };
        delete updatedPresets[paletteKey];

        // rename all remaining presets to retain naming order
        Object.values(updatedPresets).forEach((preset, i) => {
            preset.name = `Custom-${i + 1}`;
        });

        setCustomPalettePresets(updatedPresets);
        updatePalettePresetStorage(updatedPresets);
    }

    function handlePresetSelect(palette) {
        setIsListShown(false);
        onPresetSelect(palette);
    }

    function isCurrentPaletteInPresets() {
        return (
            Object.values(defaultPalettePresets).some(
                (preset) => preset.name === currentPalette.name
            ) ||
            Object.values(customPalettePresets).some(
                (preset) => preset.name === currentPalette.name
            )
        );
    }

    return (
        <>
            <Button className="px-2" endIcon={<PaletteIcon />} onClick={handleSavePalettePreset}>
                Save
            </Button>

            <Stack direction="column">
                <Button className="w-48 px-0" onClick={() => setIsListShown(!isListShown)}>
                    <div className="flex flex-row w-full">
                        <div className="items-start pl-3">
                            {isCurrentPaletteInPresets() ? (
                                <ColorPalettePreset palette={currentPalette} isHeader />
                            ) : (
                                "Select palette preset"
                            )}
                        </div>

                        <div className="absolute right-1 top-2">
                            {isListShown ? (
                                <UnfoldLessIcon className="size-4" />
                            ) : (
                                <UnfoldMoreIcon className="size-4" />
                            )}
                        </div>
                    </div>
                </Button>

                {isListShown && (
                    // <ClickAwayListener onClickAway={() => setIsListShown(false)}>
                    <OverlayScrollbarsComponent
                        ref={osRef}
                        className="max-h-40 mt-2 p-2 pl-0 rounded-md border-2 border-solid border-primary-main"
                        options={{ overflow: { x: "hidden" } }}
                        defer
                    >
                        <div className="flex items-center gap-1 ml-2 h-4 text-[10px] opacity-60">
                            Default
                            <Divider className="flex-1 mr-1" />
                        </div>

                        {Object.values(defaultPalettePresets).map((palette, i) => {
                            return (
                                <MenuItem
                                    key={`defaultPalette-${i}`}
                                    className="w-fit h-7 px-1.5 ml-0.5 rounded-lg"
                                    disableGutters
                                    onClick={() => handlePresetSelect(palette)}
                                >
                                    <ColorPalettePreset palette={palette} />
                                </MenuItem>
                            );
                        })}

                        {!!Object.keys(customPalettePresets).length && (
                            <>
                                <div className="flex items-center gap-1 ml-2 h-4 text-[10px] opacity-60">
                                    Custom
                                    <Divider className="flex-1 mr-1" />
                                </div>
                                <TransitionGroup>
                                    {Object.entries(customPalettePresets).map(([key, palette]) => {
                                        return (
                                            <Collapse key={key}>
                                                <Stack direction="row">
                                                    <MenuItem
                                                        className="w-fit h-7 px-1.5 ml-0.5 rounded-lg"
                                                        disableGutters
                                                        onClick={() => handlePresetSelect(palette)}
                                                    >
                                                        <ColorPalettePreset palette={palette} />
                                                    </MenuItem>
                                                    <IconButton
                                                        className="p-0 size-fit self-center"
                                                        onClick={() =>
                                                            handleDeletePalettePreset(key)
                                                        }
                                                    >
                                                        <RemoveIcon className="size-4" />
                                                    </IconButton>
                                                </Stack>
                                            </Collapse>
                                        );
                                    })}
                                </TransitionGroup>
                            </>
                        )}
                        <div
                            ref={scrollDivRef}
                            className={twMerge("h-7", isScrollDivVisible ? "block" : "hidden")}
                        />
                    </OverlayScrollbarsComponent>
                    // </ClickAwayListener>
                )}
            </Stack>
        </>
    );
}
