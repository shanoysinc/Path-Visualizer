import React, { memo } from "react";
import { Node } from "./components";
import { Grid as ChakraUIGrid } from "@chakra-ui/react";
import { grid } from "./hooks/useInitialGrid";

export const Grid = memo(() => {
  return (
    <>
      {grid.map((row, rowIndex) => (
        <ChakraUIGrid templateColumns="repeat(42, 1fr)" key={`${rowIndex}`}>
          {row.map((_node, colIndex) => (
            <Node
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
            />
          ))}
        </ChakraUIGrid>
      ))}
    </>
  );
});
