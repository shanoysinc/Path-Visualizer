export interface Distance {
  [props: string]: GridNode;
}
export interface Path {
  [props: string]: string;
}

export interface GridNode {
  row: number;
  col: number;
  isVisited: boolean;
  distance: number;
  isWall: boolean;
  startNode: boolean;
  endNode: boolean;
}
