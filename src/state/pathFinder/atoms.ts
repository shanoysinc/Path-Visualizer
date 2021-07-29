import { atomFamily, atom } from "recoil";
import { GridNode } from "../../algorithms/graph/";
import {
  END_INDEX,
  grid,
  START_INDEX,
} from "../../components/grid/hooks/useInitialGrid";
import { SelectedType, RoutePosState } from "../types";

export const SelectNodeAtom = atom<null | SelectedType>({
  key: "selectedNode",
  default: null,
});

export const RoutePosAtom = atom<RoutePosState>({
  key: "RoutePos",
  default: {
    destinationIndex: END_INDEX,
    sourceIndex: START_INDEX,
  },
});

export const NodeAtom = atomFamily<GridNode, { row: number; col: number }>({
  key: "NodeAtom",
  default: ({ row, col }) => grid[row][col],
});
