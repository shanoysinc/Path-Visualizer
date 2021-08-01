import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/";
import { NodeAtom } from "../../../state/pathFinder/atoms";

const NodeDefault = {
  distance: Infinity,
  isVisited: false,
  isWall: false,
  startNode: false,
  endNode: false,
};

const START_ROW = 10;
const START_COL = 20;
const END_ROW = 2;
const END_COL = 10;

export const NUMBER_OF_ROWS = 14;
export const NUMBER_OF_COLS = 32;

export const START_INDEX = `${START_ROW}-${START_COL}`;
export const END_INDEX = `${END_ROW}-${END_COL}`;

function createGrid(rows: number, cols: number) {
  const arr: GridNode[][] = [];
  for (let row = 0; row < rows; row++) {
    const colArr = [];
    for (let col = 0; col < cols; col++) {
      colArr.push({ col, row, ...NodeDefault });
    }
    arr.push(colArr);
  }
  return arr;
}

const initGrid = createGrid(NUMBER_OF_ROWS, NUMBER_OF_COLS);

initGrid[START_ROW][START_COL].startNode = true;
initGrid[END_ROW][END_COL].endNode = true;

export const grid = initGrid;

export function useResetGrid() {
  return useRecoilCallback(({ set }) => () => {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        set(NodeAtom({ row, col }), grid[row][col]);
      }
    }
  });
}
