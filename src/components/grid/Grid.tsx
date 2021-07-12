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
import { Grid as ChakraUIGrid, GridItem, Box } from "@chakra-ui/react";

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

    const { visitedOrderArr, previous, hasRoute } = dijkstra(
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
        }, 5 * index);
      }
    });

    if (hasRoute) {
      setTimeout(() => {
        const route = createRoute(
          previous,
          routePos.sourceIndex,
          routePos.destinationIndex
        );
        route.forEach((node, index) => {
          const nodeDiv = document.getElementById(node);

          if (nodeDiv) {
            setTimeout(() => {
              nodeDiv.classList.remove("visitedNode");
              nodeDiv.classList.add("route");
            }, 65 * index);
          }
        });
      }, visitedOrderArr.length * 5);

      return;
    }

    setTimeout(() => {
      alert("no path found!");
    }, visitedOrderArr.length);
  };

  const resetHandler = () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });

    setGrid(initGrid());
    setRoutePost({ destinationIndex: END_INDEX, sourceIndex: START_INDEX });
  };

  const GridElement = grid.map((row, rowIndex) => (
    <>
      {row.map((node, colIndex) => (
        <Node key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
      ))}
    </>
  ));

  return (
    <>
      <ChakraUIGrid templateColumns="repeat(40, 1fr)">
        {GridElement}
      </ChakraUIGrid>
    </>
  );
});
