import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            fileData: null,
            isPhotoBlank: Array(30).fill(false),
            imageScale: 3,
            isFrameEnabled: false,
            frameVariant: "international",

            setFileData: (data) => {
                if (!data) {
                    set({ fileData: null });
                    return;
                }

                const fileData = new Uint8Array(data);

                // bytes 0x11B2-0x11CF are photo indexes, where 0xff means the photo is blank
                const blankFlags = fileData.slice(0x11b2, 0x11d0);
                const isPhotoBlank = Array.from(blankFlags, (byte) => byte === 0xff);

                set({ fileData, isPhotoBlank });
            },

            setImageScale: (scale) => set({ imageScale: scale }),
            setIsFrameEnabled: (enabled) => set({ isFrameEnabled: enabled }),
            setFrameVariant: (name) => set({ frameVariant: name }),
        }),
        {
            name: "scale-storage",
            partialize: (state) => ({
                imageScale: state.imageScale,
                isFrameEnabled: state.isFrameEnabled,
                frameVariant: state.frameVariant,
            }),
        }
    )
);
