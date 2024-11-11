import { FormControl, FormControlLabel, Radio, RadioGroup, useColorScheme } from "@mui/material";

export default function ColorSchemeSwitch() {
    const { mode, setMode } = useColorScheme();
    if (!mode) return null;

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-theme-toggle"
                name="theme-toggle"
                row
                value={mode}
                onChange={(event) => setMode(event.target.value)}
            >
                <FormControlLabel value="light" control={<Radio />} label="Light" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
        </FormControl>
    );
}
