import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            fileData: null,
            imageScale: 3,
            isFrameEnabled: false,
            framesVariant: "international",

            setFileData: (data) => set({ fileData: data }),
            setImageScale: (scale) => set({ imageScale: scale }),
            setIsFrameEnabled: (enabled) => set({ isFrameEnabled: enabled }),
            setFramesVariant: (name) => set({ framesVariant: name }),
        }),
        {
            name: "scale-storage",
            partialize: (state) => ({
                imageScale: state.imageScale,
                isFrameEnabled: state.isFrameEnabled,
                framesVariant: state.framesVariant,
            }),
        }
    )
);
