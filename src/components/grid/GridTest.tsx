import React, { useEffect } from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import { useInitialGrid } from "./hooks/useInitialGrid";
import { useRecoilState } from "recoil";
import { GridAtom } from "../../state/pathFinder/atoms";
import { Node } from "./components";

const GridTest = () => {
  const initGrid = useInitialGrid();
  const [grid, setGrid] = useRecoilState(GridAtom);

  useEffect(() => {
    setGrid(initGrid());
  }, []);

  const GridElement = grid.map((row, rowIndex) => (
    <>
      {row.map((node, colIndex) => (
        <Node key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
      ))}
    </>
  ));
  return (
    <>
      <Grid templateColumns="repeat(40, 1fr)">{GridElement}</Grid>
    </>
  );
};

export default GridTest;
