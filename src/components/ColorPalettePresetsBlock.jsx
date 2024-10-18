import { useEffect, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../utils/defaultPalettes";

export default function ColorPalettePresetsBlock({ currentPalette, onPresetSelect }) {
    const [customPalettePresets, setCustomPalettePresets] = useState({});

    function updatePalettePresetStorage(updatedPresets) {
        if (Object.keys(updatedPresets).length) {
            localStorage.setItem("palettePresets", JSON.stringify(updatedPresets));
        } else {
            localStorage.removeItem("palettePresets");
        }
    }

    function handleCreatePalettePreset() {
        const presetId = Object.values(customPalettePresets).length;

        const newPreset = {
            name: `Custom-${presetId}`,
            colors: structuredClone(currentPalette.colors),
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
        const storedPalettePresets = JSON.parse(localStorage.getItem("palettePresets"));

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

            {customPalettePresets &&
                Object.keys(customPalettePresets).map((paletteKey, i) => {
                    return (
                        <div key={`palettePresetHolder-${i}`} className="customPalettePresetHolder">
                            <ColorPalettePreset
                                palette={customPalettePresets[paletteKey]}
                                onSelect={onPresetSelect}
                            />
                            <button onClick={() => handleDeletePalettePreset(paletteKey)}>
                                &#9003;
                            </button>
                        </div>
                    );
                })}

            <button onClick={handleCreatePalettePreset}>+</button>
        </>
    );
}
