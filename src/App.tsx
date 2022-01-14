import React from "react";
import "./App.css";
import { Grid, GridItem, Button } from "@chakra-ui/react";
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
  const { setIsOpen, isOpen } = useDrawerState(drawerSelector);

  return (
    <div className="App">
      <Button
        bg="hsl(208, 97%, 55%)"
        onClick={() => setIsOpen(true)}
        size="sm"
        display={["block", "block", "block", "block", "none"]}
        pos="fixed"
        right="5"
        top="2"
        _hover={{}}
      >
        <HamburgerIcon w={5} h={5} color="white" />
      </Button>
      {isOpen && <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />}
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
        mr="10"
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

        <GridItem
          rowSpan={[5]}
          colSpan={[3]}
          // mt="11.5"
          marginTop={"2.93em"}
          borderLeft={"1px solid rgba(17, 24, 39, 0.379)"}
          borderBottom={"1px solid rgba(17, 24, 39, 0.379)"}
          // backgroundColor={"red"}
        >
          <VisualizerGrid />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
