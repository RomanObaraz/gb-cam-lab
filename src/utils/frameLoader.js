const frames = [];
let isLoading = false;
let loadingPromise = null;

export const loadFrames = async () => {
    if (frames.length || isLoading) {
        return loadingPromise ?? Promise.resolve();
    }

    isLoading = true;
    console.log("Frames started loading...");

    const images = import.meta.glob("/src/assets/frames/*.png");
    const entries = Object.entries(images);

    entries.sort(([aPath], [bPath]) => {
        return parseInt(aPath.split("-")[2], 10) - parseInt(bPath.split("-")[2], 10);
    });

    loadingPromise = Promise.all(
        entries.map(async ([path, importer], index) => {
            const module = await importer();
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = module.default;
                img.onload = () => {
                    frames[index] = img;
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

export const getFrame = (index) => frames[index] || null;
