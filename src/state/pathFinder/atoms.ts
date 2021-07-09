import { atom } from "recoil";
// import { grid } from "../../algorithms/graph/dijkstra";
import create from "zustand";

export const wallsAtom = atom<string[]>({
  key: "walls",
  default: [],
});

export const draggingNodeAtom = atom<string | null>({
  key: "draggingNode",
  default: null,
});

interface DraggingNode {
  draggingNode: string | null;
  setDraggingNode: (node: string | null) => void;
}

export const useDraggingNodeStore = create<DraggingNode>((set) => ({
  draggingNode: null,
  setDraggingNode: (node) => set({ draggingNode: node }),
}));
