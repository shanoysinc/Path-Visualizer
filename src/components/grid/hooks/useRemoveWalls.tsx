import { useRecoilCallback } from "recoil";
import { NodeAtom } from "../../../state/pathFinder/atoms";
import { NUMBER_OF_ROWS, NUMBER_OF_COLS } from "./useInitialGrid";

export function useRemoveGridWalls() {
  return useRecoilCallback(({ set, snapshot }) => async () => {
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      for (let col = 0; col < NUMBER_OF_COLS; col++) {
        const currentNode = await snapshot.getPromise(NodeAtom({ row, col }));
        if (currentNode.isWall) {
          set(NodeAtom({ row, col }), { ...currentNode, isWall: false });
        }
      }
    }
  });
}
