import { Stack } from "@mui/material";
import ColorPicker from "./ColorPicker";

export default function ColorPalette({ colors, onChange }) {
    return (
        <Stack direction="row" spacing={3}>
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
