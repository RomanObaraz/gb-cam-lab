import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            fileData: null,
            imageScale: 3,
            isFrameEnabled: false,
            frameVariant: "international",

            setFileData: (data) => set({ fileData: data }),
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
