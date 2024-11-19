import { useEffect, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../../../utils/constants";
import { getPalettePresetsFromStorage, updatePalettePresetStorage } from "../../../utils/utils";
import {
    Button,
    Collapse,
    Divider,
    IconButton,
    List,
    ListSubheader,
    MenuItem,
    Select,
} from "@mui/material";
import IconRemove from "../../../assets/remove.svg?react";

export default function ColorPresetSelect({ currentPalette, onPresetSelect }) {
    const [customPalettePresets, setCustomPalettePresets] = useState({});

    function handleCreatePalettePreset() {
        const presetId = Object.values(customPalettePresets).length;

        const newPreset = {
            name: `Custom-${presetId}`,
            colors: [...currentPalette.colors],
        };

        const updatedPresets = { ...customPalettePresets, [`custom${presetId}`]: newPreset };
        setCustomPalettePresets(updatedPresets);
        updatePalettePresetStorage(updatedPresets);
    }

    function handleDeletePalettePreset(paletteKey) {
        const updatedPresets = { ...customPalettePresets };
        delete updatedPresets[paletteKey];
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

            <Select className="w-48 h-11" MenuProps={{ disablePortal: true }}>
                <ListSubheader className="flex items-center gap-1 h-4 text-[10px]">
                    Default
                    <Divider className="flex-1" />
                </ListSubheader>

                {Object.values(defaultPalettePresets).map((palette, i) => {
                    return (
                        <MenuItem key={`defaultPalette-${i}`} value={i}>
                            <ColorPalettePreset palette={palette} onSelect={onPresetSelect} />
                        </MenuItem>
                    );
                })}

                {!!Object.keys(customPalettePresets).length &&
                    Object.entries(customPalettePresets).map(([key, palette], i) => {
                        return (
                            <MenuItem key={`defaultPalette-${i}`} value={i}>
                                <ColorPalettePreset palette={palette} onSelect={onPresetSelect} />
                            </MenuItem>
                        );
                    })}
            </Select>
        </>
    );
}
