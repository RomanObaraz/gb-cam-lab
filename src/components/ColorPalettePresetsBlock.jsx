import { useEffect, useState } from "react";
import ColorPalettePreset from "./ColorPalettePreset";
import { defaultPalettePresets } from "../utils/defaultPalettes";

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

    // read custom palettes from local storage
    useEffect(() => {
        const storedPalettePresets = JSON.parse(localStorage.getItem("palettePresets"));

        if (storedPalettePresets) {
            setPalettePresets(storedPalettePresets);
        } else {
            localStorage.setItem("palettePresets", JSON.stringify(defaultPalettePresets));
            setPalettePresets(defaultPalettePresets);
        }
    }, []);

    return (
        <>
            {palettePresets &&
                Object.values(palettePresets).map((palette, i) => {
                    return (
                        <ColorPalettePreset
                            key={`palettePreset-${i}`}
                            palette={palette}
                            onSelect={onPresetSelect}
                        />
                    );
                })}

            <button onClick={handleCreatePalettePreset}>+</button>
        </>
    );
}
