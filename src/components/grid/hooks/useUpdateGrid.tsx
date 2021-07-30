import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/";
import { NodeAtom } from "../../../state/pathFinder/atoms";
import { grid } from "./useInitialGrid";

export function useUpdateGrid() {
  return useRecoilCallback(({ snapshot }) => () => {
    const updatedGrid: GridNode[][] = [];

    for (let row = 0; row < grid.length; row++) {
      const columns = [];
      for (let col = 0; col < grid[row].length; col++) {
        const state = snapshot.getLoadable<GridNode>(NodeAtom({ row, col }));
        const node = state.getValue();
        columns.push(node);
      }
      updatedGrid.push(columns);
    }
    return updatedGrid;
  });
}
