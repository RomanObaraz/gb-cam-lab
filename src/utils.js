// If anything remains unclear check this video: https://youtu.be/txkHN6izK2Y?si=Mg0vllVL-3uzrHqh
export function getImageDataFromPhoto(photoData, canvasCtx, palette) {
    // Gameboy Camera's photos are 128x112 resolution
    const width = 128;
    const height = 112;

    // Photos consist of 8x8 pixel tiles
    // >> 3 gives the amount of 8x8 tiles for the size
    const wTiles = width >> 3; // 16 tiles
    const hTiles = height >> 3; // 14 tiles

    // Create canvas imageData for storing RGBA values
    const imageData = canvasCtx.createImageData(width, height);

    // Gameboy stores colors as nominal values, that need to be translated to a palette
    // This is a default 4 shades of grey palette, but we use the one from the props
    // const palette = [
    //     [255, 255, 255], // White (shade 0)
    //     [192, 192, 192], // Light Grey (shade 1)
    //     [96, 96, 96], // Dark Grey (shade 2)
    //     [0, 0, 0], // Black (shade 3)
    // ];

    // Go through each row ("y") and each tile by column ("x")
    for (let y = 0; y < hTiles * 8; y++) {
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
            for (let i = 0; i < 8; i++) {
                // As photo data bytes are ordered by tiles,
                // we need to calculate byte indexes based on the current row ("y") and "byteIndexOffset"
                const byteIndex = byteIndexOffset + (y % 8) * 2; // 8 pixels per row and 2 bytes for pixel

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
                const pixelX = wTileIndex * 8 + i;
                const pixelIndex = (y * width + pixelX) * 4;

                imageData.data[pixelIndex + 0] = palette[shade][0];
                imageData.data[pixelIndex + 1] = palette[shade][1];
                imageData.data[pixelIndex + 2] = palette[shade][2];
                imageData.data[pixelIndex + 3] = 255;
            }
        }
    }

    return imageData;
}

export function hexToRgb(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    // Parse the hex values into RGB
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return [r, g, b];
}
