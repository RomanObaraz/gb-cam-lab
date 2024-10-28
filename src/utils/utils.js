// If anything remains unclear check this video: https://youtu.be/txkHN6izK2Y?si=Mg0vllVL-3uzrHqh

import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
    DOWNLOAD_FILE_NAME,
    IMAGE_CANVAS_CLASSNAME,
    PHOTO_COUNT,
    PHOTO_HEIGHT,
    PHOTO_WIDTH,
} from "./constants";

export function getImageDataFromPhoto(photoData, palette) {
    // Photos consist of 8x8 pixel tiles
    // >> 3 gives the amount of 8x8 tiles for the size
    const wTiles = PHOTO_WIDTH >> 3; // 16 tiles
    const hTiles = PHOTO_HEIGHT >> 3; // 14 tiles

    // Gameboy image (pr camera photo) tile has 8 pixels in a row
    const pixelsPerRow = 8;

    // Create canvas imageData for storing RGBA values
    const imageData = new ImageData(PHOTO_WIDTH, PHOTO_HEIGHT);

    // Shade map will contain pixel indexes by shades for palette replacement in imageData in the future
    imageData.shadeMap = {
        shade0: [],
        shade1: [],
        shade2: [],
        shade3: [],
    };

    // Gameboy stores colors as nominal values, that need to be translated to a palette
    // This is a default 4 shades of grey palette, but we use the one from the props
    // const palette = [
    //     [255, 255, 255], // White (shade 0)
    //     [192, 192, 192], // Light Grey (shade 1)
    //     [96, 96, 96], // Dark Grey (shade 2)
    //     [0, 0, 0], // Black (shade 3)
    // ];

    // Go through each row ("y") and each tile by column ("x")
    for (let y = 0; y < hTiles * pixelsPerRow; y++) {
        // index of a tile by width
        for (let wTileIndex = 0; wTileIndex < wTiles; wTileIndex++) {
            const hTileIndex = y >> 3; // index of a tile by height
            const tileIndex = hTileIndex * wTiles + wTileIndex; // 1-dimensional index of a tile

            // 16 is a number of bytes per tile
            // We need to jump this amount when calculating indexes,
            // because for canvas image data pixels have to be stored in plain order,
            // but in Gameboy's photo data bytes (and therefore pixels) are ordered by tiles
            const byteIndexOffset = 16 * tileIndex;

            // Go through a row of 8 pixels (1 row of a tile)
            for (let i = 0; i < pixelsPerRow; i++) {
                // As photo data bytes are ordered by tiles,
                // we need to calculate byte indexes based on the current row ("y") and "byteIndexOffset"
                const byteIndex = byteIndexOffset + (y % pixelsPerRow) * 2; // 8 pixels per row and 2 bytes for pixel

                // Gameboy uses 2BPP (2 bits per pixel) storage system for pixel data
                // One byte consists of 2 bits and so contains 4 pixels data, so there're 2 bytes per row
                // The 2 bits for each pixel are split between 2 bytes
                // First byte contais each pixel's second bit, and the second byte contains each pixel's first bit
                // So in order to get the pixel data, we need to look at 2 bytes and determine the value (1 or 0) at a given bit ("i")
                // Combining those to values (here is comparing to 0 and incrementing "shade") we can apply palette
                // 0x80 gives us binary 10000000 and >> i moves it to the needed bit ("i")
                // & operator multiplies two binary numbers and determines if the photoData's bit at index "i" is 1 or 0
                let shade = 0;
                if ((photoData[byteIndex] & (0x80 >> i)) != 0) {
                    shade += 1;
                }
                if ((photoData[byteIndex + 1] & (0x80 >> i)) != 0) {
                    shade += 2;
                }

                // 1-dimensional index of a canvas image pixel, with a step of 4 for RGBA values
                const pixelX = wTileIndex * pixelsPerRow + i;
                const pixelIndex = (y * PHOTO_WIDTH + pixelX) * 4;

                imageData.data[pixelIndex + 0] = palette[shade][0];
                imageData.data[pixelIndex + 1] = palette[shade][1];
                imageData.data[pixelIndex + 2] = palette[shade][2];
                imageData.data[pixelIndex + 3] = 255;

                // Save indexes in shade map
                imageData.shadeMap[`shade${shade}`].push([
                    pixelIndex + 0,
                    pixelIndex + 1,
                    pixelIndex + 2,
                ]);
            }
        }
    }

    return imageData;
}

export function replaceImageDataColor(imageData, shadeIndex, newColor) {
    const data = imageData.data;
    const [r, g, b] = newColor;

    imageData.shadeMap[`shade${shadeIndex}`].forEach((pixelIndex) => {
        data[pixelIndex[0]] = r;
        data[pixelIndex[1]] = g;
        data[pixelIndex[2]] = b;
    });
}

export function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}

export function getScaledCanvas(originalCanvas, scale) {
    // Create an off-screen canvas for scaling
    const scaledCanvas = document.createElement("canvas");
    const ctx = scaledCanvas.getContext("2d");

    // Set the scaled canvas dimensions
    scaledCanvas.width = originalCanvas.width * scale;
    scaledCanvas.height = originalCanvas.height * scale;

    ctx.imageSmoothingEnabled = false;

    // Scale the original image onto the scaled canvas
    ctx.drawImage(
        originalCanvas,
        0,
        0,
        originalCanvas.width,
        originalCanvas.height,
        0,
        0,
        scaledCanvas.width,
        scaledCanvas.height
    );

    return scaledCanvas;
}

export function updatePalettePresetStorage(updatedPresets) {
    if (Object.keys(updatedPresets).length) {
        localStorage.setItem("palettePresets", JSON.stringify(updatedPresets));
    } else {
        localStorage.removeItem("palettePresets");
    }
}

export function getPalettePresetsFromStorage() {
    return JSON.parse(localStorage.getItem("palettePresets"));
}

export function downloadCurrent(imageScale) {
    const canvas = document.getElementsByClassName(IMAGE_CANVAS_CLASSNAME)?.[0];

    if (!canvas) return;

    const scaledCanvas = getScaledCanvas(canvas, imageScale);
    scaledCanvas.toBlob((blob) => saveAs(blob, `${DOWNLOAD_FILE_NAME}.png`), "image/png");
}

export async function downloadAll(imageScale) {
    const canvases = document.getElementsByClassName(IMAGE_CANVAS_CLASSNAME);

    if (!canvases) return;

    const zip = new JSZip();
    const zipPromises = [];

    for (let i = 1; i <= PHOTO_COUNT; i++) {
        const promise = new Promise((resolve) => {
            const scaledCanvas = getScaledCanvas(canvases[i], imageScale);
            scaledCanvas.toBlob((blob) => {
                zip.file(`${DOWNLOAD_FILE_NAME}-${i - 1}.png`, blob);
                resolve();
            }, "image/png");
        });

        zipPromises.push(promise);
    }

    await Promise.all(zipPromises);
    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${DOWNLOAD_FILE_NAME}s.zip`);
}

export function areArraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
