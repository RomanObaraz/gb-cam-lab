import { useEffect, useRef, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../../../utils/constants";
import { getPalettePresetsFromStorage, updatePalettePresetStorage } from "../../../utils/utils";
import { Button, Collapse, Divider, IconButton, MenuItem, Stack } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import RemoveIcon from "../../../assets/remove.svg?react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function ColorPresetSelect({ currentPalette, onPresetSelect }) {
    const [customPalettePresets, setCustomPalettePresets] = useState({});
    const osRef = useRef();

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

    // read custom palettes from local storage
    useEffect(() => {
        const storedPalettePresets = getPalettePresetsFromStorage();

        if (storedPalettePresets) {
            setCustomPalettePresets(storedPalettePresets);
        }
    }, []);

    return (
        <>
            <Button onClick={handleCreatePalettePreset}>Save</Button>

            <Stack direction="column">
                <Button className="w-48 h-11">Presets</Button>

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
                                className="w-fit h-7 px-1.5 ml-0.5 rounded-lg"
                                key={`defaultPalette-${i}`}
                                disableGutters
                            >
                                <ColorPalettePreset palette={palette} onSelect={onPresetSelect} />
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
                                                >
                                                    <ColorPalettePreset
                                                        palette={palette}
                                                        onSelect={onPresetSelect}
                                                    />
                                                </MenuItem>
                                                <IconButton
                                                    className="p-0 size-fit self-center"
                                                    onClick={() => handleDeletePalettePreset(key)}
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
                </OverlayScrollbarsComponent>
            </Stack>
        </>
    );
}
