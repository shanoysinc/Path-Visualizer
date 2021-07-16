import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/dijkstra";
import { NodeAtom } from "../../../state/pathFinder/atoms";
import { grid } from "./useInitialGrid";
export function useUpdateGrid() {
  return useRecoilCallback(({ snapshot }) => async () => {
    const updatedGrid: GridNode[][] = [];

    for (let row = 0; row < grid.length; row++) {
      const columns = [];
      for (let col = 0; col < grid[row].length; col++) {
        const node = await snapshot.getPromise(NodeAtom({ row, col }));
        columns.push(node);
      }
      updatedGrid.push(columns);
    }
    return updatedGrid;
  });
}
