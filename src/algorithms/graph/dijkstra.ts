interface GridNode {
  distance: number;
  isVisited: boolean;
  isWall: boolean;
}

interface Distance {
  [props: string]: GridNode;
}
interface Path {
  [props: string]: string;
}

function Graph(rows: number, cols: number) {
  let arr = [];
  for (let row = 0; row < rows; row++) {
    let colArr = [];
    for (let col = 0; col < cols; col++) {
      colArr.push(0);
    }
    arr.push(colArr);
  }
  return arr;
}

export const grid = Graph(20, 50);

export function dijkstra(
  graph: number[][],
  source: string,
  distination: string,
  walls: string[]
) {
  const visitedOrderArr: string[] = [];
  let distance: Distance = {};
  let previous: Path = {};

  let unvisited: Set<string> = new Set();
  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      distance[`${row}-${col}`] = {
        isVisited: false,
        distance: Infinity,
        isWall: false,
      };
      unvisited.add(`${row}-${col}`);
    }
  }

  distance[source] = {
    distance: 0,
    isVisited: false,
    isWall: false,
  };

  walls.forEach((node) => {
    distance[node].isWall = true;
  });

  while (unvisited.size > 0) {
    let currentNode = getSmallestNode(unvisited, distance);
    unvisited.delete(currentNode);

    const currentPos = currentNode.split("-");
    let row = parseInt(currentPos[0]);
    let col = parseInt(currentPos[1]);

    let prevRow = row - 1;
    let nextRow = row + 1;
    let prevCol = col - 1;
    let nextCol = col + 1;

    const isTopPosValid = prevRow >= 0 ? true : false;
    const isRightPosValid = nextCol < graph[row].length ? true : false;
    const isLeftPosValid = prevCol >= 0 ? true : false;
    const isBottomPosValid = nextRow < graph.length ? true : false;

    let neighbor = [];

    if (isTopPosValid) neighbor.push(`${prevRow}-${col}`);
    if (isRightPosValid) neighbor.push(`${row}-${nextCol}`);

    if (isBottomPosValid) neighbor.push(`${nextRow}-${col}`);

    if (isLeftPosValid) neighbor.push(`${row}-${prevCol}`);
    distance[currentNode].isVisited = true;

    const neighborsNotWall = neighbor.filter(
      (neighbor) => !distance[neighbor].isWall
    );
    updateNeighbors(distance, neighborsNotWall, currentNode, previous);
    visitedOrderArr.push(...neighborsNotWall);
    if (previous[distination]) {
      return { previous, visitedOrderArr };
    }
  }

  return { previous, visitedOrderArr };
}

function getSmallestNode(unvisited: Set<string>, distance: Distance) {
  return Array.from(unvisited).reduce((minNode, node) => {
    return distance[minNode].distance > distance[node].distance
      ? node
      : minNode;
  });
}

function updateNeighbors(
  distance: Distance,
  neighbors: string[],
  currentNode: string,
  previous: Path
) {
  neighbors.forEach((neighbor) => {
    if (!distance[neighbor].isVisited) {
      distance[neighbor].distance = distance[currentNode].distance + 1;
      previous[neighbor] = currentNode;
    }
  });
}

export function createRoute(
  previous: Path,
  source: string,
  distination: string
) {
  let route = [distination];

  let path = previous[distination];
  while (path !== source) {
    route.push(path);
    path = previous[path];
  }

  route.push(source);
  return route;
}
