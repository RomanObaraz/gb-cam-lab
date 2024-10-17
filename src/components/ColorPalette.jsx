export default function ColorPalette({ colors, onChange }) {
    return (
        <div id="colorPalette">
            <div>
                Color 1:{" "}
                <input
                    type="color"
                    value={colors[0]}
                    onChange={(e) => onChange(0, e.target.value)}
                />
            </div>
            <div>
                Color 2:{" "}
                <input
                    type="color"
                    value={colors[1]}
                    onChange={(e) => onChange(1, e.target.value)}
                />
            </div>
            <div>
                Color 3:{" "}
                <input
                    type="color"
                    value={colors[2]}
                    onChange={(e) => onChange(2, e.target.value)}
                />
            </div>
            <div>
                Color 4:{" "}
                <input
                    type="color"
                    value={colors[3]}
                    onChange={(e) => onChange(3, e.target.value)}
                />
            </div>
        </div>
    );
}
