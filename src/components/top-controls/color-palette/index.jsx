import { ColorPicker } from "./ColorPicker";

export const ColorPalette = ({ colors, onChange }) => {
    return (
        <div className="flex gap-6">
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
};
