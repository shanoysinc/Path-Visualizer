import { atomFamily, atom } from "recoil";
import { GridNode } from "../../algorithms/graph/dijkstra";
import { grid } from "../../components/grid/hooks/useInitialGrid";

// export const GridAtom = atom<GridNode[][]>({
//   key: "grid",
//   default: grid,
// });

export const isMouseDownAtom = atom({
  key: "mouse",
  default: false,
});

export const NodeAtom = atomFamily<GridNode, { row: number; col: number }>({
  key: "NodeAtom",
  default: ({ row, col }) => grid[row][col],
});

// export const NodeSelector = selectorFamily<
//   GridNode,
//   { row: number; col: number }
// >({
//   key: "NodeAtom/NodeSelector",
//   get:
//     ({ row, col }) =>
//     ({ get }) => {
//       const node = get(NodeAtom({ col, row }));
//       return node;
//     },
//   set:
//     ({ row, col }) =>
//     ({ set }, newValue) => {
//       set(NodeAtom({ col, row }), newValue);
//     },
// });
