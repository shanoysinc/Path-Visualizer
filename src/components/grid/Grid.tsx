import React, { useState, memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  dijkstra,
  createRoute,
  GridNode,
} from "../../algorithms/graph/dijkstra";
import { GridAtom } from "../../state/pathFinder/atoms";
import { Node } from "./components";
import { END_INDEX, START_INDEX } from "./hooks/useInitialGrid";
import { useInitialGrid } from "./hooks/useInitialGrid";
import { useUpdateGrid } from "./hooks/useUpdateGrid";

export const Grid = () => {
  const initGrid = useInitialGrid();
  const [grid, setGrid] = useRecoilState(GridAtom);
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  const updatedGrid = useUpdateGrid();
  useEffect(() => {
    setGrid(initGrid());
  }, []);

  console.log("rerender");

  const traverseGridHandler = async () => {
    const updatedGridData = await updatedGrid();

    const { visitedOrderArr, previous } = dijkstra(
      updatedGridData,
      START_INDEX,
      END_INDEX
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

    setTimeout(() => {
      const route = createRoute(previous, START_INDEX, END_INDEX);
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
  };

  const resetHandler = () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });

    setGrid(initGrid());
  };

  const GridElement = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="grid">
      {row.map((node, colIndex) => (
        <Node
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          // isVisited={node.isVisited}
          // isWall={node.isWall}
          // startNode={node.startNode}
          // endNode={node.endNode}
          // startNode={startNode}
          // setStartNode={setStartNode}
          // endNode={endNode}
          // setEndNode={setEndNode}
          // isMouseDown={isMouseDown}
          // setIsMouseDown={setIsMouseDown}
          // isDragging={isDragging}
          // setIsDragging={setIsDragging}
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
};
