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
  // const [visualizeSpeed, setVisualizeSpeed] = useState(0);
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
    //
    // slow - 40 * index
    // average - 15 * index
    // fast - 5 * index
    const speedValue = 12;

    visitedOrderArr.forEach((node, index) => {
      const nodeDiv = document.getElementById(node);
      if (nodeDiv) {
        const isStartNode = nodeDiv.classList.contains("startNode");
        const isEndNode = nodeDiv.classList.contains("endNode");
        setTimeout(() => {
          if (!isEndNode && !isStartNode) {
            nodeDiv.classList.add("visitedNode");
          }
        }, speedValue * index);
      }
    });

    //

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
            }, speedValue * 10 * index);
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
        }, speedValue * 10 * route.length);
      }, speedValue * visitedOrderArr.length);
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
      }, speedValue * visitedOrderArr.length);
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

  const visualizeSpeedHandler = (value: any) => {
    console.log(value.target.value);
    // setVisualizeSpeed()
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
            bg="#1d94fc"
            color="white"
            _hover={{ bg: "hsl(208, 97%, 55%);" }}
          >
            {/* <option value="option1">Dijkstra's Alogrithm</option> */}
          </Select>
          <Select
            mt="4"
            variant="filled"
            bg="#1d94fc"
            color="white"
            w="fit-content"
            _hover={{ bg: "hsl(208, 97%, 50%);" }}
            onChange={visualizeSpeedHandler}
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
              Grid Functionalities :
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
            bg="hsla(148, 97%, 50%, 0.719)"
            _hover={{ bg: "hsla(148, 97%, 50%, 0.619)" }}
            color="white"
            onClick={traverseGridHandler}
            disabled={visualizingAlgo}
          >
            {visualizingAlgo ? (
              <Spinner
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="hsl(208, 97%, 55%);"
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

// function animationSpeed(speedType: string){
//   const speed = {
//     overall: 12,
//     route: 10,
//     toast: 12
//   }
//   switch(speedType){
//     case "FAST":

//   }
// }
