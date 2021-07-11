import { useRecoilCallback } from "recoil";
import { GridNode } from "../../../algorithms/graph/dijkstra";
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

export const NUMBER_OF_ROWS = 20;
export const NUMBER_OF_COLS = 40;

export const START_INDEX = `${START_ROW}-${START_COL}`;
export const END_INDEX = `${END_ROW}-${END_COL}`;

const initGrid = createGrid(NUMBER_OF_ROWS, NUMBER_OF_COLS);

initGrid[START_ROW][START_COL].startNode = true;
initGrid[END_ROW][END_COL].endNode = true;

export const grid = initGrid;

export function createGrid(rows: number, cols: number) {
  let arr = [];
  for (let row = 0; row < rows; row++) {
    let colArr = [];
    for (let col = 0; col < cols; col++) {
      colArr.push({ col, row, ...NodeDefault });
    }
    arr.push(colArr);
  }
  return arr;
}

export function useInitialGrid() {
  return useRecoilCallback(({ set }) => () => {
    const initGrid: GridNode[][] = [];
    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
      let columns = [];

      for (let col = 0; col < NUMBER_OF_COLS; col++) {
        columns.push(grid[row][col]);
        set(NodeAtom({ row, col }), grid[row][col]);
      }
      initGrid.push(columns);
    }
    return initGrid;
  });
}
