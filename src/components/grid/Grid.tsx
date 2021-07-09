import React, { useState, memo } from "react";
import { grid, dijkstra, createRoute } from "../../algorithms/graph/dijkstra";
import { Node } from "./components";
import { useRecoilState } from "recoil";
import { wallsAtom } from "../../state/pathFinder/atoms";

export const Grid = memo(() => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [walls, setWalls] = useRecoilState(wallsAtom);
  const [startNode, setStartNode] = useState<string | null>("10-20");
  const [endNode, setEndNode] = useState<string | null>("2-10");

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
          const isStartNode = nodeDiv.classList.contains("startNode");
          const isEndNode = nodeDiv.classList.contains("endNode");
          setTimeout(() => {
            if (!isEndNode && !isStartNode) {
              nodeDiv.classList.add("visitedNode");
            }
          }, 1 + index);
        }
      });

      // setTimeout(() => {
      //   const route = createRoute(previous, startNode, endNode);
      //   route.forEach((node, index) => {
      //     const nodeDiv = document.getElementById(node);

      //     if (nodeDiv) {
      //       setTimeout(() => {
      //         nodeDiv.classList.remove("visitedNode");
      //         nodeDiv.classList.add("route");
      //       }, 20 * index);
      //     }
      //   });
      // }, visitedOrderArr.length);
    }
  };

  const resetHandler = () => {
    document
      .querySelectorAll(".walls, .visitedNode, .route")
      .forEach((node) => {
        return node.classList.remove(...["walls", "visitedNode", "route"]);
      });
    // setEndNode(null);
    // setStartNode(null);
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
          setStartNode={setStartNode}
          endNode={endNode}
          setEndNode={setEndNode}
          isMouseDown={isMouseDown}
          setIsMouseDown={setIsMouseDown}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
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
