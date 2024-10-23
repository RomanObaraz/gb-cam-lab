export default function ColorPalette({ colors, onChange }) {
    return (
        <div id="colorPalette">
            {colors.map((color, i) => {
                return (
                    <div key={`color-${i}`}>
                        Color {i}:{" "}
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => onChange(i, e.target.value)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
