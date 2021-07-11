import React, { useState, memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { dijkstra, createRoute } from "../../algorithms/graph/dijkstra";
import { GridAtom } from "../../state/pathFinder/atoms";
import {
  useRoutePos,
  useRoutePosProps,
} from "../../state/pathFinder/useRoutePos";
import { Node } from "./components";
import { END_INDEX, START_INDEX, useInitialGrid } from "./hooks/useInitialGrid";
import { useUpdateGrid } from "./hooks/useUpdateGrid";

const routePosSelector = (state: useRoutePosProps) => ({
  routePos: state.routePos,
  setRoutePost: state.setRoutePos,
});
export const Grid = memo(() => {
  const initGrid = useInitialGrid();
  const [grid, setGrid] = useRecoilState(GridAtom);
  const updatedGrid = useUpdateGrid();
  const { routePos, setRoutePost } = useRoutePos(routePosSelector);

  useEffect(() => {
    setGrid(initGrid());
  }, []);

  const traverseGridHandler = async () => {
    const updatedGridData = await updatedGrid();

    const { visitedOrderArr, previous } = dijkstra(
      updatedGridData,
      routePos.sourceIndex,
      routePos.destinationIndex
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
    //   const route = createRoute(
    //     previous,
    //     routePos.sourceIndex,
    //     routePos.destinationIndex
    //   );
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
  };

  const resetHandler = () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });

    setGrid(initGrid());
    setRoutePost({ destinationIndex: END_INDEX, sourceIndex: START_INDEX });
  };

  const GridElement = grid.map((row, rowIndex) => (
    <div key={rowIndex} className="grid">
      {row.map((node, colIndex) => (
        <Node key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
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
