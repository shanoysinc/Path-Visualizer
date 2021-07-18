import React, { memo, useState } from "react";
import { Node } from "./components";
import { Grid as ChakraUIGrid } from "@chakra-ui/react";
import { grid } from "./hooks/useInitialGrid";
import { SelectedType } from "../../state/types";

export const Grid = memo(() => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedNode, setSelectedNode] = useState<null | SelectedType>(null);
  return (
    <>
      {grid.map((row, rowIndex) => (
        <ChakraUIGrid templateColumns="repeat(38, 1fr)" key={`${rowIndex}`}>
          {row.map((_node, colIndex) => (
            <Node
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              isMouseDown={isMouseDown}
              setIsMouseDown={setIsMouseDown}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
          ))}
        </ChakraUIGrid>
      ))}
    </>
  );
});
