import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/";
import { NodeAtom } from "../../../state/pathFinder/atoms";
import { NUMBER_OF_COLS, NUMBER_OF_ROWS } from "./useInitialGrid";

export const useRandomWalls = () => {
  return useRecoilCallback(({ snapshot, set }) => () => {
    const numberOfWALLS = Math.floor((NUMBER_OF_COLS * NUMBER_OF_ROWS) / 3);
    for (let index = 0; index < numberOfWALLS; index++) {
      const row = Math.floor(Math.random() * NUMBER_OF_ROWS);
      const col = Math.floor(Math.random() * NUMBER_OF_COLS);

      const state = snapshot.getLoadable<GridNode>(NodeAtom({ row, col }));

      const node = state.getValue();

      if (!node.isWall && !node.startNode && !node.endNode) {
        set(NodeAtom({ col, row }), { ...node, isWall: true });
      }
    }
  });
};
