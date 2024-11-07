import ColorPicker from "./ColorPicker";

export default function ColorPalette({ colors, onChange }) {
    return (
        <div id="colorPalette">
            {colors.map((color, i) => {
                return (
                    <ColorPicker
                        key={`color-${i}`}
                        color={color}
                        onChange={(hex) => onChange(i, hex)}
                    />
                );
            })}
        </div>
    );
}
