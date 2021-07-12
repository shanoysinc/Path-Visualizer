import React from "react";
import "./App.css";
import { Grid as VisualizerGrid } from "./components";
import { Grid, GridItem } from "@chakra-ui/react";
import GridTest from "./components/grid/GridTest";
import GridKeys from "./components/GridKeys/GridKeys";
import Drawer from "./components/drawer/Drawer";
import LeftSideBar from "./components/sidebar/LeftSideBar";
function App() {
  return (
    <div className="App">
      {/* <Drawer /> */}
      <Grid
        h="100vh"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(4, 1fr)"
        columnGap={2}
      >
        <GridItem
          rowSpan={5}
          colSpan={1}
          // borderRight="2px"
          // borderRightColor="#374151"
          bg="#111827"
        >
          <LeftSideBar />
          {/* <Drawer /> */}
        </GridItem>

        <GridItem colSpan={3}>
          <GridKeys />
        </GridItem>

        <GridItem rowGap={2} rowSpan={5} colSpan={3}>
          {/* <VisualizerGrid /> */}
          <GridTest />
        </GridItem>
      </Grid>
    </div>
  );
}

export default App;
