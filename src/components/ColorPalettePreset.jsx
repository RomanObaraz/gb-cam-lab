export default function ColorPalettePreset({ palette, onSelect }) {
    function handleCopyToClipboard(e, color) {
        navigator.clipboard.writeText(color);

        const tooltipElement = e.currentTarget.children[0];
        const tooltipText = tooltipElement.innerText;

        if (tooltipElement.innerText !== "Copied") {
            tooltipElement.innerText = "Copied";
            setTimeout(() => (tooltipElement.innerText = tooltipText), 1500);
        }
    }

    return (
        <div className="palettePreset">
            <button onClick={() => onSelect(palette)}>{palette.name}</button>
            <div className="palettePreview">
                {palette.colors.map((color, index) => {
                    return (
                        <div
                            key={`colorPreview-${index}`}
                            className="colorPreview"
                            style={{ background: color }}
                            onClick={(e) => handleCopyToClipboard(e, color)}
                        >
                            <span className="colorPreviewTooltip">{color}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
