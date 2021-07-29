import { Distance } from "./types";

export function createUnvisitedNode(distance: Distance) {
  const disArr = Object.keys(distance);

  return new Set(disArr);
}
