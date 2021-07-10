import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/dijkstra";
import { NodeAtom } from "../../../state/pathFinder/atoms";

export function useUpdateGrid() {
  return useRecoilCallback(({ snapshot }) => async () => {
    const updatedGrid: GridNode[][] = [];

    for (let row = 0; row < 20; row++) {
      let columns = [];
      for (let col = 0; col < 40; col++) {
        const node = await snapshot.getPromise(NodeAtom({ row, col }));
        columns.push(node);
      }
      updatedGrid.push(columns);
    }
    return updatedGrid;
  });
}
