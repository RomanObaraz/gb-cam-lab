import { create } from "zustand";

export const useFileStore = create((set) => ({
    fileData: null,
    setFileData: (data) => set({ fileData: data }),
}));
