import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            fileData: null,
            imageScale: 3,
            isFrameEnabled: false,

            setFileData: (data) => set({ fileData: data }),
            setImageScale: (scale) => set({ imageScale: scale }),
            setIsFrameEnabled: (enabled) => set({ isFrameEnabled: enabled }),
        }),
        {
            name: "scale-storage",
            partialize: (state) => ({
                imageScale: state.imageScale,
                isFrameEnabled: state.isFrameEnabled,
            }),
        }
    )
);
