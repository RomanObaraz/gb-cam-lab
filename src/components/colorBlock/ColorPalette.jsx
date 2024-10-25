import ColorPicker from "./ColorPicker";

export default function ColorPalette({ colors, onChange }) {
    return (
        <div id="colorPalette">
            {colors.map((color, i) => {
                return (
                    <div key={`color-${i}`}>
                        <span>Color {i}: </span>
                        <ColorPicker color={color} onChange={(hex) => onChange(i, hex)} />
                    </div>
                );
            })}
        </div>
    );
}
