import React, { useState, memo } from "react";
import {
  Flex,
  Button,
  Select,
  Heading,
  Container,
  useToast,
  Spinner,
  Text,
  Switch,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import SmallButton from "../Button/SmallButton";
import { useUpdateGrid } from "../../../grid/hooks/useUpdateGrid";
import { createRoute, dijkstra } from "../../../../algorithms/graph/dijkstra";
import {
  useRoutePos,
  useRoutePosProps,
} from "../../../../state/pathFinder/useRoutePos";
import { END_INDEX, START_INDEX } from "../../../grid/hooks/useInitialGrid";
import { useRemoveGridWalls } from "../../../grid/hooks/useRemoveWalls";
import { SettingsIcon } from "@chakra-ui/icons";
import { useResetGrid } from "../../../grid/hooks/useInitialGrid";

const routePosSelector = (state: useRoutePosProps) => ({
  routePos: state.routePos,
  setRoutePos: state.setRoutePos,
});
export const SidebarContent = memo(() => {
  const resetGrid = useResetGrid();
  const updatedGrid = useUpdateGrid();
  const removeGridWalls = useRemoveGridWalls();
  const { routePos, setRoutePos } = useRoutePos(routePosSelector);
  const [userHasVisualize, setUserHasVisualize] = useState(false);
  const [isAlgoVisualizing, setisAlgoVisualizing] = useState(false);
  const [animateVisitedNode, setAnimateVisitedNode] = useState(true);
  const [animateRoute, setAnimateRoute] = useState(true);
  const [visualizeSpeed, setVisualizeSpeed] = useState(20);
  const toast = useToast();

  const traverseGridHandler = async () => {
    setisAlgoVisualizing(true);

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
            animateVisitedNode
              ? nodeDiv.classList.add("visitedNode-animation")
              : nodeDiv.classList.add("visitedNode");
          }
        }, visualizeSpeed * index);
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
              nodeDiv.classList.remove("visitedNode-animation");
              animateRoute
                ? nodeDiv.classList.add("route-animation")
                : nodeDiv.classList.add("route");
            }, visualizeSpeed * 5 * index);
          }
        });

        setTimeout(() => {
          setisAlgoVisualizing(false);
          setUserHasVisualize(true);
          toast({
            title: "Success!",
            description: "A path to your destination has been found!",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }, visualizeSpeed * 5 * route.length);
      }, visualizeSpeed * visitedOrderArr.length);
    } else {
      setTimeout(() => {
        setisAlgoVisualizing(false);
        setUserHasVisualize(true);
        toast({
          title: "No route to destination!",
          description: "All path is block off to your destination",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }, (visualizeSpeed + 1) * visitedOrderArr.length);
    }
  };

  const resetHandler = () => {
    document
      .querySelectorAll(
        ".route, .visitedNode, .visitedNode-animation, .route-animation"
      )
      .forEach((node) => {
        return node.classList.remove(
          ...[
            "route",
            "visitedNode",
            "visitedNode-animation",
            "route-animation",
          ]
        );
      });

    setRoutePos({ destinationIndex: END_INDEX, sourceIndex: START_INDEX });
    setUserHasVisualize(false);
    resetGrid();
  };

  const clearGridWallsHandler = async () => {
    removeGridWalls();
    clearGridPathHandler();
    setUserHasVisualize(false);
  };

  const clearGridPathHandler = () => {
    document
      .querySelectorAll(
        ".route, .visitedNode, .visitedNode-animation, .route-animation"
      )
      .forEach((node) => {
        return node.classList.remove(
          ...[
            "route",
            "visitedNode",
            "visitedNode-animation",
            "route-animation",
          ]
        );
      });
  };

  const visualizeSpeedHandler = (value: any) => {
    const speedType = value.target.value;

    switch (speedType) {
      case "AVERAGE":
        setVisualizeSpeed(20);
        return;
      case "SLOW":
        setVisualizeSpeed(25);
        return;
      default:
        setVisualizeSpeed(15);
        return;
    }
  };

  const visitedNodeAnimHandler = () => {
    setAnimateVisitedNode(!animateVisitedNode);
  };
  const routeAnimHandler = () => {
    setAnimateRoute(!animateRoute);
  };

  return (
    <>
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
          </div>
          <Select
            placeholder="Dijkstra's Algorithm"
            mt="14"
            variant="filled"
            bg="#1d94fc"
            color="white"
            _hover={{ bg: "hsl(208, 97%, 55%);" }}
          ></Select>
          <Select
            mt="4"
            variant="filled"
            bg="#1d94fc"
            color="white"
            w="fit-content"
            _hover={{ bg: "hsl(208, 97%, 50%);" }}
            onChange={visualizeSpeedHandler}
            value="AVERAGE"
          >
            <option className="option" value="FAST">
              Fast
            </option>
            <option className="option" value="AVERAGE">
              Average
            </option>
            <option className="option" value="SLOW">
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
              isAlgoVisualizing={isAlgoVisualizing}
            />
            <SmallButton
              content="Clear Walls"
              onClick={clearGridWallsHandler}
              isAlgoVisualizing={isAlgoVisualizing}
            />
            <SmallButton
              content="Clear path"
              onClick={clearGridPathHandler}
              isAlgoVisualizing={isAlgoVisualizing}
            />
          </Flex>
          <Stack>
            <Wrap>
              <WrapItem>
                <Flex
                  align="center"
                  gridGap={2}
                  justify="space-between"
                  w="180px"
                >
                  <Text color="white"> Visited Animations</Text>
                  <Switch
                    onChange={visitedNodeAnimHandler}
                    isChecked={animateVisitedNode}
                  />
                </Flex>
              </WrapItem>
              <WrapItem>
                <Flex
                  w="180px"
                  align="center"
                  gridGap={2}
                  justify="space-between"
                >
                  <Text color="white"> Route Animations</Text>
                  <Switch
                    isChecked={animateRoute}
                    onChange={routeAnimHandler}
                  />
                </Flex>
              </WrapItem>
            </Wrap>
          </Stack>
        </div>
        <Container>
          <Button
            size="lg"
            w="full"
            bg="hsla(148, 97%, 50%, 0.719)"
            _hover={{ bg: "hsla(148, 97%, 50%, 0.619)" }}
            color="white"
            onClick={traverseGridHandler}
            disabled={isAlgoVisualizing}
          >
            {isAlgoVisualizing ? (
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
});
