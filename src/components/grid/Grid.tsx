import React, { useState } from "react";
import { initGraph } from "../../algorithms/graph/dijkstra";
import { Node } from "./components/node/Node";

export const Grid = () => {
  const [grid, setGrid] = useState(() => initGraph(25, 50));
  const [startNodeSelected, setStartNodeSelected] = useState(false);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return row.map((col, colIndex) => (
          <Node
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            startNodeSelected={startNodeSelected}
            setStartNodeSelected={setStartNodeSelected}
          />
        ));
      })}
    </div>
  );
};
