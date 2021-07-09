import { atom } from "recoil";
// import { grid } from "../../algorithms/graph/dijkstra";

export const wallsAtom = atom<string[]>({
  key: "walls",
  default: [],
});
