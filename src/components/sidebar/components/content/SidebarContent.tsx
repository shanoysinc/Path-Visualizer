import React, { useState } from "react";
import {
  Flex,
  Button,
  Select,
  Heading,
  Container,
  useToast,
  Spinner,
  Text,
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
import { useSetRecoilState } from "recoil";
import { useRemoveGridWalls } from "../../../grid/hooks/useRemoveWalls";
import { SettingsIcon } from "@chakra-ui/icons";
import { AlgoIcon } from "../../../../assets/AlgoIcon";

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
  const [visualizingAlgo, setVisualizingAlgo] = useState(false);
  const toast = useToast();

  const traverseGridHandler = async () => {
    setVisualizingAlgo(true);

    if (userHasVisualize) {
      clearGridPathHandler();
    }
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
            }, 50 * index);
          }
        });

        setTimeout(() => {
          setVisualizingAlgo(false);
          setUserHasVisualize(true);
          toast({
            title: "Success!",
            description: "A path to your destination has been found!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }, route.length * 50);
      }, visitedOrderArr.length * 5);
    } else {
      setTimeout(() => {
        setVisualizingAlgo(false);
        setUserHasVisualize(true);
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
  };

  const resetHandler = () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });

    setGrid(initGrid());
    setRoutePos({ destinationIndex: END_INDEX, sourceIndex: START_INDEX });
    setUserHasVisualize(false);
  };

  const clearGridWallsHandler = async () => {
    removeGridWalls();
    clearGridPathHandler();
    setUserHasVisualize(false);
  };

  const clearGridPathHandler = () => {
    document.querySelectorAll(".route, .visitedNode").forEach((node) => {
      return node.classList.remove(...["route", "visitedNode"]);
    });
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
          <div>
            <Heading as="h3" size="lg" color="#EDE9FE">
              DevPath - Algorithm Visualizer
            </Heading>
            <div className="algo-logo">
              <AlgoIcon height={35} width={35} />
            </div>
          </div>
          <Select
            placeholder="Dijkstra's Algorithm"
            mt="14"
            variant="filled"
            bg="#1e96fc"
            color="white"
            _hover={{ bg: "hsl(208, 97%, 49%);" }}
          >
            {/* <option value="option1">Dijkstra's Alogrithm</option> */}
          </Select>
          <Select
            mt="4"
            variant="filled"
            bg="#1e96fc"
            color="white"
            _groupHover={{ bgColor: "red", bg: "red" }}
            w="fit-content"
            _hover={{ bg: "hsl(208, 97%, 49%);" }}
          >
            <option className="option" value="Fast">
              Fast
            </option>
            <option className="option" value="Average">
              Average
            </option>
            <option className="option" value="Slow">
              Slow
            </option>
          </Select>

          <Flex align="center" gridGap="2" pt="10">
            <div>
              <SettingsIcon mt="-1" w={4} h={4} color="teal.300" />
            </div>
            <Text color="teal.300" fontWeight="medium">
              Grid Funtionality :
            </Text>
          </Flex>

          <Flex gridGap={4} pt="4" pb="4" flexWrap="wrap">
            <SmallButton
              content="Reset"
              onClick={resetHandler}
              visualizingAlgo={visualizingAlgo}
            />
            <SmallButton
              content="Clear Walls"
              onClick={clearGridWallsHandler}
              visualizingAlgo={visualizingAlgo}
            />
            <SmallButton
              content="Clear path"
              onClick={clearGridPathHandler}
              visualizingAlgo={visualizingAlgo}
            />
          </Flex>
        </div>
        <Container>
          <Button
            size="lg"
            w="full"
            colorScheme="pink"
            onClick={traverseGridHandler}
            disabled={visualizingAlgo}
          >
            {visualizingAlgo ? (
              <Spinner
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
            ) : (
              "Visualize"
            )}
          </Button>
        </Container>
      </Flex>
    </>
  );
};

// function clearGridPathHandler() {
//   document.querySelectorAll(".route, .visitedNode").forEach((node) => {
//     return node.classList.remove(...["route", "visitedNode"]);
//   });
//   // setUserHasVisualize(false);
// }
