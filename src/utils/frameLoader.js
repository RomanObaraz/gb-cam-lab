const frames = { int: {}, jp: {} };
let isLoading = false;
let loadingPromise = null;

export const loadFrames = async () => {
    if (Object.keys(frames.int).length || isLoading) {
        return loadingPromise ?? Promise.resolve();
    }

    isLoading = true;
    console.log("Frames started loading...");

    const images = import.meta.glob("/src/assets/frames/*.png");
    const entries = Object.entries(images);

    loadingPromise = Promise.all(
        entries.map(async ([path, importer]) => {
            const module = await importer();
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = module.default;
                img.onload = () => {
                    const match = path.match(/\/(\w+)-frame-(\d+)\.png$/);
                    if (!match) return resolve();

                    const [, type, index] = match;
                    const frameIndex = parseInt(index, 10);

                    if (frames[type]) {
                        frames[type][frameIndex] = img;
                    }

                    resolve();
                };
                img.onerror = reject;
            });
        })
    );

    await loadingPromise;

    isLoading = false;
    loadingPromise = null;
    console.log("Frames loaded!");
};

export const getFrame = (index, variant) => {
    return variant === "japanese" && frames.jp[index]
        ? frames.jp[index]
        : frames.int[index] || null;
};

export const hasVariant = (index) => {
    return !!frames.jp[index];
};
