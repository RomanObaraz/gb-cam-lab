import { Stack } from "@mui/material";
import ColorPicker from "./ColorPicker";

export default function ColorPalette({ colors, onChange }) {
    return (
        // <div id="colorPalette">
        <Stack direction={"row"} justify="center">
            {colors.map((color, i) => {
                return (
                    <ColorPicker
                        key={`color-${i}`}
                        color={color}
                        onChange={(hex) => onChange(i, hex)}
                    />
                );
            })}
        </Stack>
    );
}
