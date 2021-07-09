import React, {
  useState,
  memo,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { grid, dijkstra, createRoute } from "../../algorithms/graph/dijkstra";
import { Node } from "./components";
import { useRecoilState, useRecoilValue } from "recoil";
import { wallsAtom } from "../../state/pathFinder/atoms";

export const Grid = memo(() => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [walls, setWalls] = useRecoilState(wallsAtom);
  const [startNode, setStartNode] = useState<string | null>(null);
  const [endNode, setEndNode] = useState<string | null>(null);

  const traverseGridHandler = () => {
    if (endNode && startNode) {
      const { visitedOrderArr, previous } = dijkstra(
        grid,
        startNode,
        endNode,
        walls
      );

      visitedOrderArr.forEach((node, index) => {
        const nodeDiv = document.getElementById(node);
        if (nodeDiv) {
          setTimeout(() => {
            const isStartNode = nodeDiv.classList.contains("startNode");
            const isEndNode = nodeDiv.classList.contains("endNode");
            if (!isEndNode && !isStartNode) {
              nodeDiv.classList.add("visitedNode");
            }
          }, 1 + index);
        }
      });

      setTimeout(() => {
        const route = createRoute(previous, startNode, endNode);
        route.forEach((node, index) => {
          const nodeDiv = document.getElementById(node);

          if (nodeDiv) {
            setTimeout(() => {
              nodeDiv.classList.remove("visitedNode");
              nodeDiv.classList.add("route");
            }, 20 * index);
          }
        });
      }, visitedOrderArr.length);
    }
  };

  const resetHandler = () => {
    document
      .querySelectorAll(".startNode, .endNode, .walls, .visitedNode, .route")
      .forEach((node) => {
        return node.classList.remove(
          ...["startNode", "endNode", "walls", "visitedNode", "route"]
        );
      });
    setEndNode(null);
    setStartNode(null);
    setWalls([]);
  };

  const GridElement = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="grid">
      {row.map((col, colIndex) => (
        <Node
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          startNode={startNode}
          setStartNode={useCallback((node) => setStartNode(node), [startNode])}
          endNode={endNode}
          setEndNode={useCallback((node) => setEndNode(node), [endNode])}
          isMouseDown={isMouseDown}
          setIsMouseDown={useCallback(
            (value) => setIsMouseDown(value),
            [isMouseDown]
          )}
        />
      ))}
    </div>
  ));

  return (
    <>
      <button onClick={traverseGridHandler}>Start</button>
      <button onClick={resetHandler}>Reset</button>
      <div>{GridElement}</div>
    </>
  );
});
