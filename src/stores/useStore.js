import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            fileData: null,
            imageScale: 3,

            setFileData: (data) => set({ fileData: data }),
            setImageScale: (scale) => set({ imageScale: scale }),
        }),
        {
            name: "scale-storage",
            partialize: (state) => ({ imageScale: state.imageScale }),
        }
    )
);
