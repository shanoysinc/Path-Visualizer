import React from "react";
import "./App.css";
import { Grid, GridItem, Button, useDisclosure, Flex } from "@chakra-ui/react";
import {
  Grid as VisualizerGrid,
  Drawer,
  GridKeys,
  LeftSideBar,
} from "./components";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DrawerStateProps, useDrawerState } from "./state/UI/useDrawerDisplay";
const drawerSelector = (state: DrawerStateProps) => ({
  isOpen: state.isOpen,
  setIsOpen: state.setIsOpen,
});

function App() {
  const { setIsOpen } = useDrawerState(drawerSelector);

  return (
    <div className="App">
      <Button
        bg="hsl(208, 97%, 55%)"
        onClick={() => setIsOpen(true)}
        size="sm"
        display={["block", "block", "block", "block", "none"]}
        pos="fixed"
        left="5"
        top="10"
        _hover={{}}
      >
        <HamburgerIcon w={5} h={5} color="white" />
      </Button>
      <Drawer />
      {/* <Flex justify="center" bg="red" align="center"> */}
      <Grid
        h="100vh"
        templateRows="repeat(5, 1fr)"
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
        ]}
        columnGap={4}
        w={["90%", "90%", "90%", "90%", "100%"]}
        m={["0 auto"]}
        mr={{ xlg: 10 }}
      >
        <GridItem
          rowSpan={5}
          colSpan={1}
          bg="#111827"
          display={["none", "none", "none", "none", "block"]}
        >
          <LeftSideBar />
        </GridItem>

        <GridItem colSpan={[2, 2, 2, 2, 3]}>
          <GridKeys />
        </GridItem>

        <GridItem rowSpan={[5, 5]} colSpan={[2, 2, 2, 3, 3]} mt="8">
          <VisualizerGrid />
        </GridItem>
      </Grid>
      {/* </Flex> */}
    </div>
  );
}

export default App;
