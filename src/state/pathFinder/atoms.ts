import { atomFamily, atom } from "recoil";
import { GridNode } from "../../algorithms/graph/dijkstra";
import { grid } from "../../components/grid/hooks/useInitialGrid";

export const GridAtom = atom<GridNode[][]>({
  key: "grid",
  default: [],
});

export const NodeAtom = atomFamily<GridNode, { row: number; col: number }>({
  key: "NodeAtom",
  default: ({ row, col }) => grid[row][col],
});

export const GridFunctionAtom = atom({
  key: "gridFunction",
  default: {
    isMouseDown: false,
  },
});
