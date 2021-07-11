import create from "zustand";

interface GridFuncState {
  isMouseDown: boolean;
}
export interface GridFuncProps {
  isMouseDown: boolean;
  updateFunc: (params: GridFuncState) => void;
}

export const useGridFunc = create<GridFuncProps>((set) => ({
  isMouseDown: false,
  updateFunc: (params: GridFuncState) =>
    set((state) => ({ ...state, ...params })),
}));
