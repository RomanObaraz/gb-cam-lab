import { useEffect, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../../utils/constants";
import { getPalettePresetsFromStorage, updatePalettePresetStorage } from "../../utils/utils";

export default function ColorPalettePresetsBlock({ currentPalette, onPresetSelect }) {
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
            {Object.values(defaultPalettePresets).map((palette, i) => {
                return (
                    <ColorPalettePreset
                        key={`defaultPalette-${i}`}
                        palette={palette}
                        onSelect={onPresetSelect}
                    />
                );
            })}

            {!!Object.keys(customPalettePresets).length &&
                Object.entries(customPalettePresets).map(([key, palette], i) => {
                    return (
                        <div key={`palettePresetHolder-${i}`} className="customPalettePresetHolder">
                            <ColorPalettePreset palette={palette} onSelect={onPresetSelect} />
                            <button onClick={() => handleDeletePalettePreset(key)}>&#9003;</button>
                        </div>
                    );
                })}
            <button onClick={handleCreatePalettePreset}>+</button>
        </>
    );
}
