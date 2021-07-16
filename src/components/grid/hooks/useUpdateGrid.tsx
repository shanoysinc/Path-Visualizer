import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/dijkstra";
import { NodeAtom } from "../../../state/pathFinder/atoms";
import { NUMBER_OF_COLS, NUMBER_OF_ROWS } from "./useInitialGrid";

export function useUpdateGrid() {
  return useRecoilCallback(({ snapshot }) => async () => {
    const updatedGrid: GridNode[][] = [];

    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      const columns = [];
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
        const node = await snapshot.getPromise(NodeAtom({ row, col }));
        columns.push(node);
      }
      updatedGrid.push(columns);
    }
    return updatedGrid;
  });
}
