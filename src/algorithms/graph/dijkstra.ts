interface Distance {
  [props: string]: number;
}
interface Path {
  [props: string]: string;
}

export function initGraph(rows: number, cols: number) {
  let arr = [];
  for (let row = 0; row < rows; row++) {
    let colArr = [];
    for (let col = 0; col < cols; col++) {
      colArr.push(1);
    }
    arr.push(colArr);
  }
  return arr;
}

let graph = initGraph(25, 50);

export function dijkstra(
  graph: number[][],
  source: [number, number],
  distination: [number, number]
) {
  let distance: Distance = {};
  let previous: Path = {};

  let unvisited: Set<string> = new Set();
  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      distance[`${row}-${col}`] = Infinity;
      unvisited.add(`${row}-${col}`);
    }
  }

  distance[`${source[0]}-${source[1]}`] = 0;

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

    const isTopRightPosValid = isTopPosValid && isRightPosValid ? true : false;
    const isTopLeftPosValid = isTopPosValid && isLeftPosValid ? true : false;

    const isBottomRightPosValid =
      isBottomPosValid && isRightPosValid ? true : false;

    const isBottomLeftPosValid =
      isBottomPosValid && isLeftPosValid ? true : false;

    if (isTopPosValid) {
      let distancetoNeighor = graph[prevRow][col];
      let totalDistance = distancetoNeighor + distance[currentNode];
      let topIndex = `${prevRow}-${col}`;

      if (totalDistance < distance[topIndex]) {
        distance[topIndex] = totalDistance;
        previous[topIndex] = currentNode;
      }
    }
    if (isTopRightPosValid) {
      let distancetoNeighor = graph[prevRow][nextCol];
      let totalDistance = distancetoNeighor + distance[currentNode];
      let topRightIndex = `${prevRow}-${nextCol}`;

      if (totalDistance < distance[topRightIndex]) {
        distance[topRightIndex] = totalDistance;
        previous[topRightIndex] = currentNode;
      }
    }
    if (isTopLeftPosValid) {
      let distancetoNeighor = graph[prevRow][prevCol];
      let totalDistance = distancetoNeighor + distance[currentNode];
      let topLeftIndex = `${prevRow}-${prevCol}`;

      if (totalDistance < distance[topLeftIndex]) {
        distance[topLeftIndex] = totalDistance;
        previous[topLeftIndex] = currentNode;
      }
    }

    if (isRightPosValid) {
      let distancetoNeighor = graph[row][nextCol];
      let rightIndex = `${row}-${nextCol}`;
      let totalDistance = distancetoNeighor + distance[currentNode];

      if (totalDistance < distance[rightIndex]) {
        distance[rightIndex] = totalDistance;
        previous[rightIndex] = currentNode;
      }
    }

    if (isBottomPosValid) {
      let distancetoNeighor = graph[nextRow][col];
      let totalDistance = distancetoNeighor + distance[currentNode];
      let bottomIndex = `${nextRow}-${col}`;

      if (totalDistance < distance[bottomIndex]) {
        distance[bottomIndex] = totalDistance;
        previous[bottomIndex] = currentNode;
      }
    }
    if (isBottomRightPosValid) {
      let distancetoNeighor = graph[nextRow][nextCol];
      let totalDistance = distancetoNeighor + distance[currentNode];
      let bottomRightIndex = `${nextRow}-${nextCol}`;

      if (totalDistance < distance[bottomRightIndex]) {
        distance[bottomRightIndex] = totalDistance;
        previous[bottomRightIndex] = currentNode;
      }
    }
    if (isBottomLeftPosValid) {
      let distancetoNeighor = graph[nextRow][prevCol];
      let totalDistance = distancetoNeighor + distance[currentNode];
      let bottomLeftIndex = `${nextRow}-${prevCol}`;

      if (totalDistance < distance[bottomLeftIndex]) {
        distance[bottomLeftIndex] = totalDistance;
        previous[bottomLeftIndex] = currentNode;
      }
    }

    if (isLeftPosValid) {
      let distancetoNeighor = graph[row][prevCol];
      let totalDistance = distancetoNeighor + distance[currentNode];

      let leftIndex = `${row}-${prevCol}`;
      if (totalDistance < distance[leftIndex]) {
        distance[leftIndex] = totalDistance;
        previous[leftIndex] = currentNode;
      }
    }

    if (previous[`${distination[0]}-${distination[1]}`]) {
      return { previous, distance };
    }
  }

  return { previous, distance };
}

function getSmallestNode(unvisited: Set<string>, distance: Distance) {
  return Array.from(unvisited).reduce((minNode, node) => {
    return distance[minNode] > distance[node] ? node : minNode;
  });
}

const { previous, distance } = dijkstra(graph, [0, 5], [4, 5]);

function createRoute(
  previous: Path,
  source: [number, number],
  distination: [number, number]
) {
  let route = [`${distination[0]}-${distination[1]}`];

  let path = previous[`${distination[0]}-${distination[1]}`];
  while (path !== `${source[0]}-${source[1]}`) {
    route.push(path);
    path = previous[path];
  }

  route.push(`${source[0]}-${source[1]}`);
  return route;
}

let route = createRoute(previous, [0, 5], [4, 5]);

// function createBoard(graph: number[][], route: string[]) {
//   for (let index = 0; index < route.length; index++) {
//     let row = parseInt(route[index].split("-")[0]);
//     let col = parseInt(route[index].split("-")[1]);

//     graph[row][col] = 0;
//   }
//   return graph;
// }
