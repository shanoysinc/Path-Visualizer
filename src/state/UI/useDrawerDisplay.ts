import create from "zustand";

export interface DrawerStateProps {
  isOpen: boolean;
  setIsOpen: (params: boolean) => void;
}

export const useDrawerState = create<DrawerStateProps>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set(() => ({ isOpen: value })),
}));
