export const defaultPalettePresets = {
    blackAndWhite: {
        name: "Black & white",
        colors: ["#ffffff", "#c0c0c0", "#606060", "#000000"],
    },
    gameboy: {
        name: "Gameboy",
        colors: ["#9a9e3f", "#496b22", "#0e450b", "#1b2a09"],
    },
};

export const IMAGE_CANVAS_CLASSNAME = "photoImage";

export const DOWNLOAD_FILE_NAME = "gb-cam-image";

// Gameboy Camera's photos are 128x112 resolution
export const PHOTO_WIDTH = 128;
export const PHOTO_HEIGHT = 112;

// There're a total of 30 photos in Gameboy Camera's memory
export const PHOTO_COUNT = 30;

// Gameboy Camera .sav file should always be 131072 bytes (right?)
export const SAVE_FILE_SIZE = 131072;
