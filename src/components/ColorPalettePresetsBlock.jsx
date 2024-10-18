import { useEffect, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../utils/defaultPalettes";

// TODO: disable delete button for default presets?

export default function ColorPalettePresetsBlock({ currentPalette, onPresetSelect }) {
    const [palettePresets, setPalettePresets] = useState(null);

    function handleCreatePalettePreset() {
        const presetId =
            Object.values(palettePresets).length - Object.values(defaultPalettePresets).length;

        const newPreset = {
            name: `Custom-${presetId}`,
            colors: structuredClone(currentPalette.colors),
        };

        const updatedPresets = { ...palettePresets, [`custom${presetId}`]: newPreset };

        setPalettePresets(updatedPresets);

        // write custom palettes to local storage
        localStorage.setItem("palettePresets", JSON.stringify(updatedPresets));
    }

    function handleDeletePalettePreset(paletteKey) {
        const updatedPresets = { ...palettePresets };
        delete updatedPresets[paletteKey];
        setPalettePresets(updatedPresets);
        localStorage.setItem("palettePresets", JSON.stringify(updatedPresets));
    }

    // read custom palettes from local storage
    useEffect(() => {
        const storedPalettePresets = JSON.parse(localStorage.getItem("palettePresets"));

        if (storedPalettePresets && Object.keys(storedPalettePresets).length) {
            setPalettePresets(storedPalettePresets);
        } else {
            setPalettePresets(defaultPalettePresets);
            localStorage.setItem("palettePresets", JSON.stringify(defaultPalettePresets));
        }
    }, []);

    return (
        <>
            {palettePresets &&
                Object.keys(palettePresets).map((paletteKey, i) => {
                    return (
                        <div key={`palettePresetHolder-${i}`} className="palettePresetHolder">
                            <ColorPalettePreset
                                palette={palettePresets[paletteKey]}
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
