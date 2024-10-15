export default function ColorPalette({ colors, onChange }) {
    return (
        <div id="colorPalette">
            <div>
                Color 1:{" "}
                <input
                    type="color"
                    value={colors.color0}
                    onChange={(e) => onChange("color0", e.target.value)}
                />
            </div>
            <div>
                Color 2:{" "}
                <input
                    type="color"
                    value={colors.color1}
                    onChange={(e) => onChange("color1", e.target.value)}
                />
            </div>
            <div>
                Color 3:{" "}
                <input
                    type="color"
                    value={colors.color2}
                    onChange={(e) => onChange("color2", e.target.value)}
                />
            </div>
            <div>
                Color 4:{" "}
                <input
                    type="color"
                    value={colors.color3}
                    onChange={(e) => onChange("color3", e.target.value)}
                />
            </div>
        </div>
    );
}
