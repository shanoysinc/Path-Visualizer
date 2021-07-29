import { getSmallestNode } from "./getSmallestNode";
import { Distance, GridNode, Path } from "./types";
import { createDistance } from "./createDistance";
import { createUnvisitedNode } from "./createUnvisitedNode";

export function dijkstra(
  graph: GridNode[][],
  source: string,
  distination: string
) {
  const visitedOrderArr: string[] = [];
  const distance = createDistance(graph, source);
  const unvisited = createUnvisitedNode(distance);
  const previous: Path = {};
  let hasRoute = true;

  while (unvisited.size > 0) {
    const currentNode = getSmallestNode(unvisited, distance);
    unvisited.delete(currentNode);

    const currentNodeArr = currentNode.split("-");
    const row = parseInt(currentNodeArr[0]);
    const col = parseInt(currentNodeArr[1]);
    const currentNodeIndex = `${row}-${col}`;

    const prevRow = row - 1;
    const nextRow = row + 1;
    const prevCol = col - 1;
    const nextCol = col + 1;

    const isTopPosValid = prevRow >= 0 ? true : false;
    const isRightPosValid = nextCol < graph[row].length ? true : false;
    const isLeftPosValid = prevCol >= 0 ? true : false;
    const isBottomPosValid = nextRow < graph.length ? true : false;

    const neighbors = [];

    if (isTopPosValid) neighbors.push(`${prevRow}-${col}`);
    if (isRightPosValid) neighbors.push(`${row}-${nextCol}`);

    if (isBottomPosValid) neighbors.push(`${nextRow}-${col}`);

    if (isLeftPosValid) neighbors.push(`${row}-${prevCol}`);
    distance[currentNodeIndex].isVisited = true;

    const neighborsNotWall = neighbors.filter(
      (neighbor) => !distance[neighbor].isWall
    );

    updateNeighbors(distance, neighborsNotWall, currentNodeIndex, previous);

    // break loop if all route is block off!
    if (distance[currentNodeIndex].distance === Infinity) {
      hasRoute = false;
      break;
    }

    neighborsNotWall.forEach((n) => {
      if (!visitedOrderArr.includes(n)) {
        visitedOrderArr.push(n);
      }
    });

    // break loop if route is found!
    if (previous[distination]) break;
  }

  return { previous, visitedOrderArr, hasRoute };
}

function updateNeighbors(
  distance: Distance,
  neighbors: string[],
  currentNodeIndex: string,
  previous: Path
) {
  neighbors.forEach((neighbor) => {
    if (!distance[neighbor].isVisited) {
      distance[neighbor].distance = distance[currentNodeIndex].distance + 1;
      previous[neighbor] = currentNodeIndex;
    }
  });
}
