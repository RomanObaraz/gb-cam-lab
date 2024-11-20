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
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function ColorPresetSelect({ currentPalette, onPresetSelect }) {
    const [customPalettePresets, setCustomPalettePresets] = useState({});
    const [isListShown, setIsListShown] = useState(false);
    const osRef = useRef();

    // read custom palettes from local storage
    useEffect(() => {
        const storedPalettePresets = getPalettePresetsFromStorage();

        if (storedPalettePresets) {
            setCustomPalettePresets(storedPalettePresets);
        }
    }, []);

    function handleCreatePalettePreset() {
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

        // scroll to the bottom of the list
        const osInstance = osRef.current?.osInstance();
        if (osInstance) {
            const viewport = osInstance.elements().viewport;
            setTimeout(
                () => viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" }),
                250
            );
        }
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

    return (
        <>
            <Button onClick={handleCreatePalettePreset}>Save</Button>

            <Stack direction="column">
                <Button className="w-48 h-11 px-0" onClick={() => setIsListShown(!isListShown)}>
                    <div className="flex flex-row w-full">
                        <div className="items-start pl-3">
                            {currentPalette.name === "Custom" ? (
                                "Select preset"
                            ) : (
                                <ColorPalettePreset palette={currentPalette} isHeader />
                            )}
                        </div>

                        <div className="absolute right-1 top-[11px]">
                            {isListShown ? (
                                <UnfoldLessIcon className="size-4" />
                            ) : (
                                <UnfoldMoreIcon className="size-4" />
                            )}
                        </div>
                    </div>
                </Button>

                {isListShown && (
                    <ClickAwayListener onClickAway={() => setIsListShown(false)}>
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
                                        {Object.entries(customPalettePresets).map(
                                            ([key, palette]) => {
                                                return (
                                                    <Collapse key={key}>
                                                        <Stack direction="row">
                                                            <MenuItem
                                                                className="w-fit h-7 px-1.5 ml-0.5 rounded-lg"
                                                                disableGutters
                                                                onClick={() =>
                                                                    handlePresetSelect(palette)
                                                                }
                                                            >
                                                                <ColorPalettePreset
                                                                    palette={palette}
                                                                />
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
                                            }
                                        )}
                                    </TransitionGroup>
                                </>
                            )}
                        </OverlayScrollbarsComponent>
                    </ClickAwayListener>
                )}
            </Stack>
        </>
    );
}
