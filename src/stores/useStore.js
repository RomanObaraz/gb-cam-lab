import { create } from "zustand";

export const useStore = create((set) => ({
    fileData: null,
    imageScale: 3,

    setFileData: (data) => set({ fileData: data }),
    setImageScale: (scale) => set({ imageScale: scale }),
}));
