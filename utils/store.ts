import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type PreviewStore = {
  previewData: Record<string, any>;
  add: (previewDataProp: Record<string, any>) => void;
  clearPreviewData: () => void;
};

export const usePreviewStore = create<PreviewStore>()(
  devtools(
    persist(
      (set) => ({
        previewData: {},
        add: (previewDataProp) => {
          set((state) => ({ ...state, previewData: previewDataProp }));
        },
        clearPreviewData: () => set({}),
      }),
      { name: "previewStore", storage: createJSONStorage(() => sessionStorage) }
    )
  )
);
