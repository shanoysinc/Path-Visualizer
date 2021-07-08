import React, {
  useState,
  memo,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  initGraph,
  dijkstra,
  createRoute,
} from "../../algorithms/graph/dijkstra";
import { Node } from "./components/node/Node";

export const Grid = memo(() => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [walls, setWalls] = useState<string[]>([]);
  const [startNode, setStartNode] = useState<string | null>(null);
  const [endNode, setEndNode] = useState<string | null>(null);

  const grid = useMemo(() => initGraph(35, 80), []);

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
    if (gridRef.current) {
      [...gridRef.current.children].forEach((child) => {
        child.classList.remove("startNode");
        child.classList.remove("endNode");
        child.classList.remove("walls");
        child.classList.remove("visitedNode");
        child.classList.remove("route");
        setEndNode(null);
        setStartNode(null);
      });
    }
  };

  const GridElement = grid.map((row, rowIndex) => {
    console.log("rerender");
    return row.map((col, colIndex) => (
      <Node
        key={`${rowIndex}-${colIndex}`}
        row={rowIndex}
        col={colIndex}
        startNode={startNode}
        setStartNode={setStartNode}
        endNode={endNode}
        setEndNode={setEndNode}
        isMouseDown={isMouseDown}
        setIsMouseDown={setIsMouseDown}
        walls={walls}
        setWalls={setWalls}
      />
    ));
  });

  return (
    <>
      <button onClick={traverseGridHandler}>Start</button>
      <button onClick={resetHandler}>Reset</button>
      <div className="grid" ref={gridRef}>
        {GridElement}
      </div>
    </>
  );
});
