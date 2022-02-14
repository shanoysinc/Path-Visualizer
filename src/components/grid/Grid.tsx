import React from "react";
import { Node } from "./components";
import { Grid as ChakraUIGrid } from "@chakra-ui/react";
import { grid } from "./hooks/useInitialGrid";

export const Grid = () => {
  return (
    <>
      {grid.map((row, rowIndex) => (
        <ChakraUIGrid templateColumns="repeat(36, 1fr)" key={`${rowIndex}`}>
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
};
