import { useRecoilCallback } from "recoil";
import { NodeAtom } from "../../../state/pathFinder/atoms";
import { grid } from "./useInitialGrid";

export function useRemoveGridWalls() {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const currentNode = await snapshot.getPromise(NodeAtom({ row, col }));
        if (currentNode.isWall) {
          set(NodeAtom({ row, col }), { ...currentNode, isWall: false });
        }
      }
    }
  });
}
