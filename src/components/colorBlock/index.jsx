import ColorPalettePresetsBlock from "./ColorPalettePresetsBlock";
import ColorPalette from "./ColorPalette";

export default function ColorBlock({ palette, onPaletteColorChange, onPalettePresetSelect }) {
    return (
        <div id="colorBlock">
            <ColorPalette colors={palette.colors} onChange={onPaletteColorChange} />
            <ColorPalettePresetsBlock
                currentPalette={palette}
                onPresetSelect={onPalettePresetSelect}
            />
        </div>
    );
}
