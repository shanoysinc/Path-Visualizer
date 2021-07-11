import create from "zustand";

export enum SelectedType {
  startNode = "START_NODE",
  endNode = "END_NODE",
}

export interface useSelectedNodeProps {
  selectedNode: SelectedType | null;
  setSelectedNode: (params: SelectedType | null) => void;
}

export const useSelectedNode = create<useSelectedNodeProps>((set) => ({
  selectedNode: null,
  setSelectedNode: (selectedNode) => set(() => ({ selectedNode })),
}));
