import { Distance, GridNode } from "./types";

const NodeDefault = {
  distance: Infinity,
  isVisited: false,
  isWall: false,
  startNode: false,
  endNode: false,
};

function createNode(node: GridNode) {
  return {
    ...node,
    distance: Infinity,
  };
}

export function createDistance(graph: GridNode[][], source: string) {
  const distance: Distance = {};

  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      const node = createNode(graph[row][col]);
      distance[`${row}-${col}`] = node;
    }
  }

  const sourceArr = source.split("-");
  const sourceCol = parseInt(sourceArr[1]);
  const sourceRow = parseInt(sourceArr[0]);
  distance[source] = {
    ...NodeDefault,
    row: sourceRow,
    col: sourceCol,
    distance: 0,
    startNode: true,
  };

  return distance;
}
