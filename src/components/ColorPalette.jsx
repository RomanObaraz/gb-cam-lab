export default function ColorPalette({ colors, onChange }) {
    return (
        <div id="colorPalette">
            {colors.map((color, i) => {
                return (
                    <div key={`color-${i}`}>
                        <span>Color {i}: </span>
                        {/* // TODO: ctrl+v doesn't work inside color picker */}
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
