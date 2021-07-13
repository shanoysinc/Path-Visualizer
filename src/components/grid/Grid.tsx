import React, { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { GridAtom } from "../../state/pathFinder/atoms";
import { Node } from "./components";
import { useInitialGrid } from "./hooks/useInitialGrid";
import { Grid as ChakraUIGrid } from "@chakra-ui/react";

export const Grid = memo(() => {
  const initGrid = useInitialGrid();
  const [grid, setGrid] = useRecoilState(GridAtom);

  useEffect(() => {
    setGrid(initGrid());
  }, []);

  const GridElement = grid.map((row, rowIndex) => (
    <ChakraUIGrid templateColumns="repeat(40, 1fr)" key={`${rowIndex}`}>
      {row.map((node, colIndex) => (
        <Node key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
      ))}
    </ChakraUIGrid>
  ));

  return <>{GridElement}</>;
});
