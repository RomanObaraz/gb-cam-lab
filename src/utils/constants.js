export const defaultPalettePresets = {
    blackAndWhite: {
        id: "default-0",
        name: "Black & white",
        colors: ["#ffffff", "#c0c0c0", "#606060", "#000000"],
    },
    gameboy: {
        id: "default-1",
        name: "Gameboy",
        colors: ["#9a9e3f", "#496b22", "#0e450b", "#1b2a09"],
    },
};

export const IMAGE_CANVAS_CLASSNAME = "photoImage";

export const DOWNLOAD_FILE_NAME = "gb-cam-image";

export const CUSTOM_PALETTE_PRESET_NAME = "Palette";

// Gameboy Camera's photos are 128x112 resolution
export const PHOTO_WIDTH = 128;
export const PHOTO_HEIGHT = 112;

// Gameboy Camera's photo frames are 160x144 resolution
export const FRAME_WIDTH = 160;
export const FRAME_HEIGHT = 144;

// There're a total of 30 photos in Gameboy Camera's memory
export const PHOTO_COUNT = 30;

// Gameboy Camera .sav file should always be 131072 bytes (right?)
export const SAVE_FILE_SIZE = 131072;
