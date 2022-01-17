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
  Switch,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import SmallButton from "../Button/SmallButton";
import { useUpdateGrid } from "../../../grid/hooks/useUpdateGrid";
import { createRoute, dijkstra, Path } from "../../../../algorithms/graph/";
import { END_INDEX, START_INDEX } from "../../../grid/hooks/useInitialGrid";
import { useRemoveGridWalls } from "../../../grid/hooks/useRemoveWalls";
import { SettingsIcon } from "@chakra-ui/icons";
import { useResetGrid } from "../../../grid/hooks/useInitialGrid";
import { useRecoilState } from "recoil";
import {
  RoutePosAtom,
  visitedNodeAtom,
} from "../../../../state/pathFinder/atoms";
import { useRandomWalls } from "../../../grid/hooks/ueRandomWalls";

interface Props {
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
}

export const SidebarContent = ({ isOpen: isDrawerOpen, setIsOpen }: Props) => {
  const resetGrid = useResetGrid();
  const updatedGrid = useUpdateGrid();
  const placeRandomWalls = useRandomWalls();
  const removeGridWalls = useRemoveGridWalls();
  const [routePos, setRoutePos] = useRecoilState(RoutePosAtom);
  const [visitedNodes, setVisitedNodes] = useRecoilState(visitedNodeAtom);
  const [isAlgoVisualizing, setisAlgoVisualizing] = useState(false);
  const [animateVisitedNode, setAnimateVisitedNode] = useState(true);
  const [animateRoute, setAnimateRoute] = useState(true);
  const [visualizeSpeed, setVisualizeSpeed] = useState(17);
  const toast = useToast();

  const traverseGridHandler = () => {
    removeNodeClasses(visitedNodes);

    if (isDrawerOpen) {
      setIsOpen(false);
    }
    setisAlgoVisualizing(true);

    const updatedGridData = updatedGrid();

    const { visitedOrderArr, previous, hasRoute } = dijkstra(
      updatedGridData,
      routePos.sourceIndex,
      routePos.destinationIndex
    );
    createVisitedNodeAnimation({
      animateVisitedNode,
      visitedOrderArr,
      visualizeSpeed,
    });

    createRouteAnimation({
      hasRoute,
      previous,
      visitedOrderArrLength: visitedOrderArr.length,
    });
    setVisitedNodes(visitedOrderArr);
  };

  const createRouteAnimation = (setUp: {
    hasRoute: boolean;
    previous: Path;
    visitedOrderArrLength: number;
  }) => {
    const { hasRoute, previous, visitedOrderArrLength } = setUp;

    if (hasRoute) {
      const route = createRoute(
        previous,
        routePos.sourceIndex,
        routePos.destinationIndex
      );

      setTimeout(() => {
        route.forEach((node, index) => {
          const nodeDiv = document.getElementById(node);

          if (nodeDiv) {
            setTimeout(() => {
              nodeDiv.classList.remove("visitedNode");
              nodeDiv.classList.remove("visitedNode-animation");
              animateRoute
                ? nodeDiv.classList.add("route-animation")
                : nodeDiv.classList.add("route");
            }, visualizeSpeed * 3 * index);
          }
        });
        setTimeout(() => {
          if (!isDrawerOpen) {
            setisAlgoVisualizing(false);
          }
        }, visualizeSpeed * 4 * route.length);
      }, (visualizeSpeed + 2) * visitedOrderArrLength);
    } else {
      setTimeout(() => {
        if (!isDrawerOpen) {
          setisAlgoVisualizing(false);
        }
        toast({
          title: "No route to destination!",
          description: "All path is block off to your destination",
          status: "info",
          duration: 2000,
          position: "top",
        });
      }, (visualizeSpeed + 2) * visitedOrderArrLength);
    }
  };

  const resetHandler = () => {
    removeNodeClasses(visitedNodes);
    setRoutePos({ destinationIndex: END_INDEX, sourceIndex: START_INDEX });
    resetGrid();
  };

  const clearGridWallsHandler = async () => {
    removeNodeClasses(visitedNodes);
    removeGridWalls();
  };

  const visualizeSpeedHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speedType = e.target.value;

    switch (speedType) {
      case "SLOW":
        setVisualizeSpeed(25);
        break;
      default:
        setVisualizeSpeed(17);
        break;
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
              DevPath Algorithm Visualizer
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
            defaultValue="AVERAGE"
          >
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
            <Text color="teal.200" fontWeight="medium">
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
              onClick={() => removeNodeClasses(visitedNodes)}
              isAlgoVisualizing={isAlgoVisualizing}
            />
            <SmallButton
              content="Generate Walls"
              beforeClickFn={clearGridWallsHandler}
              onClick={placeRandomWalls}
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
                    data-test={"Visited-Animations-btn"}
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
                    data-test={"Route-Animations-btn"}
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
            data-test={"visualize-btn"}
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
};

function createVisitedNodeAnimation(setUp: {
  visitedOrderArr: string[];
  animateVisitedNode: boolean;
  visualizeSpeed: number;
}) {
  const { animateVisitedNode, visitedOrderArr, visualizeSpeed } = setUp;
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
}

function removeNodeClasses(visitedOrder: string[]) {
  if (visitedOrder.length === 0) return;
  visitedOrder.forEach((nodeId) => {
    document
      .getElementById(nodeId)
      .classList.remove(
        ...["route", "visitedNode", "visitedNode-animation", "route-animation"]
      );
  });
}
