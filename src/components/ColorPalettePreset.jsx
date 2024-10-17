export default function ColorPalettePreset({ palette, onSelect }) {
    return (
        <div className="palettePreset">
            <button onClick={() => onSelect(palette)}>{palette.name}</button>
            <div className="palettePreview">
                {palette.colors.map((color, index) => {
                    return (
                        <div
                            key={`colorPreview-${index}`}
                            className="colorPreview"
                            title={color}
                            style={{ background: color }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
