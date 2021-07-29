import { Distance } from "./types";

export function getSmallestNode(unvisited: Set<string>, distance: Distance) {
  return Array.from(unvisited).reduce((minNodeIndex, nodeIndex) => {
    return distance[minNodeIndex].distance > distance[nodeIndex].distance
      ? nodeIndex
      : minNodeIndex;
  });
}
