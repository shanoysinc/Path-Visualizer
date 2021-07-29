import { getSmallestNode } from "../getSmallestNode";
import { createUnvisitedNode } from "../createUnvisitedNode";
import { Distance } from "../types";

const distance: Distance = {
  "10-10": {
    col: 10,
    distance: 0,
    endNode: false,
    isVisited: false,
    isWall: false,
    row: 10,
    startNode: false,
  },
  "1-10": {
    col: 10,
    distance: Infinity,
    endNode: false,
    isVisited: false,
    isWall: false,
    row: 1,
    startNode: false,
  },
  "3-15": {
    col: 15,
    distance: 2,
    endNode: false,
    isVisited: false,
    isWall: false,
    row: 3,
    startNode: false,
  },
};
test("find smallest node", () => {
  const unvisited = createUnvisitedNode(distance);
  expect(getSmallestNode(unvisited, distance)).toBe("10-10");
  unvisited.delete("10-10");
  expect(getSmallestNode(unvisited, distance)).toBe("3-15");
});
