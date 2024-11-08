import { Group } from "@mantine/core";
import ColorPicker from "./ColorPicker";

export default function ColorPalette({ colors, onChange }) {
    return (
        // <div id="colorPalette">
        <Group h={100} justify="center">
            {colors.map((color, i) => {
                return (
                    <ColorPicker
                        key={`color-${i}`}
                        color={color}
                        onChange={(hex) => onChange(i, hex)}
                    />
                );
            })}
        </Group>
    );
}
