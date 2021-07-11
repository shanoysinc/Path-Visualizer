interface Distance {
  [props: string]: GridNode;
}
interface Path {
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

function createNode(node: GridNode) {
  return {
    ...node,
    distance: Infinity,
  };
}

const NodeDefault = {
  distance: Infinity,
  isVisited: false,
  isWall: false,
  startNode: false,
  endNode: false,
};

export function dijkstra(
  graph: GridNode[][],
  source: string,
  distination: string
) {
  const visitedOrderArr: string[] = [];
  let distance: Distance = {};
  let previous: Path = {};
  let hasRoute = true;

  let unvisited: Set<string> = new Set();
  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      const node = createNode(graph[row][col]);
      distance[`${row}-${col}`] = node;
      unvisited.add(`${row}-${col}`);
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

  while (unvisited.size > 0) {
    let currentNode = getSmallestNode(unvisited, distance);
    unvisited.delete(currentNode);

    const currentNodeArr = currentNode.split("-");
    const row = parseInt(currentNodeArr[0]);
    const col = parseInt(currentNodeArr[1]);
    const currentNodeIndex = `${row}-${col}`;

    let prevRow = row - 1;
    let nextRow = row + 1;
    let prevCol = col - 1;
    let nextCol = col + 1;

    const isTopPosValid = prevRow >= 0 ? true : false;
    const isRightPosValid = nextCol < graph[row].length ? true : false;
    const isLeftPosValid = prevCol >= 0 ? true : false;
    const isBottomPosValid = nextRow < graph.length ? true : false;

    let neighbors = [];

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

    visitedOrderArr.push(...neighborsNotWall);
    // neighborsNotWall.forEach((n) => {
    //   if (!visitedOrderArr.includes(n)) {
    //     visitedOrderArr.push(n);
    //   }
    // });

    // break loop if route is found!
    if (previous[distination]) break;
  }

  return { previous, visitedOrderArr, hasRoute };
}

function getSmallestNode(unvisited: Set<string>, distance: Distance) {
  return Array.from(unvisited).reduce((minNodeIndex, nodeIndex) => {
    return distance[minNodeIndex].distance > distance[nodeIndex].distance
      ? nodeIndex
      : minNodeIndex;
  });
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
