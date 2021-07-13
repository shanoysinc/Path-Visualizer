import React, { useState } from "react";
import {
  Flex,
  Button,
  Select,
  Heading,
  Container,
  useToast,
} from "@chakra-ui/react";
import SmallButton from "../Button/SmallButton";
import { useUpdateGrid } from "../../../grid/hooks/useUpdateGrid";
import { createRoute, dijkstra } from "../../../../algorithms/graph/dijkstra";
import {
  useRoutePos,
  useRoutePosProps,
} from "../../../../state/pathFinder/useRoutePos";
import {
  END_INDEX,
  START_INDEX,
  useInitialGrid,
} from "../../../grid/hooks/useInitialGrid";
import { GridAtom } from "../../../../state/pathFinder/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRemoveGridWalls } from "../../../grid/hooks/useRemoveWalls";

const routePosSelector = (state: useRoutePosProps) => ({
  routePos: state.routePos,
  setRoutePos: state.setRoutePos,
});
export const SidebarContent = () => {
  const initGrid = useInitialGrid();
  const setGrid = useSetRecoilState(GridAtom);
  const updatedGrid = useUpdateGrid();
  const removeGridWalls = useRemoveGridWalls();
  const { routePos, setRoutePos } = useRoutePos(routePosSelector);
  const [userHasVisualize, setUserHasVisualize] = useState(false);
  const toast = useToast();

  const traverseGridHandler = async () => {
    const updatedGridData = await updatedGrid();

    if (userHasVisualize) {
      clearGridPathHandler();
    }

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
    } else {
      setTimeout(() => {
        toast({
          title: "No route to destination!",
          description: "All path is block off to your destination",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }, 5 * visitedOrderArr.length);
    }
    setUserHasVisualize(true);
  };

  const resetHandler = () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });

    setGrid(initGrid());
    setRoutePos({ destinationIndex: END_INDEX, sourceIndex: START_INDEX });
  };
  const clearGridWallsHandler = async () => {
    removeGridWalls();
  };
  const clearGridPathHandler = async () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });
    setUserHasVisualize(true);
  };

  return (
    <>
      {/* <Heading as="h3" size="lg">
        DevPath - Algorithm Visualizer
      </Heading> */}
      {/* <Heading as="h4" size="md">
        DevPath - Algorithm Visualizer
      </Heading> */}
      <Flex
        direction="column"
        justify="space-between"
        height="full"
        align="center"
        pt="4"
        pb="4"
        p="5"
      >
        <div>
          <Heading as="h3" size="lg" color="#FCD34D">
            DevPath - Algorithm Visualizer
          </Heading>
          <Select
            placeholder="Dijkstra's Algorithm"
            mt="8"
            variant="filled"
            bg="#6D28D9"
            color="white"
          >
            {/* <option value="option1">Dijkstra's Alogrithm</option> */}
          </Select>
          <Select
            placeholder="Speed: Fast"
            mt="4"
            variant="filled"
            bg="#6D28D9"
            color="white"
            w="fit-content"
          >
            <option value="Fast">Fast</option>
            <option value="Average">Average</option>
            <option value="Slow">Slow</option>
          </Select>

          <Flex gridGap={4} pt="10" pb="4" flexWrap="wrap">
            <SmallButton content="Reset" onClick={resetHandler} />
            <SmallButton
              content="Clear Walls"
              onClick={clearGridWallsHandler}
            />
            <SmallButton content="Clear path" onClick={clearGridPathHandler} />
          </Flex>
        </div>
        <Container>
          <Button
            size="lg"
            w="full"
            colorScheme="pink"
            onClick={traverseGridHandler}
          >
            Visualize
          </Button>
        </Container>
      </Flex>
    </>
  );
};
